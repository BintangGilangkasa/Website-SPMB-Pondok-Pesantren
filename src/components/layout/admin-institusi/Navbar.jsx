import React from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-super-admin bg-surface-super-admin px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          aria-expanded={isSidebarOpen}
          aria-controls="admin-institusi-sidebar"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-super-admin hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi lg:hidden"
        >
          {isSidebarOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
        <p className="truncate text-sm font-semibold text-ink-super-admin">Pengelolaan landing page</p>
      </div>
      <Link
        to="/landing-page"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-primary-admin-institusi hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi focus-visible:ring-offset-2"
      >
        <span className="hidden sm:inline">Lihat publik</span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
    </header>
  );
}
