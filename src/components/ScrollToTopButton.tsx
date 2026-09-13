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
      className="fixed bottom-5 left-5 z-40 p-2.5 rounded-[6px] bg-[#FAF9F5] text-[#191919] hover:bg-[#F4F3EE] border border-[#E5E2D9] shadow-xs transition-all duration-200 group cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 text-[#191919] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};

export default ScrollToTopButton;
