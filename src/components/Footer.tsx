import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Mail, ArrowUp, Globe, QrCode } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface FooterProps {
  onOpenLegal: (tab: 'privacy' | 'cookies' | 'terms' | 'notice') => void;
  onOpenQr: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenQr }) => {
  const { language, toggleLanguage, isSpanish } = useLanguage();
  const t = translations[language].footer;
  const navT = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#FAF9F5] border-t border-[#E5E2D9] py-12 text-[#191919] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E5E2D9]">
          
          {/* Brand with Circled Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] border border-[#E5E2D9] bg-[#F4F3EE] flex items-center justify-center font-serif text-sm text-[#191919]">
              D
            </div>
            <div>
              <p className="font-serif text-base font-normal text-[#191919]">
                Daniel Ibarra
              </p>
              <p className="text-xs text-[#6B665E]">
                {isSpanish ? 'Diseñando sistemas digitales. Creando impacto.' : 'Designing digital systems. Creating impact.'}
              </p>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#6B665E]">
            <a href="/#inicio" className="hover:text-[#191919] transition-colors">{isSpanish ? 'Inicio' : 'Home'}</a>
            <a href="/#servicios" className="hover:text-[#191919] transition-colors">{navT.services}</a>
            <Link to="/experiencia" className="hover:text-[#191919] transition-colors">{isSpanish ? 'Experiencia' : 'Experience'}</Link>
            <Link to="/cotizador" className="hover:text-[#C15F3C] transition-colors font-medium">{navT.estimator}</Link>
            <a href="/#faqs" className="hover:text-[#191919] transition-colors">{navT.faqs}</a>
            <a href="/#contacto" className="hover:text-[#191919] transition-colors">{navT.contact}</a>
          </div>

          {/* Social & Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-[6px] text-xs font-sans transition-all cursor-pointer inline-flex items-center gap-1.5 bg-[#FAF9F5] border border-[#E5E2D9] text-[#191919] hover:bg-[#F4F3EE]"
              title={isSpanish ? 'Cambiar a Inglés' : 'Switch to Spanish'}
            >
              <Globe className="w-3.5 h-3.5 text-[#6B665E]" />
              <span>{language.toUpperCase()}</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] text-[#191919] hover:bg-[#F4F3EE] transition-all"
              title="GitHub"
            >
              <GitBranch className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] text-[#191919] hover:bg-[#F4F3EE] transition-all"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-[6px] bg-[#C15F3C] text-[#FAF9F5] hover:bg-[#A84F30] transition-all cursor-pointer"
              title={isSpanish ? "Volver arriba" : "Scroll to top"}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Legal & Security Row with Star ✦ */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B665E]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>© {new Date().getFullYear()} Daniel Ibarra. {isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
            <span className="text-[#C15F3C]">✦</span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              {t.privacy}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              {t.terms}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              {t.cookies}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('notice')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              {t.legalNotice}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenQr}
              className="px-2.5 py-1.5 rounded-[6px] text-xs font-sans transition-all cursor-pointer inline-flex items-center gap-1.5 bg-[#FAF9F5] border border-[#E5E2D9] text-[#191919] hover:bg-[#F4F3EE]"
              title={isSpanish ? 'Imprimir/Compartir Perfil' : 'Print/Share Profile'}
            >
              <QrCode className="w-3.5 h-3.5 text-[#6B665E]" />
              <span>QR Card</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
