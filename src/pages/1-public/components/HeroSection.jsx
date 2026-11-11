import React from 'react';

export default function HeroSection({ data }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-6 lg:col-span-7">
        <span className="inline-flex rounded-full border border-landing-border bg-landing-brand-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-landing-brand">
          {data.badge}
        </span>
        <div className="space-y-4">
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-landing-ink sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-landing-muted sm:text-lg">
            {data.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <a
            href="#penerimaan"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-landing-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-landing-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-2"
          >
            {data.primaryCtaText}
          </a>
          <a
            href="#persyaratan"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-landing-border bg-landing-surface px-5 py-3 text-sm font-bold text-landing-brand transition-colors hover:bg-landing-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-2"
          >
            {data.secondaryCtaText}
          </a>
        </div>
        <p className="text-sm text-landing-muted">{data.noticeText}</p>
      </div>

      <div className="lg:col-span-5">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-landing-border bg-landing-surface px-6 py-10 text-center shadow-sm sm:min-h-96">
          <p className="text-xs font-bold uppercase tracking-widest text-landing-brand">Foto pesantren</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-landing-muted">
            Foto resmi pesantren belum ditambahkan.
          </p>
        </div>
      </div>
    </section>
  );
}
