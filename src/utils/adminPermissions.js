const ROLE_PERMISSIONS = {
  admin_institusi: ['*'],
  pimpinan: ['dashboard:view', 'application:view', 'selection:view', 'payment:view', 'rereg:view', 'report:view'],
  petugas: ['dashboard:view', 'application:view', 'application:verify', 'application:request_correction', 'selection:view', 'payment:view', 'rereg:view', 'rereg:verify'],
};

export function hasAdminPermission(user, permission) {
  const assigned = Array.isArray(user?.permissions) ? user.permissions : ROLE_PERMISSIONS[user?.role] ?? [];
  return assigned.includes('*') || assigned.includes(permission);
}
