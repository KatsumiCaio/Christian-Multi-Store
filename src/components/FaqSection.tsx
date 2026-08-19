import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faq';
import { STORE_INFO } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('Olá Christian! Tenho uma dúvida sobre a compra e gostaria de falar com você.');
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00E5FF] font-black">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Perguntas & Respostas
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto font-normal">
            Tudo o que você precisa saber sobre envios rápidos, garantia de 90 dias, formas de pagamento e suporte.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden glass ${
                  isOpen
                    ? 'bg-[#131522]/90 border-[#00E5FF]/40 shadow-[0_0_25px_rgba(0,229,255,0.12)]'
                    : 'bg-[#13151F]/70 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
                    <span className={`text-sm sm:text-base font-black font-heading tracking-tight ${isOpen ? 'text-white' : 'text-slate-200'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded-xl bg-[#090A0F] text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#00E5FF]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#13151F]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left glass">
          <div className="space-y-1">
            <h4 className="text-base font-black text-white font-heading tracking-tight">Ainda ficou com alguma dúvida?</h4>
            <p className="text-xs text-slate-400 font-normal">
              Chame o Christian agora no WhatsApp e tire todas as suas dúvidas em minutos.
            </p>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] shrink-0 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar no WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
