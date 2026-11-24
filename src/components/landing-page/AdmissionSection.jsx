import React from 'react';
import EmptyState from './EmptyState';
import HorizontalScrollRail from './HorizontalScrollRail';
import SectionHeading from './SectionHeading';

export default function AdmissionSection({ offerings = [] }) {
  const items = Array.isArray(offerings) ? offerings : [];

  return (
    <section id="penerimaan" className="scroll-mt-24 bg-landing-footer px-4 py-14 text-white sm:px-8 sm:py-18">
      <div className="mx-auto max-w-7xl space-y-7">
        <SectionHeading
          eyebrow="Penerimaan santri"
          title="Jalur penerimaan"
          description="Bandingkan jalur dan pilih yang sesuai dengan kebutuhan calon santri."
          tone="inverse"
        />

        {items.length === 0 ? (
          <EmptyState tone="inverse">Informasi jalur penerimaan belum tersedia.</EmptyState>
        ) : (
          <HorizontalScrollRail label="Jalur penerimaan" showPagination={items.length > 1} tone="inverse">
            {items.map((offering, index) => (
              <article
                key={offering.id || index}
                className="flex w-[82%] shrink-0 snap-start flex-col justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 sm:w-[70%] lg:w-[58%]"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${offering.status === 'Buka' ? 'bg-emerald-100 text-emerald-800' : 'bg-white/10 text-white'}`}>
                      {offering.status}
                    </span>
                    {Number.isFinite(offering.quota) && (
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">
                        Kuota {offering.quota.toLocaleString('id-ID')} santri
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{offering.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{offering.description}</p>
                  {(offering.openDate || offering.closeDate) && (
                    <p className="text-sm text-white/75">
                      Periode: {[offering.openDate, offering.closeDate].filter(Boolean).join(' s.d. ')}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row">
                  <a
                    href="#alur"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-landing-ink transition-colors hover:bg-landing-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-landing-footer"
                  >
                    Lihat alur pendaftaran
                  </a>
                  <a
                    href="#persyaratan"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-landing-footer"
                  >
                    Syarat dan biaya
                  </a>
                </div>
              </article>
            ))}
          </HorizontalScrollRail>
        )}
      </div>
    </section>
  );
}
