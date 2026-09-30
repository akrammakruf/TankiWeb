export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string | null;
  description: string;
  image_url: string | null;
  client: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  content: string;
  rating: number;
  created_at: string;
}

export interface NewInquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  message: string;
}

export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  founded: string;
  hero_image_url: string;
  hero_badge: string;
  hero_title: string;
  hero_description: string;
  about_image_url: string;
  about_badge_value: string;
  about_badge_label: string;
  emergency_title: string;
  emergency_description: string;
  cta_title: string;
  cta_description: string;
  map_embed_url: string;
  footer_cert_text: string;
}

export interface PageContent {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  description_2: string | null;
  description_3: string | null;
  badge_value: string | null;
  badge_label: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  suffix: string;
  sort_order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface Capability {
  id: string;
  icon: string;
  label: string;
  value: string;
  sort_order: number;
  created_at: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface CompanyValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface Certification {
  id: string;
  code: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}
