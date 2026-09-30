import CrudManager, { type FieldDef } from '@/components/CrudManager';

export default function AdminTestimonials() {
  const fields: FieldDef[] = [
    { key: 'author_name', label: 'Nama', type: 'text', required: true },
    { key: 'author_role', label: 'Jabatan', type: 'text' },
    { key: 'author_company', label: 'Perusahaan', type: 'text' },
    { key: 'content', label: 'Isi Testimoni', type: 'textarea', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
  ];
  return (
    <CrudManager
      table="testimonials"
      title="Testimoni"
      description="Testimoni klien di beranda"
      fields={fields}
      displayFields={[
        { key: 'author_name', label: 'Nama' },
        { key: 'author_company', label: 'Perusahaan' },
        { key: 'rating', label: 'Rating' },
      ]}
      orderField="created_at"
    />
  );
}
