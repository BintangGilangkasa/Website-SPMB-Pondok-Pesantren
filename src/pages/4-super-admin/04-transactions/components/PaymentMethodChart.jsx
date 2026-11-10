// src/pages/super-admin/04-transactions/components/PaymentMethodChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const METHOD_DATA = [
  { method: 'VA Mandiri', nominal: 48500000, formatted: 'Rp 48,5 Jt' },
  { method: 'VA BCA', nominal: 34200000, formatted: 'Rp 34,2 Jt' },
  { method: 'QRIS / Instant', nominal: 22100000, formatted: 'Rp 22,1 Jt' },
  { method: 'Bank Transfer BSI', nominal: 15800000, formatted: 'Rp 15,8 Jt' },
  { method: 'VA BNI', nominal: 9400000, formatted: 'Rp 9,4 Jt' },
];

const CustomMethodTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-sidebar-super-admin text-on-emphasis-super-admin p-2.5 rounded-xl shadow-lg text-xs border border-sidebar-active-border-super-admin">
        <p className="font-bold text-sidebar-foreground-super-admin">{item.method}</p>
        <p className="text-sidebar-muted-super-admin mt-0.5">
          Volume Transaksi: <span className="font-bold text-primary-super-admin">{item.formatted}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentMethodChart() {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-base font-serif font-bold text-ink-super-admin">
          Volume per Metode Pembayaran
        </h3>
        <p className="text-[11px] text-muted-super-admin mt-0.5">
          Kanal pembayaran yang paling sering digunakan
        </p>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={METHOD_DATA}
            margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border-super-admin)" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-super-admin)', fontSize: 10 }}
              tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}M`}
            />
            <YAxis
              type="category"
              dataKey="method"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-ink-super-admin)', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip content={<CustomMethodTooltip />} cursor={{ fill: 'var(--color-surface-accent-super-admin)' }} />
            <Bar dataKey="nominal" fill="var(--color-primary-super-admin)" radius={[0, 6, 6, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}