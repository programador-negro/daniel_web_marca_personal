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
    <section id="faqs" className="py-20 sm:py-28 bg-transparent border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={
                isSpanish
                  ? 'Buscar pregunta o término (ej. pagos, NDA, BigQuery, contratos)...'
                  : 'Search question or keyword (e.g., payments, NDA, BigQuery, SLA)...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-700 text-white shadow-sm border border-cyan-700'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-white border-cyan-600 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 border-cyan-500 text-cyan-700 bg-cyan-50' : 'text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs">
              {isSpanish
                ? 'No encontramos preguntas relacionadas con tu búsqueda. Escríbeme directamente en la sección de contacto.'
                : 'No questions found matching your search. Feel free to contact me directly below.'}
            </div>
          )}
        </div>

        {/* Direct CTA under FAQs */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-900">
              {isSpanish
                ? '¿Tienes un requerimiento técnico o contractual particular?'
                : 'Have a unique technical or contractual requirement?'}
            </h3>
            <p className="text-xs text-slate-500">
              {isSpanish
                ? 'Respondo dudas sobre integraciones o flujos de trabajo sin compromiso.'
                : 'I answer questions about integrations and custom workflows with no obligation.'}
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold shrink-0 transition-all shadow-sm border border-cyan-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{isSpanish ? 'Hacer una Pregunta' : 'Ask a Question'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
          </a>
        </div>

      </div>
    </section>
  );
};
