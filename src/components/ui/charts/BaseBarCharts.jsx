// src/components/ui/charts/BaseBarChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function BaseBarChart({
  data = [],
  xAxisKey = 'date',
  dataKey = 'count',
  barColor = 'var(--color-primary-super-admin)', // Tailwind Primary Blue
  height = 280,
  barSize = 32,
  unit = ''
}) {
  const chartData = Array.isArray(data) ? data : [];

  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-super-admin)" />
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            stroke="var(--color-muted-super-admin)" 
            fontSize={12} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            stroke="var(--color-muted-super-admin)" 
            fontSize={12} 
          />
          <Tooltip
            formatter={(value) => [`${value.toLocaleString('id-ID')} ${unit}`, 'Jumlah']}
            contentStyle={{ 
              backgroundColor: 'var(--color-surface-super-admin)', 
              borderRadius: '8px', 
              borderColor: 'var(--color-border-super-admin)', 
              fontSize: '12px',
              boxShadow: '0 2px 4px var(--color-border-subtle-super-admin)'
            }}
            cursor={{ fill: 'var(--color-surface-muted-super-admin)' }}
          />
          <Bar 
            dataKey={dataKey} 
            fill={barColor} 
            radius={[6, 6, 0, 0]} 
            barSize={barSize} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}