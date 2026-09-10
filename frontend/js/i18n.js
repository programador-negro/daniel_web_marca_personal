// TRANSLATION OBJECT with ALL keys used in HTML data-i18n attributes
const translations = {
  es: {
    // Banner
    banner_text: "¡Qué gusto conocerte en USA! Construyamos algo escalable juntos.",
    // Nav
    nav_solutions: "Soluciones",
    nav_impact: "Impacto",
    nav_process: "Proceso",
    nav_contact: "Contacto",
    nav_cta: "Agendar Consulta",
    // Hero
    hero_badge: "Remoto | Disponible en EST / CST",
    hero_title: "Construyo el software y las automatizaciones que hacen escalar tu negocio",
    hero_subtitle: "Ingeniería de Software · Ingeniería de Datos · Automatización de Procesos",
    hero_cta_primary: "Agendar Consulta",
    hero_cta_secondary: "Chat por WhatsApp",
    // Impact
    impact_title: "Impacto en el Negocio",
    impact_subtitle: "Resultados medibles que generan retorno",
    impact_1_number: "+20h",
    impact_1_label: "Horas Ahorradas por Semana",
    impact_1_desc: "Eliminé la entrada manual de datos construyendo flujos de trabajo serverless autónomos e integraciones de APIs.",
    impact_2_number: "45%",
    impact_2_label: "Reducción de Costos en la Nube",
    impact_2_desc: "Audité y rediseñé pipelines legados para migrar a cargas de trabajo Docker eficientes y multi-etapa.",
    impact_3_number: "0",
    impact_3_label: "Despliegues sin Downtime",
    impact_3_desc: "Diseñé pipelines ETL/ELT escalables procesando millones de filas con manejo robusto de errores.",
    // Solutions
    solutions_title: "Soluciones",
    solutions_subtitle: "Ingeniería integral para negocios modernos",
    solution_1_title: "Desarrollo Web y Software a Medida",
    solution_1_desc: "Sitios web ultra-rápidos, plataformas escalables y MVPs construidos con frameworks modernos y mejores prácticas.",
    solution_2_title: "Automatización de Negocios",
    solution_2_desc: "Integración de APIs, optimización de flujos de trabajo y eliminación de tareas manuales para recuperar el tiempo de tu equipo.",
    solution_3_title: "Ingeniería de Datos",
    solution_3_desc: "Pipelines ETL, paneles de analítica visual y estructuración de datos para la toma de decisiones informada.",
    // Process
    process_title: "Cómo Trabajo",
    process_subtitle: "Un proceso simplificado de 3 pasos diseñado para claridad y velocidad",
    step_1_title: "Llamada de Descubrimiento",
    step_1_desc: "Entender las necesidades de tu negocio, cuellos de botella y objetivos de crecimiento para identificar oportunidades de alto impacto.",
    step_2_title: "Arquitectura y Plan",
    step_2_desc: "Diseñar la solución técnica óptima con total transparencia — selección de stack, cronograma y entregables.",
    step_3_title: "Ejecución y Despliegue",
    step_3_desc: "Desarrollo ágil con despliegues containerizados, optimización continua y soporte permanente.",
    // Stack
    stack_title: "Stack Tecnológico",
    certs_title: "Certificaciones",
    // Contact
    contact_title: "¿Listo para optimizar tu negocio? Hablemos.",
    contact_sub: "Envíame un mensaje y exploremos cómo escalar tus operaciones.",
    form_name: "Tu nombre",
    form_email: "Tu correo electrónico",
    form_message: "Cuéntame sobre tu proyecto...",
    form_submit: "Enviar Mensaje",
    // Footer
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    banner_text: "Great meeting you in the US! Let's build something scalable together.",
    nav_solutions: "Solutions",
    nav_impact: "Impact",
    nav_process: "Process",
    nav_contact: "Contact",
    nav_cta: "Schedule a Call",
    hero_badge: "Remote Ready | Available in EST / CST",
    hero_title: "I build the software and automations that scale your business",
    hero_subtitle: "Software Engineering · Data Engineering · Process Automation",
    hero_cta_primary: "Schedule a Call",
    hero_cta_secondary: "Chat on WhatsApp",
    impact_title: "Business Impact",
    impact_subtitle: "Measurable results that drive ROI",
    impact_1_number: "+20h",
    impact_1_label: "Weekly Hours Saved",
    impact_1_desc: "Eliminated manual data entry by building autonomous serverless workflows and API integrations.",
    impact_2_number: "45%",
    impact_2_label: "Cloud Cost Reduction",
    impact_2_desc: "Audited and re-architected legacy pipelines to migrate to efficient, multi-stage Docker workloads.",
    impact_3_number: "0",
    impact_3_label: "Zero-Downtime Deploys",
    impact_3_desc: "Designed scalable ETL/ELT pipelines processing millions of rows seamlessly with robust error handling.",
    solutions_title: "Solutions",
    solutions_subtitle: "End-to-end engineering for modern businesses",
    solution_1_title: "Custom Web & Software Development",
    solution_1_desc: "Ultra-fast websites, scalable platforms, and MVPs built with modern frameworks and best practices.",
    solution_2_title: "Business Automation",
    solution_2_desc: "API integrations, workflow optimization, and elimination of manual tasks to reclaim your team's time.",
    solution_3_title: "Data Engineering",
    solution_3_desc: "ETL pipelines, visual analytics dashboards, and data structuring for informed decision-making.",
    process_title: "How I Work",
    process_subtitle: "A streamlined 3-step process designed for clarity and speed",
    step_1_title: "Discovery Call",
    step_1_desc: "Understanding your business needs, bottlenecks, and growth goals to identify the highest-impact opportunities.",
    step_2_title: "Architecture & Blueprint",
    step_2_desc: "Designing the optimal technical solution with full transparency — stack selection, timeline, and deliverables.",
    step_3_title: "Execution & Deployment",
    step_3_desc: "Agile development with containerized deployments, continuous optimization, and ongoing support.",
    stack_title: "Tech Stack",
    certs_title: "Certifications",
    contact_title: "Ready to optimize your business? Let's talk.",
    contact_sub: "Send me a message and let's explore how to scale your operations.",
    form_name: "Your name",
    form_email: "Your email",
    form_message: "Tell me about your project...",
    form_submit: "Send Message",
    footer_rights: "All rights reserved."
  }
};

// WhatsApp messages per language
const whatsappMessages = {
  es: "Hola%20Daniel%2C%20vi%20tu%20sitio%20web%20danielib.com%20y%20me%20interesa%20agendar%20una%20consulta%20para%20un%20proyecto%20de%20desarrollo%2Fautomatizaci%C3%B3n.",
  en: "Hello%20Daniel%2C%20I%20saw%20your%20website%20danielib.com%20and%20I'm%20interested%20in%20scheduling%20a%20consultation%20for%20a%20development%2Fautomation%20project."
};

let currentLang = 'es';

function updateWhatsAppLinks(lang) {
  const msg = whatsappMessages[lang];
  const url = `https://wa.me/573007758033?text=${msg}`;
  // Update all WhatsApp links
  const heroWa = document.getElementById('hero-whatsapp');
  const footerWa = document.getElementById('footer-whatsapp');
  if (heroWa) heroWa.href = url;
  if (footerWa) footerWa.href = url;
}

function updateTranslations(lang) {
  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  // Update html lang attribute
  document.documentElement.lang = lang;
  // Update lang selector buttons (desktop + mobile)
  ['', 'mobile-'].forEach(prefix => {
    const esBtn = document.getElementById(`${prefix}lang-es`);
    const enBtn = document.getElementById(`${prefix}lang-en`);
    if (esBtn) esBtn.classList.toggle('active', lang === 'es');
    if (enBtn) enBtn.classList.toggle('active', lang === 'en');
  });
  // Update WhatsApp links
  updateWhatsAppLinks(lang);
  currentLang = lang;
}

window.setLanguage = function(lang) {
  if (!translations[lang]) return;
  localStorage.setItem('language', lang);
  updateTranslations(lang);
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Check for ?ref=us parameter
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  
  let initialLang;
  
  if (ref === 'us') {
    // Force English and show banner
    initialLang = 'en';
    localStorage.setItem('language', 'en');
    const banner = document.getElementById('us-banner');
    if (banner) banner.classList.remove('hidden');
  } else {
    // Use saved preference or default to Spanish
    initialLang = localStorage.getItem('language') || 'es';
  }
  
  updateTranslations(initialLang);
});
