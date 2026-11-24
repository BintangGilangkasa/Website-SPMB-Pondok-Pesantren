import React, { useMemo, useState } from 'react';
import { CalendarPlus, Check, Pencil, Send } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import { InputField, ModuleHeader, SectionCard, SelectField, StatusPill, WorkspaceNotice } from '../../../components/admin-institusi/WorkspaceComponents';

const TABS = [
  { id: 'schedule', label: 'Jadwal' },
  { id: 'participants', label: 'Peserta & nilai' },
  { id: 'decisions', label: 'Keputusan' },
  { id: 'history', label: 'Riwayat publikasi' },
];
const EMPTY_SCHEDULE = { title: '', offering: 'MTs · Baru', date: '', time: '', location: '', required: true, status: 'Terjadwal' };

export default function SeleksiHasil() {
  const { user } = useAuth();
  const [workspace, updateWorkspace] = useAdmissionWorkspace(user?.tenant);
  const [activeTab, setActiveTab] = useState('schedule');
  const [scheduleForm, setScheduleForm] = useState(EMPTY_SCHEDULE);
  const [editingScheduleId, setEditingScheduleId] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [correctionApplicationId, setCorrectionApplicationId] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');
  const [notice, setNotice] = useState(null);
  const canView = hasAdminPermission(user, 'selection:view');
  const canScore = hasAdminPermission(user, 'selection:score');
  const canDecide = hasAdminPermission(user, 'selection:decide');
  const canPublish = hasAdminPermission(user, 'selection:publish');
  const participants = useMemo(() => workspace.applications.filter((application) => application.status === 'Terverifikasi'), [workspace.applications]);
  const publishedParticipants = participants.filter((application) => workspace.results[application.id]?.published);

  const openNewSchedule = () => {
    setEditingScheduleId('');
    setScheduleForm({ ...EMPTY_SCHEDULE });
    setShowScheduleForm(true);
  };

  const openEditSchedule = (schedule) => {
    setEditingScheduleId(schedule.id);
    setScheduleForm({ ...schedule });
    setShowScheduleForm(true);
  };

  const saveSchedule = (event) => {
    event.preventDefault();
    if (!canDecide || !scheduleForm.title.trim() || !scheduleForm.date) return;
    const timestamp = new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const next = { ...scheduleForm, id: editingScheduleId || `SEL-${Date.now()}` };
    updateWorkspace((current) => ({
      ...current,
      schedules: editingScheduleId
        ? current.schedules.map((schedule) => schedule.id === editingScheduleId ? next : schedule)
        : [...current.schedules, next],
      selectionHistory: [...(current.selectionHistory ?? []), { date: timestamp, label: `${editingScheduleId ? 'Jadwal diperbarui' : 'Jadwal ditambahkan'}: ${next.title} · ${next.offering}` }],
    }));
    setShowScheduleForm(false);
    setNotice({ type: 'success', text: `Jadwal seleksi berhasil ${editingScheduleId ? 'diperbarui' : 'ditambahkan'} di draft lokal.` });
  };

  const updateScore = (applicationId, score) => {
    if (!canScore) return;
    const parsedScore = score === '' ? null : Math.min(100, Math.max(0, Number(score)));
    updateWorkspace((current) => ({
      ...current,
      results: { ...current.results, [applicationId]: { ...(current.results[applicationId] ?? { decision: 'Menunggu Keputusan', published: false }), score: parsedScore } },
    }));
  };

  const updateDecision = (application, decision) => {
    if (!canDecide) return;
    const previous = workspace.results[application.id] ?? { score: null, decision: 'Menunggu Keputusan', published: false };
    if (previous.published) {
      setNotice({ type: 'error', text: 'Hasil yang sudah diumumkan tidak dapat diedit di sini. Gunakan prosedur koreksi hasil dengan audit.' });
      return;
    }
    const capacity = workspace.capacities.find((item) => item.offering === application.offering);
    const acceptedCount = Object.entries(workspace.results).filter(([id, result]) => id !== application.id && workspace.applications.find((candidate) => candidate.id === id)?.offering === application.offering && result.decision === 'Diterima').length;
    const available = capacity ? capacity.quota - capacity.confirmed - capacity.reserved : 0;
    const alreadyReservedForThisDecision = previous.decision === 'Diterima';
    if (decision === 'Diterima' && !alreadyReservedForThisDecision && acceptedCount >= available) {
      setNotice({ type: 'error', text: `Keputusan belum dapat ditetapkan: kapasitas ${application.offering} tidak mencukupi.` });
      return;
    }
    const timestamp = new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    updateWorkspace((current) => ({
      ...current,
      results: { ...current.results, [application.id]: { ...previous, decision, published: false } },
      selectionHistory: [...(current.selectionHistory ?? []), { date: timestamp, label: `Keputusan draft ${application.id}: ${decision}` }],
    }));
    setNotice({ type: 'success', text: `Keputusan ${application.childName} disimpan sebagai draft. Belum diumumkan.` });
  };

  const publishResults = () => {
    if (!canPublish) return;
    const prepared = participants.filter((application) => {
      const result = workspace.results[application.id];
      return result && !result.published && ['Diterima', 'Tidak Diterima'].includes(result.decision);
    });
    if (!prepared.length) {
      setNotice({ type: 'info', text: 'Belum ada keputusan draft yang siap dipublikasikan.' });
      return;
    }
    const timestamp = new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    updateWorkspace((current) => {
      const results = { ...current.results };
      let reRegistrations = [...current.reRegistrations];
      let capacities = current.capacities.map((capacity) => ({ ...capacity }));
      const history = [...(current.selectionHistory ?? [])];
      prepared.forEach((application) => {
        const result = results[application.id];
        results[application.id] = { ...result, published: true };
        history.push({ date: timestamp, label: `Hasil ${application.id} diumumkan: ${result.decision}` });
        // Create the re-registration record and reserve a seat once, only after an accepted result is published.
        if (result.decision === 'Diterima' && !reRegistrations.some((item) => item.applicationId === application.id)) {
          reRegistrations.push({ applicationId: application.id, status: 'Menunggu Dokumen', paymentStatus: 'Menunggu Pembayaran', documents: [{ name: 'Surat pernyataan', status: 'Belum diunggah' }, { name: 'Bukti kesehatan', status: 'Belum diunggah' }], note: '', dueDate: '2026-11-30' });
          capacities = capacities.map((capacity) => capacity.offering === application.offering ? { ...capacity, reserved: capacity.reserved + 1 } : capacity);
        }
      });
      return {
        ...current,
        results,
        reRegistrations,
        capacities,
        applications: current.applications.map((application) => results[application.id] ? { ...application, result: results[application.id].decision } : application),
        selectionHistory: history,
      };
    });
    setNotice({ type: 'success', text: `${prepared.length} hasil dipublikasikan di workspace contoh. Kursi peserta diterima ditahan sampai daftar ulang selesai.` });
  };

  const requestPublishedCorrection = () => {
    const reason = correctionReason.trim();
    if (!canDecide || !correctionApplicationId || !reason) return;
    const date = new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    const record = { applicationId: correctionApplicationId, reason, date, status: 'Menunggu prosedur koreksi' };
    updateWorkspace((current) => ({
      ...current,
      resultCorrectionRequests: [...(current.resultCorrectionRequests ?? []), record],
      selectionHistory: [...(current.selectionHistory ?? []), { date, label: 'Permintaan koreksi hasil ' + correctionApplicationId + ': ' + reason }],
    }));
    setCorrectionReason('');
    setCorrectionApplicationId('');
    setNotice({ type: 'success', text: 'Permintaan koreksi dicatat untuk audit. Hasil yang sudah diumumkan tidak berubah.' });
  };

  if (!canView) return <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">Akun ini tidak memiliki izin melihat data seleksi.</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-10 text-ink-super-admin">
      <ModuleHeader code="BO-03 · SELEKSI & HASIL" title="Seleksi dan hasil" description="Atur jadwal, nilai, keputusan, dan publikasi. Ujian dapat bersifat opsional dan hasil tetap terpisah dari verifikasi administrasi." actions={canPublish && <button type="button" onClick={publishResults} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white hover:bg-primary-hover-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Send className="h-4 w-4" aria-hidden="true" /> Publikasikan hasil draft</button>} />
      <WorkspaceNotice>Data contoh untuk pratinjau alur seleksi. Keputusan diterima memeriksa sisa kapasitas dan hanya hasil draft yang dapat diubah.</WorkspaceNotice>
      {notice && <div className={`rounded-lg border p-3 text-sm ${notice.type === 'error' ? 'border-error-border bg-error-surface text-error-foreground' : notice.type === 'success' ? 'border-success-border bg-success-surface text-success-foreground' : 'border-info-border bg-info-surface text-info-foreground'}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.text}</div>}

      <div role="tablist" aria-label="Bagian seleksi" className="flex gap-1 overflow-x-auto border-b border-border-super-admin">
        {TABS.map((tab) => <button key={tab.id} id={`selection-tab-${tab.id}`} role="tab" aria-selected={activeTab === tab.id} aria-controls={`selection-panel-${tab.id}`} type="button" onClick={() => setActiveTab(tab.id)} className={`min-h-11 shrink-0 border-b-2 px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-admin-institusi ${activeTab === tab.id ? 'border-primary-admin-institusi text-primary-admin-institusi' : 'border-transparent text-muted-super-admin hover:text-ink-super-admin'}`}>{tab.label}</button>)}
      </div>

      {activeTab === 'schedule' && <div id="selection-panel-schedule" role="tabpanel" aria-labelledby="selection-tab-schedule" className="space-y-4">
        <SectionCard title="Jadwal seleksi" description="Jadwal boleh berlangsung setelah penutupan pendaftaran baru." actions={canDecide && <button type="button" onClick={openNewSchedule} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-3 text-sm font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><CalendarPlus className="h-4 w-4" aria-hidden="true" /> Tambah jadwal</button>}>
          <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr><th className="px-4 py-3">Kegiatan</th><th className="px-4 py-3">Offering</th><th className="px-4 py-3">Tanggal & waktu</th><th className="px-4 py-3">Lokasi</th><th className="px-4 py-3">Kewajiban</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"><span className="sr-only">Aksi</span></th></tr></thead><tbody className="divide-y divide-border-super-admin">{workspace.schedules.map((schedule) => <tr key={schedule.id}><td className="px-4 py-3 font-semibold">{schedule.title}</td><td className="px-4 py-3">{schedule.offering}</td><td className="whitespace-nowrap px-4 py-3">{schedule.date} · {schedule.time}</td><td className="px-4 py-3">{schedule.location}</td><td className="px-4 py-3">{schedule.required ? 'Wajib' : 'Opsional'}</td><td className="px-4 py-3"><StatusPill>{schedule.status}</StatusPill></td><td className="px-4 py-3">{canDecide && <button type="button" onClick={() => openEditSchedule(schedule)} aria-label={`Edit jadwal ${schedule.title}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Pencil className="h-4 w-4" aria-hidden="true" /></button>}</td></tr>)}</tbody></table></div>
        </SectionCard>
        {showScheduleForm && <SectionCard title={editingScheduleId ? 'Edit jadwal' : 'Tambah jadwal'} description="Simpan perubahan pada draft lokal."><form onSubmit={saveSchedule} className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"><InputField label="Nama kegiatan" value={scheduleForm.title} onChange={(value) => setScheduleForm((current) => ({ ...current, title: value }))} required /><SelectField label="Offering" value={scheduleForm.offering} onChange={(value) => setScheduleForm((current) => ({ ...current, offering: value }))} options={workspace.capacities.map((item) => ({ value: item.offering, label: item.offering }))} /><InputField label="Tanggal" type="date" value={scheduleForm.date} onChange={(value) => setScheduleForm((current) => ({ ...current, date: value }))} required /><InputField label="Waktu" value={scheduleForm.time} onChange={(value) => setScheduleForm((current) => ({ ...current, time: value }))} placeholder="08.00–10.00" /><InputField label="Lokasi" value={scheduleForm.location} onChange={(value) => setScheduleForm((current) => ({ ...current, location: value }))} /><SelectField label="Ujian wajib?" value={String(scheduleForm.required)} onChange={(value) => setScheduleForm((current) => ({ ...current, required: value === 'true' }))} options={[{ value: 'true', label: 'Wajib' }, { value: 'false', label: 'Opsional' }]} /><div className="flex flex-wrap gap-2 sm:col-span-2"><button type="submit" disabled={!canDecide} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"><Check className="h-4 w-4" aria-hidden="true" /> Simpan jadwal</button><button type="button" onClick={() => setShowScheduleForm(false)} className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">Batal</button></div></form></SectionCard>}
      </div>}

      {activeTab === 'participants' && <div id="selection-panel-participants" role="tabpanel" aria-labelledby="selection-tab-participants"><SectionCard title="Peserta dan nilai" description="Peserta berasal dari pengajuan yang administrasinya sudah terverifikasi. Nilai ujian tidak wajib untuk semua jalur."><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr><th className="px-4 py-3">Nomor pendaftaran</th><th className="px-4 py-3">Nama anak</th><th className="px-4 py-3">Offering</th><th className="px-4 py-3">Nilai (0–100)</th><th className="px-4 py-3">Keputusan</th><th className="px-4 py-3">Publikasi</th></tr></thead><tbody className="divide-y divide-border-super-admin">{participants.map((application) => { const result = workspace.results[application.id] ?? { score: '', decision: 'Menunggu Keputusan', published: false }; return <tr key={application.id}><td className="px-4 py-3 font-semibold">{application.id}</td><td className="px-4 py-3">{application.childName}</td><td className="px-4 py-3">{application.offering}</td><td className="px-4 py-3"><input type="number" min="0" max="100" step="0.01" value={result.score ?? ''} onChange={(event) => updateScore(application.id, event.target.value)} disabled={!canScore || result.published} aria-label={`Nilai ${application.childName}`} className="min-h-11 w-28 rounded-lg border border-[#818D9A] px-3 text-sm disabled:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" /></td><td className="px-4 py-3"><SelectField label={`Keputusan ${application.childName}`} value={result.decision} onChange={(decision) => updateDecision(application, decision)} disabled={!canDecide || result.published} options={[{ value: 'Menunggu Keputusan', label: 'Menunggu keputusan' }, { value: 'Diterima', label: 'Diterima' }, { value: 'Tidak Diterima', label: 'Tidak diterima' }]} className="min-w-44" /></td><td className="px-4 py-3"><StatusPill>{result.published ? 'Diumumkan' : result.decision}</StatusPill></td></tr>; })}</tbody></table></div></SectionCard></div>}

      {activeTab === 'decisions' && <div id="selection-panel-decisions" role="tabpanel" aria-labelledby="selection-tab-decisions" className="space-y-4"><SectionCard title="Ringkasan keputusan" description="Penetapan kelulusan terpisah dari nilai dan administrasi. Hasil baru terlihat setelah dipublikasikan."><div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">{['Diterima', 'Tidak Diterima', 'Menunggu Keputusan', 'Diumumkan'].map((status) => { const count = participants.filter((application) => { const result = workspace.results[application.id]; return status === 'Diumumkan' ? result?.published : (result?.decision ?? 'Menunggu Keputusan') === status; }).length; return <div key={status} className="rounded-lg border border-border-super-admin p-4"><p className="text-xs text-muted-super-admin">{status}</p><p className="mt-2 text-2xl font-bold">{count}</p></div>; })}</div></SectionCard><SectionCard title="Kapasitas offering" description="Keputusan diterima hanya tersedia selama kapasitas masih cukup."><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin"><tr><th className="px-4 py-3">Offering</th><th className="px-4 py-3">Kuota</th><th className="px-4 py-3">Reserved</th><th className="px-4 py-3">Confirmed</th><th className="px-4 py-3">Tersedia</th></tr></thead><tbody className="divide-y divide-border-super-admin">{workspace.capacities.map((capacity) => <tr key={capacity.offering}><td className="px-4 py-3 font-semibold">{capacity.offering}</td><td className="px-4 py-3">{capacity.quota}</td><td className="px-4 py-3">{capacity.reserved}</td><td className="px-4 py-3">{capacity.confirmed}</td><td className="px-4 py-3 font-bold">{Math.max(capacity.quota - capacity.reserved - capacity.confirmed, 0)}</td></tr>)}</tbody></table></div></SectionCard></div>}

      {activeTab === 'history' && <div id="selection-panel-history" role="tabpanel" aria-labelledby="selection-tab-history"><SectionCard title="Riwayat perubahan seleksi" description="Jejak jadwal, keputusan draft, dan publikasi hasil."><ol className="divide-y divide-border-super-admin">{[...(workspace.selectionHistory ?? [])].slice().reverse().map((item, index) => <li key={`${item.date}-${index}`} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm">{item.label}</span><time className="text-xs text-muted-super-admin">{item.date}</time></li>)}</ol></SectionCard></div>}
      {activeTab === 'decisions' && <SectionCard title="Permintaan koreksi hasil" description="Hasil yang sudah diumumkan tidak dapat diedit langsung. Catat alasan agar permintaan masuk riwayat audit.">
        {canDecide && <div className="grid gap-3 border-b border-border-super-admin p-4 sm:grid-cols-[minmax(14rem,1fr)_minmax(16rem,2fr)_auto]">
          <SelectField label="Hasil yang diumumkan" value={correctionApplicationId} onChange={setCorrectionApplicationId} options={[{ value: '', label: 'Pilih peserta' }, ...publishedParticipants.map((application) => ({ value: application.id, label: application.id + ' · ' + application.childName }))]} />
          <label className="block space-y-1.5"><span className="block text-xs font-semibold text-ink-super-admin">Alasan koreksi</span><textarea value={correctionReason} onChange={(event) => setCorrectionReason(event.target.value)} rows={2} required placeholder="Wajib menjelaskan dasar koreksi" className="w-full rounded-lg border border-[#818D9A] p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" /></label>
          <button type="button" onClick={requestPublishedCorrection} disabled={!correctionApplicationId || !correctionReason.trim()} className="inline-flex min-h-11 self-end items-center justify-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">Catat permintaan</button>
        </div>}
        <ol className="divide-y divide-border-super-admin">{(workspace.resultCorrectionRequests ?? []).length ? [...workspace.resultCorrectionRequests].reverse().map((item, index) => <li key={item.applicationId + '-' + index} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm"><strong>{item.applicationId}</strong> · {item.reason}</span><span className="text-xs text-muted-super-admin">{item.date} · {item.status}</span></li>) : <li className="px-4 py-5 text-sm text-muted-super-admin">Belum ada permintaan koreksi hasil.</li>}</ol>
      </SectionCard>}
    </div>
  );
}
