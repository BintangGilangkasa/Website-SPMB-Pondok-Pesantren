import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import SantriAuthLayout from '../pages/2-santri/auth/SantriAuthLayout';
import AdminInstitusiLayout from '../layouts/AdminInstitusiLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

// 1. Public Landing Page
import LandingPage from '../pages/1-public/LandingPage';

// 2. Auth Pages (3 Pintu Masuk Terpisah)
import LoginSantri from '../pages/2-santri/auth/LoginSantri';
import LoginAdmin from '../pages/3-admin-institusi/auth/LoginAdmin';
import LoginSuperAdmin from '../pages/4-super-admin/auth/LoginSuperAdmin';

// 3. Pages Admin Institusi
import CmsLandingPage from '../pages/3-admin-institusi/cms-landing/CmsLandingPage';

// 4. Pages Super Admin TKI
import ResetPasswordSuperAdmin from '../pages/4-super-admin/auth/ResetPasswordSuperAdmin';
import DashboardPlatform from '../pages/4-super-admin/01-dashboard/DashboardPlatform';
import TenantManagement from '../pages/4-super-admin/02-tenant/TenantManagement';
import UsersAndAccess from '../pages/4-super-admin/03-users-access/UsersAndAccess';
import TransactionsMonitoring from '../pages/4-super-admin/04-transactions/TransactionsMonitoring';
import PlatformSettings from '../pages/4-super-admin/05-platform-settings/PlatformSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect Root ke Landing Page */}
      <Route path="/" element={<Navigate to="/landing-page" replace />} />

      {/* 1. LANDING PAGE PUBLIK */}
      <Route path="/landing-page" element={<LandingPage />} />

      {/* 2. AUTH PORTAL WALI & SANTRI (Split Screen Layout) */}
      <Route element={<SantriAuthLayout />}>
        <Route path="/login" element={<LoginSantri />} />
        {/* Nanti tambahkan /register, /verify-otp, /forgot-password di sini */}
      </Route>

      {/* 3. ADMIN INSTITUSI (BACK OFFICE) */}
      <Route path="/admin-institusi/login" element={<LoginAdmin />} />
      <Route path="/admin-institusi" element={<AdminInstitusiLayout />}>
        <Route index element={<Navigate to="/admin-institusi/landing-page" replace />} />
        <Route path="landing-page" element={<CmsLandingPage />} />
      </Route>

      {/* 4. SUPER ADMIN TKI */}
      <Route path="/super-admin/login" element={<LoginSuperAdmin />} />
      <Route path="/super-admin/reset-password" element={<ResetPasswordSuperAdmin />} />
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPlatform />} />
        <Route path="tenant" element={<TenantManagement />} />
        <Route path="users-access" element={<UsersAndAccess />} />
        <Route path="transactions" element={<TransactionsMonitoring />} />
        <Route path="platform-settings" element={<PlatformSettings />} />
      </Route>

      {/* 5. FALLBACK 404 (Letakkan di luar layout mana pun) */}
      <Route path="*" element={<Navigate to="/landing-page" replace />} />
    </Routes>
  );
} 