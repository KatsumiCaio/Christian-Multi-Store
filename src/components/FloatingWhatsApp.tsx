import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_INFO } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá Christian! Vi os produtos no site da Christian Multi Store e gostaria de tirar uma dúvida.'
    );
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Balloon Tooltip */}
      {showTooltip && (
        <div className="relative bg-[#131522] border border-[#25D366]/40 text-white px-3.5 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(37,211,102,0.25)] text-xs flex items-center gap-3 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="font-semibold text-slate-200">
              Dúvidas? Fale com <strong className="text-[#25D366]">Christian</strong>
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#131522] border-r border-b border-[#25D366]/40 transform rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={openWhatsApp}
        aria-label="Chamar Christian no WhatsApp"
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:shadow-[0_0_35px_rgba(37,211,102,0.8)] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
      >
        <WhatsAppIcon className="w-7 h-7 fill-white" />
        <span className="sr-only">WhatsApp</span>
        
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
      </button>
    </div>
  );
};
