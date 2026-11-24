import React from 'react';
import { Check } from 'lucide-react';
import { Drawer } from '@/components/ui';
import { StatusPill, formatRupiah } from '../WorkspaceComponents';

const formatDate = (value) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));

export default function ApplicationDetailDrawer({
  application,
  invoice,
  canVerify,
  canCorrect,
  canReject,
  canVerifyApplication,
  actionType,
  actionNote,
  setActionNote,
  onVerifyDocument,
  onMarkDocumentReceived,
  onRecordCorrectionReceived,
  onVerifyApplication,
  onSelectAction,
  onSaveNoteAction,
  onClose,
}) {
  if (!application) return null;

  const actionAllowed = actionType === 'correction' ? canCorrect : canReject;
  const hasIncompleteDocuments = application.documents.some((document) => document.status !== 'Terverifikasi');

  return (
    <Drawer
      isOpen
      onClose={onClose}
      title={application.childName}
      subtitle={application.id + ' · ' + application.type + ' · ' + application.unit + ' tingkat ' + application.grade + ' · ' + application.offering}
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {canVerify && application.status === 'Perlu Koreksi' && (
            <button type="button" onClick={onRecordCorrectionReceived} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
              Data koreksi diterima
            </button>
          )}
          {canVerify && (
            <button
              type="button"
              onClick={onVerifyApplication}
              disabled={!canVerifyApplication}
              title={hasIncompleteDocuments ? 'Verifikasi setiap dokumen wajib terlebih dahulu.' : undefined}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
            >
              <Check className="h-4 w-4" aria-hidden="true" /> Verifikasi administrasi
            </button>
          )}
          {canCorrect && ['Menunggu Verifikasi', 'Terverifikasi'].includes(application.status) && (
            <button type="button" onClick={() => onSelectAction('correction')} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-warning-border px-4 text-sm font-semibold text-warning-foreground hover:bg-warning-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-foreground">
              Minta koreksi
            </button>
          )}
          {canReject && ['Menunggu Verifikasi', 'Perlu Koreksi'].includes(application.status) && (
            <button type="button" onClick={() => onSelectAction('reject')} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-error-border px-4 text-sm font-semibold text-error-foreground hover:bg-error-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-foreground">
              Tolak administrasi
            </button>
          )}
          <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold text-ink-super-admin hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
            Tutup
          </button>
        </div>
      }
    >
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold">Status pengajuan</h3>
          <StatusPill>{application.status}</StatusPill>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-surface-muted-super-admin p-4 text-sm">
          <div><dt className="text-xs text-muted-super-admin">Tanggal dikirim</dt><dd className="mt-1 font-medium">{formatDate(application.submittedAt)}</dd></div>
          <div><dt className="text-xs text-muted-super-admin">ID anak</dt><dd className="mt-1 font-medium">{application.childId}</dd></div>
        </dl>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold">Identitas dan formulir</h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          {Object.entries({
            'Tanggal lahir': application.form.birthDate,
            'Jenis kelamin': application.form.gender,
            'Sekolah asal': application.form.school,
            'Nama ayah': application.form.father,
            'Nama ibu': application.form.mother,
            'Nomor wali': application.form.phone,
            Alamat: application.form.address,
          }).map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border-super-admin p-3">
              <dt className="text-xs text-muted-super-admin">{label}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold">Dokumen dan verifikasi</h3>
        <ul className="divide-y divide-border-super-admin rounded-lg border border-border-super-admin">
          {application.documents.map((document, index) => (
            <li key={document.name} className="flex flex-wrap items-center justify-between gap-3 p-3">
              <div><p className="text-sm font-medium">{document.name}</p><div className="mt-1"><StatusPill>{document.status}</StatusPill></div></div>
              {canVerify && document.status === 'Belum diunggah' && application.status === 'Perlu Koreksi' && (
                <button type="button" onClick={() => onMarkDocumentReceived(index)} className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
                  Catat unggahan diterima
                </button>
              )}
              {canVerify && document.status !== 'Terverifikasi' && document.status !== 'Belum diunggah' && (
                <button type="button" onClick={() => onVerifyDocument(index)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-3 text-xs font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
                  <Check className="h-4 w-4" aria-hidden="true" /> Verifikasi dokumen
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-super-admin">Dokumen belum diunggah tidak dapat diverifikasi. Status pembayaran hanya dibaca dari modul Pembayaran.</p>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold">Status tagihan · baca-saja</h3>
        {invoice ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border-super-admin p-3">
            <div><p className="text-sm font-medium">{invoice.type}</p><p className="mt-1 text-xs text-muted-super-admin">{invoice.id} · {formatRupiah(invoice.amount)}</p></div>
            <StatusPill>{invoice.status}</StatusPill>
          </div>
        ) : <p className="rounded-lg border border-border-super-admin p-3 text-sm text-muted-super-admin">Belum ada tagihan tercatat.</p>}
      </section>

      {application.correctionNote && <section><h3 className="mb-2 text-sm font-bold">Catatan koreksi</h3><p className="rounded-lg border border-warning-border bg-warning-surface p-3 text-sm leading-relaxed text-warning-foreground">{application.correctionNote}</p></section>}

      <section>
        <h3 className="mb-3 text-sm font-bold">Riwayat status</h3>
        <ol className="space-y-3 border-l border-border-super-admin pl-4">
          {application.history.map((item, index) => <li key={item.date + '-' + index} className="relative"><span aria-hidden="true" className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary-admin-institusi" /><p className="text-sm">{item.label}</p><time className="mt-1 block text-xs text-muted-super-admin">{item.date}</time></li>)}
        </ol>
      </section>

      {actionType && actionAllowed && (
        <section className="rounded-lg border border-warning-border bg-warning-surface p-4">
          <label htmlFor="application-action-note" className="block text-sm font-semibold text-ink-super-admin">
            {actionType === 'correction' ? 'Alasan atau catatan koreksi wajib diisi' : 'Alasan penolakan administrasi wajib diisi'}
          </label>
          <textarea id="application-action-note" value={actionNote} onChange={(event) => setActionNote(event.target.value)} rows={3} required className="mt-2 w-full rounded-lg border border-[#818D9A] bg-white p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={onSaveNoteAction} disabled={!actionNote.trim()} className="inline-flex min-h-11 items-center rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">Simpan catatan</button>
            <button type="button" onClick={() => onSelectAction('')} className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">Batal</button>
          </div>
        </section>
      )}
    </Drawer>
  );
}
