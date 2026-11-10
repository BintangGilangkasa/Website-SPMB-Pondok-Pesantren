// src/components/ui/Badge.jsx
import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    AKTIF: 'bg-success-surface text-success-foreground border-success-border',
    Normal: 'bg-success-surface text-success-foreground border-success-border',
    BELUM_AKTIF: 'bg-warning-surface text-warning-foreground border-warning-border',
    Perhatian: 'bg-warning-surface text-warning-foreground border-warning-border',
    TERTANGGUHKAN: 'bg-surface-accent-super-admin text-muted-super-admin border-border-super-admin',
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