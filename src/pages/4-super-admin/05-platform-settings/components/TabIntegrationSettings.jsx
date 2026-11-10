// src/pages/super-admin/05-settings/components/TabIntegrationSettings.jsx
import React from 'react';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

export default function TabIntegrationSettings({ integrations, onRefreshHealth }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-serif font-bold text-ink-super-admin">
            Status Service &amp; Gateway Integrasi
          </h3>
          <p className="text-xs text-muted-super-admin mt-0.5">
            Pemantauan koneksi gateway pembayaran, WhatsApp, SMTP, dan penyimpanan cloud.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefreshHealth}
          className="text-xs bg-surface-super-admin border-border-super-admin"
        >
          Tes Ulang Koneksi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.id} className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
            <div className="flex items-start justify-between border-b border-border-super-admin pb-2">
              <div>
                <h4 className="text-xs font-bold text-ink-super-admin">{item.name}</h4>
                <span className="text-[10px] text-muted-super-admin block">{item.provider}</span>
              </div>
              <Badge variant={item.status === 'TERHUBUNG' ? 'AKTIF' : 'Perhatian'}>
                {item.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-muted-super-admin block">Lingkungan (Environment)</span>
                <span className="font-semibold text-ink-super-admin">{item.environment}</span>
              </div>
              <div>
                <span className="text-muted-super-admin block">Versi API</span>
                <span className="font-semibold text-ink-super-admin font-mono">{item.apiVersion}</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-super-admin pt-1">
              Pengecekan Terakhir: <span className="font-semibold">{item.lastHealthCheck}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}