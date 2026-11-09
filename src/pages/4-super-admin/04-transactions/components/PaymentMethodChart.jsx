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
      <div className="bg-[#2B2118] text-white p-2.5 rounded-xl shadow-lg text-xs border border-[#4A3B2C]">
        <p className="font-bold text-[#E5DDD5]">{item.method}</p>
        <p className="text-[#D6CBB8] mt-0.5">
          Volume Transaksi: <span className="font-bold text-[#8C583C]">{item.formatted}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentMethodChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-base font-serif font-bold text-[#2B2118]">
          Volume per Metode Pembayaran
        </h3>
        <p className="text-[11px] text-[#8C7A6B] mt-0.5">
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
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0EBE1" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C7A6B', fontSize: 10 }}
              tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}M`}
            />
            <YAxis
              type="category"
              dataKey="method"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4A3B2C', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip content={<CustomMethodTooltip />} cursor={{ fill: '#FAF6F0' }} />
            <Bar dataKey="nominal" fill="#8C583C" radius={[0, 6, 6, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}