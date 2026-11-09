// src/pages/super-admin/03-users-access/components/InviteAdminModal.jsx
import React, { useState } from 'react';
import ModalConfirm from '../../../../components/ui/ModalConfirm';
import Input from '../../../../components/ui/Input';
import { Mail, Building2, ShieldCheck } from 'lucide-react';

export default function InviteAdminModal({ isOpen, onClose, onInviteSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    tenant: 'Pesantren Al-Falah',
    role: 'Admin Utama Pesantren',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (!formData.email) {
      setError('Email admin wajib diisi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onInviteSuccess(formData);
      setFormData({ email: '', tenant: 'Pesantren Al-Falah', role: 'Admin Utama Pesantren' });
      setError('');
      onClose();
    }, 500);
  };

  return (
    <ModalConfirm
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Undang Admin Awal Tenant"
      description="Kirimkan undangan email terverifikasi kepada calon admin utama tenant pesantren."
      confirmText="Kirim Undangan"
      cancelText="Batal"
      variant="primary"
      isLoading={isLoading}
    >
      <div className="space-y-3.5 text-left pt-2">
        <Input
          label="Email Terverifikasi Admin"
          name="email"
          type="email"
          placeholder="contoh: admin@pesantren.id"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (error) setError('');
          }}
          error={error}
          required
        />

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#4A3B2C]">Pilih Institusi / Tenant</label>
          <select
            value={formData.tenant}
            onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] rounded-lg text-[#2B2118] font-semibold focus:outline-none focus:ring-1 focus:ring-[#8B5E34]"
          >
            <option value="Pesantren Al-Falah">Pesantren Al-Falah</option>
            <option value="Pondok Pendidikan An-Nur">Pondok Pendidikan An-Nur</option>
            <option value="Pesantren Darul Hikmah">Pesantren Darul Hikmah</option>
            <option value="Pesantren Miftahul Ilmi">Pesantren Miftahul Ilmi</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#4A3B2C]">Role Platform / Delegasi</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] rounded-lg text-[#2B2118] font-semibold focus:outline-none focus:ring-1 focus:ring-[#8B5E34]"
          >
            <option value="Admin Utama Pesantren">Admin Utama Pesantren</option>
            <option value="Operator Platform">Operator Platform</option>
            <option value="Pengawas Transaksi">Pengawas Transaksi</option>
          </select>
        </div>
      </div>
    </ModalConfirm>
  );
}