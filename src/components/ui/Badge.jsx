// src/components/ui/Badge.jsx
import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    AKTIF: 'bg-[#E2F0E6] text-[#2D5A3C] border-[#B8DEC3]',
    Normal: 'bg-[#E2F0E6] text-[#2D5A3C] border-[#B8DEC3]',
    BELUM_AKTIF: 'bg-[#FDF0E6] text-[#8B4513] border-[#F5D4BD]',
    Perhatian: 'bg-[#FEF3C7] text-[#D97706] border-[#FCD34D]',
    TERTANGGUHKAN: 'bg-[#F2ECE1] text-[#A8927C] border-[#E2D8C7]',
    danger: 'bg-[#FDEDEC] text-[#C53939] border-[#F5C6CB]',
    default: 'bg-[#F5F0E6] text-[#6E5A44] border-[#E8DFC8]',
  };

  const activeStyle = variants[variant] || variants.default;

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${activeStyle} ${className}`}>
      {children}
    </span>
  );
}