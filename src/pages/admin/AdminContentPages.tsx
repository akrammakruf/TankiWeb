import CrudManager, { type FieldDef } from '@/components/CrudManager';
import { iconNames } from '@/lib/icons';

const iconOptions = iconNames;

export function AdminServices() {
  const fields: FieldDef[] = [
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
    { key: 'title', label: 'Judul Layanan', type: 'text', required: true },
    { key: 'short', label: 'Deskripsi Singkat', type: 'textarea', required: true },
    { key: 'description', label: 'Deskripsi Lengkap', type: 'textarea', required: true },
    { key: 'features', label: 'Fitur Layanan', type: 'array' },
    { key: 'image_url', label: 'URL Gambar', type: 'text' },
  ];
  return (
    <CrudManager
      table="services"
      title="Layanan"
      description="Kelola daftar layanan perusahaan"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminStats() {
  const fields: FieldDef[] = [
    { key: 'value', label: 'Nilai (angka saja)', type: 'text', required: true, placeholder: '500' },
    { key: 'suffix', label: 'Suffix', type: 'text', required: true, placeholder: '+ atau %' },
    { key: 'label', label: 'Label', type: 'text', required: true, placeholder: 'Proyek Selesai' },
  ];
  return (
    <CrudManager
      table="stats"
      title="Statistik"
      description="Angka statistik yang tampil di hero beranda"
      fields={fields}
      displayFields={[{ key: 'value', label: 'Nilai' }, { key: 'suffix', label: 'Suffix' }, { key: 'label', label: 'Label' }]}
    />
  );
}

export function AdminClients() {
  const fields: FieldDef[] = [
    { key: 'name', label: 'Nama Klien', type: 'text', required: true },
  ];
  return (
    <CrudManager
      table="clients"
      title="Klien"
      description="Daftar nama klien yang tampil di marquee beranda"
      fields={fields}
      displayFields={[{ key: 'name', label: 'Nama Klien' }]}
    />
  );
}

export function AdminCapabilities() {
  const fields: FieldDef[] = [
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'value', label: 'Nilai', type: 'text', required: true },
  ];
  return (
    <CrudManager
      table="capabilities"
      title="Capaian"
      description="Angka capaian di section gelap beranda"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'value', label: 'Nilai' }, { key: 'label', label: 'Label' }]}
    />
  );
}

export function AdminIndustries() {
  const fields: FieldDef[] = [
    { key: 'name', label: 'Nama Industri', type: 'text', required: true },
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
  ];
  return (
    <CrudManager
      table="industries"
      title="Industri"
      description="Sektor industri yang dilayani di beranda"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'name', label: 'Nama' }]}
    />
  );
}

export function AdminWhyChoose() {
  const fields: FieldDef[] = [
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
    { key: 'title', label: 'Judul', type: 'text', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  ];
  return (
    <CrudManager
      table="why_choose_us"
      title="Keunggulan"
      description="Alasan mengapa memilih TankPro di beranda"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminValues() {
  const fields: FieldDef[] = [
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
    { key: 'title', label: 'Judul', type: 'text', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  ];
  return (
    <CrudManager
      table="company_values"
      title="Nilai Perusahaan"
      description="Nilai-nilai perusahaan di halaman Tentang Kami"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminCertifications() {
  const fields: FieldDef[] = [
    { key: 'code', label: 'Kode Sertifikasi', type: 'text', required: true, placeholder: 'ISO 9001:2015' },
    { key: 'description', label: 'Deskripsi', type: 'text', required: true },
  ];
  return (
    <CrudManager
      table="certifications"
      title="Sertifikasi"
      description="Sertifikasi dan standar perusahaan"
      fields={fields}
      displayFields={[{ key: 'code', label: 'Kode' }, { key: 'description', label: 'Deskripsi' }]}
    />
  );
}

export function AdminMilestones() {
  const fields: FieldDef[] = [
    { key: 'year', label: 'Tahun', type: 'text', required: true },
    { key: 'title', label: 'Judul', type: 'text', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  ];
  return (
    <CrudManager
      table="milestones"
      title="Milestone"
      description="Timeline perjalanan perusahaan di halaman Tentang Kami"
      fields={fields}
      displayFields={[{ key: 'year', label: 'Tahun' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminProcess() {
  const fields: FieldDef[] = [
    { key: 'number', label: 'Nomor', type: 'text', required: true, placeholder: '01' },
    { key: 'title', label: 'Judul', type: 'text', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  ];
  return (
    <CrudManager
      table="process_steps"
      title="Proses Kerja"
      description="Langkah-langkah proses kerja di halaman Layanan"
      fields={fields}
      displayFields={[{ key: 'number', label: 'No' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminFeatures() {
  const fields: FieldDef[] = [
    { key: 'icon', label: 'Ikon', type: 'icon', options: iconOptions, required: true },
    { key: 'title', label: 'Judul', type: 'text', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  ];
  return (
    <CrudManager
      table="feature_items"
      title="Fitur Teknologi"
      description="Fitur teknologi di section feature split beranda"
      fields={fields}
      displayFields={[{ key: 'icon', label: 'Ikon' }, { key: 'title', label: 'Judul' }]}
    />
  );
}

export function AdminTeam() {
  const fields: FieldDef[] = [
    { key: 'name', label: 'Nama', type: 'text', required: true },
    { key: 'role', label: 'Jabatan', type: 'text', required: true },
    { key: 'image_url', label: 'URL Foto', type: 'text', required: true },
  ];
  return (
    <CrudManager
      table="team_members"
      title="Tim Kepemimpinan"
      description="Anggota tim kepemimpinan di halaman Tentang Kami"
      fields={fields}
      displayFields={[{ key: 'name', label: 'Nama' }, { key: 'role', label: 'Jabatan' }]}
    />
  );
}
