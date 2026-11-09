// src/pages/super-admin/01-dashboard/components/MetricCard.jsx
import React from 'react';
import { Card, CardContent } from '../../../../components/ui';
import Button from '../../../../components/ui/Button';

export default function MetricCard({ title, value, desc, actionText = "Lihat Detail →" }) {
  return (
    <Card className="hover:border-[#D0C4B0] transition-all flex flex-col justify-between">
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold tracking-wider text-[#8C7A6B] uppercase font-sans">
              {title}
            </span>
            <span className="w-6 h-6 rounded-full bg-[#FAF6F0] border border-[#EADFCF] flex items-center justify-center text-[10px] text-[#8C7A6B]">
              📋
            </span>
          </div>
          <div className="text-3xl font-semibold text-[#2B2118] mb-1">
            {value}
          </div>
          <p className="text-[11px] text-[#9A8B7C] leading-snug">
            {desc}
          </p>
        </div>

        <Button variant="secondary" size="sm" className="mt-4 w-max">
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
}