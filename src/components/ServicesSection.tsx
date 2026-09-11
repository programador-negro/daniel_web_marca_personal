import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Server, Terminal, Database, Globe, Check, ArrowRight, Calculator, ChevronDown, Layers, FileSpreadsheet } from 'lucide-react';
import { servicesDataByLang, servicesData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const ServicesSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].services;
  const currentServices = servicesDataByLang[language] || servicesData;

  // Track expanded state for each service accordion (empty set = all closed at first glance)
  const [openServiceIds, setOpenServiceIds] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setOpenServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (openServiceIds.length === currentServices.length) {
      setOpenServiceIds([]);
    } else {
      setOpenServiceIds(currentServices.map((s) => s.id));
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-indigo-600" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-600" />;
      case 'Database': return <Database className="w-4 h-4 text-rose-600" />;
      case 'Globe': return <Globe className="w-4 h-4 text-sky-600" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  const allExpanded = openServiceIds.length === currentServices.length;

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-[#fbfbfb] bg-noise border-y border-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
            <span>02 // SERVICES & ARCHITECTURE</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-[0.08em] uppercase">
            {t.title}
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>

          {/* Toggle All Control */}
          <div className="flex justify-center pt-2">
            <button
              id="toggle-all-services-btn"
              type="button"
              onClick={toggleAll}
              className="btn-ios-secondary px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-medium cursor-pointer inline-flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {allExpanded
                  ? isSpanish ? 'CONTRAER TODOS' : 'COLLAPSE ALL'
                  : isSpanish ? 'EXPANDIR TODOS' : 'EXPAND ALL'}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Accordion Services List */}
        <div className="space-y-4">
          {currentServices.map((service) => {
            const isOpen = openServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`card-editorial overflow-hidden bg-white/95 backdrop-blur-md ${
                  isOpen ? 'border-slate-300 shadow-sm' : ''
                }`}
              >
                {/* Accordion Header Bar (Clickable) */}
                <button
                  id={`service-toggle-${service.id}`}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 border ${
                      service.iconName === 'Server' ? 'bg-indigo-50/80 border-indigo-100 text-indigo-700' :
                      service.iconName === 'FileSpreadsheet' ? 'bg-emerald-50/80 border-emerald-100 text-emerald-700' :
                      service.iconName === 'Terminal' ? 'bg-amber-50/80 border-amber-100 text-amber-800' :
                      service.iconName === 'Database' ? 'bg-rose-50/80 border-rose-100 text-rose-700' :
                      service.iconName === 'Globe' ? 'bg-sky-50/80 border-sky-100 text-sky-800' :
                      'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-[0.08em] uppercase">
                          {service.title}
                        </h3>
                        <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold shrink-0 border ${
                          service.iconName === 'Server' ? 'bg-indigo-50/55 border-indigo-100/50 text-indigo-700/80' :
                          service.iconName === 'FileSpreadsheet' ? 'bg-emerald-50/55 border-emerald-100/50 text-emerald-700/80' :
                          service.iconName === 'Terminal' ? 'bg-amber-50/55 border-amber-100/50 text-amber-800/80' :
                          service.iconName === 'Database' ? 'bg-rose-50/55 border-rose-100/50 text-rose-700/80' :
                          service.iconName === 'Globe' ? 'bg-sky-50/55 border-sky-100/50 text-sky-800/80' :
                          'bg-slate-50 border-slate-200/80 text-slate-500'
                        }`}>
                          SLA GUARANTEE
                        </span>
                      </div>
                      {!isOpen && (
                        <p className="text-xs text-slate-500 font-light truncate mt-1 max-w-xl">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest">
                      {isOpen ? (isSpanish ? 'OCULTAR' : 'HIDE') : (isSpanish ? 'VER MÁS' : 'EXPAND')}
                    </span>
                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-5 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-200/50">
                      <p className="text-[10px] font-mono uppercase text-slate-400 font-medium tracking-[0.2em]">
                        {t.deliverablesLabel}:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3.5 text-[12.5px] text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200/70 font-normal shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_12px_rgba(15,23,42,0.03)] hover:border-slate-300 transition-all duration-300"
                          >
                            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 shrink-0 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className="leading-relaxed text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between gap-3 flex-wrap">
                      <Link
                        to="/cotizador"
                        className="btn-ios-dark inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest font-semibold cursor-pointer"
                      >
                        <Calculator className="w-3.5 h-3.5 text-slate-300" />
                        <span>{t.quoteService}</span>
                      </Link>

                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-slate-950 font-medium transition-colors"
                      >
                        <span>{isSpanish ? 'CONTACTAR A DANIEL' : 'CONTACT DANIEL'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

