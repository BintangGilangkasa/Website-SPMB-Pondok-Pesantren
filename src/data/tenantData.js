export const initialTenants = [
  {
    id: "TEN-001",
    code: "TEN-001",
    name: "Pesantren Al-Falah",
    slug: "pesantren-al-falah",
    status: "AKTIF",
    default_timezone: "Asia/Jakarta",
    contact_email: "info@alfalah.sch.id",
    admin_awal_name: "Ust. Ahmad Dahlan",
    admin_awal_email: "admin@alfalah.sch.id",
    audit_history: [
      { 
        date: "2026-01-10 09:30", 
        action: "AKTIF", 
        by: "Super Admin TKI", 
        reason: "Aktivasi admin awal terverifikasi" 
      }
    ]
  },
  {
    id: "TEN-002",
    code: "TEN-002",
    name: "Pondok Pendidikan An-Nur",
    slug: "pondok-an-nur",
    status: "BELUM_AKTIF",
    default_timezone: "Asia/Jakarta",
    contact_email: "sekretariat@annur.or.id",
    admin_awal_name: "H. Abdullah",
    admin_awal_email: "abdullah@annur.or.id",
    audit_history: [
      { 
        date: "2026-02-01 14:15", 
        action: "BELUM_AKTIF", 
        by: "Super Admin TKI", 
        reason: "Pendaftaran awal tenant baru" 
      }
    ]
  },
  {
    id: "TEN-003",
    code: "TEN-003",
    name: "Pesantren Darul Hikmah",
    slug: "darul-hikmah",
    status: "TERTANGGUHKAN",
    default_timezone: "Asia/Makassar",
    contact_email: "admin@darulhikmah.id",
    admin_awal_name: "Ust. Mansyur",
    admin_awal_email: "mansyur@darulhikmah.id",
    audit_history: [
      { 
        date: "2026-02-15 11:00", 
        action: "TERTANGGUHKAN", 
        by: "Super Admin TKI", 
        reason: "Permintaan penangguhan operasional sementara" 
      }
    ]
  },
  {
    id: "TEN-004",
    code: "TEN-004",
    name: "Pesantren Miftahul Ilmi",
    slug: "miftahul-ilmi",
    status: "AKTIF",
    default_timezone: "Asia/Jakarta",
    contact_email: "kontak@miftahulilmi.sch.id",
    admin_awal_name: "Ust. Ridwan",
    admin_awal_email: "ridwan@miftahulilmi.sch.id",
    audit_history: [
      { 
        date: "2026-01-20 08:00", 
        action: "AKTIF", 
        by: "Super Admin TKI", 
        reason: "Aktivasi resmi" 
      }
    ]
  },
  {
    id: "TEN-005",
    code: "TEN-005",
    name: "Pesantren Bina Umat",
    slug: "bina-umat",
    status: "BELUM_AKTIF",
    default_timezone: "Asia/Jakarta",
    contact_email: "info@binaumat.ponpes.id",
    admin_awal_name: "Ust. Syamsuddin",
    admin_awal_email: "syamsuddin@binaumat.ponpes.id",
    audit_history: []
  }
];