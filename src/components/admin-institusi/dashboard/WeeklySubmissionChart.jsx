import React from 'react';
import { Badge } from '@/components/ui';

export default function WeeklySubmissionChart({
  title = 'Perkembangan Pengajuan',
  subtitle = 'Jumlah pengajuan masuk per minggu',
  periodLabel = '8 minggu',
  data = [],
}) {
  const maxVal = Math.max(...data.map((d) => d.count), 1);
  const hasData = data.some((item) => item.count > 0);

  return (
    <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-ink-super-admin">{title}</h2>
          <p className="text-xs text-muted-super-admin mt-0.5">{subtitle}</p>
        </div>
        <Badge variant="info">{periodLabel}</Badge>
      </div>

      {!hasData ? (
        <p className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border-super-admin px-5 text-center text-sm text-muted-super-admin" role="status">
          Belum ada pengajuan pada periode dan filter ini.
        </p>
      ) : (
      <>
      {/* Area Grafik Batang */}
      <div className="relative pt-6">
        {/* Garis bantu horizontal */}
        <div className="absolute inset-x-0 top-6 bottom-6 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="w-full border-b border-border-super-admin/70" />
          ))}
        </div>

        <div className="relative h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4">
          {data.map((item) => {
            const heightPercent = Math.max(Math.round((item.count / maxVal) * 100), 8);
            return (
              <div
                key={item.week}
                className="flex-1 flex flex-col items-center h-full justify-end group"
              >
                {/* Tooltip jumlah saat hover */}
                <span className="mb-1.5 px-2 py-0.5 rounded bg-sidebar-deep-super-admin text-on-emphasis-super-admin text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.count}
                </span>

                {/* Batang Chart */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-9 rounded-t-md bg-primary-admin-institusi group-hover:bg-primary-hover-super-admin transition-all duration-300"
                />

                {/* Label Minggu (M1..M8) */}
                <span className="mt-2.5 text-[11px] font-semibold text-muted-super-admin">
                  {item.week}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}
    </div>
  );
}
