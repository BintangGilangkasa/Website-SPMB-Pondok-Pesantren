import React from 'react';
import EmptyState from './EmptyState';
import HorizontalScrollRail from './HorizontalScrollRail';
import SectionHeading from './SectionHeading';

export default function FacilitiesSection({ environments }) {
  return (
    <section className="border-t border-landing-border bg-landing-surface px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-7xl space-y-7">
        <SectionHeading eyebrow="Fasilitas" title="Lingkungan belajar" />

        {environments.length === 0 ? (
          <EmptyState>Informasi fasilitas dan foto resmi belum tersedia.</EmptyState>
        ) : (
          <HorizontalScrollRail label="Fasilitas pesantren" showPagination={environments.length > 1}>
            {environments.map((environment) => (
              <article
                key={environment.id}
                className="w-[82%] shrink-0 snap-start rounded-2xl border border-landing-border bg-landing-paper p-6 sm:w-[45%] lg:w-[38%]"
              >
                <h3 className="font-serif text-lg font-bold text-landing-ink">{environment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-muted">{environment.description}</p>
              </article>
            ))}
          </HorizontalScrollRail>
        )}
      </div>
    </section>
  );
}
