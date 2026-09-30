import { useCountUp } from '@/lib/hooks';

interface AnimatedStatProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

export default function AnimatedStat({ value, label, suffix = '', delay = 0 }: AnimatedStatProps) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const { ref, count } = useCountUp<HTMLParagraphElement>(numericValue, 2000);

  return (
    <div className="text-center" style={{ transitionDelay: `${delay}ms` }}>
      <p ref={ref} className="text-4xl font-extrabold text-white lg:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </p>
    </div>
  );
}
