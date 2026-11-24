import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function OfferingSummaryTable({
  title = 'Ringkasan per Pilihan Penerimaan',
  subtitle = 'Data ringkas, buka modul terkait untuk pemeriksaan detail.',
  reportPath = '/admin-institusi/laporan',
  rows = [],
}) {
  return (
    <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-ink-super-admin">{title}</h2>
          <p className="text-xs text-muted-super-admin mt-0.5">{subtitle}</p>
        </div>

        <Link
          to={reportPath}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary-admin-institusi hover:text-primary-hover-super-admin transition-colors"
        >
          <span>Lihat laporan</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="bg-surface-muted-super-admin border-y border-border-super-admin text-muted-super-admin font-semibold">
              <th className="py-3 px-4 rounded-l-lg">Offering</th>
              <th className="py-3 px-4">Pengajuan</th>
              <th className="py-3 px-4">Terverifikasi</th>
              <th className="py-3 px-4">Diterima</th>
              <th className="py-3 px-4">Daftar Ulang</th>
              <th className="py-3 px-4">Kuota</th>
              <th className="py-3 px-4">Reserved</th>
              <th className="py-3 px-4">Confirmed</th>
              <th className="py-3 px-4 rounded-r-lg">Tersedia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-super-admin">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.offering}
                  className="hover:bg-surface-accent-super-admin/60 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-ink-super-admin">{row.offering}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.pengajuan}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">
                    {row.terverifikasi}
                  </td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.diterima}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.daftarUlang}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.kapasitas ?? 0}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.reserved ?? 0}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.confirmed ?? 0}</td>
                  <td className="py-3.5 px-4 text-ink-super-admin font-medium">{row.tersedia ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-muted-super-admin">
                  Tidak ada data pilihan penerimaan untuk filter yang dipilih.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
