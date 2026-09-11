import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { analyticsService } from '../services/analyticsService';

export const LeadMagnetSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].leadMagnet;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    analyticsService.trackEvent('lead_downloaded', { email, name });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleOpenPdfGuide = () => {
    const guideContent = isSpanish
      ? `
========================================================================
BLUEPRINT DE AUTOMATIZACIÓN DE PROCESOS EMPRESARIALES
Autor: Daniel Ibarra (@programador-negro) | danielib.com
Contacto: daniel.ibarra.dev@gmail.com
========================================================================

PASO 1: AUDITORÍA DE HORAS HOMBRE (IDENTIFICACIÓN DE CUELLOS DE BOTELLA)
------------------------------------------------------------------------
Haz una lista de tareas que cumplan estas 3 características:
1. Son repetitivas (se hacen a diario, semanalmente o mensualmente).
2. Requieren copiar y pegar datos entre dos o más programas (Excel, CRM, Stripe, Ads).
3. No requieren juicio creativo o estratégico profundo.

Ejemplo típico:
- Descarga de reportes CSV de Facebook Ads y Google Ads -> 6 horas/semana
- Consolidación en Excel para el Director -> 4 horas/semana
- Sincronización manual de facturas y pasarela de pagos -> 5 horas/semana
TOTAL: 15 Horas/semana (60 horas al mes que estás pagando a personal operativo).

PASO 2: EL PIPELINE MÍNIMO VIABLE CON PYTHON Y BIGQUERY
------------------------------------------------------------------------
1. Extraer: Utilizar la librería requests / google-cloud-bigquery en Python.
2. Limpiar: Normalizar fechas (UTC), IDs únicos y tipos numéricos.
3. Almacenar: Tablas particionadas por fecha para que cada consulta cueste centavos.
4. Distribuir: Enviar un email con PDF ejecutivo a las 8:00 AM cada lunes.

PASO 3: DESPLIEGUE EN SERVIDOR LINUX ECONÓMICO (VPS)
------------------------------------------------------------------------
No necesitas suscribirte a herramientas SaaS de $500/mes:
- Un VPS básico de $5 a $10 USD (ej. IONOS, Hetzner, DigitalOcean) es suficiente.
- Configurar cron en Linux para orquestar la ejecución autónoma:
  0 6 * * 1 /usr/bin/python3 /opt/automation/generate_weekly_report.py

¿NECESITAS IMPLEMENTAR ESTO EN TU EMPRESA EN MENOS DE 2 SEMANAS?
Cotiza directamente en https://danielib.com/#cotizador o escribe a daniel.ibarra.dev@gmail.com
========================================================================
`
      : `
========================================================================
ENTERPRISE PROCESS AUTOMATION BLUEPRINT
Author: Daniel Ibarra (@programador-negro) | danielib.com
Contact: daniel.ibarra.dev@gmail.com
========================================================================

STEP 1: WORKFORCE TIME AUDIT (IDENTIFYING BOTTLENECKS)
------------------------------------------------------------------------
Audit recurring operational workflows that meet these 3 criteria:
1. Highly repetitive (executed daily, weekly, or monthly).
2. Entails copying & pasting data across siloed platforms (Excel, CRM, Stripe, Ads).
3. Requires little to no creative or nuanced strategic discretion.

Typical Example:
- Downloading CSV ad performance reports from Meta & Google Ads -> 6 hrs/week
- Consolidating spreadsheets for stakeholders -> 4 hrs/week
- Manual invoice & payment gateway reconciliation -> 5 hrs/week
TOTAL: 15 Hours/week (60 hours/month spent on tedious manual overhead).

STEP 2: MINIMUM VIABLE PIPELINE WITH PYTHON & BIGQUERY
------------------------------------------------------------------------
1. Extract: Utilize python requests / google-cloud-bigquery client libraries.
2. Transform: Sanitize date stamps (UTC), enforce unique keys, and normalize schemas.
3. Load & Partition: Daily time-partitioned tables to minimize query costs.
4. Distribute: Automated executive summary delivery via SMTP / Slack every Monday 8:00 AM.

STEP 3: DEPLOYMENT ON COST-EFFECTIVE LINUX VPS
------------------------------------------------------------------------
No need for bloated $500/month SaaS platforms:
- A $5–$10/month Linux VPS (e.g. Hetzner, IONOS, DigitalOcean) is completely sufficient.
- Configure crontab for scheduled execution with health monitoring:
  0 6 * * 1 /usr/bin/python3 /opt/automation/generate_weekly_report.py

LOOKING TO IMPLEMENT THIS ARCHITECTURE IN UNDER 2 WEEKS?
Request a custom scope estimate at https://danielib.com/#cotizador or email daniel.ibarra.dev@gmail.com
========================================================================
`;
    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isSpanish
      ? 'Blueprint_Automatizacion_Daniel_Ibarra.txt'
      : 'Enterprise_Automation_Blueprint_Daniel_Ibarra.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#fbfbfb] bg-noise border-y border-slate-100 relative overflow-hidden">
      {/* Strategic Grain Mesh Identity Gradient (Refined & Subtle) */}
      <div className="absolute inset-0 mesh-identity-glow opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono tracking-widest uppercase font-medium">
                <Sparkles className="w-3 h-3 text-slate-500" />
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Plantilla de detección de tareas repetitivas'
                      : 'Repetitive workflow detection framework'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Pipeline en Python listo para replicar'
                      : 'Production-ready Python pipeline architecture'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>
                    {isSpanish
                      ? 'Guía para ahorrar en licencias de software'
                      : 'Strategies to eliminate expensive SaaS licenses'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
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
