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
        badge: 'bg-[#F4EBE1] border-[#E8D7C5] text-[#C15F3C]',
        dot: 'bg-[#C15F3C] ring-[#E5E2D9]',
        sector: isSpanish ? 'Travel Tech & Big Data' : 'Travel Tech & Big Data',
      };
    }
    if (c.includes('globant')) {
      return {
        badge: 'bg-[#E3EEE6] border-[#D1E2D6] text-[#2D6A4F]',
        dot: 'bg-[#2D6A4F] ring-[#E5E2D9]',
        sector: isSpanish ? 'Consultoría Digital & Microservicios' : 'Digital Consulting & Microservices',
      };
    }
    if (c.includes('emtelco')) {
      return {
        badge: 'bg-[#E2ECF4] border-[#CCE0EE] text-[#2B5B84]',
        dot: 'bg-[#2B5B84] ring-[#E5E2D9]',
        sector: isSpanish ? 'Telecomunicaciones & Migración Cloud' : 'Telecom & Cloud Migration',
      };
    }
    return {
      badge: 'bg-[#EDE4F2] border-[#DFCDE7] text-[#6F4E7C]',
      dot: 'bg-[#6F4E7C] ring-[#E5E2D9]',
      sector: isSpanish ? 'Banca & Seguridad Corporativa' : 'Banking & Corporate Security',
    };
  };

  return (
    <section id="experiencia" className="py-16 sm:py-24 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] text-[#6B665E] text-xs font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C]" />
            <span>{isSpanish ? 'Historial Técnico Comprobado' : 'Proven Production Track Record'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#191919] tracking-tight">
            {isSpanish ? (
              <>
                Experiencia <span className="italic font-normal text-[#C15F3C]">Profesional</span>
              </>
            ) : (
              <>
                Professional <span className="italic font-normal text-[#C15F3C]">Experience</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-normal leading-relaxed max-w-2xl mx-auto">
            {isSpanish
              ? 'Liderazgo técnico en ingeniería de datos, backend de alto rendimiento y arquitecturas en la nube para empresas de escala global.'
              : 'Technical leadership in data engineering, high-throughput backend services, and resilient cloud architecture for multinational operations.'}
          </p>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-14">
          <div className="p-4 sm:p-5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-2xs">
            <div className="flex items-center justify-between text-[#6B665E] mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665E]">
                {isSpanish ? 'Trayectoria' : 'Experience'}
              </span>
              <Calendar className="w-4 h-4 text-[#C15F3C]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#191919] tracking-tight">
              {isSpanish ? '5+ Años' : '5+ Years'}
            </div>
            <p className="text-xs text-[#6B665E] mt-1">
              {isSpanish ? 'Multinacionales & Consultoría' : 'Multinationals & Consulting'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-2xs">
            <div className="flex items-center justify-between text-[#6B665E] mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665E]">
                {isSpanish ? 'Pipelines ETL' : 'ETL Pipelines'}
              </span>
              <Layers className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#191919] tracking-tight">219+</div>
            <p className="text-xs text-[#6B665E] mt-1">
              {isSpanish ? 'En Apache Airflow & GCP' : 'On Apache Airflow & GCP'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-2xs">
            <div className="flex items-center justify-between text-[#6B665E] mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665E]">
                {isSpanish ? 'Volumen Diario' : 'Daily Volume'}
              </span>
              <Database className="w-4 h-4 text-[#2B5B84]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#191919] tracking-tight">20M+</div>
            <p className="text-xs text-[#6B665E] mt-1">
              {isSpanish ? 'Filas ingeridas en BigQuery' : 'Daily rows into BigQuery'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-2xs">
            <div className="flex items-center justify-between text-[#6B665E] mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665E]">
                {isSpanish ? 'Confiabilidad' : 'Reliability'}
              </span>
              <ShieldCheck className="w-4 h-4 text-[#6F4E7C]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#191919] tracking-tight">99.9%</div>
            <p className="text-xs text-[#6B665E] mt-1">
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
              className={`py-1.5 px-3 rounded-[6px] text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-[#191919] text-[#FAF9F5] shadow-xs border border-[#191919]'
                  : 'bg-[#F4F3EE] text-[#6B665E] border border-[#E5E2D9] hover:text-[#191919] hover:bg-[#FAF9F5]'
              }`}
            >
              {isSpanish ? btn.labelEs : btn.labelEn}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredExperience.map((item) => {
            const colors = getCompanyColor(item.company);
            return (
              <div
                key={item.id}
                className="relative pl-6 sm:pl-8 border-l border-[#E5E2D9]"
              >
                {/* Dot indicator */}
                <div
                  className={`absolute -left-[7px] top-5 w-3 h-3 rounded-full border-2 border-[#FAF9F5] shadow-xs ${colors.dot} ring-2 ring-[#E5E2D9]`}
                />

                {/* Experience Card */}
                <div className="p-6 sm:p-8 space-y-4 bg-[#F4F3EE] border border-[#E5E2D9] shadow-2xs hover:border-[#B1ADA1] transition-all duration-200 rounded-[6px]">
                  
                  {/* Top Bar: Role & Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2D9] pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`text-[11px] font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-[4px] border ${colors.badge}`}>
                          {item.company}
                        </span>
                        <span className="text-[11px] font-mono text-[#6B665E] bg-[#FAF9F5] border border-[#E5E2D9] px-2 py-0.5 rounded-[4px]">
                          {colors.sector}
                        </span>
                        {item.isCurrent && (
                          <span className="text-[11px] font-mono tracking-wider px-2.5 py-0.5 rounded-[4px] bg-[#E3EEE6] border border-[#D1E2D6] text-[#2D6A4F] font-medium uppercase flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                            <span>{isSpanish ? 'PRESENTE' : 'PRESENT'}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-[#191919] tracking-tight">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#6B665E]">
                      <span className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1 rounded-[4px] border border-[#E5E2D9]">
                        <Calendar className="w-3.5 h-3.5 text-[#C15F3C]" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1 rounded-[4px] border border-[#E5E2D9]">
                        <MapPin className="w-3.5 h-3.5 text-[#6B665E]" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-sm text-[#191919] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Points with highlight indicators */}
                  <div className="space-y-2 pt-1">
                    {item.bulletPoints.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#191919] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#C15F3C] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[#E5E2D9]">
                    <span className="text-[10px] font-mono text-[#6B665E] font-medium uppercase mr-1">
                      {isSpanish ? 'STACK:' : 'STACK:'}
                    </span>
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#FAF9F5] text-[#191919] border border-[#E5E2D9] uppercase"
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
        <div className="mt-16 max-w-4xl mx-auto rounded-[6px] bg-[#191919] text-[#FAF9F5] border border-[#303030] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[4px] bg-[#FAF9F5]/10 border border-[#FAF9F5]/20 text-[#FAF9F5] text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#C15F3C]" />
              <span>{isSpanish ? 'DISPONIBILIDAD INMEDIATA' : 'IMMEDIATE AVAILABILITY'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF9F5] tracking-tight">
              {isSpanish ? '¿Interesado en mi perfil para tu equipo o proyecto?' : 'Looking for a Senior Engineer for your Team?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F5]/80 leading-relaxed">
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
              className="py-2.5 px-4 rounded-[6px] bg-emerald-700 hover:bg-emerald-600 text-[#FAF9F5] text-xs font-sans font-medium transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#FAF9F5]" />
              <span>{isSpanish ? 'WhatsApp' : 'Chat on WhatsApp'}</span>
            </a>

            <Link
              to="/cotizador"
              className="py-2.5 px-4 rounded-[6px] bg-[#C15F3C] hover:bg-[#A84F30] text-[#FAF9F5] text-xs font-sans font-medium transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{isSpanish ? 'Cotizador de ROI' : 'ROI Estimator'}</span>
              <ArrowRight className="w-4 h-4 text-[#FAF9F5]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
