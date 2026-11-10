import React from 'react';
import { Card, CardContent } from '../../../../components/ui';
import Button from '../../../../components/ui/Button';
import { BookAlert, } from 'lucide-react';

export default function MetricCard({ title, value, desc, actionText = "Lihat Detail", actionIcon }) {
  return (
    <Card className="hover:border-border-super-admin transition-all flex flex-col justify-between">
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold tracking-wider text-muted-super-admin uppercase font-sans">
              {title}
            </span>
            <span className="w-6 h-6 rounded-full bg-surface-super-admin border border-border-super-admin flex items-center justify-center text-[10px] text-muted-super-admin">
              <BookAlert className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-3xl font-semibold text-ink-super-admin mb-1">
            {value}
          </div>
          <p className="text-[11px] text-muted-super-admin leading-snug">
            {desc}
          </p>
        </div>

        <Button variant="secondary" size="sm" className="mt-4 w-max">
          {actionText} {actionIcon}
        </Button>
      </CardContent>
    </Card>
  );
}