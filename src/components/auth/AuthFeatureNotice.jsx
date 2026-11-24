import { Link } from 'react-router-dom';
import { ArrowLeft, CircleHelp } from 'lucide-react';

export default function AuthFeatureNotice({ title, description }) {
  return (
    <section className="space-y-5 text-center" aria-labelledby="auth-notice-title">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-landing-brand-soft text-landing-brand">
        <CircleHelp className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h1 id="auth-notice-title" className="font-serif text-2xl font-bold text-landing-ink">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-landing-muted">{description}</p>
      </div>
      <Link
        to="/login"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-portal-santri px-5 text-sm font-semibold text-white transition-colors hover:bg-landing-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-portal-santri"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke halaman masuk
      </Link>
    </section>
  );
}
