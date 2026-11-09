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
      {label && <label className="text-xs font-bold text-[#6E5A44]">{label}</label>}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#8C7A6B]">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8B5E34] text-[#2B2118] placeholder-[#9A8B7C] transition-all"
          {...props}
        />
      </div>
    </div>
  );
}