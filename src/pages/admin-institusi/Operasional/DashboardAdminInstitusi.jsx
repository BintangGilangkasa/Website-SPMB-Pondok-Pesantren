import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { KpiStatCard, MonitoringFilterBar, OfferingSummaryTable, PendingAttentionCard, WeeklySubmissionChart } from '@/components/admin-institusi';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { useAuth } from '../../../context/useAuth';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import { ModuleHeader, WorkspaceNotice } from '../../../components/admin-institusi/WorkspaceComponents';

const DEFAULT_FILTERS = { period: '2026/2027', unit: 'Semua satuan', type: 'Semua jenis', offering: 'Semua offering' };
const FILTER_OPTIONS = {
  periods: ['2026/2027', '2025/2026'],
  units: ['Semua satuan', 'MTs', 'MA'],
  types: ['Semua jenis', 'NEW', 'TRANSFER'],
  offerings: ['Semua offering', 'MTs · Baru', 'MTs · Pindahan', 'MA · Baru', 'MA · Pindahan'],
};

export default function DashboardAdminInstitusi() {
  const { user } = useAuth();
  const [workspace] = useAdmissionWorkspace(user?.tenant);
  const canView = hasAdminPermission(user, 'dashboard:view');
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const handleFilterChange = (key, value) => setDraftFilters((current) => ({ ...current, [key]: value }));
  const filteredApplications = useMemo(() => workspace.applications.filter((application) => {
    const samePeriod = appliedFilters.period === '2026/2027' && application.submittedAt.startsWith('2026-');
    const matchUnit = appliedFilters.unit === 'Semua satuan' || application.unit === appliedFilters.unit;
    const matchType = appliedFilters.type === 'Semua jenis' || application.type === appliedFilters.type;
    const matchOffering = appliedFilters.offering === 'Semua offering' || application.offering === appliedFilters.offering;
    return samePeriod && matchUnit && matchType && matchOffering;
  }), [workspace.applications, appliedFilters]);

  const kpis = useMemo(() => {
    const applicationIds = new Set(filteredApplications.map((application) => application.id));
    const filteredIds = new Set(applicationIds);
    const accepted = filteredApplications.filter((application) => workspace.results[application.id]?.decision === 'Diterima' && workspace.results[application.id]?.published);
    const completedIds = new Set(workspace.reRegistrations.filter((item) => item.status === 'Selesai').map((item) => item.applicationId));
    const capacities = workspace.capacities.filter((capacity) => {
      const matchesPeriod = appliedFilters.period === '2026/2027';
      const matchesUnit = appliedFilters.unit === 'Semua satuan' || capacity.offering.startsWith(appliedFilters.unit);
      const matchesOffering = appliedFilters.offering === 'Semua offering' || capacity.offering === appliedFilters.offering;
      return matchesPeriod && matchesUnit && matchesOffering;
    });
    const available = capacities.reduce((sum, capacity) => sum + Math.max(capacity.quota - capacity.reserved - capacity.confirmed, 0), 0);
    const reserved = capacities.reduce((sum, capacity) => sum + capacity.reserved, 0);
    const confirmed = capacities.reduce((sum, capacity) => sum + capacity.confirmed, 0);
    const relevantInvoices = workspace.invoices.filter((invoice) => filteredIds.has(invoice.applicationId));
    return {
      applications: filteredApplications.length,
      uniqueChildren: new Set(filteredApplications.map((application) => application.childId)).size,
      pendingVerification: filteredApplications.filter((application) => application.status === 'Menunggu Verifikasi').length,
      needsCorrection: filteredApplications.filter((application) => application.status === 'Perlu Koreksi').length,
      accepted: new Set(accepted.map((application) => application.childId)).size,
      reRegistrationComplete: new Set([...completedIds].filter((id) => filteredIds.has(id))).size,
      paymentWaiting: relevantInvoices.filter((invoice) => ['Menunggu Pembayaran', 'Menunggu Verifikasi'].includes(invoice.status)).length,
      paymentDue: relevantInvoices.filter((invoice) => invoice.status === 'Menunggu Pembayaran').length,
      paymentVerify: relevantInvoices.filter((invoice) => invoice.status === 'Menunggu Verifikasi').length,
      paymentProblem: relevantInvoices.filter((invoice) => invoice.status === 'Bermasalah').length,
      paymentPaid: relevantInvoices.filter((invoice) => invoice.status === 'Lunas').length,
      available,
      reserved,
      confirmed,
      capacities,
    };
  }, [filteredApplications, workspace, appliedFilters]);

  const chartData = useMemo(() => {
    const weeks = [
      { week: 'Nov 1–7', start: 1, end: 7 },
      { week: 'Nov 8–14', start: 8, end: 14 },
      { week: 'Nov 15–21', start: 15, end: 21 },
      { week: 'Nov 22–28', start: 22, end: 28 },
    ];
    return weeks.map(({ week, start, end }) => ({ week, count: filteredApplications.filter((application) => { const day = new Date(application.submittedAt).getDate(); return day >= start && day <= end; }).length }));
  }, [filteredApplications]);

  const kpiCards = [
    { title: 'Jumlah pengajuan', value: kpis.applications, subtitle: 'Nomor pendaftaran', tone: 'info' },
    { title: 'Anak unik', value: kpis.uniqueChildren, subtitle: 'Berdasarkan ID anak', tone: 'info' },
    { title: 'Menunggu verifikasi', value: kpis.pendingVerification, subtitle: `${kpis.needsCorrection} perlu koreksi`, tone: 'warning' },
    { title: 'Peserta diterima', value: kpis.accepted, subtitle: 'Hasil sudah diumumkan', tone: 'success' },
    { title: 'Daftar ulang selesai', value: kpis.reRegistrationComplete, subtitle: 'Kursi confirmed', tone: 'success' },
    { title: 'Kuota tersedia', value: kpis.available, subtitle: `${kpis.reserved} reserved · ${kpis.confirmed} confirmed`, tone: 'error' },
  ];
  const pendingTasks = [
    { id: 'verifikasi', count: kpis.pendingVerification, label: 'Pengajuan perlu verifikasi', tone: 'warning', path: '/admin-institusi/pendaftar' },
    { id: 'pembayaran', count: kpis.paymentWaiting, label: 'Tagihan menunggu pembayaran / verifikasi', tone: 'info', path: '/admin-institusi/pembayaran' },
    { id: 'daftar-ulang', count: Math.max(kpis.accepted - kpis.reRegistrationComplete, 0), label: 'Daftar ulang belum selesai', tone: 'error', path: '/admin-institusi/daftar-ulang' },
  ];
  const offeringRows = kpis.capacities.map((capacity) => {
    const apps = filteredApplications.filter((application) => application.offering === capacity.offering);
    const verified = apps.filter((application) => application.status === 'Terverifikasi').length;
    const accepted = apps.filter((application) => workspace.results[application.id]?.decision === 'Diterima' && workspace.results[application.id]?.published).length;
    const completed = workspace.reRegistrations.filter((item) => item.status === 'Selesai' && apps.some((application) => application.id === item.applicationId)).length;
    return { offering: capacity.offering, pengajuan: apps.length, terverifikasi: verified, diterima: accepted, daftarUlang: completed, kapasitas: capacity.quota, reserved: capacity.reserved, confirmed: capacity.confirmed, tersedia: Math.max(capacity.quota - capacity.reserved - capacity.confirmed, 0) };
  });

  if (!canView) return <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">Akun ini tidak memiliki izin melihat dashboard penerimaan.</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-5 font-sans text-ink-super-admin">
      <ModuleHeader code="BO-01 · MONITORING" title="Dashboard penerimaan" description="Pantau jumlah pengajuan, anak unik, hasil seleksi, pembayaran, daftar ulang, dan kapasitas tenant aktif." />
      <WorkspaceNotice>Dashboard hanya untuk melihat ringkasan. Data sumber dikelola melalui modul Pendaftar, Seleksi, Pembayaran, dan Daftar Ulang.</WorkspaceNotice>
      <MonitoringFilterBar filters={draftFilters} onChange={handleFilterChange} onApply={() => setAppliedFilters(draftFilters)} options={FILTER_OPTIONS} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{kpiCards.map((card) => <KpiStatCard key={card.title} {...card} />)}</div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{ label: 'Tagihan menunggu pembayaran', count: kpis.paymentDue, href: '/admin-institusi/pembayaran' }, { label: 'Pembayaran menunggu verifikasi', count: kpis.paymentVerify, href: '/admin-institusi/pembayaran' }, { label: 'Pembayaran lunas', count: kpis.paymentPaid, href: '/admin-institusi/pembayaran' }, { label: 'Transaksi bermasalah', count: kpis.paymentProblem, href: '/admin-institusi/pembayaran' }].map((item) => <Link key={item.label} to={item.href} className="flex min-h-20 items-center justify-between gap-3 rounded-xl border border-border-super-admin bg-white p-4 hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><span className="text-xs font-semibold text-muted-super-admin">{item.label}</span><span className="text-xl font-bold">{item.count}</span></Link>)}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12"><div className="lg:col-span-8"><WeeklySubmissionChart data={chartData} title="Perkembangan pengajuan" subtitle="Jumlah pengajuan yang dikirim per minggu" periodLabel={appliedFilters.period} /></div><div className="lg:col-span-4"><PendingAttentionCard items={pendingTasks} /></div></div>

      <OfferingSummaryTable title="Kapasitas dan ringkasan offering" subtitle="Jumlah pengajuan dan status kursi dihitung terpisah dari jumlah anak unik." rows={offeringRows} />
      <div className="flex flex-wrap gap-3 rounded-xl border border-border-super-admin bg-white p-4 text-xs text-muted-super-admin"><span>Pengajuan: {kpis.applications}</span><span aria-hidden="true">·</span><span>Anak unik: {kpis.uniqueChildren}</span><span aria-hidden="true">·</span><span>Diterima: {kpis.accepted}</span><span aria-hidden="true">·</span><span>Daftar ulang selesai: {kpis.reRegistrationComplete}</span><Link to="/admin-institusi/laporan" className="ml-auto inline-flex min-h-11 items-center gap-1 font-semibold text-primary-admin-institusi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">Buka laporan <ChevronRight className="h-4 w-4" aria-hidden="true" /></Link></div>
    </div>
  );
}
