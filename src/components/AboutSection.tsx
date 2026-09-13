import React from 'react';
import { ShieldCheck, GitBranch, Cpu, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  const guarantees = isSpanish
    ? [
        {
          title: 'Propiedad Total del Código',
          description: 'Todo el software, Dockerfiles y pipelines quedan en tu repositorio privado. Cero dependencias o vendor lock-in.',
          icon: GitBranch,
        },
        {
          title: 'Entregas por Sprints Ágiles',
          description: 'Hitos claros con demos funcionales semanales. Pagos contra entregables validados y sin sobrecostos sorpresa.',
          icon: Clock,
        },
        {
          title: 'Ingeniería Probada en Escala',
          description: 'Diseño arquitecturas preparadas para alta concurrencia, con tests automatizados y monitoreo proactivo.',
          icon: Cpu,
        },
        {
          title: 'Garantía Post-Lanzamiento',
          description: 'Acompañamiento y resolución inmediata de incidencias tras la puesta en producción.',
          icon: ShieldCheck,
        },
      ]
    : [
        {
          title: 'Full Code Ownership',
          description: 'All source code, Dockerfiles, and pipelines live in your private repos. Zero vendor lock-in or licensing traps.',
          icon: GitBranch,
        },
        {
          title: 'Agile Sprint Deliveries',
          description: 'Clear milestone scopes with functional weekly demos. Milestone-based payments with zero surprise fees.',
          icon: Clock,
        },
        {
          title: 'Battle-Tested at Scale',
          description: 'Architectures engineered for high throughput, backed by automated unit tests and telemetry monitoring.',
          icon: Cpu,
        },
        {
          title: 'Post-Launch SLA Guarantee',
          description: 'Dedicated post-deployment warranty and immediate incident response for smooth operational adoption.',
          icon: ShieldCheck,
        },
      ];

  return (
    <section id="sobre-mi" className="py-14 sm:py-18 bg-[#FAF9F5] border-b border-[#E5E2D9] relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#6B665E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C]" />
            <span className="uppercase tracking-wider">
              {isSpanish ? 'Modelo de Trabajo & Garantías' : 'Working Model & Guarantees'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#191919] tracking-tight">
            {isSpanish ? 'Garantías y Estándares de Entrega' : 'Guarantees & Delivery Standards'}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-normal leading-relaxed max-w-lg mx-auto">
            {isSpanish
              ? 'Colaboración directa como ingeniero senior para entregar soluciones técnicas robustas, transparentes y listas para operar.'
              : 'Direct senior engineering collaboration delivering resilient, transparent, and production-ready systems.'}
          </p>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9] hover:border-[#B1ADA1] p-6 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-[4px] bg-[#F4F3EE] border border-[#E5E2D9] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#191919]" />
                  </div>
                  <span className="font-serif italic text-sm text-[#C15F3C]">
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-[#191919]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B665E] leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career & CV Banner (Clean bridge to /experiencia) */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono tracking-wider text-[#6B665E] uppercase">
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
            className="btn-claude-secondary shrink-0"
          >
            <span>{isSpanish ? 'Ver Experiencia & CV' : 'View Full Experience'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
