import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function SantriAuthLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-landing-paper font-sans text-landing-ink lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <aside className="relative hidden min-h-dvh flex-col justify-between overflow-hidden bg-landing-footer px-10 py-10 text-on-emphasis-super-admin lg:flex xl:px-14 xl:py-12">
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-portal-santri font-serif text-xl font-bold text-white">
            S.
          </div>
          <div>
            <p className="font-serif text-xl font-bold leading-none tracking-tight">
              spmb<span className="text-secondary-portal-santri">.</span>
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-landing-footer-text">
              PORTAL WALI &amp; CALON SANTRI
            </p>
          </div>
        </div>

        <div className="relative z-10 my-12 max-w-xl">
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-secondary-portal-santri">
            SATU AKUN, BEBERAPA ANAK
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight xl:text-5xl">
            Langkah awal menuju pendidikan yang bermakna.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-landing-footer-text">
            Pantau pengajuan pendaftaran, unggah berkas persyaratan, tagihan, hingga pengumuman seleksi putra-putri Anda dalam satu pintu.
          </p>
        </div>

        <div className="relative z-10 flex min-h-44 items-end overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-5">
          <div className="absolute bottom-0 left-1/2 h-36 w-64 -translate-x-1/2 rounded-t-full border-x border-t border-secondary-portal-santri/30 bg-primary-portal-santri/15" />
          <div className="relative rounded-xl border border-white/15 bg-landing-footer/80 px-4 py-3">
            <p className="text-[10px] font-bold tracking-[0.14em] text-secondary-portal-santri">
              INSTITUSI TUJUAN
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Pesantren Al-Falah · TA 2026/2027
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center gap-2 border-t border-white/15 pt-5 text-xs text-landing-footer-text">
          <ShieldCheck className="h-4 w-4 shrink-0 text-secondary-portal-santri" />
          <span>Data pribadi santri terlindungi</span>
        </div>
      </aside>

      <main className="flex min-h-dvh flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-14">
        <header className="mx-auto flex min-h-11 w-full max-w-md items-center justify-between gap-3 lg:max-w-xl">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-2 text-xs font-semibold text-landing-muted transition-colors hover:text-landing-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <span className="text-right text-[10px] font-bold tracking-[0.12em] text-landing-brand sm:text-xs">
            PORTAL WALI SANTRI
          </span>
        </header>

        <section className="mx-auto flex w-full max-w-md flex-1 items-center py-5 sm:py-8 lg:max-w-xl">
          <div className="w-full rounded-3xl border border-landing-border bg-landing-surface p-5 shadow-xl shadow-landing-ink/5 sm:p-8 lg:p-10 [&_input]:border-[#818D9A] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-primary-portal-santri">
            <Outlet />
          </div>
        </section>

        <footer className="mx-auto hidden w-full max-w-xl items-center justify-between border-t border-landing-border pt-4 text-[11px] text-landing-muted sm:flex">
          <span>© 2026 Pesantren Al-Falah</span>
          <span>Butuh bantuan? Hubungi Sekretariat</span>
        </footer>
      </main>
    </div>
  );
}
