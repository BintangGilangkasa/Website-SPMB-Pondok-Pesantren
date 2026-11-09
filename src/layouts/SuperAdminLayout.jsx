// src/layouts/SuperAdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/super-admin/Sidebar';
import Navbar from '../components/layout/super-admin/Navbar';

export default function SuperAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Pembungkus Utama: Memenuhi seluruh tinggi layar (h-screen) & cegah scroll luar
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5]">
      
      {/* 1. Sidebar Kiri (Berdiri utuh dari atas ke bawah) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 2. Area Kanan (Navbar + Konten Utama) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar / Header Atas */}
        <Navbar 
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} 
        />
        
        {/* Main Content (Tempat Halaman SA-01 s/d SA-05 Dirender) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}