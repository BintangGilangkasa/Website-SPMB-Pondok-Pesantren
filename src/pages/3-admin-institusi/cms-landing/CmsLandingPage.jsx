import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ImagePlus, LoaderCircle, Save, Send, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { landingPageData } from '../../../data/landingPageData';
import {
  getLandingPageDraft,
  isLandingPageApiConfigured,
  publishLandingPage,
  saveLandingPageAboutDraft,
  uploadLandingPageImage,
} from '../../../services/landingPageService';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default function CmsLandingPage() {
  const apiConfigured = isLandingPageApiConfigured();
  const imageInputRef = useRef(null);
  const [draft, setDraft] = useState({ ...landingPageData.about });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(apiConfigured);
  const [draftLoaded, setDraftLoaded] = useState(!apiConfigured);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!apiConfigured) return undefined;

    let isCurrent = true;
    setIsLoading(true);
    getLandingPageDraft()
      .then((response) => {
        if (!isCurrent) return;
        const content = response?.content ?? response?.landingPage ?? response ?? {};
        const about = content.about ?? content;
        setDraft({ ...landingPageData.about, ...about });
        setDraftLoaded(true);
      })
      .catch((error) => {
        if (!isCurrent) return;
        setNotice({ type: 'error', text: `Draft belum dapat dimuat: ${error.message}` });
        setDraftLoaded(false);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [apiConfigured]);

  useEffect(() => () => {
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
    setNotice(null);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      setNotice({ type: 'error', text: 'Pilih gambar JPG, PNG, atau WebP.' });
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setNotice({ type: 'error', text: 'Ukuran gambar maksimal 5 MB.' });
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setIsDirty(true);
    setNotice(null);

    if (!apiConfigured) {
      setNotice({ type: 'info', text: 'Ini pratinjau lokal. Gambar belum tersimpan ke server karena API belum dikonfigurasi.' });
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadLandingPageImage(file);
      const imageUrl = response.url ?? response.imageUrl ?? response.media?.url;
      if (!imageUrl) throw new Error('Respons upload belum berisi URL gambar.');

      setDraft((current) => ({ ...current, imageUrl }));
      setPreviewUrl('');
      setNotice({ type: 'success', text: 'Foto berhasil diunggah. Simpan draft agar foto tampil di halaman publik.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Foto belum tersimpan: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setDraft((current) => ({ ...current, imageUrl: '' }));
    setIsDirty(true);
    setNotice({ type: 'info', text: 'Foto dihapus dari draft. File media di server tidak ikut dihapus.' });
  };

  const isPreviewLocal = previewUrl.startsWith('blob:');
  const hasImage = Boolean(previewUrl || draft.imageUrl);
  const formIsValid = Boolean(draft.title?.trim() && draft.description?.trim())
    && (!draft.imageUrl || Boolean(draft.imageAlt?.trim()))
    && !isPreviewLocal;
  const canSubmit = apiConfigured && draftLoaded && formIsValid && !isLoading && !isUploading && !isSaving && !isPublishing;

  const handleSave = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSaving(true);
    setNotice(null);
    try {
      await saveLandingPageAboutDraft(draft);
      setIsDirty(false);
      setNotice({ type: 'success', text: 'Draft profil pesantren berhasil disimpan.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Draft belum tersimpan: ${error.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!canSubmit) return;

    setIsPublishing(true);
    setNotice(null);
    try {
      await saveLandingPageAboutDraft(draft);
      await publishLandingPage();
      setIsDirty(false);
      setNotice({ type: 'success', text: 'Profil pesantren berhasil diterbitkan.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Profil belum diterbitkan: ${error.message}` });
    } finally {
      setIsPublishing(false);
    }
  };

  const imageSource = previewUrl || draft.imageUrl;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-admin-institusi">Konten publik</p>
          <h1 className="mt-1 text-2xl font-bold text-ink-super-admin sm:text-3xl">Profil pesantren</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-super-admin">
            Perbarui ringkasan profil dan foto yang tampil di landing page penerimaan santri.
          </p>
        </div>
        <Link
          to="/landing-page"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border-super-admin bg-surface-super-admin px-4 py-2 text-sm font-semibold text-ink-super-admin hover:bg-surface-accent-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi focus-visible:ring-offset-2"
        >
          Lihat halaman publik <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </header>

      {!apiConfigured && (
        <div className="rounded-xl border border-warning-border bg-warning-surface p-4 text-sm leading-relaxed text-warning-foreground" role="status">
          Mode persiapan aktif. Kamu bisa mengedit dan melihat pratinjau lokal, tetapi simpan dan publikasi aktif setelah `VITE_API_BASE_URL` serta API backend tersedia.
        </div>
      )}

      {isLoading && (
        <p className="flex items-center gap-2 text-sm text-muted-super-admin" role="status">
          <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Memuat draft profil...
        </p>
      )}

      {notice && (
        <div
          className={`rounded-xl border p-4 text-sm leading-relaxed ${notice.type === 'error' ? 'border-error-border bg-error-surface text-error-foreground' : notice.type === 'success' ? 'border-success-border bg-success-surface text-success-foreground' : 'border-info-border bg-info-surface text-info-foreground'}`}
          role={notice.type === 'error' ? 'alert' : 'status'}
        >
          {notice.text}
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <section className="space-y-5 rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 shadow-sm sm:p-6" aria-labelledby="profile-fields-title">
          <div>
            <h2 id="profile-fields-title" className="text-lg font-bold text-ink-super-admin">Informasi profil</h2>
            <p className="mt-1 text-sm text-muted-super-admin">Teks ini digunakan pada section Profil Pesantren.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="about-title" className="text-sm font-semibold text-ink-super-admin">Judul profil</label>
            <input
              id="about-title"
              value={draft.title || ''}
              onChange={(event) => updateField('title', event.target.value)}
              required
              className="min-h-11 w-full rounded-lg border border-border-super-admin bg-white px-3 py-2 text-sm text-ink-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="about-description" className="text-sm font-semibold text-ink-super-admin">Deskripsi</label>
            <textarea
              id="about-description"
              value={draft.description || ''}
              onChange={(event) => updateField('description', event.target.value)}
              required
              rows={7}
              className="w-full resize-y rounded-lg border border-border-super-admin bg-white px-3 py-2 text-sm leading-relaxed text-ink-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="about-image-alt" className="text-sm font-semibold text-ink-super-admin">Deskripsi foto untuk aksesibilitas</label>
            <input
              id="about-image-alt"
              value={draft.imageAlt || ''}
              onChange={(event) => updateField('imageAlt', event.target.value)}
              placeholder="Contoh: Gedung utama Pesantren Al-Hikmah"
              required={Boolean(draft.imageUrl)}
              className="min-h-11 w-full rounded-lg border border-border-super-admin bg-white px-3 py-2 text-sm text-ink-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="about-image-caption" className="text-sm font-semibold text-ink-super-admin">Keterangan foto <span className="font-normal text-muted-super-admin">(opsional)</span></label>
            <input
              id="about-image-caption"
              value={draft.imageCaption || ''}
              onChange={(event) => updateField('imageCaption', event.target.value)}
              className="min-h-11 w-full rounded-lg border border-border-super-admin bg-white px-3 py-2 text-sm text-ink-super-admin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi"
            />
          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-border-super-admin bg-surface-super-admin p-5 shadow-sm sm:p-6" aria-labelledby="profile-image-title">
          <div>
            <h2 id="profile-image-title" className="text-lg font-bold text-ink-super-admin">Foto profil</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-super-admin">Gunakan foto resmi pesantren berformat JPG, PNG, atau WebP, maksimal 5 MB.</p>
          </div>

          <div className="relative isolate px-2 pb-3 pt-2">
            <span aria-hidden="true" className="absolute -right-1 top-0 h-16 w-16 text-primary-admin-institusi" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white bg-surface-accent-super-admin shadow-md">
              {imageSource ? (
                <img src={imageSource} alt={draft.imageAlt || 'Pratinjau foto profil pesantren'} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-sm text-muted-super-admin">
                  <ImagePlus className="h-8 w-8 text-primary-admin-institusi" aria-hidden="true" />
                  <p>Foto yang dipilih akan tampil di sini.</p>
                </div>
              )}
            </div>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi focus-visible:ring-offset-2"
            >
              {isUploading ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ImagePlus className="h-4 w-4" aria-hidden="true" />}
              {isUploading ? 'Mengunggah...' : 'Pilih foto'}
            </button>
            {hasImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isUploading}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-error-border px-4 py-2 text-sm font-semibold text-error-foreground hover:bg-error-surface disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-foreground focus-visible:ring-offset-2"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus foto
              </button>
            )}
          </div>

          <div className="border-t border-border-super-admin pt-4">
            <p className="text-sm font-semibold text-ink-super-admin">Alur publikasi</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-super-admin">
              Unggah foto, simpan perubahan sebagai draft, lalu publikasikan agar tampil di landing page.
            </p>
          </div>
        </section>

        <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end lg:col-span-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border-super-admin bg-white px-4 py-2 text-sm font-semibold text-ink-super-admin hover:bg-surface-accent-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi focus-visible:ring-offset-2"
          >
            {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
            {isSaving ? 'Menyimpan...' : isDirty ? 'Simpan draft' : 'Simpan perubahan'}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={!canSubmit}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-admin-institusi focus-visible:ring-offset-2"
          >
            {isPublishing ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            {isPublishing ? 'Menerbitkan...' : 'Simpan dan publikasikan'}
          </button>
        </footer>
      </form>
    </div>
  );
}
