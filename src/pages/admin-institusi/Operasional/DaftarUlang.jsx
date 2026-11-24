import React, { useMemo, useState } from 'react';
import { Check, Eye, Search, X } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import { EmptyTable, ModuleHeader, SectionCard, SelectField, StatusPill, WorkspaceNotice } from '../../../components/admin-institusi/WorkspaceComponents';
import { useDialogFocus } from '../../../hooks/useDialogFocus';

const timestamp = () => new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());

export default function DaftarUlang() {
  const { user } = useAuth();
  const [workspace, updateWorkspace] = useAdmissionWorkspace(user?.tenant);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [notice, setNotice] = useState(null);
  const detailRef = useDialogFocus(Boolean(selectedApplicationId), () => setSelectedApplicationId(''));
  const canView = hasAdminPermission(user, 'rereg:view');
  const canVerify = hasAdminPermission(user, 'rereg:verify');
  const canComplete = hasAdminPermission(user, 'rereg:complete');

  const acceptedApplications = useMemo(() => workspace.applications.filter((application) => {
    const result = workspace.results[application.id];
    return result?.decision === 'Diterima' && result.published;
  }), [workspace.applications, workspace.results]);
  const rows = useMemo(() => acceptedApplications.filter((application) => {
    const registration = workspace.reRegistrations.find((item) => item.applicationId === application.id);
    const query = search.trim().toLocaleLowerCase('id-ID');
    const matchesSearch = !query || [application.id, application.childName, application.offering].some((value) => value.toLocaleLowerCase('id-ID').includes(query));
    const matchesStatus = statusFilter === 'Semua status' || registration?.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [acceptedApplications, workspace.reRegistrations, search, statusFilter]);
  const selectedApplication = acceptedApplications.find((application) => application.id === selectedApplicationId);
  const registration = workspace.reRegistrations.find((item) => item.applicationId === selectedApplicationId);
  const requiredDocsReady = registration?.documents.every((document) => document.status === 'Terverifikasi');
  const obligationsReady = registration?.paymentStatus === 'Lunas';
  const reservedSeatExists = workspace.capacities.some((capacity) => capacity.offering === selectedApplication?.offering && capacity.reserved > 0);

  const verifyDocument = (documentIndex) => {
    if (!canVerify || !registration) return;
    updateWorkspace((current) => ({
      ...current,
      reRegistrations: current.reRegistrations.map((item) => item.applicationId !== selectedApplicationId ? item : {
        ...item,
        documents: item.documents.map((document, index) => index === documentIndex ? { ...document, status: 'Terverifikasi' } : document),
        status: 'Dalam Verifikasi',
      }),
    }));
  };

  const requestCorrection = () => {
    if (!canVerify || !actionNote.trim() || !registration) return;
    updateWorkspace((current) => ({ ...current, reRegistrations: current.reRegistrations.map((item) => item.applicationId === selectedApplicationId ? { ...item, status: 'Perlu Koreksi', note: actionNote.trim() } : item) }));
    setActionNote('');
    setNotice({ type: 'success', text: 'Catatan koreksi disimpan pada workspace lokal.' });
  };

  const completeRegistration = () => {
    if (!canComplete || !registration || !requiredDocsReady || !obligationsReady || !reservedSeatExists || registration.status === 'Selesai') return;
    updateWorkspace((current) => ({
      ...current,
      reRegistrations: current.reRegistrations.map((item) => item.applicationId === selectedApplicationId ? { ...item, status: 'Selesai', completedAt: timestamp() } : item),
      capacities: current.capacities.map((capacity) => capacity.offering === selectedApplication.offering ? { ...capacity, reserved: Math.max(0, capacity.reserved - 1), confirmed: capacity.confirmed + 1 } : capacity),
      applications: current.applications.map((application) => application.id === selectedApplicationId ? { ...application, reRegistrationStatus: 'Selesai' } : application),
    }));
    setNotice({ type: 'success', text: 'Daftar ulang selesai. Kursi reserved dipindahkan menjadi confirmed.' });
  };

  if (!canView) return <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">Akun ini tidak memiliki izin melihat data daftar ulang.</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-10 text-ink-super-admin">
      <ModuleHeader code="BO-05 Â· DAFTAR ULANG" title="Daftar ulang" description="Verifikasi kewajiban peserta diterima. Status pembayaran tampil baca-saja dan dikelola dari modul Pembayaran." />
      <WorkspaceNotice>Hanya hasil diterima yang sudah dipublikasikan dapat masuk daftar ulang. Penyelesaian mengonfirmasi kursi peserta.</WorkspaceNotice>
      {notice && <div className={`rounded-lg border p-3 text-sm ${notice.type === 'success' ? 'border-success-border bg-success-surface text-success-foreground' : 'border-error-border bg-error-surface text-error-foreground'}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.text}</div>}

      <SectionCard title="Peserta diterima" description={`${rows.length} peserta sesuai filter`}>
        <div className="grid gap-3 border-b border-border-super-admin p-4 sm:grid-cols-[minmax(16rem,1fr)_14rem]"><label className="relative block"><span className="sr-only">Cari peserta daftar ulang</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-super-admin" aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama atau nomor pendaftaran..." className="min-h-11 w-full rounded-lg border border-[#818D9A] pl-10 pr-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" /></label><SelectField label="Status daftar ulang" value={statusFilter} onChange={setStatusFilter} options={['Semua status', ...new Set(workspace.reRegistrations.map((item) => item.status))].map((status) => ({ value: status, label: status }))} /></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[750px] text-left text-sm"><thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr><th className="px-4 py-3">Nomor pendaftaran</th><th className="px-4 py-3">Nama anak</th><th className="px-4 py-3">Offering</th><th className="px-4 py-3">Batas waktu</th><th className="px-4 py-3">Dokumen</th><th className="px-4 py-3">Tagihan Â· baca saja</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"><span className="sr-only">Detail</span></th></tr></thead><tbody className="divide-y divide-border-super-admin">{rows.length ? rows.map((application) => { const item = workspace.reRegistrations.find((entry) => entry.applicationId === application.id); const docCount = item?.documents.filter((document) => document.status === 'Terverifikasi').length ?? 0; return <tr key={application.id}><td className="px-4 py-3 font-semibold">{application.id}</td><td className="px-4 py-3">{application.childName}</td><td className="px-4 py-3">{application.offering}</td><td className="px-4 py-3">{item?.dueDate ?? 'â€”'}</td><td className="px-4 py-3">{docCount}/{item?.documents.length ?? 0} terverifikasi</td><td className="px-4 py-3"><StatusPill>{item?.paymentStatus}</StatusPill></td><td className="px-4 py-3"><StatusPill>{item?.status}</StatusPill></td><td className="px-4 py-3"><button type="button" onClick={() => { setSelectedApplicationId(application.id); setActionNote(item?.note ?? ''); }} aria-label={`Detail daftar ulang ${application.childName}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin text-primary-admin-institusi hover:bg-info-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Eye className="h-4 w-4" aria-hidden="true" /></button></td></tr>; }) : <EmptyTable colSpan={8} query={Boolean(search || statusFilter !== 'Semua status')} />}</tbody></table></div>
      </SectionCard>

      {selectedApplication && registration && <div className="fixed inset-0 z-50 flex justify-end bg-overlay-super-admin/40"><button type="button" onClick={() => setSelectedApplicationId('')} aria-label="Tutup detail daftar ulang" className="absolute inset-0" /><aside ref={detailRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="rereg-detail-title" className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"><header className="flex items-start justify-between border-b border-border-super-admin p-5"><div><p className="text-xs font-semibold text-primary-admin-institusi">PESERTA DITERIMA Â· {selectedApplication.id}</p><h2 id="rereg-detail-title" className="mt-1 font-serif text-xl font-bold">{selectedApplication.childName}</h2><p className="mt-1 text-xs text-muted-super-admin">{selectedApplication.offering} Â· batas {registration.dueDate}</p></div><button type="button" onClick={() => setSelectedApplicationId('')} aria-label="Tutup detail" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><X className="h-4 w-4" aria-hidden="true" /></button></header><div className="flex-1 space-y-5 overflow-y-auto p-5"><section><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Status daftar ulang</h3><StatusPill>{registration.status}</StatusPill></div></section><section><h3 className="mb-3 text-sm font-bold">Persyaratan & dokumen</h3><ul className="divide-y divide-border-super-admin rounded-lg border border-border-super-admin">{registration.documents.map((document, index) => <li key={document.name} className="flex flex-wrap items-center justify-between gap-3 p-3"><div><p className="text-sm font-medium">{document.name}</p><div className="mt-1"><StatusPill>{document.status}</StatusPill></div></div>{canVerify && document.status === 'Lengkap' && <button type="button" onClick={() => verifyDocument(index)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-3 text-xs font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Check className="h-4 w-4" aria-hidden="true" /> Verifikasi</button>}</li>)}</ul></section><section><h3 className="mb-3 text-sm font-bold">Status tagihan Â· baca-saja</h3><div className="flex items-center justify-between rounded-lg border border-border-super-admin p-3"><p className="text-sm">Kewajiban daftar ulang</p><StatusPill>{registration.paymentStatus}</StatusPill></div><p className="mt-2 text-xs leading-relaxed text-muted-super-admin">Jika status pembayaran belum lunas, buka modul Pembayaran untuk melihat atau memverifikasi transaksi.</p></section>{registration.note && <section><h3 className="mb-2 text-sm font-bold">Catatan</h3><p className="rounded-lg bg-warning-surface p-3 text-sm leading-relaxed text-warning-foreground">{registration.note}</p></section>}<section><label htmlFor="rereg-note" className="text-sm font-semibold">Catatan atau alasan koreksi</label><textarea id="rereg-note" value={actionNote} onChange={(event) => setActionNote(event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-[#818D9A] p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" placeholder="Wajib diisi saat meminta koreksi" /></section></div><footer className="flex flex-col gap-2 border-t border-border-super-admin p-4 sm:flex-row sm:justify-end"><button type="button" onClick={requestCorrection} disabled={!canVerify || !actionNote.trim() || registration.status === 'Selesai'} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-warning-border px-4 text-sm font-semibold text-warning-foreground hover:bg-warning-surface disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-foreground">Minta koreksi</button><button type="button" onClick={completeRegistration} disabled={!canComplete || !requiredDocsReady || !obligationsReady || !reservedSeatExists || registration.status === 'Selesai'} title={!requiredDocsReady ? 'Verifikasi seluruh dokumen wajib terlebih dahulu.' : !obligationsReady ? 'Tagihan daftar ulang harus lunas di modul Pembayaran.' : !reservedSeatExists ? 'Kapasitas reserved untuk peserta ini tidak tersedia.' : undefined} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Check className="h-4 w-4" aria-hidden="true" /> Konfirmasi selesai</button></footer></aside></div>}
    </div>
  );
}
