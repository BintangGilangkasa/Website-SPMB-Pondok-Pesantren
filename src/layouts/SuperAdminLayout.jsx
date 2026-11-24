import PortalLayout from './PortalLayout';
import { Outlet } from 'react-router-dom';
import { SuperAdminNavbar, SuperAdminSidebar } from '@/components/layout';

export default function SuperAdminLayout() {
  return (
    <PortalLayout
      Sidebar={SuperAdminSidebar}
      Navbar={SuperAdminNavbar}
      mainClassName="p-4 sm:p-6 lg:p-8"
    >
      <Outlet />
    </PortalLayout>
  );
}
