import React, { useEffect, useState } from 'react';
import PublicNavbar from '../../components/layout/landing-page/Navbar';
import PublicFooter from '../../components/layout/landing-page/Footer';
import AboutSection from './components/AboutSection';
import AdmissionSection from './components/AdmissionSection';
import ContactSection from './components/ContactSection';
import FacilitiesSection from './components/FacilitiesSection';
import FaqSection from './components/FaqSection';
import HeroSection from './components/HeroSection';
import ProgramsSection from './components/ProgramsSection';
import RegistrationTimelineSection from './components/RegistrationTimelineSection';
import RequirementsSection from './components/RequirementsSection';
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
  const [pageData, setPageData] = useState(landingPageData);
  const [isLoading, setIsLoading] = useState(isLandingPageApiConfigured());
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
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
  }, []);

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
