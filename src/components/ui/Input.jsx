// src/components/ui/Input.jsx
import React from 'react';

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label htmlFor={name} className="text-xs font-bold text-[#4A3B2C]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 text-xs bg-[#FAF8F5] border rounded-lg focus:outline-none focus:ring-1 transition-all ${
          error
            ? 'border-red-500 focus:ring-red-300'
            : 'border-[#DCD3C5] focus:ring-[#8B5E34] text-[#2B2118]'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] font-semibold text-red-500">{error}</span>}
    </div>
  );
}