import React, { useState, useEffect } from 'react';
import { 
  Building2, UserCheck, Clock, DollarSign, TrendingUp, Sparkles, 
  CheckCircle2, ArrowRight, MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { analyticsService } from '../services/analyticsService';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const translationsDict = {
  es: {
    badge: 'Simulador de Ahorro y ROI',
    title: '¿Cuánto tiempo y dinero pierde tu empresa en procesos manuales?',
    subtitle: 'Calcula el impacto financiero estimado de automatizar tus flujos operativos con ingeniería de software personalizada.',
    industryLabel: '1. Sector / Industria',
    teamSizeLabel: '2. Tamaño del Equipo de Operaciones',
    teamSizeSuffix: 'empleados',
    hoursLabel: '3. Horas manuales por persona/semana',
    hoursSuffix: 'hrs/sem',
    costLabel: '4. Costo promedio por hora ($ USD)',
    costSuffix: '/ hr',
    resultTitle: 'Ahorro Financiero Anual Estimado',
    resultSuffix: 'USD / año',
    resultDesc: 'Ahorro directo en horas de trabajo desperdiciadas.',
    hoursSaved: 'Horas Liberadas',
    hoursSavedSuffix: 'hrs/año',
    efficiency: 'Eficiencia Ops',
    efficiencyVal: '+85% más rápido',
    typicalCasesTitle: 'Casos típicos:',
    typicalCasesText: 'Extracción automática de datos, integración de inventarios/CRM, reportes en tiempo real y flujos con IA.',
    ctaAudit: 'Solicitar Auditoría de Flujo Gratis',
    transformationTitle: 'Transformación de Procesos: Antes vs. Después',
    transformationSubtitle: 'Mira cómo reemplazamos tareas lentas y propensas a error por flujos automatizados en la nube.',
    process1Title: 'Atención al Cliente & Flujo de Leads',
    process1Manual: 'PROCESO MANUAL (LENTO)',
    process1ManualText: 'Copiar datos de formularios a mano, retrasos de 24 horas en responder y oportunidades perdidas.',
    process1Auto: 'CON DANIEL IBARRA (AUTOMATIZADO)',
    process1AutoText: 'Extracción webhooks instantánea, calificación por IA, auto-respuesta en 3 segundos e ingreso automático a CRM.',
    process2Title: 'Reportes & Pipelines de Datos',
    process2Manual: 'PROCESO MANUAL (LENTO)',
    process2ManualText: 'Exportación manual de archivos Excel, consolidación de datos cada semana y reportes desactualizados.',
    process2Auto: 'CON DANIEL IBARRA (AUTOMATIZADO)',
    process2AutoText: 'Pipelines Airflow/Python procesando registros diarios directamente en GCP BigQuery con métricas en tiempo real.',
    auditBadge: 'Auditoría Sin Costo',
    auditTitle: '¿Conversamos sobre tus flujos de trabajo?',
    auditSubtitle: 'Déjame tus datos y te responderé en menos de 2 horas con opciones para agendar una sesión rápida de 15 minutos.',
    auditSuccessTitle: '¡Mensaje Recibido!',
    auditSuccessDesc: 'Gracias por conectar conmigo. Revisaré tus datos y te responderé en breve.',
    auditSuccessCta: 'Hablar por WhatsApp ahora',
    formName: 'Tu Nombre / Representante',
    formNamePlaceholder: 'Ej. Alex Miller',
    formEmail: 'Correo Electrónico',
    formEmailPlaceholder: 'alex@empresa.com',
    formCompany: 'Empresa / Negocio (Opcional)',
    formCompanyPlaceholder: 'Ej. NYC Logistics Corp',
    formProblem: '¿En qué proceso necesitan ayuda?',
    formProblemPlaceholder: 'Ej. Extracción de facturas, CRM...',
    formBtnSending: 'Enviando...',
    formBtnSubmit: 'Solicitar Consulta Gratis',
    footnote1: '200+ Pipelines automatizados',
    footnote2: '20M+ Registros diarios',
    footnote3: 'Zona horaria NY (EST)',
    footnote4: 'Inglés Avanzado / C1'
  },
  en: {
    badge: 'ROI & Automation Savings Estimator',
    title: 'How Much Time & Money Is Your Team Losing To Manual Tasks?',
    subtitle: 'Estimate the annual savings of automating your core business workflows with custom software pipelines.',
    industryLabel: '1. Industry Sector',
    teamSizeLabel: '2. Operations Team Size',
    teamSizeSuffix: 'people',
    hoursLabel: '3. Manual Hours / Employee / Week',
    hoursSuffix: 'hrs/wk',
    costLabel: '4. Avg Hourly Labor Cost ($ USD)',
    costSuffix: '/ hr',
    resultTitle: 'Est. Annual ROI Impact',
    resultSuffix: 'USD / yr',
    resultDesc: 'Direct labor cost savings from automated pipelines.',
    hoursSaved: 'Hours Recovered',
    hoursSavedSuffix: 'hrs/yr',
    efficiency: 'Ops Efficiency',
    efficiencyVal: '+85% faster',
    typicalCasesTitle: 'Typical use cases:',
    typicalCasesText: 'Automated data pipelines, invoice processing, CRM inventory sync, real-time dashboards & AI workflows.',
    ctaAudit: 'Request Free 15-Min Workflow Audit',
    transformationTitle: 'Workflow Transformation: Before vs. After',
    transformationSubtitle: 'See how custom engineering eliminates bottleneck friction across operations.',
    process1Title: 'Customer Intake & CRM Lead Flow',
    process1Manual: 'MANUAL PROCESS (SLOW)',
    process1ManualText: 'Manual copy-pasting from emails to CRM, 24-hr delay in response time, missed leads.',
    process1Auto: 'WITH DANIEL IBARRA (AUTOMATED)',
    process1AutoText: 'Instant webhooks, AI lead scoring, instant 3-sec customer response & automatic database sync.',
    process2Title: 'Reports & BigQuery Cloud Pipelines',
    process2Manual: 'MANUAL PROCESS (SLOW)',
    process2ManualText: 'Manual Excel exports, weekly data stitching, outdated decision-making dashboards.',
    process2Auto: 'WITH DANIEL IBARRA (AUTOMATED)',
    process2AutoText: 'Airflow/Python pipelines orchestrating millions of daily rows directly into GCP BigQuery with live dashboards.',
    auditBadge: 'Free Audit',
    auditTitle: 'Let’s Discuss Your Workflow Bottlenecks',
    auditSubtitle: 'Leave your details and I’ll reach out within 2 hours to set up a quick 15-min chat.',
    auditSuccessTitle: 'Message Received!',
    auditSuccessDesc: 'Thank you for reaching out! I will review your requirements and get back to you shortly.',
    auditSuccessCta: 'Chat on WhatsApp Now',
    formName: 'Your Name',
    formNamePlaceholder: 'e.g. Alex Miller',
    formEmail: 'Email Address',
    formEmailPlaceholder: 'alex@company.com',
    formCompany: 'Company Name (Optional)',
    formCompanyPlaceholder: 'e.g. NYC Logistics Corp',
    formProblem: 'Main Process Bottleneck',
    formProblemPlaceholder: 'e.g. Invoice processing, CRM sync...',
    formBtnSending: 'Sending...',
    formBtnSubmit: 'Request Free Consultation',
    footnote1: '200+ Orchestrated pipelines',
    footnote2: '20M+ Daily rows processed',
    footnote3: 'NYC Timezone (EST)',
    footnote4: 'C1 Fluent English'
  }
};

export const QuoteEstimatorSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translationsDict[language] || translationsDict.en;

  // ROI Calculator State
  const [industry, setIndustry] = useState<string>('ecommerce');
  const [teamSize, setTeamSize] = useState<number>(5);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(40);

  // Quick Audit Form State
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    company: '',
    workflowProblem: '',
    honeypot: ''
  });
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // Calculate ROI values
  const weeklyHoursSavedPerTeam = Math.round(teamSize * manualHoursPerWeek * 0.75); // 75% efficiency gain
  const annualHoursSaved = weeklyHoursSavedPerTeam * 50;
  const annualDollarSavings = annualHoursSaved * hourlyRate;

  useEffect(() => {
    analyticsService.trackEvent('cotizador_calculator_viewed', {});
  }, []);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auditForm.honeypot) return; // bot filter
    if (!auditForm.name || !auditForm.email) return;

    setIsSubmittingAudit(true);
    
    analyticsService.trackEvent('cotizador_audit_submitted', {
      name: auditForm.name,
      company: auditForm.company,
      industry,
      teamSize,
      estSavings: annualDollarSavings
    });

    // Save lead to Firestore with calculator details
    try {
      await addDoc(collection(db, 'leads'), {
        name: auditForm.name,
        email: auditForm.email,
        company: auditForm.company || '',
        message: auditForm.workflowProblem || '',
        source: 'cotizador_audit',
        status: 'new',
        createdAt: serverTimestamp(),
        notes: '',
        calculatorData: {
          industry,
          teamSize,
          manualHoursPerWeek,
          hourlyRate,
          estimatedSavings: annualDollarSavings,
          hoursSaved: annualHoursSaved
        }
      });
    } catch (err) {
      console.error("Error saving cotizador lead to Firestore:", err);
    }

    setTimeout(() => {
      setIsSubmittingAudit(false);
      setAuditSuccess(true);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    isSpanish
      ? `¡Hola Daniel! Vi tu cotizador interactivo 📊. Me gustaría conversar sobre automatizar flujos manuales de mi empresa (Ahorro estimado $${annualDollarSavings.toLocaleString()} USD/año).`
      : `Hi Daniel! I just tried your interactive savings calculator 📊. I'd like to discuss automating our manual workflows (Est. savings $${annualDollarSavings.toLocaleString()} USD/yr).`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#fbfbfb] bg-noise relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] mesh-identity-glow rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t.badge.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight uppercase">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Input Sliders */}
          <div className="lg:col-span-7 card-editorial p-6 sm:p-8 space-y-7 bg-white/95 backdrop-blur-md">
            
            {/* Industry Selector */}
            <div className="space-y-3">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2 font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>{t.industryLabel}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'ecommerce', labelEs: 'E-Commerce', labelEn: 'E-Commerce' },
                  { id: 'realestate', labelEs: 'Inmobiliaria', labelEn: 'Real Estate' },
                  { id: 'logistics', labelEs: 'Logística', labelEn: 'Logistics' },
                  { id: 'finance', labelEs: 'Finanzas/Legales', labelEn: 'Finance/Legal' },
                  { id: 'hospitality', labelEs: 'Hotelería/Viajes', labelEn: 'Hospitality/Travel' },
                  { id: 'services', labelEs: 'Servicios B2B', labelEn: 'B2B Services' },
                ].map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setIndustry(ind.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold font-mono uppercase tracking-wider border transition-all text-left ${
                      industry === ind.id
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-800 shadow-2xs font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSpanish ? ind.labelEs : ind.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Size Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span>{t.teamSizeLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {teamSize} {t.teamSizeSuffix}
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>1 {isSpanish ? 'persona' : 'person'}</span>
                <span>25 {isSpanish ? 'personas' : 'people'}</span>
                <span>50+ {isSpanish ? 'personas' : 'people'}</span>
              </div>
            </div>

            {/* Weekly Manual Hours Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{t.hoursLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                  {manualHoursPerWeek} {t.hoursSuffix}
                </span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="30" 
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>2 {isSpanish ? 'hrs (Bajo)' : 'hrs (Light)'}</span>
                <span>15 {isSpanish ? 'hrs (Moderado)' : 'hrs (Moderate)'}</span>
                <span>30 {isSpanish ? 'hrs (Intenso)' : 'hrs (Heavy)'}</span>
              </div>
            </div>

            {/* Average Hourly Cost Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <span>{t.costLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                  ${hourlyRate} {t.costSuffix}
                </span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="120" 
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>$15/hr</span>
                <span>$50/hr</span>
                <span>$120+/hr</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Savings Result Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#eef2ff] via-[#fdf4ff] to-[#fffbeb] text-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-indigo-100/80 shadow-md min-h-[500px] relative overflow-hidden transition-all duration-500 hover:border-indigo-200 hover:shadow-xl group">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-300/15 transition-all duration-500" />
            <div className="absolute -left-12 -bottom-12 w-52 h-52 bg-amber-300/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-300/15 transition-all duration-500" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Pulse Active Badge */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-indigo-700 bg-indigo-100/60 px-3.5 py-1 rounded-full border border-indigo-200/35 inline-block">
                  {t.resultTitle}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 drop-shadow-[0_2px_8px_rgba(99,102,241,0.12)] font-mono flex items-baseline gap-2 flex-wrap">
                    ${annualDollarSavings.toLocaleString()}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md self-center">
                      {t.resultSuffix}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed max-w-sm">
                    {t.resultDesc}
                  </p>
                </div>

                {/* Micro Stats Row */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-indigo-100/80">
                  <div className="bg-white/60 hover:bg-white/90 transition-all duration-300 border border-indigo-100/50 hover:border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{t.hoursSaved}</div>
                      <div className="text-base font-bold text-slate-800 mt-1 font-mono">
                        {annualHoursSaved.toLocaleString()}
                        <span className="text-[9px] font-sans text-slate-500 font-light block mt-0.5">{t.hoursSavedSuffix}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 hover:bg-white/90 transition-all duration-300 border border-indigo-100/50 hover:border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{t.efficiency}</div>
                      <div className="text-base font-bold text-indigo-600 mt-1 font-mono">
                        {t.efficiencyVal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases Box */}
              <div className="p-4 rounded-xl bg-white/80 border border-indigo-100/80 text-[11px] text-slate-600 leading-relaxed font-light relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-indigo-600 font-bold font-mono uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  <span>{t.typicalCasesTitle}</span>
                </span>
                <p className="text-slate-600 font-light leading-relaxed">
                  {t.typicalCasesText}
                </p>
              </div>
            </div>

            {/* Dynamic CTA */}
            <div className="mt-8 pt-6 border-t border-indigo-100/80 relative z-10">
              <a
                href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold py-4 px-6 rounded-xl font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_25px_rgba(15,23,42,0.12)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                <span>{t.ctaAudit}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
              </a>
            </div>

          </div>

        </div>

        {/* Process Transformation Section */}
        <div className="border-t border-slate-200/60 pt-16 mb-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight uppercase">
              {t.transformationTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto">
              {t.transformationSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Case 1 */}
            <div className="card-editorial p-6 space-y-4 bg-white/95 backdrop-blur-md">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest">
                  {t.process1Title}
                </span>
              </div>

              {/* Before */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100/80 space-y-1">
                <div className="text-[10px] font-mono font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>{t.process1Manual}</span>
                </div>
                <p className="text-xs text-slate-600 font-light">
                  {t.process1ManualText}
                </p>
              </div>

              {/* After */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100/80 space-y-1">
                <div className="text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.process1Auto}</span>
                </div>
                <p className="text-xs text-slate-600 font-light">
                  {t.process1AutoText}
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="card-editorial p-6 space-y-4 bg-white/95 backdrop-blur-md">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
                  {t.process2Title}
                </span>
              </div>

              {/* Before */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100/80 space-y-1">
                <div className="text-[10px] font-mono font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>{t.process2Manual}</span>
                </div>
                <p className="text-xs text-slate-600 font-light">
                  {t.process2ManualText}
                </p>
              </div>

              {/* After */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100/80 space-y-1">
                <div className="text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.process2Auto}</span>
                </div>
                <p className="text-xs text-slate-600 font-light">
                  {t.process2AutoText}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Stats Footnote Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-100 text-center">
            <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/50">
              <div className="text-xl sm:text-2xl font-bold text-indigo-950 font-mono">200+</div>
              <div className="text-[9px] font-mono text-indigo-600 font-bold mt-1 uppercase tracking-wider">{t.footnote1}</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100/50">
              <div className="text-xl sm:text-2xl font-bold text-amber-950 font-mono">20M+</div>
              <div className="text-[9px] font-mono text-amber-700 font-bold mt-1 uppercase tracking-wider">{t.footnote2}</div>
            </div>
            <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100/50">
              <div className="text-xl sm:text-2xl font-bold text-rose-950 font-mono">EST</div>
              <div className="text-[9px] font-mono text-rose-600 font-bold mt-1 uppercase tracking-wider">{t.footnote3}</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/50">
              <div className="text-xl sm:text-2xl font-bold text-emerald-950 font-mono">C1</div>
              <div className="text-[9px] font-mono text-emerald-600 font-bold mt-1 uppercase tracking-wider">{t.footnote4}</div>
            </div>
          </div>

        </div>

        {/* Free Consultation Audit Form */}
        <div className="max-w-3xl mx-auto border-t border-slate-200/60 pt-16">
          <div className="card-editorial p-6 sm:p-10 space-y-6 bg-indigo-50/30 border border-indigo-100/60 backdrop-blur-md">
            
            <div className="text-center space-y-2 mb-4">
              <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-100/60 px-2.5 py-1 rounded-full border border-indigo-200 uppercase tracking-widest">
                {t.auditBadge}
              </span>
              <h4 className="text-xl sm:text-2xl font-light text-slate-950 uppercase tracking-tight">
                {t.auditTitle}
              </h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xl mx-auto">
                {t.auditSubtitle}
              </p>
            </div>

            {auditSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h5 className="text-base font-bold text-slate-900">
                  {t.auditSuccessTitle}
                </h5>
                <p className="text-xs text-slate-600 font-light">
                  {t.auditSuccessDesc}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${personalInfo.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ios-dark inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-white shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.auditSuccessCta}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                
                {/* Honeypot bots filter */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    value={auditForm.honeypot}
                    onChange={(e) => setAuditForm({ ...auditForm, honeypot: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
                      {t.formName} *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={t.formNamePlaceholder}
                      value={auditForm.name}
                      onChange={(e) => setAuditForm({...auditForm, name: e.target.value})}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
                      {t.formEmail} *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder={t.formEmailPlaceholder}
                      value={auditForm.email}
                      onChange={(e) => setAuditForm({...auditForm, email: e.target.value})}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
                      {t.formCompany}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.formCompanyPlaceholder}
                      value={auditForm.company}
                      onChange={(e) => setAuditForm({...auditForm, company: e.target.value})}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
                      {t.formProblem}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.formProblemPlaceholder}
                      value={auditForm.workflowProblem}
                      onChange={(e) => setAuditForm({...auditForm, workflowProblem: e.target.value})}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingAudit}
                  className="w-full btn-ios-dark py-3 rounded-full text-xs font-mono font-semibold uppercase tracking-[0.15em] inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{isSubmittingAudit ? t.formBtnSending : t.formBtnSubmit}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
