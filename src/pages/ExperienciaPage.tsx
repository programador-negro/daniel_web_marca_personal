import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ExperienceSection } from '../components/ExperienceSection';
import { Footer } from '../components/Footer';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { LegalModal } from '../components/LegalModal';
import { QrCodeModal } from '../components/QrCodeModal';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useLanguage } from '../context/LanguageContext';
import { analyticsService } from '../services/analyticsService';

export const ExperienciaPage: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('experiencia');
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'privacy' | 'cookies' | 'terms' | 'notice';
  }>({
    isOpen: false,
    tab: 'privacy',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    analyticsService.trackEvent('experiencia_page_viewed', {});
  }, []);

  const handleOpenLegal = (tab: 'privacy' | 'cookies' | 'terms' | 'notice') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] bg-noise text-slate-900 flex flex-col font-sans">
      
      {/* Global Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Header Banner & Breadcrumb */}
      <div className="pt-24 sm:pt-28 pb-4 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="btn-ios-secondary inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 text-slate-700 hover:text-slate-950 text-xs font-mono uppercase tracking-widest transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                <span>{isSpanish ? 'Volver al inicio' : 'Back to Home'}</span>
              </Link>
              <span className="text-slate-300 font-mono">/</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono uppercase tracking-widest font-bold shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isSpanish ? 'Trayectoria' : 'Career'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Experience Content */}
      <main className="flex-1">
        <ExperienceSection />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} onOpenQr={() => setIsQrModalOpen(true)} />

      {/* Utilities */}
      <CookieConsentBanner onOpenLegal={handleOpenLegal} />
      <LegalModal isOpen={legalModalState.isOpen} initialTab={legalModalState.tab} onClose={handleCloseLegal} />
      <QrCodeModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />

    </div>
  );
};

export default ExperienciaPage;
