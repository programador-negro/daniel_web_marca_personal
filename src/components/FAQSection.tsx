import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { faqDataByLang, faqData } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const FAQSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].faqs;
  const currentFaqs = faqDataByLang[language] || faqData;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'contracts', label: t.categories.contracts },
    { id: 'automation', label: t.categories.automation },
    { id: 'web', label: t.categories.web },
    { id: 'general', label: t.categories.general },
  ];

  const filteredFaqs = useMemo(() => {
    return currentFaqs.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery, currentFaqs]);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-white bg-noise border-t border-slate-200/80 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-mono uppercase tracking-widest font-bold mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>05 // FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-[0.06em] uppercase mb-3">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light max-w-lg mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={
                isSpanish
                  ? 'Buscar pregunta o término (ej. pagos, NDA, BigQuery, contratos)...'
                  : 'Search question or keyword (e.g., payments, NDA, BigQuery, SLA)...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-50/70 border border-slate-200/90 text-xs sm:text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-colors shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold shadow-xs ring-2 ring-slate-900/10'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`card-editorial overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-300 ring-2 ring-indigo-500/10 bg-white shadow-md'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 sm:px-6 py-4.5 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold tracking-wide text-slate-900 uppercase font-mono">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'rotate-180 bg-slate-950 text-white shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-400'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              {isSpanish
                ? 'No encontramos preguntas relacionadas con tu búsqueda.'
                : 'No questions found matching your search.'}
            </div>
          )}
        </div>

        {/* Direct CTA under FAQs with soft breathing colorful shadow animation */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-white to-[#faf9f6] border border-slate-200/80 rounded-2xl relative overflow-hidden animated-shadow-glow flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Decorative subtle background accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10 flex-1">
            <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/30 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  <span>{isSpanish ? 'Diagnóstico Sin Costo' : 'Free Consultation'}</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isSpanish ? 'Respuesta en < 24h' : 'Response under 24h'}
                </span>
              </div>
              
              <h3 className="text-sm font-semibold tracking-wide text-slate-900 font-mono uppercase">
                {isSpanish
                  ? '¿Tienes un proyecto o cuello de botella en mente?'
                  : 'Do you have a project or bottleneck in mind?'}
              </h3>
              <p className="text-xs text-slate-500 font-light max-w-xl leading-relaxed">
                {isSpanish
                  ? 'Escríbeme directamente. Analicemos tus flujos manuales, integraciones de software o arquitectura de datos para estructurar una solución a tu medida.'
                  : 'Write to me directly. Let\'s analyze your manual workflows, software integrations, or data architecture to structure a customized solution.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 relative z-10 w-full md:w-auto text-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2.5 w-full md:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-mono uppercase tracking-widest transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer font-bold"
            >
              <span>{isSpanish ? 'HABLEMOS DE TU PROYECTO' : 'LET\'S TALK ABOUT YOUR PROJECT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
