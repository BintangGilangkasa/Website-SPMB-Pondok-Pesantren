import React from 'react';
import { CalendarDays, ChevronDown, FileText } from 'lucide-react';
import SectionHeading from './SectionHeading';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

function Disclosure({ icon: Icon, title, emptyText, children }) {
  return (
    <details className="group rounded-2xl border border-landing-border bg-landing-surface">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-landing-brand [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-landing-brand" aria-hidden="true" />
          <span className="font-serif text-base font-bold text-landing-ink">{title}</span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-landing-brand transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
      </summary>
      {children || <p className="px-5 pb-5 text-sm leading-relaxed text-landing-muted">{emptyText}</p>}
    </details>
  );
}

export default function RequirementsSection({ requirements }) {
  const documents = requirements.documents ?? [];
  const fees = requirements.fees ?? [];

  return (
    <section id="persyaratan" className="scroll-mt-24 border-y border-landing-border bg-landing-surface px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-7xl space-y-7">
        <SectionHeading eyebrow="Informasi pendaftaran" title="Persyaratan dan biaya" />
        <div className="grid gap-4 md:grid-cols-2">
          <Disclosure icon={FileText} title="Persyaratan berkas" emptyText="Persyaratan resmi belum diisi.">
            {documents.length > 0 && (
              <ul className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-landing-muted">
                {documents.map((document) => (
                  <li key={document.id} className="flex items-center justify-between gap-4 border-b border-landing-border pb-3 last:border-0 last:pb-0">
                    <span>{document.name}</span>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${document.isRequired ? 'bg-landing-brand-soft text-landing-brand' : 'bg-landing-paper text-landing-muted'}`}>
                      {document.isRequired ? 'Wajib' : 'Opsional'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Disclosure>

          <Disclosure icon={CalendarDays} title="Biaya pendaftaran" emptyText="Informasi biaya resmi belum diisi.">
            {fees.length > 0 && (
              <ul className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-landing-muted">
                {fees.map((fee) => (
                  <li key={fee.id} className="flex flex-col justify-between gap-1 border-b border-landing-border pb-3 last:border-0 last:pb-0 sm:flex-row sm:gap-4">
                    <span className="min-w-0">{fee.category}</span>
                    <span className="shrink-0 font-semibold text-landing-ink">
                      {typeof fee.amount === 'number' ? currencyFormatter.format(fee.amount) : fee.amount}
                      {fee.type && <span className="ml-1 text-xs font-normal text-landing-muted">({fee.type})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
