import React from 'react';
import { Award, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { caseStudiesDataByLang, testimonialsDataByLang, caseStudiesData, testimonialsData } from '../data/testimonialsData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const CaseStudiesSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].caseStudies;
  const tTestimonials = translations[language].testimonials;
  const currentCases = caseStudiesDataByLang[language] || caseStudiesData;
  const currentTestimonials = testimonialsDataByLang[language] || testimonialsData;

  return (
    <section id="casos" className="py-20 sm:py-28 bg-transparent border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {currentCases.map((caseItem) => (
            <div
              key={caseItem.id}
              id={`case-study-${caseItem.id}`}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold">
                    {caseItem.industry}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    {caseItem.client}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {caseItem.title}
                </h3>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-500">
                    <strong className="text-slate-800 block mb-0.5">
                      {isSpanish ? 'El Desafío:' : 'The Challenge:'}
                    </strong>
                    {caseItem.challenge}
                  </p>
                  <p className="text-slate-500">
                    <strong className="text-slate-800 block mb-0.5">
                      {isSpanish ? 'La Solución Técnica:' : 'Technical Solution:'}
                    </strong>
                    {caseItem.solution}
                  </p>
                </div>

                {/* Metrics Box */}
                <div className="p-3.5 rounded-xl bg-transparent border border-slate-200 space-y-2">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                    {isSpanish ? 'Impacto Cuantificable' : 'Quantifiable Results'}
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {caseItem.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">{metric.label}:</span>
                        <strong className="text-cyan-700 font-mono font-bold">{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech stack pills */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {caseItem.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-700" />
            <span>{tTestimonials.tag}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {tTestimonials.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {tTestimonials.subtitle}
          </p>
        </div>

        {/* Testimonials 3-Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{test.clientName}</span>
                    {test.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {test.role} • {test.company}
                  </p>
                  <p className="text-[10px] font-mono text-cyan-700 font-semibold">
                    {test.serviceType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
