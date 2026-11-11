import React from 'react';

export default function EmptyState({ children, tone = 'light' }) {
  const styles = tone === 'inverse'
    ? 'border-white/20 bg-white/5 text-white/80'
    : 'border-landing-border bg-landing-surface/80 text-landing-muted';

  return (
    <p className={`rounded-2xl border border-dashed px-5 py-6 text-sm leading-relaxed ${styles}`}>
      {children}
    </p>
  );
}
