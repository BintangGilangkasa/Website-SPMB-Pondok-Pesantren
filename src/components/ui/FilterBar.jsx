// src/components/ui/FilterBar.jsx
import React from 'react';
import Button from './Button';

export default function FilterBar({
  onApply,
  onReset,
  applyText = "Cari / Terapkan",
  resetText = "Reset",
  children,
  className = ""
}) {
  return (
    <div className={`bg-surface-super-admin p-4 rounded-2xl border border-border-super-admin shadow-xs space-y-3 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
        
        {/* Slot Dinamis untuk Input Search & Filter Select */}
        <div className="sm:col-span-9 lg:col-span-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          {children}
        </div>

        {/* Action Buttons Global */}
        <div className="sm:col-span-3 lg:col-span-2 flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onApply}
            className="flex-1 bg-surface-super-admin hover:bg-surface-accent-super-admin text-muted-super-admin border border-border-super-admin"
          >
            {applyText}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
            className="px-3 text-muted-super-admin hover:text-error-hover-super-admin"
          >
            {resetText}
          </Button>
        </div>

      </div>
    </div>
  );
}