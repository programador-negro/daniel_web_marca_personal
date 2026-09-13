import React, { useState } from 'react';
import { Cpu, Terminal, Database, Server, TerminalSquare, Boxes, Palette, Globe, Layers, Zap, GitBranch, Monitor, Code } from 'lucide-react';
import { skillsDataByLang, skillsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const SkillsSection: React.FC = () => {
  const { language, isSpanish } = useLanguage();
  const currentSkills = skillsDataByLang[language] || skillsData;

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = isSpanish
    ? [
        { id: 'all', label: 'Todos' },
        { id: 'Data & Cloud', label: 'Data & Cloud' },
        { id: 'Backend', label: 'Backend' },
        { id: 'Automation & DevOps', label: 'Automation & DevOps' },
        { id: 'Frontend', label: 'Frontend' },
      ]
    : [
        { id: 'all', label: 'All' },
        { id: 'Data & Cloud', label: 'Data & Cloud' },
        { id: 'Backend', label: 'Backend' },
        { id: 'Automation & DevOps', label: 'Automation & DevOps' },
        { id: 'Frontend', label: 'Frontend' },
      ];

  const filteredSkills = activeCategory === 'all'
    ? currentSkills
    : currentSkills.filter((skill) => skill.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#141414]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#141414]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#141414]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#141414]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#141414]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#141414]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#141414]" />;
      case 'TerminalSquare': return <TerminalSquare className="w-5 h-5 text-[#141414]" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-[#141414]" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-[#141414]" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-[#141414]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#141414]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#141414]" />;
      default: return <Cpu className="w-5 h-5 text-[#141414]" />;
    }
  };

  return (
    <section id="habilidades" className="py-20 sm:py-28 relative bg-[#F6F2EC] bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#141414]/15 text-[#141414] text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
            <span>TECH STACK & CORE ARSENAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#141414] tracking-[0.06em] uppercase font-sans">
            {isSpanish ? 'Habilidades & Tecnologías Clave' : 'Core Skills & Technologies'}
          </h2>
          <p className="text-xs sm:text-sm text-[#141414]/70 font-normal max-w-2xl mx-auto leading-relaxed">
            {isSpanish
              ? 'Dominio técnico consolidado en ingeniería de datos, arquitecturas en la nube, microservicios y scripting Linux para operaciones de alto volumen.'
              : 'Proven engineering mastery across cloud data architectures, high-throughput microservices, and Linux automation for mission-critical workflows.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#141414] text-[#F6F2EC] font-bold shadow-xs'
                      : 'bg-white text-[#141414]/70 border border-[#141414]/15 hover:bg-[#141414]/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={skill.name}
                className="p-6 rounded-2xl border border-[#141414]/12 bg-white transition-all duration-300 hover:border-[#141414]/35 shadow-xs group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl border border-[#141414]/15 bg-[#F6F2EC] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-all">
                      {getIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wide">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#141414]/50">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F6F2EC] text-[#141414] border border-[#141414]/15">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#F6F2EC] h-1.5 rounded-full overflow-hidden mb-3 border border-[#141414]/5">
                  <div
                    className="h-full rounded-full bg-[#141414] transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {skill.highlight && (
                  <p className="text-[11px] text-[#141414]/70 font-mono leading-relaxed mt-2 border-t border-[#141414]/8 pt-2 flex items-center gap-1.5">
                    <span className="text-[#141414] font-semibold uppercase tracking-wider">
                      {isSpanish ? 'Enfoque:' : 'Focus:'}
                    </span>
                    <span className="font-light truncate">{skill.highlight}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
