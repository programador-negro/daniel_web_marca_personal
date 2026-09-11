import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import heroCityImg from '../assets/images/modern_city_skyline_1789083347316.jpg';

export const HeroSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-white bg-noise"
    >
      {/* Subtle Ambient Mesh Identity Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] mesh-identity-glow rounded-full opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-mono text-[9px] font-bold uppercase tracking-widest">
              01 // INDEX
            </span>
            <span className="text-slate-200">|</span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase font-medium">
              DANIEL IBARRA
            </span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isSpanish ? 'DISPONIBLE PARA PROYECTOS' : 'AVAILABLE FOR PROJECTS'}
            </span>
          </div>
        </div>

        {/* Poster Style Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 bg-white/95 backdrop-blur-md shadow-xs min-h-[500px] sm:min-h-[560px] flex items-center">
          
          {/* Background Image: Architectural Skyline */}
          <div className="absolute inset-0 z-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src={heroCityImg}
              alt="Modern Minimalist Architecture"
              className="w-full h-full object-cover object-center sm:object-right"
              referrerPolicy="no-referrer"
            />
            {/* White Fade Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10 sm:hidden" />
          </div>

          {/* Foreground Editorial Content */}
          <div className="relative z-20 max-w-2xl p-8 sm:p-14 lg:p-16 space-y-8">
            
            {/* Editorial Technical Badges - Beautiful Pastel Palettes */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[9px] tracking-widest uppercase">
              <span className="px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 font-semibold shadow-2xs">
                SOFTWARE DEVELOPER
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50/80 border border-amber-100/85 text-amber-800 font-semibold shadow-2xs">
                DATA ARCHITECTURE
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50/80 border border-rose-100 text-rose-700 font-semibold shadow-2xs">
                6+ YEARS EXP
              </span>
            </div>

            {/* Main Title - ALL CAPS EDITORIAL LIGHT/REGULAR */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-900 tracking-[0.06em] leading-[1.12] uppercase">
                AUTOMATE OPERATIONS.{' '}
                <span className="font-semibold text-slate-950 block sm:inline">
                  SCALE REVENUE.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-xl">
                {isSpanish
                  ? 'desarrollo de software de alto impacto, ingeniería backend y pipelines de datos diseñados para empresas que buscan precisión técnica, velocidad y estabilidad.'
                  : 'high-performance software engineering, scalable backend architectures, and automated data pipelines built for companies scaling with speed and technical precision.'}
              </p>
            </div>

            {/* Action Buttons - iOS Glassmorphism */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                id="hero-quote-cta"
                to="/cotizador"
                className="btn-ios-dark hover-mesh-aura inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full font-mono text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{isSpanish ? 'COTIZAR PROYECTO' : 'CALCULATE ESTIMATE'}</span>
              </Link>

              <a
                id="hero-cases-cta"
                href="#sobre-mi"
                className="btn-ios-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs font-medium uppercase tracking-[0.15em] cursor-pointer"
              >
                <span>{isSpanish ? 'EXPLORAR PORTAFOLIO' : 'EXPLORE PORTFOLIO'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Micro Details Footnote */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-5 border-t border-slate-100 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-light">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500 font-medium">{isSpanish ? 'Respuesta < 24 hrs' : 'Response < 24 hrs'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500 font-medium">{isSpanish ? 'Código Limpio & Auditado' : 'Clean & Audited Code'}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="p-1 rounded-full bg-amber-50 border border-amber-100/80 text-amber-600">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500 font-medium">{isSpanish ? 'Rendimiento WPO' : 'WPO Performance'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


