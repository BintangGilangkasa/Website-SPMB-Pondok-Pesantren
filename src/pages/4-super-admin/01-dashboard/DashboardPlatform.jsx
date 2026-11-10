import React, { useState, useEffect } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import MetricCard from './components/MetricCard';
import DashboardChart from './components/DashboardChart';
import TenantStatusWidget from './components/TenantStatusWidget';
import HealthStatusWidget from './components/HealthStatusWidget';

import { mockDashboardData } from '../../../data/mockSuperAdminData';
import { Settings, ArrowRight } from 'lucide-react';

export default function DashboardPlatform() {
  const [timeRange, setTimeRange] = useState('20-hari');
  const [dataScope, setDataScope] = useState('semua-tenant');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Simulasi fetching data berdasarkan filter
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const timer = setTimeout(() => {
      // Dalam implementasi backend nanti, panggil: dashboardService.getAggregateData({ timeRange, dataScope })
      setDashboardData(mockDashboardData);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [timeRange, dataScope]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs text-muted-super-admin font-medium">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary-super-der-t-transparent mb-2"></div>
        <p>Memuat data agregat platform SA-01...</p>
      </div>
    );
}

if (isError || !dashboardData) {
  return (
    <div className="p-6 bg-error-surface border border-error-border text-error-foreground rounded-xl text-xs">
      <strong>Gagal Memuat Data:</strong> Data agregat platform gagal dimuat. Silakan periksa koneksi atau integrasi backend Anda. (Penanganan error SA-01: Data tidak diubah menjadi nol).
    </div>
  );
}

return (
  <div className="max-w-7xl mx-auto space-y-6 font-sans text-ink-super-admin pb-12">

    {/* 1. Header & Breadcrumb SA-01 */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-super-admin pb-4">

      <PageHeader
        code="SA-01"
        role="SUPER ADMIN TKI"
        title="Dashboard Platform"
        description="Ringkasan total tenant, aktivitas pengajuan agregat, dan kesehatan integrasi dalam lingkup platform."
      />
      <button
        className="self-start sm:self-auto text-xs font-semibold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-3.5 py-2 rounded-lg hover:bg-surface-accent-super-admin transition-colors"
        onClick={() => {
          alert('Fitur ini akan menampilkan izin akses data yang dimiliki oleh akun Super Admin TKI Anda. (Simulasi SA-01)');
        }}
      >

        Lihat Izin Saya
      </button>
    </div>

    {/* Bar Filter & Control (Rentang Waktu & Cakupan Data) */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-super-admin p-3.5 rounded-xl border border-border-super-admin shadow-xs">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-muted-super-admin">Rentang aktivitas:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-surface-super-admin border border-border-super-admin text-ink-super-admin text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-super-admin"
          >
            <option value="7-hari">7 Hari Terakhir</option>
            <option value="20-hari">20 Hari Terakhir</option>
            <option value="30-hari">30 Hari Terakhir</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-muted-super-admin">Cakupan data:</label>
          <select
            value={dataScope}
            onChange={(e) => setDataScope(e.target.value)}
            className="bg-surface-super-admin border border-border-super-admin text-ink-super-admin text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-super-admin"
          >
            <option value="semua-tenant">Status (Agregat Seluruh Kebijakan)</option>
            <option value="tenant-aktif">Hanya Tenant Aktif</option>
          </select>
        </div>
      </div>

      <button className="text-xs font-bold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-4 py-1.5 rounded-lg hover:bg-surface-accent-super-admin transition-colors flex items-center gap-1.5 self-end sm:self-auto">
        <Settings className="w-3.5 h-3.5" />
        Filter Ulang
      </button>
    </div>

    {/* 4. Grid Stat Cards (4 Metric Cards) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="TOTAL TENANT"
        value={dashboardData.metrics.totalTenants.value}
        desc={dashboardData.metrics.totalTenants.desc}
        actionText="Lihat Tenant"
        actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
      />
      <MetricCard
        title="TENANT AKTIF"
        value={dashboardData.metrics.activeTenants.value}
        desc={dashboardData.metrics.activeTenants.desc}
        actionText="Lihat Tenant"
        actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
      />
      <MetricCard
        title="PENGAJUAN AGREGAT"
        value={dashboardData.metrics.aggregateApplications.value}
        desc={dashboardData.metrics.aggregateApplications.desc}
        actionText="Detail Tren"
        actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
      />
      <MetricCard
        title="AKTIVITAS PLATFORM"
        value={dashboardData.metrics.platformActivity.value}
        desc={dashboardData.metrics.platformActivity.desc}
        actionText="Lihat Audit"
        actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
      />
    </div>

    {/* 5. Section Pemantauan Platform (Grafik Tren & Breakdown Status) */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink-super-admin tracking-wide uppercase">
          Pemantauan Platform
        </h2>
        <span className="text-[11px] text-muted-super-admin">Informasi pembaruan real-time</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DashboardChart data={dashboardData.applicationTrends} />
        </div>
        <div className="lg:col-span-5">
          <TenantStatusWidget breakdown={dashboardData.tenantStatusBreakdown} />
        </div>
      </div>
    </div>

    {/* 6. Section Integrasi & Gangguan */}
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink-super-admin tracking-wide uppercase">
          Integrasi &amp; Gangguan
        </h2>

      </div>

      <HealthStatusWidget
        healthList={dashboardData.integrationHealth}
        incidents={dashboardData.systemIncidents}
        transactionSummary={dashboardData.transactionSummary}
      />
    </div>

    {/* Footer Info PRD SA-01 */}
    <div className="pt-6 border-t border-border-super-admin text-center text-[10px] text-muted-super-admin leading-relaxed">
    </div>
  </div>
);
}