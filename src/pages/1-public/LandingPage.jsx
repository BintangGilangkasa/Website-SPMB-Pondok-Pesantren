import React from 'react';
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

export default function LandingPage() {
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
  } = landingPageData;

  return (
    <div className="min-h-screen bg-landing-paper font-sans text-landing-ink">
      <PublicNavbar institutionName={institution.name} />
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
      <PublicFooter data={landingPageData} />
    </div>
  );
}
