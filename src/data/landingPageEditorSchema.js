// Section IDs and field keys follow landingPageData and the full-draft API payload.
export const SECTION_LIST = [
  { id: 'institution', title: 'Identitas pesantren', description: 'Nama, kontak, dan alamat yang tampil di header serta footer.' },
  { id: 'hero', title: 'Bagian pembuka', description: 'Judul penerimaan, ringkasan, dan tombol utama.' },
  { id: 'about', title: 'Profil pesantren', description: 'Cerita singkat dan foto profil.' },
  { id: 'educationList', title: 'Program pendidikan', description: 'Jenjang dan program yang tersedia.' },
  { id: 'offerings', title: 'Jalur penerimaan', description: 'Kuota dan informasi setiap jalur.' },
  { id: 'timelines', title: 'Jadwal penerimaan', description: 'Tahap dan tanggal penting.' },
  { id: 'requirements', title: 'Persyaratan & biaya', description: 'Daftar dokumen dan tarif yang ditampilkan.' },
  { id: 'steps', title: 'Alur pendaftaran', description: 'Langkah pendaftaran untuk wali calon santri.' },
  { id: 'environments', title: 'Fasilitas', description: 'Fasilitas yang diperkenalkan di halaman publik.' },
  { id: 'faqs', title: 'Pertanyaan umum', description: 'Jawaban untuk pertanyaan wali calon santri.' },
];

export const FIELD_CONFIG = {
  institution: [
    { key: 'name', label: 'Nama pesantren', required: true },
    { key: 'tagline', label: 'Semboyan' },
    { key: 'period', label: 'Tahun penerimaan' },
    { key: 'contactPhone', label: 'Nomor WhatsApp', type: 'tel' },
    { key: 'contactEmail', label: 'Email penerimaan', type: 'email' },
    { key: 'address', label: 'Alamat', type: 'textarea' },
  ],
  hero: [
    { key: 'badge', label: 'Label bagian' },
    { key: 'title', label: 'Judul utama', required: true },
    { key: 'subtitle', label: 'Ringkasan', type: 'textarea', required: true },
    { key: 'primaryCtaText', label: 'Teks tombol utama' },
    { key: 'secondaryCtaText', label: 'Teks tombol kedua' },
    { key: 'noticeText', label: 'Pengumuman singkat', type: 'textarea' },
  ],
  about: [
    { key: 'badge', label: 'Label bagian' },
    { key: 'title', label: 'Judul profil', required: true },
    { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
    { key: 'imageUrl', label: 'URL foto profil', type: 'url' },
    { key: 'imageAlt', label: 'Deskripsi foto', requiredWhenImage: true },
    { key: 'imageCaption', label: 'Keterangan foto' },
  ],
  educationList: [
    { key: 'name', label: 'Nama program', required: true },
    { key: 'category', label: 'Kategori' },
    { key: 'description', label: 'Deskripsi', type: 'textarea' },
  ],
  offerings: [
    { key: 'title', label: 'Nama jalur', required: true },
    { key: 'quota', label: 'Kuota', type: 'number', min: 0 },
    { key: 'status', label: 'Status jalur' },
    { key: 'openDate', label: 'Tanggal mulai' },
    { key: 'closeDate', label: 'Tanggal tutup' },
    { key: 'description', label: 'Deskripsi', type: 'textarea' },
  ],
  timelines: [
    { key: 'phase', label: 'Tahap', required: true },
    { key: 'date', label: 'Tanggal' },
    { key: 'status', label: 'Status' },
    { key: 'description', label: 'Keterangan', type: 'textarea' },
    { key: 'stepNumbers', label: 'Nomor langkah terkait', type: 'number-list' },
  ],
  documents: [
    { key: 'name', label: 'Nama dokumen', required: true },
    { key: 'isRequired', label: 'Wajib diserahkan', type: 'checkbox' },
  ],
  fees: [
    { key: 'category', label: 'Jenis biaya', required: true },
    { key: 'amount', label: 'Nominal (rupiah)', type: 'number', min: 0 },
    { key: 'type', label: 'Cakupan tarif' },
  ],
  steps: [
    { key: 'stepNumber', label: 'Nomor langkah', type: 'number', min: 1 },
    { key: 'title', label: 'Judul langkah', required: true },
    { key: 'description', label: 'Keterangan', type: 'textarea' },
  ],
  environments: [
    { key: 'title', label: 'Nama fasilitas', required: true },
    { key: 'description', label: 'Keterangan', type: 'textarea' },
  ],
  faqs: [
    { key: 'question', label: 'Pertanyaan', type: 'textarea', required: true },
    { key: 'answer', label: 'Jawaban', type: 'textarea', required: true },
  ],
};

export const EMPTY_TEMPLATES = {
  educationList: { name: '', category: '', description: '' },
  offerings: { title: '', quota: 0, status: 'Buka', openDate: '', closeDate: '', description: '' },
  timelines: { phase: '', date: '', status: 'Akan Datang', description: '', stepNumbers: [] },
  documents: { name: '', isRequired: true },
  fees: { category: '', amount: 0, type: 'Sekali Bayar' },
  steps: { stepNumber: 1, title: '', description: '' },
  environments: { title: '', description: '' },
  faqs: { question: '', answer: '' },
};

export const COLLECTION_LABELS = {
  educationList: 'Program',
  offerings: 'Jalur',
  timelines: 'Tahap',
  steps: 'Langkah',
  environments: 'Fasilitas',
  faqs: 'Pertanyaan',
};
