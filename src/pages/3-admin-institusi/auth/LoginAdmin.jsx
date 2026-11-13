import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';
import PasswordInput from '../../../components/ui/PasswordInput';
import AuthAlert from '../../../components/ui/AuthAlert';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [alertState, setAlertState] = useState({ type: 'error', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setAlertState({ type: 'error', message: 'Email staf dan kata sandi wajib diisi.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        'user_data',
        JSON.stringify({
          name: 'Admin Panitia Al-Falah',
          email: formData.email,
          role: 'admin_institusi',
          tenant: 'al-falah',
        })
      );
      navigate('/admin/dashboard');
    }, 800);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setAlertState({
      type: 'success',
      message: `Instruksi pemulihan sandi telah dikirim ke ${resetEmail}.`,
    });
  };

  return (
    <div className="min-h-dvh bg-background-super-admin font-sans text-ink-super-admin lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <aside className="hidden min-h-dvh flex-col justify-between bg-sidebar-deep-super-admin px-10 py-10 text-sidebar-foreground-super-admin lg:flex xl:px-14 xl:py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-admin-institusi text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-xl font-bold leading-none tracking-tight">
              spmb<span className="text-secondary-admin-institusi">.</span>
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-sidebar-muted-super-admin">
              BACK OFFICE INSTITUSI
            </p>
          </div>
        </div>

        <div className="my-12 max-w-xl">
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-secondary-admin-institusi">
            PENERIMAAN SANTRI BARU
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight xl:text-5xl">
            Back Office Pesantren
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-sidebar-muted-super-admin">
            Panel panitia SPMB dan verifikasi administrasi.
          </p>
        </div>

        <div className="border-t border-sidebar-border-super-admin/40 pt-5 text-xs text-sidebar-muted-super-admin">
          SPMB Multi-Tenant · Panel Operasional Institusi
        </div>
      </aside>

      <main className="flex min-h-dvh flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-14">
        <header className="mx-auto flex min-h-11 w-full max-w-md items-center justify-between gap-3 lg:max-w-xl">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-2 text-xs font-semibold text-muted-super-admin transition-colors hover:text-ink-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Beranda Publik</span>
          </button>
          <span className="text-right text-[10px] font-bold tracking-[0.12em] text-primary-admin-institusi sm:text-xs">
            BACK OFFICE
          </span>
        </header>

        <section className="mx-auto flex w-full max-w-md flex-1 items-center py-5 sm:py-8 lg:max-w-xl">
          <div className="w-full rounded-3xl border border-border-super-admin bg-surface-super-admin p-5 shadow-xl shadow-sidebar-deep-super-admin/5 sm:p-8 lg:p-10 [&_input]:border-[#818D9A] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-primary-admin-institusi">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-info-surface text-primary-admin-institusi">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-ink-super-admin sm:text-2xl">
                  Masuk ke Back Office
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted-super-admin">
                  Akun staf dan panitia institusi
                </p>
              </div>
            </div>

            <AuthAlert type={alertState.type} message={alertState.message} />

            {!isForgotMode ? (
              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <label htmlFor="admin-email" className="block text-sm font-semibold text-ink-super-admin">
                    Email Staf / Panitia
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-super-admin">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="username"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setAlertState({ type: 'error', message: '' });
                      }}
                      placeholder="panitia@pesantren.sch.id"
                      className="min-h-12 w-full rounded-xl border border-[#818D9A] bg-surface-muted-super-admin py-3 pl-10 pr-4 text-sm text-ink-super-admin outline-none transition-colors placeholder:text-muted-super-admin focus:border-primary-admin-institusi focus:bg-surface-super-admin focus:ring-2 focus:ring-primary-admin-institusi/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <label className="block text-sm font-semibold text-ink-super-admin">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setAlertState({ type: 'error', message: '' });
                      }}
                      className="inline-flex min-h-11 items-center text-xs font-bold text-info-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                    >
                      Lupa sandi?
                    </button>
                  </div>
                  <PasswordInput
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setAlertState({ type: 'error', message: '' });
                    }}
                    focusRingClass="focus:border-primary-admin-institusi focus:ring-primary-admin-institusi/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  className="mt-1 min-h-12 w-full rounded-xl bg-primary-admin-institusi py-3 text-on-emphasis-super-admin hover:bg-primary-hover-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  <span>Masuk ke Back Office</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink-super-admin">Pulihkan kata sandi</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-super-admin">
                    Masukkan email staf yang terdaftar.
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="admin-reset-email" className="block text-sm font-semibold text-ink-super-admin">
                    Email Staf Terdaftar
                  </label>
                  <input
                    id="admin-reset-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="panitia@pesantren.sch.id"
                    className="min-h-12 w-full rounded-xl border border-[#818D9A] bg-surface-muted-super-admin px-4 py-3 text-sm text-ink-super-admin outline-none transition-colors placeholder:text-muted-super-admin focus:border-primary-admin-institusi focus:bg-surface-super-admin focus:ring-2 focus:ring-primary-admin-institusi/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="min-h-12 w-full rounded-xl bg-primary-admin-institusi py-3 text-on-emphasis-super-admin hover:bg-primary-hover-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  Kirim Tautan Pemulihan
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setAlertState({ type: 'error', message: '' });
                  }}
                  className="inline-flex min-h-11 w-full items-center justify-center text-sm font-semibold text-muted-super-admin hover:text-ink-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi"
                >
                  Kembali ke form masuk
                </button>
              </form>
            )}

            <div className="mt-6 border-t border-border-super-admin pt-4 text-xs leading-5 text-muted-super-admin">
              Akses akun panitia diterbitkan oleh Administrator Institusi.
            </div>
          </div>
        </section>

        <footer className="mx-auto hidden w-full max-w-xl justify-end pt-2 text-[11px] text-muted-super-admin sm:flex">
          SPMB Multi-Tenant · Panel Operasional Institusi
        </footer>
      </main>
    </div>
  );
}
