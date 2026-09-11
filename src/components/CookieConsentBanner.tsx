import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface CookieBannerProps {
  onOpenLegal: (tab: 'privacy' | 'cookies' | 'terms') => void;
}

export const CookieConsentBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const { language } = useLanguage();
  const t = translations[language].cookies;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_v1');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('cookie_consent_v1', JSON.stringify({ essential: true, analytics: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in">
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xl backdrop-blur-md text-slate-800">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.title}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="text-[11px] text-cyan-700 hover:text-cyan-800 underline font-semibold cursor-pointer"
          >
            {t.customize}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.rejectNonEssential}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
