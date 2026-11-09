export const initialTransactionsData = {
  // Ringkasan 4 Kartu Indikator SA-04
  metrics: {
    totalInvoice: { value: 8, desc: "Invoice lintas tenant (simulasi)" },
    invoiceLunas: { value: 2, desc: "Status invoice PAID" },
    menungguKonfirmasi: { value: 2, desc: "Status invoice PENDING" },
    belumLunas: { value: 2, desc: "Status invoice UNPAID" },
  },

  // Tren Konfirmasi Transaksi (Harian / Mingguan / Bulanan)
  trends: {
    harian: [
      { date: "22 Okt", count: 18, height: "h-2/5" },
      { date: "23 Okt", count: 35, height: "h-3/5" },
      { date: "24 Okt", count: 28, height: "h-1/2" },
      { date: "25 Okt", count: 42, height: "h-4/5" },
      { date: "26 Okt", count: 38, height: "h-3/4" },
      { date: "27 Okt", count: 52, height: "h-full" },
      { date: "28 Okt", count: 45, height: "h-4/5" },
    ],
    mingguan: [
      { date: "Minggu 1", count: 120, height: "h-2/5" },
      { date: "Minggu 2", count: 180, height: "h-3/5" },
      { date: "Minggu 3", count: 240, height: "h-4/5" },
      { date: "Minggu 4", count: 310, height: "h-full" },
    ],
    bulanan: [
      { date: "Jul", count: 450, height: "h-2/5" },
      { date: "Agt", count: 680, height: "h-3/5" },
      { date: "Sep", count: 890, height: "h-4/5" },
      { date: "Okt", count: 1120, height: "h-full" },
    ],
  },

  // Daftar Sekolah / Tenant untuk Filter Select
  tenants: [
    { id: "all", name: "Seluruh Tenant / Pesantren" },
    { id: "TEN-001", name: "Pesantren Al-Falah" },
    { id: "TEN-002", name: "Pondok Pendidikan An-Nur" },
    { id: "TEN-003", name: "Pesantren Darul Hikmah" },
    { id: "TEN-004", name: "Pesantren Miftahul Ilmi" },
    { id: "TEN-005", name: "Pesantren Bina Umat" },
  ],

  // Daftar Invoice Lintas Tenant (Read-Only Detail for SA-04)
  transactions: [
    {
      id: "INV-2026-001",
      ref_no: "TRX-ALFALAH-8841",
      tenant_name: "Pesantren Al-Falah",
      fee_type: "SaaS Platform Fee",
      amount: "Rp 2.500.000",
      method: "Virtual Account Mandiri",
      timestamp: "2026-10-28 14:20",
      status: "PAID",
      sanitized_info: "Pendaftar ID #84912 (Disamarkan)",
    },
    {
      id: "INV-2026-002",
      ref_no: "TRX-ANNUR-9012",
      tenant_name: "Pondok Pendidikan An-Nur",
      fee_type: "Biaya Registrasi SPMB",
      amount: "Rp 350.000",
      method: "QRIS / Instant Payment",
      timestamp: "2026-10-28 11:05",
      status: "PENDING",
      sanitized_info: "Pendaftar ID #77210 (Disamarkan)",
    },
    {
      id: "INV-2026-003",
      ref_no: "TRX-DARUL-1102",
      tenant_name: "Pesantren Darul Hikmah",
      fee_type: "SaaS Platform Fee",
      amount: "Rp 2.500.000",
      method: "Bank Transfer BSI",
      timestamp: "2026-10-27 16:45",
      status: "UNPAID",
      sanitized_info: "Pendaftar ID #90142 (Disamarkan)",
    },
    {
      id: "INV-2026-004",
      ref_no: "TRX-MIFTAH-3391",
      tenant_name: "Pesantren Miftahul Ilmi",
      fee_type: "Biaya Registrasi SPMB",
      amount: "Rp 500.000",
      method: "Virtual Account BCA",
      timestamp: "2026-10-26 09:30",
      status: "PAID",
      sanitized_info: "Pendaftar ID #66201 (Disamarkan)",
    },
    {
      id: "INV-2026-005",
      ref_no: "TRX-BINA-5520",
      tenant_name: "Pesantren Bina Umat",
      fee_type: "SaaS Platform Fee",
      amount: "Rp 1.800.000",
      method: "Virtual Account BNI",
      timestamp: "2026-10-25 18:10",
      status: "PENDING",
      sanitized_info: "Pendaftar ID #11092 (Disamarkan)",
    },
  ],
};