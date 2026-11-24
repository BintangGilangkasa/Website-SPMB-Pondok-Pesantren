import PortalLayout from './PortalLayout';
import { Outlet } from 'react-router-dom';
import { AdminInstitusiNavbar, AdminInstitusiSidebar } from '@/components/layout';

export default function AdminInstitusiLayout() {
  return (
    <PortalLayout
      Sidebar={AdminInstitusiSidebar}
      Navbar={AdminInstitusiNavbar}
      mainClassName="p-4 sm:p-6"
    >
      <Outlet />
    </PortalLayout>
  );
}
