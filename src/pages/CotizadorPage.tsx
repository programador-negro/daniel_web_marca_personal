import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, Download, MessageSquare, Calendar, Mail, Check 
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { QuoteEstimatorSection } from '../components/QuoteEstimatorSection';
import { Footer } from '../components/Footer';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { LegalModal } from '../components/LegalModal';
import { QrCodeModal } from '../components/QrCodeModal';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useLanguage } from '../context/LanguageContext';
import { analyticsService } from '../services/analyticsService';
import { personalInfo } from '../data/portfolioData';

export const CotizadorPage: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('cotizador');
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [downloadedVcard, setDownloadedVcard] = useState<boolean>(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'privacy' | 'cookies' | 'terms' | 'notice';
  }>({
    isOpen: false,
    tab: 'privacy',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    analyticsService.trackEvent('cotizador_page_viewed', {});
  }, []);

  const handleOpenLegal = (tab: 'privacy' | 'cookies' | 'terms' | 'notice') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Generate and download vCard file
  const handleDownloadVCard = () => {
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Daniel Ibarra',
      'N:Ibarra;Daniel;;;',
      'TITLE:Software Engineer & B2B Cloud Automation Specialist',
      'ORG:Daniel Ibarra Engineering',
      `TEL;TYPE=CELL,VOICE:+${personalInfo.whatsappNumber}`,
      `EMAIL;TYPE=INTERNET,PREF:${personalInfo.email}`,
      'URL:https://danielib.com',
      'NOTE:Specialist in Python, Airflow, GCP BigQuery, and Business Workflow Automation.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Daniel_Ibarra_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setDownloadedVcard(true);
    analyticsService.trackEvent('cotizador_vcard_downloaded', {});
    setTimeout(() => setDownloadedVcard(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    isSpanish
      ? `¡Hola Daniel! Estoy en tu cotizador interactivo y me gustaría conversar directamente sobre una estimación de desarrollo personalizado.`
      : `Hi Daniel! I am using your interactive price estimator and I'd like to talk directly about a custom development estimate.`
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#191919] flex flex-col font-sans">
      
      {/* Global Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Header Banner & Breadcrumb */}
      <div className="pt-24 sm:pt-28 pb-4 bg-[#F4F3EE] border-b border-[#E5E2D9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-[#6B665E] hover:text-[#191919] hover:bg-white text-xs font-mono uppercase tracking-wider transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#6B665E]" />
                <span>{isSpanish ? 'Volver al inicio' : 'Back to Home'}</span>
              </Link>
              <span className="text-[#E5E2D9] font-mono">/</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#191919] text-[#FAF9F5] text-xs font-mono uppercase tracking-wider font-medium shadow-2xs">
                <Calculator className="w-3.5 h-3.5 text-[#C15F3C]" />
                <span>{isSpanish ? 'Cotizador & ROI' : 'Quote & ROI'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Quick Actions Banner */}
      <section className="py-8 bg-[#FAF9F5] relative overflow-hidden border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-[6px] p-6 sm:p-8 bg-[#F4F3EE] border border-[#E5E2D9] shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-8 transition-all">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6B665E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C]" />
                <span className="uppercase tracking-wider">
                  {isSpanish ? 'Canales Directos' : 'Direct Channels'}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#191919] tracking-tight">
                {isSpanish ? '¿Prefieres una vía directa sin intermediarios?' : 'Need a Faster, Direct Route?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B665E] leading-relaxed font-normal">
                {isSpanish 
                  ? 'Guarda mi tarjeta vCard, conversemos en tiempo real por WhatsApp, agenda una llamada de 15 minutos o envíame un email directo.'
                  : 'Save my vCard contact, chat in real-time on WhatsApp, schedule a 15-min call, or email me directly.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              {/* 1. Save Contact Card (.vcf) */}
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="py-2.5 px-3.5 rounded-[6px] text-[#FAF9F5] font-sans text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer bg-[#191919] hover:bg-[#303030] border border-[#191919]"
              >
                {downloadedVcard ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isSpanish ? '¡Guardado!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#FAF9F5]" />
                    <span>{isSpanish ? 'Guardar Contacto' : 'Save Contact'}</span>
                  </>
                )}
              </button>

              {/* 2. Direct WhatsApp */}
              <a
                href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 rounded-[6px] border border-emerald-300 text-emerald-900 hover:bg-emerald-100/70 text-xs font-sans font-medium transition-colors flex items-center justify-center gap-2 bg-emerald-50 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* 3. Book 15-Min Strategy Call */}
              <a
                href={`mailto:${personalInfo.email}?subject=Cotizacion%20-%20Daniel%20Ibarra&body=Hola%20Daniel,%20me%20gustaria%20agendar%20una%20llamada%20de%2015%20minutos%20para%20conversar%20sobre...`}
                className="py-2.5 px-3.5 rounded-[6px] border border-[#E5E2D9] text-[#191919] hover:bg-white text-xs font-sans font-medium transition-colors flex items-center justify-center gap-2 bg-[#FAF9F5] shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C15F3C]" />
                <span>{isSpanish ? 'Agendar (15 min)' : 'Book Call'}</span>
              </a>

              {/* 4. Direct Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="py-2.5 px-3.5 rounded-[6px] border border-[#E5E2D9] text-[#191919] hover:bg-white text-xs font-sans font-medium transition-colors flex items-center justify-center gap-2 bg-[#FAF9F5] shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#6B665E]" />
                <span>{personalInfo.email.split('@')[0]}@...</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quote Estimator Content */}
      <main className="flex-1">
        <QuoteEstimatorSection />
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

export default CotizadorPage;
