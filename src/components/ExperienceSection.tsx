import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceDataByLang, experienceData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const currentExperience = experienceDataByLang[language] || experienceData;

  return (
    <section id="experiencia" className="py-20 sm:py-28 bg-white bg-noise border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
            <span>05 // CAREER PATH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-[0.08em] uppercase">
            {isSpanish ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            {isSpanish
              ? 'historial de impacto en ingeniería de datos, backend y arquitectura cloud en empresas multinacionales.'
              : 'track record of impact in data engineering, backend development, and cloud architecture in multinational environments.'}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {currentExperience.map((item) => (
            <div
              key={item.id}
              className="relative pl-6 sm:pl-10 border-l border-slate-200"
            >
              {/* Dot indicator */}
              <div
                className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border ${
                  item.isCurrent
                    ? 'bg-slate-900 border-slate-900 ring-4 ring-slate-100'
                    : 'bg-slate-300 border-slate-300'
                }`}
              />

              {/* Experience Card */}
              <div className="card-editorial p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 flex-wrap">
                      <span>{item.role}</span>
                      {item.isCurrent && (
                        <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-slate-900 text-white font-medium uppercase">
                          {isSpanish ? 'PRESENTE' : 'PRESENT'}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-widest mt-1">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 font-light">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 pt-2">
                  {item.bulletPoints.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-50 text-slate-600 font-light border border-slate-200/60 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
