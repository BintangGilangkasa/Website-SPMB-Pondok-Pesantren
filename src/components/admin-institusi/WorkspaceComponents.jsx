import React from 'react';
import { Badge, Input, PageHeader, Select } from '@/components/ui';

export function ModuleHeader({ code, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border-super-admin pb-4 sm:flex-row sm:items-end sm:justify-between">
      <PageHeader role={code} title={title} description={description} />
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function WorkspaceNotice({ children = 'Data contoh untuk pratinjau alur. Perubahan disimpan di browser ini dan belum dikirim ke server.' }) {
  return <p className="rounded-lg border border-info-border bg-info-surface px-4 py-3 text-xs leading-relaxed text-info-foreground" role="note">{children}</p>;
}

export function StatusPill({ children }) {
  const label = children || 'Belum ada status';
  return <Badge variant={label} className="inline-flex min-h-7 items-center rounded-md px-2.5 py-1 text-xs">{label}</Badge>;
}

export function StatTile({ label, value, detail }) {
  return (
    <section className="rounded-xl border border-border-super-admin bg-white p-4">
      <p className="text-xs font-semibold text-muted-super-admin">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-ink-super-admin">{value}</p>
      {detail && <p className="mt-1 text-xs text-muted-super-admin">{detail}</p>}
    </section>
  );
}

export function EmptyTable({ colSpan, query }) {
  return <tr><td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-muted-super-admin">{query ? 'Tidak ada data yang cocok dengan pencarian atau filter.' : 'Belum ada data untuk ditampilkan.'}</td></tr>;
}

export function SectionCard({ title, description, actions, children }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border-super-admin bg-white">
      {(title || actions) && <header className="flex flex-col gap-2 border-b border-border-super-admin px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div>{title && <h2 className="text-sm font-bold text-ink-super-admin">{title}</h2>}{description && <p className="mt-1 text-xs text-muted-super-admin">{description}</p>}</div>{actions}</header>}
      {children}
    </section>
  );
}

export function InputField({ label, value, onChange, type = 'text', placeholder, required, min, className = '' }) {
  const id = React.useId();
  return (
    <div className={className}>
      <Input
        id={id}
        name={id}
        label={label}
        type={type}
        value={value ?? ''}
        min={min}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(type === 'number' ? (event.target.value === '' ? '' : Number(event.target.value)) : event.target.value)}
        className="min-h-11 bg-white text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options, className = '', disabled = false }) {
  const id = React.useId();
  return (
    <div className={`block space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-xs font-semibold text-ink-super-admin">{label}</label>
      <Select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        options={options}
        variant="unstyled"
        className="min-h-11 w-full rounded-lg border border-[#818D9A] bg-white px-3 py-2 text-sm text-ink-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi disabled:cursor-not-allowed disabled:bg-surface-muted-super-admin"
      />
    </div>
  );
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(amount) || 0);
}
