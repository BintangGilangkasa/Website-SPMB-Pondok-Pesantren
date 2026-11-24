import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Profile } from '@/components/ui';
import { useAuth } from '../../../context/useAuth';

export default function BerandaPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-dvh bg-landing-paper px-4 py-6 text-landing-ink sm:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex items-center justify-between gap-4 border-b border-landing-border pb-4">
          <div>
            <p className="font-serif text-lg font-bold">SPMB<span className="text-landing-brand">.</span></p>
            <p className="text-xs text-landing-muted">Portal Wali Santri</p>
          </div>
          <div className="flex items-center gap-3">
            <Profile
              name={user?.name || 'Wali Santri'}
              description={user?.contact || 'Akun wali'}
              avatarClassName="h-9 w-9 rounded-full bg-landing-brand-soft text-landing-brand"
              nameClassName="text-sm font-semibold text-landing-ink"
              descriptionClassName="text-xs text-landing-muted"
            />
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Keluar dari akun"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-landing-muted transition-colors hover:bg-landing-brand-soft hover:text-landing-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-portal-santri"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-landing-border bg-landing-surface p-6 shadow-sm sm:p-9">
          <p className="text-xs font-bold uppercase tracking-wider text-landing-brand">Beranda</p>
          <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            Selamat datang, {user?.name || 'Wali Santri'}.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-landing-muted">
            Sesi akun wali sudah aktif. Informasi pendaftaran dan pembayaran akan tampil di sini setelah layanan portal Santri tersedia.
          </p>
        </section>
      </div>
    </main>
  );
}
