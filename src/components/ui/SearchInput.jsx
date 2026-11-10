// src/components/ui/SearchInput.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari data...",
  label,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-1 w-full ${className}`}>
      {label && <label className="text-xs font-bold text-muted-super-admin">{label}</label>}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-super-admin">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin placeholder:text-muted-super-admin transition-all"
          {...props}
        />
      </div>
    </div>
  );
}