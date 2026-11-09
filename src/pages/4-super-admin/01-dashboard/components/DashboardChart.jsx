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
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-sans">Trend Pengajuan</h3>
        <p className="text-[11px]  text-gray-500">Ringkasan pengajuan platform</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            
            {/* Sumbu X (Tanggal) & Sumbu Y */}
            <XAxis dataKey="date" fontSize={12} axisLine={false} tickLine={false} stroke="#9ca3af" />
            <YAxis axisLine={false} fontSize={12} tickLine={false} stroke="#9ca3af" />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#e5e7eb' }}
              cursor={{ fill: '#f3f4f6' }}
            />
            
            {/* Grafik Batang */}
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              radius={[6, 6, 0, 0]} 
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}