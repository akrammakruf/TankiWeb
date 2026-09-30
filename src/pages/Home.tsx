import { Link } from 'react-router-dom';
import {
  ArrowRight, Phone, ChevronRight,
} from 'lucide-react';
import { useAllContent } from '@/lib/useContent';
import { getIcon } from '@/lib/icons';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import AnimatedStat from '@/components/AnimatedStat';

export default function Home() {
  const { content, loading } = useAllContent(['home']);

  if (loading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const s = content.settings;
  const pc = (section: string) => content.pageContent[`home.${section}`];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <img
            src={s?.hero_image_url ?? ''}
            alt="Industrial storage tanks"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>

        {/* Floating decorative orbs */}
        <div className="absolute right-20 top-32 h-64 w-64 rounded-full bg-primary-700/20 blur-3xl animate-drift" />
        <div className="absolute bottom-40 left-10 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl animate-float-slow" />

        <div className="container-custom relative flex min-h-screen flex-col justify-center pt-20">
          <div className="max-w-3xl">
            <h1
              className="mt-6 text-4xl font-extrabold leading-tight text-white text-balance sm:text-5xl lg:text-6xl animate-fade-in-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              {s?.hero_title}
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 animate-fade-in-up"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              {s?.description} {s?.hero_description}
            </p>

            <div
              className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up"
              style={{ animationDelay: '0.6s', opacity: 0 }}
            >
              <Link to="/contact" className="btn-primary">
                Konsultasi Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
              >
                Pelajari Layanan
              </Link>
            </div>

            {/* Animated stats */}
            <div
              className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pb-10 pt-8 sm:grid-cols-4 animate-fade-in-up"
              style={{ animationDelay: '0.8s', opacity: 0 }}
            >
              {content.stats.map((stat, i) => (
                <AnimatedStat
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={i * 150}
                />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ===== CLIENT MARQUEE ===== */}
      <section className="border-y border-neutral-800 bg-neutral-900 py-14 lg:py-16">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Dipercaya oleh perusahaan industri terkemuka
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...content.clients, ...content.clients].map((client, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-bold uppercase tracking-wider text-neutral-600 transition-colors hover:text-neutral-400"
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                {pc('why_choose')?.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                {pc('why_choose')?.title}
              </h2>
              <p className="mt-4 text-neutral-600">
                {pc('why_choose')?.description}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.id} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-50/60 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="relative mt-5 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES BANNER ===== */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-24">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl animate-drift" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-600/10 blur-3xl animate-float-slow" />

        <div className="container-custom relative">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">
                {pc('capabilities')?.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-white text-balance lg:text-4xl">
                {pc('capabilities')?.title}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {content.capabilities.map((cap, i) => {
              const Icon = getIcon(cap.icon);
              return (
                <Reveal key={cap.id} delay={i * 120} direction="up">
                  <div className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary-400/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mt-4 text-3xl font-extrabold text-white">{cap.value}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-400">{cap.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
            <Reveal direction="left">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                  {pc('services_preview')?.subtitle}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                  {pc('services_preview')?.title}
                </h2>
                <p className="mt-4 text-neutral-600">
                  {pc('services_preview')?.description}
                </p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all hover:gap-3">
                Semua Layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.slice(0, 6).map((service, i) => (
              <Reveal key={service.id} delay={i * 100} direction="up">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  short={service.short}
                  id={service.id}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURE SPLIT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img src={pc('feature_split')?.image_url ?? ''} alt="Technology" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 p-6 text-white shadow-2xl lg:block animate-float">
                  <p className="text-3xl font-extrabold">40K</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent-100">PSI Hydro-Jetting</p>
                </div>
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full border-2 border-dashed border-primary-200 animate-spin-slow" />
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                  {pc('feature_split')?.subtitle}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                  {pc('feature_split')?.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {pc('feature_split')?.description}
                </p>

                <div className="mt-8 space-y-4">
                  {content.featureItems.map((item, i) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <Reveal key={item.id} delay={200 + i * 100} direction="up">
                        <div className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-primary-200 hover:bg-white hover:shadow-md">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all hover:gap-3">
                  Pelajari Lebih Lanjut <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                {pc('industries')?.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                {pc('industries')?.title}
              </h2>
              <p className="mt-4 text-neutral-600">{pc('industries')?.description}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {content.industries.map((industry, i) => {
              const Icon = getIcon(industry.icon);
              return (
                <Reveal key={industry.id} delay={i * 80} direction="scale">
                  <div className="group flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-200">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-neutral-700">{industry.name}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
            <Reveal direction="left">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                  {pc('projects')?.subtitle}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                  {pc('projects')?.title}
                </h2>
                <p className="mt-4 text-neutral-600">{pc('projects')?.description}</p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all hover:gap-3">
                Semua Proyek <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 120} direction="up">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                {pc('testimonials')?.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
                {pc('testimonials')?.title}
              </h2>
              <p className="mt-4 text-neutral-600">{pc('testimonials')?.description}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 120} direction={i === 1 ? 'up' : i === 0 ? 'left' : 'right'}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY CTA STRIP ===== */}
      <section className="bg-gradient-to-r from-primary-700 via-primary-800 to-neutral-900 py-12">
        <div className="container-custom">
          <Reveal direction="scale">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{s?.emergency_title}</h3>
                  <p className="text-sm text-primary-200">{s?.emergency_description}</p>
                </div>
              </div>
              <a
                href={`tel:${(s?.phone ?? '').replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary-700 shadow-lg transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                {s?.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title={s?.cta_title} description={s?.cta_description} />
    </div>
  );
}
