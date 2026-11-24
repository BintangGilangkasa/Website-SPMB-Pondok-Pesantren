# Catatan Perubahan

Ringkasan perubahan yang tercatat di workspace proyek per 19 November 2026.

## Struktur halaman dan komponen

- Folder halaman bernomor dirapikan menjadi nama domain: `pages/public`, `pages/santri`, `pages/admin-institusi`, dan `pages/super-admin`.
- Komponen yang sebelumnya berada di dalam folder halaman dipindahkan ke `src/components` dan dikelompokkan menurut domain serta fiturnya.
- Komponen UI umum dikumpulkan melalui `src/components/ui/index.js`. Impor komponen memakai alias `@/` dan barrel domain seperti `@/components/super-admin` agar halaman tidak bergantung pada lokasi file internal.
- Panduan pemisahan UI umum, widget domain, layout, dan halaman ada di `src/components/README.md`.
- `PortalLayout` dipakai bersama oleh layout Admin Institusi dan Super Admin. `SantriAuthLayout` disimpan terpisah untuk halaman autentikasi Santri.
- Stub komponen kosong dan folder kosong yang tidak dipakai dibersihkan, termasuk shell Santri lama yang belum memiliki navigasi aktif.

## UI dan dashboard

- `Profile` menjadi komponen bersama dan menampilkan ikon user pada avatar; dipakai pada navigasi, tabel pengguna, dan beranda Santri.
- `Select` ditambahkan ke katalog UI dan dipakai untuk dropdown di dashboard, filter, modal admin, dan pengaturan.
- Loading simulasi di Dashboard Super Admin dan Tenant dihapus. Dashboard Admin Institusi sebelumnya tidak memiliki loading simulasi.
- Impor UI seperti `Button`, `Input`, `Badge`, `Drawer`, `ModalConfirm`, `PageHeader`, serta komponen form lainnya diseragamkan melalui barrel UI.

## Login dan profil admin

- `AuthProvider` menyediakan sesi frontend bersama, login/logout, dan penyimpanan profil sesi di `localStorage`.
- Route portal dilindungi berdasarkan role; halaman login mengarahkan sesi aktif ke portalnya dan mempertahankan tujuan awal setelah login.
- Login Admin Institusi, Super Admin, dan Santri memakai konteks autentikasi yang sama.
- Halaman Users & Access dapat menambahkan profil admin, memvalidasi nama serta email duplikat, dan menyimpan daftar profil di browser.
- Route daftar dan lupa kata sandi Santri tersedia dengan pemberitahuan bahwa layanan backend terkait belum terhubung.

## Catatan batasan

- Login masih berupa simulasi frontend. Belum ada endpoint backend untuk memverifikasi kredensial atau menerbitkan token.
- Penambahan profil disimpan di browser, belum dikirim atau disimpan ke server.
- Fitur daftar dan pemulihan kata sandi Santri belum aktif karena layanan backend belum tersedia.
- `npm run build` berhasil. `npm run lint` berhasil dengan enam warning yang masih muncul pada Landing Page, CMS, Footer, dan halaman reset password. Build juga memberi warning urutan `@import` CSS dan ukuran bundle JavaScript.
