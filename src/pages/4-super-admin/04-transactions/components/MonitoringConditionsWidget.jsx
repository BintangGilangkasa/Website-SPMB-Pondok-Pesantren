// src/pages/super-admin/04-transactions/components/MonitoringConditionsWidget.jsx
import React from 'react';
import Button from '../../../../components/ui/Button';

export default function MonitoringConditionsWidget({ onPendingClick, onIntegrationClick }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ECE5D8] shadow-xs space-y-4 flex flex-col justify-between h-full">
      <h3 className="text-base font-serif font-bold text-[#2B2118]">
        Kondisi yang perlu dipantau
      </h3>

      <div className="space-y-4">
        {/* Card 1: Konfirmasi Tertunda */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE5D8] space-y-3">
          <div>
            <h4 className="text-xs font-bold text-[#2B2118]">Konfirmasi tertunda</h4>
            <p className="text-[11px] text-[#8C7A6B] mt-0.5 leading-relaxed">
              Periksa perbedaan invoice PENDING dan percobaan PENDING.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onPendingClick}
            className="text-[11px] py-1.5 bg-white border-[#D6CBB8]"
          >
            Lihat transaksi pending
          </Button>
        </div>

        {/* Card 2: Integrasi Pembayaran */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE5D8] space-y-3">
          <div>
            <h4 className="text-xs font-bold text-[#2B2118]">Integrasi pembayaran</h4>
            <p className="text-[11px] text-[#8C7A6B] mt-0.5 leading-relaxed">
              Catatan event valid dan tidak valid hanya untuk observasi.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onIntegrationClick}
            className="text-[11px] py-1.5 bg-white border-[#D6CBB8]"
          >
            Lihat kendala integrasi
          </Button>
        </div>
      </div>

      <div className="text-[10px] text-[#9A8B7C] italic pt-1">
        Pemilik status pembayaran resmi tetap dipegang oleh unit Back Office Pesantren (BO-04).
      </div>
    </div>
  );
}