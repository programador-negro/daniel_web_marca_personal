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
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-3 shadow-xs'
            : 'bg-white/70 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Role in Editorial Uppercase Typography */}
          <Link
            to="/"
            id="nav-brand-link"
            onClick={() => handleLinkClick('inicio')}
            className="group flex items-center focus:outline-none shrink-0"
            title="Software Engineer"
          >
            <span className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-[0.2em] transition-colors group-hover:text-slate-600">
              SOFTWARE ENGINEER
            </span>
          </Link>

          {/* Center: Desktop Section Quick Navigator with Live Active Tracking */}
          {!isSubPage && (
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-md shadow-2xs">
              <a
                href="#inicio"
                onClick={() => handleLinkClick('inicio')}
                className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeSection === 'inicio'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {isSpanish ? 'Inicio' : 'Home'}
              </a>
              {(!sections || sections.servicios) && (
                <a
                  href="#servicios"
                  onClick={() => handleLinkClick('servicios')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === 'servicios'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.services}
                </a>
              )}
              {(!sections || sections.proyectos) && (
                <a
                  href="#proyectos"
                  onClick={() => handleLinkClick('proyectos')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === 'proyectos'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.projects}
                </a>
              )}
              {(!sections || sections.sobreMi) && (
                <a
                  href="#sobre-mi"
                  onClick={() => handleLinkClick('sobre-mi')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === 'sobre-mi'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.about}
                </a>
              )}
              {(!sections || sections.faqs) && (
                <a
                  href="#faqs"
                  onClick={() => handleLinkClick('faqs')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === 'faqs'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.faqs}
                </a>
              )}
              {(!sections || sections.contacto) && (
                <a
                  href="#contacto"
                  onClick={() => handleLinkClick('contacto')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeSection === 'contacto'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.contact}
                </a>
              )}
            </nav>
          )}

          {/* Right: Cotizador CTA, Language toggle & Menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Direct Cotizador Button */}
            <Link
              to="/cotizador"
              id="nav-cotizador-desktop-btn"
              onClick={() => handleLinkClick('cotizador')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider font-medium transition-all ${
                isCotizadorPage
                  ? 'btn-ios-dark'
                  : 'btn-ios-secondary'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-slate-600" />
              <span>{isSpanish ? 'COTIZADOR' : 'ESTIMATOR'}</span>
            </Link>

            {/* Language Toggle */}
            <button
              type="button"
              id="nav-lang-toggle"
              onClick={toggleLanguage}
              className="btn-ios-secondary px-3 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              aria-label="Cambiar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Sidebar Toggle */}
            <button
              type="button"
              id="nav-sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className="btn-ios-dark px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2"
              aria-label={isSpanish ? 'Menú' : 'Menu'}
            >
              <Menu className="w-3.5 h-3.5 text-slate-300" />
              <span>{isSpanish ? 'MENÚ' : 'MENU'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside
            id="nav-lateral-drawer"
            className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between p-6 sm:p-8 z-10 overflow-y-auto"
            aria-label="Menú lateral de navegación"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                    Daniel Ibarra
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Software Engineer • Python & BigQuery
                  </p>
                </div>

                <button
                  type="button"
                  id="nav-close-sidebar-btn"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title={isSpanish ? 'Cerrar' : 'Close'}
                  aria-label={isSpanish ? 'Cerrar' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5" aria-label="Secciones del sitio">
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
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                          isActive
                            ? 'bg-slate-950 text-white font-semibold shadow-xs'
                            : link.highlight
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                          {link.highlight && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold border border-slate-200">
                              /cotizador
                            </span>
                          )}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/60' : 'text-slate-400'}`} />
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={link.id}
                      id={`sidebar-link-${link.id}`}
                      href={link.href}
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-slate-950 text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/60' : 'text-slate-400'}`} />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <Link
                to="/cotizador"
                onClick={() => handleLinkClick('cotizador')}
                className="w-full btn-ios-dark flex items-center justify-center gap-2 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-white transition-all shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-300" />
                <span>{isSpanish ? 'ABRIR COTIZADOR' : 'OPEN ESTIMATOR'}</span>
              </Link>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-slate-950 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
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

