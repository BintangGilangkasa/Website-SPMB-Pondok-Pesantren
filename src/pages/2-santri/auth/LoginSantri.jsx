import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';
import PasswordInput from '../../../components/ui/PasswordInput';
import AuthAlert from '../../../components/ui/AuthAlert';

export default function LoginSantri() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ contact: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contact.trim() || !formData.password.trim()) {
      setErrorMsg('Email atau nomor WhatsApp serta kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        'user_data',
        JSON.stringify({ name: 'Wali Santri', role: 'santri', contact: formData.contact })
      );
      navigate('/santri/beranda');
    }, 800);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold leading-tight text-landing-ink sm:text-3xl">
          Selamat datang kembali.
        </h2>
        <p className="mt-2 text-sm leading-6 text-landing-muted">
          Masuk menggunakan akun Wali untuk melanjutkan pendaftaran calon santri.
        </p>
      </div>

      <AuthAlert type="error" message={errorMsg} />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="santri-contact" className="block text-sm font-semibold text-landing-ink">
            Email atau Nomor WhatsApp
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-landing-muted">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="santri-contact"
              name="contact"
              autoComplete="username"
              value={formData.contact}
              onChange={handleChange}
              placeholder="contoh@email.com atau 0812xxxx"
              className="min-h-12 w-full rounded-xl border border-[#818D9A] bg-landing-paper/60 py-3 pl-10 pr-4 text-sm text-landing-ink outline-none transition-colors placeholder:text-landing-muted focus:bg-landing-surface focus:border-primary-portal-santri focus:ring-2 focus:ring-primary-portal-santri/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-landing-ink">Kata Sandi</label>
            <Link
              to="/forgot-password"
              className="inline-flex min-h-11 items-center text-xs font-bold text-landing-brand hover:text-landing-brand-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
            >
              Lupa kata sandi?
            </Link>
          </div>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            focusRingClass="focus:border-primary-portal-santri focus:ring-primary-portal-santri/15  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="min-h-12 w-full rounded-xl bg-primary-portal-santri py-3 text-on-emphasis-super-admin hover:bg-landing-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
        >
          <span>Masuk ke Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-landing-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-landing-surface px-3 text-landing-muted">Belum punya akun wali?</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={() => navigate('/register')}
        className="min-h-12 w-full rounded-xl border-landing-border bg-landing-brand-soft py-3 text-landing-brand hover:bg-info-border/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
      >
        Buat Akun Wali Baru
      </Button>

      <p className="text-center text-xs leading-5 text-landing-muted">
        Halaman ini khusus untuk orang tua / wali santri, bukan untuk staf internal pesantren.
      </p>
    </div>
  );
}
