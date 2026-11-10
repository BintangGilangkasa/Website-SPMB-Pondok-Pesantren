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

// Import data sesuai nama export di mockSuperAdminData.js
import { mockDashboardData } from '../../../../data/mockSuperAdminData';

export default function DashboardChart() {
  // Mengambil array 'applicationTrends'
  const chartData = Array.isArray(mockDashboardData?.applicationTrends)
    ? mockDashboardData.applicationTrends
    : [];

  return (
    <div className="w-full bg-surface-super-admin p-6 rounded-xl shadow-sm border border-border-super-admin">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-ink-super-admin font-sans">Trend Pengajuan</h3>
        <p className="text-[11px]  text-muted-super-admin">Ringkasan pengajuan platform</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-super-admin)" />
            
            {/* Sumbu X (Tanggal) & Sumbu Y */}
            <XAxis dataKey="date" fontSize={12} axisLine={false} tickLine={false} stroke="var(--color-muted-super-admin)" />
            <YAxis axisLine={false} fontSize={12} tickLine={false} stroke="var(--color-muted-super-admin)" />
            
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--color-surface-super-admin)', borderRadius: '8px', borderColor: 'var(--color-border-super-admin)' }}
              cursor={{ fill: 'var(--color-surface-muted-super-admin)' }}
            />
            
            {/* Grafik Batang */}
            <Bar 
              dataKey="count" 
              fill="var(--color-primary-super-admin)" 
              radius={[6, 6, 0, 0]} 
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}