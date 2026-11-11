    // src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setIsDropdownOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
            <div className="w-8 h-8 rounded-full bg-sidebar-super-admin text-sidebar-foreground-super-admin font-serif font-bold text-xs flex items-center justify-center shadow-xs">
              SA
            </div>

            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-ink-super-admin">
                Super Admin TKI
              </span>
              <span className="text-[10px] text-muted-super-admin mt-0.5">
                platform_owner
              </span>
            </div>

            <span className={`text-[10px] text-muted-super-admin transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Menu Dropdown Melayang */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-super-admin rounded-xl shadow-lg border border-border-super-admin py-2 z-50">
              <div className="px-4 py-2 border-b border-border-super-admin mb-1">
                <p className="text-xs font-serif font-bold text-ink-super-admin">Super Admin TKI</p>
                <p className="text-[10px] text-muted-super-admin truncate">admin@spmbtki.id</p>
              </div>

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
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-error-foreground hover:bg-error-surface rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}