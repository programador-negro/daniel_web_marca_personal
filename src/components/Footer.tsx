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
        
        {/* Dynamic Colorful CTA: Discuss Workflow Bottlenecks with Softer But Striking Colors */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#eef2ff] via-[#fdf4ff] to-[#fffbeb] text-slate-800 relative overflow-hidden shadow-sm border border-indigo-100">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-300/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10 font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">
                ⚡️ {isSpanish ? 'OPTIMIZACIÓN EMPRESARIAL' : 'OPERATIONAL EFFICIENCY'}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight uppercase text-slate-900">
                {isSpanish ? 'Resolvamos los Cuellos de Botella de tu Negocio' : 'Let’s Discuss Your Workflow Bottlenecks'}
              </h3>
              <p className="text-[11px] text-slate-600 max-w-lg font-light leading-relaxed">
                {isSpanish 
                  ? 'Analicemos tus procesos repetitivos de forma gratuita y diseñemos un plan de automatización a medida sin compromiso.'
                  : 'Let’s analyze your repetitive manual processes for free and design a tailored cloud-automation blueprint without commitment.'}
              </p>
            </div>
            
            <a
              href="#contacto"
              className="px-6 py-3 bg-slate-900 text-white hover:bg-slate-850 font-mono text-[10px] font-bold uppercase tracking-[0.15em] rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
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
              className="px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer inline-flex items-center gap-1.5 bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-600 border border-indigo-100/30"
              title={isSpanish ? 'Cambiar a Inglés' : 'Switch to Spanish'}
            >
              <Globe className="w-3 h-3 text-indigo-500" />
              <span>{language.toUpperCase()}</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-600 border border-emerald-100/30 transition-all duration-300 hover:scale-[1.08]"
              title="GitHub"
            >
              <GitBranch className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-full bg-rose-50/60 hover:bg-rose-100/80 text-rose-600 border border-rose-100/30 transition-all duration-300 hover:scale-[1.08]"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-violet-50/60 hover:bg-violet-100/80 text-violet-600 border border-violet-100/30 transition-all duration-300 hover:scale-[1.08] cursor-pointer"
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
              className="px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer inline-flex items-center gap-1.5 bg-amber-50/60 hover:bg-amber-100/80 text-amber-700 border border-amber-100/30"
              title={isSpanish ? 'Imprimir/Compartir Perfil' : 'Print/Share Profile'}
            >
              <QrCode className="w-3 h-3 text-amber-600" />
              <span>QR CARD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
