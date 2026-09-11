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
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase font-medium">
              01 // INDEX
            </span>
            <span className="text-slate-200">|</span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase font-light">
              DANIEL IBARRA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              {isSpanish ? 'DISPONIBLE PARA PROYECTOS' : 'AVAILABLE FOR PROJECTS'}
            </span>
          </div>
        </div>

        {/* Poster Style Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs min-h-[500px] sm:min-h-[560px] flex items-center">
          
          {/* Background Image: Architectural Skyline */}
          <div className="absolute inset-0 z-0 opacity-25 grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src={heroCityImg}
              alt="Modern Minimalist Architecture"
              className="w-full h-full object-cover object-center sm:object-right"
              referrerPolicy="no-referrer"
            />
            {/* White Fade Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10 sm:hidden" />
          </div>

          {/* Foreground Editorial Content */}
          <div className="relative z-20 max-w-2xl p-8 sm:p-14 lg:p-16 space-y-8">
            
            {/* Editorial Technical Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
              <span className="px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 font-medium">
                SOFTWARE DEVELOPER
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 font-medium">
                DATA ARCHITECTURE
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 font-medium">
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-slate-200/60 font-mono text-[11px] text-slate-400 uppercase tracking-wider font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-800" />
                <span>{isSpanish ? 'Respuesta < 24 hrs' : 'Response < 24 hrs'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
                <span>{isSpanish ? 'Código Limpio & Auditado' : 'Clean & Audited Code'}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-slate-800" />
                <span>{isSpanish ? 'Rendimiento WPO' : 'WPO Performance'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


