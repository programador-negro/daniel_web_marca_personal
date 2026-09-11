import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, User, Tag, Share2, Check } from 'lucide-react';
import { blogPostsByLang, blogPosts } from '../data/blogData';
import { BlogPost } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const BlogSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].blog;
  const currentPosts = blogPostsByLang[language] || blogPosts;

  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="blog" className="py-20 sm:py-28 bg-transparent border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.slug}`}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {post.date}
                </span>

                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors cursor-pointer"
                >
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-10 my-auto shadow-2xl relative text-slate-800">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 font-semibold">
                <span className="px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200">
                  {activePost.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500 font-normal">
                  <Clock className="w-3.5 h-3.5" />
                  {activePost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title={isSpanish ? "Copiar enlace" : "Copy link"}
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <article className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pb-4 border-b border-slate-200">
                <span className="flex items-center gap-1.5 text-cyan-800 font-semibold">
                  <User className="w-3.5 h-3.5 text-cyan-700" />
                  {activePost.author}
                </span>
                <span>•</span>
                <span>{activePost.date}</span>
              </div>

              <div className="max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {activePost.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-2">
                {activePost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-1 font-medium"
                  >
                    <Tag className="w-3 h-3 text-cyan-700" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Call to action inside post */}
              <div className="mt-8 p-6 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isSpanish
                      ? '¿Quieres aplicar esto en tu infraestructura?'
                      : 'Want to implement this across your infrastructure?'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isSpanish
                      ? 'Puedo implementar este pipeline o plataforma en tu negocio en menos de 2 semanas.'
                      : 'I can implement this custom pipeline or platform in your business within 2 weeks.'}
                  </p>
                </div>
                <a
                  href="#cotizador"
                  onClick={() => setActivePost(null)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold shrink-0 transition-all shadow-sm border border-cyan-600/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSpanish ? 'Cotizar Solución' : 'Get a Custom Quote'}
                </a>
              </div>
            </article>

          </div>
        </div>
      )}

    </section>
  );
};
