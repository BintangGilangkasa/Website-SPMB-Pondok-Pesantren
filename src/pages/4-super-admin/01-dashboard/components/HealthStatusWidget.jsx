// src/pages/super-admin/01-dashboard/components/HealthStatusWidget.jsx
import React from 'react';

export default function HealthStatusWidget({ healthList, incidents, transactionSummary }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Kesehatan Integrasi (6 Kolom) */}
      <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2B2118]">Kesehatan Integrasi</h3>
              <p className="text-[11px] text-[#8C7A6B]">Pemantauan koneksi integrasi platform</p>
            </div>
            <button className="text-[11px] font-semibold text-[#3A2E2B] border border-[#E0D7C6] bg-[#FAF8F5] px-3 py-1 rounded-md hover:bg-[#F2ECE1] transition-colors">
              Lihat Detail →
            </button>
          </div>

          <div className="space-y-4">
            {healthList.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-[#F5F0E8] pb-3 last:border-none last:pb-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.status === 'Normal' ? 'bg-[#2D5A3C]' : 'bg-[#D97706]'}`}></span>
                    <h4 className="text-xs font-bold text-[#3A2E2B]">{item.name}</h4>
                  </div>
                  <p className="text-[10px] text-[#9A8B7C] mt-0.5 ml-4">{item.desc}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'Normal' ? 'bg-[#E2F0E6] text-[#2D5A3C]' : 'bg-[#FEF3C7] text-[#D97706]'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Informasi Gangguan & Ringkasan Transaksi (6 Kolom) */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Card Informasi Gangguan */}
        <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2B2118]">Informasi Gangguan</h3>
              <p className="text-[11px] text-[#8C7A6B]">Catatan kejadian &amp; pemeliharaan sistem</p>
            </div>
            <button className="text-[11px] font-semibold text-[#3A2E2B] border border-[#E0D7C6] bg-[#FAF8F5] px-3 py-1 rounded-md hover:bg-[#F2ECE1] transition-colors">
              Lihat Rincian →
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map((incident, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className={`w-2 h-2 rounded-sm mt-1 shrink-0 ${incident.type === 'warning' ? 'bg-[#D97706]' : 'bg-[#2D5A3C]'}`}></span>
                <div>
                  <h5 className="font-bold text-[#3A2E2B]">{incident.title}</h5>
                  <p className="text-[11px] text-[#8C7A6B] leading-relaxed">{incident.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Ringkasan Transaksi (Izin Khusus / Restricted State) */}
        <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs text-center flex flex-col items-center justify-center min-h-40">
          <h3 className="text-sm font-serif font-bold text-[#2B2118] mb-1">Ringkasan Transaksi</h3>
          <p className="text-[11px] text-[#8C7A6B] mb-4">Pengawasan transaksi agregat</p>

          {!transactionSummary.hasPermission ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#EAE2D5] flex items-center justify-center text-[#9A8B7C] mb-2">
                🔒
              </div>
              <h4 className="text-xs font-bold text-[#3A2E2B] mb-1">Tidak ditampilkan</h4>
              <p className="text-[11px] text-[#9A8B7C] max-w-xs mb-3 leading-relaxed">
                {transactionSummary.message}
              </p>
              <button className="text-[11px] font-bold text-[#3A2E2B] border border-[#D6CBB8] bg-[#FAF8F5] px-4 py-1.5 rounded-lg hover:bg-[#F0E6D6] transition-colors">
                Izin disesuaikan
              </button>
            </div>
          ) : (
            <div className="text-left w-full">
              {/* Tampilan jika memiliki permission */}
              <p className="text-xs text-[#2D5A3C] font-bold">✓ Akses Izin Pengawasan Diberikan</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}