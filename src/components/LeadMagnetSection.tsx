import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { analyticsService } from '../services/analyticsService';
import { jsPDF } from 'jspdf';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const LeadMagnetSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].leadMagnet;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    analyticsService.trackEvent('lead_downloaded', { email, name });

    try {
      await addDoc(collection(db, 'leads'), {
        name,
        email,
        source: 'lead_magnet',
        status: 'new',
        createdAt: serverTimestamp(),
        notes: ''
      });
    } catch (err) {
      console.error("Error writing lead magnet to Firestore:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleOpenPdfGuide = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Color definitions
    const cPrimary = [15, 23, 42]; // Slate 900 #0f172a
    const cSecondary = [79, 70, 229]; // Indigo 600 #4f46e5
    const cText = [51, 65, 85]; // Slate 700 #334155
    const cLightText = [100, 116, 139]; // Slate 500 #64748b
    const cBorder = [226, 232, 240]; // Slate 200 #e2e8f0
    const cAccentBg = [248, 250, 252]; // Slate 50 #f8fafc

    let y = 20;
    const marginX = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - (marginX * 2);

    // Helpers to manage pages & lines
    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > 275) {
        doc.addPage();
        y = 20;
        drawHeaderDecorations();
      }
    };

    const drawHeaderDecorations = () => {
      // Draw a subtle border or top line
      doc.setDrawColor(cSecondary[0], cSecondary[1], cSecondary[2]);
      doc.setLineWidth(1.5);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 5;
    };

    // Draw First Page Header
    doc.setDrawColor(cSecondary[0], cSecondary[1], cSecondary[2]);
    doc.setLineWidth(1.5);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 10;

    // Document Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    const titleText = isSpanish 
      ? 'BLUEPRINT DE AUTOMATIZACIÓN DE PROCESOS' 
      : 'ENTERPRISE PROCESS AUTOMATION BLUEPRINT';
    doc.text(titleText, marginX, y);
    y += 7;

    // Subtitle / Author
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(cSecondary[0], cSecondary[1], cSecondary[2]);
    const subtitleText = isSpanish
      ? 'Ing. Daniel Ibarra | @programador-negro | danielib.com'
      : 'Daniel Ibarra | @programador-negro | danielib.com';
    doc.text(subtitleText, marginX, y);
    y += 5;

    // Metadata details
    doc.setFontSize(9);
    doc.setTextColor(cLightText[0], cLightText[1], cLightText[2]);
    const dateText = isSpanish
      ? `Fecha: Septiembre 2026 | Soporte: daniel.ibarra.dev@gmail.com`
      : `Date: September 2026 | Support: daniel.ibarra.dev@gmail.com`;
    doc.text(dateText, marginX, y);
    y += 8;

    // Divider Line
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 10;

    // Content Array
    interface LineBlock {
      type: 'h1' | 'body' | 'bullet' | 'code' | 'highlight' | 'space';
      text?: string;
    }

    const content: LineBlock[] = isSpanish ? [
      { type: 'h1', text: 'PASO 1: AUDITORÍA DE HORAS HOMBRE (IDENTIFICACIÓN DE CUELLOS DE BOTELLA)' },
      { type: 'body', text: 'Haz una lista de tareas administrativas y operativas que cumplan con estas 3 características clave:' },
      { type: 'bullet', text: '1. Son altamente repetitivas (se hacen a diario, semanalmente o mensualmente).' },
      { type: 'bullet', text: '2. Requieren copiar y pegar datos entre dos o más programas independientes (Excel, CRM, Stripe, Ads).' },
      { type: 'bullet', text: '3. No requieren juicio creativo o estratégico profundo.' },
      { type: 'space' },
      { type: 'body', text: 'Ejemplo de un caso de uso corporativo típico:' },
      { type: 'bullet', text: '• Descarga de reportes CSV de Facebook Ads y Google Ads -> 6 horas/semana' },
      { type: 'bullet', text: '• Consolidación de hojas de cálculo en Excel para dirección -> 4 horas/semana' },
      { type: 'bullet', text: '• Sincronización manual de facturas y pasarela de pagos -> 5 horas/semana' },
      { type: 'space' },
      { type: 'highlight', text: 'TOTAL: 15 Horas/semana (60 horas al mes que estás pagando a personal operativo en tareas redundantes).' },
      { type: 'space' },
      { type: 'h1', text: 'PASO 2: EL PIPELINE MÍNIMO VIABLE CON PYTHON Y BIGQUERY' },
      { type: 'body', text: '1. Extraer: Utilizar peticiones HTTP o SDKs de clientes oficiales (ej. google-cloud-bigquery) en scripts de Python autónomos.' },
      { type: 'body', text: '2. Limpiar: Normalizar fechas a formato UTC, sanear claves duplicadas, estructurar números e identificar nulos.' },
      { type: 'body', text: '3. Almacenar: Guardar la información en tablas particionadas por fecha para optimizar el rendimiento y reducir el costo de consultas a centavos.' },
      { type: 'body', text: '4. Distribuir: Enviar resúmenes ejecutivos vía email (SMTP) o canales de Slack cada lunes a las 8:00 AM.' },
      { type: 'space' },
      { type: 'h1', text: 'PASO 3: DESPLIEGUE EN SERVIDOR LINUX ECONÓMICO (VPS)' },
      { type: 'body', text: 'No necesitas pagar suscripciones costosas de software SaaS de $500/mes:' },
      { type: 'bullet', text: '• Un servidor VPS básico de $5 a $10 USD mensuales (Hetzner, IONOS, DigitalOcean) es ideal.' },
      { type: 'bullet', text: '• Configurar crontab de Linux para programar y orquestar las ejecuciones automáticas de fondo de manera confiable.' },
      { type: 'space' },
      { type: 'code', text: '0 6 * * 1 /usr/bin/python3 /opt/automation/generate_weekly_report.py' },
      { type: 'space' },
      { type: 'highlight', text: '¿NECESITAS IMPLEMENTAR ESTA ARQUITECTURA EN MENOS DE 2 SEMANAS?\nCotiza tu proyecto directamente en danielib.com/#cotizador o envía un correo directo a daniel.ibarra.dev@gmail.com para coordinar un diagnóstico gratuito de 20 minutos.' }
    ] : [
      { type: 'h1', text: 'STEP 1: WORKFORCE TIME AUDIT (IDENTIFYING BOTTLENECKS)' },
      { type: 'body', text: 'Audit and identify administrative or operational workflows that meet these 3 key criteria:' },
      { type: 'bullet', text: '1. Highly repetitive (executed daily, weekly, or monthly).' },
      { type: 'bullet', text: '2. Entails copying & pasting data across siloed platforms (Excel, CRM, Stripe, Ads).' },
      { type: 'bullet', text: '3. Requires little to no creative or nuanced strategic discretion.' },
      { type: 'space' },
      { type: 'body', text: 'Typical corporate bottleneck case study:' },
      { type: 'bullet', text: '• Downloading CSV ad performance reports from Meta & Google Ads -> 6 hrs/week' },
      { type: 'bullet', text: '• Consolidating spreadsheets manually for stakeholders -> 4 hrs/week' },
      { type: 'bullet', text: '• Manual invoice & payment gateway reconciliation -> 5 hrs/week' },
      { type: 'space' },
      { type: 'highlight', text: 'TOTAL: 15 Hours/week (60 hours/month spent on tedious manual overhead and operational redundancies).' },
      { type: 'space' },
      { type: 'h1', text: 'STEP 2: MINIMUM VIABLE PIPELINE WITH PYTHON & BIGQUERY' },
      { type: 'body', text: '1. Extract: Use requests or cloud client libraries (e.g., google-cloud-bigquery) in autonomous Python scripts.' },
      { type: 'body', text: '2. Transform: Sanitize date stamps (UTC), enforce unique keys, normalize schemas, and clean empty values.' },
      { type: 'body', text: '3. Load & Partition: Daily time-partitioned database tables to minimize storage and querying costs.' },
      { type: 'body', text: '4. Distribute: Deliver clean executive summaries via SMTP (email) or dedicated Slack channels every Monday at 8:00 AM.' },
      { type: 'space' },
      { type: 'h1', text: 'STEP 3: DEPLOYMENT ON COST-EFFECTIVE LINUX VPS' },
      { type: 'body', text: 'You do not need bloated, expensive $500/month SaaS platforms to build pipelines:' },
      { type: 'bullet', text: '• A standard $5 to $10 USD monthly Linux VPS (Hetzner, IONOS, DigitalOcean) is completely sufficient.' },
      { type: 'bullet', text: '• Configure crontab for scheduled background execution with native health monitoring.' },
      { type: 'space' },
      { type: 'code', text: '0 6 * * 1 /usr/bin/python3 /opt/automation/generate_weekly_report.py' },
      { type: 'space' },
      { type: 'highlight', text: 'LOOKING TO DEPLOY THIS ARCHITECTURE IN UNDER 2 WEEKS?\nRequest a custom scope estimate at danielib.com/#cotizador or email daniel.ibarra.dev@gmail.com to coordinate a free 20-minute operational audit.' }
    ];

    // Render Blocks
    content.forEach((block) => {
      if (block.type === 'space') {
        y += 6;
        return;
      }

      if (!block.text) return;

      if (block.type === 'h1') {
        checkPageBreak(18);
        y += 4;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(cSecondary[0], cSecondary[1], cSecondary[2]);
        const lines = doc.splitTextToSize(block.text, contentWidth);
        lines.forEach((line: string) => {
          doc.text(line, marginX, y);
          y += 5.5;
        });
        y += 1;
      } 
      else if (block.type === 'body') {
        checkPageBreak(12);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(cText[0], cText[1], cText[2]);
        const lines = doc.splitTextToSize(block.text, contentWidth);
        lines.forEach((line: string) => {
          doc.text(line, marginX, y);
          y += 5.5;
        });
      } 
      else if (block.type === 'bullet') {
        checkPageBreak(12);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(cText[0], cText[1], cText[2]);
        const lines = doc.splitTextToSize(block.text, contentWidth - 6);
        lines.forEach((line: string) => {
          doc.text(line, marginX + 4, y);
          y += 5.5;
        });
      } 
      else if (block.type === 'code') {
        checkPageBreak(15);
        // Draw a light background block for code
        doc.setFillColor(cAccentBg[0], cAccentBg[1], cAccentBg[2]);
        doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
        doc.setLineWidth(0.3);
        doc.rect(marginX, y - 4, contentWidth, 10, 'FD');
        
        doc.setFont('Courier', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(cSecondary[0], cSecondary[1], cSecondary[2]);
        doc.text(block.text, marginX + 4, y + 2);
        y += 10;
      } 
      else if (block.type === 'highlight') {
        // Split text first to calculate card height
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9.5);
        const splitText = doc.splitTextToSize(block.text, contentWidth - 10);
        const textLinesCount = splitText.length;
        const boxHeight = (textLinesCount * 5.5) + 10;

        checkPageBreak(boxHeight + 8);

        // Draw dynamic accent container
        doc.setFillColor(254, 243, 199); // Amber 100 bg #fef3c7
        doc.setDrawColor(245, 158, 11); // Amber 500 border #f59e0b
        doc.setLineWidth(0.4);
        doc.rect(marginX, y - 4, contentWidth, boxHeight, 'FD');

        doc.setTextColor(120, 53, 4); // Amber 900 text #783504
        splitText.forEach((line: string) => {
          doc.text(line, marginX + 5, y + 2);
          y += 5.5;
        });
        y += 6;
      }
    });

    // Save File
    doc.save(isSpanish 
      ? 'Blueprint_Automatizacion_Daniel_Ibarra.pdf' 
      : 'Enterprise_Automation_Blueprint_Daniel_Ibarra.pdf'
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-[#fbfbfb] bg-noise border-y border-slate-100 relative overflow-hidden">
      {/* Strategic Grain Mesh Identity Gradient (Refined & Subtle) */}
      <div className="absolute inset-0 mesh-identity-glow opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-amber-50/40 border border-amber-100/60 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200 text-amber-900 text-[10px] font-mono tracking-widest uppercase font-bold">
                <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
                <span>{t.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.06em] uppercase text-slate-900 leading-snug">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                {t.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Plantilla de detección de tareas repetitivas'
                      : 'Repetitive workflow detection framework'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Pipeline en Python listo para replicar'
                      : 'Production-ready Python pipeline architecture'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Guía para ahorrar en licencias de software'
                      : 'Strategies to eliminate expensive SaaS licenses'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Estrategias de arquitectura en la nube'
                      : 'Cost-optimized cloud deployment blueprints'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Capture Form */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs backdrop-blur-xs">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-3">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
                      {isSpanish ? 'DESCARGA GRATUITA INMEDIATA' : 'INSTANT FREE ACCESS'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
                      {isSpanish ? 'NOMBRE O EMPRESA' : 'FULL NAME OR COMPANY'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isSpanish ? "Ej. Carlos Martínez (Tech Lead)" : "e.g. Alex Morgan (Tech Lead)"}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-900 focus:bg-white text-xs text-slate-900 placeholder-slate-400 font-light transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
                      {isSpanish ? 'CORREO CORPORATIVO' : 'WORK EMAIL ADDRESS'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.inputPlaceholder}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-900 focus:bg-white text-xs text-slate-900 placeholder-slate-400 font-light transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-ios-dark py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>{isSubmitting ? (isSpanish ? 'PREPARANDO...' : 'PREPARING...') : t.buttonText.toUpperCase()}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 pt-1">
                    <Shield className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.instantAccess}</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border border-slate-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-800 mb-1">
                      {t.downloadSuccess}
                    </h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {isSpanish
                        ? 'Haz clic en el botón a continuación para descargar el documento de inmediato:'
                        : 'Click the button below to download the guide immediately:'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenPdfGuide}
                    className="w-full py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.openPdfBtn.toUpperCase()}</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
