import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminInstitusiSidebar from '../components/layout/admin-institusi/AdminInstitusiSidebar';
import AdminInstitusiNavbar from '../components/layout/admin-institusi/AdminInstitusiNavbar';

export default function AdminInstitusiLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-surface-muted-super-admin">
      <AdminInstitusiSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <AdminInstitusiNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
