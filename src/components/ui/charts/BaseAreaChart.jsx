// src/components/ui/charts/BaseAreaChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function BaseAreaChart({
  data = [],
  xAxisKey = 'date',
  dataKey = 'amount',
  color = 'var(--color-primary-super-admin)',
  height = 280,
  unit = ''
}) {
  const chartData = Array.isArray(data) ? data : [];

  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-super-admin)" />
          <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} stroke="var(--color-muted-super-admin)" fontSize={12} />
          <YAxis axisLine={false} tickLine={false} stroke="var(--color-muted-super-admin)" fontSize={12} />
          <Tooltip
            formatter={(value) => [`${value.toLocaleString('id-ID')} ${unit}`, 'Nilai']}
            contentStyle={{ backgroundColor: 'var(--color-surface-super-admin)', borderRadius: '8px', borderColor: 'var(--color-border-super-admin)', fontSize: '12px' }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#gradient-${dataKey})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}