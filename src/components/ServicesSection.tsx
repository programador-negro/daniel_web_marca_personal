import React, { useState } from 'react';
import { 
  Database, Server, Cpu, Layers, 
  Search, Pencil, Code2, Rocket, ArrowRight, CheckCircle2, ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const ServicesSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  // State to track which cards are expanded
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    'data-cloud': false,
    'backend': false,
    'automation': false,
    'dashboards': false,
  });

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const solutions = [
    {
      id: 'data-cloud',
      icon: Database,
      tag: isSpanish ? 'Datos & Analítica' : 'Data & Analytics',
      techBadge: 'BigQuery / ETL / Cloud',
      accentColor: 'text-[#C15F3C]',
      buttonColor: 'bg-[#C15F3C] hover:bg-[#A84F30] text-[#FAF9F5]',
      bgCard: 'bg-[#FAF8F5]',
      borderCard: 'border-[#E8E1D5] hover:border-[#C15F3C]/50',
      iconBg: 'bg-[#F4EBE1] border-[#E8D7C5] text-[#C15F3C]',
      title: isSpanish ? '1. Centralización de Datos & Reportes Automáticos' : '1. Data Centralization & Automated Reporting',
      shortPitch: isSpanish 
        ? 'Unifica tus bases de datos, hojas de cálculo y ventas en un solo lugar confiable para tomar decisiones rápidas sin pagar de más en servidores.'
        : 'Consolidate multiple databases, spreadsheets, and revenue streams into a single trusted source for fast insights without cloud overspending.',
      pain: isSpanish ? 'Reportes lentos, datos dispersos en hojas de Excel y facturas de nube que crecen sin control.' : 'Scattered spreadsheets, delayed reporting, and unpredictable cloud infrastructure bills.',
      solution: isSpanish ? 'Flujos automáticos que organizan, limpian y actualizan tu información sola en Google Cloud.' : 'Automated pipelines that aggregate, sanitize, and update your business metrics reliably in Google Cloud.',
      metric: isSpanish ? 'Hasta -60% en costos de nube y reportes que cargan en segundos en vez de horas.' : 'Up to -60% cloud costs and analytical reports ready in seconds.',
      deliverables: isSpanish 
        ? ['Estructura de datos optimizada en BigQuery', 'Automatización de carga diaria sin intervención', 'Alertas tempranas ante discrepancias de datos']
        : ['Optimized data warehouse structure', 'Automated daily sync without manual tasks', 'Real-time alert monitoring for discrepancies'],
    },
    {
      id: 'backend',
      icon: Server,
      tag: isSpanish ? 'Conectividad & Sistemas' : 'Connectivity & Systems',
      techBadge: 'Python / FastAPI / APIs',
      accentColor: 'text-[#2D6A4F]',
      buttonColor: 'bg-[#2D6A4F] hover:bg-[#1E4D38] text-[#FAF9F5]',
      bgCard: 'bg-[#F5F8F6]',
      borderCard: 'border-[#DCE7DF] hover:border-[#2D6A4F]/50',
      iconBg: 'bg-[#E3EEE6] border-[#D1E2D6] text-[#2D6A4F]',
      title: isSpanish ? '2. Conexión e Integración de Sistemas' : '2. System Integration & High-Speed APIs',
      shortPitch: isSpanish
        ? 'Haz que tus aplicaciones, pasarelas de pago, CRMs y software actual se comuniquen de forma fluida, rápida y segura.'
        : 'Enable seamless communication between your ERP, payment gateways, CRM, and internal tools with speed and bank-grade security.',
      pain: isSpanish ? 'Sistemas aislados que obligan a tu equipo a transcribir datos de un programa a otro manualmente.' : 'Disconnected tools forcing employees to duplicate work and manually copy-paste records.',
      solution: isSpanish ? 'Motores y conectores en Python que sincronizan la información entre todas tus herramientas en tiempo real.' : 'High-performance Python microservices connecting all your tools into one cohesive ecosystem.',
      metric: isSpanish ? '99.9% de estabilidad continua y respuestas inmediatas en menos de un parpadeo (<150ms).' : '99.9% system uptime and near-instant processing (<150ms latency).',
      deliverables: isSpanish
        ? ['Conectores directos entre tus aplicaciones clave', 'Manual de uso y documentación clara', 'Pruebas automáticas que evitan caídas del servicio']
        : ['Direct connectors between key business software', 'Clear documentation & endpoint specs', 'Automated tests preventing service downtime'],
    },
    {
      id: 'automation',
      icon: Cpu,
      tag: isSpanish ? 'Ahorro Operativo' : 'Operational Savings',
      techBadge: 'Bots / RPA / Web Scraping',
      accentColor: 'text-[#2B5B84]',
      buttonColor: 'bg-[#2B5B84] hover:bg-[#1E4362] text-[#FAF9F5]',
      bgCard: 'bg-[#F4F7FA]',
      borderCard: 'border-[#D9E3EC] hover:border-[#2B5B84]/50',
      iconBg: 'bg-[#E2ECF4] border-[#CCE0EE] text-[#2B5B84]',
      title: isSpanish ? '3. Eliminación de Tareas Manuales & Bots' : '3. Manual Task Elimination & Workflow Bots',
      shortPitch: isSpanish
        ? 'Automatiza la extracción de datos de la web, validación de facturas y descarga de documentos sin que nadie tenga que hacerlo a mano.'
        : 'Automate repetitive web extraction, invoice parsing, and document sync so your staff never has to perform manual busywork.',
      pain: isSpanish ? 'Tu equipo pierde decenas de horas al mes en labores repetitivas propensas a errores humanos.' : 'Operations staff burning valuable weekly hours on repetitive tasks with inevitable human error.',
      solution: isSpanish ? 'Robots de software programados para trabajar 24/7 descargando, procesando y enviando datos sin fallar.' : 'Resilient 24/7 automation scripts and web scrapers handling data extraction and dispatch.',
      metric: isSpanish ? '+100 horas recuperadas al mes para tareas estratégicas con 0% error de digitación.' : '100+ hours saved every month with zero human typing errors.',
      deliverables: isSpanish
        ? ['Robot programado según tu flujo operativo exacto', 'Extracción web tolerante a bloqueos', 'Notificaciones automáticas a WhatsApp, Slack o Email']
        : ['Custom automated workflow tailored to your team', 'Resilient data scraper with proxy management', 'Instant notifications to Slack, WhatsApp or Email'],
    },
    {
      id: 'dashboards',
      icon: Layers,
      tag: isSpanish ? 'Visibilidad & Control' : 'Visibility & Control',
      techBadge: 'React / TypeScript / Web',
      accentColor: 'text-[#6F4E7C]',
      buttonColor: 'bg-[#6F4E7C] hover:bg-[#573C62] text-[#FAF9F5]',
      bgCard: 'bg-[#F9F6FA]',
      borderCard: 'border-[#E7DFEC] hover:border-[#6F4E7C]/50',
      iconBg: 'bg-[#EDE4F2] border-[#DFCDE7] text-[#6F4E7C]',
      title: isSpanish ? '4. Paneles de Control & Plataformas Web' : '4. Executive Dashboards & Web Portals',
      shortPitch: isSpanish
        ? 'Visualiza el estado real de tus ventas, operaciones y clientes en paneles gráficos modernos y accesibles desde cualquier teléfono o laptop.'
        : 'Monitor revenue, operations, and team metrics in modern visual dashboards accessible anywhere from mobile or desktop.',
      pain: isSpanish ? 'Falta de visibilidad sobre lo que pasa en la empresa y dificultad para saber qué números importan.' : 'Lack of real-time visibility into operations and clunky, outdated internal systems.',
      solution: isSpanish ? 'Plataformas web a medida, rápidas, limpias e intuitivas con gráficos interactivos y roles de usuario.' : 'Bespoke web applications built with modern React and interactive charts designed for executive clarity.',
      metric: isSpanish ? 'Entendimiento de la salud del negocio en menos de 10 segundos con datos al día.' : 'Instant 10-second clarity on company health with fresh live data.',
      deliverables: isSpanish
        ? ['Panel web adaptado a celular y computadora', 'Gráficos interactivos de tus métricas clave', 'Accesos seguros protegidos con contraseñas por rol']
        : ['Mobile and desktop responsive executive interface', 'Interactive charts for key business metrics', 'Secure login with role-based permissions'],
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: isSpanish ? 'Diagnóstico Sin Costo' : 'Free Discovery Audit',
      icon: Search,
      desc: isSpanish ? 'Revisamos tu flujo actual, identificamos dónde se pierde tiempo o dinero y definimos el alcance en 48 horas.' : 'We analyze your current workflow, spot bottlenecks or lost hours, and scope solutions within 48 hours.',
    },
    {
      step: '02',
      title: isSpanish ? 'Propuesta & Plan Fijo' : 'Fixed Scope Blueprint',
      icon: Pencil,
      desc: isSpanish ? 'Te entregamos un plan claro con precio cerrado, fechas de entrega exactas y sin sorpresas de presupuesto.' : 'We deliver a clear technical roadmap with fixed pricing, defined milestones, and zero hidden costs.',
    },
    {
      step: '03',
      title: isSpanish ? 'Construcción Ágil' : 'Sprint Development',
      icon: Code2,
      desc: isSpanish ? 'Desarrollo en etapas cortas con avances visibles cada semana para que puedas probar el sistema en vivo.' : 'Fast weekly iterations with live functional demonstrations so you can test real progress.',
    },
    {
      step: '04',
      title: isSpanish ? 'Puesta en Marcha & Soporte' : 'Launch & Guarantee',
      icon: Rocket,
      desc: isSpanish ? 'Instalación en tu empresa, capacitación a tu equipo, entrega de código 100% tuyo y garantía post-lanzamiento.' : 'Full production setup, team onboarding, 100% code ownership, and post-launch support SLA.',
    },
  ];

  return (
    <section id="servicios" className="py-14 sm:py-18 bg-[#FAF9F5] border-b border-[#E5E2D9] relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#6B665E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C]" />
            <span className="uppercase tracking-wider">
              {isSpanish ? 'Catálogo de Soluciones' : 'Solutions Catalog'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#191919] tracking-tight">
            {isSpanish ? 'Soluciones Técnicas Puntuales' : 'Turn-Key Technical Solutions'}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-normal max-w-xl mx-auto leading-relaxed">
            {isSpanish
              ? 'Alcances definidos, entregables concretos y resultados medibles. Sin costos ocultos ni dependencias innecesarias.'
              : 'Defined scopes, concrete deliverables, and measurable ROI. Zero hidden fees, zero agency overhead.'}
          </p>
        </div>

        {/* 4 Solutions Detailed Cards (Collapsible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-start">
          {solutions.map((sol) => {
            const IconComp = sol.icon;
            const isOpen = Boolean(openCards[sol.id]);

            return (
              <div
                key={sol.id}
                className={`rounded-[6px] ${sol.bgCard} border ${sol.borderCard} p-6 flex flex-col justify-between transition-all duration-200 shadow-2xs`}
              >
                <div>
                  {/* Category, Tech Badge & Toggle */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`w-8 h-8 rounded-[4px] border flex items-center justify-center ${sol.iconBg}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-mono uppercase tracking-wider font-medium ${sol.accentColor}`}>
                        {sol.tag}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white border border-[#E5E2D9] text-[#6B665E]">
                        {sol.techBadge}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCard(sol.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] border border-[#E5E2D9] bg-white hover:bg-[#FAF9F5] text-[#191919] text-xs font-sans transition-all cursor-pointer shrink-0"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[11px]">{isOpen ? (isSpanish ? 'Menos' : 'Less') : (isSpanish ? 'Detalle' : 'Details')}</span>
                      <ChevronDown className={`w-3 h-3 text-[#6B665E] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Human-Friendly Pitch */}
                  <div className="space-y-2 mb-3">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#191919] tracking-tight">
                      {sol.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B665E] leading-relaxed font-normal">
                      {sol.shortPitch}
                    </p>
                  </div>

                  {/* Highlight Metric Pill */}
                  <div className="p-2.5 rounded-[4px] bg-white border border-[#E5E2D9] mb-3 flex items-start gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${sol.accentColor} shrink-0 mt-0.5`} />
                    <span className="text-xs text-[#191919] font-medium leading-snug">
                      {sol.metric}
                    </span>
                  </div>

                  {/* Collapsible Section: Problem, Solution & Deliverables */}
                  {isOpen && (
                    <div className="space-y-3 pt-3 mt-3 border-t border-[#E5E2D9]">
                      <div className="space-y-2 text-xs text-[#191919]">
                        <div className="p-3 rounded-[4px] bg-white/70 border border-[#E5E2D9]">
                          <span className="text-[#C15F3C] block font-mono text-[10px] uppercase mb-0.5 font-medium">
                            {isSpanish ? 'El Problema Habitual' : 'Typical Bottleneck'}
                          </span>
                          <span className="text-[#6B665E] leading-relaxed">{sol.pain}</span>
                        </div>
                        <div className="p-3 rounded-[4px] bg-white border border-[#E5E2D9]">
                          <span className={`${sol.accentColor} block font-mono text-[10px] uppercase mb-0.5 font-medium`}>
                            {isSpanish ? 'Cómo Lo Resolvemos' : 'Engineered Solution'}
                          </span>
                          <span className="text-[#191919] leading-relaxed">{sol.solution}</span>
                        </div>
                      </div>

                      {/* Deliverables checklist */}
                      <div className="pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665E] block mb-2 font-medium">
                          {isSpanish ? 'Entregables Concretos:' : 'What You Receive:'}
                        </span>
                        <ul className="space-y-1.5">
                          {sol.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-[#191919]">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${sol.accentColor} shrink-0`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6B665E]">
                    {isSpanish ? 'Entrega estimada: 1 a 3 semanas' : 'Turnaround: 1-3 weeks'}
                  </span>
                  <Link
                    to="/cotizador"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] ${sol.buttonColor} text-xs font-sans font-medium transition-all shadow-xs`}
                  >
                    <span>{isSpanish ? 'Cotizar Solución' : 'Estimate Cost'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodology & Process: 4 Steps */}
        <div className="mb-12 p-6 sm:p-8 rounded-[6px] bg-[#FAF9F5] border border-[#E5E2D9]">
          <div className="max-w-xl mx-auto text-center mb-8 space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B665E]">
              {isSpanish ? 'Metodología Transparente' : 'Transparent Methodology'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#191919]">
              {isSpanish ? 'Cómo trabajamos juntos' : 'How we work together'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="p-4 rounded-[6px] bg-[#F4F3EE] border border-[#E5E2D9] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-[4px] bg-[#FAF9F5] border border-[#E5E2D9] flex items-center justify-center">
                      <StepIcon className="w-4 h-4 text-[#191919]" />
                    </div>
                    <span className="font-serif italic text-sm text-[#C15F3C]">
                      {step.step}
                    </span>
                  </div>
                  <h4 className="font-sans font-medium text-xs text-[#191919]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#6B665E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Banner (Editorial style) */}
        <div className="rounded-[6px] bg-[#191919] text-[#FAF9F5] p-8 sm:p-10 border border-[#E5E2D9] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-serif text-3xl text-[#FAF9F5]/30 block leading-none">“</span>
              <p className="font-serif italic text-base sm:text-lg text-[#FAF9F5] font-normal leading-relaxed">
                {isSpanish
                  ? 'Daniel transformó nuestra infraestructura de datos. Pasamos de reportes lentos y errores manuales a pipelines 100% automatizados en Google Cloud en menos de tres semanas.'
                  : 'Daniel transformed our data workflows. We went from sluggish queries and manual errors to fully automated cloud pipelines in under three weeks.'}
              </p>
              <div>
                <p className="font-sans text-xs text-[#FAF9F5] font-semibold tracking-wide">
                  Manuel Mato
                </p>
                <p className="font-serif italic text-xs text-[#FAF9F5]/70">
                  Gerente - Manutours
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-4 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-8 pt-4 lg:pt-0">
              <div>
                <div className="text-3xl font-serif text-[#FAF9F5]">99.9%</div>
                <div className="text-xs font-sans text-[#FAF9F5]/70 mt-0.5">
                  {isSpanish ? 'Uptime en Producción' : 'Production Uptime'}
                </div>
              </div>
              <div>
                <div className="text-3xl font-serif text-[#FAF9F5]">219+</div>
                <div className="text-xs font-sans text-[#FAF9F5]/70 mt-0.5">
                  {isSpanish ? 'Pipelines Entregados' : 'Pipelines Delivered'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
