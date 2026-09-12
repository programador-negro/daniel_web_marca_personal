import React, { useState } from 'react';
import { Mail, GitBranch, MapPin, Copy, Check, Send, MessageSquare, Clock, ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { analyticsService } from '../services/analyticsService';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import phoneConsultationImg from '../assets/images/phone_consultation_aesthetic_1789170798944.jpg';

export const ContactSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].contact;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '', // anti-bot trap
  });
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    analyticsService.trackEvent('email_copied', { email: personalInfo.email });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection
    if (formData.honeypot) {
      console.warn('Bot detected by honeypot.');
      return;
    }

    if (!captchaPassed) {
      setStatusMessage(
        isSpanish
          ? 'Por favor confirma la casilla de verificación de seguridad anti-spam.'
          : 'Please check the anti-spam human verification box.'
      );
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage(
        isSpanish
          ? 'Por favor completa todos los campos requeridos.'
          : 'Please complete all required fields.'
      );
      return;
    }

    analyticsService.trackEvent('contact_form_submitted', {
      sender_name: formData.name,
      company: formData.company,
    });

    // Save lead to Firestore
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        subject: formData.subject || '',
        message: formData.message,
        source: 'contact_form',
        status: 'new',
        createdAt: serverTimestamp(),
        notes: ''
      });
    } catch (err) {
      console.error("Error saving contact form lead to Firestore:", err);
    }

    const mailtoSubject = encodeURIComponent(
      formData.subject ||
        (isSpanish
          ? `Consulta de Desarrollo & Automatización - ${formData.name} (${formData.company || 'Empresa'})`
          : `Software & Automation Inquiry - ${formData.name} (${formData.company || 'Company'})`)
    );
    const mailtoBody = encodeURIComponent(
      isSpanish
        ? `Hola Daniel,\n\nSoy ${formData.name} de ${formData.company || 'mi empresa'}.\nEmail de contacto: ${formData.email}\n\nRequerimientos del Proyecto:\n${formData.message}\n\n---\nEnviado desde danielib.com`
        : `Hello Daniel,\n\nI am ${formData.name} from ${formData.company || 'my company'}.\nContact email: ${formData.email}\n\nProject Requirements:\n${formData.message}\n\n---\nSent from danielib.com`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatusMessage(
      isSpanish
        ? '¡Abriendo tu cliente de correo para enviar! Si no abre automáticamente, puedes escribir directo a ' + personalInfo.email
        : 'Opening your email client! If it does not trigger automatically, write directly to ' + personalInfo.email
    );
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-[#fbfbfb] bg-noise text-slate-900 border-t border-slate-100 relative overflow-hidden">
      {/* Subtle Ambient light */}
      <div className="absolute inset-0 mesh-identity-glow opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
            <span>06 // CONTACT & INQUIRIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-[0.08em] uppercase">
            {isSpanish ? 'INICIEMOS UNA CONVERSACIÓN' : 'GET IN TOUCH'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-editorial p-6 sm:p-7 space-y-6">
              <h3 className="text-xs font-mono tracking-widest uppercase font-semibold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-4">
                <span>{isSpanish ? 'CANALES DIRECTOS' : 'DIRECT CHANNELS'}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/80 flex items-center gap-1.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isSpanish ? 'DISPONIBLE' : 'AVAILABLE'}
                </span>
              </h3>

              {/* Email item */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold">
                    {isSpanish ? 'CORREO CORPORATIVO' : 'WORK EMAIL'}
                  </p>
                  <p className="text-xs font-semibold text-slate-950 truncate mt-0.5">{personalInfo.email}</p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 hover:text-indigo-800 mt-1 font-light transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>
                      {copied
                        ? (isSpanish ? '¡COPIADO!' : 'COPIED!')
                        : (isSpanish ? 'COPIAR EMAIL' : 'COPY EMAIL')}
                    </span>
                  </button>
                </div>
              </div>

              {/* GitHub Item */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-100 text-amber-800 shrink-0">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold">GITHUB VERIFIED</p>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-950 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>github.com/{personalInfo.brandHandle}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    {isSpanish
                      ? 'código auditable, CI/CD y automatizaciones'
                      : 'auditable repositories, CI/CD and automation tools'}
                  </p>
                </div>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold">
                    {isSpanish ? 'ZONA HORARIA & MODALIDAD' : 'TIMEZONE & LOCATION'}
                  </p>
                  <p className="text-xs font-semibold text-slate-950 mt-0.5">{personalInfo.location}</p>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    {isSpanish
                      ? 'UTC-5 (EST) / Remoto Global'
                      : 'UTC-5 (EST) / Global Remote'}
                  </p>
                </div>
              </div>

              {/* Response SLA */}
              <div className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-100/50 flex items-center gap-3 text-xs text-indigo-900 font-light">
                <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>
                  {isSpanish
                    ? 'Tiempo de respuesta garantizado: menos de 24 horas hábiles.'
                    : 'Guaranteed response time: within 24 business hours.'}
                </span>
              </div>
            </div>

            {/* Quick Consultation Call Card */}
            <div className="card-editorial relative overflow-hidden p-6 sm:p-7 space-y-4 border border-emerald-100 shadow-sm group bg-white">
              {/* Soft Image Background */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <img
                  src={phoneConsultationImg}
                  alt="Phone Consultation"
                  className="w-full h-full object-cover object-center grayscale-[10%]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Soft Green Gradient Overlay */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-50/95 via-emerald-50/80 to-white/90" />

              <div className="relative z-10 flex items-center gap-2 text-emerald-950 font-mono text-xs uppercase tracking-wider font-bold">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>
                  {isSpanish ? 'LLAMADA TÉCNICA' : 'TECHNICAL DISCOVERY CALL'}
                </span>
              </div>
              <p className="relative z-10 text-xs text-emerald-900/80 font-light leading-relaxed">
                {isSpanish
                  ? '¿Prefieres conversar directamente sobre la arquitectura o alcance de tu proyecto? Coordinemos una llamada de 20 minutos.'
                  : 'Prefer to talk directly about your architecture or project scope? Let’s schedule a 20-minute consultation.'}
              </p>
              <div className="relative z-10 pt-1">
                <a
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(isSpanish ? 'Coordinar Llamada de Descubrimiento Técnico' : 'Schedule Technical Discovery Call')}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-900/20"
                >
                  <span>{isSpanish ? 'AGENDAR LLAMADA' : 'SCHEDULE CALL'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="card-editorial p-6 sm:p-8 space-y-5 bg-white/95 backdrop-blur-md"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span>{isSpanish ? 'DETALLES DEL PROYECTO' : 'PROJECT DETAILS'}</span>
              </h3>

              {/* Honeypot field (hidden from real users, traps bots) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_url_check"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                    {t.nameLabel} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isSpanish ? "Ej: John Miller" : "e.g. John Miller"}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                    {t.companyLabel}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={isSpanish ? "Ej: Apex Digital LLC" : "e.g. Apex Digital LLC"}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                  {t.emailLabel} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isSpanish ? "john@empresa.com" : "john@company.com"}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                  {t.subjectLabel}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={
                    isSpanish
                      ? "Ej: Automatización ETL BigQuery / Desarrollo Web"
                      : "e.g. BigQuery ETL Automation / Full-Stack Web App"
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                  {t.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isSpanish
                      ? "Describe tus metas, tecnologías actuales, cuellos de botella operativos..."
                      : "Describe your project objectives, current stack, operational bottlenecks..."
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors resize-y font-light"
                />
              </div>

              {/* Anti-spam Verification Checkbox */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                <input
                  id="anti-spam-checkbox"
                  type="checkbox"
                  checked={captchaPassed}
                  onChange={e => setCaptchaPassed(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-slate-950 bg-white border-slate-300 focus:ring-slate-900"
                />
                <label htmlFor="anti-spam-checkbox" className="text-xs text-slate-600 font-light cursor-pointer select-none flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>
                    {isSpanish
                      ? 'Confirmo que acepto ser contactado para este proyecto.'
                      : 'I agree to be contacted regarding this project.'}
                  </span>
                </label>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono font-light">
                  {statusMessage}
                </div>
              )}

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full btn-ios-dark py-3 rounded-full text-xs font-mono font-semibold uppercase tracking-[0.15em] inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>{t.submitBtn.toUpperCase()}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
