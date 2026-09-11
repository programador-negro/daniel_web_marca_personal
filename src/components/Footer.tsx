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
        
        {/* Dynamic Colorful CTA: Discuss Workflow Bottlenecks */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden shadow-[0_15px_30px_rgba(99,102,241,0.15)] border border-indigo-400/20">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">
                ⚡️ {isSpanish ? 'OPTIMIZACIÓN EMPRESARIAL' : 'OPERATIONAL EFFICIENCY'}
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-tight leading-tight uppercase">
                {isSpanish ? 'Resolvamos los Cuellos de Botella de tu Negocio' : 'Let’s Discuss Your Workflow Bottlenecks'}
              </h3>
              <p className="text-[11px] text-indigo-50 max-w-lg font-light leading-relaxed">
                {isSpanish 
                  ? 'Analicemos tus procesos repetitivos de forma gratuita y diseñemos un plan de automatización a medida sin compromiso.'
                  : 'Let’s analyze your repetitive manual processes for free and design a tailored cloud-automation blueprint without commitment.'}
              </p>
            </div>
            
            <a
              href="#contacto"
              className="px-5 py-3 bg-white text-indigo-950 hover:text-indigo-950 font-mono text-[10px] font-bold uppercase tracking-[0.15em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              {isSpanish ? 'COMENZAR AHORA' : 'START NOW'} →
            </a>
          </div>
        </div>

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
