import React, { useMemo, useState } from 'react';
import { Check, CircleAlert, FilePlus2, Pencil, X } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useAdmissionWorkspace } from '../../../context/useAdmissionWorkspace';
import { hasAdminPermission } from '../../../utils/adminPermissions';
import {
  formatRupiah,
  InputField,
  ModuleHeader,
  SectionCard,
  SelectField,
  StatusPill,
  WorkspaceNotice,
} from '../../../components/admin-institusi/WorkspaceComponents';
import { useDialogFocus } from '../../../hooks/useDialogFocus';

const TABS = [
  { id: 'invoices', label: 'Tagihan' },
  { id: 'tariffs', label: 'Tarif' },
  { id: 'transactions', label: 'Transaksi' },
  { id: 'issues', label: 'Transaksi bermasalah' },
];

const EMPTY_TARIFF = {
  type: '',
  scope: 'Per pengajuan',
  amount: '',
  currency: 'IDR',
  validFrom: '',
  validUntil: '',
  status: 'Aktif',
};

const timestamp = () =>
  new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());

export default function PembayaranPlatform() {
  const { user } = useAuth();
  const [workspace, updateWorkspace] = useAdmissionWorkspace(user?.tenant);

  const [activeTab, setActiveTab] = useState('invoices');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua status');

  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    applicationId: workspace.applications[0]?.id ?? '',
    tariffId: workspace.tariffs.find((tariff) => tariff.status === 'Aktif')?.id ?? '',
    dueDate: '',
    method: 'Transfer bank',
  });

  const [showTariffForm, setShowTariffForm] = useState(false);
  const [editingTariffId, setEditingTariffId] = useState('');
  const [tariffForm, setTariffForm] = useState({ ...EMPTY_TARIFF });

  const [issueNote, setIssueNote] = useState('');
  const [notice, setNotice] = useState(null);

  const invoiceFormRef = useDialogFocus(showInvoiceForm, () => setShowInvoiceForm(false));
  const invoiceDetailRef = useDialogFocus(Boolean(selectedInvoiceId), () =>
    setSelectedInvoiceId('')
  );

  const canView = hasAdminPermission(user, 'payment:view');
  const canCreate = hasAdminPermission(user, 'payment:create');
  const canVerify = hasAdminPermission(user, 'payment:verify');

  const activeTariffs = useMemo(
    () => workspace.tariffs.filter((tariff) => tariff.status === 'Aktif'),
    [workspace.tariffs]
  );

  const selectedInvoice = workspace.invoices.find(
    (invoice) => invoice.id === selectedInvoiceId
  );
  const selectedTariff = activeTariffs.find(
    (tariff) => tariff.id === invoiceForm.tariffId
  );

  const filteredInvoices = useMemo(
    () =>
      workspace.invoices.filter((invoice) => {
        const query = search.trim().toLocaleLowerCase('id-ID');
        const matchesSearch =
          !query ||
          [
            invoice.id,
            invoice.applicationId,
            invoice.childName,
            invoice.type,
            invoice.transactionId,
          ].some((value) =>
            String(value ?? '').toLocaleLowerCase('id-ID').includes(query)
          );
        const matchesStatus =
          statusFilter === 'Semua status' || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [workspace.invoices, search, statusFilter]
  );

  const recordedTransactions = useMemo(
    () => workspace.invoices.filter((invoice) => invoice.transactionId),
    [workspace.invoices]
  );

  const issueInvoices = useMemo(
    () => workspace.invoices.filter((invoice) => invoice.status === 'Bermasalah'),
    [workspace.invoices]
  );

  const openInvoiceForm = () => {
    setInvoiceForm({
      applicationId: workspace.applications[0]?.id ?? '',
      tariffId: activeTariffs[0]?.id ?? '',
      dueDate: '',
      method: 'Transfer bank',
    });
    setShowInvoiceForm(true);
  };

  const openInvoiceDetail = (invoice) => {
    setSelectedInvoiceId(invoice.id);
    setIssueNote(invoice.issueNote ?? '');
  };

  const openNewTariff = () => {
    setEditingTariffId('');
    setTariffForm({ ...EMPTY_TARIFF });
    setShowTariffForm(true);
  };

  const openEditTariff = (tariff) => {
    setEditingTariffId(tariff.id);
    setTariffForm({ ...tariff });
    setShowTariffForm(true);
  };

  const saveTariff = (event) => {
    event.preventDefault();
    const parsedAmount = Number(tariffForm.amount);

    if (
      !canCreate ||
      !tariffForm.type.trim() ||
      !tariffForm.scope.trim() ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0 ||
      !tariffForm.validFrom ||
      !tariffForm.validUntil
    ) {
      setNotice({
        type: 'error',
        text: 'Lengkapi seluruh data tarif dengan nominal lebih dari 0.',
      });
      return;
    }

    if (tariffForm.validFrom > tariffForm.validUntil) {
      setNotice({
        type: 'error',
        text: 'Tanggal mulai berlaku tidak boleh melebihi tanggal berakhir.',
      });
      return;
    }

    const nextTariff = {
      ...tariffForm,
      type: tariffForm.type.trim(),
      scope: tariffForm.scope.trim(),
      amount: parsedAmount,
      id: editingTariffId || `TAR-${Date.now()}`,
    };

    updateWorkspace((current) => ({
      ...current,
      tariffs: editingTariffId
        ? current.tariffs.map((tariff) =>
            tariff.id === editingTariffId ? nextTariff : tariff
          )
        : [...current.tariffs, nextTariff],
      paymentHistory: [
        ...(current.paymentHistory ?? []),
        {
          date: timestamp(),
          label: `${editingTariffId ? 'Tarif diperbarui' : 'Tarif ditambahkan'}: ${
            nextTariff.type
          } · ${formatRupiah(nextTariff.amount)}`,
        },
      ],
    }));

    setShowTariffForm(false);
    setNotice({
      type: 'success',
      text: 'Tarif tersimpan di workspace lokal. Tagihan yang sudah terbit tetap menyimpan nominal awal.',
    });
  };

  const createInvoice = (event) => {
    event.preventDefault();
    if (!canCreate || !selectedTariff || !invoiceForm.applicationId || !invoiceForm.dueDate) {
      return;
    }

    const application = workspace.applications.find(
      (item) => item.id === invoiceForm.applicationId
    );
    if (!application) return;

    const invoice = {
      id: `INV-${Date.now()}`,
      applicationId: application.id,
      childName: application.childName,
      type: selectedTariff.type,
      scope: selectedTariff.scope,
      // Snapshot the tariff so later price edits cannot change an issued obligation.
      amount: Number(selectedTariff.amount),
      dueDate: invoiceForm.dueDate,
      method: invoiceForm.method,
      status: 'Menunggu Pembayaran',
      transactionId: '',
      tariffId: selectedTariff.id,
    };

    updateWorkspace((current) => ({
      ...current,
      invoices: [invoice, ...current.invoices],
      paymentHistory: [
        ...(current.paymentHistory ?? []),
        {
          date: timestamp(),
          label: `Tagihan ${invoice.id} diterbitkan untuk ${application.childName}`,
        },
      ],
    }));

    setShowInvoiceForm(false);
    setNotice({
      type: 'success',
      text: `Tagihan ${invoice.id} diterbitkan dengan nominal ${formatRupiah(invoice.amount)}.`,
    });
  };

  const verifyManualPayment = () => {
    if (
      !canVerify ||
      !selectedInvoice ||
      selectedInvoice.status !== 'Menunggu Verifikasi' ||
      !selectedInvoice.transactionId
    ) {
      return;
    }

    updateWorkspace((current) => ({
      ...current,
      invoices: current.invoices.map((invoice) =>
        invoice.id === selectedInvoice.id
          ? { ...invoice, status: 'Lunas', verifiedAt: timestamp() }
          : invoice
      ),
      reRegistrations: current.reRegistrations.map((item) =>
        item.applicationId === selectedInvoice.applicationId
          ? { ...item, paymentStatus: 'Lunas' }
          : item
      ),
      paymentHistory: [
        ...(current.paymentHistory ?? []),
        {
          date: timestamp(),
          label: `Pembayaran ${selectedInvoice.id} diverifikasi manual · ${selectedInvoice.transactionId}`,
        },
      ],
    }));

    setNotice({
      type: 'success',
      text: `Pembayaran ${selectedInvoice.id} diverifikasi. Nilai tagihan tersimpan pada transaksi.`,
    });
  };

  const saveIssueNote = () => {
    if (!canVerify || !selectedInvoice || !issueNote.trim()) return;

    updateWorkspace((current) => ({
      ...current,
      invoices: current.invoices.map((invoice) =>
        invoice.id === selectedInvoice.id
          ? { ...invoice, issueNote: issueNote.trim(), issueStatus: 'Ditangani' }
          : invoice
      ),
      paymentHistory: [
        ...(current.paymentHistory ?? []),
        {
          date: timestamp(),
          label: `Catatan penanganan ${selectedInvoice.id}: ${issueNote.trim()}`,
        },
      ],
    }));

    setIssueNote('');
    setNotice({
      type: 'success',
      text: 'Catatan penanganan tersimpan. Status pembayaran tetap dikelola melalui verifikasi transaksi.',
    });
  };

  if (!canView) {
    return (
      <div className="mx-auto max-w-7xl rounded-xl border border-error-border bg-error-surface p-5 text-sm text-error-foreground">
        Akun ini tidak memiliki izin untuk melihat data pembayaran.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-10 text-ink-super-admin">
      <ModuleHeader
        code="BO-04 · PEMBAYARAN"
        title="Pembayaran"
        description="Kelola ruang lingkup tarif, tagihan, verifikasi manual, dan transaksi bermasalah."
        actions={
          canCreate && (
            <button
              type="button"
              onClick={openInvoiceForm}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white hover:bg-primary-hover-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              Terbitkan tagihan
            </button>
          )
        }
      />

      <WorkspaceNotice>
        Data contoh. Tagihan dan verifikasi tersimpan di workspace lokal; nominal setiap tagihan
        tidak berubah saat tarif diperbarui.
      </WorkspaceNotice>

      {notice && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            notice.type === 'error'
              ? 'border-error-border bg-error-surface text-error-foreground'
              : 'border-success-border bg-success-surface text-success-foreground'
          }`}
          role={notice.type === 'error' ? 'alert' : 'status'}
        >
          {notice.text}
        </div>
      )}

      {/* Tab Navigation */}
      <div
        role="tablist"
        aria-label="Bagian pembayaran"
        className="flex gap-1 overflow-x-auto border-b border-border-super-admin"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`payment-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`payment-panel-${tab.id}`}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-11 shrink-0 border-b-2 px-4 text-sm font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi ${
              activeTab === tab.id
                ? 'border-primary-admin-institusi text-primary-admin-institusi'
                : 'border-transparent text-muted-super-admin hover:text-ink-super-admin'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TAGIHAN */}
      {activeTab === 'invoices' && (
        <div
          id="payment-panel-invoices"
          role="tabpanel"
          aria-labelledby="payment-tab-invoices"
        >
          <SectionCard
            title="Daftar tagihan"
            description={`${filteredInvoices.length} tagihan · status pembayaran adalah sumber data modul ini`}
          >
            <div className="grid gap-3 border-b border-border-super-admin p-4 sm:grid-cols-[minmax(16rem,1fr)_14rem]">
              <label className="relative block">
                <input
                  status="Search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari invoice, nama, transaksi..."
                  className="min-h-11 w-full rounded-lg border border-[#818D9A] px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                />
              </label>

              <SelectField
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  'Semua status',
                  ...new Set(workspace.invoices.map((invoice) => invoice.status)),
                ].map((status) => ({ value: status, label: status }))}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-225 text-left text-sm">
                <thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin">
                  <tr>
                    <th className="px-4 py-3">Nomor invoice</th>
                    <th className="px-4 py-3">Nama anak</th>
                    <th className="px-4 py-3">Jenis biaya</th>
                    <th className="px-4 py-3">Cakupan</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Jatuh tempo</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">
                      <span className="sr-only">Detail</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-super-admin">
                  {filteredInvoices.length ? (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                          {invoice.id}
                        </td>
                        <td className="px-4 py-3">{invoice.childName}</td>
                        <td className="px-4 py-3">{invoice.type}</td>
                        <td className="px-4 py-3">{invoice.scope}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                          {formatRupiah(invoice.amount)}
                        </td>
                        <td className="px-4 py-3">{invoice.dueDate}</td>
                        <td className="px-4 py-3">{invoice.method}</td>
                        <td className="px-4 py-3">
                          <StatusPill>{invoice.status}</StatusPill>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => openInvoiceDetail(invoice)}
                            className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-3 text-xs font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-sm text-muted-super-admin"
                      >
                        Tidak ada tagihan untuk pencarian ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {/* TAB 2: TARIF */}
      {activeTab === 'tariffs' && (
        <div
          id="payment-panel-tariffs"
          role="tabpanel"
          aria-labelledby="payment-tab-tariffs"
          className="space-y-4"
        >
          <SectionCard
            title="Pengaturan tarif"
            description="Tarif mencatat cakupan serta masa berlaku. Perubahan tarif tidak mengubah tagihan yang sudah diterbitkan."
            actions={
              canCreate && (
                <button
                  type="button"
                  onClick={openNewTariff}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-3 text-sm font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                  Tambah tarif
                </button>
              )
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin">
                  <tr>
                    <th className="px-4 py-3">Jenis biaya</th>
                    <th className="px-4 py-3">Cakupan tarif</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Mata uang</th>
                    <th className="px-4 py-3">Berlaku</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-super-admin">
                  {workspace.tariffs.length ? (
                    workspace.tariffs.map((tariff) => (
                      <tr key={tariff.id}>
                        <td className="px-4 py-3 font-semibold">{tariff.type}</td>
                        <td className="px-4 py-3">{tariff.scope}</td>
                        <td className="px-4 py-3">{formatRupiah(tariff.amount)}</td>
                        <td className="px-4 py-3">{tariff.currency}</td>
                        <td className="px-4 py-3">
                          {tariff.validFrom} – {tariff.validUntil}
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill>{tariff.status}</StatusPill>
                        </td>
                        <td className="px-4 py-3">
                          {canCreate && (
                            <button
                              type="button"
                              onClick={() => openEditTariff(tariff)}
                              aria-label={`Edit tarif ${tariff.type}`}
                              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-muted-super-admin"
                      >
                        Belum ada komponen tarif yang terdaftar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {showTariffForm && (
            <SectionCard title={editingTariffId ? 'Edit tarif' : 'Tambah tarif'}>
              <form onSubmit={saveTariff} className="grid gap-4 p-4 sm:grid-cols-2">
                <InputField
                  label="Jenis biaya"
                  value={tariffForm.type}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, type: value }))
                  }
                  required
                />
                <InputField
                  label="Cakupan tarif"
                  value={tariffForm.scope}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, scope: value }))
                  }
                  required
                />
                <InputField
                  label="Nominal"
                  type="number"
                  min="1"
                  value={tariffForm.amount}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, amount: value }))
                  }
                  required
                />
                <SelectField
                  label="Mata uang"
                  value={tariffForm.currency}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, currency: value }))
                  }
                  options={[{ value: 'IDR', label: 'IDR · Rupiah' }]}
                />
                <InputField
                  label="Berlaku mulai"
                  type="date"
                  value={tariffForm.validFrom}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, validFrom: value }))
                  }
                  required
                />
                <InputField
                  label="Berlaku sampai"
                  type="date"
                  value={tariffForm.validUntil}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, validUntil: value }))
                  }
                  required
                />
                <SelectField
                  label="Status tarif"
                  value={tariffForm.status}
                  onChange={(value) =>
                    setTariffForm((current) => ({ ...current, status: value }))
                  }
                  options={['Aktif', 'Terjadwal', 'Nonaktif'].map((value) => ({
                    value,
                    label: value,
                  }))}
                />

                <div className="flex flex-wrap items-end gap-2">
                  <button
                    type="submit"
                    disabled={!canCreate}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Simpan tarif
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTariffForm(false)}
                    className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </SectionCard>
          )}
        </div>
      )}

      {/* TAB 3: TRANSAKSI */}
      {activeTab === 'transactions' && (
        <div
          id="payment-panel-transactions"
          role="tabpanel"
          aria-labelledby="payment-tab-transactions"
        >
          <SectionCard
            title="Riwayat transaksi"
            description="Bukti transfer tidak otomatis mengubah status tagihan. Verifikasi dilakukan petugas berwenang."
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin">
                  <tr>
                    <th className="px-4 py-3">Nomor transaksi</th>
                    <th className="px-4 py-3">Invoice</th>
                    <th className="px-4 py-3">Nama anak</th>
                    <th className="px-4 py-3">Nominal invoice</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-super-admin">
                  {recordedTransactions.length ? (
                    recordedTransactions.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-4 py-3 font-semibold">
                          {invoice.transactionId}
                        </td>
                        <td className="px-4 py-3">{invoice.id}</td>
                        <td className="px-4 py-3">{invoice.childName}</td>
                        <td className="px-4 py-3">{formatRupiah(invoice.amount)}</td>
                        <td className="px-4 py-3">{invoice.method}</td>
                        <td className="px-4 py-3">
                          <StatusPill>{invoice.status}</StatusPill>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-muted-super-admin"
                      >
                        Belum ada transaksi pembayaran yang tercatat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {(workspace.paymentHistory ?? []).length > 0 && (
              <ol className="divide-y divide-border-super-admin border-t border-border-super-admin">
                {workspace.paymentHistory
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <li
                      key={`${item.date}-${index}`}
                      className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-sm">{item.label}</span>
                      <time className="text-xs text-muted-super-admin">{item.date}</time>
                    </li>
                  ))}
              </ol>
            )}
          </SectionCard>
        </div>
      )}

      {/* TAB 4: TRANSAKSI BERMASALAH */}
      {activeTab === 'issues' && (
        <div
          id="payment-panel-issues"
          role="tabpanel"
          aria-labelledby="payment-tab-issues"
        >
          <SectionCard
            title="Pemantauan transaksi bermasalah"
            description="Catat tindak lanjut tanpa menghapus atau mengubah transaksi sumber."
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-surface-muted-super-admin text-xs text-muted-super-admin">
                  <tr>
                    <th className="px-4 py-3">Invoice / transaksi</th>
                    <th className="px-4 py-3">Nama anak</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Status pembayaran</th>
                    <th className="px-4 py-3">Tindak lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-super-admin">
                  {issueInvoices.length ? (
                    issueInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-4 py-3">
                          <p className="font-semibold">{invoice.id}</p>
                          <p className="mt-1 text-xs text-muted-super-admin">
                            {invoice.transactionId || 'Belum ada ID transaksi'}
                          </p>
                        </td>
                        <td className="px-4 py-3">{invoice.childName}</td>
                        <td className="px-4 py-3">{formatRupiah(invoice.amount)}</td>
                        <td className="px-4 py-3">
                          <StatusPill>{invoice.status}</StatusPill>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {invoice.issueNote ? (
                              <span className="max-w-xs text-xs text-muted-super-admin">
                                {invoice.issueNote}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-super-admin">
                                Belum ada catatan
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => openInvoiceDetail(invoice)}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin px-3 text-xs font-semibold hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                            >
                              <CircleAlert className="h-4 w-4" aria-hidden="true" />
                              Tangani
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-muted-super-admin"
                      >
                        Tidak ada transaksi bermasalah saat ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {/* MODAL: TERBITKAN TAGIHAN */}
      {showInvoiceForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-super-admin/40 p-3 sm:p-6">
          <button
            type="button"
            onClick={() => setShowInvoiceForm(false)}
            className="absolute inset-0"
            aria-label="Tutup form tagihan"
          />
          <section
            ref={invoiceFormRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-form-title"
            className="relative z-10 max-h-full w-full max-w-xl overflow-y-auto rounded-xl border border-border-super-admin bg-white p-5 shadow-xl"
          >
            <header className="mb-4 flex items-start justify-between">
              <div>
                <h2 id="invoice-form-title" className="text-lg font-bold">
                  Terbitkan tagihan
                </h2>
                <p className="mt-1 text-sm text-muted-super-admin">
                  Nominal akan disalin dari tarif aktif dan disimpan pada invoice ini.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInvoiceForm(false)}
                aria-label="Tutup"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={createInvoice} className="space-y-4">
              <SelectField
                label="Pendaftar"
                value={invoiceForm.applicationId}
                onChange={(value) =>
                  setInvoiceForm((current) => ({ ...current, applicationId: value }))
                }
                options={workspace.applications.map((application) => ({
                  value: application.id,
                  label: `${application.id} · ${application.childName}`,
                }))}
              />

              <SelectField
                label="Tarif"
                value={invoiceForm.tariffId}
                onChange={(value) =>
                  setInvoiceForm((current) => ({ ...current, tariffId: value }))
                }
                options={activeTariffs.map((tariff) => ({
                  value: tariff.id,
                  label: `${tariff.type} · ${formatRupiah(tariff.amount)} / ${tariff.scope}`,
                }))}
              />

              <p className="rounded-lg bg-surface-muted-super-admin p-3 text-sm">
                Nominal snapshot: <strong>{formatRupiah(selectedTariff?.amount)}</strong>
              </p>

              <InputField
                label="Jatuh tempo"
                type="date"
                value={invoiceForm.dueDate}
                onChange={(value) =>
                  setInvoiceForm((current) => ({ ...current, dueDate: value }))
                }
                required
              />

              <SelectField
                label="Metode pembayaran"
                value={invoiceForm.method}
                onChange={(value) =>
                  setInvoiceForm((current) => ({ ...current, method: value }))
                }
                options={['Transfer bank', 'Virtual Account', 'Tunai'].map((value) => ({
                  value,
                  label: value,
                }))}
              />

              <div className="flex flex-wrap justify-end gap-2 border-t border-border-super-admin pt-4">
                <button
                  type="button"
                  onClick={() => setShowInvoiceForm(false)}
                  className="inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!canCreate || !selectedTariff}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                  Terbitkan
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* DRAWER: DETAIL TAGIHAN & VERIFIKASI MANUAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex justify-end bg-overlay-super-admin/40">
          <button
            type="button"
            onClick={() => setSelectedInvoiceId('')}
            aria-label="Tutup detail invoice"
            className="absolute inset-0"
          />
          <aside
            ref={invoiceDetailRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-detail-title"
            className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-border-super-admin p-5">
              <div>
                <p className="text-xs font-semibold text-primary-admin-institusi">
                  DETAIL TAGIHAN
                </p>
                <h2 id="invoice-detail-title" className="mt-1 text-lg font-bold">
                  {selectedInvoice.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoiceId('')}
                aria-label="Tutup detail"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <StatusPill>{selectedInvoice.status}</StatusPill>
              </div>

              <dl className="grid grid-cols-2 gap-3">
                {Object.entries({
                  'Nama anak': selectedInvoice.childName,
                  'Nomor pengajuan': selectedInvoice.applicationId,
                  'Jenis biaya': selectedInvoice.type,
                  'Cakupan tarif': selectedInvoice.scope,
                  'Nominal invoice': formatRupiah(selectedInvoice.amount),
                  'Jatuh tempo': selectedInvoice.dueDate,
                  Metode: selectedInvoice.method,
                  'Nomor transaksi': selectedInvoice.transactionId || 'Belum tercatat',
                }).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border-super-admin p-3"
                  >
                    <dt className="text-xs text-muted-super-admin">{label}</dt>
                    <dd className="mt-1 wrap-break-word text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>

              {selectedInvoice.status === 'Bermasalah' && (
                <div>
                  <label htmlFor="payment-issue-note" className="text-sm font-semibold">
                    Catatan penanganan
                  </label>
                  <textarea
                    id="payment-issue-note"
                    value={issueNote}
                    onChange={(event) => setIssueNote(event.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-[#818D9A] p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                    placeholder="Catat tindak lanjut yang dilakukan"
                  />
                  <button
                    type="button"
                    onClick={saveIssueNote}
                    disabled={!canVerify || !issueNote.trim()}
                    className="mt-2 inline-flex min-h-11 items-center rounded-lg border border-border-super-admin px-4 text-sm font-semibold disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                  >
                    Simpan catatan
                  </button>
                </div>
              )}

              {selectedInvoice.verifiedAt && (
                <p className="rounded-lg bg-success-surface p-3 text-sm text-success-foreground">
                  Diverifikasi manual: {selectedInvoice.verifiedAt}
                </p>
              )}
            </div>

            <footer className="border-t border-border-super-admin p-4">
              <button
                type="button"
                onClick={verifyManualPayment}
                disabled={
                  !canVerify ||
                  selectedInvoice.status !== 'Menunggu Verifikasi' ||
                  !selectedInvoice.transactionId
                }
                title={
                  !selectedInvoice.transactionId
                    ? 'Transaksi belum memiliki bukti untuk diverifikasi.'
                    : undefined
                }
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Verifikasi pembayaran manual
              </button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
}