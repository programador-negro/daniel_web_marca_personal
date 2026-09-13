import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Calculator, ChevronRight, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections?: {
    servicios: boolean;
    leadMagnet: boolean;
    proyectos: boolean;
    sobreMi: boolean;
    experiencia: boolean;
    faqs: boolean;
    contacto: boolean;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, sections }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, toggleLanguage, isSpanish } = useLanguage();
  const location = useLocation();
  const isCotizadorPage = location.pathname === '/cotizador';
  const isHabilidadesPage = location.pathname === '/habilidades';
  const isSubPage = location.pathname !== '/';
  const t = translations[language].nav;

  // Track scroll position for subtle navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const navLinks = [
    ...(!sections || sections.servicios ? [{ label: t.services, href: isSubPage ? '/#servicios' : '#servicios', id: 'servicios', isRoute: isSubPage }] : []),
    { label: t.estimator, href: '/cotizador', id: 'cotizador', highlight: true, isRoute: true },
    ...(!sections || sections.proyectos ? [{ label: t.projects, href: isSubPage ? '/#proyectos' : '#proyectos', id: 'proyectos', isRoute: isSubPage }] : []),
    { label: t.skills, href: '/habilidades', id: 'habilidades', highlight: false, isRoute: true },
    ...(!sections || sections.sobreMi ? [{ label: t.about, href: isSubPage ? '/#sobre-mi' : '#sobre-mi', id: 'sobre-mi', isRoute: isSubPage }] : []),
    ...(!sections || sections.experiencia ? [{ label: t.experience, href: '/experiencia', id: 'experiencia', isRoute: true }] : []),
    ...(!sections || sections.faqs ? [{ label: t.faqs, href: isSubPage ? '/#faqs' : '#faqs', id: 'faqs', isRoute: isSubPage }] : []),
    ...(!sections || sections.contacto ? [{ label: t.contact, href: isSubPage ? '/#contacto' : '#contacto', id: 'contacto', isRoute: isSubPage }] : []),
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E5E2D9] py-3 shadow-xs'
            : 'bg-[#FAF9F5]/85 backdrop-blur-sm border-b border-[#E5E2D9]/70 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Monogram & Brand Title */}
          <Link
            to="/"
            id="nav-brand-link"
            onClick={() => handleLinkClick('inicio')}
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
            title="Software & Data Engineering"
          >
            <div className="w-7 h-7 rounded-[4px] border border-[#191919]/60 flex items-center justify-center font-serif text-xs font-medium text-[#191919] group-hover:border-[#C15F3C] group-hover:text-[#C15F3C] transition-colors">
              SE
            </div>
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#191919] tracking-tight transition-colors group-hover:text-[#C15F3C]">
              Software & Data Engineering
            </span>
          </Link>

          {/* Center Links (Desktop Editorial Navigation) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-sans text-[#6B665E]">
            <a
              href="#servicios"
              className="hover:text-[#191919] transition-colors"
            >
              {isSpanish ? 'Soluciones' : 'Solutions'}
            </a>
            <a
              href="#sobre-mi"
              className="hover:text-[#191919] transition-colors"
            >
              {isSpanish ? 'Garantías' : 'Guarantees'}
            </a>
            <a
              href="#faqs"
              className="hover:text-[#191919] transition-colors"
            >
              {isSpanish ? 'Preguntas' : 'FAQs'}
            </a>
            <a
              href="#contacto"
              className="hover:text-[#191919] transition-colors"
            >
              {isSpanish ? 'Contacto' : 'Contact'}
            </a>
          </nav>

          {/* Right: Cotizador CTA, Language toggle & Menu button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Direct Cotizador Button: Terracotta accent */}
            <Link
              to="/cotizador"
              id="nav-cotizador-desktop-btn"
              onClick={() => handleLinkClick('cotizador')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#C15F3C] hover:bg-[#A84F30] text-[#FAF9F5] font-sans text-xs font-medium transition-all shadow-xs"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FAF9F5]/90" />
              <span>{isSpanish ? 'Cotizador' : 'Estimator'}</span>
            </Link>

            {/* Language Toggle */}
            <button
              type="button"
              id="nav-lang-toggle"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-[6px] text-[11px] font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 bg-[#FAF9F5] border border-[#E5E2D9] text-[#191919] hover:bg-[#F4F3EE] hover:border-[#B1ADA1]"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              aria-label="Cambiar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-[#6B665E]" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Sidebar Toggle */}
            <button
              type="button"
              id="nav-sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className="px-3 py-1.5 rounded-[6px] text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 bg-[#FAF9F5] text-[#191919] border border-[#E5E2D9] hover:bg-[#F4F3EE]"
              aria-label={isSpanish ? 'Menú' : 'Menu'}
            >
              <Menu className="w-3.5 h-3.5 text-[#191919]" />
              <span>{isSpanish ? 'Menú' : 'Menu'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div
            className="fixed inset-0 bg-[#191919]/35 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside
            id="nav-lateral-drawer"
            className="relative w-full max-w-sm bg-[#FAF9F5] h-full shadow-xl border-l border-[#E5E2D9] flex flex-col justify-between p-6 z-10 overflow-y-auto"
            aria-label="Menú lateral de navegación"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E2D9] mb-6">
                <div>
                  <h3 className="font-serif text-base font-medium text-[#191919]">
                    Software & Data Engineering
                  </h3>
                  <p className="font-serif italic text-xs text-[#6B665E]">
                    {isSpanish ? 'Soluciones & Automatización' : 'Solutions & Automation'}
                  </p>
                </div>

                <button
                  type="button"
                  id="nav-close-sidebar-btn"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-[6px] bg-[#F4F3EE] hover:bg-[#E5E2D9] text-[#191919] transition-colors cursor-pointer border border-[#E5E2D9]"
                  title={isSpanish ? 'Cerrar' : 'Close'}
                  aria-label={isSpanish ? 'Cerrar' : 'Close'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1" aria-label="Secciones del sitio">
                {navLinks.map((link) => {
                  const isActive =
                    isCotizadorPage ? link.id === 'cotizador' :
                    isHabilidadesPage ? link.id === 'habilidades' :
                    activeSection === link.id;
                  
                  if (link.isRoute) {
                    return (
                      <Link
                        key={link.id}
                        id={`sidebar-link-${link.id}`}
                        to={link.href}
                        onClick={() => handleLinkClick(link.id)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-[6px] text-xs font-sans transition-all ${
                          isActive
                            ? 'bg-[#F4F3EE] text-[#C15F3C] font-semibold border border-[#E5E2D9]'
                            : link.highlight
                            ? 'bg-[#C15F3C]/10 text-[#C15F3C] font-medium border border-[#C15F3C]/20'
                            : 'text-[#6B665E] hover:text-[#191919] hover:bg-[#F4F3EE]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#C15F3C]' : 'text-[#B1ADA1]'}`} />
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={link.id}
                      id={`sidebar-link-${link.id}`}
                      href={link.href}
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-[6px] text-xs font-sans transition-all ${
                        isActive
                          ? 'bg-[#F4F3EE] text-[#C15F3C] font-semibold border border-[#E5E2D9]'
                          : 'text-[#6B665E] hover:text-[#191919] hover:bg-[#F4F3EE]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#C15F3C]' : 'text-[#B1ADA1]'}`} />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 mt-6 border-t border-[#E5E2D9] space-y-3">
              <Link
                to="/cotizador"
                onClick={() => handleLinkClick('cotizador')}
                className="w-full btn-claude-primary py-2.5 rounded-[6px] text-xs font-sans font-medium"
              >
                <Calculator className="w-4 h-4" />
                <span>{isSpanish ? 'Calcular Cotización Online' : 'Estimate Project Online'}</span>
              </Link>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#6B665E] font-mono">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-[#191919] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#6B665E]" />
                  <span>{personalInfo.email}</span>
                </a>
                <span>danielib.com</span>
              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
};

