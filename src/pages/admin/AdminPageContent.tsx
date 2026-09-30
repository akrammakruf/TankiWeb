import CrudManager, { type FieldDef } from '@/components/CrudManager';

export default function AdminPageContent() {
  const fields: FieldDef[] = [
    { key: 'page', label: 'Halaman', type: 'select', options: ['home', 'about', 'services', 'projects', 'contact'], required: true },
    { key: 'section', label: 'Section (ID unik)', type: 'text', required: true, placeholder: 'why_choose, hero, story, dll' },
    { key: 'title', label: 'Judul', type: 'text' },
    { key: 'subtitle', label: 'Subtitle/Badge', type: 'text' },
    { key: 'description', label: 'Deskripsi 1', type: 'textarea' },
    { key: 'description_2', label: 'Deskripsi 2', type: 'textarea' },
    { key: 'description_3', label: 'Deskripsi 3', type: 'textarea' },
    { key: 'image_url', label: 'URL Gambar', type: 'text' },
  ];
  return (
    <CrudManager
      table="page_content"
      title="Judul & Deskripsi Halaman"
      description="Edit judul, subtitle, dan deskripsi untuk setiap section di semua halaman"
      fields={fields}
      displayFields={[
        { key: 'page', label: 'Halaman' },
        { key: 'section', label: 'Section' },
        { key: 'title', label: 'Judul' },
      ]}
      orderField="sort_order"
    />
  );
}
