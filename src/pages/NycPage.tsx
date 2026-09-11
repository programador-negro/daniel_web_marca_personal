import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Download, MessageSquare, Calendar, Mail, 
  Sparkles, TrendingUp, Clock, DollarSign, Building2, 
  CheckCircle2, ArrowRight, Share2, Copy, Check,
  ChevronRight, UserCheck
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { LegalModal } from '../components/LegalModal';
import { QrCodeModal } from '../components/QrCodeModal';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { analyticsService } from '../services/analyticsService';

export const NycPage: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('nyc');
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadedVcard, setDownloadedVcard] = useState<boolean>(false);

  // Legal Modal
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'privacy' | 'cookies' | 'terms' | 'notice';
  }>({
    isOpen: false,
    tab: 'privacy',
  });

  // ROI Calculator State
  const [industry, setIndustry] = useState<string>('ecommerce');
  const [teamSize, setTeamSize] = useState<number>(5);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(40);

  // Quick Audit Form
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    company: '',
    workflowProblem: '',
  });
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    analyticsService.trackEvent('nyc_landing_page_viewed', { timestamp: new Date().toISOString() });
  }, []);

  // Calculate ROI
  const weeklyHoursSavedPerTeam = Math.round(teamSize * manualHoursPerWeek * 0.75); // 75% efficiency gain
  const annualHoursSaved = weeklyHoursSavedPerTeam * 50;
  const annualDollarSavings = annualHoursSaved * hourlyRate;

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
      'NOTE:Met in New York City! Specialist in Python, Airflow, GCP BigQuery, and Business Workflow Automation.',
      'ADR;TYPE=WORK:;;New York City / Remote;;NY;;',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Daniel_Ibarra_NYC_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setDownloadedVcard(true);
    analyticsService.trackEvent('nyc_vcard_downloaded', {});
    setTimeout(() => setDownloadedVcard(false), 3000);
  };

  const handleCopyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    analyticsService.trackEvent('nyc_page_link_copied', {});
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenLegal = (tab: 'privacy' | 'cookies' | 'terms' | 'notice') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditForm.name || !auditForm.email) return;

    setIsSubmittingAudit(true);
    
    // Track event
    analyticsService.trackEvent('nyc_audit_form_submitted', {
      name: auditForm.name,
      company: auditForm.company,
      industry,
      teamSize,
      estSavings: annualDollarSavings
    });

    setTimeout(() => {
      setIsSubmittingAudit(false);
      setAuditSuccess(true);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    isSpanish
      ? `¡Hola Daniel! Conectamos en Nueva York 🗽. Me gustaría conversar sobre automatizar los flujos de mi empresa (Ahorro estimado $${annualDollarSavings.toLocaleString()} USD/año).`
      : `Hi Daniel! We connected in NYC 🗽. I'd like to discuss automating workflows for my company (Est. savings $${annualDollarSavings.toLocaleString()} USD/yr).`
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Global Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* NYC Top Hero Banner */}
      <section className="pt-24 sm:pt-28 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 relative overflow-hidden">
        {/* Ambient Glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Breadcrumb & NYC Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isSpanish ? 'Inicio' : 'Home'}</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-bold shadow-lg shadow-cyan-950/40">
              <span className="text-base leading-none">🗽</span>
              <span>{isSpanish ? 'New York City Business Meetup' : 'NYC Executive Contact Card'}</span>
            </div>
          </div>

          {/* Main NYC Greeting Card */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 sm:p-8 md:p-10 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                    <img 
                      src="/icon.png" 
                      alt="Daniel Ibarra" 
                      className="w-full h-full object-cover rounded-[14px]"
                      onError={(e) => {
                        // fallback if icon missing
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-bold" title="Available EST">
                    ✓
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Daniel Ibarra
                  </h1>
                  <p className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold mt-0.5">
                    Software Engineer & Cloud Automation Specialist
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{isSpanish ? 'En New York City • Zona Horaria EST' : 'In New York City • EST Time Zone'}</span>
                  </div>
                </div>
              </div>

              {/* Share / QR Button */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  onClick={handleCopyPageLink}
                  className="px-3 py-2 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600/80 transition-all flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedLink ? (isSpanish ? 'Copiado' : 'Copied') : (isSpanish ? 'Compartir' : 'Share')}</span>
                </button>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600/80 transition-all flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>QR</span>
                </button>
              </div>
            </div>

            {/* Custom Welcome Message */}
            <div className="pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                {isSpanish ? (
                  <>
                    ¡Un gusto haber conectado contigo en <span className="text-cyan-400">Nueva York</span>! 🗽
                  </>
                ) : (
                  <>
                    Great to connect with you in <span className="text-cyan-400">New York City</span>! 🗽
                  </>
                )}
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-3xl">
                {isSpanish ? (
                  'Diseño y construyo sistemas de automatización B2B, arquitectura Cloud (GCP/BigQuery/Python) e integración de plataformas que eliminan cuellos de botella operativos, ahorrando cientos de horas de trabajo manual a tu equipo.'
                ) : (
                  'I design and engineer B2B workflow automation, custom Cloud pipelines (GCP/BigQuery/Python), and systems integration that eliminate operational bottlenecks—saving your team hundreds of manual hours every year.'
                )}
              </p>

              {/* Primary 1-Tap Action Buttons Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                
                {/* 1. Save Contact Card (.vcf) */}
                <button
                  onClick={handleDownloadVCard}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 border border-cyan-300/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {downloadedVcard ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{isSpanish ? '¡Contacto Guardado!' : '¡Contact Saved!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white" />
                      <span>{isSpanish ? 'Guardar Contacto (.vcf)' : 'Save Contact Card (.vcf)'}</span>
                    </>
                  )}
                </button>

                {/* 2. Direct WhatsApp */}
                <a
                  href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/30 border border-emerald-400/40 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{isSpanish ? 'WhatsApp Directo' : 'Direct WhatsApp'}</span>
                </a>

                {/* 3. Book 15-Min Strategy Call */}
                <a
                  href={`mailto:${personalInfo.email}?subject=NYC%20Meeting%20Request%20-%20Workflow%20Automation&body=Hi%20Daniel,%20I'd%20like%20to%20book%20a%2015-minute%20call%20to%20discuss...`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold text-xs border border-slate-500/60 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{isSpanish ? 'Agendar 15 min' : 'Book 15-Min Call'}</span>
                </a>

                {/* 4. Direct Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{personalInfo.email.split('@')[0]}@...</span>
                </a>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive ROI & Time Savings Calculator */}
      <section className="py-16 bg-slate-900 border-b border-slate-800 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isSpanish ? 'Calculadora de Retorno de Inversión (ROI)' : 'NYC Business ROI Simulator'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isSpanish ? '¿Cuánto tiempo y dinero está perdiendo tu empresa en procesos manuales?' : 'How Much Time & Money Is Your Team Losing To Manual Tasks?'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSpanish ? 'Calcula el impacto financiero estimado de automatizar tus flujos operativos con ingeniería de software personalizada.' : 'Estimate the annual savings of automating your core business workflows with custom software pipelines.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Controls */}
            <div className="lg:col-span-7 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 space-y-6">
              
              {/* Industry Select */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{isSpanish ? '1. Sector / Industria' : '1. Industry Sector'}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ecommerce', labelEs: 'E-Commerce', labelEn: 'E-Commerce' },
                    { id: 'realestate', labelEs: 'Inmobiliaria', labelEn: 'Real Estate' },
                    { id: 'logistics', labelEs: 'Logística', labelEn: 'Logistics' },
                    { id: 'finance', labelEs: 'Finanzas/Legales', labelEn: 'Finance/Legal' },
                    { id: 'hospitality', labelEs: 'Hotelería/Turismo', labelEn: 'Hospitality' },
                    { id: 'services', labelEs: 'Servicios B2B', labelEn: 'B2B Services' },
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setIndustry(ind.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        industry === ind.id
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/50'
                          : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {isSpanish ? ind.labelEs : ind.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>{isSpanish ? '2. Tamaño del Equipo de Operaciones' : '2. Operations Team Size'}</span>
                  </label>
                  <span className="text-sm font-extrabold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-md border border-cyan-800">
                    {teamSize} {isSpanish ? 'empleados' : 'people'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 person</span>
                  <span>25 people</span>
                  <span>50+ people</span>
                </div>
              </div>

              {/* Hours spent per employee slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{isSpanish ? '3. Horas manuales por persona/semana' : '3. Manual Hours / Employee / Week'}</span>
                  </label>
                  <span className="text-sm font-extrabold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-md border border-cyan-800">
                    {manualHoursPerWeek} hrs/wk
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>2 hrs (Light)</span>
                  <span>15 hrs (Moderate)</span>
                  <span>30 hrs (Heavy)</span>
                </div>
              </div>

              {/* Avg Hourly Cost Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>{isSpanish ? '4. Costo promedio por hora ($ USD)' : '4. Avg Hourly Labor Cost ($ USD)'}</span>
                  </label>
                  <span className="text-sm font-extrabold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800">
                    ${hourlyRate} / hr
                  </span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="120" 
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$15/hr</span>
                  <span>$50/hr</span>
                  <span>$120+/hr</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Results Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-2xl border-2 border-cyan-500/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800 inline-block mb-4">
                  {isSpanish ? 'Ahorro Financiero Anual Estimado' : 'Est. Annual ROI Impact'}
                </span>

                <div className="space-y-4">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight text-emerald-400">
                      ${annualDollarSavings.toLocaleString()} <span className="text-sm font-bold text-slate-300">USD / yr</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {isSpanish ? 'Ahorro directo en horas de trabajo desperdiciadas.' : 'Direct labor cost savings from automated pipelines.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/80">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400 font-medium">{isSpanish ? 'Horas Liberadas' : 'Hours Recovered'}</div>
                      <div className="text-lg font-bold text-cyan-300 mt-0.5">
                        {annualHoursSaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">hrs/yr</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400 font-medium">{isSpanish ? 'Eficiencia Ops' : 'Speed Boost'}</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">
                        +85% <span className="text-xs font-normal text-slate-400">faster</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-xs text-cyan-200 leading-relaxed">
                  💡 <strong className="text-white">{isSpanish ? 'Casos típicos:' : 'Typical use cases:'}</strong> {isSpanish 
                    ? 'Extracción automática de datos, integración de inventarios/CRM, reportes en tiempo real y chatbots de respuesta inmediata.' 
                    : 'Automated data pipelines, invoice processing, CRM inventory sync, real-time dashboards & AI customer workflows.'}
                </div>
              </div>

              {/* Direct CTA */}
              <div className="mt-8 pt-4 border-t border-slate-700/80">
                <a
                  href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
                  <span>{isSpanish ? 'Solicitar Auditoría de Flujo Gratis' : 'Request Free 15-Min Workflow Audit'}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* "Before vs After" Workflow Transformation Showcase */}
      <section className="py-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isSpanish ? 'Transformación de Procesos: Antes vs. Después' : 'Workflow Transformation: Before vs. After'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSpanish ? 'Mira cómo reemplazamos tareas lentas y propensas a error por flujos automatizados en la nube.' : 'See how custom engineering eliminates bottleneck friction across operations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Case 1 */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {isSpanish ? 'Atención al Cliente & Leed Intake' : 'Customer Intake & CRM Lead Flow'}
                </span>
              </div>

              {/* Before */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-1.5">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{isSpanish ? 'PROCESO MANUAL (LENTO)' : 'MANUAL PROCESS (SLOW)'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isSpanish ? 'Copiar datos de formularios a mano, retrasos de 24 horas en responder y oportunidades perdidas.' : 'Manual copy-pasting from emails to CRM, 24-hr delay in response time, missed leads.'}
                </p>
              </div>

              {/* After */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isSpanish ? 'CON DANIEL IBARRA (AUTOMATIZADO)' : 'WITH DANIEL IBARRA (AUTOMATED)'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isSpanish ? 'Extracción webhooks instantánea, calificación por IA, auto-respuesta en 3 segundos e ingreso automático a base de datos.' : 'Instant webhooks, AI lead scoring, instant 3-sec customer response & automatic database sync.'}
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {isSpanish ? 'Reportes & Data Warehousing (GCP BigQuery)' : 'Reports & BigQuery Cloud Pipelines'}
                </span>
              </div>

              {/* Before */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-1.5">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{isSpanish ? 'PROCESO MANUAL (LENTO)' : 'MANUAL PROCESS (SLOW)'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isSpanish ? 'Exportación manual de archivos Excel, consolidación de datos cada semana y reportes desactualizados.' : 'Manual Excel exports, weekly data stitching, outdated decision-making dashboards.'}
                </p>
              </div>

              {/* After */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isSpanish ? 'CON DANIEL IBARRA (AUTOMATIZADO)' : 'WITH DANIEL IBARRA (AUTOMATED)'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isSpanish ? 'Pipelines Airflow/Python procesando millones de registros diarios directamente en GCP BigQuery con métricas en tiempo real.' : 'Airflow/Python pipelines orchestrating millions of daily rows directly into GCP BigQuery with live dashboards.'}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800 text-center">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">200+</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">{isSpanish ? 'Pipelines automatizados' : 'Orchestrated pipelines'}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">20M+</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">{isSpanish ? 'Registros diarios' : 'Daily rows processed'}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">EST</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">{isSpanish ? 'Zona horaria NY' : 'NYC Working Hours'}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">C1</div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">{isSpanish ? 'Inglés Fluido' : 'Advanced English'}</div>
            </div>
          </div>

        </div>
      </section>

      {/* Direct Audit Form / Quick Contact Section */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                {isSpanish ? 'Auditoría Sin Costo' : 'Free 15-Min Workflow Consultation'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {isSpanish ? '¿Conversamos en Nueva York o por Videollamada?' : 'Let’s Connect in NYC or via Video Call'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isSpanish ? 'Déjame tus datos y te responderé en menos de 2 horas con opciones de reunión.' : 'Leave your details and I’ll reach out within 2 hours to set up a quick 15-min chat.'}
              </p>
            </div>

            {auditSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  {isSpanish ? '¡Mensaje Recibido!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isSpanish ? 'Gracias por conectar conmigo. Revisaré tus datos y te responderé en breve.' : 'Thank you for reaching out! I will review your requirements and get back to you shortly.'}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isSpanish ? 'Hablar por WhatsApp ahora' : 'Chat on WhatsApp Now'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isSpanish ? 'Tu Nombre / Representante' : 'Your Name'} *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={isSpanish ? 'Ej. Alex Miller' : 'e.g. Alex Miller'}
                      value={auditForm.name}
                      onChange={(e) => setAuditForm({...auditForm, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isSpanish ? 'Correo Electrónico' : 'Email Address'} *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="alex@company.com"
                      value={auditForm.email}
                      onChange={(e) => setAuditForm({...auditForm, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isSpanish ? 'Empresa / Negocio (Opcional)' : 'Company Name (Optional)'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={isSpanish ? 'Ej. NYC Logistics Corp' : 'e.g. NYC Logistics Corp'}
                      value={auditForm.company}
                      onChange={(e) => setAuditForm({...auditForm, company: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isSpanish ? '¿En qué proceso necesitan ayuda?' : 'Main Process Bottleneck'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={isSpanish ? 'Ej. Extracción de facturas, CRM...' : 'e.g. Invoice processing, CRM sync...'}
                      value={auditForm.workflowProblem}
                      onChange={(e) => setAuditForm({...auditForm, workflowProblem: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingAudit}
                  className="w-full py-3.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-cyan-950/40 border border-cyan-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>{isSubmittingAudit ? (isSpanish ? 'Enviando...' : 'Sending...') : (isSpanish ? 'Solicitar Consulta Gratis' : 'Request Free Consultation')}</span>
                </button>
              </form>
            )}

            {/* Quick Link to Cotizador Page */}
            <div className="mt-6 pt-4 border-t border-slate-700/80 text-center">
              <p className="text-xs text-slate-400">
                {isSpanish ? '¿Buscas una cotización estimada de desarrollo?' : 'Looking for an instant project price estimate?'} {' '}
                <Link to="/cotizador" className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>{isSpanish ? 'Ir al Cotizador Interactivo' : 'Try the Price Estimator'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>

          </div>

        </div>
      </section>

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

export default NycPage;
