import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminInquiries from '@/pages/admin/AdminInquiries';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminPageContent from '@/pages/admin/AdminPageContent';
import {
  AdminServices, AdminStats, AdminClients, AdminCapabilities,
  AdminIndustries, AdminWhyChoose, AdminValues, AdminCertifications,
  AdminMilestones, AdminProcess, AdminFeatures, AdminTeam,
} from '@/pages/admin/AdminContentPages';
import { Loader2 } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute><AdminLayout><AdminInquiries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjects /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/team" element={<ProtectedRoute><AdminLayout><AdminTeam /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/page-content" element={<ProtectedRoute><AdminLayout><AdminPageContent /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/stats" element={<ProtectedRoute><AdminLayout><AdminStats /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute><AdminLayout><AdminClients /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/capabilities" element={<ProtectedRoute><AdminLayout><AdminCapabilities /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/industries" element={<ProtectedRoute><AdminLayout><AdminIndustries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/why-choose" element={<ProtectedRoute><AdminLayout><AdminWhyChoose /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/values" element={<ProtectedRoute><AdminLayout><AdminValues /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/certifications" element={<ProtectedRoute><AdminLayout><AdminCertifications /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/milestones" element={<ProtectedRoute><AdminLayout><AdminMilestones /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/process" element={<ProtectedRoute><AdminLayout><AdminProcess /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/features" element={<ProtectedRoute><AdminLayout><AdminFeatures /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
