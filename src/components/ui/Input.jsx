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
        <label htmlFor={name} className="text-xs font-bold text-ink-super-admin">
          {label} {required && <span className="text-error-foreground">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 text-xs bg-surface-super-admin border rounded-lg focus:outline-none focus:ring-1 transition-all ${
          error
            ? 'border-error focus:ring-error'
            : 'border-border-super-admin focus:ring-primary-super-admin text-ink-super-admin'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] font-semibold text-error-foreground">{error}</span>}
    </div>
  );
}