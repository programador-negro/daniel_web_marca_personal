import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { analyticsService } from '../services/analyticsService';

export const ScrollToTopButton: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section height is usually ~400-500px, so 380px is past hero section
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    analyticsService.trackEvent('scroll_to_top_clicked', {});
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      id="scroll-to-top-btn"
      type="button"
      onClick={scrollToTop}
      aria-label={isSpanish ? 'Volver al inicio de la página' : 'Scroll back to top of page'}
      title={isSpanish ? 'Volver arriba' : 'Scroll to top'}
      className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full bg-white/95 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200/80 shadow-xs hover:shadow-[0_4px_15px_rgba(99,102,241,0.1)] backdrop-blur-md opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};

export default ScrollToTopButton;
