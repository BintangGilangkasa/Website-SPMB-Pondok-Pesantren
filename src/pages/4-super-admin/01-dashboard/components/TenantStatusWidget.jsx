import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Import fallback jika prop breakdown tidak di-pass dari parent
import { mockDashboardData } from '../../../../data/mockSuperAdminData';

export default function TenantStatusWidget({ breakdown }) {
  // Gunakan prop breakdown, atau fallback ke mockDashboardData jika breakdown bernilai undefined
  const sourceBreakdown = breakdown || mockDashboardData?.tenantBreakdown;

  // 1. Transformasi data ke format Array yang dibutuhkan Recharts
  const data = [
    { name: 'Aktif', value: sourceBreakdown?.aktif?.count || 0, color: '#0284C7' },
    { name: 'Belum Aktif', value: sourceBreakdown?.belumAktif?.count || 0, color: '#0EA5E9' },
    { name: 'Tertangguhkan', value: sourceBreakdown?.tertangguhkan?.count || 0, color: '#38BDF8' },
  ];

  // Hitung total tenant untuk di tengah Donut Chart
  const totalTenants = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-lg font-semibold text-gray-800 font-sans">Status Tenant</h3>
          <p className="text-[11px] text-[#8C7A6B]">Status aktif &amp; pengoperasian institusi tenant</p>
        </div>
        <button className="text-[11px] font-semibold text-[#3A2E2B] border border-[#E0D7C6] bg-[#FAF8F5] px-3 py-1 rounded-md hover:bg-[#F2ECE1] transition-colors cursor-pointer">
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
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#ECE5D8', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Angka Total di Tengah Donut */}
          <div className="absolute text-center pointer-events-none">
            <span className="block text-2xl font-bold text-[#2B2118]">{totalTenants}</span>
            <span className="block text-[10px] text-[#8C7A6B] font-medium uppercase tracking-wider">Tenant</span>
          </div>
        </div>

        {/* Breakdown Legend Custom */}
        <div className="w-full space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs font-semibold p-1.5 rounded-lg hover:bg-[#FAF8F5] transition-colors">
              <span className="text-[#3A2E2B] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
              <span className="font-serif font-bold text-[#2B2118]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Notice */}
      <div className="bg-[#EBF3FA] border border-[#D0E2F2] rounded-xl p-3 text-[11px] text-[#2C5282] leading-relaxed mt-2">
        Tenant Aktif dapat membuka offering penerimaan SPMB sesuai aturan rentang waktu.
      </div>
    </div>
  );
}