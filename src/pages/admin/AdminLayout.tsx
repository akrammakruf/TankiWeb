import { type ReactNode, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Droplets, LayoutDashboard, Settings, MessageSquare, Briefcase,
  Users, Image as ImageIcon, FileText, ListChecks, LogOut, Menu, X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navSections = [
  {
    label: 'Utama',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/admin/settings', icon: Settings, label: 'Pengaturan Situs' },
      { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiry' },
    ],
  },
  {
    label: 'Konten Halaman',
    items: [
      { to: '/admin/services', icon: Briefcase, label: 'Layanan' },
      { to: '/admin/projects', icon: ImageIcon, label: 'Proyek' },
      { to: '/admin/testimonials', icon: FileText, label: 'Testimoni' },
      { to: '/admin/team', icon: Users, label: 'Tim' },
      { to: '/admin/page-content', icon: FileText, label: 'Judul Halaman' },
    ],
  },
  {
    label: 'Konten Beranda',
    items: [
      { to: '/admin/stats', icon: ListChecks, label: 'Statistik' },
      { to: '/admin/clients', icon: ListChecks, label: 'Klien' },
      { to: '/admin/capabilities', icon: ListChecks, label: 'Capaian' },
      { to: '/admin/industries', icon: ListChecks, label: 'Industri' },
      { to: '/admin/why-choose', icon: ListChecks, label: 'Keunggulan' },
      { to: '/admin/values', icon: ListChecks, label: 'Nilai Perusahaan' },
      { to: '/admin/certifications', icon: ListChecks, label: 'Sertifikasi' },
      { to: '/admin/milestones', icon: ListChecks, label: 'Milestone' },
      { to: '/admin/process', icon: ListChecks, label: 'Proses Kerja' },
      { to: '/admin/features', icon: ListChecks, label: 'Fitur Teknologi' },
    ],
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-neutral-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-extrabold text-neutral-900">TankPro Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-neutral-200 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-error-50 hover:text-error-600"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
          <Link
            to="/"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <ImageIcon className="h-4 w-4" />
            Lihat Website
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-neutral-900/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
              <span className="font-display text-lg font-extrabold text-neutral-900">Admin</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-neutral-500" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {navSections.map((section) => (
                <div key={section.label} className="mb-6">
                  <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-neutral-600 hover:bg-neutral-100'
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="border-t border-neutral-200 p-3">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-error-50 hover:text-error-600"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-neutral-700" />
          </button>
          <span className="font-display text-base font-bold text-neutral-900">TankPro Admin</span>
          <button onClick={handleSignOut}>
            <LogOut className="h-5 w-5 text-neutral-500" />
          </button>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
