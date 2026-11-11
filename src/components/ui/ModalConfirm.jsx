// src/components/ui/ModalConfirm.jsx
import React from 'react';
import Button from './Button';

export default function ModalConfirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'primary',
  isLoading = false,
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay-super-admin/50 backdrop-blur-xs">
      <div className="bg-surface-super-admin rounded-2xl border border-border-super-admin max-w-md w-full p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-base font-sans font-bold text-ink-super-admin">{title}</h3>
          {description && (
            <p className="text-xs text-muted-super-admin mt-1 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Konten tambahan jika ada (misal: Input alasan di modal SA-02) */}
        {children && <div className="py-2">{children}</div>}

        <div className="flex justify-end gap-2 pt-2 border-t border-border-super-admin">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}