import { Link } from 'react-router-dom';
import { Droplets, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/lib/useContent';
import { useTable } from '@/lib/useContent';
import type { Service } from '@/lib/types';

export default function Footer() {
  const { settings: s } = useSiteSettings();
  const { data: services } = useTable<Service>('services');

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                {s?.company_name ?? 'TankPro'}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{s?.description}</p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 transition-colors hover:bg-primary-600 hover:text-white" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 transition-colors hover:bg-primary-600 hover:text-white" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 transition-colors hover:bg-primary-600 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Layanan</h4>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="text-sm transition-colors hover:text-primary-400">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Navigasi</h4>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-sm transition-colors hover:text-primary-400">Beranda</Link></li>
              <li><Link to="/services" className="text-sm transition-colors hover:text-primary-400">Layanan</Link></li>
              <li><Link to="/projects" className="text-sm transition-colors hover:text-primary-400">Proyek</Link></li>
              <li><Link to="/about" className="text-sm transition-colors hover:text-primary-400">Tentang Kami</Link></li>
              <li><Link to="/contact" className="text-sm transition-colors hover:text-primary-400">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Hubungi Kami</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-sm">{s?.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <a href={`tel:${(s?.phone ?? '').replace(/\s/g, '')}`} className="text-sm transition-colors hover:text-primary-400">{s?.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <a href={`mailto:${s?.email}`} className="text-sm transition-colors hover:text-primary-400">{s?.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-sm">{s?.hours}</span>
              </li>
            </ul>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300">
              Kirim Inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {s?.company_name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">{s?.footer_cert_text}</p>
        </div>
      </div>
    </footer>
  );
}
