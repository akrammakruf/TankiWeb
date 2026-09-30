import CrudManager, { type FieldDef } from '@/components/CrudManager';

export default function AdminProjects() {
  const fields: FieldDef[] = [
    { key: 'title', label: 'Judul Proyek', type: 'text', required: true },
    { key: 'category', label: 'Kategori', type: 'text', required: true, placeholder: 'Tank Cleaning, Tank Measurement, dll' },
    { key: 'location', label: 'Lokasi', type: 'text' },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
    { key: 'image_url', label: 'URL Gambar', type: 'text' },
    { key: 'client', label: 'Klien', type: 'text' },
    { key: 'completed_at', label: 'Tanggal Selesai', type: 'text', placeholder: '2025-08-15' },
  ];
  return (
    <CrudManager
      table="projects"
      title="Proyek"
      description="Portofolio proyek di halaman Proyek"
      fields={fields}
      displayFields={[
        { key: 'title', label: 'Judul' },
        { key: 'category', label: 'Kategori' },
        { key: 'client', label: 'Klien' },
      ]}
      orderField="completed_at"
    />
  );
}
