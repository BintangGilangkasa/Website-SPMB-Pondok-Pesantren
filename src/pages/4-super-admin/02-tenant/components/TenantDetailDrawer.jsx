// src/pages/super-admin/02-tenant/components/TenantDetailDrawer.jsx
import React from 'react';
import Drawer from '../../../../components/ui/Drawer';
import Badge from '../../../../components/ui/Badge';

export default function TenantDetailDrawer({ isOpen, onClose, tenant }) {
  if (!tenant) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={tenant.name}
      subtitle={`Kode Tenant: ${tenant.code}`}
    >
      {/* 1. Informasi Status & Slug */}
      <div className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted-super-admin uppercase">Status Institusi</span>
          <Badge variant={tenant.status}>
            {tenant.status === 'AKTIF' && '• Aktif'}
            {tenant.status === 'BELUM_AKTIF' && '• Belum Aktif'}
            {tenant.status === 'TERTANGGUHKAN' && '• Ditangguhkan'}
          </Badge>
        </div>

        <div className="border-t border-border-super-admin pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-muted-super-admin block">URL Portal</span>
            <span className="font-mono text-primary-super-admin font-semibold">/{tenant.slug}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-super-admin block">Zona Waktu</span>
            <span className="text-ink-super-admin font-semibold">{tenant.default_timezone}</span>
          </div>
        </div>
      </div>

      {/* 2. Kontak & Admin Awal (SA-02 MVP Field) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-ink-super-admin uppercase tracking-wider border-b border-border-super-admin pb-1">
          Kontak &amp; Admin Awal
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Email Kontak Resmi:</span>
            <span className="font-semibold text-ink-super-admin">{tenant.contact_email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Admin Awal:</span>
            <span className="font-semibold text-ink-super-admin">{tenant.admin_awal_name || 'Belum Ditentukan'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Email Admin Awal:</span>
            <span className="font-semibold text-ink-super-admin">{tenant.admin_awal_email || '-'}</span>
          </div>
        </div>
      </div>

      {/* 3. Audit History Perubahan Status (SA-02 Aturan Konfirmasi) */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-ink-super-admin uppercase tracking-wider border-b border-border-super-admin pb-1">
          Histori Perubahan Status
        </h4>

        <div className="space-y-3">
          {tenant.audit_history && tenant.audit_history.length > 0 ? (
            tenant.audit_history.map((log, idx) => (
              <div key={idx} className="bg-surface-super-admin p-3 rounded-xl border border-border-super-admin text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-super-admin">
                  <span>{log.date}</span>
                  <span className="font-semibold text-ink-super-admin">Oleh: {log.by}</span>
                </div>
                <p className="font-bold text-ink-super-admin">
                  Status diubah ke <span className="text-primary-super-admin">{log.action}</span>
                </p>
                <p className="text-[11px] text-muted-super-admin italic">"{log.reason}"</p>
              </div>
            ))
          ) : (
            <p className="text-[11px] text-muted-super-admin italic">Belum ada riwayat perubahan status.</p>
          )}
        </div>
      </div>

      {/* Warning Box SA-02 Aturan Pembatasan */}
      <div className="bg-surface-super-admin border border-warning-border rounded-xl p-3 text-[11px] text-warning-foreground leading-relaxed">
        <strong>Aturan SA-02:</strong> Super Admin hanya mengelola platform dan tenant. Pembuatan tenant tidak otomatis mempublikasikan offering atau menghapus riwayat transaksi.
      </div>
    </Drawer>
  );
}