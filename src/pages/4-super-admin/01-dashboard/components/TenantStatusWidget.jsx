import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Import fallback jika prop breakdown tidak di-pass dari parent
import { mockDashboardData } from '../../../../data/mockSuperAdminData';

export default function TenantStatusWidget({ breakdown }) {
  // Gunakan prop breakdown, atau fallback ke mockDashboardData jika breakdown bernilai undefined
  const sourceBreakdown = breakdown || mockDashboardData?.tenantBreakdown;

  // 1. Transformasi data ke format Array yang dibutuhkan Recharts
  const data = [
    { name: 'Aktif', value: sourceBreakdown?.aktif?.count || 0, color: 'var(--color-primary-super-admin)' },
    { name: 'Belum Aktif', value: sourceBreakdown?.belumAktif?.count || 0, color: 'var(--color-secondary-super-admin)' },
    { name: 'Tertangguhkan', value: sourceBreakdown?.tertangguhkan?.count || 0, color: 'var(--color-secondary-super-admin)' },
  ];

  // Hitung total tenant untuk di tengah Donut Chart
  const totalTenants = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-sm flex flex-col justify-between">
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-lg font-semibold text-ink-super-admin font-sans">Status Tenant</h3>
          <p className="text-[11px] text-muted-super-admin">Status aktif &amp; pengoperasian institusi tenant</p>
        </div>
        <button className="text-[11px] font-semibold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-3 py-1 rounded-md hover:bg-surface-accent-super-admin transition-colors cursor-pointer">
          Lihat Tenant →
        </button>
      </div>

      {/* Donut Chart & Legend Visual */}
      <div className="flex flex-col sm:flex-row items-center justify-between my-2 gap-15">
        {/* Container Donut Chart */}
        <div className="h-50 w-50 relative flex items-center justify-center shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-surface-super-admin)', borderRadius: '8px', borderColor: 'var(--color-border-super-admin)', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Angka Total di Tengah Donut */}
          <div className="absolute text-center pointer-events-none">
            <span className="block text-2xl font-bold text-ink-super-admin">{totalTenants}</span>
            <span className="block text-[10px] text-muted-super-admin font-medium uppercase tracking-wider">Tenant</span>
          </div>
        </div>

        {/* Breakdown Legend Custom */}
        <div className="w-full space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs font-semibold p-1.5 rounded-lg hover:bg-surface-super-admin transition-colors">
              <span className="text-ink-super-admin flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
              <span className="font-serif font-bold text-ink-super-admin">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Notice */}
      <div className="bg-info-surface border border-info-border rounded-xl p-3 text-[11px] text-info-foreground leading-relaxed mt-2">
        Tenant Aktif dapat membuka offering penerimaan SPMB sesuai aturan rentang waktu.
      </div>
    </div>
  );
}