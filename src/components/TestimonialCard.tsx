import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-primary-200" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? 'fill-warning-400 text-warning-400'
                  : 'fill-neutral-200 text-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
          {testimonial.author_name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-900">{testimonial.author_name}</p>
          <p className="text-xs text-neutral-500">
            {testimonial.author_role}
            {testimonial.author_company ? ` · ${testimonial.author_company}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
