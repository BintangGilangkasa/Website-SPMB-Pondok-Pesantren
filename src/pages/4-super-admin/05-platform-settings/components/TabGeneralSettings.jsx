// src/pages/super-admin/05-settings/components/TabGeneralSettings.jsx
import React from 'react';
import { Input } from '../../../../components/ui';

export default function TabGeneralSettings({ settings, onChange }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-serif font-bold text-ink-super-admin">
          Identitas &amp; Informasi Platform
        </h3>
        <p className="text-xs text-muted-super-admin mt-0.5">
          Pengaturan identitas publik dan kontak dukungan sistem SPMB TKI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Nama Platform"
          value={settings.platformName}
          onChange={(e) => onChange('general', 'platformName', e.target.value)}
        />
        <Input
          label="Versi Platform"
          value={settings.platformVersion}
          disabled
          className="bg-surface-super-admin text-muted-super-admin"
        />
        <Input
          label="Email Dukungan Sistem"
          type="email"
          value={settings.supportEmail}
          onChange={(e) => onChange('general', 'supportEmail', e.target.value)}
        />
        <Input
          label="Pusat Bantuan / WhatsApp CS"
          value={settings.contactCenter}
          onChange={(e) => onChange('general', 'contactCenter', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-super-admin block">Zona Waktu Default</label>
          <select
            value={settings.defaultTimezone}
            onChange={(e) => onChange('general', 'defaultTimezone', e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin font-semibold cursor-pointer"
          >
            <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB)</option>
            <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA)</option>
            <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-super-admin block">Bahasa Default System</label>
          <select
            value={settings.defaultLanguage}
            onChange={(e) => onChange('general', 'defaultLanguage', e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin font-semibold cursor-pointer"
          >
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      <div className="space-y-1 pt-2">
        <label className="text-xs font-bold text-muted-super-admin block">Pengumuman Pemeliharaan Platform</label>
        <textarea
          rows={3}
          value={settings.systemNotice}
          onChange={(e) => onChange('general', 'systemNotice', e.target.value)}
          className="w-full p-3 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin"
        />
      </div>
    </div>
  );
}