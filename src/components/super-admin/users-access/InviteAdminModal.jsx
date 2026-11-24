import React, { useState } from 'react';
import { Input, ModalConfirm, Select } from '@/components/ui';

export default function InviteAdminModal({ isOpen, onClose, onInviteSuccess, existingUsers = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tenant: 'Pesantren Al-Falah',
    role: 'Admin Utama Pesantren',
  });
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (!formData.name.trim()) {
      setError('Nama profil wajib diisi.');
      setErrorField('name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email admin wajib diisi.');
      setErrorField('email');
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Masukkan alamat email yang valid.');
      setErrorField('email');
      return;
    }

    if (existingUsers.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      setError('Email tersebut sudah memiliki profil.');
      setErrorField('email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onInviteSuccess({ ...formData, name: formData.name.trim(), email: normalizedEmail });
      setFormData({ name: '', email: '', tenant: 'Pesantren Al-Falah', role: 'Admin Utama Pesantren' });
      setError('');
      setErrorField('');
      onClose();
    }, 500);
  };

  return (
    <ModalConfirm
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Tambah Profil Admin"
      description="Tambahkan profil admin dan tetapkan tenant serta perannya."
      confirmText="Tambah Profil"
      cancelText="Batal"
      variant="primary"
      isLoading={isLoading}
    >
      <div className="space-y-3.5 text-left pt-2">
        <Input
          label="Nama profil"
          name="name"
          placeholder="Nama lengkap admin"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errorField === 'name') {
              setError('');
              setErrorField('');
            }
          }}
          error={errorField === 'name' ? error : ''}
          required
        />

        <Input
          label="Email Terverifikasi Admin"
          name="email"
          type="email"
          placeholder="contoh: admin@pesantren.id"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errorField === 'email') {
              setError('');
              setErrorField('');
            }
          }}
          error={errorField === 'email' ? error : ''}
          required
        />

        <div className="space-y-1">
          <label className="text-xs font-bold text-ink-super-admin">Pilih Institusi / Tenant</label>
          <Select
            variant="unstyled"
            value={formData.tenant}
            onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-lg text-ink-super-admin font-semibold focus:outline-none focus:ring-1 focus:ring-primary-super-admin"
          >
            <option value="Pesantren Al-Falah">Pesantren Al-Falah</option>
            <option value="Pondok Pendidikan An-Nur">Pondok Pendidikan An-Nur</option>
            <option value="Pesantren Darul Hikmah">Pesantren Darul Hikmah</option>
            <option value="Pesantren Miftahul Ilmi">Pesantren Miftahul Ilmi</option>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-ink-super-admin">Role Platform / Delegasi</label>
          <Select
            variant="unstyled"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-lg text-ink-super-admin font-semibold focus:outline-none focus:ring-1 focus:ring-primary-super-admin"
          >
            <option value="Admin Utama Pesantren">Admin Utama Pesantren</option>
            <option value="Operator Platform">Operator Platform</option>
            <option value="Pengawas Transaksi">Pengawas Transaksi</option>
          </Select>
        </div>
      </div>
    </ModalConfirm>
  );
}
