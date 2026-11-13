import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi backoffice"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      <aside
        id="admin-institusi-sidebar"
        aria-label="Navigasi Admin Institusi"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar-deep-super-admin text-sidebar-foreground-super-admin transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full lg:visible'}`}
      >
        <div className="flex min-h-20 items-center border-b border-sidebar-border-super-admin/30 px-5">
          <div>
            <p className="font-serif text-base font-bold">Backoffice Pesantren</p>
            <p className="mt-1 text-xs text-sidebar-muted-super-admin">Admin Institusi</p>
          </div>
        </div>
        <nav className="flex-1 p-4" aria-label="Menu utama">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-sidebar-muted-super-admin">Konten publik</p>
          <NavLink
            end
            to="/admin-institusi/landing-page"
            onClick={onClose}
            className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive ? 'bg-white text-ink-super-admin' : 'text-sidebar-foreground-super-admin hover:bg-white/10'}`}
          >
            <Image className="h-4 w-4" aria-hidden="true" />
            Profil landing page
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
