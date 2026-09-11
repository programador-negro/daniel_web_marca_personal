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

  const getCategoryColors = (category: string) => {
    switch (category) {
      case 'Backend':
        return {
          bg: 'bg-white hover:bg-slate-50/10 border-slate-200/80 hover:border-indigo-300',
          badge: 'text-indigo-800 bg-indigo-50 border-indigo-100/60',
          bar: 'bg-indigo-500',
          iconBg: 'bg-indigo-50/50 border-indigo-100/60 group-hover:bg-indigo-50 group-hover:border-indigo-200',
          iconColor: 'text-indigo-600',
          accentText: 'group-hover:text-indigo-700',
        };
      case 'Data & Cloud':
        return {
          bg: 'bg-white hover:bg-slate-50/10 border-slate-200/80 hover:border-emerald-300',
          badge: 'text-emerald-800 bg-emerald-50 border-emerald-100/60',
          bar: 'bg-emerald-500',
          iconBg: 'bg-emerald-50/50 border-emerald-100/60 group-hover:bg-emerald-50 group-hover:border-emerald-200',
          iconColor: 'text-emerald-600',
          accentText: 'group-hover:text-emerald-700',
        };
      case 'Automation & DevOps':
        return {
          bg: 'bg-white hover:bg-slate-50/10 border-slate-200/80 hover:border-amber-300',
          badge: 'text-amber-800 bg-amber-50 border-amber-100/60',
          bar: 'bg-amber-500',
          iconBg: 'bg-amber-50/50 border-amber-100/60 group-hover:bg-amber-50 group-hover:border-amber-200',
          iconColor: 'text-amber-600',
          accentText: 'group-hover:text-amber-700',
        };
      case 'Frontend':
        return {
          bg: 'bg-white hover:bg-slate-50/10 border-slate-200/80 hover:border-rose-300',
          badge: 'text-rose-800 bg-rose-50 border-rose-100/60',
          bar: 'bg-rose-500',
          iconBg: 'bg-rose-50/50 border-rose-100/60 group-hover:bg-rose-50 group-hover:border-rose-200',
          iconColor: 'text-rose-600',
          accentText: 'group-hover:text-rose-700',
        };
      default:
        return {
          bg: 'bg-white hover:bg-slate-50/10 border-slate-200/80 hover:border-slate-300',
          badge: 'text-slate-800 bg-slate-50 border-slate-100/60',
          bar: 'bg-slate-500',
          iconBg: 'bg-slate-50 border-slate-100 group-hover:bg-slate-50 group-hover:border-slate-200',
          iconColor: 'text-slate-600',
          accentText: 'group-hover:text-slate-700',
        };
    }
  };

  const getIcon = (iconName: string, category: string) => {
    const iconColorClass = getCategoryColors(category).iconColor;
    switch (iconName) {
      case 'Terminal': return <Terminal className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Server': return <Server className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Cpu': return <Cpu className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Code': return <Code className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Database': return <Database className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Layers': return <Layers className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Zap': return <Zap className={`w-5 h-5 ${iconColorClass}`} />;
      case 'TerminalSquare': return <TerminalSquare className={`w-5 h-5 ${iconColorClass}`} />;
      case 'GitBranch': return <GitBranch className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Monitor': return <Monitor className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Boxes': return <Boxes className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Palette': return <Palette className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Globe': return <Globe className={`w-5 h-5 ${iconColorClass}`} />;
      default: return <Cpu className={`w-5 h-5 ${iconColorClass}`} />;
    }
  };

  return (
    <section id="habilidades" className="py-20 sm:py-28 relative bg-[#fbfbfb] bg-noise border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isSpanish ? 'STACK TECNOLÓGICO' : 'TECH STACK'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-[0.08em] uppercase">
            {isSpanish ? 'Habilidades & Tecnologías Clave' : 'Core Skills & Technologies'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            {isSpanish
              ? 'Dominio técnico consolidado en ingeniería de software, arquitecturas cloud, bases de datos masivas y scripting Linux.'
              : 'Proven engineering mastery across software architecture, cloud platforms, massive databases, and Linux automation.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              let activeStyle = '';
              if (isActive) {
                switch (cat.id) {
                  case 'all': activeStyle = 'bg-slate-950 text-white shadow-md font-bold'; break;
                  case 'Backend': activeStyle = 'bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold'; break;
                  case 'Data & Cloud': activeStyle = 'bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold'; break;
                  case 'Automation & DevOps': activeStyle = 'bg-amber-50 border border-amber-200 text-amber-800 font-bold'; break;
                  case 'Frontend': activeStyle = 'bg-rose-50 border border-rose-200 text-rose-800 font-bold'; break;
                  default: activeStyle = 'bg-slate-950 text-white shadow-md font-bold'; break;
                }
              } else {
                activeStyle = 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-950';
              }
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${activeStyle}`}
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
            const colors = getCategoryColors(skill.category);
            return (
              <div
                key={skill.name}
                className={`p-6 rounded-2xl border bg-white transition-all duration-300 hover:shadow-xs group ${colors.bg}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-all duration-300 ${colors.iconBg}`}>
                      {getIcon(skill.iconName, skill.category)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold text-slate-950 transition-colors ${colors.accentText}`}>
                        {skill.name}
                      </h3>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${colors.badge}`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {skill.highlight && (
                  <p className="text-[10px] text-slate-500 font-mono leading-relaxed mt-2 border-t border-slate-50 pt-2 flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider">
                      {isSpanish ? 'Enfoque:' : 'Focus:'}
                    </span>
                    <span className="text-slate-600 font-light truncate">{skill.highlight}</span>
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
