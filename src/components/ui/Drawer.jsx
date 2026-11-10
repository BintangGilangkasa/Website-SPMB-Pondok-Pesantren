// src/components/ui/Drawer.jsx
import React, { useEffect } from 'react';

export default function Drawer({ isOpen, onClose, title, subtitle, children }) {
  // Menutup drawer dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-overlay-super-admin/40 backdrop-blur-xs transition-opacity animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Container Panel */}
      <div className="relative w-full max-w-md bg-surface-super-admin h-full shadow-2xl flex flex-col border-l border-border-super-admin z-10 font-sans text-ink-super-admin">
        
        {/* Header Drawer */}
        <div className="p-5 border-b border-border-super-admin bg-surface-super-admin flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-ink-super-admin">{title}</h3>
            {subtitle && <p className="text-[11px] text-muted-super-admin mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-accent-super-admin text-muted-super-admin hover:bg-surface-accent-super-admin flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {children}
        </div>

        {/* Footer Drawer */}
        <div className="p-4 border-t border-border-super-admin bg-surface-super-admin flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface-super-admin border border-border-super-admin hover:bg-surface-accent-super-admin text-ink-super-admin text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup Detail
          </button>
        </div>

      </div>
    </div>
  );
}