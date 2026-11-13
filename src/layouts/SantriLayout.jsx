import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SantriSidebar from '../components/layout/santri/Sidebar';
import SantriNavbar from '../components/layout/santri/Navbar';

export default function SantriLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-super-admin">
      {/* Sidebar Khusus Portal Santri */}
      <SantriSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Navbar Khusus Portal Santri (Ada Dropdown Anak A/B) */}
        <SantriNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet /> {/* Halaman Beranda, Pendaftaran, Pembayaran Santri */}
        </main>
      </div>
    </div>
  );
}