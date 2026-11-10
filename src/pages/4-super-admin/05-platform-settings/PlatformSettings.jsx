// src/pages/super-admin/05-settings/PlatformSettings.jsx
import React, { useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import ModalConfirm from '../../../components/ui/ModalConfirm';

import TabGeneralSettings from './components/TabGeneralSettings';
import TabSecuritySettings from './components/TabSecuritySettings';
import TabIntegrationSettings from './components/TabIntegrationSettings';
import TabAuditLogPolicy from './components/TabAuditLogPolicy';

import { initialPlatformSettings } from '../../../data/platformSettingsData';
import { Lock, Settings, Shield, Server, Database, Save, RotateCcw } from 'lucide-react';

export default function PlatformSettings() {
  const [settings, setSettings] = useState(initialPlatformSettings);
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'security' | 'integrations' | 'audit'

  // State Modal Confirm
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Handler Perubahan State Settings
  const handleSettingChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Handler Simpan & Reset
  const handleConfirmSave = () => {
    setShowSaveModal(false);
    alert('Pengaturan platform berhasil diperbarui.');
  };

  const handleConfirmReset = () => {
    setSettings(initialPlatformSettings);
    setShowResetModal(false);
    alert('Pengaturan telah dikembalikan ke standar awal.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-ink-super-admin pb-12">
      
      {/* 1. Page Header */}
      <PageHeader
        code="SA-05 // SUPER ADMIN TKI"
        role="PENGATURAN PLATFORM"
        title="Pengaturan Platform"
        description="Konfigurasi parameter global, batasan keamanan, status integrasi service, dan kebijakan log platform SPMB."
      >
        <div className="self-start sm:self-auto shrink-0">
          <Badge variant="TERTANGGUHKAN" className="bg-surface-super-admin text-muted-super-admin border-border-super-admin px-3 py-1 text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>OTORITAS HIGH-PRIVILEGE</span>
          </Badge>
        </div>
      </PageHeader>

      {/* 3. Tab Navigasi Sub-Modul Pengaturan */}
      <div className="bg-surface-super-admin p-2 rounded-2xl border border-border-super-admin shadow-xs flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'bg-primary-super-admin text-on-emphasis-super-admin shadow-xs'
              : 'text-muted-super-admin hover:bg-surface-super-admin'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Umum &amp; Identitas</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-primary-super-admin text-on-emphasis-super-admin shadow-xs'
              : 'text-muted-super-admin hover:bg-surface-super-admin'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Keamanan &amp; Akses</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'integrations'
              ? 'bg-primary-super-admin text-on-emphasis-super-admin shadow-xs'
              : 'text-muted-super-admin hover:bg-surface-super-admin'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Integrasi &amp; Gateway</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-primary-super-admin text-on-emphasis-super-admin shadow-xs'
              : 'text-muted-super-admin hover:bg-surface-super-admin'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Kebijakan Audit Log</span>
        </button>
      </div>

      {/* 4. Area Konten Tab Aktif */}
      {activeTab === 'general' && (
        <TabGeneralSettings settings={settings.general} onChange={handleSettingChange} />
      )}

      {activeTab === 'security' && (
        <TabSecuritySettings settings={settings.security} onChange={handleSettingChange} />
      )}

      {activeTab === 'integrations' && (
        <TabIntegrationSettings
          integrations={settings.integrations}
          onRefreshHealth={() => alert('Menjalankan tes koneksi ke seluruh gateway integrasi...')}
        />
      )}

      {activeTab === 'audit' && (
        <TabAuditLogPolicy policies={settings.auditPolicies} onChange={handleSettingChange} />
      )}

      {/* 5. Bottom Action Bar (Simpan & Reset) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border-super-admin">
        <Button
          variant="ghost"
          size="md"
          onClick={() => setShowResetModal(true)}
          className="text-muted-super-admin hover:text-error-foreground flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kembalikan ke Default</span>
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowSaveModal(true)}
          className="bg-primary-super-admin hover:bg-primary-hover-super-admin text-on-emphasis-super-admin px-6 py-2.5 rounded-xl shadow-xs w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Pengaturan</span>
        </Button>
      </div>

      {/* Footer Disclaimer PRD SA-05 */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-muted-super-admin pt-2 gap-2">
        <span>SPMB · PRD v1.3 - SIMULASI</span>
        <span>Perubahan konfigurasi dicatat dalam Audit Log Sistem TKI.</span>
      </div>

      {/* Modal Konfirmasi Simpan */}
      <ModalConfirm
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleConfirmSave}
        title="Simpan Perubahan Pengaturan?"
        message="Anda akan menerapkan konfigurasi baru ke seluruh platform SPMB TKI. Pastikan parameter yang dimasukkan sudah benar."
        confirmText="Ya, Simpan Perubahan"
        cancelText="Batal"
        variant="primary"
      />

      {/* Modal Konfirmasi Reset */}
      <ModalConfirm
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
        title="Reset ke Pengaturan Standard?"
        message="Seluruh konfigurasi yang telah diubah akan dikembalikan ke nilai default pabrikan."
        confirmText="Ya, Reset Pengaturan"
        cancelText="Batal"
        variant="danger"
      />

    </div>
  );
}