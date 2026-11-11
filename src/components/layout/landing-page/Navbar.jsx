import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigationLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#pendidikan', label: 'Program' },
  { href: '#penerimaan', label: 'Jalur penerimaan' },
  { href: '#persyaratan', label: 'Persyaratan' },
  { href: '#alur', label: 'Alur' },
  { href: '#faq', label: 'Tanya jawab' },
];

export default function PublicNavbar({ institutionName = '[NAMA PESANTREN]' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-landing-border bg-landing-paper/95 shadow-sm backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          to="/landing-page"
          className="flex min-w-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-2"
          aria-label={`SPMB, ${institutionName}`}
        >
          <span className="shrink-0 font-serif text-lg font-bold text-landing-ink">
            spmb<span className="text-landing-brand">.</span>
          </span>
          <span className="h-6 w-px shrink-0 bg-landing-border" aria-hidden="true" />
          <span className="max-w-28 truncate text-[11px] font-semibold uppercase tracking-wide text-landing-brand sm:max-w-48">
            {institutionName}
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-5 lg:flex">
          {navigationLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm text-xs font-semibold text-landing-muted transition-colors hover:text-landing-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#pendaftaran"
            className="hidden rounded-lg bg-landing-brand px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-landing-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-2 sm:inline-flex"
          >
            Daftar Sekarang
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-landing-border text-landing-ink transition-colors hover:bg-landing-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand focus-visible:ring-offset-2 lg:hidden"
            aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={menuOpen}
            aria-controls="public-mobile-navigation"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>

        <nav
          id="public-mobile-navigation"
          aria-label="Navigasi halaman"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full border-b border-landing-border bg-landing-paper px-4 py-3 shadow-md transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none lg:hidden ${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-4">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-landing-ink transition-colors hover:bg-landing-brand-soft hover:text-landing-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
