// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import ModalConfirm from '../../ui/ModalConfirm';

import logo from '../../../assets/icons/tki.svg';
import { Home, ChartArea, User, Wallet, Settings, LogOut, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Helper penanda rute aktif (cocok untuk sub-path)
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  // 5 Modul Utama Super Admin TKI (SA-01 - SA-05)
  const menuPlatform = [
    { name: 'Dashboard Platform', path: '/super-admin/dashboard', icon: ChartArea },
    { name: 'Institusi / Tenant', path: '/super-admin/tenant', icon: Home },
    { name: 'Pengguna & Hak Akses', path: '/super-admin/users-access', icon: User },
    { name: 'Pengawasan Transaksi', path: '/super-admin/transactions', icon: Wallet },
    { name: 'Pengaturan Platform', path: '/super-admin/platform-settings', icon: Settings },
  ];

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Overlay Backdrop khusus Tampilan Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-overlay-super-admin/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-85 bg-sidebar-deep-super-admin text-sidebar-foreground-super-admin flex flex-col justify-between p-4 shrink-0 border-r border-sidebar-border-super-admin shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* SISI ATAS: Header Brand & Daftar Menu Navigasi */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Header Brand Platform */}
          <div className="p-3 bg-sidebar-deep-super-admin rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo SPMB TKI" className="w-13 h-13 object-contain" />
              <div>
                <h1 className="font-serif text-sm font-bold tracking-tight text-on-emphasis-super-admin leading-none">
                  spmb<span className="text-secondary-super-admin">.</span>
                </h1>
                <p className="text-[10px] tracking-wider text-sidebar-muted-super-admin font-sans font-medium uppercase mt-1">
                  Super Admin TKI
                </p>
              </div>
            </div>

            {/* Tombol Tutup Sidebar versi Mobile */}
            <button 
              type="button" 
              onClick={onClose}
              className="text-sidebar-muted-super-admin hover:text-on-emphasis-super-admin lg:hidden p-1 text-sm font-bold cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Group Header: MENU PLATFORM */}
          <div className="px-2 mb-2">
            <p className="text-[10px] font-bold tracking-widest text-sidebar-muted-super-admin uppercase font-sans">
              PLATFORM Super Admin TKI
            </p>
          </div>

          {/* Navigasi List SA-01 - SA-05 */}
          <nav className="space-y-4">
            {menuPlatform.map((item) => {
              const active = isActive(item.path);
              // Inisialisasi komponen Icon dengan huruf kapital
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg   text-sm font-semibold transition-all ${
                    active
                      ? 'bg-sidebar-border-super-admin text-sidebar-deep-super-admin shadow-xs'
                      : 'text-sidebar-foreground-super-admin hover:bg-primary-hover-super-admin hover:text-on-emphasis-super-admin'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Render Icon Komponen Lucide secara terpisah */}
                    <IconComponent className={`w-4 h-4 shrink-0 ${active ? 'text-sidebar-deep-super-admin' : 'text-sidebar-muted-super-admin'}`} />
                    <span className="leading-tight">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* SISI BAWAH: Profil User & Logout Button */}
        <div className="pt-3 border-t border-sidebar-border-super-admin mt-4 space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-sidebar-deep-super-admin border border-sidebar-active-border-super-admin flex items-center justify-center text-xs font-bold text-sidebar-foreground-super-admin shrink-0">
              SA
            </div>
            <div className="text-left leading-tight truncate">
              <p className="text-xs font-bold text-on-emphasis-super-admin truncate">Super Admin TKI</p>
              <p className="text-[10px] text-sidebar-muted-super-admin truncate">admin@spmbtki.id</p>
            </div>
          </div>

          {/* Button Logout */}
          <Button
            variant="danger"
            size="sm"
            className="w-full bg-error-strong-super-admin hover:bg-error-hover-super-admin text-on-emphasis-super-admin border border-error-strong-super-admin flex items-center justify-center gap-2"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar / Logout</span>
          </Button>
        </div>
      </aside>

      {/* Modal Konfirmasi Keluar */}
      <ModalConfirm
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Keluar Sesi"
        description="Apakah Anda yakin ingin keluar dari Portal Super Admin TKI?"
        confirmText="Ya, Selesai & Keluar"
        cancelText="Batal"
        variant="danger"
      />
    </>
  );
}