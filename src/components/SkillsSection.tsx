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
        { id: 'Backend', label: 'Backend' },
        { id: 'Data & Cloud', label: 'Data & Cloud' },
        { id: 'Automation & DevOps', label: 'Automation & DevOps' },
        { id: 'Frontend', label: 'Frontend' },
      ]
    : [
        { id: 'all', label: 'All' },
        { id: 'Backend', label: 'Backend' },
        { id: 'Data & Cloud', label: 'Data & Cloud' },
        { id: 'Automation & DevOps', label: 'Automation & DevOps' },
        { id: 'Frontend', label: 'Frontend' },
      ];

  const filteredSkills = activeCategory === 'all'
    ? currentSkills
    : currentSkills.filter((skill) => skill.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Server': return <Server className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Code': return <Code className="w-5 h-5 text-sky-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'TerminalSquare': return <TerminalSquare className="w-5 h-5 text-cyan-300" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-rose-400" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-indigo-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-cyan-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-teal-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="habilidades" className="py-20 relative bg-transparent border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-700" />
            <span>{isSpanish ? 'Stack Tecnológico' : 'Tech Stack'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSpanish ? 'Habilidades & Tecnologías Clave' : 'Core Skills & Technologies'}
          </h2>
          <p className="mt-3 text-base text-slate-500">
            {isSpanish
              ? 'Dominio técnico consolidado en ingeniería de software, arquitecturas cloud, bases de datos masivas y scripting Linux.'
              : 'Proven engineering mastery across software architecture, cloud platforms, massive databases, and Linux automation.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-600 hover:shadow-md transition-all shadow-xs group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-transparent border border-slate-200 group-hover:border-cyan-200 transition-colors">
                    {getIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 mb-3">
                <div
                  className="bg-cyan-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {skill.highlight && (
                <p className="text-xs text-slate-500 font-mono">
                  <span className="text-slate-500 font-medium">
                    {isSpanish ? 'Enfoque: ' : 'Focus: '}
                  </span>
                  {skill.highlight}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
