import { Lock } from 'lucide-react';

function SummaryLinkButton({ children, onClick }) {
  if (!onClick) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 shrink-0 rounded-md border border-border-super-admin bg-surface-super-admin px-3 text-[11px] font-semibold text-ink-super-admin transition-colors hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-super-admin"
    >
      {children}
    </button>
  );
}

export default function HealthStatusWidget({
  healthList,
  incidents,
  transactionSummary,
  onViewIntegrations,
  onViewTransactions,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <section className="flex flex-col justify-between rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 shadow-xs lg:col-span-6 sm:p-6" aria-labelledby="integration-health-heading">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 id="integration-health-heading" className="text-base font-semibold text-ink-super-admin">Kesehatan integrasi</h3>
              <p className="mt-1 text-xs text-muted-super-admin">Pemantauan koneksi layanan platform</p>
            </div>
            <SummaryLinkButton onClick={onViewIntegrations}>Lihat ringkasan</SummaryLinkButton>
          </div>

          <ul className="space-y-4">
            {healthList.map((item) => {
              const isHealthy = item.status === 'Normal';

              return (
                <li key={item.name} className="flex items-start justify-between gap-3 border-b border-border-super-admin pb-3 last:border-none last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${isHealthy ? 'bg-success' : 'bg-warning'}`} aria-hidden="true" />
                      <h4 className="text-xs font-bold text-ink-super-admin">{item.name}</h4>
                    </div>
                    <p className="ml-4 mt-1 text-[11px] text-muted-super-admin">{item.desc}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    isHealthy ? 'bg-success-surface text-success-foreground' : 'bg-warning-surface text-warning-foreground'
                  }`}>
                    {item.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="space-y-6 lg:col-span-6">
        <section className="rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 shadow-xs sm:p-6" aria-labelledby="system-incidents-heading">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 id="system-incidents-heading" className="text-base font-semibold text-ink-super-admin">Informasi gangguan</h3>
              <p className="mt-1 text-xs text-muted-super-admin">Catatan kejadian dan pemeliharaan sistem</p>
            </div>
            <SummaryLinkButton onClick={onViewIntegrations}>Lihat ringkasan</SummaryLinkButton>
          </div>

          <ul className="space-y-3">
            {incidents.map((incident) => (
              <li key={incident.title} className="flex items-start gap-3 text-xs">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-sm ${incident.type === 'warning' ? 'bg-warning' : 'bg-success'}`} aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-ink-super-admin">{incident.title}</h4>
                  <p className="mt-1 leading-relaxed text-muted-super-admin">{incident.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 text-center shadow-xs sm:p-6" aria-labelledby="transaction-summary-heading">
          <h3 id="transaction-summary-heading" className="text-sm font-bold text-ink-super-admin">Ringkasan transaksi</h3>
          <p className="mb-4 mt-1 text-xs text-muted-super-admin">Pengawasan transaksi agregat</p>

          {!transactionSummary.hasPermission ? (
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-border-super-admin bg-surface-muted-super-admin text-muted-super-admin" aria-hidden="true">
                <Lock className="h-4 w-4" />
              </div>
              <h4 className="mb-1 text-xs font-bold text-ink-super-admin">Tidak ditampilkan</h4>
              <p className="mb-3 max-w-xs text-[11px] leading-relaxed text-muted-super-admin">{transactionSummary.message}</p>
              <SummaryLinkButton onClick={onViewTransactions}>Lihat ringkasan transaksi</SummaryLinkButton>
            </div>
          ) : (
            <p className="text-xs font-bold text-success-foreground">Akses pengawasan diberikan</p>
          )}
        </section>
      </div>
    </div>
  );
}
