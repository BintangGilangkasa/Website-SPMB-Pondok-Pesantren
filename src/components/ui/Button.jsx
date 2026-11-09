// src/components/ui/Button.jsx
import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyle = 'font-semibold rounded-lg transition-all flex items-center justify-center gap-2 focus:outline-none select-none cursor-pointer';

  const variants = {
    primary: 'bg-[#4A3B2C] hover:bg-[#382C21] text-white shadow-xs disabled:bg-[#A8988B]',
    secondary: 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#3A2E2B] border border-[#E0D7C6]',
    outline: 'border border-[#D6CBB8] text-[#3A2E2B] hover:bg-[#F2ECE1]',
    danger: 'bg-[#C53939] hover:bg-[#A82B2B] text-white',
    ghost: 'text-[#6E5A44] hover:bg-[#F0E6D6]',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-[11px]',
    md: 'px-3.5 py-2 text-xs',
    lg: 'px-4 py-2.5 text-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}