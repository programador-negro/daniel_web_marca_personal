import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, MessageSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#FAF9F5] scroll-mt-20 border-b border-[#E5E2D9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Main Grid: Left Value Prop + Right Editorial Solution Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Editorial Headline + Narrative) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Editorial Serif Headline (Newsreader / Tiempos style) */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#191919] leading-[1.12] tracking-tight">
                {isSpanish ? (
                  <>
                    Automatiza Operaciones.
                    <span className="block italic font-normal text-[#C15F3C] mt-1 sm:mt-1.5">
                      Escala Ingresos.
                    </span>
                  </>
                ) : (
                  <>
                    Automate Operations.
                    <span className="block italic font-normal text-[#C15F3C] mt-1 sm:mt-1.5">
                      Scale Revenue.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Concise Pitch */}
            <p className="text-base sm:text-lg text-[#6B665E] font-normal leading-relaxed max-w-xl">
              {isSpanish
                ? 'Soluciones robustas y legibles que eliminan fricción y generan retorno de inversión inmediato.'
                : 'Resilient, clean systems that eliminate operational friction and deliver immediate ROI.'}
            </p>

            {/* Action CTAs: Terracotta Primary, Minimal Secondary, 6px border radius */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/cotizador"
                className="btn-claude-primary shadow-xs"
              >
                <span>{isSpanish ? 'Cotizar mi Solución' : 'Estimate My Solution'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>

              <a
                href="#servicios"
                className="btn-claude-secondary"
              >
                <span>{isSpanish ? 'Ver Soluciones' : 'View Solutions'}</span>
                <span className="text-[#6B665E]">↓</span>
              </a>

              <a
                href="https://wa.me/573332541684?text=Hola%20Daniel,%20me%20gustaría%20cotizar%20una%20solución%20técnica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[6px] text-xs font-sans font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Executive Profile & Guarantee Card (Claude aesthetic) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] space-y-5">
              
              {/* Profile Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#E5E2D9]">
                <div className="w-12 h-12 rounded-[6px] bg-[#191919] text-[#FAF9F5] flex items-center justify-center font-serif text-lg font-normal shrink-0">
                  DI
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base text-[#191919] font-normal tracking-tight">
                      Daniel Ibarra
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                  </div>
                  <p className="text-xs font-mono text-[#6B665E]">
                    {isSpanish ? 'Senior Software & Data Engineer' : 'Senior Software & Data Engineer'}
                  </p>
                </div>
              </div>

              {/* Core Value Pillars */}
              <div className="space-y-3">
                <div className="p-3 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#C15F3C] font-medium">
                      {isSpanish ? 'Enfoque de Negocio' : 'Business-First Mindset'}
                    </span>
                    <span className="font-mono text-[10px] text-[#6B665E]">ROI</span>
                  </div>
                  <p className="text-xs text-[#191919] leading-relaxed">
                    {isSpanish
                      ? 'Sistemas construidos para ahorrar horas operativas, reducir costos de nube y generar tracción medible.'
                      : 'Systems engineered to save operational hours, reduce cloud spend, and deliver measurable ROI.'}
                  </p>
                </div>

                <div className="p-3 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#2D6A4F] font-medium">
                      {isSpanish ? 'Metodología Ágil' : 'Fixed Scope & Sprints'}
                    </span>
                    <span className="font-mono text-[10px] text-[#6B665E]">1-3 sem</span>
                  </div>
                  <p className="text-xs text-[#191919] leading-relaxed">
                    {isSpanish
                      ? 'Presupuesto cerrado, entregas semanales con demos funcionales y 100% de propiedad del código.'
                      : 'Fixed budgets, weekly functional demos, zero vendor lock-in, and 100% code ownership.'}
                  </p>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="pt-2 border-t border-[#E5E2D9] flex items-center justify-between text-xs font-sans">
                <span className="text-[#6B665E] font-mono text-[11px]">
                  {isSpanish ? 'Medellín • Remoto / Global' : 'Medellín • Remote Global'}
                </span>
                <Link
                  to="/cotizador"
                  className="inline-flex items-center gap-1.5 font-medium text-[#C15F3C] hover:text-[#A84F30]"
                >
                  <span>{isSpanish ? 'Simular Ahorro' : 'Estimate Savings'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Key Metrics Strip - Minimalist, 1px border, literary numbers */}
        <div className="mt-12 pt-8 border-t border-[#E5E2D9] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9]">
            <div className="text-2xl sm:text-3xl font-serif text-[#191919]">99.9%</div>
            <div className="text-xs font-sans text-[#6B665E] mt-1">
              {isSpanish ? 'Uptime en Producción' : 'Production Uptime'}
            </div>
          </div>
          <div className="p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9]">
            <div className="text-2xl sm:text-3xl font-serif text-[#191919]">-60%</div>
            <div className="text-xs font-sans text-[#6B665E] mt-1">
              {isSpanish ? 'Latencia de Consultas' : 'Query Latency'}
            </div>
          </div>
          <div className="p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9]">
            <div className="text-2xl sm:text-3xl font-serif text-[#191919]">100+</div>
            <div className="text-xs font-sans text-[#6B665E] mt-1">
              {isSpanish ? 'Horas / Mes Ahorradas' : 'Hours / Month Saved'}
            </div>
          </div>
          <div className="p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9]">
            <div className="text-2xl sm:text-3xl font-serif text-[#191919]">219+</div>
            <div className="text-xs font-sans text-[#6B665E] mt-1">
              {isSpanish ? 'Pipelines Implementados' : 'Pipelines Deployed'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
