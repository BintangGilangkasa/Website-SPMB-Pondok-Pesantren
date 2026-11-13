import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import LogoIcon from '../../../assets/icons/tki_bg.svg'
import Button from '../../../components/ui/Button';
import PasswordInput from '../../../components/ui/PasswordInput';
import AuthAlert from '../../../components/ui/AuthAlert';

export default function LoginSuperAdmin() {
  const navigate = useNavigate();
  const [isForgotMode, setIsForgotMode] = useState(false)
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [ResetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false)
  const [isResetLoading, setIsResetLoading] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMsg('Kredensial Super Admin wajib diisi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        'user_data',
        JSON.stringify({
          name: 'Super Admin TKI',
          email: formData.email,
          role: 'super_admin',
        })
      );
      navigate('/super-admin/dashboard');
    }, 800);
  };

  const HandleResetRequest = (e) => {
    e.preventDefault();
    if(!ResetEmail.trim()) {
      setErrorMsg("Masukkan email administrator yang terdaftar.")
      return  ;
    } 

    setIsResetLoading(true);
    setTimeout(() => {
      setIsResetLoading(false);
      setErrorMsg('');
      setResetSent(true)
    }, 800);
  };

  // Fungsi Beralih Mode
  const switchToForgotMode = () => {
    setIsForgotMode(true);
    setResetEmail(formData.email); // Otomatis isi jika user sudah mengetik email di login
    setResetSent(false);
    setErrorMsg('');
  };

  const switchToLoginMode = () => {
    setIsForgotMode(false);
    setResetSent(false);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen w-full bg-sidebar-deep-super-admin flex flex-col justify-between p-6 font-sans text-ink-super-admin relative overflow-hidden">
      {/* Accent Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-super-admin/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Identifier */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between text-sidebar-foreground-super-admin z-10">
        <span className="text-[11px] font-mono tracking-wider uppercase text-sidebar-muted-super-admin">
          {isForgotMode ? 'SA-00 // PEMULIHAN AKUN' : 'SA-00 // PLATFORM CORE'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-sidebar-active-border-super-admin/30 text-sidebar-foreground-super-admin">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary-super-admin" />
          Otoritas Pusat
        </span>
      </div>

      {/* Centered Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6 z-10">
        <div className="bg-surface-super-admin rounded-3xl border border-sidebar-border-super-admin/30 shadow-2xl p-7 sm:p-9 space-y-6">
          {/* Header Logo & Judul Dinamis */}
          <div className="text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-sidebar-deep-super-admin flex items-center justify-center mx-auto shadow-sm border border-sidebar-active-border-super-admin/30 p-2.5">
              <img src={LogoIcon} alt="Logo PT TKI" className="w-full h-full object-contain" />
            </div>

            {!isForgotMode ? (
              <div>
                <h1 className="text-xl font-serif font-bold text-ink-super-admin">
                  Super Admin SPMB
                </h1>
                <p className="text-xs text-muted-super-admin mt-0.5">
                  PT Teknologi Kartu Indonesia · Kendali Lintas Tenant
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-serif font-bold text-ink-super-admin">
                  Lupa Kata Sandi
                </h1>
                <p className="text-xs text-muted-super-admin mt-0.5 leading-relaxed">
                  Masukkan email administrator untuk menerima tautan pengaturan ulang kata sandi.
                </p>
              </div>
            )}
          </div>

          <AuthAlert type="error" message={errorMsg} />

          {/* ================= MODE 1: FORM LOGIN UTAMA ================= */}
          {!isForgotMode ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-ink-super-admin">
                  Email Administrator Platform
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-super-admin">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="superadmin@tki.co.id"
                    className="w-full pl-10 pr-4 py-3 text-sm text-ink-super-admin bg-surface-muted-super-admin border border-border-super-admin rounded-xl outline-none focus:bg-surface-super-admin focus:border-primary-super-admin focus:ring-4 focus:ring-info-border/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-ink-super-admin">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={switchToForgotMode}
                    className="text-xs font-bold text-primary-super-admin hover:text-primary-hover-super-admin hover:underline cursor-pointer"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
                <PasswordInput
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errorMsg) setErrorMsg('');
                  }}
                  focusRingClass="focus:border-primary-super-admin focus:ring-info-border/50"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="w-full !bg-primary-super-admin hover:!bg-primary-hover-super-admin !text-on-emphasis-super-admin !py-3 !rounded-xl mt-2"
              >
                <span>Masuk ke Console TKI</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            /* ================= MODE 2: FORM PERMINTAAN RESET SANDI ================= */
            <div className="space-y-4">
              {!resetSent ? (
                <form onSubmit={handleResetRequest} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-ink-super-admin">
                      Email Administrator Terdaftar
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-super-admin">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={ResetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="superadmin@tki.co.id"
                        className="w-full pl-10 pr-4 py-3 text-sm text-ink-super-admin bg-surface-muted-super-admin border border-border-super-admin rounded-xl outline-none focus:bg-surface-super-admin focus:border-primary-super-admin focus:ring-4 focus:ring-info-border/50 transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isResetLoading}
                    className="w-full !bg-primary-super-admin hover:!bg-primary-hover-super-admin !text-on-emphasis-super-admin !py-3 !rounded-xl"
                  >
                    <span>Kirim Tautan Pemulihan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                /* Status Berhasil Kirim + Tombol Simulasi ke Halaman ResetPasswordSuperAdmin */
                <div className="p-4 rounded-2xl bg-success-surface border border-success-border space-y-3 text-center">
                  <CheckCircle2 className="w-8 h-8 text-success-foreground mx-auto" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-success-foreground">
                      Tautan Pemulihan Terkirim!
                    </p>
                    <p className="text-[11px] text-ink-super-admin leading-relaxed">
                      Instruksi pemulihan kata sandi telah dikirim ke{' '}
                      <span className="font-bold">{ResetEmail}</span>.
                    </p>
                  </div>

                  {/* Tombol simulasi untuk langsung menguji halaman ResetPasswordSuperAdmin */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/super-admin/reset-password?email=${encodeURIComponent(
                          ResetEmail
                        )}&token=simulasi-token-tki`
                      )
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-primary-super-admin hover:bg-primary-hover-super-admin text-on-emphasis-super-admin text-xs font-bold transition-colors cursor-pointer"
                  >
                    Buka Halaman Atur Ulang Sandi →
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={switchToLoginMode}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-super-admin hover:text-primary-super-admin pt-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke halaman masuk</span>
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-border-super-admin text-center text-[11px] text-muted-super-admin">
            Seluruh aktivitas masuk dan pemulihan dicatat dalam Audit Log Sistem.
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-sidebar-muted-super-admin z-10">
        © 2026 PT Teknologi Kartu Indonesia · PRD v1.3
      </p>
    </div>
  );
}
