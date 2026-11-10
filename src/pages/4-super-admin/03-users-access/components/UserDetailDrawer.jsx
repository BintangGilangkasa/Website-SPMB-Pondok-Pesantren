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
      <div className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted-super-admin uppercase">Status Akun Global</span>
          <Badge variant={user.status === 'AKTIF' ? 'AKTIF' : 'danger'}>
            {user.status === 'AKTIF' ? '• Aktif' : '• Nonaktif'}
          </Badge>
        </div>

        <div className="border-t border-border-super-admin pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-muted-super-admin block">Email Platform</span>
            <span className="font-semibold text-ink-super-admin">{user.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-super-admin block">Tenant Terikat</span>
            <span className="font-semibold text-primary-super-admin">{user.tenant}</span>
          </div>
        </div>
      </div>

      {/* 2. Rincian Peran & Otorisasi SA-03 */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-ink-super-admin uppercase tracking-wider border-b border-border-super-admin pb-1">
          Hak Akses &amp; Otorisasi
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Peran Utama Platform:</span>
            <span className="font-bold text-ink-super-admin">{user.role}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Waktu Terdaftar:</span>
            <span className="font-medium text-ink-super-admin">{user.joinedAt}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-super-admin">
            <span className="text-muted-super-admin">Aktivitas Terakhir:</span>
            <span className="font-medium text-ink-super-admin">{user.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* 3. Catatan Audit Aturan SA-03 */}
      <div className="bg-surface-super-admin border border-warning-border rounded-xl p-3 text-[11px] text-warning-foreground leading-relaxed space-y-1">
        <p className="font-bold">⚠️ Aturan SA-03 Hak Akses:</p>
        <p>
          Akun global tidak dibuat duplikat. Role platform terpisah dari role tenant, dan pengguna tidak diperbolehkan meningkatkan izin aksesnya sendiri secara mandiri.
        </p>
      </div>
    </Drawer>
  );
}