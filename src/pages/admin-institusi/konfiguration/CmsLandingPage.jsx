import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, ImagePlus, LoaderCircle, Plus, Save, Send, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { landingPageData } from '../../../data/landingPageData';
import { COLLECTION_LABELS, EMPTY_TEMPLATES, FIELD_CONFIG, SECTION_LIST } from '../../../data/landingPageEditorSchema';
import {
  getLandingPageDraft,
  isLandingPageApiConfigured,
  publishLandingPage,
  saveLandingPageDraft,
  uploadLandingPageImage,
} from '../../../services/landingPageService';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const STORAGE_PREFIX = 'spmb-landing-page-draft';
const cloneData = (data) => JSON.parse(JSON.stringify(data));
const localDraftKey = (tenant) => `${STORAGE_PREFIX}:${tenant || 'default'}`;

function readLocalDraft(key) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? { ...cloneData(landingPageData), ...JSON.parse(stored) } : cloneData(landingPageData);
  } catch {
    return cloneData(landingPageData);
  }
}

function setAtPath(object, path, value) {
  const [head, ...tail] = path;
  if (tail.length === 0) {
    if (Array.isArray(object)) {
      const next = [...object];
      next[head] = value;
      return next;
    }
    return { ...object, [head]: value };
  }
  const next = Array.isArray(object) ? [...object] : { ...object };
  next[head] = setAtPath(object?.[head] ?? {}, tail, value);
  return next;
}

function normalizeDraft(response) {
  const content = response?.content ?? response?.landingPage ?? response ?? {};
  // Fill partial server drafts from the public page shape so new fields have predictable defaults.
  return {
    ...cloneData(landingPageData),
    ...content,
    institution: { ...landingPageData.institution, ...(content.institution ?? {}) },
    hero: { ...landingPageData.hero, ...(content.hero ?? {}) },
    about: { ...landingPageData.about, ...(content.about ?? {}) },
    requirements: {
      ...landingPageData.requirements,
      ...(content.requirements ?? {}),
      documents: content.requirements?.documents ?? landingPageData.requirements.documents,
      fees: content.requirements?.fees ?? landingPageData.requirements.fees,
    },
    educationList: content.educationList ?? landingPageData.educationList,
    offerings: content.offerings ?? landingPageData.offerings,
    timelines: content.timelines ?? landingPageData.timelines,
    steps: content.steps ?? landingPageData.steps,
    environments: content.environments ?? landingPageData.environments,
    faqs: content.faqs ?? landingPageData.faqs,
  };
}

function Field({ field, value, onChange, imageUrl, id }) {
  if (field.type === 'checkbox') {
    return (
      <label htmlFor={id} className="flex min-h-11 items-center gap-3 text-sm font-medium text-ink-super-admin">
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-primary-admin-institusi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi" />
        {field.label}
      </label>
    );
  }

  const required = field.required || (field.requiredWhenImage && Boolean(imageUrl));
  const commonProps = {
    id,
    value: field.type === 'number-list' ? (value ?? []).join(', ') : (value ?? ''),
    required,
    onChange: (event) => {
      const nextValue = field.type === 'number'
        ? (event.target.value === '' ? '' : Number(event.target.value))
        : field.type === 'number-list'
          ? event.target.value.split(',').map((item) => item.trim()).filter(Boolean).map(Number).filter(Number.isFinite)
          : event.target.value;
      onChange(nextValue);
    },
    className: 'min-h-11 w-full rounded-lg border border-[#818D9A] bg-white px-3 py-2 text-sm text-ink-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi',
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-ink-super-admin">{field.label}{required ? <span aria-hidden="true"> *</span> : ''}</label>
      {field.type === 'textarea' ? (
        <textarea {...commonProps} rows={4} className={`${commonProps.className} resize-y leading-relaxed`} />
      ) : (
        <input {...commonProps} type={field.type || 'text'} min={field.min} />
      )}
    </div>
  );
}

export default function CmsLandingPage() {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const apiConfigured = isLandingPageApiConfigured();
  const tenant = (() => {
    try { return JSON.parse(window.localStorage.getItem('user_data') || '{}').tenant; } catch { return ''; }
  })();
  const storageKey = localDraftKey(tenant);
  const [draft, setDraft] = useState(() => readLocalDraft(storageKey));
  const [activeSection, setActiveSection] = useState('institution');
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
        setDraft(normalizeDraft(response));
        setDraftLoaded(true);
      })
      .catch((error) => {
        if (!isCurrent) return;
        setDraftLoaded(false);
        setNotice({ type: 'error', text: `Draft server belum dapat dimuat: ${error.message}. Anda masih dapat mengedit dan menyimpan draft di browser ini.` });
      })
      .finally(() => { if (isCurrent) setIsLoading(false); });
    return () => { isCurrent = false; };
  }, [apiConfigured]);

  const currentSection = SECTION_LIST.find((section) => section.id === activeSection) ?? SECTION_LIST[0];
  const canPublish = apiConfigured && draftLoaded && !isLoading && !isUploading && !isSaving && !isPublishing;
  const isValid = Boolean(draft.institution?.name?.trim() && draft.hero?.title?.trim() && draft.hero?.subtitle?.trim() && draft.about?.title?.trim() && draft.about?.description?.trim())
    && (!draft.about?.imageUrl || Boolean(draft.about?.imageAlt?.trim()));

  const updatePath = (path, value) => {
    setDraft((current) => setAtPath(current, path, value));
    setIsDirty(true);
    setNotice(null);
  };

  const saveLocalDraft = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(draft));
      setIsDirty(false);
      setNotice({ type: 'success', text: 'Draft landing page tersimpan di browser ini. Draft belum dikirim ke server.' });
    } catch {
      setNotice({ type: 'error', text: 'Draft lokal tidak dapat disimpan. Periksa ruang penyimpanan browser.' });
    }
  };

  const handleSave = async () => {
    if (!apiConfigured || !draftLoaded) {
      saveLocalDraft();
      return;
    }
    setIsSaving(true);
    setNotice(null);
    try {
      await saveLandingPageDraft(draft);
      try { window.localStorage.setItem(storageKey, JSON.stringify(draft)); } catch { /* Server draft remains saved. */ }
      setIsDirty(false);
      setNotice({ type: 'success', text: 'Draft landing page berhasil disimpan ke server.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Draft belum tersimpan: ${error.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!canPublish || !isValid) return;
    setIsPublishing(true);
    setNotice(null);
    try {
      await saveLandingPageDraft(draft);
      await publishLandingPage();
      try { window.localStorage.setItem(storageKey, JSON.stringify(draft)); } catch { /* Published copy remains saved. */ }
      setIsDirty(false);
      setNotice({ type: 'success', text: 'Landing page berhasil diterbitkan.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Landing page belum diterbitkan: ${error.message}` });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = async (event) => {
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
    if (!apiConfigured) {
      setNotice({ type: 'info', text: 'Unggah gambar membutuhkan API. Anda dapat mengisi URL gambar untuk pratinjau lokal.' });
      return;
    }
    setIsUploading(true);
    setNotice(null);
    try {
      const response = await uploadLandingPageImage(file);
      const imageUrl = response.url ?? response.imageUrl ?? response.media?.url;
      if (!imageUrl) throw new Error('Respons upload belum berisi URL gambar.');
      updatePath(['about', 'imageUrl'], imageUrl);
      setNotice({ type: 'success', text: 'Foto profil berhasil diunggah. Simpan draft agar perubahan tersimpan.' });
    } catch (error) {
      setNotice({ type: 'error', text: `Foto belum tersimpan: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const previewDraft = useMemo(() => cloneData(draft), [draft]);
  const renderFields = (path, fields, value) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
          <Field
            field={field}
            id={`landing-${[...path, field.key].join('-')}`}
            value={value?.[field.key]}
            imageUrl={value?.imageUrl}
            onChange={(nextValue) => updatePath([...path, field.key], nextValue)}
          />
        </div>
      ))}
    </div>
  );

  const renderCollection = (path, items, fields, template, label) => (
    <div className="space-y-4">
      {(items ?? []).map((item, index) => (
        <article key={item.id || `${path.join('-')}-${index}`} className="rounded-xl border border-border-super-admin bg-surface-super-admin p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-border-super-admin pb-3">
            <div>
              <h3 className="text-sm font-bold text-ink-super-admin">{label} {index + 1}</h3>
              <p className="mt-0.5 text-xs text-muted-super-admin">Perubahan berlaku setelah draft disimpan dan diterbitkan.</p>
            </div>
            <button type="button" onClick={() => updatePath(path, items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Hapus ${label.toLowerCase()} ${index + 1}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-error-border text-error-foreground hover:bg-error-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-foreground">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {renderFields([...path, index], fields, item)}
        </article>
      ))}
      <button type="button" onClick={() => updatePath(path, [...(items ?? []), { ...template, id: `${path.join('-')}-${Date.now()}` }])} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-super-admin bg-white px-4 text-sm font-semibold text-ink-super-admin hover:bg-surface-accent-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
        <Plus className="h-4 w-4" aria-hidden="true" /> Tambah {label.toLowerCase()}
      </button>
    </div>
  );

  const renderEditor = () => {
    if (activeSection === 'institution' || activeSection === 'hero' || activeSection === 'about') {
      const sectionValue = draft[activeSection] ?? {};
      return (
        <div className="space-y-5">
          {renderFields([activeSection], FIELD_CONFIG[activeSection], sectionValue)}
          {activeSection === 'about' && (
            <div className="rounded-xl border border-border-super-admin bg-surface-muted-super-admin p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-lg border border-border-super-admin bg-white sm:w-40">
                  {sectionValue.imageUrl ? <img src={sectionValue.imageUrl} alt={sectionValue.imageAlt || 'Pratinjau foto pesantren'} className="h-full w-full object-cover" /> : <div className="px-3 text-center text-xs text-muted-super-admin">Belum ada foto</div>}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-ink-super-admin">Foto profil</p>
                  <p className="max-w-lg text-xs leading-relaxed text-muted-super-admin">URL gambar dapat dipakai untuk pratinjau. Unggah langsung tersedia setelah API media dikonfigurasi.</p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => imageInputRef.current?.click()} disabled={!apiConfigured || isUploading} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-admin-institusi px-3 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
                      {isUploading ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ImagePlus className="h-4 w-4" aria-hidden="true" />}
                      {isUploading ? 'Mengunggah...' : 'Unggah foto'}
                    </button>
                    {sectionValue.imageUrl && <button type="button" onClick={() => updatePath(['about', 'imageUrl'], '')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-error-border px-3 text-sm font-semibold text-error-foreground hover:bg-error-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-foreground"><Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus foto</button>}
                  </div>
                </div>
              </div>
              <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="sr-only" aria-label="Pilih foto profil" tabIndex={-1} aria-hidden="true" />
            </div>
          )}
        </div>
      );
    }
    if (activeSection === 'requirements') {
      return (
        <div className="space-y-7">
          <section aria-labelledby="documents-title">
            <div className="mb-3"><h3 id="documents-title" className="text-base font-bold text-ink-super-admin">Dokumen persyaratan</h3><p className="mt-1 text-sm text-muted-super-admin">Tentukan dokumen yang perlu disiapkan pendaftar.</p></div>
            {renderCollection(['requirements', 'documents'], draft.requirements?.documents, FIELD_CONFIG.documents, EMPTY_TEMPLATES.documents, 'Dokumen')}
          </section>
          <section aria-labelledby="fees-title">
            <div className="mb-3"><h3 id="fees-title" className="text-base font-bold text-ink-super-admin">Biaya yang ditampilkan</h3><p className="mt-1 text-sm text-muted-super-admin">Konten ini bersifat informasi publik. Pengaturan tarif tagihan ada di modul Pembayaran.</p></div>
            {renderCollection(['requirements', 'fees'], draft.requirements?.fees, FIELD_CONFIG.fees, EMPTY_TEMPLATES.fees, 'Biaya')}
          </section>
        </div>
      );
    }
    const fields = FIELD_CONFIG[activeSection];
    return renderCollection([activeSection], draft[activeSection], fields, EMPTY_TEMPLATES[activeSection], COLLECTION_LABELS[activeSection]);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-24">
      <header className="flex flex-col gap-4 border-b border-border-super-admin pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary-admin-institusi">Konten publik · BO-CMS</p>
          <h1 className="mt-1 font-serif text-2xl font-bold text-ink-super-admin sm:text-3xl">Landing page pesantren</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-super-admin">Atur informasi penerimaan yang dilihat wali santri. Perubahan tersimpan sebagai draft sampai diterbitkan.</p>
        </div>
        <button type="button" onClick={() => navigate('/landing-page', { state: { previewDraft } })} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border-super-admin bg-white px-4 text-sm font-semibold text-ink-super-admin hover:bg-surface-accent-super-admin focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
          Pratinjau draft <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      {!apiConfigured && <div className="rounded-xl border border-warning-border bg-warning-surface p-4 text-sm leading-relaxed text-warning-foreground" role="status">Mode persiapan aktif. Draft dapat disimpan di browser ini dan dipratinjau. Simpan ke server serta publikasi akan aktif setelah API backend dikonfigurasi.</div>}
      {isLoading && <p className="flex items-center gap-2 text-sm text-muted-super-admin" role="status"><LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Memuat draft landing page...</p>}
      {notice && <div className={`rounded-xl border p-4 text-sm leading-relaxed ${notice.type === 'error' ? 'border-error-border bg-error-surface text-error-foreground' : notice.type === 'success' ? 'border-success-border bg-success-surface text-success-foreground' : 'border-info-border bg-info-surface text-info-foreground'}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.text}</div>}

      <div className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label="Bagian landing page" className="h-fit rounded-xl border border-border-super-admin bg-white p-2 lg:sticky lg:top-20">
          <p className="px-3 pb-2 pt-2 text-xs font-semibold text-muted-super-admin">BAGIAN LANDING PAGE</p>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
            {SECTION_LIST.map((section, index) => (
              <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} aria-current={activeSection === section.id ? 'page' : undefined} className={`flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi ${activeSection === section.id ? 'bg-info-surface text-info-foreground' : 'text-muted-super-admin hover:bg-surface-muted-super-admin hover:text-ink-super-admin'}`}>
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current/30 text-[10px]">{String(index + 1).padStart(2, '0')}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </nav>

        <section className="min-w-0 rounded-xl border border-border-super-admin bg-white p-4 sm:p-6" aria-labelledby="editor-section-title">
          <div className="mb-5 border-b border-border-super-admin pb-4">
            <h2 id="editor-section-title" className="font-serif text-lg font-bold text-ink-super-admin sm:text-xl">{currentSection.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-super-admin">{currentSection.description}</p>
          </div>
          {renderEditor()}
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-border-super-admin bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:px-6 lg:left-72">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-super-admin" aria-live="polite">{isDirty ? 'Ada perubahan yang belum disimpan.' : apiConfigured && draftLoaded ? 'Draft terhubung ke server.' : 'Draft lokal di browser ini.'}{apiConfigured && !isValid ? ' Lengkapi nama pesantren, judul, dan deskripsi wajib sebelum publikasi.' : ''}</p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button type="button" onClick={handleSave} disabled={isSaving || isPublishing || isUploading || isLoading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border-super-admin bg-white px-4 text-sm font-semibold text-ink-super-admin hover:bg-surface-accent-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
              {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}{isSaving ? 'Menyimpan...' : apiConfigured && draftLoaded ? 'Simpan draft ke server' : 'Simpan draft lokal'}
            </button>
            <button type="button" onClick={handlePublish} disabled={!canPublish || !isValid} title={!apiConfigured ? 'Konfigurasi API untuk mengaktifkan publikasi.' : undefined} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-admin-institusi px-4 text-sm font-semibold text-white hover:bg-primary-hover-super-admin disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-admin-institusi">
              {isPublishing ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}{isPublishing ? 'Menerbitkan...' : 'Terbitkan landing page'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
