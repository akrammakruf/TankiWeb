import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/lib/icons';

interface ServiceCardProps {
  icon: string;
  title: string;
  short: string;
  id: string;
}

export default function ServiceCard({ icon, title, short, id }: ServiceCardProps) {
  const Icon = getIcon(icon);

  return (
    <Link
      to="/services"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary-200"
    >
      {/* Decorative gradient blob that appears on hover */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="relative mt-5 text-lg font-bold text-neutral-900">{title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{short}</p>

      <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-3">
        Selengkapnya
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary-500 to-accent-400 transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
