import React from 'react';

const footerSections = [
  {
    title: 'Jelajahi halaman',
    links: [
      { href: '#tentang', label: 'Tentang pesantren' },
      { href: '#pendidikan', label: 'Program pendidikan' },
      { href: '#penerimaan', label: 'Jalur penerimaan' },
    ],
  },
  {
    title: 'Informasi pendaftaran',
    links: [
      { href: '#persyaratan', label: 'Persyaratan' },
      { href: '#alur', label: 'Alur pendaftaran' },
      { href: '#faq', label: 'Tanya jawab' },
    ],
  },
];

export default function PublicFooter({ data }) {
  const { institution } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-landing-footer px-4 pb-8 pt-12 text-landing-footer-text sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/15 pb-9 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-serif text-xl font-bold text-white">
            spmb<span className="text-landing-brand-soft">.</span>
          </p>
          <p className="max-w-xs text-sm leading-relaxed">{institution.name}</p>
          <p className="max-w-xs text-sm leading-relaxed">{institution.tagline}</p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wide text-white">{section.title}</h2>
            <ul className="space-y-2.5 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-landing-footer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-3 text-sm">
          <h2 className="text-xs font-bold uppercase tracking-wide text-white">Kontak sekretariat</h2>
          <p>{institution.address || 'Alamat resmi belum tersedia.'}</p>
          <p>{institution.contactPhone || 'Nomor kontak resmi belum tersedia.'}</p>
          <p className="break-words">{institution.contactEmail || 'Email resmi belum tersedia.'}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-center text-xs text-landing-footer-text/75 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© {year} {institution.name}. Hak cipta dilindungi.</p>
        <p>Sistem informasi penerimaan santri baru</p>
      </div>
    </footer>
  );
}
