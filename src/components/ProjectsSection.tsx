import React, { useState, useEffect } from 'react';
import { FolderGit2, GitBranch, CheckCircle2, Loader2, Globe, ChevronDown, ChevronUp, ChevronsUpDown, Terminal, Database } from 'lucide-react';
import { projectsDataByLang, projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

interface ProjectIconProps {
  url?: string;
  category: string;
  title: string;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({ url, category, title }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const getFaviconUrl = (url?: string) => {
    if (!url) return null;
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(url);

  const getDefaultIcon = () => {
    switch (category) {
      case 'Full-Stack':
        return <Globe className="w-4 h-4 text-indigo-600" />;
      case 'Python & Backend':
        return <Terminal className="w-4 h-4 text-amber-600" />;
      case 'Automation & CLI':
        return <GitBranch className="w-4 h-4 text-rose-600" />;
      case 'Data & Analytics':
        return <Database className="w-4 h-4 text-emerald-600" />;
      default:
        return <FolderGit2 className="w-4 h-4 text-slate-500" />;
    }
  };

  const containerClasses = `mt-0.5 sm:mt-0 p-1.5 sm:p-2 rounded-xl border shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 overflow-hidden shadow-2xs ${
    category === 'Full-Stack' ? 'bg-indigo-50 border-indigo-100' :
    category === 'Python & Backend' ? 'bg-amber-50 border-amber-100' :
    category === 'Automation & CLI' ? 'bg-rose-50 border-rose-100' :
    category === 'Data & Analytics' ? 'bg-emerald-50 border-emerald-100' :
    'bg-slate-50 border-slate-200'
  }`;

  if (faviconUrl && !imgFailed) {
    return (
      <div className={containerClasses}>
        <img
          src={faviconUrl}
          alt={`${title} favicon`}
          className="w-4 h-4 object-contain"
          onError={() => setImgFailed(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {getDefaultIcon()}
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const staticProjects = projectsDataByLang[language] || projectsData;

  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects without requiring complex composite index
    const q = query(collection(db, 'projects'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: any[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.isVisible !== false) {
          projs.push({
            id: docSnap.id,
            title: data.title || '',
            description: data.description || '',
            tags: data.tags || [],
            category: 'Full-Stack', // Defaulting category for CMS projects
            githubUrl: data.link || '',
            imageUrl: data.imageUrl || '',
            isVisible: true
          });
        }
      });
      setDbProjects(projs);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, 'ProjectsSection:onSnapshot');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentProjects = [...dbProjects, ...staticProjects];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  
  // Track open dropdown project IDs (starts completely collapsed by default)
  const [openProjectIds, setOpenProjectIds] = useState<string[]>([]);

  const toggleProject = (id: string) => {
    setOpenProjectIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const toggleAllProjects = () => {
    const currentIds = filteredProjects.map((p, idx) => p.id || `proj-${idx}`);
    const allOpen = currentIds.every((id) => openProjectIds.includes(id));
    if (allOpen) {
      setOpenProjectIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setOpenProjectIds((prev) => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const categories = isSpanish
    ? [
        { id: 'all', label: 'Todos' },
        { id: 'Full-Stack', label: 'Full-Stack' },
        { id: 'Python & Backend', label: 'Python & Backend' },
        { id: 'Automation & CLI', label: 'Automation & CLI' },
        { id: 'Data & Analytics', label: 'Data & Analytics' },
      ]
    : [
        { id: 'all', label: 'All' },
        { id: 'Full-Stack', label: 'Full-Stack' },
        { id: 'Python & Backend', label: 'Python & Backend' },
        { id: 'Automation & CLI', label: 'Automation & CLI' },
        { id: 'Data & Analytics', label: 'Data & Analytics' },
      ];

  const filteredProjects = selectedCategory === 'all'
    ? currentProjects
    : currentProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-20 sm:py-28 bg-[#fbfbfb] bg-noise border-y border-slate-100 relative overflow-hidden">
      {/* Subtle Grain Mesh Identity Gradient for ambient light */}
      <div className="absolute inset-0 mesh-identity-glow opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
            <span>03 // TECHNICAL PORTFOLIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-[0.08em] uppercase">
            {isSpanish ? 'PROYECTOS DESTACADOS' : 'FEATURED PROJECTS'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            {isSpanish
              ? 'sistemas empresariales, arquitecturas backend, scripts de orquestación y soluciones de analítica de datos en producción.'
              : 'enterprise systems, backend architectures, orchestration scripts, and production data analytics solutions.'}
          </p>

          {/* Minimal Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'btn-ios-dark'
                    : 'btn-ios-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Expand/Collapse Toggle & Counter */}
        {filteredProjects.length > 0 && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-light">
                {isSpanish 
                  ? `${filteredProjects.length} PROYECTOS EN VISTA` 
                  : `${filteredProjects.length} PROJECTS DISPLAYED`}
              </span>
              {loading && <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />}
            </div>
            <button
              type="button"
              onClick={toggleAllProjects}
              className="btn-ios-secondary px-3.5 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {filteredProjects.map((p, idx) => p.id || `proj-${idx}`).every(id => openProjectIds.includes(id))
                  ? (isSpanish ? 'PLEGAR TODOS' : 'COLLAPSE ALL')
                  : (isSpanish ? 'DESPLEGAR TODOS' : 'EXPAND ALL')}
              </span>
            </button>
          </div>
        )}

        {/* Projects Dropdown Accordion Stack */}
        <div className="space-y-4">
            {filteredProjects.map((project, idx) => {
              const projectId = project.id || `proj-${idx}`;
              const isOpen = openProjectIds.includes(projectId);
              const url = project.liveUrl || project.githubUrl || '';
              const isGitHub = url.includes('github.com');

              return (
                <div
                  key={projectId}
                  className={`card-editorial overflow-hidden bg-white/95 backdrop-blur-md ${
                    isOpen ? 'border-slate-300 shadow-xs' : ''
                  }`}
                >
                  {/* Accordion Header Bar */}
                  <div className="w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                    onClick={() => toggleProject(projectId)}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                      {/* Project Icon with automatic image load error handling / default fallback */}
                      <ProjectIcon url={url} category={project.category} title={project.title} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold border ${
                            project.category === 'Full-Stack' ? 'bg-indigo-50/80 border-indigo-100 text-indigo-700' :
                            project.category === 'Python & Backend' ? 'bg-amber-50/80 border-amber-100 text-amber-800' :
                            project.category === 'Automation & CLI' ? 'bg-rose-50/80 border-rose-100 text-rose-700' :
                            project.category === 'Data & Analytics' ? 'bg-emerald-50/80 border-emerald-100 text-emerald-800' :
                            'bg-slate-50 border-slate-200 text-slate-600'
                          }`}>
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="text-[9px] font-mono tracking-widest uppercase text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full font-bold">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-[0.06em] uppercase">
                          {project.title}
                        </h3>
                        {!isOpen && (
                          <p className="text-xs text-slate-500 font-light truncate mt-0.5 max-w-xl">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quick Link & Chevron Toggle */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ios-secondary px-3 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase transition-colors inline-flex items-center gap-1.5"
                        >
                          {isGitHub ? (
                            <>
                              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                              <span className="hidden sm:inline">{isSpanish ? 'REPOS IT' : 'REPO'}</span>
                            </>
                          ) : (
                            <>
                              <Globe className="w-3.5 h-3.5 text-slate-400" />
                              <span className="hidden sm:inline">{isSpanish ? 'VISITAR' : 'LIVE'}</span>
                            </>
                          )}
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleProject(projectId)}
                        className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                        aria-label={isOpen ? 'Plegar detalles' : 'Desplegar detalles'}
                      >
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed pt-2">
                        {project.fullDescription || project.description}
                      </p>

                      {/* Project Image - if available */}
                      {project.imageUrl && (
                        <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Metric Banner */}
                      {project.metrics && (
                        <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{project.metrics}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div>
                        <p className="text-[10px] font-mono uppercase text-slate-400 font-medium tracking-[0.2em] mb-2">
                          {isSpanish ? 'TECNOLOGÍAS:' : 'STACK:'}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-medium ${
                                project.category === 'Full-Stack' ? 'bg-indigo-50/50 border-indigo-100/60 text-indigo-700/80' :
                                project.category === 'Python & Backend' ? 'bg-amber-50/50 border-amber-100/60 text-amber-800/80' :
                                project.category === 'Automation & CLI' ? 'bg-rose-50/50 border-rose-100/60 text-rose-700/80' :
                                project.category === 'Data & Analytics' ? 'bg-emerald-50/50 border-emerald-100/60 text-emerald-800/80' :
                                'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {activeModalProject.imageUrl && (
              <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-slate-100">
                <img src={activeModalProject.imageUrl} alt={activeModalProject.title} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {activeModalProject.fullDescription || activeModalProject.description}
            </p>

            {activeModalProject.metrics && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-emerald-800 font-semibold">
                    {isSpanish ? 'Impacto y Resultados' : 'Impact & Results'}
                  </p>
                  <p className="text-sm font-semibold text-emerald-950">{activeModalProject.metrics}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                {isSpanish ? 'Tecnologías y librerías integradas:' : 'Integrated technologies & libraries:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
              >
                {isSpanish ? 'Cerrar' : 'Close'}
              </button>
              {(activeModalProject.liveUrl || activeModalProject.githubUrl) && (() => {
                const url = activeModalProject.liveUrl || activeModalProject.githubUrl || '';
                const isGitHub = url.includes('github.com');
                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ios-dark px-5 py-2.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2"
                  >
                    {isGitHub ? (
                      <>
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>{isSpanish ? 'Ver Repositorio' : 'View Repository'}</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-3.5 h-3.5" />
                        <span>{isSpanish ? 'Visitar Plataforma' : 'Visit Platform'}</span>
                      </>
                    )}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
