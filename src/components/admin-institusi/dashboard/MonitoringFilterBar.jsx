import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button, Select } from '@/components/ui';

export default function MonitoringFilterBar({
  filters,
  onChange,
  onApply,
  options = {
    periods: ['2026/2027', '2025/2026'],
    units: ['Semua satuan', 'MTs', 'MA'],
    types: ['Semua jenis', 'Baru', 'Pindahan'],
    offerings: ['Semua offering', 'MTs • Baru', 'MTs • Pindahan', 'MA • Baru'],
  },
}) {
  const selectFields = [
    { key: 'period', label: 'Periode', items: options.periods },
    { key: 'unit', label: 'Satuan', items: options.units },
    { key: 'type', label: 'Jenis', items: options.types },
    { key: 'offering', label: 'Offering', items: options.offerings },
  ];

  return (
    <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
        {selectFields.map((field) => (
          <div key={field.key} className="lg:col-span-2 space-y-1">
            <label className="block text-[11px] font-medium text-muted-super-admin">
              {field.label}
            </label>
            <div className="relative">
              <Select
                variant="unstyled"
                value={filters[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="w-full appearance-none bg-transparent border-b border-border-super-admin pb-1.5 pr-6 text-xs sm:text-sm font-bold text-ink-super-admin focus:border-primary-admin-institusi focus:outline-none cursor-pointer"
              >
                {field.items.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              <ChevronDown className="w-3.5 h-3.5 text-muted-super-admin pointer-events-none absolute right-0 bottom-2" />
            </div>
          </div>
        ))}

        <div className="sm:col-span-2 lg:col-span-4 flex lg:justify-end">
          <Button
            type="button"
            onClick={onApply}
            className="w-full sm:w-auto bg-primary-admin-institusi hover:bg-primary-hover-super-admin text-on-emphasis-super-admin px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Terapkan
          </Button>
        </div>
      </div>
    </div>
  );
}
