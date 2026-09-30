import { Check, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useAllContent } from '@/lib/useContent';
import { getIcon } from '@/lib/icons';
import Reveal from '@/components/Reveal';

export default function Services() {
  const { content, loading } = useAllContent(['services']);

  if (loading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const pc = (section: string) => content.pageContent[`services.${section}`];
  const heroPc = pc('hero');
  const processPc = pc('process');
  const ctaPc = pc('cta');

  return (
    <div>
      <PageHero
        breadcrumb={heroPc?.subtitle ?? 'Layanan'}
        title={heroPc?.title ?? ''}
        subtitle={heroPc?.description ?? ''}
      />

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {content.services.map((service, index) => {
              const Icon = getIcon(service.icon);
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 items-center gap-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10 ${
                    isReversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative h-64 overflow-hidden rounded-2xl lg:h-80">
                    <img src={service.image_url ?? ''} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
                  </div>

                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-2xl font-extrabold text-neutral-900">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{service.description}</p>
                    <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
              {processPc?.subtitle}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">
              {processPc?.title}
            </h2>
            <p className="mt-4 text-neutral-600">{processPc?.description}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.processSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="card p-6">
                  <span className="text-3xl font-extrabold text-primary-100">{step.number}</span>
                  <h3 className="mt-2 text-lg font-bold text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
                </div>
                {index < content.processSteps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-neutral-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={ctaPc?.title ?? undefined} description={ctaPc?.description ?? undefined} />
    </div>
  );
}
