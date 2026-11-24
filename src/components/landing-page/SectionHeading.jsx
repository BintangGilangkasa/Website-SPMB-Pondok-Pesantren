import React from 'react';

export default function SectionHeading({ eyebrow, title, description, tone = 'light' }) {
  const eyebrowClass = tone === 'inverse' ? 'text-landing-brand-soft' : 'text-landing-brand';
  const titleClass = tone === 'inverse' ? 'text-white' : 'text-landing-ink';
  const descriptionClass = tone === 'inverse' ? 'text-white/80' : 'text-landing-muted';

  return (
    <div className="max-w-2xl space-y-2">
      <p className={`text-xs font-bold uppercase tracking-widest ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`font-serif text-3xl font-bold leading-tight sm:text-4xl ${titleClass}`}>{title}</h2>
      {description && (
        <p className={`text-sm leading-relaxed sm:text-base ${descriptionClass}`}>{description}</p>
      )}
    </div>
  );
}
