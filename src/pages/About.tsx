import { Target, Eye, Heart, Award } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useAllContent } from '@/lib/useContent';
import { getIcon } from '@/lib/icons';

export default function About() {
  const { content, loading } = useAllContent(['about']);

  if (loading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const s = content.settings;
  const pc = (section: string) => content.pageContent[`about.${section}`];
  const heroPc = pc('hero');
  const storyPc = pc('story');
  const missionPc = pc('mission');
  const visionPc = pc('vision');
  const valuesPc = pc('values');
  const milestonesPc = pc('milestones');
  const teamPc = pc('team');
  const certsPc = pc('certifications');

  return (
    <div>
      <PageHero
        breadcrumb={heroPc?.subtitle ?? 'Tentang Kami'}
        title={heroPc?.title ?? ''}
        subtitle={heroPc?.description ?? ''}
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img src={s?.about_image_url ?? ''} alt="Industrial facility" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary-600 p-6 text-white shadow-2xl lg:block">
                <p className="text-4xl font-extrabold">{s?.about_badge_value}</p>
                <p className="text-sm font-medium text-primary-100">{s?.about_badge_label}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{storyPc?.subtitle}</p>
              <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">{storyPc?.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-600">
                <p>{storyPc?.description}</p>
                <p>{storyPc?.description_2}</p>
                <p>{storyPc?.description_3}</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {content.stats.map((stat) => (
                  <div key={stat.id} className="rounded-xl border border-neutral-200 p-4">
                    <p className="text-2xl font-extrabold text-primary-600">{stat.value}{stat.suffix}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-neutral-900">{missionPc?.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{missionPc?.description}</p>
            </div>
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-neutral-900">{visionPc?.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{visionPc?.description}</p>
            </div>
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning-50 text-warning-600">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-neutral-900">{valuesPc?.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{valuesPc?.description}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div key={value.id} className="card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-neutral-900">{value.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{milestonesPc?.subtitle}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">{milestonesPc?.title}</h2>
          </div>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-neutral-200 lg:left-1/2 lg:-translate-x-1/2" />
              <div className="space-y-8">
                {content.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className={`relative flex items-start gap-6 lg:w-1/2 ${
                      index % 2 === 0
                        ? 'lg:ml-auto lg:flex-row lg:pl-12'
                        : 'lg:mr-auto lg:flex-row-reverse lg:pr-12 lg:text-right'
                    }`}
                  >
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-primary-600 shadow lg:left-1/2 lg:-translate-x-1/2" />
                    <div className="ml-8 lg:ml-0">
                      <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">{milestone.year}</span>
                      <h3 className="mt-3 text-lg font-bold text-neutral-900">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{teamPc?.subtitle}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">{teamPc?.title}</h2>
            <p className="mt-4 text-neutral-600">{teamPc?.description}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.team.map((member) => (
              <div key={member.id} className="card group overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <img src={member.image_url} alt={member.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/0 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-bold text-white">{member.name}</h3>
                    <p className="text-xs font-medium text-primary-200">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{certsPc?.subtitle}</p>
              <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 text-balance lg:text-4xl">{certsPc?.title}</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.certifications.map((cert) => (
                <div key={cert.id} className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                  <Award className="h-10 w-10 text-primary-600" />
                  <p className="mt-3 text-sm font-bold text-neutral-900">{cert.code}</p>
                  <p className="mt-1 text-xs text-neutral-500">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
