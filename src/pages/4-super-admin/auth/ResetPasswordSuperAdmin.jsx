import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ArrowRight, Check, X, CheckCircle2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import PasswordInput from '../../../components/ui/PasswordInput';
import ModalConfirm from '../../../components/ui/ModalConfirm';
import AuthAlert from '../../../components/ui/AuthAlert';
import logo from '../../../assets/icons/tki.svg';

export default function ResetPasswordSuperAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil parameter email/token dari URL (?email=...&token=...) atau router state jika ada
  const queryParams = new URLSearchParams(location.search);
  const targetEmail =
    queryParams.get('email') || location.state?.email || 'superadmin@tki.co.id';
  const resetToken = queryParams.get('token') || 'simulasi-token-tki';

  // State Form
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validasi Token saat halaman dimuat
  useEffect(() => {
    if (!resetToken) {
      setErrorMsg('Tautan pemulihan kata sandi tidak valid atau sudah kedaluwarsa.');
    }
  }, [resetToken]);

  // Kriteria Keamanan Kata Sandi Super Admin
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const isPasswordStrong = hasMinLength && hasUppercase && hasNumber;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  // Validasi sebelum membuka ModalConfirm
  const handlePreSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.password.trim() || !formData.confirmPassword.trim()) {
      setErrorMsg('Kata sandi baru dan konfirmasi kata sandi wajib diisi.');
      return;
    }

    if (!isPasswordStrong) {
      setErrorMsg('Kata sandi belum memenuhi seluruh standar keamanan Super Admin.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setIsConfirmOpen(true);
  };

  // Eksekusi simpan kata sandi setelah dikonfirmasi di ModalConfirm
  const handleConfirmReset = () => {
    setIsConfirmOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-sidebar-deep-super-admin flex flex-col justify-between p-6 font-sans text-ink-super-admin relative overflow-hidden">
      {/* Accent Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-super-admin/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Identifier */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between text-sidebar-foreground-super-admin z-10">
        <span className="text-[11px] font-mono tracking-wider uppercase text-sidebar-muted-super-admin">
          SA-00 // PEMULIHAN KREDENSIAL
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-sidebar-active-border-super-admin/30 text-sidebar-foreground-super-admin">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary-super-admin" />
          Otoritas Pusat
        </span>
      </div>

      {/* Centered Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6 z-10">
        <div className="bg-surface-super-admin rounded-3xl border border-sidebar-border-super-admin/30 shadow-2xl p-7 sm:p-9 space-y-6">
          {/* Header Logo TKI */}
          <div className="text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-sidebar-deep-super-admin flex items-center justify-center mx-auto shadow-sm border border-sidebar-active-border-super-admin/30 p-2.5">
              <img src={logo} alt="Logo PT TKI" className="w-full h-full object-contain" />
            </div>

            {!isSuccess ? (
              <div>
                <h1 className="text-xl font-serif font-bold text-ink-super-admin">
                  Atur Ulang Kata Sandi
                </h1>
                <p className="text-xs text-muted-super-admin mt-1">
                  Pemulihan akses untuk akun{' '}
                  <span className="font-semibold text-ink-super-admin">{targetEmail}</span>
                </p>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <div className="w-12 h-12 rounded-full bg-success-surface border border-success-border text-success-foreground flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-serif font-bold text-ink-super-admin">
                  Kata Sandi Diperbarui
                </h1>
                <p className="text-xs text-muted-super-admin leading-relaxed">
                  Kata sandi Super Admin berhasil diubah dan seluruh sesi perangkat lama telah diakhiri secara otomatis.
                </p>
              </div>
            )}
          </div>

          {!isSuccess ? (
            <>
              <AuthAlert type="error" message={errorMsg} />

              <form onSubmit={handlePreSubmit} className="space-y-4" noValidate>
                {/* Field Kata Sandi Baru */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-ink-super-admin">
                    Kata Sandi Baru <span className="text-error">*</span>
                  </label>
                  <PasswordInput
                    label="Kata Sandi Baru"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan kata sandi baru"
                    focusRingClass="focus:border-primary-super-admin focus:ring-info-border/50"
                  />
                </div>

                {/* Field Konfirmasi Kata Sandi */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-ink-super-admin">
                    Konfirmasi Kata Sandi Baru <span className="text-error">*</span>
                  </label>
                  <PasswordInput
                    label="Konfirmasi Kata Sandi Baru"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ketik ulang kata sandi baru"
                    focusRingClass="focus:border-primary-super-admin focus:ring-info-border/50"
                  />
                </div>

                {/* Indikator Kebijakan Kata Sandi */}
                <div className="bg-surface-muted-super-admin border border-border-super-admin p-3.5 rounded-xl space-y-2 text-[11px]">
                  <span className="font-bold text-ink-super-admin block">
                    Standar Keamanan Kata Sandi:
                  </span>
                  <div className="space-y-1">
                    <div
                      className={`flex items-center gap-1.5 font-medium ${
                        hasMinLength ? 'text-success-foreground' : 'text-muted-super-admin'
                      }`}
                    >
                      {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Minimal 8 karakter</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 font-medium ${
                        hasUppercase ? 'text-success-foreground' : 'text-muted-super-admin'
                      }`}
                    >
                      {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Minimal 1 huruf kapital (A-Z)</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 font-medium ${
                        hasNumber ? 'text-success-foreground' : 'text-muted-super-admin'
                      }`}
                    >
                      {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Minimal 1 angka (0-9)</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full !bg-primary-super-admin hover:!bg-primary-hover-super-admin !text-on-emphasis-super-admin !py-3 !rounded-xl mt-2"
                >
                  <span>Simpan Kata Sandi Baru</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="pt-4 border-t border-border-super-admin text-center">
                <Link
                  to="/super-admin/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-super-admin hover:text-primary-super-admin transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke halaman masuk</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-4 pt-2">
              <Button
                type="button"
                size="lg"
                onClick={() => navigate('/super-admin/login')}
                className="w-full !bg-primary-super-admin hover:!bg-primary-hover-super-admin !text-on-emphasis-super-admin !py-3 !rounded-xl"
              >
                <span>Masuk ke Console TKI</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-[11px] text-sidebar-muted-super-admin z-10">
        © 2026 PT Teknologi Kartu Indonesia · PRD v1.3
      </p>

      {/* Modal Konfirmasi Perubahan Sandi */}
      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        title="Konfirmasi Perubahan Kata Sandi?"
        message="Perubahan kata sandi Super Admin akan langsung berlaku dan dicatat pada Audit Log Sistem."
        confirmText="Ya, Perbarui Kata Sandi"
        cancelText="Periksa Kembali"
        variant="primary"
      />
    </div>
  );
}