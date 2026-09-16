import React from 'react';
import { ShieldCheck, GitBranch, Cpu, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  const guarantees = [
    {
      title: isSpanish ? 'Propiedad Total del Código' : 'Full Code Ownership',
      description: isSpanish 
        ? 'Todo el software, Dockerfiles y pipelines quedan en tu repositorio privado. Cero dependencias o vendor lock-in.'
        : 'All source code, Dockerfiles, and pipelines live in your private repos. Zero vendor lock-in or licensing traps.',
      icon: GitBranch,
      topBar: 'bg-[#C15F3C]',
      bgCard: 'bg-[#FFF9F5] hover:bg-[#FFF5ED]',
      borderCard: 'border-[#F2D7C6] hover:border-[#C15F3C]',
      iconBg: 'bg-[#C15F3C] text-white',
      accentColor: 'text-[#C15F3C]',
      badgeBg: 'bg-[#FCECE2] text-[#A64522] border-[#F2D7C6]',
      badgeText: isSpanish ? '100% Tuyo' : '100% Owned',
    },
    {
      title: isSpanish ? 'Entregas por Sprints Ágiles' : 'Agile Sprint Deliveries',
      description: isSpanish
        ? 'Hitos claros con demos funcionales semanales. Pagos contra entregables validados y sin sobrecostos sorpresa.'
        : 'Clear milestone scopes with functional weekly demos. Milestone-based payments with zero surprise fees.',
      icon: Clock,
      topBar: 'bg-[#2D6A4F]',
      bgCard: 'bg-[#F4FAF6] hover:bg-[#ECF6F0]',
      borderCard: 'border-[#C8E4D3] hover:border-[#2D6A4F]',
      iconBg: 'bg-[#2D6A4F] text-white',
      accentColor: 'text-[#2D6A4F]',
      badgeBg: 'bg-[#E3F4EA] text-[#1E523A] border-[#C8E4D3]',
      badgeText: isSpanish ? 'Semanales' : 'Weekly Sprints',
    },
    {
      title: isSpanish ? 'Ingeniería Probada en Escala' : 'Battle-Tested at Scale',
      description: isSpanish
        ? 'Diseño arquitecturas preparadas para alta concurrencia, con tests automatizados y monitoreo proactivo.'
        : 'Architectures engineered for high throughput, backed by automated unit tests and telemetry monitoring.',
      icon: Cpu,
      topBar: 'bg-[#2B5B84]',
      bgCard: 'bg-[#F3F8FC] hover:bg-[#EAF2F9]',
      borderCard: 'border-[#C4DCF0] hover:border-[#2B5B84]',
      iconBg: 'bg-[#2B5B84] text-white',
      accentColor: 'text-[#2B5B84]',
      badgeBg: 'bg-[#E1EFF9] text-[#1D4A71] border-[#C4DCF0]',
      badgeText: isSpanish ? 'Alta Demanda' : 'High Scale',
    },
    {
      title: isSpanish ? 'Garantía Post-Lanzamiento' : 'Post-Launch SLA Guarantee',
      description: isSpanish
        ? 'Acompañamiento y resolución inmediata de incidencias tras la puesta en producción sin costo adicional.'
        : 'Dedicated post-deployment warranty and immediate incident response for smooth operational adoption.',
      icon: ShieldCheck,
      topBar: 'bg-[#6F4E7C]',
      bgCard: 'bg-[#F9F4FB] hover:bg-[#F3EBF7]',
      borderCard: 'border-[#E2CEEC] hover:border-[#6F4E7C]',
      iconBg: 'bg-[#6F4E7C] text-white',
      accentColor: 'text-[#6F4E7C]',
      badgeBg: 'bg-[#EFE3F7] text-[#533461] border-[#E2CEEC]',
      badgeText: isSpanish ? 'SLA Incluido' : 'SLA Included',
    },
  ];

  return (
    <section id="sobre-mi" className="py-14 sm:py-18 bg-[#FAF9F5] border-b border-[#E5E2D9] relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#191919] tracking-tight">
            {isSpanish ? 'Garantías y Estándares de Entrega' : 'Guarantees & Delivery Standards'}
          </h2>
          <p className="text-sm sm:text-base text-[#4A4742] font-normal leading-relaxed max-w-lg mx-auto">
            {isSpanish
              ? 'Colaboración directa como ingeniero senior para entregar soluciones técnicas robustas, transparentes y listas para operar.'
              : 'Direct senior engineering collaboration delivering resilient, transparent, and production-ready systems.'}
          </p>
        </div>

        {/* 4 Guarantees Grid with Rich Thematic Color Palettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-[8px] ${item.bgCard} border ${item.borderCard} p-6 sm:p-7 space-y-4 transition-all duration-200 shadow-sm hover:shadow-md`}
              >
                {/* Top Subtle Colorful Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${item.topBar}`} />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[6px] ${item.iconBg} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[4px] border ${item.badgeBg}`}>
                      {item.badgeText}
                    </span>
                  </div>
                  <span className={`font-serif italic text-base font-medium ${item.accentColor}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#191919] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed mt-1.5 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career & CV Banner (Clean bridge to /experiencia) */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-[8px] bg-[#F4F3EE] border border-[#E5E2D9] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono tracking-wider text-[#C15F3C] uppercase font-semibold">
              {isSpanish ? 'Historial Corporativo & CV' : 'Corporate Track Record & CV'}
            </span>
            <h4 className="font-serif text-lg font-normal text-[#191919]">
              {isSpanish ? '¿Deseas conocer mi trayectoria profesional en detalle?' : 'Looking to review my full enterprise career background?'}
            </h4>
            <p className="text-xs text-[#6B665E] max-w-xl">
              {isSpanish
                ? 'Consulta mi experiencia previa en multinacionales de tecnología y aviación (Amadeus, Globant, Datanomik).'
                : 'Explore my past enterprise experience across travel tech and data multinationals (Amadeus, Globant, Datanomik).'}
            </p>
          </div>

          <Link
            to="/experiencia"
            className="btn-claude-secondary shrink-0 shadow-2xs hover:border-[#C15F3C]"
          >
            <span>{isSpanish ? 'Ver Experiencia & CV' : 'View Full Experience'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
