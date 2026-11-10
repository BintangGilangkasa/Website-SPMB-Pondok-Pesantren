// src/pages/super-admin/05-settings/components/TabAuditLogPolicy.jsx
import React from 'react';
import { Input } from '../../../../components/ui';

export default function TabAuditLogPolicy({ policies, onChange }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl p-6 border border-border-super-admin shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-serif font-bold text-ink-super-admin">
          Kebijakan Audit Log &amp; Arsip Data
        </h3>
        <p className="text-xs text-muted-super-admin mt-0.5">
          Konfigurasi penyimpanan jejak aktivitas sistem dan jadwal pengarsipan log.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Masa Retensi Log Sistem (Hari)"
          type="number"
          value={policies.logRetentionDays}
          onChange={(e) => onChange('auditPolicies', 'logRetentionDays', Number(e.target.value))}
        />
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-super-admin block">Tingkat Detail Logging</label>
          <select
            value={policies.detailLoggingLevel}
            onChange={(e) => onChange('auditPolicies', 'detailLoggingLevel', e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin font-semibold cursor-pointer"
          >
            <option value="EXTENSIVE">EXTENSIVE (Seluruh Aktivitas &amp; Payload API)</option>
            <option value="STANDARD">STANDARD (Aktivitas Penting &amp; Authentication)</option>
            <option value="MINIMAL">MINIMAL (Hanya Error &amp; Exception)</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-super-admin p-4 rounded-xl border border-border-super-admin space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-ink-super-admin">Pengarsipan Otomatis (Auto-Archive)</h4>
            <p className="text-[11px] text-muted-super-admin mt-0.5">
              Pindahkan log lama ke penyimpanan terkompresi secara berkala.
            </p>
          </div>
          <input
            type="checkbox"
            checked={policies.autoArchiveEnabled}
            onChange={(e) => onChange('auditPolicies', 'autoArchiveEnabled', e.target.checked)}
            className="w-4 h-4 accent-primary-super-admin cursor-pointer"
          />
        </div>
        <div className="text-[11px] text-muted-super-admin border-t border-border-super-admin pt-2 flex justify-between">
          <span>Format Ekspor Arsip: <strong>{policies.logExportFormat}</strong></span>
          <span>Pengarsipan Terakhir: <strong>{policies.lastArchivedDate}</strong></span>
        </div>
      </div>
    </div>
  );
}