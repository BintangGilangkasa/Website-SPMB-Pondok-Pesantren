import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface-super-admin rounded-2xl border border-border-super-admin shadow-xs overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-5 border-b border-border-super-admin flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-base font-serif font-bold text-ink-super-admin tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-[11px] text-muted-super-admin mt-0.5 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 bg-surface-super-admin border-t border-border-super-admin flex items-center justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
}