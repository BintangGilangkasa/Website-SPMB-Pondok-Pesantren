// src/pages/super-admin/04-transactions/components/PaymentStatusPieChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const STATUS_DATA = [
  { name: 'PAID (Lunas)', value: 45, color: 'var(--color-success)' },
  { name: 'PENDING (Menunggu)', value: 30, color: 'var(--color-warning-foreground)' },
  { name: 'UNPAID (Belum Lunas)', value: 25, color: 'var(--color-error-foreground)' },
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-sidebar-super-admin text-on-emphasis-super-admin p-2.5 rounded-xl shadow-lg text-xs border border-sidebar-active-border-super-admin">
        <p className="font-bold" style={{ color: item.payload.color }}>
          {item.name}
        </p>
        <p className="text-sidebar-muted-super-admin mt-0.5 font-mono">
          {item.value}% dari Total Invoice
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentStatusPieChart() {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-base font-serif font-bold text-ink-super-admin">
          Komposisi Status Invoice
        </h3>
        <p className="text-[11px] text-muted-super-admin mt-0.5">
          Distribusi kesehatan pembayaran seluruh tenant
        </p>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={STATUS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {STATUS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-[11px] font-semibold text-ink-super-admin ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}