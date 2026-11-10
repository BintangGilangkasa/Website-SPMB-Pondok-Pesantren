// src/pages/super-admin/04-transactions/components/TransactionListDrawer.jsx
import React from 'react';
import Drawer from '../../../../components/ui/Drawer';
import Badge from '../../../../components/ui/Badge';
import { Lock } from 'lucide-react';

export default function TransactionListDrawer({ isOpen, onClose, transactions }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Daftar Transaksi Agregat"
      subtitle="SA-04 Pengawasan Transaksi · Modus Baca-Saja (Read-Only)"
    >
      {/* Banner Restriksi Hak Akses SA-04 */}
      <div className="bg-surface-super-admin border border-warning-border rounded-xl p-3 text-[11px] text-warning-foreground leading-relaxed flex items-start gap-2">
        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Restriksi SA-04:</strong> Tidak ada tombol penanda PAID, pengubahan invoice, refund, atau upload bukti transfer. Data identitas santri disamarkan secara otomatis.
        </p>
      </div>

      {/* Tabel Rincian Invoice */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-ink-super-admin uppercase tracking-wider border-b border-border-super-admin pb-1">
          Histori Invoice Lintas Tenant
        </h4>

        <div className="space-y-3">
          {transactions.map((trx) => (
            <div key={trx.id} className="bg-surface-super-admin p-3.5 rounded-xl border border-border-super-admin space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-border-super-admin pb-2">
                <div>
                  <span className="font-bold text-ink-super-admin font-mono">{trx.id}</span>
                  <span className="text-[10px] text-muted-super-admin block font-mono">{trx.ref_no}</span>
                </div>
                <Badge variant={trx.status === 'PAID' ? 'AKTIF' : trx.status === 'PENDING' ? 'Perhatian' : 'TERTANGGUHKAN'}>
                  {trx.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-muted-super-admin block">Institusi / Tenant</span>
                  <span className="font-semibold text-ink-super-admin">{trx.tenant_name}</span>
                </div>
                <div>
                  <span className="text-muted-super-admin block">Nominal Biaya</span>
                  <span className="font-bold text-primary-super-admin">{trx.amount}</span>
                </div>
                <div>
                  <span className="text-muted-super-admin block">Jenis &amp; Metode</span>
                  <span className="font-medium text-ink-super-admin">{trx.fee_type} ({trx.method})</span>
                </div>
                <div>
                  <span className="text-muted-super-admin block">Waktu Transaksi</span>
                  <span className="text-muted-super-admin">{trx.timestamp}</span>
                </div>
              </div>

              <div className="bg-surface-super-admin p-2 rounded text-[10px] text-muted-super-admin">
                🔒 Info Pengaju: <span className="font-medium text-ink-super-admin">{trx.sanitized_info}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}