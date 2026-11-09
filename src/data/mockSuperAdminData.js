export const mockDashboardData = {
  // SA-01: Summary Cards
  metrics: {
    totalTenants: { value: 18, desc: "Terdaftar di seluruh platform" },
    activeTenants: { value: 12, desc: "Status aktif & dapat beroperasi" },
    aggregateApplications: { value: 348, desc: "20 hari terakhir, tersaring dari izin anda" },
    platformActivity: { value: 1482, desc: "Aktivitas masuk · 70 tersuspensi" }
  },

  // SA-01: Bar Chart Trend Pengajuan
  applicationTrends: [
    { date: "01-10", count: 42 },
    { date: "05-10", count: 57 },
    { date: "10-10", count: 49 },
    { date: "15-10", count: 67 },
    { date: "20-10", count: 76 },
    { date: "25-10", count: 62 }
  ],

  // SA-01: Tenant Status Breakdown
  tenantStatusBreakdown: {
    aktif: { count: 12, percentage: "66.7%" },
    belumAktif: { count: 4, percentage: "22.2%" },
    tertangguhkan: { count: 2, percentage: "11.1%" }
  },

  // SA-01: Integration & System Health
  integrationHealth: [
    { name: "Layanan Autentikasi", status: "Normal", desc: "SLA pas: Terhubung - 0.1402s" },
    { name: "Pembayaran Integrasi", status: "Normal", desc: "SLA pas: Terhubung - 0.2461s" },
    { name: "Pengirim E-mail", status: "Perhatian", desc: "SLA pas: Terhubung - 0.6472s (SLA slow)" }
  ],

  // SA-01: System Incidents / Information
  systemIncidents: [
    {
      title: "Pengiriman pesan tertunda",
      detail: "Pada beberapa domain seperti info@pesantren.id",
      type: "warning"
    },
    {
      title: "Layanan inti",
      detail: "Tidak ada gangguan pada server database utama",
      type: "info"
    }
  ],

  // SA-01: Restricted Transaction Summary
  transactionSummary: {
    hasPermission: false, // Set to true to test authorized view
    message: "Data transaksi hibah internal/spesifik bersifat terbatas hanya permintaan yang diajukan admin platform."
  }
};