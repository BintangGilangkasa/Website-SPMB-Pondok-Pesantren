import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ModalConfirm, Profile } from '@/components/ui';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';

export default function Navbar({ onToggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle Close Dropdown saat mengklik area luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false)
    setIsDropdownOpen(false);
    logout();
    navigate('/super-admin/login');
  };

  return (
    <header className="bg-surface-super-admin border-b border-border-super-admin px-4 py-2.5 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-30 shadow-xs">

      {/* Sisi Kiri: Hamburger Button (Mobile) & Title Scope Status */}
      <div className="flex items-center gap-3">
        {/* Tombol Hamburger dengan Reusable Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Sisi Kanan: Status Notifikasi & Profile Dropdown */}
      <div className="flex items-center gap-3">

        {/* Button Alert Notifikasi */}
        <button
          type="button"
          className="relative p-2 text-muted-super-admin hover:text-ink-super-admin hover:bg-surface-accent-super-admin rounded-full transition-colors border border-transparent hover:border-border-super-admin"
          title="Status Layanan Integrasi"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Profil Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-surface-accent-super-admin transition-colors focus:outline-none border border-transparent hover:border-border-super-admin"
          >
            <Profile
              name={user?.name || 'Super Admin TKI'}
              description={user?.email || 'Super Admin TKI'}
              className="gap-2 "
              avatarClassName="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-super-admin font-serif text-xs font-bold text-sidebar-foreground-super-admin shadow-xs"
              detailsClassName="hidden text-left leading-none sm:flex sm:flex-col"
              nameClassName="text-xs font-bold text-ink-super-admin"
              descriptionClassName="mt-0.5 text-[10px] text-muted-super-admin"
            />

            <span className={`text-[10px] text-muted-super-admin transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Menu Dropdown Melayang */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-super-admin rounded-xl shadow-lg border border-border-super-admin py-2 z-50">
              <Profile
                name={user?.name || 'Super Admin TKI'}
                description={user?.email || 'Super Admin TKI'}
                showAvatar={false}
                className="mb-1 border-b border-border-super-admin px-4 py-2"
                nameClassName="font-sans text-xs font-semibold text-ink-super-admin"
                descriptionClassName="text-[10px] text-muted-super-admin"
              />

              <div className="px-1.5 space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/super-admin/platform-settings');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-ink-super-admin hover:bg-surface-super-admin rounded-lg transition-colors flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Pengaturan Platform</span>
                </button>

                <div className="border-t border-border-super-admin my-1" />

                <button
                  variant="danger"
                  type="button"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-error-foreground hover:bg-error-surface rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar / Logout</span>
                </button>
              </div>

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
            </div>

          )}
        </div>

      </div>
    </header>
  );
}
