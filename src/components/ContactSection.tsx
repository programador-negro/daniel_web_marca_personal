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
    <section id="contacto" className="py-16 sm:py-20 bg-[#FAF9F5] text-[#191919] border-t border-[#E5E2D9] relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status & Availability */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#E3EEE6] border border-[#D1E2D6] text-xs font-sans text-[#2D6A4F]">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span className="font-medium">
                {isSpanish ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
              </span>
            </div>

            {/* Heading & Intro */}
            <div className="space-y-3">
              <h2 className="font-serif italic text-4xl sm:text-5xl font-normal text-[#191919] leading-[1.1] tracking-tight">
                {isSpanish ? 'Trabajemos juntos' : "Let's work together"}
              </h2>
              <p className="text-sm text-[#6B665E] font-normal leading-relaxed">
                {isSpanish
                  ? '¿Tienes un proyecto en mente, pipelines que optimizar o una arquitectura técnica que construir? Escríbeme directamente o agenda una conversación.'
                  : 'Have a project in mind, pipelines to automate, or custom software architecture to build? Drop a message or let’s schedule a chat.'}
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 pt-2">
              
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
                  isSpanish
                    ? 'Hola Daniel, vi tu portafolio y me gustaría conversar sobre un proyecto.'
                    : 'Hello Daniel, I reviewed your portfolio and would like to discuss a project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] hover:border-[#C15F3C] transition-all duration-150 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] flex items-center justify-center text-[#191919] group-hover:text-[#C15F3C] transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#191919]">
                      WhatsApp Directo
                    </div>
                    <div className="text-[11px] text-[#6B665E]">
                      {isSpanish ? 'Respuesta rápida (< 2 hrs)' : 'Quick response (< 2 hrs)'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B665E] group-hover:text-[#C15F3C] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Email Copy Card */}
              <div className="flex items-center justify-between p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] shadow-2xs">
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <div className="w-10 h-10 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] flex items-center justify-center text-[#191919] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-[#191919] truncate">
                      {personalInfo.email}
                    </div>
                    <div className="text-[11px] text-[#6B665E]">
                      {isSpanish ? 'Email Corporativo' : 'Direct Work Email'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-[4px] bg-[#FAF9F5] hover:bg-white border border-[#E5E2D9] text-xs font-sans text-[#191919] hover:border-[#C15F3C] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                  title="Copiar email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span className="text-[#2D6A4F] text-[11px] font-medium">{isSpanish ? 'Copiado' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#6B665E]" />
                      <span className="text-[11px] text-[#6B665E]">{isSpanish ? 'Copiar' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Timezone Details */}
              <div className="p-4 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] space-y-2 text-xs text-[#6B665E]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C15F3C] shrink-0" />
                  <span>Medellín, Colombia • Remoto Global (UTC-5 / EST)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#C15F3C] shrink-0" />
                  <span>Español (Nativo) • English (Fluent C1)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Refined Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-xs space-y-6">
              
              <div className="border-b border-[#E5E2D9] pb-4">
                <h3 className="text-xl font-serif font-normal text-[#191919]">
                  {isSpanish ? 'Enviar un Mensaje Directo' : 'Send a Direct Message'}
                </h3>
                <p className="text-xs text-[#6B665E] mt-1">
                  {isSpanish 
                    ? 'Completa el formulario y te responderé en menos de 24 horas.' 
                    : 'Fill out the form below and I will get back to you within 24 hours.'}
                </p>
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
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-medium text-[#191919]">
                      {isSpanish ? 'Nombre completo *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isSpanish ? 'Ej: Carlos Gómez' : 'e.g., Alex Johnson'}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-xs text-[#191919] placeholder-[#6B665E]/50 focus:bg-white focus:outline-none focus:border-[#C15F3C] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-medium text-[#191919]">
                      {isSpanish ? 'Correo electrónico *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={isSpanish ? 'carlos@empresa.com' : 'alex@company.com'}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-xs text-[#191919] placeholder-[#6B665E]/50 focus:bg-white focus:outline-none focus:border-[#C15F3C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-medium text-[#191919]">
                      {isSpanish ? 'Empresa / Organización' : 'Company / Organization'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isSpanish ? 'Nombre de tu empresa' : 'Your Company'}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-xs text-[#191919] placeholder-[#6B665E]/50 focus:bg-white focus:outline-none focus:border-[#C15F3C] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-medium text-[#191919]">
                      {isSpanish ? 'Tipo de Proyecto / Servicio' : 'Project Scope / Topic'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isSpanish ? 'Ej: Pipeline BigQuery o API Backend' : 'e.g., BigQuery Pipeline or API'}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-xs text-[#191919] placeholder-[#6B665E]/50 focus:bg-white focus:outline-none focus:border-[#C15F3C] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-medium text-[#191919]">
                    {isSpanish ? 'Mensaje o Detalles del Proyecto *' : 'Message or Project Details *'}
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
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E2D9] bg-[#FAF9F5] text-xs text-[#191919] placeholder-[#6B665E]/50 focus:bg-white focus:outline-none focus:border-[#C15F3C] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {statusMessage && (
                  <div className="p-3.5 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] text-xs text-[#191919]">
                    {statusMessage}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-[6px] bg-[#C15F3C] hover:bg-[#A84F30] active:scale-[0.99] text-[#FAF9F5] text-xs font-sans font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? (isSpanish ? 'Enviando...' : 'Sending...') : (isSpanish ? 'Enviar Mensaje Directo' : 'Send Direct Message')}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
