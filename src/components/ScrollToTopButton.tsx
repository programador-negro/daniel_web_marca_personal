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
      className="fixed bottom-5 left-5 z-40 p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-slate-400 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/60 shadow-md hover:shadow-cyan-950/40 backdrop-blur-sm opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};

export default ScrollToTopButton;
