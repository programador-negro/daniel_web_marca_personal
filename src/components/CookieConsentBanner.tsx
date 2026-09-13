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
      <div className="p-5 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] shadow-md text-[#191919]">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-[4px] bg-[#F4F3EE] border border-[#E5E2D9] text-[#C15F3C] shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-medium text-[#191919]">
              {t.title}
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E5E2D9]">
          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="text-xs text-[#C15F3C] hover:underline cursor-pointer"
          >
            {t.customize}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="px-3 py-1.5 rounded-[6px] bg-[#F4F3EE] hover:bg-[#E5E2D9] text-[#6B665E] text-xs transition-colors cursor-pointer"
            >
              {t.rejectNonEssential}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-3 py-1.5 rounded-[6px] bg-[#C15F3C] hover:bg-[#A84F30] text-[#FAF9F5] text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
