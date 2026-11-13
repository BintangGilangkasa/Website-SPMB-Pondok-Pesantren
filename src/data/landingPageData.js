export const landingPageData = {
  institution: {
    name: "Pesantren Modern Al-Hikmah",
    tagline: "Mencetak Generasi Rabbani, Berakhlak Mulia, dan Berwawasan Global",
    period: "2026/2027",
    contactPhone: "+62 812-3456-7890",
    contactEmail: "spmb@alhikmah-pesantren.sch.id",
    address: "Jl. Raya Salatiga-Solo Km. 5, Pabelan, Kab. Semarang, Jawa Tengah",
  },
  hero: {
    badge: "PENERIMAAN SANTRI BARU T.A 2026/2027",
    title: "Informasi Penerimaan Santri Baru",
    subtitle:
      "Temukan program pendidikan, jenjang formal & diniyah, persyaratan pendaftaran, serta jadwal resmi penerimaan santri baru Pesantren Modern Al-Hikmah.",
    primaryCtaText: "Lihat Jalur Penerimaan",
    secondaryCtaText: "Persyaratan & Biaya",
    noticeText: "Pendaftaran Gelombang 1 Resmi Dibuka hingga 30 April 2026",
  },
  about: {
    badge: "PROFIL PESANTREN",
    title: "Pesantren Modern Al-Hikmah",
    description:
      "Pesantren Modern Al-Hikmah adalah lembaga pendidikan Islam terpadu yang mengombinasikan kurikulum pesantren (Tahfidz & Kitab Turats) dengan kurikulum sains-teknologi nasional. Didukung fasilitas asrama yang representatif dan pengajar profesional, kami berkomitmen mencetak generasi pembelajar yang unggul, mandiri, dan berakhlakul karimah.",
    imageUrl: "",
    imageAlt: "Foto profil Pesantren Modern Al-Hikmah",
    imageCaption: "",
  },
  educationList: [
    {
      id: "edu-1",
      name: "SMP Islam Terpadu (SMPIT)",
      category: "Pendidikan Formal",
      description: "Jenjang sekolah menengah pertama berbasis kurikulum sains terpadu dan penguatan karakter keislaman.",
    },
    {
      id: "edu-2",
      name: "SMA Islam Terpadu (SMAIT)",
      category: "Pendidikan Formal",
      description: "Pendidikan menengah atas dengan peminatan IPA/IPS serta persiapan matang menuju perguruan tinggi favorit.",
    },
    {
      id: "edu-3",
      name: "Madrasah Diniyah & Tahfidz",
      category: "Pendidikan Non-Formal",
      description: "Program intensif hafalan Al-Qur'an 30 Juz dan pengkajian kitab-kitab turats/kuning.",
    },
  ],
  offerings: [
    {
      id: "off-1",
      title: "Jalur Reguler Gelombang 1",
      quota: 150,
      status: "Buka",
      openDate: "01 Feb 2026",
      closeDate: "30 Apr 2026",
      description: "Jalur pendaftaran umum untuk calon santri jenjang SMPIT dan SMAIT.",
    },
    {
      id: "off-2",
      title: "Jalur Beasiswa Tahfidz",
      quota: 30,
      status: "Buka",
      openDate: "01 Feb 2026",
      closeDate: "15 Apr 2026",
      description: "Jalur khusus pendaftar dengan hafalan minimal 5 Juz Al-Qur'an (Bebas Biaya Masuk 50%-100%).",
    },
    {
      id: "off-3",
      title: "Jalur Prestasi Akademik & Non-Akademik",
      quota: 20,
      status: "Buka",
      openDate: "01 Feb 2026",
      closeDate: "15 Apr 2026",
      description: "Jalur pendaftaran bagi calon santri berprestasi minimal tingkat kabupaten/provinsi.",
    },
  ],
  timelines: [
    {
      id: "time-1",
      phase: "Pendaftaran Online & Upload Berkas",
      date: "01 Feb - 30 Apr 2026",
      status: "Berlangsung",
      description: "Pengisian formulir pendaftaran melalui portal SPMB dan unggah berkas persyaratan.",
      stepNumbers: [1, 2, 3],
    },
    {
      id: "time-2",
      phase: "Ujian Seleksi & Tes Baca Al-Qur'an",
      date: "05 Mei - 07 Mei 2026",
      status: "Akan Datang",
      description: "Tes akademik (Matematika, IPA, Bahasa) dan tes potensi hafalan & baca Al-Qur'an.",
      stepNumbers: [4],
    },
    {
      id: "time-3",
      phase: "Pengumuman Hasil Seleksi",
      date: "15 Mei 2026",
      status: "Akan Datang",
      description: "Hasil seleksi dapat dilihat melalui akun pendaftaran santri masing-masing.",
      stepNumbers: [],
    },
    {
      id: "time-4",
      phase: "Daftar Ulang & Penyerahan Berkas Fisik",
      date: "18 Mei - 25 Mei 2026",
      status: "Akan Datang",
      description: "Konfirmasi kehadiran, pembayaran daftar ulang, dan verifikasi berkas fisik di lokasi pesantren.",
      stepNumbers: [5],
    },
  ],
  requirements: {
    documents: [
      { id: "doc-1", name: "Fotokopi Kartu Keluarga (KK)", isRequired: true },
      { id: "doc-2", name: "Fotokopi Akta Kelahiran", isRequired: true },
      { id: "doc-3", name: "Fotokopi Ijazah / SKL Legalitas", isRequired: true },
      { id: "doc-4", name: "Pas Foto Berwarna 3x4 (Background Merah) 4 Lembar", isRequired: true },
      { id: "doc-5", name: "Surat Keterangan Sehat dari Dokter / Puskesmas", isRequired: true },
      { id: "doc-6", name: "Sertifikat Piagam Prestasi / Syahadah Hafalan (Opsional)", isRequired: false },
    ],
    fees: [
      { id: "fee-1", category: "Biaya Pendaftaran & Tes Seleksi", amount: 250000, type: "Sekali Bayar" },
      { id: "fee-2", category: "Uang Pangkal / Gedung & Sarana", amount: 7500000, type: "Sekali Bayar" },
      { id: "fee-3", category: "Paket Seragam (5 Set) & Perlengkapan Kitab", amount: 1800000, type: "Sekali Bayar" },
      { id: "fee-4", category: "SPP Bulanan (Makan 3x, Asrama & Sekolah)", amount: 1200000, type: "Bulanan" },
    ],
  },
  steps: [
    {
      stepNumber: 1,
      title: "Membuat Akun Pendaftaran",
      description: "Registrasi pada portal SPMB dengan mengisikan nama calon santri, email, dan nomor WhatsApp aktif.",
    },
    {
      stepNumber: 2,
      title: "Mengisi Formulir & Upload Berkas",
      description: "Melengkapi data diri, data orang tua/wali, serta mengunggah berkas persyaratan dalam format dokumen/gambar.",
    },
    {
      stepNumber: 3,
      title: "Membayar Biaya Pendaftaran",
      description: "Melakukan pembayaran biaya seleksi melalui transfer Virtual Account atau Payment Gateway yang tersedia.",
    },
    {
      stepNumber: 4,
      title: "Mengikuti Tes Seleksi",
      description: "Mengikuti ujian tes akademik online/offline dan sesi wawancara santri & orang tua.",
    },
    {
      stepNumber: 5,
      title: "Daftar Ulang",
      description: "Bagi santri yang dinyatakan lulus, wajib melakukan verifikasi berkas dan pelunasan biaya daftar ulang.",
    },
  ],
  environments: [
    {
      id: "env-1",
      title: "Asrama Putra & Putri Ber-AC",
      description: "Gedung asrama terpisah yang bersih, aman, dan dilengkapi dengan pengawasan ustaz/ustazah 24 jam.",
    },
    {
      id: "env-2",
      title: "Masjid Utama Al-Hikmah",
      description: "Pusat kegiatan ibadah jamaah, sholat subuh mengaji, serta kajian taklim dan program Tahfidz Al-Qur'an.",
    },
    {
      id: "env-3",
      title: "Laboratorium Komputer & Sains",
      description: "Fasilitas penunjang praktikum sains dan pembelajaran coding/teknologi informasi modern.",
    },
    {
      id: "env-4",
      title: "Perpustakaan & Ruang Baca Digital",
      description: "Koleksi ribuan kitab klasik turats serta buku literatur umum dan ruang baca terpadu.",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Apakah pendaftaran penerimaan santri baru bisa dilakukan secara online?",
      answer: "Ya, seluruh proses pendaftaran mulai dari pengisian formulir, pembagian kartu tes, hingga pengumuman kelulusan dilakukan secara online melalui portal resmi SPMB ini.",
    },
    {
      id: "faq-2",
      question: "Apakah orang tua/wali santri diwajibkan hadir saat tes seleksi?",
      answer: "Ya, sesi wawancara orang tua/wali santri wajib diikuti sebagai bentuk penyelarasan visi pendidikan antara pihak pesantren dan keluarga.",
    },
    {
      id: "faq-3",
      question: "Bagaimana sistem pengembalian biaya jika santri mengundurkan diri?",
      answer: "Ketentuan pengembalian biaya daftar ulang diatur sesuai dengan kebijakan panitia SPMB yang tertera pada lembar komitmen daftar ulang.",
    },
  ],
};
