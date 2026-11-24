import React, { useMemo, useState } from 'react';
import { Eye, Search } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import { EmptyTable, ModuleHeader, SectionCard, SelectField, StatusPill, WorkspaceNotice } from '../../../components/admin-institusi/WorkspaceComponents';
import ApplicationDetailDrawer from '../../../components/admin-institusi/modules/ApplicationDetailDrawer';

const STATUS_OPTIONS = ['Semua status', 'Menunggu Verifikasi', 'Perlu Koreksi', 'Terverifikasi', 'Ditolak Administrasi'];
const formatDate = (value) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));

export default function PendaftarPlatform() {
  const { user } = useAuth();
  const [workspace, updateWorkspace] = useAdmissionWorkspace(user?.tenant);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  const [typeFilter, setTypeFilter] = useState('Semua jenis');
  const [selectedId, setSelectedId] = useState('');
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const canView = hasAdminPermission(user, 'application:view');
  const canVerify = hasAdminPermission(user, 'application:verify');
  const canCorrect = hasAdminPermission(user, 'application:request_correction');
  const canReject = hasAdminPermission(user, 'application:reject_admin');
  const selectAction = (type) => {
    setActionType(type);
    setActionNote('');
  };

  const rows = useMemo(() => workspace.applications.filter((application) => {
    const query = search.trim().toLocaleLowerCase('id-ID');
    const matchesQuery = !query || [application.id, application.childName, application.unit, application.offering].some((value) => value.toLocaleLowerCase('id-ID').includes(query));
    const matchesStatus = statusFilter === 'Semua status' || application.status === statusFilter;
    const matchesType = typeFilter === 'Semua jenis' || application.type === typeFilter;
    return matchesQuery && matchesStatus && matchesType;
  }), [workspace.applications, search, statusFilter, typeFilter]);

  const selected = workspace.applications.find((application) => application.id === selectedId);
  const selectedInvoice = selected && workspace.invoices.find((invoice) => invoice.applicationId === selected.id);
  const hasIncompleteDocuments = selected?.documents.some((document) => !['Terverifikasi'].includes(document.status));
  const canVerifyApplication = canVerify && selected?.status === 'Menunggu Verifikasi' && !hasIncompleteDocuments;

  const appendHistory = (application, label) => [...application.history, { date: new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()), label }];

  const verifyDocument = (documentIndex) => {
    updateWorkspace((current) => ({
      ...current,
      applications: current.applications.map((application) => application.id !== selected.id ? application : {
        ...application,
        documents: application.documents.map((document, index) => index === documentIndex ? { ...document, status: 'Terverifikasi' } : document),
        history: appendHistory(application, `Dokumen ${application.documents[documentIndex].name} diverifikasi`),
      }),
    }));
  };

  const markDocumentReceived = (documentIndex) => {
    if (!canVerify || selected?.status !== 'Perlu Koreksi') return;
    updateWorkspace((current) => ({
      ...current,
      applications: current.applications.map((application) => application.id !== selected.id ? application : {
        ...application,
        documents: application.documents.map((document, index) => index === documentIndex ? { ...document, status: 'Lengkap' } : document),
        history: appendHistory(application, 'Unggahan dokumen ' + application.documents[documentIndex].name + ' diterima'),
      }),
    }));
  };

  const recordCorrectionReceived = () => {
    if (!canVerify || selected?.status !== 'Perlu Koreksi') return;
    updateWorkspace((current) => ({
      ...current,
      applications: current.applications.map((application) => application.id !== selected.id ? application : {
        ...application,
        status: 'Menunggu Verifikasi',
        correctionNote: '',
        history: appendHistory(application, 'Data koreksi diterima, menunggu verifikasi ulang'),
      }),
    }));
  };

  const verifyApplication = () => {
    if (!canVerifyApplication) return;
    updateWorkspace((current) => ({
      ...current,
      applications: current.applications.map((application) => application.id !== selected.id ? application : { ...application, status: 'Terverifikasi', history: appendHistory(application, 'Administrasi diverifikasi') }),
    }));
  };

  const saveNoteAction = () => {
    const reason = actionNote.trim();
    if (!reason || !selected || (actionType === 'correction' && !canCorrect) || (actionType === 'reject' && !canReject)) return;
    const nextStatus = actionType === 'correction' ? 'Perlu Koreksi' : 'Ditolak Administrasi';
    const actionLabel = actionType === 'correction' ? `Koreksi diminta: ${reason}` : `Ditolak administrasi: ${reason}`;
    updateWorkspace((current) => ({
      ...current,
      applications: current.applications.map((application) => application.id !== selected.id ? application : { ...application, status: nextStatus, correctionNote: reason, history: appendHistory(application, actionLabel) }),
    }));
    setActionNote('');
    setActionType('');
  };

  if (!canView) return <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">Akun ini tidak memiliki izin untuk melihat data pendaftar.</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-10 text-ink-super-admin">
      <ModuleHeader code="BO-02 · ADMINISTRASI" title="Pendaftar" description="Periksa pengajuan, data formulir, dokumen, dan riwayat status. Verifikasi administrasi tidak menetapkan kelulusan." />
      <WorkspaceNotice />

      <SectionCard title="Daftar pengajuan" description={`${rows.length} pengajuan ditampilkan · nomor pengajuan berbeda dari jumlah anak unik`}>
        <div className="grid gap-3 border-b border-border-super-admin p-4 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_12rem_12rem]">
          <label className="relative block"><span className="sr-only">Cari pengajuan</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-super-admin" aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nomor, nama anak, satuan..." className="min-h-11 w-full rounded-lg border border-[#818D9A] bg-white pl-10 pr-3 text-sm text-ink-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" /></label>
          <SelectField label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))} />
          <SelectField label="Jenis pendaftar" value={typeFilter} onChange={setTypeFilter} options={[{ value: 'Semua jenis', label: 'Semua jenis' }, { value: 'NEW', label: 'NEW' }, { value: 'TRANSFER', label: 'TRANSFER' }]} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr><th className="px-4 py-3 font-semibold">Nomor pendaftaran</th><th className="px-4 py-3 font-semibold">Nama anak</th><th className="px-4 py-3 font-semibold">Jenis</th><th className="px-4 py-3 font-semibold">Satuan / tingkat</th><th className="px-4 py-3 font-semibold">Offering</th><th className="px-4 py-3 font-semibold">Tanggal kirim</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold"><span className="sr-only">Detail</span></th></tr></thead>
            <tbody className="divide-y divide-border-super-admin">
              {rows.length === 0 ? <EmptyTable colSpan={8} query={Boolean(search || statusFilter !== 'Semua status' || typeFilter !== 'Semua jenis')} /> : rows.map((application) => (
                <tr key={application.id} className="hover:bg-surface-muted-super-admin">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">{application.id}</td><td className="px-4 py-3">{application.childName}</td><td className="px-4 py-3">{application.type}</td><td className="px-4 py-3">{application.unit} · {application.grade}</td><td className="px-4 py-3">{application.offering}</td><td className="whitespace-nowrap px-4 py-3 text-xs">{formatDate(application.submittedAt)}</td><td className="px-4 py-3"><StatusPill>{application.status}</StatusPill></td><td className="px-4 py-3"><button type="button" onClick={() => setSelectedId(application.id)} aria-label={`Lihat detail ${application.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin text-primary-admin-institusi hover:bg-info-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Eye className="h-4 w-4" aria-hidden="true" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <ApplicationDetailDrawer
        application={selected}
        invoice={selectedInvoice}
        canVerify={canVerify}
        canCorrect={canCorrect}
        canReject={canReject}
        canVerifyApplication={canVerifyApplication}
        actionType={actionType}
        actionNote={actionNote}
        setActionNote={setActionNote}
        onVerifyDocument={verifyDocument}
        onMarkDocumentReceived={markDocumentReceived}
        onRecordCorrectionReceived={recordCorrectionReceived}
        onVerifyApplication={verifyApplication}
        onSelectAction={selectAction}
        onSaveNoteAction={saveNoteAction}
        onClose={() => { setSelectedId(''); setActionType(''); setActionNote(''); }}
      />
    </div>
  );
}
