/*
# Create Company Profile Database Schema

This migration creates the database tables for a tank cleaning and measurement
company profile website. The site is single-tenant (no sign-in), so all tables
allow anon + authenticated access via RLS policies.

## New Tables

### `inquiries`
Stores contact form submissions from website visitors.
- `id` (uuid, primary key)
- `name` (text, not null) — visitor's full name
- `email` (text, not null) — visitor's email address
- `phone` (text) — optional phone number
- `company` (text) — optional company name
- `service_type` (text) — which service they're interested in
- `message` (text, not null) — their inquiry message
- `status` (text, default 'new') — inquiry status: new, contacted, closed
- `created_at` (timestamptz, default now())

### `projects`
Stores portfolio/project showcase entries.
- `id` (uuid, primary key)
- `title` (text, not null)
- `category` (text, not null) — e.g. cleaning, measurement, maintenance
- `location` (text)
- `description` (text, not null)
- `image_url` (text)
- `client` (text)
- `completed_at` (date)
- `created_at` (timestamptz, default now())

### `testimonials`
Stores client testimonials/reviews.
- `id` (uuid, primary key)
- `author_name` (text, not null)
- `author_role` (text) — e.g. "Operations Manager"
- `author_company` (text)
- `content` (text, not null) — the testimonial text
- `rating` (int, default 5, range 1-5)
- `created_at` (timestamptz, default now())

## Security

- RLS enabled on all tables.
- `inquiries`: anon can insert (contact form); only authenticated can read/update/delete (admin-side).
- `projects`: anon + authenticated can read (public portfolio); only authenticated can write.
- `testimonials`: anon + authenticated can read (public display); only authenticated can write.
*/

-- ============================================================
-- inquiries table
-- ============================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_type text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_inquiries" ON inquiries;
CREATE POLICY "auth_select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_inquiries" ON inquiries;
CREATE POLICY "auth_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_inquiries" ON inquiries;
CREATE POLICY "auth_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- projects table
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  location text,
  description text NOT NULL,
  image_url text,
  client text,
  completed_at date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- testimonials table
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  author_company text,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);
