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
  { name: 'PAID (Lunas)', value: 45, color: '#2E6F40' },
  { name: 'PENDING (Menunggu)', value: 30, color: '#D97706' },
  { name: 'UNPAID (Belum Lunas)', value: 25, color: '#B91C1C' },
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-[#2B2118] text-white p-2.5 rounded-xl shadow-lg text-xs border border-[#4A3B2C]">
        <p className="font-bold" style={{ color: item.payload.color }}>
          {item.name}
        </p>
        <p className="text-[#D6CBB8] mt-0.5 font-mono">
          {item.value}% dari Total Invoice
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentStatusPieChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-base font-serif font-bold text-[#2B2118]">
          Komposisi Status Invoice
        </h3>
        <p className="text-[11px] text-[#8C7A6B] mt-0.5">
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
                <span className="text-[11px] font-semibold text-[#4A3B2C] ml-1">
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