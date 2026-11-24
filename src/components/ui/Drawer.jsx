import React from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from '../../hooks/useDialogFocus';

export default function Drawer({ isOpen, onClose, title, subtitle, children, footer }) {
  const titleId = React.useId();
  const drawerRef = useDialogFocus(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-overlay-super-admin/40">
      <button type="button" onClick={onClose} aria-label="Tutup detail" className="absolute inset-0" />
      <aside
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-border-super-admin bg-white font-sans text-ink-super-admin shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-super-admin p-5">
          <div>
            <h2 id={titleId} className="font-serif text-lg font-bold">{title}</h2>
            {subtitle && <p className="mt-1 text-xs leading-relaxed text-muted-super-admin">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-super-admin text-ink-super-admin hover:bg-surface-muted-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">{children}</div>
        {footer && <footer className="border-t border-border-super-admin bg-white p-4">{footer}</footer>}
      </aside>
    </div>
  );
}
