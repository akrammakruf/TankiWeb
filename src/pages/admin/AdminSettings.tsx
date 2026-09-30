import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/lib/types';

const fields: { key: keyof SiteSettings; label: string; type: 'text' | 'textarea' }[] = [
  { key: 'company_name', label: 'Nama Perusahaan', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text' },
  { key: 'description', label: 'Deskripsi Perusahaan', type: 'textarea' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Telepon', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
  { key: 'address', label: 'Alamat', type: 'textarea' },
  { key: 'hours', label: 'Jam Operasional', type: 'text' },
  { key: 'founded', label: 'Tahun Berdiri', type: 'text' },
  { key: 'hero_image_url', label: 'URL Gambar Hero (Beranda)', type: 'text' },
  { key: 'hero_badge', label: 'Teks Badge Hero', type: 'text' },
  { key: 'hero_title', label: 'Judul Hero (Beranda)', type: 'text' },
  { key: 'hero_description', label: 'Deskripsi Hero (Beranda)', type: 'textarea' },
  { key: 'about_image_url', label: 'URL Gambar Tentang Kami', type: 'text' },
  { key: 'about_badge_value', label: 'Nilai Badge About', type: 'text' },
  { key: 'about_badge_label', label: 'Label Badge About', type: 'text' },
  { key: 'emergency_title', label: 'Judul CTA Darurat', type: 'text' },
  { key: 'emergency_description', label: 'Deskripsi CTA Darurat', type: 'textarea' },
  { key: 'cta_title', label: 'Judul CTA Utama', type: 'text' },
  { key: 'cta_description', label: 'Deskripsi CTA Utama', type: 'textarea' },
  { key: 'map_embed_url', label: 'URL Embed Peta (Kontak)', type: 'text' },
  { key: 'footer_cert_text', label: 'Teks Sertifikasi Footer', type: 'text' },
];

const sections = [
  { label: 'Informasi Perusahaan', keys: ['company_name', 'tagline', 'description', 'email', 'phone', 'whatsapp', 'address', 'hours', 'founded'] },
  { label: 'Hero (Beranda)', keys: ['hero_image_url', 'hero_badge', 'hero_title', 'hero_description'] },
  { label: 'Tentang Kami', keys: ['about_image_url', 'about_badge_value', 'about_badge_label'] },
  { label: 'CTA & Lainnya', keys: ['emergency_title', 'emergency_description', 'cta_title', 'cta_description', 'map_embed_url', 'footer_cert_text'] },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => {
      setSettings((data as SiteSettings) ?? {});
      setLoading(false);
    });
  }, []);

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('site_settings').update(settings).eq('id', 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">Pengaturan Situs</h1>
          <p className="mt-1 text-sm text-neutral-500">Edit informasi perusahaan dan konten global website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Simpan Perubahan
        </button>
      </div>

      {saved && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-accent-200 bg-accent-50 p-3 text-sm font-medium text-accent-700">
          <CheckCircle2 className="h-4 w-4" />
          Perubahan berhasil disimpan!
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.label} className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-neutral-900">{section.label}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.keys.map((key) => {
                const field = fields.find((f) => f.key === key);
                if (!field) return null;
                return (
                  <div key={key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-neutral-700">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={(settings[field.key] as string) ?? ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={3}
                        className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    ) : (
                      <input
                        type="text"
                        value={(settings[field.key] as string) ?? ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
