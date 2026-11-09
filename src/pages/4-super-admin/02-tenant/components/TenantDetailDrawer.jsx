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
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE5D8] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#8C7A6B] uppercase">Status Institusi</span>
          <Badge variant={tenant.status}>
            {tenant.status === 'AKTIF' && '• Aktif'}
            {tenant.status === 'BELUM_AKTIF' && '• Belum Aktif'}
            {tenant.status === 'TERTANGGUHKAN' && '• Ditangguhkan'}
          </Badge>
        </div>

        <div className="border-t border-[#EAE2D5] pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-[#8C7A6B] block">URL Portal</span>
            <span className="font-mono text-[#8C583C] font-semibold">/{tenant.slug}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C7A6B] block">Zona Waktu</span>
            <span className="text-[#2B2118] font-semibold">{tenant.default_timezone}</span>
          </div>
        </div>
      </div>

      {/* 2. Kontak & Admin Awal (SA-02 MVP Field) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider border-b border-[#F5F0E8] pb-1">
          Kontak &amp; Admin Awal
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Email Kontak Resmi:</span>
            <span className="font-semibold text-[#2B2118]">{tenant.contact_email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Admin Awal:</span>
            <span className="font-semibold text-[#2B2118]">{tenant.admin_awal_name || 'Belum Ditentukan'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Email Admin Awal:</span>
            <span className="font-semibold text-[#2B2118]">{tenant.admin_awal_email || '-'}</span>
          </div>
        </div>
      </div>

      {/* 3. Audit History Perubahan Status (SA-02 Aturan Konfirmasi) */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider border-b border-[#F5F0E8] pb-1">
          Histori Perubahan Status
        </h4>

        <div className="space-y-3">
          {tenant.audit_history && tenant.audit_history.length > 0 ? (
            tenant.audit_history.map((log, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-[#ECE5D8] text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#8C7A6B]">
                  <span>{log.date}</span>
                  <span className="font-semibold text-[#4A3B2C]">Oleh: {log.by}</span>
                </div>
                <p className="font-bold text-[#2B2118]">
                  Status diubah ke <span className="text-[#8C583C]">{log.action}</span>
                </p>
                <p className="text-[11px] text-[#6E5A44] italic">"{log.reason}"</p>
              </div>
            ))
          ) : (
            <p className="text-[11px] text-[#8C7A6B] italic">Belum ada riwayat perubahan status.</p>
          )}
        </div>
      </div>

      {/* Warning Box SA-02 Aturan Pembatasan */}
      <div className="bg-[#FAF4E8] border border-[#EFE2C8] rounded-xl p-3 text-[11px] text-[#8C6B2D] leading-relaxed">
        <strong>Aturan SA-02:</strong> Super Admin hanya mengelola platform dan tenant. Pembuatan tenant tidak otomatis mempublikasikan offering atau menghapus riwayat transaksi.
      </div>
    </Drawer>
  );
}