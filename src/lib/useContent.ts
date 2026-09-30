import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  SiteSettings, PageContent, Service, Stat, TeamMember, Client,
  Capability, Industry, WhyChooseUs, CompanyValue, Certification,
  Milestone, ProcessStep, FeatureItem, Project, Testimonial,
} from '@/lib/types';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
      .then(({ data }) => {
        setSettings(data as SiteSettings | null);
        setLoading(false);
      });
  }, []);

  return { settings, loading };
}

export function useTable<T>(
  table: string,
  orderBy: string = 'sort_order',
  ascending: boolean = true
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from(table).select('*').order(orderBy, { ascending })
      .then(({ data: result }) => {
        setData((result ?? []) as T[]);
        setLoading(false);
      });
  }, [table, orderBy, ascending]);

  return { data, loading, setData };
}

export function usePageContent(page: string) {
  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('page_content').select('*').eq('page', page)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        const map: Record<string, PageContent> = {};
        (data ?? []).forEach((item) => {
          map[item.section] = item as PageContent;
        });
        setContent(map);
        setLoading(false);
      });
  }, [page]);

  return { content, loading };
}

export type AllContent = {
  settings: SiteSettings | null;
  pageContent: Record<string, PageContent>;
  services: Service[];
  stats: Stat[];
  team: TeamMember[];
  clients: Client[];
  capabilities: Capability[];
  industries: Industry[];
  whyChooseUs: WhyChooseUs[];
  values: CompanyValue[];
  certifications: Certification[];
  milestones: Milestone[];
  processSteps: ProcessStep[];
  featureItems: FeatureItem[];
  projects: Project[];
  testimonials: Testimonial[];
};

export function useAllContent(pages: string[]) {
  const [content, setContent] = useState<AllContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [
        settingsRes, pageContentRes, servicesRes, statsRes, teamRes,
        clientsRes, capabilitiesRes, industriesRes, whyRes, valuesRes,
        certsRes, milestonesRes, processRes, featuresRes, projectsRes,
        testimonialsRes,
      ] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
        supabase.from('page_content').select('*').in('page', pages).order('sort_order', { ascending: true }),
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
        supabase.from('stats').select('*').order('sort_order', { ascending: true }),
        supabase.from('team_members').select('*').order('sort_order', { ascending: true }),
        supabase.from('clients').select('*').order('sort_order', { ascending: true }),
        supabase.from('capabilities').select('*').order('sort_order', { ascending: true }),
        supabase.from('industries').select('*').order('sort_order', { ascending: true }),
        supabase.from('why_choose_us').select('*').order('sort_order', { ascending: true }),
        supabase.from('company_values').select('*').order('sort_order', { ascending: true }),
        supabase.from('certifications').select('*').order('sort_order', { ascending: true }),
        supabase.from('milestones').select('*').order('sort_order', { ascending: true }),
        supabase.from('process_steps').select('*').order('sort_order', { ascending: true }),
        supabase.from('feature_items').select('*').order('sort_order', { ascending: true }),
        supabase.from('projects').select('*').order('completed_at', { ascending: false }).limit(3),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }).limit(3),
      ]);

      const pageMap: Record<string, PageContent> = {};
      (pageContentRes.data ?? []).forEach((item) => {
        pageMap[`${item.page}.${item.section}`] = item as PageContent;
      });

      setContent({
        settings: settingsRes.data as SiteSettings | null,
        pageContent: pageMap,
        services: (servicesRes.data ?? []) as Service[],
        stats: (statsRes.data ?? []) as Stat[],
        team: (teamRes.data ?? []) as TeamMember[],
        clients: (clientsRes.data ?? []) as Client[],
        capabilities: (capabilitiesRes.data ?? []) as Capability[],
        industries: (industriesRes.data ?? []) as Industry[],
        whyChooseUs: (whyRes.data ?? []) as WhyChooseUs[],
        values: (valuesRes.data ?? []) as CompanyValue[],
        certifications: (certsRes.data ?? []) as Certification[],
        milestones: (milestonesRes.data ?? []) as Milestone[],
        processSteps: (processRes.data ?? []) as ProcessStep[],
        featureItems: (featuresRes.data ?? []) as FeatureItem[],
        projects: (projectsRes.data ?? []) as Project[],
        testimonials: (testimonialsRes.data ?? []) as Testimonial[],
      });
      setLoading(false);
    };

    fetchAll();
  }, [pages.join(',')]);

  return { content, loading };
}
