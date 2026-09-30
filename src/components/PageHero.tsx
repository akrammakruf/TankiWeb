interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-600/10 blur-3xl" />
      <div className="container-custom relative">
        <p className="text-sm font-medium uppercase tracking-widest text-primary-400">
          {breadcrumb}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-white text-balance lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
