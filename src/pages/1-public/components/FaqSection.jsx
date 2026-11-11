import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import EmptyState from './EmptyState';
import SectionHeading from './SectionHeading';

export default function FaqSection({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-4xl space-y-7 px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto text-center">
        <SectionHeading eyebrow="Tanya jawab" title="Pertanyaan umum" />
      </div>

      {faqs.length === 0 ? (
        <EmptyState>Pertanyaan umum resmi belum ditambahkan.</EmptyState>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article key={faq.id} className="overflow-hidden rounded-2xl border border-landing-border bg-landing-surface shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-landing-ink transition-colors hover:bg-landing-brand-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-landing-brand"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-landing-brand transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={answerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-landing-border px-5 py-4 text-sm leading-relaxed text-landing-muted">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
