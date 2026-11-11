import React from 'react';

export default function HorizontalScrollRail({ label, showHint = false, tone = 'light', children }) {
  const focusRing = tone === 'inverse' ? 'focus-visible:ring-white' : 'focus-visible:ring-landing-brand';
  const hintColor = tone === 'inverse' ? 'text-white/70' : 'text-landing-muted';

  return (
    <div>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:scroll-auto ${focusRing} ${tone === 'inverse' ? 'focus-visible:ring-offset-landing-footer' : 'focus-visible:ring-offset-landing-paper'}`}
      >
        {children}
      </div>
      {showHint && (
        <p className={`mt-2 text-xs md:hidden ${hintColor}`}>Geser untuk melihat pilihan lainnya.</p>
      )}
    </div>
  );
}
