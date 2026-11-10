// src/components/ui/PageHeader.jsx
import React from 'react';
import Button from './Button'; // Memanfaatkan komponen Reusable Button yang sudah ada

export default function PageHeader({
  code = 'SA-01',
  role = 'SUPER ADMIN TKI',
  title,
  description,
  actionText,
  onActionClick,
  children
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-super-admin pb-4">
      <div>
        {/* Label Kode Modul & Role */}
        <p className="text-[11px] font-bold text-muted-super-admin tracking-wider uppercase mb-1 font-sans">
          {code} // {role}
        </p>
        
        {/* Judul Utama Halaman */}
        <h1 className="text-3xl font-serif font-bold text-ink-super-admin tracking-tight">
          {title}
        </h1>
        
        {/* Sub-judul / Deskripsi Halaman */}
        {description && (
          <p className="text-xs text-muted-super-admin mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Area Tombol Aksi Kanan (Opsional) */}
      {actionText && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onActionClick}
          className="self-start sm:self-auto shrink-0"
        >
          {actionText}
        </Button>
      )}

      {/* Konten Tambahan Kustom jika ada */}
      {children}
    </div>
  );
}