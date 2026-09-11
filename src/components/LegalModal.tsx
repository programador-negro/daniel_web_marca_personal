import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'cookies' | 'terms' | 'notice';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const { isSpanish } = useLanguage();
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies' | 'terms' | 'notice'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-10 my-auto shadow-2xl relative text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isSpanish ? 'Información Legal y Privacidad' : 'Legal & Privacy Information'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                danielib.com • Daniel Ibarra (@programador-negro)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'cookies'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {isSpanish ? 'Política de Cookies' : 'Cookie Policy'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {isSpanish ? 'Términos del Servicio' : 'Terms of Service'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notice')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'notice'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {isSpanish ? 'Aviso Legal' : 'Legal Notice'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-slate-900 text-base font-bold">1. Responsable del Tratamiento</h4>
              <p>
                El titular y responsable del tratamiento de los datos recabados en este sitio web (<strong className="text-cyan-800 font-bold">danielib.com</strong>) es Daniel Ibarra, desarrollador de software y analista independiente. Contacto directo: <code className="text-cyan-800 font-semibold">daniel.ibarra.dev@gmail.com</code>.
              </p>
              <h4 className="text-slate-900 text-base font-bold">2. Finalidad de la Recolección de Datos</h4>
              <p>
                Los datos personales proporcionados a través de formularios de cotización o contacto (nombre, correo corporativo, empresa y requerimientos del proyecto) se utilizan exclusivamente para responder solicitudes comerciales, enviar presupuestos y coordinar llamadas técnicas de descubrimiento. No se venden, ceden ni comparten con terceros con fines publicitarios.
              </p>
              <h4 className="text-slate-900 text-base font-bold">3. Base Legal y Derechos del Usuario (RGPD / CCPA)</h4>
              <p>
                La base legal es el consentimiento explícito del usuario al enviar la información o al solicitar el Lead Magnet gratuito. Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación u oposición enviando un correo a <code className="text-cyan-800 font-semibold">daniel.ibarra.dev@gmail.com</code>.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-3">
              <h4 className="text-slate-900 text-base font-bold">Uso de Cookies y Telemetría Técnica</h4>
              <p>
                Este sitio web utiliza cookies técnicas indispensables para garantizar su funcionamiento, seguridad y rapidez de carga. También puede emplear métricas agregadas anónimas (país aproximado, tipo de dispositivo) para medir el rendimiento de la web sin identificar personalmente a los usuarios.
              </p>
              <p>
                Puedes desactivar o bloquear las cookies en cualquier momento a través de la configuración de tu navegador web (Chrome, Firefox, Safari, Edge).
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-slate-900 text-base font-bold">Términos de Contratación y Propiedad Intelectual</h4>
              <p>
                1. <strong className="text-slate-900">Cotizaciones:</strong> Las estimaciones generadas en el cotizador interactivo tienen carácter informativo y preliminar. Una propuesta formal y vinculante se formaliza tras una llamada técnica y la firma de la orden de trabajo correspondiente.
              </p>
              <p>
                2. <strong className="text-slate-900">Propiedad del Código:</strong> Tras la liquidación final de cada proyecto, el cliente recibe la propiedad intelectual íntegra del código fuente desarrollado y sus artefactos asociados.
              </p>
              <p>
                3. <strong className="text-slate-900">Confidencialidad:</strong> Cualquier información corporativa compartida por agencias o clientes está protegida bajo estándares estrictos de confidencialidad y acuerdos bilaterales (NDA).
              </p>
            </div>
          )}

          {activeTab === 'notice' && (
            <div className="space-y-3">
              <h4 className="text-slate-900 text-base font-bold">Aviso Legal y Cumplimiento de Servidor</h4>
              <p>
                El dominio <strong className="text-slate-900">danielib.com</strong> es de titularidad privada. El sitio web se encuentra alojado y securizado en entornos VPS de alta disponibilidad con cifrado TLS/SSL activo, cabeceras estrictas de seguridad (HSTS, CSP, X-Frame-Options) y protección contra abusos.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
