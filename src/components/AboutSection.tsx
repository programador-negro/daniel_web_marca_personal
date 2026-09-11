import React from 'react';
import { CheckCircle, Award, Sparkles, Globe, Terminal, Server } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { isSpanish } = useLanguage();

  const principles = isSpanish
    ? [
        {
          title: 'Arquitectura de Datos Escalable',
          description: 'Diseño e implementación de pipelines ETL/ELT de alto rendimiento procesando millones de registros diarios.',
          icon: Terminal,
        },
        {
          title: 'Automatización & CI/CD',
          description: 'Reducción drástica de tiempos de despliegue mediante infraestructura como código con Terraform, Docker y GCP.',
          icon: Server,
        },
        {
          title: 'Calidad & Cero Errores',
          description: 'Desarrollo de scripts de validación personalizados basados en Pandas para asegurar calidad y reconciliación de datos.',
          icon: Award,
        },
        {
          title: 'Inglés Avanzado C1 & Colaboración',
          description: 'Comunicación técnica fluida en entornos multinacionales y colaboración con equipos multidisciplinarios.',
          icon: Sparkles,
        },
      ]
    : [
        {
          title: 'Scalable Data Architecture',
          description: 'Design and implementation of high-performance ETL/ELT pipelines processing millions of daily records.',
          icon: Terminal,
        },
        {
          title: 'Automation & CI/CD',
          description: 'Drastic reduction in deployment times using Infrastructure as Code with Terraform, Docker, and GCP.',
          icon: Server,
        },
        {
          title: 'Zero-Error Data Quality',
          description: 'Development of custom Pandas-based validation scripts to guarantee data profiling and reconciliation.',
          icon: Award,
        },
        {
          title: 'C1-Advanced English & Teamwork',
          description: 'Fluent technical communication in multinational environments and cross-functional Agile squads.',
          icon: Sparkles,
        },
      ];

  return (
    <section id="sobre-mi" className="py-20 sm:py-28 bg-[#fbfbfb] bg-noise border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
            <span>04 // PROFILE & PHILOSOPHY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-[0.08em] uppercase">
            {isSpanish ? 'ACERCA DE DANIEL IBARRA' : 'ABOUT DANIEL IBARRA'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            {isSpanish
              ? 'ingeniero de software con 5+ años de experiencia combinando arquitectura de datos escalable y prácticas robustas de ingeniería.'
              : 'software engineer with 5+ years of experience blending scalable data architecture with robust software engineering practices.'}
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card-editorial p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed bg-white/95 backdrop-blur-md">
              {isSpanish ? (
                <>
                  <p>
                    Ingeniero de Software con <strong className="font-semibold text-slate-900">5+ años de experiencia</strong> combinando arquitectura de datos escalable y prácticas robustas de ingeniería. Experto en Python, Apache Airflow y GCP (BigQuery), gestionando actualmente más de 200 pipelines automatizados ETL/ELT que procesan más de 20 millones de filas diarias.
                  </p>
                  <p>
                    Con sólida trayectoria impulsando impacto en entornos multinacionales mediante la optimización de rendimiento en la nube, flujos CI/CD estrictos y traducción de requisitos de negocio complejos en productos de datos confiables. Hablante de inglés C1-Advanced, con excelente comunicación transversal y dominio de automatización impulsada por IA.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Software Engineer with <strong className="font-semibold text-slate-900">5+ years of experience</strong> blending scalable data architecture with robust software engineering practices. Expert in Python, Apache Airflow, and GCP (BigQuery), currently managing 200+ automated ETL/ELT pipelines processing over 20M rows daily.
                  </p>
                  <p>
                    Proven track record of driving impact in multinational environments by optimizing cloud performance, implementing strict CI/CD workflows, and translating complex business requirements into reliable data products. C1-Advanced English speaker, adept at cross-functional communication and leveraging AI-driven automation.
                  </p>
                </>
              )}
            </div>

            {/* Languages and details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-editorial p-5 bg-white/95 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-900 font-mono text-xs uppercase tracking-widest font-semibold mb-3">
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isSpanish ? 'IDIOMAS' : 'LANGUAGES'}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 font-light">
                  {personalInfo.languages.map((lang) => (
                    <li key={lang.name} className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">
                        {lang.name === 'Español' && !isSpanish ? 'Spanish' : lang.name === 'Inglés' && !isSpanish ? 'English (C1)' : lang.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] uppercase">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-editorial p-5 bg-white/95 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-900 font-mono text-xs uppercase tracking-widest font-semibold mb-3">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isSpanish ? 'ENFOQUE TÉCNICO' : 'CORE EXPERTISE'}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 font-light">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Python, Apache Airflow, dbt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>Google Cloud & BigQuery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Docker, Terraform & CI/CD</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Core Principles Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-medium">
              {isSpanish ? 'FILOSOFÍA DE TRABAJO' : 'ENGINEERING PHILOSOPHY'}
            </h3>
            {principles.map((item, idx) => {
              const Icon = item.icon;
              const pastelStyle = 
                idx === 0 ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
                idx === 1 ? 'bg-amber-50 border-amber-100 text-amber-800' :
                idx === 2 ? 'bg-rose-50 border-rose-100 text-rose-700' :
                'bg-emerald-50 border-emerald-100 text-emerald-800';

              return (
                <div
                  key={idx}
                  className="card-editorial p-4 bg-white/95 backdrop-blur-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2 rounded-xl border shrink-0 ${pastelStyle}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
