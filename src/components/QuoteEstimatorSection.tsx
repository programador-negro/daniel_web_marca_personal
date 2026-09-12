import React, { useState, useEffect } from 'react';
import { 
  Building2, UserCheck, Clock, DollarSign, TrendingUp, Sparkles, 
  CheckCircle2, MessageSquare, ArrowDown, Download
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { analyticsService } from '../services/analyticsService';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import moneyStacksCoinsImg from '../assets/images/money_stacks_coins_1789171689345.jpg';

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
    footnote4: 'Inglés Avanzado / C1',
    softCaptureTitle: '¿Deseas descargar tu Reporte de ROI?',
    softCaptureDesc: 'Ingresa tu correo para descargar un informe en PDF detallado con el plan de automatización recomendado para tu empresa.',
    softCaptureBtn: 'Generar Informe PDF',
    softCaptureBtnSending: 'Generando Reporte...',
    softCaptureSuccess: '¡Reporte Listo!',
    softCaptureSuccessDesc: 'El PDF con tu análisis personalizado se ha descargado de inmediato.',
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
    footnote4: 'C1 Fluent English',
    softCaptureTitle: 'Download Your Custom ROI Report?',
    softCaptureDesc: 'Enter your email to instantly download a detailed PDF report with the recommended automation plan for your team.',
    softCaptureBtn: 'Generate PDF Report',
    softCaptureBtnSending: 'Generating Report...',
    softCaptureSuccess: 'Report Ready!',
    softCaptureSuccessDesc: 'Your custom analysis PDF has been generated and downloaded successfully.',
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

  const getIndustryName = (key: string, isSpanish: boolean) => {
    const map: Record<string, { es: string, en: string }> = {
      ecommerce: { es: 'E-Commerce / Tienda Digital', en: 'E-Commerce & Retail' },
      marketing: { es: 'Agencia de Marketing', en: 'Marketing Agency' },
      logistics: { es: 'Logística & Distribución', en: 'Logistics & Distribution' },
      finance: { es: 'Finanzas & Legal', en: 'Finance & Legal' },
      admin: { es: 'Administración & Operaciones', en: 'Administration & Operations' }
    };
    return map[key] ? (isSpanish ? map[key].es : map[key].en) : key;
  };

  const generateQuotePDF = (clientName: string, clientEmail: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const cPrimary = [15, 23, 42]; // Slate 900
    const cSecondary = [79, 70, 229]; // Indigo 600
    const cText = [51, 65, 85]; // Slate 700
    const cLightText = [100, 116, 139]; // Slate 500
    const cBorder = [226, 232, 240]; // Slate 200

    let y = 20;
    const marginX = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - (marginX * 2);

    // Top border line
    doc.setDrawColor(cSecondary[0], cSecondary[1], cSecondary[2]);
    doc.setLineWidth(1.5);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 10;

    // Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    const pdfTitle = isSpanish
      ? 'INFORME DE RETORNO DE INVERSIÓN (ROI) Y AUTOMATIZACIÓN'
      : 'PROCESS AUTOMATION ROI & SAVINGS REPORT';
    doc.text(pdfTitle, marginX, y);
    y += 7;

    // Subtitle
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(cSecondary[0], cSecondary[1], cSecondary[2]);
    doc.text(`Consultor: Ing. Daniel Ibarra | daniel.ibarra.dev@gmail.com`, marginX, y);
    y += 5;

    // Prepared for info
    doc.setFontSize(9);
    doc.setTextColor(cLightText[0], cLightText[1], cLightText[2]);
    const preparedFor = isSpanish
      ? `Preparado para: ${clientName} (${clientEmail}) | Fecha: ${new Date().toLocaleDateString()}`
      : `Prepared for: ${clientName} (${clientEmail}) | Date: ${new Date().toLocaleDateString()}`;
    doc.text(preparedFor, marginX, y);
    y += 8;

    // Divider Line
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 10;

    // SECTION 1: EXECUTIVE SUMMARY
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.text(isSpanish ? '1. RESUMEN EJECUTIVO DE IMPACTO' : '1. EXECUTIVE IMPACT SUMMARY', marginX, y);
    y += 8;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(cText[0], cText[1], cText[2]);
    
    const summaryText = isSpanish
      ? `Basado en los parámetros ingresados para tu equipo en el sector ${getIndustryName(industry, true)}, hemos realizado un análisis preliminar de potencial de optimización. Tu equipo pierde actualmente valiosas horas semanales ejecutando flujos manuales repetitivos (copiar y pegar datos, sincronizar hojas de cálculo, estructurar reportes manualmente, etc.).`
      : `Based on the metrics provided for your team in the ${getIndustryName(industry, false)} sector, we have conducted a preliminary operations analysis. Your team is currently losing critical working hours executing manual, highly repetitive tasks (data scraping, copy-pasting, manually syncing Google Sheets, compiling executive reports, etc.).`;
    
    const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
    doc.text(splitSummary, marginX, y);
    y += splitSummary.length * 5 + 5;

    // STATS BLOCK (Draw a beautiful background container)
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.roundedRect(marginX, y, contentWidth, 35, 3, 3, 'FD');

    // Fill numbers inside the container
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text(`$${annualDollarSavings.toLocaleString()} USD`, marginX + 8, y + 12);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(cLightText[0], cLightText[1], cLightText[2]);
    doc.text(isSpanish ? 'Ahorro Financiero Anual Proyectado' : 'Est. Proactive Annual Savings', marginX + 8, y + 17);

    // Right side numbers
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(180, 83, 9); // Amber 700
    doc.text(`${annualHoursSaved.toLocaleString()} hrs`, marginX + 90, y + 11);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(cLightText[0], cLightText[1], cLightText[2]);
    doc.text(isSpanish ? 'Horas hombre liberadas al año' : 'Operational hours recovered/yr', marginX + 90, y + 15);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text(isSpanish ? '+85% Eficiencia' : '+85% Efficiency', marginX + 90, y + 25);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(cLightText[0], cLightText[1], cLightText[2]);
    doc.text(isSpanish ? 'Velocidad de ejecución del flujo' : 'Overall flow execution speed', marginX + 90, y + 29);

    y += 45;

    // SECTION 2: PROPOSED ARCHITECTURE
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.text(isSpanish ? '2. HOJA DE RUTA DE TRANSFORMACIÓN RECOMENDADA' : '2. RECOMMENDED AUTOMATION ROADMAP', marginX, y);
    y += 8;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(cText[0], cText[1], cText[2]);

    const step1 = isSpanish
      ? '• Auditoría Operativa Integrada: Identificar con precisión dónde se digita o copia información manualmente entre herramientas independientes.'
      : '• Core Operational Audit: Map exactly where team members copy-paste and type values manually across distinct interfaces.';
    doc.text(step1, marginX, y);
    y += 6;

    const step2 = isSpanish
      ? '• Ingeniería del Pipeline de Datos (Python + BigQuery): Crear scripts inteligentes en servidores en la nube para consolidar y depurar tus datos automáticamente sin errores de tipeo.'
      : '• Custom Pipeline Engineering (Python + BigQuery): Develop robust server-side scripts to pull, clean, and pipe your business metrics automatically.';
    const splitStep2 = doc.splitTextToSize(step2, contentWidth);
    doc.text(splitStep2, marginX, y);
    y += splitStep2.length * 4.5 + 4;

    const step3 = isSpanish
      ? '• Automatización de Reportes: Enviar notificaciones críticas e informes a los correos de tus directivos o canales de Slack de manera programada.'
      : '• Hands-free Report Delivery: Push critical alerts and summary reports straight to manager inboxes or Slack channels on a preset schedule.';
    const splitStep3 = doc.splitTextToSize(step3, contentWidth);
    doc.text(splitStep3, marginX, y);
    y += splitStep3.length * 4.5 + 6;

    // Contact CTA
    doc.setDrawColor(238, 242, 255); // Indigo 50
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(marginX, y, contentWidth, 25, 2, 2, 'FD');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(cSecondary[0], cSecondary[1], cSecondary[2]);
    doc.text(isSpanish ? '¿CONVERSAMOS EN UNA SESIÓN DE DIAGNÓSTICO GRATUITA?' : 'SCHEDULE A FREE DIAGNOSTIC SESSION', marginX + 5, y + 8);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(cText[0], cText[1], cText[2]);
    const ctaInfo = isSpanish
      ? 'Agenda una llamada rápida de 15 minutos conmigo. Diseñemos la arquitectura exacta para automatizar tus operaciones y recuperar tu tiempo. Escríbeme a daniel.ibarra.dev@gmail.com o búscame en danielib.com.'
      : 'Book a quick 15-minute call with me. Let’s map out the exact architecture to automate your workflows and recover your team’s time. Email me at daniel.ibarra.dev@gmail.com or visit danielib.com.';
    doc.text(doc.splitTextToSize(ctaInfo, contentWidth - 10), marginX + 5, y + 14);

    doc.save(`ROI_Report_Daniel_Ibarra_${clientName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#fbfbfb] bg-noise relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] mesh-identity-glow rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Process Transformation Section */}
        <div className="mb-24 space-y-12" id="transformation-section">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight uppercase">
              {t.transformationTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto">
              {t.transformationSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Case 1 */}
            <div className="card-editorial p-6 sm:p-8 space-y-5 bg-white/95 backdrop-blur-md hover:border-indigo-200 transition-all duration-300">
              <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50/80 px-3 py-1.5 rounded-full border border-indigo-100 uppercase tracking-widest leading-snug">
                  {t.process1Title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 self-end sm:self-auto shrink-0 mt-1 sm:mt-0">OPS-01</span>
              </div>

              {/* Before */}
              <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100/60 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-full blur-xl" />
                <div className="text-[10px] font-mono font-bold text-rose-700 flex items-center gap-2 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>{t.process1Manual}</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed">
                  {t.process1ManualText}
                </p>
              </div>

              {/* After */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/60 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
                <div className="text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-2 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.process1Auto}</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed">
                  {t.process1AutoText}
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="card-editorial p-6 sm:p-8 space-y-5 bg-white/95 backdrop-blur-md hover:border-amber-200 transition-all duration-300">
              <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50/80 px-3 py-1.5 rounded-full border border-amber-100 uppercase tracking-widest leading-snug">
                  {t.process2Title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 self-end sm:self-auto shrink-0 mt-1 sm:mt-0">DATA-01</span>
              </div>

              {/* Before */}
              <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100/60 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-full blur-xl" />
                <div className="text-[10px] font-mono font-bold text-rose-700 flex items-center gap-2 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>{t.process2Manual}</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed">
                  {t.process2ManualText}
                </p>
              </div>

              {/* After */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/60 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
                <div className="text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-2 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.process2Auto}</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed">
                  {t.process2AutoText}
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Soft-Capture Bridge Banner */}
          <div className="rounded-2xl p-6 sm:p-8 border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group border-purple-900/40 bg-slate-950">
            {/* Soft Image Background */}
            <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-75 transition-opacity duration-700">
              <img
                src={moneyStacksCoinsImg}
                alt="ROI Background"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Purple & Gold Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-950/80 via-purple-900/70 to-amber-900/40" />

            {/* Visual background atmospheric effects */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[9px] font-mono font-bold uppercase tracking-widest inline-block">
                {isSpanish ? '📊 REPORTE DE RETORNO (ROI)' : '📊 SAVINGS IMPACT SIMULATION'}
              </span>
              <h4 className="text-base sm:text-lg font-light text-white tracking-[0.05em] uppercase font-mono">
                {isSpanish ? '¿Cuánto podría ahorrar tu equipo exactamente?' : 'Calculate Your Team\'s Real Savings'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {isSpanish 
                  ? 'Usa el simulador interactivo de abajo para proyectar tu ahorro anual en horas y dinero, y descargar un Plan de Ruta PDF personalizado al instante.'
                  : 'Use the interactive simulator below to estimate annual savings in hours/dollars and download a tailored PDF automation plan in seconds.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                document.getElementById('calculator-core')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative z-10 py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:from-amber-300 hover:to-amber-400 font-mono uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-amber-500/30 border border-amber-300/50 transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full md:w-auto"
            >
              <span>{isSpanish ? 'IR AL SIMULADOR' : 'GO TO SIMULATOR'}</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-950 animate-bounce" />
            </button>
          </div>

          {/* Quick Stats Footnote Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200/60 text-center">
            <div className="p-5 rounded-2xl bg-white/65 border border-slate-200/60 hover:border-indigo-200/80 hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="text-2xl font-bold text-indigo-950 font-mono tracking-tight">200+</div>
              <div className="text-[9px] font-mono text-slate-500 font-semibold mt-1.5 uppercase tracking-widest leading-snug">{t.footnote1}</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/65 border border-slate-200/60 hover:border-amber-200/80 hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="text-2xl font-bold text-amber-950 font-mono tracking-tight">20M+</div>
              <div className="text-[9px] font-mono text-slate-500 font-semibold mt-1.5 uppercase tracking-widest leading-snug">{t.footnote2}</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/65 border border-slate-200/60 hover:border-rose-200/80 hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="text-2xl font-bold text-rose-950 font-mono tracking-tight">EST</div>
              <div className="text-[9px] font-mono text-slate-500 font-semibold mt-1.5 uppercase tracking-widest leading-snug">{t.footnote3}</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/65 border border-slate-200/60 hover:border-emerald-200/80 hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="text-2xl font-bold text-emerald-950 font-mono tracking-tight">C1</div>
              <div className="text-[9px] font-mono text-slate-500 font-semibold mt-1.5 uppercase tracking-widest leading-snug">{t.footnote4}</div>
            </div>
          </div>

        </div>

        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 border-t border-slate-200/60 pt-16">
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
        <div id="calculator-core" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Input Sliders */}
          <div className="lg:col-span-7 card-editorial p-6 sm:p-8 space-y-8 bg-white/95 backdrop-blur-md border border-slate-200/80 hover:border-slate-300/80 transition-all duration-300 rounded-2xl">
            
            {/* Industry Selector */}
            <div className="space-y-3">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-600 mb-2 font-bold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-600" />
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
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/25 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-700'
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
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-600" />
                  <span>{t.teamSizeLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-indigo-950 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/80">
                  {teamSize} {t.teamSizeSuffix}
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <div className="flex justify-between text-[9px] text-slate-600 font-mono font-medium">
                <span>1 {isSpanish ? 'persona' : 'person'}</span>
                <span>25 {isSpanish ? 'personas' : 'people'}</span>
                <span>50+ {isSpanish ? 'personas' : 'people'}</span>
              </div>
            </div>

            {/* Weekly Manual Hours Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span>{t.hoursLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-amber-950 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/80">
                  {manualHoursPerWeek} {t.hoursSuffix}
                </span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="30" 
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
              <div className="flex justify-between text-[9px] text-slate-600 font-mono font-medium">
                <span>2 {isSpanish ? 'hrs (Bajo)' : 'hrs (Light)'}</span>
                <span>15 {isSpanish ? 'hrs (Moderado)' : 'hrs (Moderate)'}</span>
                <span>30 {isSpanish ? 'hrs (Intenso)' : 'hrs (Heavy)'}</span>
              </div>
            </div>

            {/* Average Hourly Cost Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-600" />
                  <span>{t.costLabel}</span>
                </label>
                <span className="text-xs font-bold font-mono text-rose-950 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100/80">
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
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-100"
              />
              <div className="flex justify-between text-[9px] text-slate-600 font-mono font-medium">
                <span>$15/hr</span>
                <span>$50/hr</span>
                <span>$120+/hr</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Savings Result Box */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.03)] min-h-[500px] relative overflow-hidden transition-all duration-500 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.07)] group">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/8 transition-all duration-500" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/8 transition-all duration-500" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Pulse Active Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-indigo-950 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50 inline-block">
                    {t.resultTitle}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-md">
                  {t.resultSuffix}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 font-mono">
                    ${annualDollarSavings.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed max-w-sm">
                    {t.resultDesc}
                  </p>
                </div>

                {/* Micro Stats Row */}
                <div className="grid grid-cols-2 gap-3.5 pt-6 border-t border-slate-100">
                  <div className="bg-slate-50/75 hover:bg-slate-50 transition-all duration-300 border border-slate-200/60 p-4 rounded-xl flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-medium">{t.hoursSaved}</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5 font-mono">
                        {annualHoursSaved.toLocaleString()}
                        <span className="text-[9px] font-sans text-slate-500 font-light block mt-0.5">{t.hoursSavedSuffix}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/75 hover:bg-slate-50 transition-all duration-300 border border-slate-200/60 p-4 rounded-xl flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-medium">{t.efficiency}</div>
                      <div className="text-sm font-bold text-emerald-800 mt-0.5 font-mono">
                        {t.efficiencyVal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases Box */}
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/60 text-[11px] text-slate-600 leading-relaxed font-light relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-500/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-indigo-950 font-bold font-mono uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                  <span>{t.typicalCasesTitle}</span>
                </span>
                <p className="text-slate-600 font-light leading-relaxed">
                  {t.typicalCasesText}
                </p>
              </div>
            </div>

            {/* Dynamic CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 relative z-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  generateQuotePDF(
                    isSpanish ? "Estimación de ROI" : "ROI Estimate",
                    "danielib.com"
                  );
                }}
                className="flex-1 bg-slate-900 text-white hover:bg-slate-800 font-bold py-3.5 px-4 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{isSpanish ? 'Descargar PDF' : 'Download PDF'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('free-audit-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold py-3.5 px-4 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{isSpanish ? 'Auditoría Gratis' : 'Free Audit'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Free Consultation Audit Form */}
        <div id="free-audit-form" className="max-w-3xl mx-auto border-t border-slate-200/60 pt-16">
          <div className="card-editorial p-6 sm:p-10 space-y-8 bg-white/95 border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.03)] backdrop-blur-md rounded-2xl">
            
            <div className="text-center space-y-2 mb-4">
              <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
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
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                      {t.formName} *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={t.formNamePlaceholder}
                      value={auditForm.name}
                      onChange={(e) => setAuditForm({...auditForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                      {t.formEmail} *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder={t.formEmailPlaceholder}
                      value={auditForm.email}
                      onChange={(e) => setAuditForm({...auditForm, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                      {t.formCompany}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.formCompanyPlaceholder}
                      value={auditForm.company}
                      onChange={(e) => setAuditForm({...auditForm, company: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                      {t.formProblem}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.formProblemPlaceholder}
                      value={auditForm.workflowProblem}
                      onChange={(e) => setAuditForm({...auditForm, workflowProblem: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
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
