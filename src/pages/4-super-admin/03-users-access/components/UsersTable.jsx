// src/pages/super-admin/03-users-access/components/UsersTable.jsx
import React from 'react';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

export default function UsersTable({ userList, onOpenDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE5D8] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap font-sans">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#ECE5D8] text-[#8C7A6B] uppercase text-[10px] font-bold tracking-wider">
              <th className="py-3.5 px-5">Pengguna</th>
              <th className="py-3.5 px-5">Peran</th>
              <th className="py-3.5 px-5">Tenant</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0E8]">
            {userList.length > 0 ? (
              userList.map((user) => {
                const initial = user.name.charAt(0).toUpperCase();
                return (
                  <tr key={user.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    
                    {/* Pengguna (Avatar + Nama + Email) */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${user.avatarBg} ${user.avatarColor} font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-black/5`}
                        >
                          {initial}
                        </div>
                        <div>
                          <p className="font-bold text-[#2B2118] text-xs font-sans">{user.name}</p>
                          <p className="text-[11px] text-[#8C7A6B]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Peran Platform / Tenant */}
                    <td className="py-3.5 px-5 font-semibold text-[#3A2E2B]">
                      {user.role}
                    </td>

                    {/* Tenant */}
                    <td className="py-3.5 px-5 text-[#6E5A44]">
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
                        className="px-4 py-1 text-[11px] bg-white border-[#D6CBB8]"
                      >
                        Detail
                      </Button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-[#8C7A6B] text-xs">
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