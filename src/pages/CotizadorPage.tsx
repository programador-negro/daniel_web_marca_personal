import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, Sparkles, Download, MessageSquare, Calendar, Mail, Check 
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
    <div className="min-h-screen bg-[#fbfbfb] bg-noise text-slate-900 flex flex-col font-sans">
      
      {/* Global Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Header Banner & Breadcrumb */}
      <div className="pt-24 sm:pt-28 pb-4 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="btn-ios-secondary inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 text-slate-600 hover:text-slate-900 text-xs font-mono uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                <span>{isSpanish ? 'Volver al inicio' : 'Back to Home'}</span>
              </Link>
              <span className="text-slate-300 font-mono">/</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 font-medium uppercase tracking-widest">
                <Calculator className="w-3.5 h-3.5 text-slate-500" />
                <span>{isSpanish ? 'Cotizador Interactivo' : 'Interactive Estimator'}</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
              <span>{isSpanish ? 'Presupuesto transparente e inmediato' : 'Transparent & instant estimate'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Quick Actions Banner */}
      <section className="py-6 bg-[#fbfbfb] bg-noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-editorial p-6 bg-white border border-slate-200/60 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center lg:text-left max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[9px] font-mono font-bold uppercase tracking-widest inline-block">
                {isSpanish ? 'Contacto Directo' : 'Direct Contact'}
              </span>
              <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight font-mono uppercase">
                {isSpanish ? '¿Prefieres conversar directamente?' : 'Prefer to Talk Directly?'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                {isSpanish 
                  ? 'Guarda mi contacto, escríbeme por WhatsApp, agenda una videollamada corta o envíame un correo para definir tu alcance.'
                  : 'Save my contact, text me on WhatsApp, book a quick call, or send me an email to define your project scope.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              {/* 1. Save Contact Card (.vcf) */}
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="btn-ios-dark py-2.5 px-4 rounded-xl text-white font-mono uppercase tracking-wider text-[10px] font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800"
              >
                {downloadedVcard ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isSpanish ? '¡Guardado!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-slate-300" />
                    <span>{isSpanish ? 'Guardar VCF' : 'Save Contact'}</span>
                  </>
                )}
              </button>

              {/* 2. Direct WhatsApp */}
              <a
                href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl border border-emerald-200/60 text-emerald-700 hover:bg-emerald-50/50 text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 bg-emerald-50/20"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>WhatsApp</span>
              </a>

              {/* 3. Book 15-Min Strategy Call */}
              <a
                href={`mailto:${personalInfo.email}?subject=Cotizacion%20-%20Daniel%20Ibarra&body=Hola%20Daniel,%20me%20gustaria%20agendar%20una%20llamada%20de%2015%20minutos%20para%20conversar%20sobre...`}
                className="py-2.5 px-4 rounded-xl border border-indigo-200/60 text-indigo-700 hover:bg-indigo-50/50 text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 bg-indigo-50/20"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isSpanish ? 'Agendar' : 'Book Call'}</span>
              </a>

              {/* 4. Direct Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="py-2.5 px-4 rounded-xl border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 bg-white"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
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
