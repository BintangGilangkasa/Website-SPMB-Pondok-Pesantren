// src/pages/super-admin/03-users-access/components/UserDetailDrawer.jsx
import React from 'react';
import Drawer from '../../../../components/ui/Drawer';
import Badge from '../../../../components/ui/Badge';
import { UserCheck, Shield, KeyRound, Clock } from 'lucide-react';

export default function UserDetailDrawer({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={user.name}
      subtitle={`ID Pengguna: ${user.id}`}
    >
      {/* 1. Status & Role Info Box */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE5D8] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#8C7A6B] uppercase">Status Akun Global</span>
          <Badge variant={user.status === 'AKTIF' ? 'AKTIF' : 'danger'}>
            {user.status === 'AKTIF' ? '• Aktif' : '• Nonaktif'}
          </Badge>
        </div>

        <div className="border-t border-[#EAE2D5] pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-[#8C7A6B] block">Email Platform</span>
            <span className="font-semibold text-[#2B2118]">{user.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C7A6B] block">Tenant Terikat</span>
            <span className="font-semibold text-[#8C583C]">{user.tenant}</span>
          </div>
        </div>
      </div>

      {/* 2. Rincian Peran & Otorisasi SA-03 */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider border-b border-[#F5F0E8] pb-1">
          Hak Akses &amp; Otorisasi
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Peran Utama Platform:</span>
            <span className="font-bold text-[#2B2118]">{user.role}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Waktu Terdaftar:</span>
            <span className="font-medium text-[#2B2118]">{user.joinedAt}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5F0E8]">
            <span className="text-[#8C7A6B]">Aktivitas Terakhir:</span>
            <span className="font-medium text-[#2B2118]">{user.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* 3. Catatan Audit Aturan SA-03 */}
      <div className="bg-[#FAF4E8] border border-[#EFE2C8] rounded-xl p-3 text-[11px] text-[#8C6B2D] leading-relaxed space-y-1">
        <p className="font-bold">⚠️ Aturan SA-03 Hak Akses:</p>
        <p>
          Akun global tidak dibuat duplikat. Role platform terpisah dari role tenant, dan pengguna tidak diperbolehkan meningkatkan izin aksesnya sendiri secara mandiri.
        </p>
      </div>
    </Drawer>
  );
}