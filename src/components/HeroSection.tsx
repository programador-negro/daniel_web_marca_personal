import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden bg-white bg-noise"
    >
      {/* Subtle Ambient Mesh Identity Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] mesh-identity-glow rounded-full opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-row items-center justify-between gap-3 mb-4 pb-2.5 border-b border-slate-100/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-500 font-mono text-[8px] font-bold uppercase tracking-widest">
              01 // INDEX
            </span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 font-mono text-[8px] font-bold uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              {isSpanish ? 'DISPONIBLE' : 'AVAILABLE'}
            </span>
          </div>
        </div>

        {/* Poster Style Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 bg-white/95 backdrop-blur-md shadow-xs min-h-[500px] sm:min-h-[560px] flex items-center">
          
          {/* Background Professional Animation: Wealth, Security, and Peace */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#fafafa]">
            {/* Embedded styles for beautiful, smooth custom animations */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slowFluidGlow {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(25px, -35px) scale(1.12); }
                66% { transform: translate(-15px, 15px) scale(0.92); }
                100% { transform: translate(0px, 0px) scale(1); }
              }
              @keyframes slowFluidGlowReverse {
                0% { transform: translate(0px, 0px) scale(1.08); }
                33% { transform: translate(-35px, 25px) scale(0.92); }
                66% { transform: translate(15px, -15px) scale(1.12); }
                100% { transform: translate(0px, 0px) scale(1.08); }
              }
              @keyframes majesticRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes majesticPulse {
                0%, 100% { opacity: 0.12; transform: scale(1); }
                50% { opacity: 0.24; transform: scale(1.03); }
              }
              .animate-fluid-glow-1 {
                animation: slowFluidGlow 22s ease-in-out infinite;
              }
              .animate-fluid-glow-2 {
                animation: slowFluidGlowReverse 26s ease-in-out infinite;
              }
              .animate-majestic-rotate {
                animation: majesticRotate 140s linear infinite;
              }
              .animate-majestic-pulse {
                animation: majesticPulse 12s ease-in-out infinite;
              }
            `}} />

            {/* Slow moving soft colored auroras (Champagne & Emerald-mint representing wealth and peace) */}
            <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[65%] rounded-full bg-amber-100/25 blur-[100px] animate-fluid-glow-1 mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[60%] rounded-full bg-emerald-50/35 blur-[120px] animate-fluid-glow-2 mix-blend-multiply pointer-events-none" />
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[50%] rounded-full bg-indigo-50/25 blur-[110px] animate-fluid-glow-1 pointer-events-none" />

            {/* Fine architectural / security lines representing safety, order, and precision */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.22]">
              <svg className="w-[850px] h-[850px] text-slate-300 animate-majestic-rotate" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Thin orbiting rings for precision and alignment */}
                <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.12" strokeDasharray="3 4" />
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.08" />
                <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="0.12" strokeDasharray="1 6" />
                <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="0.08" />

                {/* Golden ratio inspired spiral/arcs for peace and natural harmony */}
                <path d="M100,100 A95,95 0 0,1 195,100" stroke="currentColor" strokeWidth="0.12" />
                <path d="M100,100 A75,75 0 0,1 175,100" stroke="currentColor" strokeWidth="0.08" />
                <path d="M100,100 A55,55 0 0,1 155,100" stroke="currentColor" strokeWidth="0.12" strokeDasharray="2 2" />
                
                {/* Clean structural crosshairs representing security, focus, and stability */}
                <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.06" strokeDasharray="5 5" />
                <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.06" strokeDasharray="5 5" />

                {/* Elegant subtle outer dots */}
                <circle cx="100" cy="5" r="0.6" fill="currentColor" opacity="0.4" />
                <circle cx="100" cy="195" r="0.6" fill="currentColor" opacity="0.4" />
                <circle cx="5" cy="100" r="0.6" fill="currentColor" opacity="0.4" />
                <circle cx="195" cy="100" r="0.6" fill="currentColor" opacity="0.4" />
              </svg>
            </div>

            {/* Glowing core pulse representing security and stability */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[450px] h-[450px] bg-gradient-to-r from-amber-500/5 to-emerald-500/5 rounded-full blur-[80px] animate-majestic-pulse" />
            </div>

            {/* Premium silk/light overlay to make it extremely soft and non-flashy */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 z-10" />
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


