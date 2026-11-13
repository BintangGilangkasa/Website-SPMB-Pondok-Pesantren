# Kontrak API landing page

Dokumen ini menyiapkan batas integrasi frontend untuk backend yang akan dibuat. Path endpoint terpusat di `src/services/landingPageService.js` agar mudah disesuaikan bila backend memakai route berbeda.

Set nilai `VITE_API_BASE_URL` di `.env` ke origin API, tanpa slash di akhir. Tanpa nilai tersebut, landing page memakai data statis dan halaman backoffice hanya menyediakan pratinjau lokal; simpan dan publikasi tetap nonaktif.

Service mengirim token sebagai `Authorization: Bearer <token>` dari `localStorage.token` untuk endpoint admin. Sesuaikan hanya `src/services/landingPageService.js` jika backend memakai mekanisme sesi atau token yang berbeda.

## Endpoint

| Method | Path | Akses | Kegunaan |
| --- | --- | --- | --- |
| `GET` | `/api/public/landing-page` | Publik | Membaca konten yang sudah diterbitkan untuk domain/tenant aktif; `data` berisi objek landing page. |
| `GET` | `/api/admin/landing-page/draft` | Admin institusi | Membaca draft landing page; `data` berisi `{ "content": { ... }, "status": "draft" }`. |
| `POST` | `/api/admin/landing-page/media` | Admin institusi | Mengunggah foto profil sebagai `multipart/form-data`, field `file`; `data` berisi URL media. |
| `PATCH` | `/api/admin/landing-page/draft/about` | Admin institusi | Menyimpan perubahan section profil tanpa menimpa section lain; body berisi objek `about`. |
| `POST` | `/api/admin/landing-page/publish` | Admin institusi | Menerbitkan draft aktif; `data` dapat berisi status dan waktu publikasi. |

Respons sukses dapat memakai pembungkus `{ "data": ... }`. Respons error sebaiknya memakai `{ "message": "..." }`; frontend menampilkan pesan itu sebagai status.

## Bentuk konten

Endpoint publik mengembalikan objek yang kompatibel dengan `landingPageData.js`. Bagian `about` menggunakan bentuk berikut:

```json
{
  "badge": "PROFIL PESANTREN",
  "title": "Pesantren Modern Al-Hikmah",
  "description": "Deskripsi profil pesantren",
  "imageUrl": "https://media.example.org/tenant/profil.webp",
  "imageAlt": "Gedung utama Pesantren Modern Al-Hikmah",
  "imageCaption": "Gedung utama pesantren"
}
```

Upload media mengembalikan URL stabil, misalnya `{ "data": { "url": "https://media.example.org/tenant/profil.webp" } }`. Frontend mengirim `imageUrl`, `imageAlt`, dan `imageCaption` saat menyimpan profil.

## Tanggung jawab backend

- Validasi tipe gambar JPEG, PNG, atau WebP serta batas ukuran 5 MB; jangan mengandalkan validasi browser saja.
- Simpan file di media/object storage dan simpan URL serta metadata di database.
- Ambil tenant dari sesi/token admin di server. Jangan mempercayai `tenantId` yang dikirim browser.
- Batasi upload, simpan draft, dan publikasi ke pengguna berwenang; endpoint publik hanya membaca versi terbit.
- Pertahankan draft dan versi terbit terpisah agar perubahan bisa dipratinjau sebelum publikasi.
- Bersihkan file media yang sudah tidak dipakai melalui kebijakan backend.
