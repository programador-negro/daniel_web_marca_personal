import { Project, SkillItem, ExperienceItem, ServiceItem, Language } from '../types';

export const personalInfo = {
  name: 'Daniel Ibarra',
  brandHandle: 'programador-negro',
  tagline: 'Software Engineer • Python & BigQuery Specialist',
  subTagline: 'Expert in Python, Apache Airflow, and GCP (BigQuery), managing 200+ automated ETL/ELT pipelines processing over 20M rows daily.',
  summary: 'Software Engineer with 5+ years of experience blending scalable data architecture with robust software engineering practices. C1-Advanced English speaker.',
  email: 'daniel.ibarra.dev@gmail.com',
  whatsappNumber: '573007758033',
  github: 'https://github.com/programador-negro',
  location: 'Medellín, Colombia',
  availability: 'Available for senior roles & nearshore consulting',
  yearsOfExperience: '5+ years',
  projectsCount: '219+',
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C1-Advanced' },
  ],
};

export const skillsDataByLang: Record<Language, SkillItem[]> = {
  es: [
    // Languages & Backend
    { name: 'Python', level: 98, category: 'Backend', iconName: 'Terminal', highlight: 'FastAPI, Django, Flask, Pandas, Avro' },
    { name: 'SQL & Bash', level: 95, category: 'Backend', iconName: 'Code', highlight: 'Complex Queries, Shell Scripting' },
    { name: 'Django & FastAPI', level: 92, category: 'Backend', iconName: 'Server', highlight: 'REST APIs, Microservices' },
    { name: 'TypeScript / Node.js', level: 88, category: 'Backend', iconName: 'Cpu', highlight: 'Modern Web Apps' },

    // Data & Cloud
    { name: 'Apache Airflow', level: 95, category: 'Data & Cloud', iconName: 'Layers', highlight: '219+ Orchestrated Pipelines' },
    { name: 'Google Cloud (GCP)', level: 94, category: 'Data & Cloud', iconName: 'Database', highlight: 'BigQuery, GCS, Cloud Run' },
    { name: 'Snowflake & PostgreSQL', level: 90, category: 'Data & Cloud', iconName: 'Zap', highlight: 'Data Warehousing, Query Tuning' },
    { name: 'dbt & ETL/ELT', level: 92, category: 'Data & Cloud', iconName: 'Boxes', highlight: 'Bulk Loads, Transformations' },

    // DevOps & Infrastructure
    { name: 'Docker & Kubernetes', level: 90, category: 'Automation & DevOps', iconName: 'TerminalSquare', highlight: 'Containerization, Deployment' },
    { name: 'Terraform & CI/CD', level: 88, category: 'Automation & DevOps', iconName: 'GitBranch', highlight: 'Infrastructure as Code' },
    { name: 'GitHub Actions & Jenkins', level: 90, category: 'Automation & DevOps', iconName: 'Monitor', highlight: 'Automated Pipelines' },

    // Frontend
    { name: 'React.js & Tailwind CSS', level: 88, category: 'Frontend', iconName: 'Palette', highlight: 'Responsive UIs, Dashboards' },
  ],
  en: [
    // Languages & Backend
    { name: 'Python', level: 98, category: 'Backend', iconName: 'Terminal', highlight: 'FastAPI, Django, Flask, Pandas, Avro' },
    { name: 'SQL & Bash', level: 95, category: 'Backend', iconName: 'Code', highlight: 'Complex Queries, Shell Scripting' },
    { name: 'Django & FastAPI', level: 92, category: 'Backend', iconName: 'Server', highlight: 'REST APIs, Microservices' },
    { name: 'TypeScript / Node.js', level: 88, category: 'Backend', iconName: 'Cpu', highlight: 'Modern Web Apps' },

    // Data & Cloud
    { name: 'Apache Airflow', level: 95, category: 'Data & Cloud', iconName: 'Layers', highlight: '219+ Orchestrated Pipelines' },
    { name: 'Google Cloud (GCP)', level: 94, category: 'Data & Cloud', iconName: 'Database', highlight: 'BigQuery, GCS, Cloud Run' },
    { name: 'Snowflake & PostgreSQL', level: 90, category: 'Data & Cloud', iconName: 'Zap', highlight: 'Data Warehousing, Query Tuning' },
    { name: 'dbt & ETL/ELT', level: 92, category: 'Data & Cloud', iconName: 'Boxes', highlight: 'Bulk Loads, Transformations' },

    // DevOps & Infrastructure
    { name: 'Docker & Kubernetes', level: 90, category: 'Automation & DevOps', iconName: 'TerminalSquare', highlight: 'Containerization, Deployment' },
    { name: 'Terraform & CI/CD', level: 88, category: 'Automation & DevOps', iconName: 'GitBranch', highlight: 'Infrastructure as Code' },
    { name: 'GitHub Actions & Jenkins', level: 90, category: 'Automation & DevOps', iconName: 'Monitor', highlight: 'Automated Pipelines' },

    // Frontend
    { name: 'React.js & Tailwind CSS', level: 88, category: 'Frontend', iconName: 'Palette', highlight: 'Responsive UIs, Dashboards' },
  ],
};

export const skillsData: SkillItem[] = skillsDataByLang.es;

export const projectsDataByLang: Record<Language, Project[]> = {
  es: [
    {
      id: 'manu-tours-platform',
      title: 'Manu Tours - Plataforma Turística & Gestión',
      description: 'Plataforma web para reservas de expediciones, catálogo de experiencias ecológicas y gestión turística.',
      fullDescription: 'Sistema web completo desarrollado para agencias de viajes y eco-turismo. Cuenta con catálogo interactivo de paquetes, integración de reservas en tiempo real y optimización para la conversión de visitantes.',
      category: 'Full-Stack',
      tags: ['React', 'Node.js', 'Tailwind CSS', 'Reservas Online', 'Turismo'],
      liveUrl: 'https://powerflow.it.com/manutours',
      githubUrl: 'https://powerflow.it.com/manutours',
      metrics: 'Plataforma activa en producción para reservas de paquetes',
      featured: true,
    },
    {
      id: 'distri-perez-ecommerce',
      title: 'DistriPérez - Comercializadora & Distribución B2B/B2C',
      description: 'Portal e-commerce para distribución comercial masiva de productos y catálogo digital interactivo.',
      fullDescription: 'Plataforma web de comercio electrónico y distribución diseñada para la toma rápida de pedidos, visualización clara de catálogo por categorías y contacto directo con clientes.',
      category: 'Full-Stack',
      tags: ['E-Commerce', 'React', 'TypeScript', 'Catálogo Digital', 'B2B & B2C'],
      liveUrl: 'https://www.distriperez.com/',
      githubUrl: 'https://www.distriperez.com/',
      metrics: 'Canal digital directo de catálogo y captación de ventas',
      featured: true,
    },
    {
      id: 'hotel-mocoa-samay',
      title: 'Hotel Mocoa Samay - Plataforma de Reservas',
      description: 'Sitio web oficial de hospedaje con motor de información, catálogo de habitaciones y reserva directa.',
      fullDescription: 'Plataforma hotelera optimizada para posicionamiento SEO local, experiencia multidispositivo veloz y captación directa de huéspedes sin intermediarios ni comisiones.',
      category: 'Full-Stack',
      tags: ['Hotelería', 'Web App', 'SEO Local', 'Reservas Directas', 'UX/UI'],
      liveUrl: 'https://hotelmocoasamay.com/',
      githubUrl: 'https://hotelmocoasamay.com/',
      metrics: 'Impulso directo de reservas y canal web propio',
      featured: true,
    },
    {
      id: 'hotel-suma-wasi',
      title: 'Hotel Suma Wasi - Portal de Hospedaje & Suites',
      description: 'Plataforma de servicios hoteleros, visualización de instalaciones y contacto directo con el huésped.',
      fullDescription: 'Desarrollo web moderno con diseño responsivo móvil-primero, tiempos de carga ultrarrápidos y arquitectura orientada a la conversión en el sector turístico.',
      category: 'Full-Stack',
      tags: ['Web Platform', 'Mobile-First', 'Hotelería', 'Tailwind', 'Turismo'],
      liveUrl: 'https://hotelsumawasi.online/',
      githubUrl: 'https://hotelsumawasi.online/',
      metrics: 'Experiencia 100% responsiva para turismo regional',
      featured: true,
    },
    {
      id: 'google-bigquery-lake',
      title: 'BigQuery Data Analytics Pipelines - Amadeus',
      description: 'Modelos de datos analíticos de gran escala, optimización de queries SQL complejas y pipelines ETL en GCP.',
      fullDescription: 'Esquemas analíticos particionados para analítica de negocio masiva (20M+ filas diarias), reducción del 60% en costos de escaneo de BigQuery y generación automatizada de reportes gerenciales.',
      category: 'Data & Analytics',
      tags: ['BigQuery', 'SQL', 'GCP', 'ETL Pipelines', 'Airflow', 'Python'],
      githubUrl: 'https://github.com/programador-negro/Google-Big-Query',
      metrics: 'Reducción de coste y tiempo de escaneo en 60%',
      featured: true,
    },
    {
      id: 'bash-automation-core',
      title: 'Bash Linux Automation Suite',
      description: 'Colección de utilidades y scripts shell para orquestación de sistemas, backups automáticos y hardening de servidores.',
      fullDescription: 'Scripts avanzados en Bash que automatizan tareas repetitivas de infraestructura: monitorización de logs, balance de recursos, aprovisionamiento de dependencias y pipelines de despliegue continuo.',
      category: 'Automation & CLI',
      tags: ['Bash', 'Shell Scripting', 'Linux', 'DevOps', 'Cron'],
      githubUrl: 'https://github.com/programador-negro/bash-scripting',
      metrics: 'Ahorro de +15 horas semanales en sysadmin',
      featured: false,
    },
  ],
  en: [
    {
      id: 'manu-tours-platform',
      title: 'Manu Tours - Travel & Tour Management Platform',
      description: 'Web platform for expedition bookings, eco-adventure catalog, and tour operations management.',
      fullDescription: 'Comprehensive web system designed for travel and eco-tourism agencies. Features an interactive package catalog, real-time booking inquiries, and conversion-optimized flow.',
      category: 'Full-Stack',
      tags: ['React', 'Node.js', 'Tailwind CSS', 'Online Booking', 'Tourism'],
      liveUrl: 'https://powerflow.it.com/manutours',
      githubUrl: 'https://powerflow.it.com/manutours',
      metrics: 'Active production platform for expedition bookings',
      featured: true,
    },
    {
      id: 'distri-perez-ecommerce',
      title: 'DistriPérez - Commercial Distribution E-Commerce',
      description: 'E-commerce portal for wholesale product distribution and interactive digital catalog.',
      fullDescription: 'Web commerce and distribution platform built for fast order inquiries, clear category catalog browsing, and direct client communication.',
      category: 'Full-Stack',
      tags: ['E-Commerce', 'React', 'TypeScript', 'Digital Catalog', 'B2B & B2C'],
      liveUrl: 'https://www.distriperez.com/',
      githubUrl: 'https://www.distriperez.com/',
      metrics: 'Direct digital sales & product inquiry channel',
      featured: true,
    },
    {
      id: 'hotel-mocoa-samay',
      title: 'Hotel Mocoa Samay - Hospitality Booking Portal',
      description: 'Official hotel website with room showcases, local tourism information, and direct booking.',
      fullDescription: 'Hospitality platform optimized for local SEO, fast multi-device performance, and commission-free direct guest reservations.',
      category: 'Full-Stack',
      tags: ['Hospitality', 'Web App', 'Local SEO', 'Direct Booking', 'UX/UI'],
      liveUrl: 'https://hotelmocoasamay.com/',
      githubUrl: 'https://hotelmocoasamay.com/',
      metrics: 'Direct reservation channel without third-party fees',
      featured: true,
    },
    {
      id: 'hotel-suma-wasi',
      title: 'Hotel Suma Wasi - Suite Showcase & Booking Platform',
      description: 'Web platform for hotel services, suite gallery, and direct guest inquiries.',
      fullDescription: 'Modern web development featuring mobile-first responsive design, ultra-fast loading times, and a conversion-oriented architecture for the hospitality industry.',
      category: 'Full-Stack',
      tags: ['Web Platform', 'Mobile-First', 'Hospitality', 'Tailwind', 'Tourism'],
      liveUrl: 'https://hotelsumawasi.online/',
      githubUrl: 'https://hotelsumawasi.online/',
      metrics: '100% responsive guest experience',
      featured: true,
    },
    {
      id: 'google-bigquery-lake',
      title: 'BigQuery Data Analytics Pipelines - Amadeus',
      description: 'Large-scale analytical data models, complex SQL query optimization, and automated ETL pipelines in Google Cloud.',
      fullDescription: 'Partitioned analytical schemas for massive business reporting (20M+ daily records), achieving a 60% scan cost reduction on BigQuery slots with automated executive delivery.',
      category: 'Data & Analytics',
      tags: ['BigQuery', 'SQL', 'GCP', 'ETL Pipelines', 'Airflow', 'Python'],
      githubUrl: 'https://github.com/programador-negro/Google-Big-Query',
      metrics: '60% scan cost & execution time reduction',
      featured: true,
    },
    {
      id: 'bash-automation-core',
      title: 'Bash Linux Automation Suite',
      description: 'Collection of modular shell scripts for Linux system orchestration, encrypted backups, and server hardening.',
      fullDescription: 'Production-ready Bash scripts that automate repetitive sysadmin workflows: log rotation, system health monitoring, dependency provisioning, and continuous deployment.',
      category: 'Automation & CLI',
      tags: ['Bash', 'Shell Scripting', 'Linux', 'DevOps', 'Cron'],
      githubUrl: 'https://github.com/programador-negro/bash-scripting',
      metrics: 'Saves 15+ hours weekly in server maintenance',
      featured: false,
    },
  ],
};

export const projectsData: Project[] = projectsDataByLang.es;

export const experienceDataByLang: Record<Language, ExperienceItem[]> = {
  es: [
    {
      id: 'amadeus-python-data',
      role: 'Python Engineer / Data Engineer',
      company: 'Amadeus',
      location: 'Medellín, Colombia',
      period: 'Jul 2022 - Presente',
      isCurrent: true,
      description: 'Arquitectura y mantenimiento de 219 pipelines ETL/ELT con Python y Apache Airflow procesando más de 20 millones de filas diarias hacia Google BigQuery.',
      bulletPoints: [
        'Reducción de tiempos de carga de varios minutos a solo 10 segundos para datasets de 1M+ registros mediante re-arquitectura de inserts fila por fila a bulk loads GCS-to-BigQuery usando transformaciones AVRO.',
        'Automatización de flujos de reportes para analítica, finanzas y clientes externos, reemplazando un sistema manual de tickets por ingestión de datos vía APIs, emails y archivos planos (ahorro de cientos de horas).',
        'Cero errores humanos en validación de datos gracias a scripts en Pandas desarrollados a medida para automatizar controles de calidad, perfilado y reconciliación.',
        'Aceleración de tiempos de despliegue en producción de 2 días a una sola tarde implementando pipelines CI/CD para Terraform y Docker en GCP, integrando IA (GitHub Copilot).',
      ],
      technologies: ['Python', 'Apache Airflow', 'GCP', 'BigQuery', 'Pandas', 'Avro', 'Terraform', 'Docker', 'CI/CD'],
    },
    {
      id: 'globant-backend',
      role: 'Python Backend Developer',
      company: 'Globant',
      location: 'Medellín, Colombia',
      period: 'Mar 2022 - May 2022',
      isCurrent: false,
      description: 'Desarrollo de sistemas backend escalables aplicando principios de arquitectura limpia y pruebas automatizadas.',
      bulletPoints: [
        'Desarrollo de microservicios y sistemas backend utilizando Django, Docker y PostgreSQL.',
        'Aplicación rigurosa de principios de clean architecture y prácticas de testing unitario e integración.',
        'Contribución activa a flujos de CI/CD y despliegues en la nube.',
      ],
      technologies: ['Python', 'Django', 'Docker', 'PostgreSQL', 'CI/CD', 'Clean Architecture'],
    },
    {
      id: 'emtelco-senior',
      role: 'Senior Application Analyst / Software Engineer',
      company: 'Emtelco',
      location: 'Medellín, Colombia',
      period: 'Jul 2020 - Mar 2022',
      isCurrent: false,
      description: 'Liderazgo en migración de arquitectura monolítica a microservicios y optimización de bases de datos relacionales.',
      bulletPoints: [
        'Liderazgo en la migración técnica de arquitectura monolítica a microservicios, mejorando escalabilidad y resiliencia.',
        'Diseño e implementación de servicios backend en Python (Django) de alta concurrencia.',
        'Optimización avanzada de consultas en PostgreSQL para mejorar rendimiento en cargas de tráfico elevadas.',
        'Participación en decisiones de diseño arquitectónico y establecimiento de estándares de ingeniería.',
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Microservices', 'Agile/Scrum', 'Git'],
    },
    {
      id: 'bancolombia-cybersecurity',
      role: 'Cybersecurity Developer',
      company: 'Bancolombia',
      location: 'Medellín, Colombia',
      period: 'Jan 2019 - Jul 2019',
      isCurrent: false,
      description: 'Desarrollo de aplicaciones seguras internas para control de permisos de almacenamiento y cumplimiento normativo.',
      bulletPoints: [
        'Desarrollo de una aplicación interna segura para gestionar permisos de medios de almacenamiento usando APIs de antivirus.',
        'Fortalecimiento de la gobernanza de datos, control de accesos y cumplimiento regulatorio bancario.',
      ],
      technologies: ['Python', 'Security APIs', 'Data Governance', 'Access Control'],
    },
  ],
  en: [
    {
      id: 'amadeus-python-data',
      role: 'Python Engineer / Data Engineer',
      company: 'Amadeus',
      location: 'Medellín, Colombia',
      period: 'Jul 2022 - Present',
      isCurrent: true,
      description: 'Architecting and maintaining 219 scalable ETL/ELT pipelines using Python and Apache Airflow, processing 20M+ rows daily into Google BigQuery.',
      bulletPoints: [
        'Slashed data loading times from several minutes to just 10 seconds for 1M+ record datasets by re-architecting row-by-row inserts into GCS-to-BigQuery bulk loads using AVRO file transformations.',
        'Automated reporting workflows for analytics and billing teams, replacing manual ticketing with API, email, and flat file ingestion (saving hundreds of hours across departments).',
        'Achieved a zero human-error rate in data validation by developing custom Pandas-based scripts to automate quality checks, profiling, and reconciliation.',
        'Accelerated production deployment times from 2 days to a single afternoon by implementing CI/CD pipelines for Terraform and Docker on GCP, integrating AI tools.',
      ],
      technologies: ['Python', 'Apache Airflow', 'GCP', 'BigQuery', 'Pandas', 'Avro', 'Terraform', 'Docker', 'CI/CD'],
    },
    {
      id: 'globant-backend',
      role: 'Python Backend Developer',
      company: 'Globant',
      location: 'Medellín, Colombia',
      period: 'Mar 2022 - May 2022',
      isCurrent: false,
      description: 'Developed scalable backend systems applying clean architecture principles and testing practices.',
      bulletPoints: [
        'Developed backend systems using Django, Docker, and PostgreSQL.',
        'Applied clean architecture principles and rigorous testing practices.',
        'Contributed to CI/CD workflows and cloud deployments.',
      ],
      technologies: ['Python', 'Django', 'Docker', 'PostgreSQL', 'CI/CD', 'Clean Architecture'],
    },
    {
      id: 'emtelco-senior',
      role: 'Senior Application Analyst / Software Engineer',
      company: 'Emtelco',
      location: 'Medellín, Colombia',
      period: 'Jul 2020 - Mar 2022',
      isCurrent: false,
      description: 'Led technical migration from monolithic architecture to microservices and optimized high-traffic database workloads.',
      bulletPoints: [
        'Led technical migration from a monolithic architecture to microservices, improving scalability and system resilience.',
        'Designed and implemented backend services using Python (Django).',
        'Optimized PostgreSQL queries, improving performance for high-traffic workloads.',
        'Participated in architectural decision-making and guided engineering standards across services.',
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Microservices', 'Agile/Scrum', 'Git'],
    },
    {
      id: 'bancolombia-cybersecurity',
      role: 'Cybersecurity Developer',
      company: 'Bancolombia',
      location: 'Medellín, Colombia',
      period: 'Jan 2019 - Jul 2019',
      isCurrent: false,
      description: 'Developed secure internal applications to manage storage media permissions and enforce governance standards.',
      bulletPoints: [
        'Developed a secure internal application to manage storage media permissions using antivirus APIs.',
        'Strengthened understanding of data governance, access control, and regulatory compliance.',
      ],
      technologies: ['Python', 'Security APIs', 'Data Governance', 'Access Control'],
    },
  ],
};

export const experienceData: ExperienceItem[] = experienceDataByLang.es;

export const servicesDataByLang: Record<Language, ServiceItem[]> = {
  es: [
    {
      id: 'srv-pipelines',
      title: 'Pipelines ETL & Apache Airflow',
      description: 'Diseño, orquestación y mantenimiento de pipelines de datos automatizados procesando millones de registros hacia Google BigQuery.',
      iconName: 'Layers',
      deliverables: [
        'Pipelines ETL/ELT con Python y Apache Airflow',
        'Optimización de cargas masivas (GCS a BigQuery con AVRO)',
        'Automatización de reportes e ingestión vía APIs o archivos',
        'Validación de datos automatizada con scripts en Pandas',
      ],
    },
    {
      id: 'srv-backend',
      title: 'Desarrollo Backend & Microservicios',
      description: 'Construcción de APIs RESTful y servicios robustos en Python (Django, FastAPI) con arquitecturas desacopladas y escalables.',
      iconName: 'Server',
      deliverables: [
        'Arquitectura de microservicios y migración de monolitos',
        'APIs RESTful seguras con autenticación y validación',
        'Optimización avanzada de consultas SQL y PostgreSQL',
        'Pruebas automatizadas y estándares de clean code',
      ],
    },
    {
      id: 'srv-devops',
      title: 'DevOps, Docker & CI/CD en GCP',
      description: 'Automatización de despliegues en la nube con Terraform, contenedores Docker y flujos CI/CD para máxima velocidad.',
      iconName: 'Terminal',
      deliverables: [
        'Infraestructura como código con Terraform en GCP',
        'Contenedores Docker optimizados y seguros',
        'Pipelines de CI/CD con GitHub Actions y Jenkins',
        'Reducción drástica de tiempos de despliegue a producción',
      ],
    },
    {
      id: 'srv-fullstack',
      title: 'Desarrollo Web & Dashboards Modernos',
      description: 'Creación de aplicaciones web responsivas y paneles interactivos integrados con bases de datos y microservicios.',
      iconName: 'Globe',
      deliverables: [
        'Aplicaciones SPA con React, TypeScript y Tailwind CSS',
        'Dashboards analíticos para visualización de KPIs',
        'Integración con APIs y servicios en la nube',
        'Optimización de rendimiento y experiencia de usuario',
      ],
    },
  ],
  en: [
    {
      id: 'srv-pipelines',
      title: 'ETL Pipelines & Apache Airflow',
      description: 'Design, orchestration, and maintenance of automated data pipelines processing millions of daily records into Google BigQuery.',
      iconName: 'Layers',
      deliverables: [
        'ETL/ELT pipelines with Python and Apache Airflow',
        'Bulk load optimization (GCS to BigQuery using AVRO)',
        'Automated reporting and data ingestion via APIs or files',
        'Automated data validation with Pandas-based scripts',
      ],
    },
    {
      id: 'srv-backend',
      title: 'Backend Development & Microservices',
      description: 'Building robust RESTful APIs and backend services in Python (Django, FastAPI) with scalable decoupled architectures.',
      iconName: 'Server',
      deliverables: [
        'Microservices architecture and monolith migration',
        'Secure RESTful APIs with authentication and validation',
        'Advanced SQL and PostgreSQL query optimization',
        'Automated testing and clean code standards',
      ],
    },
    {
      id: 'srv-devops',
      title: 'DevOps, Docker & GCP CI/CD',
      description: 'Cloud deployment automation using Terraform, Docker containers, and CI/CD workflows for maximum delivery speed.',
      iconName: 'Terminal',
      deliverables: [
        'Infrastructure as Code with Terraform on GCP',
        'Optimized and secure Docker containerization',
        'CI/CD pipelines with GitHub Actions and Jenkins',
        'Drastic reduction in production deployment lead times',
      ],
    },
    {
      id: 'srv-fullstack',
      title: 'Web Development & Modern Dashboards',
      description: 'Creation of responsive web apps and interactive dashboards integrated with backend microservices and databases.',
      iconName: 'Globe',
      deliverables: [
        'SPA applications with React, TypeScript, and Tailwind CSS',
        'Analytical dashboards for KPI visualization',
        'Seamless integration with cloud APIs and services',
        'High performance and exceptional user experience',
      ],
    },
  ],
};

export const servicesData: ServiceItem[] = servicesDataByLang.es;
