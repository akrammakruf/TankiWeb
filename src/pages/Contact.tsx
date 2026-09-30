import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { useAllContent } from '@/lib/useContent';
import { supabase } from '@/lib/supabase';
import type { NewInquiry } from '@/lib/types';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const { content, loading } = useAllContent(['contact']);
  const [form, setForm] = useState<NewInquiry>({
    name: '', email: '', phone: '', company: '', service_type: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (loading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const s = content.settings;
  const pc = content.pageContent['contact.hero'];

  const contactInfo = [
    { icon: MapPin, label: 'Alamat Kantor', value: s?.address ?? '' },
    { icon: Phone, label: 'Telepon', value: s?.phone ?? '', href: `tel:${(s?.phone ?? '').replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: s?.email ?? '', href: `mailto:${s?.email}` },
    { icon: Clock, label: 'Jam Operasional', value: s?.hours ?? '' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('inquiries').insert({
        name: form.name, email: form.email, phone: form.phone || null,
        company: form.company || null, service_type: form.service_type || null, message: form.message,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service_type: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Terjadi kesalahan saat mengirim inquiry. Silakan coba lagi.');
    }
  };

  return (
    <div>
      <PageHero
        breadcrumb={pc?.subtitle ?? 'Kontak'}
        title={pc?.title ?? ''}
        subtitle={pc?.description ?? ''}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-neutral-900">Informasi Kontak</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Hubungi kami melalui informasi di bawah ini atau kirim form inquiry di samping. Tim kami siap melayani Anda.
              </p>

              <div className="mt-8 space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="mt-1 block text-sm font-medium text-neutral-800 transition-colors hover:text-primary-600">{info.value}</a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-neutral-800">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white">
                <h3 className="text-lg font-bold">Layanan Darurat 24/7</h3>
                <p className="mt-2 text-sm text-primary-100">{s?.emergency_description}</p>
                <a href={`tel:${(s?.phone ?? '').replace(/\s/g, '')}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/25">
                  <Phone className="h-4 w-4" />
                  Hubungi Sekarang
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-neutral-900">Inquiry Berhasil Dikirim!</h3>
                    <p className="mt-2 max-w-md text-sm text-neutral-600">Terima kasih telah menghubungi kami. Tim kami akan merespons inquiry Anda dalam 24 jam.</p>
                    <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">Kirim Inquiry Lain</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-neutral-900">Kirim Inquiry</h2>

                    {status === 'error' && (
                      <div className="flex items-start gap-3 rounded-lg border border-error-200 bg-error-50 p-4">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error-600" />
                        <p className="text-sm text-error-700">{errorMessage}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700">Nama Lengkap <span className="text-error-500">*</span></label>
                        <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} className="input-field mt-1.5" placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">Email <span className="text-error-500">*</span></label>
                        <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className="input-field mt-1.5" placeholder="john@company.com" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700">Nomor Telepon</label>
                        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className="input-field mt-1.5" placeholder="+62 812 3456 7890" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-neutral-700">Perusahaan</label>
                        <input type="text" id="company" name="company" value={form.company} onChange={handleChange} className="input-field mt-1.5" placeholder="PT. Contoh Industri" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service_type" className="block text-sm font-semibold text-neutral-700">Layanan yang Diminati</label>
                      <select id="service_type" name="service_type" value={form.service_type} onChange={handleChange} className="input-field mt-1.5">
                        <option value="">Pilih layanan...</option>
                        {content.services.map((service) => (
                          <option key={service.id} value={service.title}>{service.title}</option>
                        ))}
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-neutral-700">Pesan <span className="text-error-500">*</span></label>
                      <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} className="input-field mt-1.5 resize-none" placeholder="Jelaskan kebutuhan tangki Anda, lokasi, ukuran, dan detail lainnya..." />
                    </div>

                    <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                      {status === 'submitting' ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</>
                      ) : (
                        <><Send className="h-4 w-4" /> Kirim Inquiry</>
                      )}
                    </button>

                    <p className="text-center text-xs text-neutral-400">
                      Dengan mengirim form ini, Anda menyetujui kebijakan privasi kami. Data Anda tidak akan dibagikan ke pihak ketiga.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-neutral-100">
        <div className="container-custom py-12">
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe
              title="Lokasi TankPro"
              src={s?.map_embed_url ?? ''}
              className="h-80 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
