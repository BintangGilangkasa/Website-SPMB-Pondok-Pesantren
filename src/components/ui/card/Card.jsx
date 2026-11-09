import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#ECE5D8] shadow-xs overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-5 border-b border-[#F5F0E8] flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-base font-serif font-bold text-[#2B2118] tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-[11px] text-[#8C7A6B] mt-0.5 leading-relaxed ${className}`}>
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
    <div className={`p-4 bg-[#FAF8F5] border-t border-[#F5F0E8] flex items-center justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
}