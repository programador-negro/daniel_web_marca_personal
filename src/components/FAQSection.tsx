import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, ArrowRight, MessageSquare } from 'lucide-react';
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
    return currentFaqs.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery, currentFaqs]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-14 sm:py-18 bg-[#FAF9F5] border-b border-[#E5E2D9] relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#191919] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-[#6B665E] font-normal max-w-lg mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6B665E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={
                isSpanish
                  ? 'Buscar pregunta o término (ej. pagos, NDA, BigQuery, contratos)...'
                  : 'Search question or keyword (e.g., payments, NDA, BigQuery, SLA)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] text-xs sm:text-sm text-[#191919] placeholder-[#6B665E]/50 focus:outline-none focus:border-[#C15F3C] transition-colors"
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
                  className={`px-3 py-1 rounded-[6px] text-xs font-sans transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C15F3C] text-[#FAF9F5] font-medium shadow-xs'
                      : 'bg-[#F4F3EE] hover:bg-[#E5E2D9] text-[#6B665E] border border-[#E5E2D9]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-[6px] border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#B1ADA1] bg-[#FAF9F5]'
                    : 'border-[#E5E2D9] bg-[#FAF9F5] hover:border-[#B1ADA1]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-serif font-normal text-[#191919]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0 transition-transform duration-200 border border-[#E5E2D9] ${
                      isOpen
                        ? 'rotate-180 bg-[#C15F3C] text-[#FAF9F5] border-[#C15F3C]'
                        : 'bg-[#F4F3EE] text-[#6B665E]'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B665E] leading-relaxed border-t border-[#E5E2D9] pt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-[#6B665E] font-sans text-xs">
              {isSpanish
                ? 'No encontramos preguntas relacionadas con tu búsqueda.'
                : 'No questions found matching your search.'}
            </div>
          )}
        </div>

        {/* Direct CTA */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F4F3EE] border border-[#E5E2D9] rounded-[6px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left flex-1">
            <div className="p-3 rounded-[4px] bg-[#FAF9F5] text-[#C15F3C] border border-[#E5E2D9] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-serif font-normal text-[#191919]">
                {isSpanish ? '¿Tienes un requerimiento técnico específico?' : 'Do you have a specific technical request?'}
              </h3>
              <p className="text-xs text-[#6B665E] max-w-xl leading-relaxed">
                {isSpanish
                  ? 'Escríbeme directamente para analizar tus flujos de datos, requerimientos de integración o alcances de automatización.'
                  : 'Write directly to analyze your data pipelines, software integration scopes, or automation goals.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto text-center">
            <a
              href="#contacto"
              className="btn-claude-primary w-full md:w-auto"
            >
              <span>{isSpanish ? 'Iniciar Contacto' : "Let's Connect"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
