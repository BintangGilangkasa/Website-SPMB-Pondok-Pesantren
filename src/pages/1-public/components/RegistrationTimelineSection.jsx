import React from 'react';
import { ChevronDown } from 'lucide-react';
import EmptyState from './EmptyState';
import SectionHeading from './SectionHeading';

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case 'berlangsung':
      return 'bg-emerald-100 text-emerald-800';
    case 'akan datang':
      return 'bg-amber-100 text-amber-900';
    case 'selesai':
      return 'bg-slate-100 text-slate-700';
    default:
      return 'bg-landing-brand-soft text-landing-brand';
  }
}

function buildTimelineItems(timelines, steps) {
  const stepsByNumber = new Map(steps.map((step) => [Number(step.stepNumber), step]));
  const assignedSteps = new Set();

  const items = timelines.map((timeline) => {
    const relatedSteps = (timeline.stepNumbers ?? [])
      .map((stepNumber) => stepsByNumber.get(Number(stepNumber)))
      .filter(Boolean);

    relatedSteps.forEach((step) => assignedSteps.add(Number(step.stepNumber)));

    return { ...timeline, steps: relatedSteps };
  });

  const unassignedSteps = steps.filter((step) => !assignedSteps.has(Number(step.stepNumber)));
  if (unassignedSteps.length > 0) {
    items.push({
      id: 'other-steps',
      phase: 'Tahapan pendaftaran',
      description: 'Langkah pendaftaran yang belum terhubung ke tanggal seleksi.',
      steps: unassignedSteps,
    });
  }

  return items;
}

export default function RegistrationTimelineSection({ timelines = [], steps = [] }) {
  const items = buildTimelineItems(timelines, steps);

  return (
    <section id="alur" className="scroll-mt-24 bg-landing-paper px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-5xl space-y-8">
        <SectionHeading
          eyebrow="Pendaftaran santri"
          title="Tanggal dan alur pendaftaran"
          description="Setiap jadwal terhubung dengan langkah yang perlu diselesaikan wali dan calon santri."
        />

        {items.length === 0 ? (
          <EmptyState>Jadwal dan alur pendaftaran resmi belum tersedia.</EmptyState>
        ) : (
          <ol className="relative space-y-5 before:absolute before:bottom-5 before:left-[11px] before:top-5 before:w-px before:bg-landing-border sm:space-y-6">
            {items.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute left-1 top-7 z-10 h-4 w-4 rounded-full border-4 border-landing-paper bg-landing-brand" aria-hidden="true" />
                <span className="absolute left-3 top-[1.85rem] h-px w-7 bg-landing-border" aria-hidden="true" />

                <article className="ml-10 rounded-2xl border border-landing-border bg-landing-surface p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.date && (
                      <span className="rounded-lg bg-landing-brand-soft px-3 py-1.5 text-xs font-bold text-landing-brand">
                        {item.date}
                      </span>
                    )}
                    {item.status && (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-serif text-xl font-bold text-landing-ink">{item.phase}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-landing-muted">{item.description}</p>

                  {item.steps.length > 0 && (
                    <details className="group mt-4 border-t border-landing-border pt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-sm font-semibold text-landing-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand [&::-webkit-details-marker]:hidden">
                        <span>Langkah terkait ({item.steps.length})</span>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                      </summary>
                      <ol className="mt-3 space-y-4 border-l border-landing-border pl-5">
                        {item.steps.map((step) => (
                          <li key={step.stepNumber} className="relative">
                            <span className="absolute -left-[1.55rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-landing-brand bg-landing-surface" aria-hidden="true" />
                            <p className="text-[11px] font-bold uppercase tracking-wide text-landing-brand">
                              Langkah {String(step.stepNumber).padStart(2, '0')}
                            </p>
                            <h4 className="mt-1 font-semibold text-landing-ink">{step.title}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-landing-muted">{step.description}</p>
                          </li>
                        ))}
                      </ol>
                    </details>
                  )}
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
