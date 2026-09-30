import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const categoryColors: Record<string, string> = {
  'Tank Cleaning': 'bg-primary-50 text-primary-700',
  'Tank Measurement': 'bg-accent-50 text-accent-700',
  'Pipeline Cleaning': 'bg-warning-50 text-warning-700',
  'Inspection': 'bg-neutral-100 text-neutral-700',
  'Maintenance': 'bg-primary-50 text-primary-700',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryColor = categoryColors[project.category] ?? 'bg-neutral-100 text-neutral-700';

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="card group flex h-full flex-col overflow-hidden hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image_url ?? ''}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}>
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-neutral-900">{project.title}</h3>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
          {project.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {project.location}
            </span>
          )}
          {project.client && (
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {project.client}
            </span>
          )}
          {project.completed_at && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(project.completed_at)}
            </span>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {project.description}
        </p>

        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all hover:gap-2.5"
        >
          Konsultasi Serupa
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
