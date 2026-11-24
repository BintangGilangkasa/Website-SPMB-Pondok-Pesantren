import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const HOME_PATH_BY_ROLE = {
  super_admin: '/super-admin/dashboard',
  admin_institusi: '/admin-institusi/dashboard',
  santri: '/santri/beranda',
};

export default function GuestRoute() {
  const { user } = useAuth();

  if (!user) return <Outlet />;

  return <Navigate to={HOME_PATH_BY_ROLE[user.role] || '/landing-page'} replace />;
}
