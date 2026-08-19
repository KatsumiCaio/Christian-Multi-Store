import React from 'react';
import { Truck, ShieldCheck, MessageCircle, CreditCard, Award, CheckCircle } from 'lucide-react';

export const Diferenciais: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Envio Seguro para Todo o Brasil',
      desc: 'Postagens diárias via Correios e Transportadoras com código de rastreamento enviado diretamente no seu WhatsApp.',
      badge: 'Nacional',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'Produtos 100% Testados com Garantia',
      desc: 'Cada item passa por rigoroso controle de qualidade antes do envio. Todos contam com 90 dias de garantia contra defeitos.',
      badge: '90D Garantia',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
      title: 'Atendimento Consultivo com Especialista',
      desc: 'Fale diretamente com o Christian no WhatsApp para tirar dúvidas de compatibilidade, áudio e recomendações para seu setup.',
      badge: 'Suporte VIP',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      title: 'Pagamento Flexível & Facilitado',
      desc: 'Pague via PIX com 5% de desconto especial e confirmação imediata, ou parcele no cartão de crédito em até 12 vezes.',
      badge: 'Pix ou Cartão',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#00E5FF] font-black">
            Por que comprar conosco?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Excelência & Confiança Gamer
          </h2>
          <p className="text-sm text-slate-400 font-normal">
            Na Christian Multi Store, você garante tranquilidade com produtos 100% testados, garantia real de 90 dias e suporte consultivo.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-[#13151F]/90 border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col justify-between glass"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#090A0F] border border-white/10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-white font-heading group-hover:text-[#00E5FF] transition-colors tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#00E5FF] font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Compromisso Oficial</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
