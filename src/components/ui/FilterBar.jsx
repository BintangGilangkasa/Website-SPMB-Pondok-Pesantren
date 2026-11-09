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
    <div className={`bg-white p-4 rounded-2xl border border-[#ECE5D8] shadow-xs space-y-3 ${className}`}>
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
            className="flex-1 bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#3A2E2B] border border-[#D6CBB8]"
          >
            {applyText}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
            className="px-3 text-[#8C7A6B]"
          >
            {resetText}
          </Button>
        </div>

      </div>
    </div>
  );
}