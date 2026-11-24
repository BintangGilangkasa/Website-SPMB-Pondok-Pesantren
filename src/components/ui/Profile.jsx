import React from 'react';
import { UserRound } from 'lucide-react';

export default function Profile({
  name = 'Nama Pengguna',
  description = 'Role Pengguna',
  avatarIcon: AvatarIcon = UserRound,
  showAvatar = true,
  className = 'gap-2',
  avatarClassName = 'h-8 w-8 rounded-full border border-border-super-admin bg-surface-super-admin text-muted-super-admin',
  iconClassName = 'h-4 w-4',
  detailsClassName = 'flex min-w-0 flex-col',
  nameClassName = 'text-xs font-semiold text-ink-super-admin',
  descriptionClassName = 'text-[11px] text-muted-super-admin',
}) {
  const displayName = typeof name === 'string' ? name : '';

  return (
    <div className={`flex min-w-0 items-center ${className}`}>
      {showAvatar && (
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center ${avatarClassName}`}
        >
          <AvatarIcon aria-hidden="true" className={iconClassName} />
        </div>
      )}

      <div className={`min-w-0 ${detailsClassName}`}>
        <span className={`truncate ${nameClassName}`}>{displayName}</span>
        {description && (
          <span className={`truncate ${descriptionClassName}`}>
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
