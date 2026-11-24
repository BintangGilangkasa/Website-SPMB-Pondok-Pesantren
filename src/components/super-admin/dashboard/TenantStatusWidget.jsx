import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { mockDashboardData } from '../../../data/mockSuperAdminData';

export default function TenantStatusWidget({ breakdown, onViewTenants }) {
  const sourceBreakdown = breakdown || mockDashboardData?.tenantStatusBreakdown;
  const data = [
    { name: 'Aktif', value: sourceBreakdown?.aktif?.count || 0, color: 'var(--color-primary-super-admin)' },
    { name: 'Belum aktif', value: sourceBreakdown?.belumAktif?.count || 0, color: 'var(--color-secondary-super-admin)' },
    { name: 'Ditangguhkan', value: sourceBreakdown?.tertangguhkan?.count || 0, color: 'var(--color-warning)' },
  ];
  const totalTenants = data.reduce((total, item) => total + item.value, 0);

  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 shadow-xs sm:p-6" aria-labelledby="tenant-status-title">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <h3 id="tenant-status-title" className="text-base font-semibold text-ink-super-admin">Status tenant</h3>
          <p className="mt-1 text-xs text-muted-super-admin">Status operasional seluruh institusi</p>
        </div>
        {onViewTenants && (
          <button
            type="button"
            onClick={onViewTenants}
            className="min-h-11 shrink-0 rounded-md border border-border-super-admin bg-surface-super-admin px-3 text-[11px] font-semibold text-ink-super-admin transition-colors hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-super-admin"
          >
            Lihat ringkasan
          </button>
        )}
      </div>

      <div className="my-3 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value">
                {data.map((item) => <Cell key={item.name} fill={item.color} stroke="none" />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface-super-admin)',
                  borderRadius: '8px',
                  borderColor: 'var(--color-border-super-admin)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute text-center">
            <span className="block text-2xl font-bold text-ink-super-admin">{totalTenants}</span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-super-admin">Tenant</span>
          </div>
        </div>

        <ul className="w-full space-y-2">
          {data.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-xs">
              <span className="flex items-center gap-2 text-ink-super-admin">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                {item.name}
              </span>
              <span className="font-bold text-ink-super-admin">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-2 rounded-lg border border-info-border bg-info-surface p-3 text-xs leading-relaxed text-info-foreground">
        Tenant aktif dapat membuka offering penerimaan SPMB sesuai aturan rentang waktu.
      </p>
    </section>
  );
}
