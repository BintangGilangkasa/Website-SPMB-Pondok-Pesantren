import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/admin-institusi/AdminSidebar';
import AdminNavbar from '../components/layout/admin-institusi/AdminNavbar';

export default function AdminInstitusiLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Khusus Back Office Admin Pesantren */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Navbar Khusus Admin Pesantren (Ada Filter Tahun Ajaran/Gelombang) */}
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-6">
          <Outlet /> {/* Halaman Verifikasi Berkas, Gelombang, Pembayaran Admin */}
        </main>
      </div>
    </div>
  );
}