import { useState, useEffect } from 'react';
import { Loader2, Trash2, Eye, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Inquiry } from '@/lib/types';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    setInquiries((data ?? []) as Inquiry[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    fetchInquiries();
    if (viewing?.id === id) setViewing({ ...viewing, status });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus inquiry ini?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    fetchInquiries();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">Inquiry</h1>
      <p className="mt-1 text-sm text-neutral-500">Inquiry yang masuk dari form kontak website</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-neutral-700">Nama</th>
              <th className="px-4 py-3 font-semibold text-neutral-700">Email</th>
              <th className="px-4 py-3 font-semibold text-neutral-700">Layanan</th>
              <th className="px-4 py-3 font-semibold text-neutral-700">Tanggal</th>
              <th className="px-4 py-3 font-semibold text-neutral-700">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-neutral-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">Belum ada inquiry</td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-800">{inq.name}</td>
                  <td className="px-4 py-3 text-neutral-600">{inq.email}</td>
                  <td className="px-4 py-3 text-neutral-600">{inq.service_type ?? '-'}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                      className={`rounded-full border-0 px-2 py-0.5 text-xs font-semibold ${
                        inq.status === 'new' ? 'bg-accent-50 text-accent-700' :
                        inq.status === 'contacted' ? 'bg-primary-50 text-primary-700' :
                        'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setViewing(inq)}
                        className="rounded-lg p-2 text-neutral-500 hover:bg-primary-50 hover:text-primary-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="rounded-lg p-2 text-neutral-500 hover:bg-error-50 hover:text-error-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/50" onClick={() => setViewing(null)} />
          <div className="relative max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">Detail Inquiry</h2>
              <button onClick={() => setViewing(null)} className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div><span className="font-semibold text-neutral-500">Nama:</span> <span className="text-neutral-800">{viewing.name}</span></div>
              <div><span className="font-semibold text-neutral-500">Email:</span> <span className="text-neutral-800">{viewing.email}</span></div>
              <div><span className="font-semibold text-neutral-500">Telepon:</span> <span className="text-neutral-800">{viewing.phone ?? '-'}</span></div>
              <div><span className="font-semibold text-neutral-500">Perusahaan:</span> <span className="text-neutral-800">{viewing.company ?? '-'}</span></div>
              <div><span className="font-semibold text-neutral-500">Layanan:</span> <span className="text-neutral-800">{viewing.service_type ?? '-'}</span></div>
              <div>
                <span className="font-semibold text-neutral-500">Pesan:</span>
                <p className="mt-1 rounded-lg bg-neutral-50 p-3 text-neutral-700">{viewing.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
