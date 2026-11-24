import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const HOME_PATH_BY_ROLE = {
  super_admin: '/super-admin/dashboard',
  admin_institusi: '/admin-institusi/dashboard',
  santri: '/santri/beranda',
};

export default function ProtectedRoute({ allowedRoles, loginPath }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={HOME_PATH_BY_ROLE[user.role] || '/landing-page'} replace />;
  }

  return <Outlet />;
}
