/*
# Create Content Management Schema

Creates all tables needed to make every piece of website content editable
from an admin panel without touching code.

## New Tables
- site_settings: single-row company-wide settings (name, contact, hero, CTA, etc.)
- page_content: section headers/titles for each page (hero titles, section descriptions)
- services: service catalog with features
- stats: homepage animated stats
- team_members: leadership team
- clients: marquee client names
- capabilities: capability numbers banner
- industries: industries served grid
- why_choose_us: why choose us cards
- company_values: company values
- certifications: certifications
- milestones: timeline milestones
- process_steps: how we work process
- feature_items: technology feature items on homepage

## Security
- All content tables: anon+authenticated can SELECT (public reads), authenticated-only for INSERT/UPDATE/DELETE (admin writes)
- site_settings: anon+authenticated SELECT, authenticated-only UPDATE
*/

-- ============================================================
-- site_settings (single row, id=1)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id int PRIMARY KEY DEFAULT 1,
  company_name text NOT NULL DEFAULT 'TankPro',
  tagline text NOT NULL DEFAULT 'Tank Cleaning & Measurement Solutions',
  description text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  hours text NOT NULL DEFAULT '',
  founded text NOT NULL DEFAULT '2009',
  hero_image_url text NOT NULL DEFAULT '',
  hero_badge text NOT NULL DEFAULT '',
  hero_title text NOT NULL DEFAULT '',
  hero_description text NOT NULL DEFAULT '',
  about_image_url text NOT NULL DEFAULT '',
  about_badge_value text NOT NULL DEFAULT '',
  about_badge_label text NOT NULL DEFAULT '',
  emergency_title text NOT NULL DEFAULT '',
  emergency_description text NOT NULL DEFAULT '',
  cta_title text NOT NULL DEFAULT '',
  cta_description text NOT NULL DEFAULT '',
  map_embed_url text NOT NULL DEFAULT '',
  footer_cert_text text NOT NULL DEFAULT ''
);

INSERT INTO site_settings (id, company_name, tagline, description, email, phone, whatsapp, address, hours, founded,
  hero_image_url, hero_badge, hero_title, hero_description,
  about_image_url, about_badge_value, about_badge_label,
  emergency_title, emergency_description,
  cta_title, cta_description,
  map_embed_url, footer_cert_text)
SELECT 1, 'TankPro', 'Tank Cleaning & Measurement Solutions',
  'Layanan profesional pembersihan dan pengukuran tangki industri dengan standar keselamatan tertinggi dan teknologi terkini.',
  'info@tankpro.co.id', '+62 21 5550 1234', '+62 812 3456 7890',
  'Jl. Industri Raya No. 88, Kawasan Industri Cilegon, Banten 42435, Indonesia',
  'Senin - Jumat: 08.00 - 17.00 WIB', '2009',
  'https://images.pexels.com/photos/6767963/pexels-photo-6767963.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
  'Dipercaya oleh 50+ Klien Industri di Seluruh Indonesia',
  'Solusi Profesional Pembersihan & Pengukuran Tangki Industri',
  'Melayani pertambangan, kilang minyak, pabrik kimia, dan fasilitas industri di seluruh Indonesia dengan standar keselamatan tertinggi.',
  'https://images.pexels.com/photos/11939725/pexels-photo-11939725.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '15+', 'Tahun Pengalaman',
  'Butuh Respons Darurat 24/7?',
  'Tim kami siap siaga dengan mobilisasi dalam 2 jam ke lokasi Anda.',
  'Siap Mendiskusikan Kebutuhan Tangki Anda?',
  'Tim ahli kami siap memberikan konsultasi gratis dan penawaran terbaik untuk kebutuhan pembersihan dan pengukuran tangki industri Anda.',
  'https://www.openstreetmap.org/export/embed.html?bbox=106.0%2C-6.0%2C106.1%2C-5.9&layer=mapnik',
  'ISO 9001:2015 Certified · ISO 45001:2018 Certified'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_settings" ON site_settings;
CREATE POLICY "anon_select_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_settings" ON site_settings;
CREATE POLICY "auth_update_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- page_content (section headers per page)
-- ============================================================
CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  title text,
  subtitle text,
  description text,
  description_2 text,
  description_3 text,
  badge_value text,
  badge_label text,
  image_url text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(page, section)
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_page_content" ON page_content;
CREATE POLICY "anon_select_page_content" ON page_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_page_content" ON page_content;
CREATE POLICY "auth_insert_page_content" ON page_content FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_page_content" ON page_content;
CREATE POLICY "auth_update_page_content" ON page_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_page_content" ON page_content;
CREATE POLICY "auth_delete_page_content" ON page_content FOR DELETE TO authenticated USING (true);

-- ============================================================
-- Helper: create standard content table with RLS
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Droplets',
  title text NOT NULL,
  short text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_services" ON services;
CREATE POLICY "auth_insert_services" ON services FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_services" ON services;
CREATE POLICY "auth_update_services" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_services" ON services;
CREATE POLICY "auth_delete_services" ON services FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  suffix text NOT NULL DEFAULT '+',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_stats" ON stats;
CREATE POLICY "anon_select_stats" ON stats FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_stats" ON stats;
CREATE POLICY "auth_insert_stats" ON stats FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_stats" ON stats;
CREATE POLICY "auth_update_stats" ON stats FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_stats" ON stats;
CREATE POLICY "auth_delete_stats" ON stats FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_team" ON team_members;
CREATE POLICY "anon_select_team" ON team_members FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_team" ON team_members;
CREATE POLICY "auth_insert_team" ON team_members FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_team" ON team_members;
CREATE POLICY "auth_update_team" ON team_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_team" ON team_members;
CREATE POLICY "auth_delete_team" ON team_members FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_clients" ON clients;
CREATE POLICY "anon_select_clients" ON clients FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_clients" ON clients;
CREATE POLICY "auth_insert_clients" ON clients FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_clients" ON clients;
CREATE POLICY "auth_update_clients" ON clients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_clients" ON clients;
CREATE POLICY "auth_delete_clients" ON clients FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Gauge',
  label text NOT NULL,
  value text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_capabilities" ON capabilities;
CREATE POLICY "anon_select_capabilities" ON capabilities FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_capabilities" ON capabilities;
CREATE POLICY "auth_insert_capabilities" ON capabilities FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_capabilities" ON capabilities;
CREATE POLICY "auth_update_capabilities" ON capabilities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_capabilities" ON capabilities;
CREATE POLICY "auth_delete_capabilities" ON capabilities FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Droplets',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_industries" ON industries;
CREATE POLICY "anon_select_industries" ON industries FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_industries" ON industries;
CREATE POLICY "auth_insert_industries" ON industries FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_industries" ON industries;
CREATE POLICY "auth_update_industries" ON industries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_industries" ON industries;
CREATE POLICY "auth_delete_industries" ON industries FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS why_choose_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'ShieldCheck',
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE why_choose_us ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_why" ON why_choose_us;
CREATE POLICY "anon_select_why" ON why_choose_us FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_why" ON why_choose_us;
CREATE POLICY "auth_insert_why" ON why_choose_us FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_why" ON why_choose_us;
CREATE POLICY "auth_update_why" ON why_choose_us FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_why" ON why_choose_us;
CREATE POLICY "auth_delete_why" ON why_choose_us FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS company_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Heart',
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE company_values ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_values" ON company_values;
CREATE POLICY "anon_select_values" ON company_values FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_values" ON company_values;
CREATE POLICY "auth_insert_values" ON company_values FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_values" ON company_values;
CREATE POLICY "auth_update_values" ON company_values FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_values" ON company_values;
CREATE POLICY "auth_delete_values" ON company_values FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_certs" ON certifications;
CREATE POLICY "anon_select_certs" ON certifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_certs" ON certifications;
CREATE POLICY "auth_insert_certs" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_certs" ON certifications;
CREATE POLICY "auth_update_certs" ON certifications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_certs" ON certifications;
CREATE POLICY "auth_delete_certs" ON certifications FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_milestones" ON milestones;
CREATE POLICY "anon_select_milestones" ON milestones FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_milestones" ON milestones;
CREATE POLICY "auth_insert_milestones" ON milestones FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_milestones" ON milestones;
CREATE POLICY "auth_update_milestones" ON milestones FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_milestones" ON milestones;
CREATE POLICY "auth_delete_milestones" ON milestones FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_process" ON process_steps;
CREATE POLICY "anon_select_process" ON process_steps FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_process" ON process_steps;
CREATE POLICY "auth_insert_process" ON process_steps FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_process" ON process_steps;
CREATE POLICY "auth_update_process" ON process_steps FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_process" ON process_steps;
CREATE POLICY "auth_delete_process" ON process_steps FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS feature_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Gauge',
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE feature_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_features" ON feature_items;
CREATE POLICY "anon_select_features" ON feature_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_features" ON feature_items;
CREATE POLICY "auth_insert_features" ON feature_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_features" ON feature_items;
CREATE POLICY "auth_update_features" ON feature_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_features" ON feature_items;
CREATE POLICY "auth_delete_features" ON feature_items FOR DELETE TO authenticated USING (true);
