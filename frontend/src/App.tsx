import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SkripsiLabSection } from './components/SkripsiLabSection';
import { NutritionistWorkbench } from './components/NutritionistWorkbench';
import { ClinicalCasesSection } from './components/ClinicalCasesSection';
import { ExperienceRotationsSection } from './components/ExperienceRotationsSection';
import { MediaInfographicsSection } from './components/MediaInfographicsSection';
import { SkillsCertificationsSection } from './components/SkillsCertificationsSection';
import { ThesisSupportGuestbook } from './components/ThesisSupportGuestbook';
import { GuestbookFloatingButton } from './components/GuestbookFloatingButton';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5F6] text-[#4A4A4A] font-sans selection:bg-[#F8BBD0] selection:text-[#2D2D2D] relative overflow-x-hidden">
      {/* Subtle background ambient blur spheres */}
      <div className="fixed -top-32 -left-32 w-[550px] h-[550px] bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-32 w-[500px] h-[500px] bg-[#E0E0E0] rounded-full blur-3xl opacity-40 pointer-events-none -z-10" />
      <div className="fixed -bottom-32 left-1/4 w-[600px] h-[600px] bg-[#FCE4EC] rounded-full blur-3xl opacity-40 pointer-events-none -z-10" />

      {/* Sticky Header with Navigation */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Editorial Section */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onExploreSkripsi={() => scrollToSection('skripsi')}
          onExploreWorkbench={() => scrollToSection('workbench')}
        />

        {/* 2. Flagship Skripsi Research & Food Formulation Lab */}
        <SkripsiLabSection />

        {/* 3. Interactive Nutritionist's Workbench & Clinical Calculator */}
        <NutritionistWorkbench />

        {/* 4. Clinical Case Studies (PAGT / ADIME Dossier) */}
        <ClinicalCasesSection />

        {/* 5. Clinical Rotations & Fieldwork (RS, MSPM, Puskesmas) */}
        <ExperienceRotationsSection />

        {/* 6. Nutrition Communication, Leaflets & Infographics Gallery */}
        <MediaInfographicsSection />

        {/* 7. Technical Skills & Verified Certifications */}
        <SkillsCertificationsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGuestbook={() => setIsGuestbookOpen(true)}
      />

      {/* Floating shortcut to Thesis Defense Guestbook & Encouragement Board */}
      <GuestbookFloatingButton onClick={() => setIsGuestbookOpen(true)} />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ThesisSupportGuestbook
        isOpen={isGuestbookOpen}
        onClose={() => setIsGuestbookOpen(false)}
      />
    </div>
  );
}
