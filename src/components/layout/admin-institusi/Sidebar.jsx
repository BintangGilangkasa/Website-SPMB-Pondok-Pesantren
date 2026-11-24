import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Profile } from '@/components/ui';
import { useAuth } from '../../../context/useAuth';
import {
  ChartArea,
  Users,
  Award,
  Wallet,
  CheckCircle2,
  FileBarChart2,
  Image,
  X,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const menuOperasional = [
    { name: 'Dashboard', path: '/admin-institusi/dashboard', icon: ChartArea },
    { name: 'Pendaftar', path: '/admin-institusi/pendaftar', icon: Users },
    { name: 'Seleksi & Hasil', path: '/admin-institusi/seleksi-hasil', icon: Award },
    { name: 'Pembayaran', path: '/admin-institusi/pembayaran', icon: Wallet },
    { name: 'Daftar Ulang', path: '/admin-institusi/daftar-ulang', icon: CheckCircle2 },
    { name: 'Laporan', path: '/admin-institusi/laporan', icon: FileBarChart2 },
  ];

  const menuKonfigurasi = [
    { name: 'Pengaturan Landing Page', path: '/admin-institusi/landing-page', icon: Image },
  ];

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  const renderMenuGroup = (label, items) => (
    <div className="space-y-1">
      <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted-super-admin/80">
        {label}
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (onClose) onClose();
            }}
            className={({ isActive }) =>
              `flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive
                ? 'bg-primary-admin-institusi text-on-emphasis-super-admin shadow-xs'
                : 'text-sidebar-foreground-super-admin hover:bg-white/10 hover:text-on-emphasis-super-admin'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi backoffice"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-overlay-super-admin/40 lg:hidden"
        />
      )}

      <aside
        id="admin-institusi-sidebar"
        aria-label="Navigasi Admin Institusi"
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-sidebar-deep-super-admin text-sidebar-foreground-super-admin flex flex-col justify-between p-4 shrink-0 border-r border-sidebar-border-super-admin/30 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header Sidebar */}
        <div className="flex min-h-16 items-center justify-between border-b border-sidebar-border-super-admin/30 px-3 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-admin-institusi text-on-emphasis-super-admin flex items-center justify-center font-serif font-bold text-base shrink-0">
              S
            </div>
            <div>
              <p className="font-serif text-sm font-bold text-on-emphasis-super-admin leading-tight">
                SPMB
              </p>
              <p className="mt-0.5 text-[11px] text-sidebar-muted-super-admin">
                Pesantren • Backoffice
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup sidebar"
            className="p-1.5 rounded-lg text-sidebar-muted-super-admin hover:bg-white/10 hover:text-on-emphasis-super-admin lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Area Navigasi Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4 px-1 space-y-6" aria-label="Menu utama">
          {renderMenuGroup('Konfigurasi', menuKonfigurasi)}
          {renderMenuGroup('Menu Operasional', menuOperasional)}
        </nav>

        {/* Footer Identitas Tenant */}
        <div className="mt-3 border-t border-sidebar-border-super-admin/30 pt-3">
          <Profile
            name={user?.name || 'Admin Institusi'}
            description={user?.email || user?.role}
            className="gap-3"
            avatarClassName="h-8 w-8 rounded-full border border-sidebar-active-border-super-admin bg-sidebar-deep-super-admin text-sidebar-foreground-super-admin"
            nameClassName="text-xs font-bold text-on-emphasis-super-admin"
            descriptionClassName="text-[10px] text-sidebar-muted-super-admin"
          />
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/admin-institusi/login', { replace: true });
            }}
            className="mt-2 inline-flex min-h-10 w-full items-center gap-2 rounded-lg px-2 text-xs font-semibold text-sidebar-muted-super-admin transition-colors hover:bg-white/10 hover:text-on-emphasis-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
