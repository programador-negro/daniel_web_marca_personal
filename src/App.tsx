import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { LeadMagnetSection } from './components/LeadMagnetSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { LegalModal } from './components/LegalModal';
import { QrCodeModal } from './components/QrCodeModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { analyticsService } from './services/analyticsService';
import { AdminPage } from './pages/AdminPage';
import { CotizadorPage } from './pages/CotizadorPage';
import { HabilidadesPage } from './pages/HabilidadesPage';
import { NycPage } from './pages/NycPage';

const MainLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'privacy' | 'cookies' | 'terms' | 'notice';
  }>({
    isOpen: false,
    tab: 'privacy',
  });

  // Track initial visit and scroll spy for active navbar state
  useEffect(() => {
    analyticsService.logVisit();

    const handleScroll = () => {
      const sections = [
        'inicio',
        'servicios',
        'proyectos',
        'sobre-mi',
        'experiencia',
        'faqs',
        'contacto',
      ];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLegal = (tab: 'privacy' | 'cookies' | 'terms' | 'notice') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-100 selection:text-cyan-950">
      
      {/* Navigation Bar with Language Toggle & Telemetry */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Conversion & SEO Hero */}
        <HeroSection />

        {/* 2. Core Services (Process Automation, ETL, Full-Stack, Backend) */}
        <ServicesSection />

        {/* 3. High-Value Lead Magnet (Email Capture Blueprint) */}
        <LeadMagnetSection />

        {/* 5. Production Projects with Verified Source Repos */}
        <ProjectsSection />

        {/* 7. Professional Profile & Experience */}
        <AboutSection />
        <ExperienceSection />

        {/* 8. Frequently Asked Questions (Contracts, SLA, Payments, Tech) */}
        <FAQSection />

        {/* 9. Direct Contact with Anti-Spam Protection */}
        <ContactSection />
      </main>

      {/* Footer with Legal Links & QR Code */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenQr={() => setIsQrModalOpen(true)}
      />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsentBanner onOpenLegal={handleOpenLegal} />

      {/* Legal Information Modal (Privacy, Cookies, Terms, Notice) */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={handleCloseLegal}
      />

      {/* QR Code Modal for Printing/Sharing */}
      <QrCodeModal 
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Floating Glassmorphism WhatsApp Action Button */}
      <FloatingWhatsAppButton />

      {/* Floating Scroll To Top Button (Appears past hero) */}
      <ScrollToTopButton />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/nyc" element={<NycPage />} />
          <Route path="/cotizador" element={<CotizadorPage />} />
          <Route path="/habilidades" element={<HabilidadesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
