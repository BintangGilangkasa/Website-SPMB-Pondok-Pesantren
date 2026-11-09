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
      <div className="bg-[#2B2118] text-white p-2.5 rounded-xl shadow-lg text-xs border border-[#4A3B2C] space-y-1">
        <p className="font-semibold text-[#E5DDD5]">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8C583C]" />
          <span className="text-[#D6CBB8]">Total Konfirmasi:</span>
          <span className="font-bold text-white">{item.value} Transaksi</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TransactionTrendChart({ data, timeRangeLabel }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header Chart */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-sans font-semibold text-[#2B2118]">
            Tren konfirmasi transaksi
          </h3>
          <p className="text-[11px] text-[#8C7A6B] mt-0.5">
            Aktivitas konfirmasi pembayaran agregat ({timeRangeLabel})
          </p>
        </div>
        <span className="text-[10px] font-bold text-[#8C583C] bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#E5DCCB]">
          Recharts Engine
        </span>
      </div>

      {/* Visualisasi Bar Chart Recharts */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE1" />
            <XAxis
              tick={{ fill: '#8C7A6B', fontSize: 11, fontWeight: 500 }}
              dataKey="date"
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C7A6B', fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#FAF6F0', opacity: 0.7 }} />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? '#6E422B' : '#8C583C'}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-[#A39485] text-center border-t border-[#F5F0E8] pt-3">
        Ilustrasi tren aktivitas teragregasi - bukan data produksi.
      </p>
    </div>
  );
}