// src/pages/super-admin/02-tenant/components/TenantTable.jsx
import React from 'react';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

export default function TenantTable({ tenantList, onOpenDetail }) {
  return (
    <div className="bg-surface-super-admin rounded-2xl border border-border-super-admin shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap font-sans">
          <thead>
            <tr className="bg-surface-super-admin border-b border-border-super-admin text-muted-super-admin uppercase text-[10px] font-bold tracking-wider">
              <th className="py-3.5 px-5">Nama pesantren</th>
              <th className="py-3.5 px-5">Alamat portal</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5">Zona waktu</th>
              <th className="py-3.5 px-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-super-admin">
            {tenantList.length > 0 ? (
              tenantList.map((item) => (
                <tr key={item.id} className="hover:bg-surface-super-admin/80 transition-colors">
                  
                  {/* Nama Pesantren & Code */}
                  <td className="py-3.5 px-5">
                    <p className="font-bold text-ink-super-admin text-xs font-serif">{item.name}</p>
                    <p className="text-[10px] font-mono text-muted-super-admin">{item.code}</p>
                  </td>

                  {/* Slug / Alamat Portal */}
                  <td className="py-3.5 px-5 font-mono text-primary-super-admin">
                    /{item.slug}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-5">
                    <Badge variant={item.status}>
                      {item.status === 'AKTIF' && '• Aktif'}
                      {item.status === 'BELUM_AKTIF' && '• Belum Aktif'}
                      {item.status === 'TERTANGGUHKAN' && '• Ditangguhkan'}
                    </Badge>
                  </td>

                  {/* Timezone */}
                  <td className="py-3.5 px-5 text-muted-super-admin">
                    {item.default_timezone}
                  </td>

                  {/* Tombol Aksi Detail */}
                  <td className="py-3.5 px-5 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenDetail(item)}
                      className="px-4 py-1 text-[11px] bg-surface-super-admin border-border-super-admin"
                    >
                      Detail
                    </Button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-muted-super-admin text-xs">
                  Tidak ada data pesantren yang sesuai dengan kriteria pencarian/filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}