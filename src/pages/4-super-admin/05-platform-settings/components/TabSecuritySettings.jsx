// src/pages/super-admin/05-settings/components/TabSecuritySettings.jsx
import React from 'react';
import { Input } from '../../../../components/ui';

export default function TabSecuritySettings({ settings, onChange }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-serif font-bold text-ink-super-admin">
          Kebijakan Keamanan &amp; Batas Akses
        </h3>
        <p className="text-xs text-muted-super-admin mt-0.5">
          Atur proteksi sesi login, pembatasan IP, dan Mode Pemeliharaan Platform.
        </p>
      </div>

      {/* Toggle Maintenance Mode */}
      <div className="bg-surface-super-admin border border-warning-border p-4 rounded-xl flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-ink-super-admin">Mode Pemeliharaan Sistem (Maintenance Mode)</h4>
          <p className="text-[11px] text-warning-foreground mt-0.5">
            Aktifkan untuk memblokir sementara akses login publik &amp; Back Office Pesantren saat perbaikan infrastruktur.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange('security', 'maintenanceMode', !settings.maintenanceMode)}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            settings.maintenanceMode
              ? 'bg-error-foreground text-on-emphasis-super-admin'
              : 'bg-surface-super-admin border border-border-super-admin text-ink-super-admin'
          }`}
        >
          {settings.maintenanceMode ? 'Sistem Dibatasi (AKTIF)' : 'Sistem Normal (NONAKTIF)'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Batas Batas Waktu Sesi (Menit)"
          type="number"
          value={settings.sessionTimeoutMinutes}
          onChange={(e) => onChange('security', 'sessionTimeoutMinutes', Number(e.target.value))}
        />
        <Input
          label="Batas Percobaan Login Gagal"
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) => onChange('security', 'maxLoginAttempts', Number(e.target.value))}
        />
        <Input
          label="Masa Kadaluarsa Kata Sandi Admin (Hari)"
          type="number"
          value={settings.passwordExpiryDays}
          onChange={(e) => onChange('security', 'passwordExpiryDays', Number(e.target.value))}
        />
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-super-admin block">Autentikasi 2-Faktor (2FA)</label>
          <select
            value={settings.enforce2FAForAdmin ? 'Wajib' : 'Opsional'}
            onChange={(e) => onChange('security', 'enforce2FAForAdmin', e.target.value === 'Wajib')}
            className="w-full px-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin font-semibold cursor-pointer"
          >
            <option value="Wajib">Wajib Seluruh Admin TKI &amp; Pesantren</option>
            <option value="Opsional">Opsional</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-border-super-admin">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-muted-super-admin">Pembatasan IP (Whitelist IP Address)</label>
          <input
            type="checkbox"
            checked={settings.ipWhitelistEnabled}
            onChange={(e) => onChange('security', 'ipWhitelistEnabled', e.target.checked)}
            className="w-4 h-4 accent-primary-super-admin cursor-pointer"
          />
        </div>
        <Input
          placeholder="Contoh: 192.168.1.1, 10.0.0.1"
          value={settings.allowedIPs}
          disabled={!settings.ipWhitelistEnabled}
          onChange={(e) => onChange('security', 'allowedIPs', e.target.value)}
          className={!settings.ipWhitelistEnabled ? 'bg-surface-super-admin opacity-60' : ''}
        />
      </div>
    </div>
  );
}