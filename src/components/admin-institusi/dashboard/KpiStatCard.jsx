import React from 'react';

const TONE_MAP = {
  info: {
    pillBg: 'bg-info-surface border-info-border',
    dot: 'bg-primary-admin-institusi',
  },
  warning: {
    pillBg: 'bg-warning-surface border-warning-border',
    dot: 'bg-warning',
  },
  success: {
    pillBg: 'bg-success-surface border-success-border',
    dot: 'bg-success',
  },
  error: {
    pillBg: 'bg-error-surface border-error-border',
    dot: 'bg-error',
  },
};

export default function KpiStatCard({ title, value, subtitle, tone = 'info' }) {
  const style = TONE_MAP[tone] || TONE_MAP.info;

  return (
    <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-5 shadow-xs hover:border-info-border transition-colors flex flex-col justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <span
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${style.pillBg}`}
        >
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
        </span>
        <span className="text-xs font-bold text-ink-super-admin">{title}</span>
      </div>

      <div className="flex items-baseline justify-between gap-2 pt-1">
        <span className="text-2xl sm:text-3xl font-semibold text-ink-super-admin tracking-tight">
          {value}
        </span>
        <span className="text-[11px] text-muted-super-admin text-right leading-tight">
          {subtitle}
        </span>
      </div>
    </div>
  );
}