import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function PasswordInput({
  label = 'Kata Sandi',
  name = 'password',
  value,
  onChange,
  placeholder = 'Masukkan kata sandi',
  error = '',
  focusRingClass = 'focus:border-primary-super-admin focus:ring-info-border/50',
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-super-admin">
          <Lock className="w-4 h-4" />
        </div>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
          className={`w-full pl-10 pr-11 py-3 text-sm text-ink-super-admin bg-surface-muted-super-admin border rounded-xl outline-none focus:bg-surface-super-admin focus:ring-4 transition-all ${
            error
              ? 'border-error focus:ring-error-border/50'
              : `border-border-super-admin ${focusRingClass}`
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-super-admin hover:text-ink-super-admin cursor-pointer"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-[11px] font-medium text-error-foreground">{error}</p>}
    </div>
  );
}