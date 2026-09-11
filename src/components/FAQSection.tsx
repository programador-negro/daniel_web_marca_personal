import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';
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
    <section id="faqs" className="py-20 sm:py-28 bg-[#fbfbfb] bg-noise border-t border-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-[0.08em] uppercase mb-3">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-lg mx-auto">
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
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition-colors shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'btn-ios-dark'
                    : 'btn-ios-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
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
                className={`card-editorial overflow-hidden transition-all ${
                  isOpen
                    ? 'border-slate-300 bg-white shadow-xs'
                    : 'border-slate-200/80 bg-white/95'
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

        {/* Direct CTA under FAQs */}
        <div className="mt-12 card-editorial p-6 sm:p-8 bg-indigo-50/40 border border-indigo-100/60 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 font-mono uppercase">
              {isSpanish
                ? '¿Tienes un requerimiento particular?'
                : 'Have a unique requirement?'}
            </h3>
            <p className="text-xs text-slate-500 font-light mt-1">
              {isSpanish
                ? 'Respondo dudas sobre integraciones, arquitectura de datos o flujos sin compromiso.'
                : 'I answer questions about custom integrations, database architecture or pipelines.'}
            </p>
          </div>
          <a
            href="#contacto"
            className="btn-ios-dark inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-[10px] font-mono uppercase tracking-widest shrink-0 transition-all shadow-xs cursor-pointer"
          >
            <span>{isSpanish ? 'HACER UNA PREGUNTA' : 'ASK A QUESTION'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </a>
        </div>

      </div>
    </section>
  );
};
