import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';

export default function AboutSection({ data }) {
  const imageUrl = typeof data.imageUrl === 'string' ? data.imageUrl.trim() : '';
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  useEffect(() => setImageFailed(false), [imageUrl]);

  return (
    <section id="tentang" className="scroll-mt-24 border-y border-landing-border bg-landing-surface px-4 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={data.badge} title={data.title} />

        <div className="mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-12 md:gap-10">
          <figure className="relative isolate mx-auto w-full max-w-xl px-2 pb-3 pt-2 md:col-span-5 md:mx-0 md:max-w-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 top-0 h-20 w-20 text-landing-brand"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
            <span aria-hidden="true" className="absolute inset-x-5 bottom-0 top-5 translate-x-2 translate-y-2 rounded-[1.75rem] border-2 border-landing-brand" />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-white bg-landing-brand-soft shadow-lg">
              {showImage ? (
                <img
                  src={imageUrl}
                  alt={data.imageAlt || `Foto profil ${data.title}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <p className="max-w-xs text-sm leading-relaxed text-landing-muted">
                    Foto profil pesantren akan tampil setelah diunggah dari backoffice.
                  </p>
                </div>
              )}
            </div>

            {data.imageCaption && (
              <figcaption className="relative mt-4 max-w-lg text-sm leading-relaxed text-landing-muted">
                {data.imageCaption}
              </figcaption>
            )}
          </figure>

          <div className="md:col-span-7">
            <p className="max-w-3xl text-base leading-relaxed text-landing-muted sm:text-lg">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
