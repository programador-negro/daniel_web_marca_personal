import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Layers, Database, ShieldCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { experienceDataByLang, experienceData, personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

type FilterType = 'all' | 'data' | 'backend' | 'security';

export const ExperienceSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const currentExperience = experienceDataByLang[language] || experienceData;
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredExperience = currentExperience.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'data') return item.company.toLowerCase().includes('amadeus');
    if (activeFilter === 'backend') {
      return item.company.toLowerCase().includes('globant') || item.company.toLowerCase().includes('emtelco');
    }
    if (activeFilter === 'security') return item.company.toLowerCase().includes('bancolombia');
    return true;
  });

  const getCompanyColor = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('amadeus')) {
      return {
        badge: 'bg-indigo-50 border-indigo-200 text-indigo-900',
        dot: 'bg-indigo-600 ring-indigo-100',
        sector: isSpanish ? 'Travel Tech & Big Data' : 'Travel Tech & Big Data',
      };
    }
    if (c.includes('globant')) {
      return {
        badge: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        dot: 'bg-emerald-600 ring-emerald-100',
        sector: isSpanish ? 'Consultoría Digital & Microservicios' : 'Digital Consulting & Microservices',
      };
    }
    if (c.includes('emtelco')) {
      return {
        badge: 'bg-amber-50 border-amber-200 text-amber-900',
        dot: 'bg-amber-600 ring-amber-100',
        sector: isSpanish ? 'Telecomunicaciones & Migración Cloud' : 'Telecom & Cloud Migration',
      };
    }
    return {
      badge: 'bg-sky-50 border-sky-200 text-sky-900',
      dot: 'bg-sky-600 ring-sky-100',
      sector: isSpanish ? 'Banca & Seguridad Corporativa' : 'Banking & Corporate Security',
    };
  };

  return (
    <section id="experiencia" className="py-16 sm:py-24 bg-slate-50/75 bg-noise relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono tracking-widest uppercase font-bold shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>01 // {isSpanish ? 'HISTORIAL TÉCNICO COMPROBADO' : 'PROVEN PRODUCTION TRACK RECORD'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[0.04em] uppercase">
            {isSpanish ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            {isSpanish
              ? 'Liderazgo técnico en ingeniería de datos, backend de alto rendimiento y arquitecturas en la nube para empresas de escala global.'
              : 'Technical leadership in data engineering, high-throughput backend services, and resilient cloud architecture for multinational operations.'}
          </p>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-14">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {isSpanish ? 'Trayectoria' : 'Experience'}
              </span>
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">5+ Años</div>
            <p className="text-[11px] text-slate-500 font-light mt-1">
              {isSpanish ? 'Multinacionales & Consultoría' : 'Multinationals & Consulting'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {isSpanish ? 'Pipelines ETL' : 'ETL Pipelines'}
              </span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">219+</div>
            <p className="text-[11px] text-slate-500 font-light mt-1">
              {isSpanish ? 'En Apache Airflow & GCP' : 'On Apache Airflow & GCP'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {isSpanish ? 'Volumen Diario' : 'Daily Volume'}
              </span>
              <Database className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">20M+</div>
            <p className="text-[11px] text-slate-500 font-light mt-1">
              {isSpanish ? 'Filas ingeridas en BigQuery' : 'Daily rows into BigQuery'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {isSpanish ? 'Confiabilidad' : 'Reliability'}
              </span>
              <ShieldCheck className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">99.9%</div>
            <p className="text-[11px] text-slate-500 font-light mt-1">
              {isSpanish ? 'SLA en ambientes productivos' : 'Production uptime & SLA'}
            </p>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-12">
          {[
            { id: 'all', labelEs: 'Todas las Posiciones (4)', labelEn: 'All Positions (4)' },
            { id: 'data', labelEs: 'Data Engineering (Amadeus)', labelEn: 'Data Engineering (Amadeus)' },
            { id: 'backend', labelEs: 'Backend & Cloud (Globant / Emtelco)', labelEn: 'Backend & Cloud (Globant / Emtelco)' },
            { id: 'security', labelEs: 'Fintech & Seguridad (Bancolombia)', labelEn: 'Fintech & Security (Bancolombia)' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setActiveFilter(btn.id as FilterType)}
              className={`py-2 px-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-slate-900 text-white shadow-xs border border-slate-900'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {isSpanish ? btn.labelEs : btn.labelEn}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-10">
          {filteredExperience.map((item) => {
            const colors = getCompanyColor(item.company);
            return (
              <div
                key={item.id}
                className="relative pl-6 sm:pl-10 border-l-2 border-slate-200/90"
              >
                {/* Dot indicator */}
                <div
                  className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-white shadow-xs ${colors.dot} ring-4`}
                />

                {/* Experience Card */}
                <div className="card-editorial p-6 sm:p-8 space-y-5 bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 rounded-2xl">
                  
                  {/* Top Bar: Role & Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${colors.badge}`}>
                          {item.company}
                        </span>
                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {colors.sector}
                        </span>
                        {item.isCurrent && (
                          <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold uppercase flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{isSpanish ? 'PRESENTE' : 'PRESENT'}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Points with highlight indicators */}
                  <div className="space-y-2.5 pt-1">
                    {item.bulletPoints.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-light">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase mr-1">
                      {isSpanish ? 'STACK:' : 'STACK:'}
                    </span>
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 font-semibold border border-slate-200 uppercase hover:bg-slate-100 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Next Step / Hiring Strategic CTA Card */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{isSpanish ? 'DISPONIBILIDAD INMEDIATA' : 'IMMEDIATE AVAILABILITY'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono uppercase tracking-tight">
              {isSpanish ? '¿Interesado en mi perfil para tu equipo o proyecto?' : 'Looking for a Senior Engineer for your Team?'}
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              {isSpanish
                ? 'Disponible para contratos remotos, consultoría nearshore en EE.UU. o posiciones senior de Data & Backend Engineering.'
                : 'Available for remote contracts, nearshore consulting in the US, or senior Data & Backend Engineering roles.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
                isSpanish
                  ? 'Hola Daniel, revisé tu trayectoria en tu portafolio y me gustaría conversar sobre una oportunidad técnica.'
                  : 'Hi Daniel, I reviewed your career track record and would like to discuss an engineering opportunity.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isSpanish ? 'Conversar por WhatsApp' : 'Chat on WhatsApp'}</span>
            </a>

            <Link
              to="/cotizador"
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>{isSpanish ? 'Cotizador de ROI' : 'ROI Estimator'}</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
