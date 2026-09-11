import { FAQItem, Language } from '../types';

export const faqDataByLang: Record<Language, FAQItem[]> = {
  es: [
    {
      id: 'faq-1',
      category: 'contracts',
      question: '¿Cómo funciona la contratación y facturación si mi empresa está en Estados Unidos?',
      answer: 'La contratación se formaliza a través de un contrato estándar de servicios independientes (Independent Contractor Agreement). Proporciono el formulario oficial W-8BEN del IRS para exención de retenciones fiscales en EE.UU. Los pagos se procesan de forma simple y transparente en USD vía transferencia bancaria (Wire/ACH), Wise o Stripe.',
    },
    {
      id: 'faq-2',
      category: 'general',
      question: '¿Quién es el dueño del código fuente y qué acuerdos de confidencialidad (NDA) firmamos?',
      answer: 'El cliente es 100% dueño de todo el código fuente, repositorios, documentación y derechos de propiedad intelectual desde el momento de su entrega. Antes de iniciar cualquier proyecto o análisis de datos internos, firmo un Acuerdo de Confidencialidad (NDA) para proteger la privacidad de tu negocio.',
    },
    {
      id: 'faq-3',
      category: 'automation',
      question: '¿Qué tipo de procesos o reportes se pueden automatizar en mi empresa?',
      answer: 'Casi cualquier flujo repetitivo que involucre mover datos entre hojas de cálculo, descargar archivos de portales, extraer información con web scraping, generar reportes ejecutivos en Google BigQuery/PostgreSQL, enviar alertas automáticas a Slack o sincronizar leads entre tu web y tu CRM.',
    },
    {
      id: 'faq-4',
      category: 'web',
      question: '¿Qué garantía tengo de que la web o el software cargará rápido y sin errores?',
      answer: 'Todos los desarrollos web se construyen con TypeScript, React y Tailwind CSS siguiendo estándares estrictos de Core Web Vitals (carga en menos de 1.5s). Además, cada proyecto incluye un periodo de garantía de 30 días posteriores a la entrega para resolver cualquier ajuste o anomalía sin costo adicional.',
    },
    {
      id: 'faq-5',
      category: 'contracts',
      question: '¿Cuál es la diferencia entre contratar a un desarrollador Nearshore y una agencia local en EE.UU.?',
      answer: 'Una agencia estadounidense cobra tarifas de $150 a $250 por hora con altos costos estructurales. Trabajar conmigo como Senior Engineer independiente en Colombia (Zona horaria UTC-5, compatible con horario EST/CST) te brinda la misma calidad de código y comunicación fluida en inglés/español con un ahorro de más del 50% en presupuesto.',
    },
    {
      id: 'faq-6',
      category: 'general',
      question: '¿Cómo se estructura el proceso de cotización y los pagos de un proyecto?',
      answer: 'El proceso inicia utilizando el cotizador interactivo de este sitio para definir el alcance. Luego agendamos una llamada técnica de 20 minutos para afinar requerimientos. Los proyectos de precio fijo se dividen típicamente en 50% de anticipo al inicio y 50% contra entrega y satisfacción final.',
    },
  ],
  en: [
    {
      id: 'faq-1',
      category: 'contracts',
      question: 'How do hiring and invoicing work if my company or agency is based in the United States?',
      answer: 'Engagement is formalized via an industry-standard Independent Contractor Agreement. I provide the official IRS W-8BEN form for withholding tax exemption in the United States. Invoices are paid seamlessly in USD via bank wire (ACH/Wire), Wise Business, or Stripe.',
    },
    {
      id: 'faq-2',
      category: 'general',
      question: 'Who owns the intellectual property and code, and do we sign a non-disclosure agreement (NDA)?',
      answer: 'You own 100% of all intellectual property, source code, repositories, and documentation from day one. Before reviewing your internal business data or technical systems, we execute a mutual Non-Disclosure Agreement (NDA) to safeguard your confidentiality.',
    },
    {
      id: 'faq-3',
      category: 'automation',
      question: 'What types of processes, tasks, or reports can be automated for our operations?',
      answer: 'Nearly any repetitive workflow involving manual spreadsheet updates, recurring CSV exports, data scraping from external portals, automated executive reporting via BigQuery/SQL, real-time Slack/Email anomaly alerts, and CRM syncs.',
    },
    {
      id: 'faq-4',
      category: 'web',
      question: 'What guarantee do I have that custom applications will load quickly and reliably?',
      answer: 'Every web solution is built with strict TypeScript, React, and Tailwind CSS adhering to Core Web Vitals targets (< 1.5s load times). Every milestone includes a 30-day post-launch warranty period to resolve any bug or adjustment at no additional charge.',
    },
    {
      id: 'faq-5',
      category: 'contracts',
      question: 'What is the advantage of working with a Nearshore Senior Engineer versus a local US agency?',
      answer: 'US agencies routinely bill $150 to $250/hr with heavy account management overhead. Working directly with me as a Senior Software Engineer in Colombia (UTC-5, perfectly matched with EST/CST business hours) delivers direct communication, clean architecture, and 50%+ cost savings without timezone friction.',
    },
    {
      id: 'faq-6',
      category: 'general',
      question: 'How is the project scoping, quotation, and milestone payment structure handled?',
      answer: 'Start by customizing your scope in our live Quote Builder. We then conduct a brief 20-minute discovery call to finalize technical specs. Fixed-price contracts typically operate on a 50% initial kickoff deposit and 50% upon final acceptance and deployment.',
    },
  ],
};

export const faqData: FAQItem[] = faqDataByLang.es;
