// src/pages/super-admin/03-users-access/components/UsersTable.jsx
import React from 'react';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

export default function UsersTable({ userList, onOpenDetail }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl border border-border-super-admin shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap font-sans">
          <thead>
            <tr className="bg-surface-super-admin border-b border-border-super-admin text-muted-super-admin uppercase text-[10px] font-bold tracking-wider">
              <th className="py-3.5 px-5">Pengguna</th>
              <th className="py-3.5 px-5">Peran</th>
              <th className="py-3.5 px-5">Tenant</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-super-admin">
            {userList.length > 0 ? (
              userList.map((user) => {
                const initial = user.name.charAt(0).toUpperCase();
                return (
                  <tr key={user.id} className="hover:bg-surface-super-admin/80 transition-colors">
                    
                    {/* Pengguna (Avatar + Nama + Email) */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${user.avatarBg} ${user.avatarColor} font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-border-subtle-super-admin`}
                        >
                          {initial}
                        </div>
                        <div>
                          <p className="font-bold text-ink-super-admin text-xs font-sans">{user.name}</p>
                          <p className="text-[11px] text-muted-super-admin">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Peran Platform / Tenant */}
                    <td className="py-3.5 px-5 font-semibold text-ink-super-admin">
                      {user.role}
                    </td>

                    {/* Tenant */}
                    <td className="py-3.5 px-5 text-muted-super-admin">
                      {user.tenant}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-5">
                      <Badge variant={user.status === 'AKTIF' ? 'AKTIF' : 'danger'}>
                        {user.status === 'AKTIF' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>

                    {/* Tombol Tindakan */}
                    <td className="py-3.5 px-5 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenDetail(user)}
                        className="px-4 py-1 text-[11px] bg-surface-super-admin border-border-super-admin"
                      >
                        Detail
                      </Button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-muted-super-admin text-xs">
                  Tidak ada pengguna platform yang sesuai dengan kriteria pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}