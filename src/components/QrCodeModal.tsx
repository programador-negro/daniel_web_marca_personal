import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, X, Download, Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const { isSpanish } = useLanguage();
  const qrRef = useRef<HTMLCanvasElement>(null);
  
  // Target URL pointing directly to official domain
  const targetUrl = "https://danielib.com";

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "daniel-ibarra-portafolio-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-sm print:bg-white print:p-0">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-100 shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:h-screen print:flex print:flex-col print:items-center print:justify-center">
        {/* Header (Hidden when printing) */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-transparent print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
              <QrCode className="w-4 h-4" />
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900">
              {isSpanish ? 'Código QR para Tarjetas' : 'Business Card QR Code'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Content */}
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 print:border-0 print:shadow-none">
            <QRCodeCanvas 
              id="portfolio-qr-code"
              value={targetUrl} 
              size={200}
              level={"H"}
              includeMargin={true}
              ref={qrRef}
            />
          </div>
          
          <h4 className="mt-4 text-base font-semibold text-slate-900 tracking-wider uppercase font-mono">Daniel Ibarra</h4>
          <p className="text-xs font-mono font-medium text-slate-800 mt-0.5 mb-1">{targetUrl}</p>
          <p className="text-[11px] text-slate-500 font-light text-center max-w-[220px] leading-relaxed print:hidden">
            {isSpanish ? 'Escanea para visitar mi portafolio web interactivo.' : 'Scan to visit my interactive web portfolio.'}
          </p>
          <p className="hidden print:block text-sm text-slate-500 mt-2 font-mono">
            {targetUrl}
          </p>
        </div>

        {/* Actions (Hidden when printing) */}
        <div className="p-4 border-t border-slate-100 bg-transparent flex gap-3 print:hidden">
          <button
            onClick={handleDownload}
            className="flex-1 btn-ios-dark flex items-center justify-center gap-2 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isSpanish ? 'Descargar PNG' : 'Download PNG'}
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 btn-ios-secondary flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-950 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            {isSpanish ? 'Imprimir' : 'Print'}
          </button>
        </div>
      </div>
    </div>
  );
};
