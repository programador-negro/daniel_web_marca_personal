import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { analyticsService } from '../services/analyticsService';

export const FloatingWhatsAppButton: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const defaultMessage = isSpanish
    ? '¡Hola Daniel! Vengo desde tu sitio web danielib.com y me gustaría solicitar información sobre tus servicios de desarrollo y automatización.'
    : "Hi Daniel! I'm reaching out from your website danielib.com and I'd like to ask about your software development and automation services.";

  const whatsappUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const handleClick = () => {
    analyticsService.trackEvent('whatsapp_floating_btn_clicked', { language: isSpanish ? 'es' : 'en' });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5">
      {/* Tooltip Badge */}
      <div
        id="whatsapp-tooltip"
        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-[11px] font-semibold border border-emerald-500/30 shadow-xl backdrop-blur-xl transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-2 scale-95'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="tracking-wide">
          {isSpanish ? 'Respuesta por WhatsApp' : 'Instant response'}
        </span>
      </div>

      {/* Glassmorphic Floating Button */}
      <button
        id="floating-whatsapp-btn"
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={isSpanish ? 'Contactar por WhatsApp a Daniel Ibarra' : 'Contact Daniel Ibarra on WhatsApp'}
        className="relative group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600/90 via-emerald-500/90 to-teal-600/90 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-500 text-white backdrop-blur-md border border-emerald-300/40 shadow-lg shadow-emerald-950/20 hover:shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      >
        {/* Official WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current text-white transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Text Label on larger screens */}
        <span className="hidden sm:inline-block font-semibold text-xs tracking-wide text-white drop-shadow-xs whitespace-nowrap">
          WhatsApp
        </span>
      </button>
    </div>
  );
};


