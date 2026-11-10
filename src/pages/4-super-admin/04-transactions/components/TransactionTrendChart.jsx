// src/pages/super-admin/04-transactions/components/TransactionTrendChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

// Custom Tooltip bergaya SPMB TKI
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-sidebar-super-admin text-on-emphasis-super-admin p-2.5 rounded-xl shadow-lg text-xs border border-sidebar-active-border-super-admin space-y-1">
        <p className="font-semibold text-sidebar-foreground-super-admin">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-super-admin" />
          <span className="text-sidebar-muted-super-admin">Total Konfirmasi:</span>
          <span className="font-bold text-on-emphasis-super-admin">{item.value} Transaksi</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TransactionTrendChart({ data, timeRangeLabel }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header Chart */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-sans font-semibold text-ink-super-admin">
            Tren konfirmasi transaksi
          </h3>
          <p className="text-[11px] text-muted-super-admin mt-0.5">
            Aktivitas konfirmasi pembayaran agregat ({timeRangeLabel})
          </p>
        </div>
      </div>

      {/* Visualisasi Bar Chart Recharts */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-super-admin)" />
            <XAxis
              tick={{ fill: 'var(--color-muted-super-admin)', fontSize: 11, fontWeight: 500 }}
              dataKey="date"
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-super-admin)', fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface-accent-super-admin)', opacity: 0.7 }} />
            <Bar
              dataKey="count"
              fill="var(--color-primary-super-admin)"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}