import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function ContactSection({ institution }) {
  const phoneNumber = (institution.contactPhone || '').replace(/\D/g, '');
  const contactHref = phoneNumber
    ? `https://wa.me/${phoneNumber}`
    : institution.contactEmail
      ? `mailto:${institution.contactEmail}`
      : null;
  const contactLabel = phoneNumber ? 'Hubungi lewat WhatsApp' : 'Kirim email';

  return (
    <section className="px-4 pb-16 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-landing-footer p-7 text-white sm:p-10 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Informasi kontak pesantren</h2>
          <p className="text-sm leading-relaxed text-white/80">
            {contactHref ? 'Hubungi panitia melalui kanal resmi pesantren.' : 'Kontak resmi pesantren belum tersedia.'}
          </p>
        </div>
        {contactHref && (
          <a
            href={contactHref}
            target={phoneNumber ? '_blank' : undefined}
            rel={phoneNumber ? 'noreferrer' : undefined}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-landing-ink transition-colors hover:bg-landing-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-landing-footer"
          >
            <PhoneCall size={17} aria-hidden="true" />
            {contactLabel}
          </a>
        )}
      </div>
    </section>
  );
}
