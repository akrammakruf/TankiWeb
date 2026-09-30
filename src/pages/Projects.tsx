import { useState, useEffect, useMemo } from 'react';
import { Loader2, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/lib/types';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import CTASection from '@/components/CTASection';
import { usePageContent } from '@/lib/useContent';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [error, setError] = useState<string | null>(null);
  const { content: pc, loading: pcLoading } = usePageContent('projects');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('completed_at', { ascending: false });
      if (error) {
        setError('Gagal memuat data proyek. Silakan coba lagi nanti.');
      } else {
        setProjects(data ?? []);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['Semua', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const heroPc = pc['hero'];
  const ctaPc = pc['cta'];

  return (
    <div>
      <PageHero
        breadcrumb={heroPc?.subtitle ?? 'Proyek'}
        title={heroPc?.title ?? ''}
        subtitle={heroPc?.description ?? ''}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <p className="text-sm text-neutral-500">Memuat proyek...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-error-200 bg-error-50 py-20 text-center">
              <p className="text-sm font-medium text-error-700">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-secondary">Coba Lagi</button>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <Filter className="h-4 w-4" />
                  Filter Kategori:
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeCategory === category
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-6 text-sm text-neutral-500">Menampilkan {filteredProjects.length} proyek</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-sm text-neutral-500">Tidak ada proyek dalam kategori ini.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection title={ctaPc?.title ?? undefined} description={ctaPc?.description ?? undefined} />
    </div>
  );
}
