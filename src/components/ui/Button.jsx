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
    primary: 'bg-primary-super-admin hover:bg-primary-hover-super-admin text-on-emphasis-super-admin shadow-xs disabled:bg-disabled-super-admin',
    secondary: 'bg-surface-super-admin hover:bg-surface-accent-super-admin text-ink-super-admin border border-border-super-admin',
    outline: 'border border-border-super-admin text-ink-super-admin hover:bg-surface-accent-super-admin',
    danger: 'bg-error-foreground hover:bg-error-strong-super-admin text-on-emphasis-super-admin',
    ghost: 'text-muted-super-admin hover:bg-surface-accent-super-admin',
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
          <span className="w-3.5 h-3.5 border-2 border-surface-super-admin border-t-transparent rounded-full animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}