import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, PhoneCall, ArrowRight, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { analyticsService } from '../services/analyticsService';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const ContactSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    analyticsService.trackEvent('email_copied', { email: personalInfo.email });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) return;

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage(
        isSpanish
          ? 'Por favor completa nombre, correo y mensaje.'
          : 'Please fill in name, email, and message.'
      );
      return;
    }

    setIsSubmitting(true);

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
      });
    } catch (err) {
      console.error('Error saving lead to Firestore:', err);
    }

    const mailtoSubject = encodeURIComponent(
      formData.subject ||
        (isSpanish
          ? `Consulta de Arquitectura & Software - ${formData.name} (${formData.company || 'Empresa'})`
          : `Software & Data Architecture Inquiry - ${formData.name} (${formData.company || 'Company'})`)
    );
    const mailtoBody = encodeURIComponent(
      isSpanish
        ? `Hola Daniel,\n\nSoy ${formData.name} (${formData.company || 'Empresa'}).\nMi email: ${formData.email}\n\nDetalles del proyecto:\n${formData.message}\n\n---\nEnviado desde danielib.com`
        : `Hello Daniel,\n\nI am ${formData.name} (${formData.company || 'Company'}).\nMy email: ${formData.email}\n\nProject details:\n${formData.message}\n\n---\nSent from danielib.com`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsSubmitting(false);
    setStatusMessage(
      isSpanish
        ? '¡Listo! Si tu gestor de correos no abre automáticamente, puedes escribir directo a ' + personalInfo.email
        : 'Opening your email client! You can also write directly to ' + personalInfo.email
    );
  };

  return (
    <section id="contacto" className="py-14 sm:py-18 bg-[#FAF9F5] text-[#191919] border-t border-[#E5E2D9] relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LET'S WORK TOGETHER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-12 border-b border-[#E5E2D9]">
          
          {/* Left Column: Editorial Serif Headline */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-normal text-[#191919] leading-[1.08] tracking-tight">
              {isSpanish ? 'Trabajemos juntos' : "Let's work together"}
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-base text-[#C15F3C]">✦</span>
              <div className="h-[1px] w-20 bg-[#E5E2D9]" />
            </div>
          </div>

          {/* Middle Column: Invitation & Connect Button */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-sm text-[#6B665E] font-normal leading-relaxed">
              {isSpanish
                ? '¿Tienes un proyecto en mente, pipelines que optimizar o una arquitectura que construir? Hablemos.'
                : 'Have a project in mind, pipelines to automate, or an architecture to build? Let’s bring it to life.'}
            </p>

            <div>
              <a
                href={`https://wa.me/573332541684?text=${encodeURIComponent(
                  isSpanish
                    ? 'Hola Daniel, vi tu portafolio y me gustaría conversar sobre un proyecto.'
                    : 'Hello Daniel, I reviewed your portfolio and would like to discuss a project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-claude-primary"
              >
                <span>{isSpanish ? 'Conectemos' : "Let's Connect"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details with Icons */}
          <div className="lg:col-span-4 space-y-2 font-mono text-xs">
            {/* Email */}
            <div className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[#F4F3EE] transition-colors">
              <div className="w-8 h-8 rounded-[4px] border border-[#E5E2D9] bg-[#FAF9F5] flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-[#191919]" />
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-medium text-[#191919] hover:underline block truncate text-xs"
                >
                  {personalInfo.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs text-[#6B665E] hover:text-[#191919] cursor-pointer"
                title="Copiar email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C15F3C]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* WhatsApp / Phone */}
            <div className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[#F4F3EE] transition-colors">
              <div className="w-8 h-8 rounded-[4px] border border-[#E5E2D9] bg-[#FAF9F5] flex items-center justify-center shrink-0">
                <PhoneCall className="w-3.5 h-3.5 text-[#191919]" />
              </div>
              <a
                href="https://wa.me/573332541684"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#191919] hover:underline text-xs"
              >
                +57 333 254 1684 (WhatsApp)
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[#F4F3EE] transition-colors">
              <div className="w-8 h-8 rounded-[4px] border border-[#E5E2D9] bg-[#FAF9F5] flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#191919]" />
              </div>
              <span className="text-[#6B665E] text-xs">
                Medellín, Colombia // Remote (UTC-5)
              </span>
            </div>

            {/* Web */}
            <div className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[#F4F3EE] transition-colors">
              <div className="w-8 h-8 rounded-[4px] border border-[#E5E2D9] bg-[#FAF9F5] flex items-center justify-center shrink-0">
                <Globe className="w-3.5 h-3.5 text-[#191919]" />
              </div>
              <span className="text-[#6B665E] text-xs font-medium">
                danielib.com
              </span>
            </div>
          </div>

        </div>

        {/* Dispatch Form Container */}
        <div className="pt-12 max-w-2xl mx-auto">
          <div className="rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] p-6 sm:p-8 space-y-5">
            <div className="border-b border-[#E5E2D9] pb-4">
              <span className="text-xs font-mono tracking-wider uppercase text-[#6B665E]">
                06 // Direct Dispatch
              </span>
              <h3 className="text-xl font-serif font-normal text-[#191919] mt-1">
                {isSpanish ? 'Enviar mensaje directo' : 'Send direct message'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                name="company_trap"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
                    {isSpanish ? 'Nombre completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isSpanish ? 'Ej: Carlos Gómez' : 'e.g., Alex Johnson'}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E5E2D9] bg-[#F4F3EE] text-xs text-[#191919] focus:bg-[#FAF9F5] focus:outline-none focus:border-[#C15F3C] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
                    {isSpanish ? 'Correo electrónico *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isSpanish ? 'carlos@empresa.com' : 'alex@company.com'}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E5E2D9] bg-[#F4F3EE] text-xs text-[#191919] focus:bg-[#FAF9F5] focus:outline-none focus:border-[#C15F3C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
                    {isSpanish ? 'Empresa / Organización' : 'Company / Organization'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={isSpanish ? 'Nombre de tu empresa' : 'Your Company'}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E5E2D9] bg-[#F4F3EE] text-xs text-[#191919] focus:bg-[#FAF9F5] focus:outline-none focus:border-[#C15F3C] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
                    {isSpanish ? 'Tipo de Solicitud' : 'Scope / Project Type'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={isSpanish ? 'Ej: Pipeline BigQuery o Backend' : 'e.g., BigQuery Pipeline or API'}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E5E2D9] bg-[#F4F3EE] text-xs text-[#191919] focus:bg-[#FAF9F5] focus:outline-none focus:border-[#C15F3C] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
                  {isSpanish ? 'Mensaje / Alcance del Proyecto *' : 'Message / Project Scope *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isSpanish
                      ? 'Cuéntame sobre el problema operativo, volúmenes de datos o metas de automatización...'
                      : 'Tell me about the operational bottlenecks, data volumes, or automation goals...'
                  }
                  className="w-full px-3.5 py-2 rounded-[6px] border border-[#E5E2D9] bg-[#F4F3EE] text-xs text-[#191919] focus:bg-[#FAF9F5] focus:outline-none focus:border-[#C15F3C] transition-colors resize-none"
                />
              </div>

              {statusMessage && (
                <div className="p-3 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] text-xs text-[#191919] font-mono">
                  {statusMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-[6px] bg-[#C15F3C] hover:bg-[#A84F30] text-[#FAF9F5] text-xs font-sans font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? (isSpanish ? 'Enviando...' : 'Sending...') : (isSpanish ? 'Enviar Mensaje' : 'Send Message')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
