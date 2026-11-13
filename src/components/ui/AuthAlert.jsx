import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthAlert({ type = 'error', message }) {
  if (!message) return null;

  const isError = type === 'error';
  return (
    <div
      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs leading-relaxed ${
        isError
          ? 'bg-error-surface border-error-border text-error-foreground'
          : 'bg-success-surface border-success-border text-success-foreground'
      }`}
    >
      {isError ? (
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
      ) : (
        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-success" />
      )}
      <p className="font-medium">{message}</p>
    </div>
  );
}