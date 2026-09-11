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
    <footer id="main-footer" className="bg-white bg-noise border-t border-slate-100 py-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Moniker */}
          <div className="space-y-1">
            <p className="font-semibold text-slate-900 tracking-[0.1em] uppercase text-sm">
              DANIEL IBARRA
            </p>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-light">
              DANIELIB.COM • {isSpanish ? 'SOFTWARE ENGINEER & SOLUTIONS ARCHITECT' : 'SOFTWARE ENGINEER & SOLUTIONS ARCHITECT'}
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-[11px] uppercase tracking-wider text-slate-500 font-light">
            <a href="/#servicios" className="hover:text-slate-900 transition-colors">{navT.services}</a>
            <Link to="/cotizador" className="hover:text-slate-900 transition-colors font-semibold text-slate-900">{navT.estimator}</Link>
            <a href="/#proyectos" className="hover:text-slate-900 transition-colors">{navT.projects}</a>
            <Link to="/habilidades" className="hover:text-slate-900 transition-colors font-medium text-slate-700">{navT.skills}</Link>
            <a href="/#faqs" className="hover:text-slate-900 transition-colors">{navT.faqs}</a>
            <a href="/#contacto" className="hover:text-slate-900 transition-colors">{navT.contact}</a>
          </div>

          {/* Social and Scroll to top */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="btn-ios-secondary px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase transition-colors cursor-pointer inline-flex items-center gap-1.5"
              title={isSpanish ? 'Cambiar a Inglés' : 'Switch to Spanish'}
            >
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="GitHub"
            >
              <GitBranch className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title={isSpanish ? "Volver arriba" : "Scroll to top"}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal & Security Row */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-light">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} DANIEL IBARRA. {t.allRightsReserved.toUpperCase()}</span>
            <span className="hidden sm:inline">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.privacy.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.terms.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.cookies.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('notice')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.legalNotice.toUpperCase()}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenQr}
              className="btn-ios-secondary px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase transition-colors cursor-pointer inline-flex items-center gap-1.5"
              title={isSpanish ? 'Imprimir/Compartir Perfil' : 'Print/Share Profile'}
            >
              <QrCode className="w-3 h-3 text-slate-400" />
              <span>QR CARD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
