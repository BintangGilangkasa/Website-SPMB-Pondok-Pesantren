import { useState } from 'react';
import { Badge, PageHeader } from '@/components/ui';
import {
  DashboardChart,
  HealthStatusWidget,
  MetricCard,
  SubNavTabs,
  TenantStatusWidget,
} from '@/components/super-admin/dashboard/index';

import { mockDashboardData } from '../../../data/mockSuperAdminData';
import { initialTransactionsData } from '../../../data/transactionsData';
import { initialTenants } from '../../../data/tenantData';

const dashboardTabs = [
  { id: 'overview', label: 'Ringkasan' },
  { id: 'tenants', label: 'Tenant' },
  { id: 'integrations', label: 'Integrasi' },
  { id: 'transactions', label: 'Transaksi' },
  { id: 'applications', label: 'Pengajuan' },
];

function TenantPlatform({ dashboardData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total tenant" value={dashboardData.metrics.totalTenants.value} desc={dashboardData.metrics.totalTenants.desc} />
        <MetricCard title="Tenant aktif" value={dashboardData.metrics.activeTenants.value} desc={dashboardData.metrics.activeTenants.desc} />
        <MetricCard title="Belum aktif" value={dashboardData.tenantStatusBreakdown.belumAktif.count} desc="Menunggu aktivasi" />
        <MetricCard title="Ditangguhkan" value={dashboardData.tenantStatusBreakdown.tertangguhkan.count} desc="Perlu ditinjau" />
      </div>

      <section className="space-y-3" aria-labelledby="tenant-list-title">
        <div>
          <h2 id="tenant-list-title" className="text-base font-semibold text-ink-super-admin">Daftar tenant</h2>
          <p className="mt-1 text-xs text-muted-super-admin">Data tenant yang tersedia di dashboard platform.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border-super-admin bg-surface-super-admin">
          <table className="w-full min-w-2xl text-left text-xs">
            <thead>
              <tr className="border-b border-border-super-admin text-[10px] uppercase tracking-wide text-muted-super-admin">
                <th className="px-5 py-3">Nama tenant</th>
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Zona waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-super-admin">
              {initialTenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td className="px-5 py-3 font-semibold text-ink-super-admin">{tenant.name}</td>
                  <td className="px-5 py-3 font-mono text-muted-super-admin">{tenant.code}</td>
                  <td className="px-5 py-3">
                    <Badge variant={tenant.status}>{tenant.status.replaceAll('_', ' ')}</Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-super-admin">{tenant.default_timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function IntegrasiPlatform({ dashboardData, onViewTransactions }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-ink-super-admin">Kesehatan integrasi platform</h2>
      <HealthStatusWidget
        healthList={dashboardData.integrationHealth}
        incidents={dashboardData.systemIncidents}
        transactionSummary={dashboardData.transactionSummary}
        onViewTransactions={onViewTransactions}
      />
    </div>
  );
}

function TransaksiPlatform({ transactions }) {
  const metrics = initialTransactionsData.metrics;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total invoice" value={metrics.totalInvoice.value} desc={metrics.totalInvoice.desc} />
        <MetricCard title="Invoice lunas" value={metrics.invoiceLunas.value} desc={metrics.invoiceLunas.desc} />
        <MetricCard title="Menunggu konfirmasi" value={metrics.menungguKonfirmasi.value} desc={metrics.menungguKonfirmasi.desc} />
        <MetricCard title="Belum lunas" value={metrics.belumLunas.value} desc={metrics.belumLunas.desc} />
      </div>

      <section className="space-y-3" aria-labelledby="transaction-list-title">
        <div>
          <h2 id="transaction-list-title" className="text-base font-semibold text-ink-super-admin">Transaksi terbaru</h2>
          <p className="mt-1 text-xs text-muted-super-admin">Data ditampilkan baca-saja.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border-super-admin bg-surface-super-admin">
          <table className="w-full min-w-216 text-left text-xs">
            <thead>
              <tr className="border-b border-border-super-admin text-[10px] uppercase tracking-wide text-muted-super-admin">
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Tenant</th>
                <th className="px-5 py-3">Jenis transaksi</th>
                <th className="px-5 py-3">Nominal</th>
                <th className="px-5 py-3">Waktu</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-super-admin">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-ink-super-admin">{transaction.id}</span>
                    <span className="mt-1 block font-mono text-[10px] text-muted-super-admin">{transaction.ref_no}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-super-admin">{transaction.tenant_name}</td>
                  <td className="px-5 py-3 text-muted-super-admin">{transaction.fee_type}</td>
                  <td className="px-5 py-3 font-semibold text-ink-super-admin">{transaction.amount}</td>
                  <td className="px-5 py-3 text-muted-super-admin">{transaction.timestamp}</td>
                  <td className="px-5 py-3">
                    <Badge variant={transaction.status === 'PAID' ? 'AKTIF' : transaction.status === 'PENDING' ? 'Perhatian' : 'TERTANGGUHKAN'}>
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function PengajuanPlatform({ dashboardData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Pengajuan agregat"
          value={dashboardData.metrics.aggregateApplications.value}
          desc={dashboardData.metrics.aggregateApplications.desc}
        />
      </div>
      <DashboardChart
        data={dashboardData.applicationTrends}
        dataByRange={dashboardData.applicationTrendsByPeriod}
      />
    </div>
  );
}

export default function DashboardPlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const dashboardData = mockDashboardData;
  const activeTabLabel = dashboardTabs.find((tab) => tab.id === activeTab)?.label ?? 'Ringkasan';

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-ink-super-admin">
      <div className="flex flex-col justify-between gap-4 border-b border-border-super-admin pb-4 sm:flex-row sm:items-center">
        <PageHeader
          role="SUPER ADMIN TKI"
          title={activeTab === 'overview' ? 'Dashboard Platform' : `Ringkasan ${activeTabLabel}`}
          description="Pantau tenant, pengajuan, transaksi, dan kesehatan integrasi platform."
        />
        <button
          type="button"
          className="min-h-11 self-start rounded-lg border border-border-super-admin bg-surface-super-admin px-3.5 py-2 text-xs font-semibold text-ink-super-admin transition-colors hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-super-admin sm:self-auto"
          onClick={() => alert('Izin akses data akun Super Admin TKI.')}
        >
          Lihat Izin Saya
        </button>
      </div>

      <SubNavTabs
        tabs={dashboardTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div
        id="dashboard-tab-panel"
        role="tabpanel"
        aria-labelledby={`dashboard-tab-${activeTab}`}
        tabIndex={0}
        className="space-y-6 outline-none focus-visible:ring-2 focus-visible:ring-primary-super-admin"
      >
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total tenant" value={dashboardData.metrics.totalTenants.value} desc={dashboardData.metrics.totalTenants.desc} />
              <MetricCard title="Tenant aktif" value={dashboardData.metrics.activeTenants.value} desc={dashboardData.metrics.activeTenants.desc} />
              <MetricCard title="Pengajuan agregat" value={dashboardData.metrics.aggregateApplications.value} desc={dashboardData.metrics.aggregateApplications.desc} />
              <MetricCard title="Aktivitas platform" value={dashboardData.metrics.platformActivity.value} desc={dashboardData.metrics.platformActivity.desc} />
            </div>

            <section className="space-y-3" aria-labelledby="platform-monitoring-title">
              <h2 id="platform-monitoring-title" className="text-sm font-bold uppercase tracking-wide text-ink-super-admin">
                Pemantauan platform
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7">
                  <DashboardChart data={dashboardData.applicationTrends} dataByRange={dashboardData.applicationTrendsByPeriod} />
                </div>
                <div className="min-w-0 lg:col-span-5">
                  <TenantStatusWidget
                    breakdown={dashboardData.tenantStatusBreakdown}
                    onViewTenants={() => setActiveTab('tenants')}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-3 pt-1" aria-labelledby="platform-health-title">
              <h2 id="platform-health-title" className="text-sm font-bold uppercase tracking-wide text-ink-super-admin">
                Integrasi dan gangguan
              </h2>
              <HealthStatusWidget
                healthList={dashboardData.integrationHealth}
                incidents={dashboardData.systemIncidents}
                transactionSummary={dashboardData.transactionSummary}
                onViewIntegrations={() => setActiveTab('integrations')}
                onViewTransactions={() => setActiveTab('transactions')}
              />
            </section>
          </>
        )}

        {activeTab === 'tenants' && <TenantPlatform dashboardData={dashboardData} />}
        {activeTab === 'integrations' && (
          <IntegrasiPlatform
            dashboardData={dashboardData}
            onViewTransactions={() => setActiveTab('transactions')}
          />
        )}
        {activeTab === 'transactions' && (
          <TransaksiPlatform
            transactions={initialTransactionsData.transactions}
          />
        )}
        {activeTab === 'applications' && <PengajuanPlatform dashboardData={dashboardData} />}
      </div>
    </div>
  );
}
