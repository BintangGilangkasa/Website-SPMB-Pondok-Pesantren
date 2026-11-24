import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    AKTIF: 'bg-success-surface text-success-foreground border-success-border',
    Aktif: 'bg-success-surface text-success-foreground border-success-border',
    Normal: 'bg-success-surface text-success-foreground border-success-border',
    BELUM_AKTIF: 'bg-warning-surface text-warning-foreground border-warning-border',
    Perhatian: 'bg-warning-surface text-warning-foreground border-warning-border',
    TERTANGGUHKAN: 'bg-surface-accent-super-admin text-muted-super-admin border-border-super-admin',
    'Menunggu Verifikasi': 'bg-warning-surface text-warning-foreground border-warning-border',
    'Menunggu pemeriksaan': 'bg-warning-surface text-warning-foreground border-warning-border',
    'Belum diunggah': 'bg-surface-muted-super-admin text-muted-super-admin border-border-super-admin',
    'Menunggu Pembayaran': 'bg-warning-surface text-warning-foreground border-warning-border',
    'Menunggu Dokumen': 'bg-warning-surface text-warning-foreground border-warning-border',
    'Dalam Verifikasi': 'bg-info-surface text-info-foreground border-info-border',
    'Menunggu Keputusan': 'bg-info-surface text-info-foreground border-info-border',
    Terjadwal: 'bg-info-surface text-info-foreground border-info-border',
    Diumumkan: 'bg-info-surface text-info-foreground border-info-border',
    Ditangani: 'bg-info-surface text-info-foreground border-info-border',
    Terverifikasi: 'bg-success-surface text-success-foreground border-success-border',
    Lengkap: 'bg-success-surface text-success-foreground border-success-border',
    Lunas: 'bg-success-surface text-success-foreground border-success-border',
    Diterima: 'bg-success-surface text-success-foreground border-success-border',
    Selesai: 'bg-success-surface text-success-foreground border-success-border',
    'Perlu Koreksi': 'bg-error-surface text-error-foreground border-error-border',
    Bermasalah: 'bg-error-surface text-error-foreground border-error-border',
    'Tidak Diterima': 'bg-error-surface text-error-foreground border-error-border',
    'Ditolak Administrasi': 'bg-error-surface text-error-foreground border-error-border',
    danger: 'bg-error-surface text-error-foreground border-error-border',
    default: 'bg-surface-muted-super-admin text-muted-super-admin border-border-super-admin',
  };

  const activeStyle = variants[variant] || variants.default;

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${activeStyle} ${className}`}>
      {children}
    </span>
  );
}
