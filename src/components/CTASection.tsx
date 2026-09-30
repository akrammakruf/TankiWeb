import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/lib/useContent';

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({ title, description }: CTASectionProps) {
  const { settings } = useSiteSettings();

  const ctaTitle = title ?? settings?.cta_title ?? 'Siap Mendiskusikan Kebutuhan Tangki Anda?';
  const ctaDesc = description ?? settings?.cta_description ?? 'Tim ahli kami siap memberikan konsultasi gratis.';

  return (
    <section className="section-padding bg-neutral-900">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-neutral-900 px-6 py-16 text-center lg:px-16 lg:py-24">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white text-balance lg:text-4xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-100 lg:text-lg">
              {ctaDesc}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="btn-accent">
                Konsultasi Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Lihat Portofolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
