import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { mockDashboardData } from '../../../data/mockSuperAdminData';

const ranges = [
  { id: '7', label: '7 hari' },
  { id: '30', label: '30 hari' },
  { id: '90', label: '90 hari' },
];

export default function DashboardChart({
  data = mockDashboardData.applicationTrends,
  dataByRange = mockDashboardData.applicationTrendsByPeriod,
}) {
  const [activeRange, setActiveRange] = useState('30');
  const chartData = dataByRange?.[activeRange] ?? data ?? [];

  return (
    <section className="w-full rounded-xl border border-border-super-admin bg-surface-super-admin p-4 shadow-xs sm:p-6" aria-labelledby="application-trend-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 id="application-trend-title" className="text-base font-semibold text-ink-super-admin">Tren pengajuan</h3>
          <p className="mt-1 text-xs text-muted-super-admin">Ringkasan jumlah pengajuan platform</p>
        </div>
        <div className="flex shrink-0 gap-1 rounded-lg border border-border-super-admin bg-surface-muted-super-admin p-1" role="group" aria-label="Periode tren pengajuan">
          {ranges.map((range) => {
            const isActive = activeRange === range.id;

            return (
              <button
                key={range.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveRange(range.id)}
                className={`min-h-11 rounded-md px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-super-admin ${
                  isActive
                    ? 'bg-surface-super-admin text-primary-super-admin shadow-xs'
                    : 'text-muted-super-admin hover:text-ink-super-admin'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-64 w-full min-w-0 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-super-admin)" />
              <XAxis
                dataKey="date"
                fontSize={11}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                stroke="var(--color-muted-super-admin)"
                minTickGap={8}
              />
              <YAxis axisLine={false} fontSize={11} tickLine={false} stroke="var(--color-muted-super-admin)" />
              <Tooltip
                formatter={(value) => [value, 'Pengajuan']}
                contentStyle={{
                  backgroundColor: 'var(--color-surface-super-admin)',
                  borderRadius: '8px',
                  borderColor: 'var(--color-border-super-admin)',
                  fontSize: '12px',
                }}
                cursor={{ fill: 'var(--color-surface-muted-super-admin)' }}
              />
              <Bar dataKey="count" fill="var(--color-primary-super-admin)" radius={[5, 5, 0, 0]} maxBarSize={42} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-muted-super-admin" role="status">
          Data tren belum tersedia untuk periode ini.
        </div>
      )}
    </section>
  );
}
