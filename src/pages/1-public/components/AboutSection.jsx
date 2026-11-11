import React from 'react';
import SectionHeading from './SectionHeading';

export default function AboutSection({ data }) {
  return (
    <section id="tentang" className="scroll-mt-24 border-y border-landing-border bg-landing-surface px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionHeading eyebrow={data.badge} title={data.title} />
        </div>
        <div className="md:col-span-8">
          <p className="max-w-3xl text-base leading-relaxed text-landing-muted sm:text-lg">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
