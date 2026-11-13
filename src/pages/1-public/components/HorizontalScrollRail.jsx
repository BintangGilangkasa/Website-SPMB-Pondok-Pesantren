import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function HorizontalScrollRail({ label, showPagination = false, tone = 'light', children }) {
  const railRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const slides = React.Children.toArray(children);
  const [activeSlide, setActiveSlide] = useState(0);
  const focusRing = tone === 'inverse' ? 'focus-visible:ring-white' : 'focus-visible:ring-landing-brand';
  const focusOffset = tone === 'inverse' ? 'focus-visible:ring-offset-landing-footer' : 'focus-visible:ring-offset-landing-paper';

  const updateActiveSlide = useCallback(() => {
    const rail = railRef.current;
    if (!rail || rail.children.length === 0) return;

    const railLeft = rail.getBoundingClientRect().left + rail.clientLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((slide, index) => {
      const slideLeft = slide.getBoundingClientRect().left - railLeft + rail.scrollLeft;
      const distance = Math.abs(slideLeft - rail.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveSlide((current) => current === nearestIndex ? current : nearestIndex);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(updateActiveSlide);
  }, [updateActiveSlide]);

  useEffect(() => {
    setActiveSlide((current) => Math.min(current, Math.max(slides.length - 1, 0)));
    updateActiveSlide();
    window.addEventListener('resize', updateActiveSlide);
    return () => {
      window.removeEventListener('resize', updateActiveSlide);
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [slides.length, updateActiveSlide]);

  const goToSlide = (index) => {
    const rail = railRef.current;
    const slide = rail?.children[index];
    if (!rail || !slide) return;

    const left = slide.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    rail.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActiveSlide(index);
  };

  return (
    <div>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={handleScroll}
        className={`landing-scroll-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:scroll-auto ${focusRing} ${tone === 'inverse' ? 'focus-visible:ring-offset-landing-footer' : 'focus-visible:ring-offset-landing-paper'}`}
      >
        {slides}
      </div>
      {showPagination && slides.length > 1 && (
        <div className="mt-2 flex justify-center md:hidden" role="group" aria-label={`Pilih slide ${label}`}>
          {slides.map((slide, index) => (
            <button
              key={slide.key ?? index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Tampilkan slide ${index + 1} dari ${slides.length}: ${label}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} ${focusOffset}`}
            >
              <span
                aria-hidden="true"
                className={`rounded-full border-2 transition-[background-color] duration-200 motion-reduce:transition-none ${activeSlide === index ? (tone === 'inverse' ? 'h-2.5 w-2.5 border-white bg-white' : 'h-2.5 w-2.5 border-landing-brand bg-landing-brand') : (tone === 'inverse' ? 'h-2 w-2 border-white bg-transparent' : 'h-2 w-2 border-landing-brand bg-transparent')}`}
              />
            </button>
          ))}
        </div>
      )}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {label}, slide {activeSlide + 1} dari {slides.length}
      </span>
    </div>
  );
}
