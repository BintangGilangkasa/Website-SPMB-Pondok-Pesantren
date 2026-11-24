import React, { useMemo, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import { formatRupiah, ModuleHeader, SectionCard, SelectField, StatusPill, WorkspaceNotice } from '../../../components/admin-institusi/WorkspaceComponents';

const REPORT_TYPES = [
  { value: 'applications', label: 'Rekap pendaftar' },
  { value: 'types', label: 'Jenis NEW / TRANSFER' },
  { value: 'programs', label: 'Satuan, program, dan jalur' },
  { value: 'payments', label: 'Rekap pembayaran' },
  { value: 'selection', label: 'Rekap seleksi' },
  { value: 'rereg', label: 'Rekap daftar ulang' },
  { value: 'capacity', label: 'Rekap kapasitas' },
];

function buildReportData(type, workspace) {
  if (type === 'applications') return {
    columns: ['Nomor pendaftaran', 'Nama anak', 'Jenis', 'Satuan', 'Tingkat', 'Offering', 'Status administrasi', 'Hasil seleksi'],
    rows: workspace.applications.map((application) => [application.id, application.childName, application.type, application.unit, application.grade, application.offering, application.status, workspace.results[application.id]?.published ? workspace.results[application.id].decision : 'Belum diumumkan']),
  };
  if (type === 'types') {
    return {
      columns: ['Jenis pendaftar', 'Jumlah pengajuan', 'Anak unik'],
      rows: ['NEW', 'TRANSFER'].map((name) => {
        const records = workspace.applications.filter((application) => application.type === name);
        return [name, records.length, new Set(records.map((application) => application.childId)).size];
      }),
    };
  }
  if (type === 'programs') return {
    columns: ['Satuan', 'Program / offering', 'Pengajuan', 'Kuota', 'Reserved', 'Confirmed', 'Tersedia'],
    rows: workspace.capacities.map((capacity) => {
      const applications = workspace.applications.filter((application) => application.offering === capacity.offering);
      return [applications[0]?.unit ?? capacity.offering.split(' · ')[0], capacity.offering, applications.length, capacity.quota, capacity.reserved, capacity.confirmed, Math.max(capacity.quota - capacity.reserved - capacity.confirmed, 0)];
    }),
  };
  if (type === 'payments') return {
    columns: ['Nomor invoice', 'Nomor pengajuan', 'Nama anak', 'Jenis', 'Satuan', 'Offering', 'Jenis biaya', 'Cakupan', 'Nominal', 'Jatuh tempo', 'Status'],
    rows: workspace.invoices.map((invoice) => {
      const application = workspace.applications.find((item) => item.id === invoice.applicationId);
      return [invoice.id, invoice.applicationId, invoice.childName, application?.type ?? '—', application?.unit ?? '—', application?.offering ?? '—', invoice.type, invoice.scope, formatRupiah(invoice.amount), invoice.dueDate, invoice.status];
    }),
  };
  if (type === 'selection') return {
    columns: ['Nomor pendaftaran', 'Nama anak', 'Jenis', 'Satuan', 'Offering', 'Nilai', 'Keputusan', 'Status publikasi'],
    rows: workspace.applications.filter((application) => workspace.results[application.id]).map((application) => {
      const result = workspace.results[application.id];
      return [application.id, application.childName, application.type, application.unit, application.offering, result.score ?? '—', result.decision, result.published ? 'Diumumkan' : 'Draft internal'];
    }),
  };
  if (type === 'rereg') return {
    columns: ['Nomor pendaftaran', 'Nama anak', 'Jenis', 'Satuan', 'Offering', 'Status daftar ulang', 'Status tagihan', 'Dokumen terverifikasi'],
    rows: workspace.reRegistrations.map((registration) => {
      const application = workspace.applications.find((item) => item.id === registration.applicationId);
      return [registration.applicationId, application?.childName ?? '—', application?.type ?? '—', application?.unit ?? '—', application?.offering ?? '—', registration.status, registration.paymentStatus, registration.documents.filter((document) => document.status === 'Terverifikasi').length + '/' + registration.documents.length];
    }),
  };
  return {
    columns: ['Satuan', 'Offering', 'Kuota', 'Reserved', 'Confirmed', 'Tersedia'],
    rows: workspace.capacities.map((capacity) => [capacity.offering.split(' · ')[0], capacity.offering, capacity.quota, capacity.reserved, capacity.confirmed, Math.max(capacity.quota - capacity.reserved - capacity.confirmed, 0)]),
  };
}

function csvCell(value) {
  return '"' + String(value ?? '').replaceAll('"', '""') + '"';
}

export default function Laporan() {
  const { user } = useAuth();
  const [workspace] = useAdmissionWorkspace(user?.tenant);
  const [reportType, setReportType] = useState('applications');
  const [period, setPeriod] = useState('2026/2027');
  const [offering, setOffering] = useState('Semua offering');
  const [unit, setUnit] = useState('Semua satuan');
  const [applicationType, setApplicationType] = useState('Semua jenis');
  const [query, setQuery] = useState('');
  const canView = hasAdminPermission(user, 'report:view');
  const canExport = hasAdminPermission(user, 'report:export');
  const report = useMemo(() => buildReportData(reportType, workspace), [reportType, workspace]);
  const filteredRows = useMemo(() => {
    if (period === '2025/2026') return [];
    return report.rows.filter((row) => {
      const rowText = row.join(' ').toLocaleLowerCase('id-ID');
      const matchesQuery = !query.trim() || rowText.includes(query.trim().toLocaleLowerCase('id-ID'));
      const hasOffering = row.some((value) => String(value).includes(' · '));
      const hasUnit = row.some((value) => ['MTs', 'MA'].includes(value));
      const hasType = row.some((value) => ['NEW', 'TRANSFER'].includes(value));
      const matchesOffering = offering === 'Semua offering' || !hasOffering || row.includes(offering);
      const matchesUnit = unit === 'Semua satuan' || !hasUnit || row.includes(unit);
      const matchesType = applicationType === 'Semua jenis' || !hasType || row.includes(applicationType);
      return matchesQuery && matchesOffering && matchesUnit && matchesType;
    });
  }, [report, query, offering, unit, applicationType, period]);

  const exportCsv = () => {
    if (!canExport) return;
    const csv = [report.columns, ...filteredRows].map((row) => row.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laporan-' + reportType + '-' + period.replace('/', '-') + '.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!canView) return <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">Akun ini tidak memiliki izin melihat laporan penerimaan.</div>;

  const title = REPORT_TYPES.find((item) => item.value === reportType)?.label;
  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-10 text-ink-super-admin">
      <ModuleHeader code="BO-06 · LAPORAN" title="Laporan penerimaan" description="Rekap baca-saja dari data pemilik modul. Hak ekspor dan cetak mengikuti izin laporan." actions={<div className="flex flex-wrap gap-2 print:hidden"><button type="button" onClick={() => window.print()} disabled={!canExport} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Printer className="h-4 w-4" aria-hidden="true" /> Cetak</button><button type="button" onClick={exportCsv} disabled={!canExport} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Download className="h-4 w-4" aria-hidden="true" /> Ekspor CSV</button></div>} />
      <WorkspaceNotice>Laporan contoh tersusun dari data lokal modul. Laporan ini tidak mengubah pendaftar, transaksi, hasil, atau status daftar ulang.</WorkspaceNotice>
      {!canExport && <p className="rounded-lg border border-warning-border bg-warning-surface p-3 text-sm text-warning-foreground" role="note">Akses ekspor dan cetak memerlukan izin laporan:export.</p>}
      <div className="grid gap-3 rounded-xl border border-border-super-admin bg-white p-4 sm:grid-cols-2 xl:grid-cols-[minmax(12rem,1.5fr)_9rem_9rem_13rem_13rem_minmax(12rem,1.5fr)] print:hidden">
        <SelectField label="Jenis laporan" value={reportType} onChange={setReportType} options={REPORT_TYPES} />
        <SelectField label="Periode" value={period} onChange={setPeriod} options={['2026/2027', '2025/2026'].map((value) => ({ value, label: value }))} />
        <SelectField label="Satuan" value={unit} onChange={setUnit} options={['Semua satuan', 'MTs', 'MA'].map((value) => ({ value, label: value }))} />
        <SelectField label="Jenis pendaftar" value={applicationType} onChange={setApplicationType} options={['Semua jenis', 'NEW', 'TRANSFER'].map((value) => ({ value, label: value }))} />
        <SelectField label="Offering" value={offering} onChange={setOffering} options={['Semua offering', ...workspace.capacities.map((item) => item.offering)].map((value) => ({ value, label: value }))} />
        <label className="block space-y-1.5"><span className="block text-xs font-semibold text-ink-super-admin">Cari di laporan</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nama, nomor, atau status..." className="min-h-11 w-full rounded-lg border border-[#818D9A] px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" /></label>
      </div>
      <SectionCard title={title + ' · ' + period} description={filteredRows.length + ' baris'}>
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr>{report.columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr></thead><tbody className="divide-y divide-border-super-admin">{filteredRows.length ? filteredRows.map((row, rowIndex) => <tr key={reportType + '-' + rowIndex}>{row.map((value, cellIndex) => <td key={rowIndex + '-' + cellIndex} className="px-4 py-3">{['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Lunas', 'Diterima', 'Tidak Diterima', 'Perlu Koreksi', 'Bermasalah'].includes(String(value)) ? <StatusPill>{value}</StatusPill> : value}</td>)}</tr>) : <tr><td colSpan={report.columns.length} className="px-4 py-10 text-center text-sm text-muted-super-admin">{period === '2025/2026' ? 'Belum ada data untuk periode ini.' : 'Tidak ada data yang cocok dengan filter.'}</td></tr>}</tbody></table></div>
      </SectionCard>
      <p className="text-xs text-muted-super-admin print:hidden">Indikator laporan membedakan jumlah pengajuan, anak unik, peserta diterima, dan daftar ulang selesai. Data lintas tenant tidak tersedia pada backoffice tenant.</p>
    </div>
  );
}
