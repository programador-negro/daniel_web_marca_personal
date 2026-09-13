import React, { useState, useEffect } from 'react';
import { GitBranch, CheckCircle2, Globe, ChevronDown, ChevronUp, ChevronsUpDown, Terminal, Database, ArrowRight, ExternalLink } from 'lucide-react';
import { projectsDataByLang, projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export const ProjectsSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const staticProjects = projectsDataByLang[language] || projectsData;

  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projs: any[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isVisible !== false) {
            projs.push({
              id: docSnap.id,
              title: data.title || '',
              description: data.description || '',
              tags: data.tags || [],
              category: 'Full-Stack',
              githubUrl: data.link || '',
              imageUrl: data.imageUrl || '',
              isVisible: true,
            });
          }
        });
        setDbProjects(projs);
      },
      () => {}
    );

    return () => unsubscribe();
  }, []);

  const currentProjects: Project[] = dbProjects.length > 0 ? [...dbProjects, ...staticProjects] : staticProjects;

  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        { id: 'Data & Analytics', label: 'Data & Cloud' },
        { id: 'Python & Backend', label: 'Python & Backend' },
        { id: 'Automation & CLI', label: 'Automatización' },
        { id: 'Full-Stack', label: 'Web & Apps' },
      ]
    : [
        { id: 'all', label: 'All' },
        { id: 'Data & Analytics', label: 'Data & Cloud' },
        { id: 'Python & Backend', label: 'Python & Backend' },
        { id: 'Automation & CLI', label: 'Automation' },
        { id: 'Full-Stack', label: 'Web & Apps' },
      ];

  const filteredProjects = selectedCategory === 'all'
    ? currentProjects
    : currentProjects.filter((p) => p.category === selectedCategory);

  // Top 3 featured spotlight items matching the reference image layout
  const topFeatured = [
    {
      num: '01',
      title: 'BIGQUERY DATA PLATFORM',
      subtitle: isSpanish ? 'Google Cloud // Apache Airflow // ETL' : 'Google Cloud // Apache Airflow // ETL',
      desc: isSpanish
        ? 'Arquitectura de 219 pipelines con ingestión masiva de 20M+ registros diarios, reduciendo tiempos de consulta en 60%.'
        : 'Enterprise architecture with 219 pipelines ingesting 20M+ rows daily into BigQuery, reducing query latency by 60%.',
      tags: ['BigQuery', 'Apache Airflow', 'GCP', 'Python', 'SQL'],
      url: 'https://github.com/programador-negro/Google-Big-Query',
      type: 'Data & Cloud',
    },
    {
      num: '02',
      title: 'DISTRIBUTED BACKEND API',
      subtitle: isSpanish ? 'Python // FastAPI // Microservicios' : 'Python // FastAPI // Microservices',
      desc: isSpanish
        ? 'Microservicios de alto rendimiento y arquitectura limpia con Docker, PostgreSQL y tests de integración automatizados.'
        : 'High-throughput microservices applying clean architecture, Docker containerization, and resilient PostgreSQL tuning.',
      tags: ['FastAPI', 'Python', 'Docker', 'PostgreSQL', 'CI/CD'],
      url: 'https://github.com/programador-negro',
      type: 'Backend',
    },
    {
      num: '03',
      title: 'HOTEL SAMAY & SUMA WASI',
      subtitle: isSpanish ? 'Web Platform // E-Commerce & Reservas' : 'Web Platform // E-Commerce & Booking',
      desc: isSpanish
        ? 'Plataformas web con reservas directas sin comisiones, diseño mobile-first y optimización para Core Web Vitals.'
        : 'Direct hospitality booking platforms without third-party fees, mobile-first responsive UX, and Core Web Vitals optimization.',
      tags: ['React', 'TypeScript', 'Tailwind', 'SEO', 'UX/UI'],
      url: 'https://hotelmocoasamay.com/',
      type: 'Web Platform',
    },
  ];

  return (
    <section id="proyectos" className="py-14 sm:py-18 bg-[#111111] text-[#F6F2EC] relative overflow-hidden scroll-mt-20 border-b border-[#F6F2EC]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header: SELECTED WORK ──────── VIEW ALL PROJECTS → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#F6F2EC]/15">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-sans font-extrabold text-sm sm:text-base tracking-[0.22em] uppercase text-[#F6F2EC] shrink-0">
              {isSpanish ? 'PROYECTOS SELECCIONADOS' : 'SELECTED WORK'}
            </h2>
            <div className="hidden sm:block h-[1px] flex-1 bg-[#F6F2EC]/20 mr-4" />
          </div>

          <a
            href="https://github.com/programador-negro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F6F2EC]/80 hover:text-white flex items-center gap-2 group shrink-0"
          >
            <span>{isSpanish ? 'VER TODOS EN GITHUB' : 'VIEW ALL ON GITHUB'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Columns Showcase (Matching Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {topFeatured.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl bg-[#181818] border border-[#F6F2EC]/10 p-6 flex flex-col justify-between space-y-6 hover:border-[#F6F2EC]/30 transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-4">
                {/* Number & Type */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-xl font-mono font-extrabold text-[#F6F2EC]/40 group-hover:text-[#F6F2EC] transition-colors">
                    {item.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#222222] text-[#F6F2EC]/70 border border-white/5">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-[#F6F2EC] tracking-[0.06em] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#F6F2EC]/60 uppercase tracking-wider mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Device / Terminal Mockup Frame */}
                <div className="rounded-xl overflow-hidden border border-[#F6F2EC]/10 bg-[#0C0C0C] p-4 space-y-2.5">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <span className="ml-auto text-[9px] font-mono text-[#F6F2EC]/40 uppercase tracking-wider">prod-v2</span>
                  </div>
                  <p className="text-xs text-[#F6F2EC]/80 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#222222] text-[#F6F2EC]/80 border border-white/5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono font-semibold uppercase tracking-wider text-[#F6F2EC] flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <span>{isSpanish ? 'Explorar Código / Caso' : 'Explore Case Study'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F6F2EC]/70" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar for Additional Repository Showcase */}
        <div className="pt-8 border-t border-[#F6F2EC]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-sans font-bold text-sm tracking-[0.14em] uppercase text-[#F6F2EC]">
                {isSpanish ? 'EXPLORADOR DE SISTEMAS & PIPELINES' : 'SYSTEMS & PIPELINE REPOSITORY'}
              </h3>
              <p className="text-xs text-[#F6F2EC]/60 font-light mt-0.5">
                {isSpanish ? 'Catálogo de scripts, microservicios y despliegues en producción.' : 'Catalog of scripts, microservices, and live deployments.'}
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-[#111111] font-bold shadow-xs'
                      : 'bg-[#1D1D1D] text-[#F6F2EC]/70 hover:bg-[#282828] border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Toggle Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EC]/60 pb-2">
            <span>
              {isSpanish ? `${filteredProjects.length} REGISTROS DISPONIBLES` : `${filteredProjects.length} RECORDS AVAILABLE`}
            </span>
            <button
              type="button"
              onClick={toggleAllProjects}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 uppercase"
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span>
                {filteredProjects.map((p, idx) => p.id || `proj-${idx}`).every((id) => openProjectIds.includes(id))
                  ? (isSpanish ? 'Plegar todos' : 'Collapse all')
                  : (isSpanish ? 'Desplegar todos' : 'Expand all')}
              </span>
            </button>
          </div>

          {/* Projects Stack */}
          <div className="space-y-3">
            {filteredProjects.map((project, idx) => {
              const projectId = project.id || `proj-${idx}`;
              const isOpen = openProjectIds.includes(projectId);
              const url = project.liveUrl || project.githubUrl || '';
              const isGitHub = url.includes('github.com');

              return (
                <div
                  key={projectId}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#181818] border-white/30 shadow-lg'
                      : 'bg-[#151515] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                    onClick={() => toggleProject(projectId)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#222222] border border-white/10 flex items-center justify-center shrink-0">
                        {project.category.includes('Data') ? (
                          <Database className="w-4 h-4 text-emerald-400" />
                        ) : project.category.includes('Python') ? (
                          <Terminal className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Globe className="w-4 h-4 text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                            {project.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-[#F6F2EC] mt-0.5">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                        >
                          {isGitHub ? <GitBranch className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                          <span>{isGitHub ? 'REPO' : 'LIVE'}</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleProject(projectId)}
                        className="p-1 rounded-full text-[#F6F2EC]/60 hover:text-white"
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-white/5 text-xs text-[#F6F2EC]/70 space-y-3">
                      <p className="font-light leading-relaxed pt-3">
                        {project.fullDescription || project.description}
                      </p>
                      {project.metrics && (
                        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 font-mono text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{project.metrics}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
