import React from 'react';
import EmptyState from './EmptyState';
import HorizontalScrollRail from './HorizontalScrollRail';
import SectionHeading from './SectionHeading';

export default function ProgramsSection({ programs }) {
  return (
    <section id="pendidikan" className="scroll-mt-24 mx-auto max-w-7xl space-y-7 px-4 py-14 sm:px-8 sm:py-18">
      <SectionHeading
        eyebrow="Program pendidikan"
        title="Pilihan program"
        description="Jelajahi jenjang pendidikan yang tersedia di pesantren."
      />

      {programs.length === 0 ? (
        <EmptyState>Informasi program pendidikan belum tersedia.</EmptyState>
      ) : (
        <HorizontalScrollRail label="Program pendidikan" showHint={programs.length > 1}>
          {programs.map((program) => (
            <article
              key={program.id}
              className="flex w-[82%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-landing-border bg-landing-surface p-6 shadow-sm sm:w-[45%] lg:w-[38%]"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-landing-brand">{program.category}</span>
              <div>
                <h3 className="font-serif text-xl font-bold text-landing-ink">{program.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-muted">{program.description}</p>
              </div>
            </article>
          ))}
        </HorizontalScrollRail>
      )}
    </section>
  );
}
