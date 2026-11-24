import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import SantriAuthLayout from '../layouts/SantriAuthLayout';
import AdminInstitusiLayout from '../layouts/AdminInstitusiLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

// 1. Public Landing Page
import LandingPage from '../pages/public/LandingPage';

// 2. Auth Pages (3 Pintu Masuk Terpisah)
import LoginSantri from '../pages/santri/auth/LoginSantri';
import RegistrationSantri from '../pages/santri/auth/RegistrationSantri';
import ForgotPasswordSantri from '../pages/santri/auth/ForgotPasswordSantri';
import BerandaPage from '../pages/santri/beranda/BerandaPage';
import LoginAdmin from '../pages/admin-institusi/auth/LoginAdmin';
import LoginSuperAdmin from '../pages/super-admin/auth/LoginSuperAdmin';
import ResetPasswordSuperAdmin from '../pages/super-admin/auth/ResetPasswordSuperAdmin';

// 3. Pages Admin Institusi
import DashboardAdminInstitusi from '../pages/admin-institusi/Operasional/DashboardAdminInstitusi';
import PendaftarPlatform from '../pages/admin-institusi/Operasional/PendaftarPlatform'
import SeleksiHasil from '../pages/admin-institusi/Operasional/SeleksiHasil';
import PembayaranPlatform from '../pages/admin-institusi/Operasional/PembayaranPlatform';
import DaftarUlang from '../pages/admin-institusi/Operasional/DaftarUlang';
import Laporan from '../pages/admin-institusi/Operasional/Laporan';
import CmsLandingPage from '../pages/admin-institusi/konfiguration/CmsLandingPage';

// 4. Pages Super Admin TKI
import DashboardPlatform from '../pages/super-admin/dashboard/DashboardPlatform';
import TenantManagement from '../pages/super-admin/tenant/TenantManagement';
import UsersAndAccess from '../pages/super-admin/users-access/UsersAndAccess';
import TransactionsMonitoring from '../pages/super-admin/transactions/TransactionsMonitoring';
import PlatformSettings from '../pages/super-admin/platform-settings/PlatformSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect Root ke Landing Page */}
      <Route path="/" element={<Navigate to="/landing-page" replace />} />

      {/* 1. LANDING PAGE PUBLIK */}
      <Route path="/landing-page" element={<LandingPage />} />

      {/* 2. AUTH PORTAL WALI & SANTRI (Split Screen Layout) */}
      <Route element={<SantriAuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginSantri />} />
          <Route path="/register" element={<RegistrationSantri />} />
          <Route path="/forgot-password" element={<ForgotPasswordSantri />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['santri']} loginPath="/login" />}>
        <Route path="/santri/beranda" element={<BerandaPage />} />
      </Route>

      {/* 3. ADMIN INSTITUSI (BACK OFFICE) */}
      <Route element={<GuestRoute />}>
        <Route path="/admin-institusi/login" element={<LoginAdmin />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin_institusi']} loginPath="/admin-institusi/login" />}>
        <Route path="/admin-institusi" element={<AdminInstitusiLayout />}>
          <Route index element={<Navigate to="/admin-institusi/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardAdminInstitusi />} />
          <Route path="pendaftar" element={<PendaftarPlatform />}/>
          <Route path="seleksi-hasil" element={<SeleksiHasil />} />
          <Route path="pembayaran" element={<PembayaranPlatform />} />
          <Route path="daftar-ulang" element={<DaftarUlang />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="landing-page" element={<CmsLandingPage />} />
        </Route>
      </Route>

      {/* 4. SUPER ADMIN TKI */}
      <Route element={<GuestRoute />}>
        <Route path="/super-admin/login" element={<LoginSuperAdmin />} />
      </Route>
      <Route path="/super-admin/reset-password" element={<ResetPasswordSuperAdmin />} />
      <Route element={<ProtectedRoute allowedRoles={['super_admin']} loginPath="/super-admin/login" />}>
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPlatform />} />
          <Route path="tenant" element={<TenantManagement />} />
          <Route path="users-access" element={<UsersAndAccess />} />
          <Route path="transactions" element={<TransactionsMonitoring />} />
          <Route path="platform-settings" element={<PlatformSettings />} />
        </Route>
      </Route>

      {/* 5. FALLBACK 404 */}
      <Route path="*" element={<Navigate to="/landing-page" replace />} />
    </Routes>
  );
}
