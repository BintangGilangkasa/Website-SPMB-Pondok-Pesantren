import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BADGE_TONES = {
  warning: 'bg-warning-surface text-warning-foreground border-warning-border',
  info: 'bg-info-surface text-info-foreground border-info-border',
  error: 'bg-error-surface text-error-foreground border-error-border',
};

export default function PendingAttentionCard({
  title = 'Perlu Perhatian',
  subtitle = 'Pekerjaan yang masih tertunda',
  items = [],
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="mb-4">
        <h2 className="text-sm sm:text-base font-bold text-ink-super-admin">{title}</h2>
        <p className="text-xs text-muted-super-admin mt-0.5">{subtitle}</p>
      </div>

      <div className="space-y-3 my-auto">
        {items.map((item) => {
          const badgeClass = BADGE_TONES[item.tone] || BADGE_TONES.warning;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => item.path && navigate(item.path)}
              className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted-super-admin hover:bg-surface-accent-super-admin border border-border-super-admin hover:border-info-border transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`min-w-9 h-9 px-2 rounded-lg border flex items-center justify-center text-xs font-extrabold shrink-0 ${badgeClass}`}
                >
                  {item.count}
                </span>
                <span className="text-xs font-bold text-ink-super-admin group-hover:text-primary-admin-institusi truncate">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-super-admin group-hover:text-primary-admin-institusi shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}