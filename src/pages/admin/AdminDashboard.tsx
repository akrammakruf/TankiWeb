import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Briefcase, Users, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Inquiry } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    inquiries: 0,
    newInquiries: 0,
    projects: 0,
    services: 0,
    testimonials: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [inqRes, newInqRes, projRes, svcRes, testRes] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        inquiries: inqRes.count ?? 0,
        newInquiries: newInqRes.count ?? 0,
        projects: projRes.count ?? 0,
        services: svcRes.count ?? 0,
        testimonials: testRes.count ?? 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentInquiries((data ?? []) as Inquiry[]);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const cards = [
    { label: 'Total Inquiry', value: stats.inquiries, icon: MessageSquare, color: 'bg-primary-500', link: '/admin/inquiries' },
    { label: 'Inquiry Baru', value: stats.newInquiries, icon: TrendingUp, color: 'bg-accent-500', link: '/admin/inquiries' },
    { label: 'Proyek', value: stats.projects, icon: Briefcase, color: 'bg-warning-500', link: '/admin/projects' },
    { label: 'Layanan', value: stats.services, icon: FileText, color: 'bg-primary-600', link: '/admin/services' },
    { label: 'Testimoni', value: stats.testimonials, icon: Users, color: 'bg-accent-600', link: '/admin/testimonials' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">Ringkasan konten dan inquiry website</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color} text-white`}>
              <card.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-neutral-900">{card.value}</p>
            <p className="text-xs font-medium text-neutral-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Inquiry Terbaru</h2>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:gap-2"
          >
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {recentInquiries.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-neutral-400">Belum ada inquiry</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-neutral-700">Nama</th>
                  <th className="px-4 py-3 font-semibold text-neutral-700">Perusahaan</th>
                  <th className="px-4 py-3 font-semibold text-neutral-700">Layanan</th>
                  <th className="px-4 py-3 font-semibold text-neutral-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-neutral-800">{inq.name}</td>
                    <td className="px-4 py-3 text-neutral-600">{inq.company ?? '-'}</td>
                    <td className="px-4 py-3 text-neutral-600">{inq.service_type ?? '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        inq.status === 'new' ? 'bg-accent-50 text-accent-700' :
                        inq.status === 'contacted' ? 'bg-primary-50 text-primary-700' :
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
