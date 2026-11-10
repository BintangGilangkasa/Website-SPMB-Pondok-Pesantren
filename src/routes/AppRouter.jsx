import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import SuperAdminLayout from "../layouts/SuperAdminLayout";

// Pages Super Admin
import DashboardPlatform from "../pages/4-super-admin/01-dashboard/DashboardPlatform";
import TenantManagement from "../pages/4-super-admin/02-tenant/TenantManagement";
import UsersAndAccess from "../pages/4-super-admin/03-users-access/UsersAndAccess";
import TransactionsMonitoring from "../pages/4-super-admin/04-transactions/TransactionsMonitoring";
import PlatformSettings from "../pages/4-super-admin/05-platform-settings/PlatformSettings";


export default function AppRoutes() {
  return (
      <Routes>
        {/* 3. SUPER ADMIN TKI */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPlatform />} />
          <Route path="tenant" element={<TenantManagement />} />
          <Route path="users-access" element={<UsersAndAccess />} />
          <Route path="transactions" element={<TransactionsMonitoring />} />
          <Route path="platform-settings" element={<PlatformSettings />} />
          
        {/* 404 Not Found */}
        </Route>
      </Routes>
  );
}