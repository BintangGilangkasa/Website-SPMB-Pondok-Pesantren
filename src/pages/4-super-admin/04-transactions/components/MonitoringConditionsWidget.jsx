// src/pages/super-admin/04-transactions/components/MonitoringConditionsWidget.jsx
import React from 'react';
import Button from '../../../../components/ui/Button';

export default function MonitoringConditionsWidget({ onPendingClick, onIntegrationClick }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs space-y-4 flex flex-col justify-between h-full">
      <h3 className="text-base font-serif font-bold text-ink-super-admin">
        Kondisi yang perlu dipantau
      </h3>

      <div className="space-y-4">
        {/* Card 1: Konfirmasi Tertunda */}
        <div className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
          <div>
            <h4 className="text-xs font-bold text-ink-super-admin">Konfirmasi tertunda</h4>
            <p className="text-[11px] text-muted-super-admin mt-0.5 leading-relaxed">
              Periksa perbedaan invoice PENDING dan percobaan PENDING.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onPendingClick}
            className="text-[11px] py-1.5 bg-surface-super-admin border-border-super-admin"
          >
            Lihat transaksi pending
          </Button>
        </div>

        {/* Card 2: Integrasi Pembayaran */}
        <div className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
          <div>
            <h4 className="text-xs font-bold text-ink-super-admin">Integrasi pembayaran</h4>
            <p className="text-[11px] text-muted-super-admin mt-0.5 leading-relaxed">
              Catatan event valid dan tidak valid hanya untuk observasi.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onIntegrationClick}
            className="text-[11px] py-1.5 bg-surface-super-admin border-border-super-admin"
          >
            Lihat kendala integrasi
          </Button>
        </div>
      </div>

      <div className="text-[10px] text-muted-super-admin italic pt-1">
        Pemilik status pembayaran resmi tetap dipegang oleh unit Back Office Pesantren (BO-04).
      </div>
    </div>
  );
}