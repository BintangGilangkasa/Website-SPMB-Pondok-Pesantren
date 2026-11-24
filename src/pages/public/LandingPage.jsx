import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicFooter, PublicNavbar } from '@/components/layout';
import {
  AboutSection,
  AdmissionSection,
  ContactSection,
  FacilitiesSection,
  FaqSection,
  HeroSection,
  ProgramsSection,
  RegistrationTimelineSection,
  RequirementsSection,
} from '@/components/landing-page';
import { landingPageData } from '../../data/landingPageData';
import { getPublishedLandingPage, isLandingPageApiConfigured } from '../../services/landingPageService';

function mergeLandingPageData(response) {
  const remote = response?.content ?? response?.landingPage ?? response ?? {};
  const fallback = landingPageData;
  const remoteRequirements = remote.requirements ?? {};

  return {
    ...fallback,
    ...remote,
    institution: { ...fallback.institution, ...(remote.institution ?? {}) },
    hero: { ...fallback.hero, ...(remote.hero ?? {}) },
    about: { ...fallback.about, ...(remote.about ?? {}) },
    requirements: {
      ...fallback.requirements,
      ...remoteRequirements,
      documents: remoteRequirements.documents ?? fallback.requirements.documents,
      fees: remoteRequirements.fees ?? fallback.requirements.fees,
    },
    educationList: remote.educationList ?? fallback.educationList,
    offerings: remote.offerings ?? fallback.offerings,
    timelines: remote.timelines ?? fallback.timelines,
    steps: remote.steps ?? fallback.steps,
    environments: remote.environments ?? fallback.environments,
    faqs: remote.faqs ?? fallback.faqs,
  };
}

export default function LandingPage() {
  const location = useLocation();
  const previewDraft = location.state?.previewDraft;
  const isPreview = Boolean(previewDraft);
  const [pageData, setPageData] = useState(() => previewDraft ? mergeLandingPageData(previewDraft) : landingPageData);
  const [isLoading, setIsLoading] = useState(isLandingPageApiConfigured() && !isPreview);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (previewDraft) {
      setPageData(mergeLandingPageData(previewDraft));
      setIsLoading(false);
      setLoadFailed(false);
      return undefined;
    }
    if (!isLandingPageApiConfigured()) return undefined;

    let isCurrent = true;
    setIsLoading(true);
    getPublishedLandingPage()
      .then((response) => {
        if (isCurrent) setPageData(mergeLandingPageData(response));
      })
      .catch(() => {
        if (isCurrent) setLoadFailed(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [previewDraft]);

  const {
    institution,
    hero,
    about,
    educationList,
    offerings,
    timelines,
    requirements,
    steps,
    environments,
    faqs,
  } = pageData;

  return (
    <div className="min-h-screen bg-landing-paper font-sans text-landing-ink">
      <PublicNavbar institutionName={institution.name} />
      {isPreview && (
        <div className="flex flex-col items-center justify-between gap-2 bg-sidebar-deep-super-admin px-4 py-3 text-sm text-white sm:flex-row sm:px-6" role="status">
          <p>Pratinjau draft backoffice. Konten ini belum diterbitkan.</p>
          <Link to="/admin-institusi/landing-page" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Kembali ke editor</Link>
        </div>
      )}
      {isLoading && (
        <p className="bg-landing-surface px-4 py-2 text-center text-sm text-landing-muted" role="status" aria-live="polite">
          Memuat informasi landing page terbaru...
        </p>
      )}
      {loadFailed && (
        <div className="border-b border-warning-border bg-warning-surface px-4 py-3 text-center text-sm text-warning-foreground" role="alert">
          Informasi terbaru belum dapat dimuat. Halaman menampilkan konten cadangan.
        </div>
      )}
      <main>
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <ProgramsSection programs={educationList} />
        <AdmissionSection offerings={offerings} />
        <RegistrationTimelineSection timelines={timelines} steps={steps} />
        <RequirementsSection requirements={requirements} />
        <FacilitiesSection environments={environments} />
        <FaqSection faqs={faqs} />
        <ContactSection institution={institution} />
      </main>
      <PublicFooter data={pageData} />
    </div>
  );
}
