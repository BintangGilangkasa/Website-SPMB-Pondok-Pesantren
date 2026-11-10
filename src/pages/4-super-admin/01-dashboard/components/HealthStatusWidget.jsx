// src/pages/super-admin/01-dashboard/components/HealthStatusWidget.jsx
import React from 'react';
import { Lock } from 'lucide-react';

export default function HealthStatusWidget({ healthList, incidents, transactionSummary }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Kesehatan Integrasi (6 Kolom) */}
      <div className="lg:col-span-6 bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-sans font-semibold text-ink-super-admin">Kesehatan Integrasi</h3>
              <p className="text-[11px] text-muted-super-admin">Pemantauan koneksi integrasi platform</p>
            </div>
            <button className="text-[11px] font-semibold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-3 py-1 rounded-md hover:bg-surface-accent-super-admin transition-colors">
              Lihat Detail →
            </button>
          </div>

          <div className="space-y-4">
            {healthList.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-border-super-admin pb-3 last:border-none last:pb-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.status === 'Normal' ? 'bg-success' : 'bg-warning'}`}></span>
                    <h4 className="text-xs font-bold text-ink-super-admin">{item.name}</h4>
                  </div>
                  <p className="text-[10px] text-muted-super-admin mt-0.5 ml-4">{item.desc}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'Normal' ? 'bg-success-surface text-success-foreground' : 'bg-warning-surface text-warning-foreground'
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
        <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-ink-super-admin">Informasi Gangguan</h3>
              <p className="text-[11px] text-muted-super-admin">Catatan kejadian &amp; pemeliharaan sistem</p>
            </div>
            <button className="text-[11px] font-semibold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-3 py-1 rounded-md hover:bg-surface-accent-super-admin transition-colors">
              Lihat Rincian →
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map((incident, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className={`w-2 h-2 rounded-sm mt-1 shrink-0 ${incident.type === 'warning' ? 'bg-warning' : 'bg-success'}`}></span>
                <div>
                  <h5 className="font-bold text-ink-super-admin">{incident.title}</h5>
                  <p className="text-[11px] text-muted-super-admin leading-relaxed">{incident.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Ringkasan Transaksi (Izin Khusus / Restricted State) */}
        <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs text-center flex flex-col items-center justify-center min-h-40">
          <h3 className="text-sm font-serif font-bold text-ink-super-admin mb-1">Ringkasan Transaksi</h3>
          <p className="text-[11px] text-muted-super-admin mb-4">Pengawasan transaksi agregat</p>

          {!transactionSummary.hasPermission ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-surface-super-admin border border-border-super-admin flex items-center justify-center text-muted-super-admin mb-2">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-ink-super-admin mb-1">Tidak ditampilkan</h4>
              <p className="text-[11px] text-muted-super-admin max-w-xs mb-3 leading-relaxed">
                {transactionSummary.message}
              </p>
              <button className="text-[11px] font-bold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-4 py-1.5 rounded-lg hover:bg-surface-accent-super-admin transition-colors">
                Izin disesuaikan
              </button>
            </div>
          ) : (
            <div className="text-left w-full">
              {/* Tampilan jika memiliki permission */}
              <p className="text-xs text-success-foreground font-bold">✓ Akses Izin Pengawasan Diberikan</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}