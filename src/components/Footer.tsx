import React from 'react';
import { Instagram, MessageCircle, ShieldCheck, Truck, Clock, MapPin, QrCode, CreditCard, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { STORE_INFO, CATEGORIES } from '../data/products';

interface FooterProps {
  onSelectCategory: (categoryId: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá Christian! Gostaria de mais informações sobre os produtos da Christian Multi Store.');
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#07080D] border-t border-white/10 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" showTextBeside={true} />
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              Sua loja especializada em games, fones bluetooth de alta performance, smartwatches e acessórios premium. Atendimento consultivo e envio para todo o Brasil.
            </p>

            <div className="pt-2 space-y-2 text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>{STORE_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>Atendimento Seg a Sáb: 08h às 21h</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#13151F] border border-white/10 hover:border-pink-500/50 text-slate-300 hover:text-pink-400 transition-all flex items-center gap-2 font-black text-xs"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@{STORE_INFO.instagram}</span>
              </a>

              <button
                onClick={openWhatsApp}
                className="p-3 rounded-2xl bg-[#13151F] border border-white/10 hover:border-[#25D366]/50 text-slate-300 hover:text-[#25D366] transition-all flex items-center gap-2 font-black text-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{STORE_INFO.whatsappFormatted}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categorias rápidas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest">
              Categorias em Destaque
            </h4>
            <ul className="space-y-2 font-medium">
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#catalogo"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#00E5FF] text-[10px]">›</span>
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('video-games')}
                  className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 font-bold text-[#00E5FF]"
                >
                  <span className="text-[#00E5FF] text-[10px]">›</span>
                  <span>Vídeo Games & Controles</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ajuda e Segurança (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest">
              Segurança & Ajuda
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#diferenciais" className="hover:text-[#00E5FF] transition-colors">
                  Garantia de 90 Dias
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#00E5FF] transition-colors">
                  Envio e Rastreio
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-[#00E5FF] transition-colors">
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00E5FF] transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Pagamentos & Selos (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-black text-white text-xs uppercase tracking-widest">
              Formas de Pagamento
            </h4>
            
            <div className="p-4 rounded-3xl bg-[#13151F] border border-white/5 space-y-2.5 glass">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                <QrCode className="w-4 h-4" />
                <span>PIX Instantâneo (5% de Desconto)</span>
              </div>
              <div className="flex items-center gap-2 text-[#00E5FF] font-black text-xs">
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito em até 12x</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-white/5">
                Transações 100% protegidas e criptografadas.
              </p>
            </div>

            <div className="flex items-center gap-2 p-3.5 rounded-3xl bg-[#13151F] border border-white/10 text-xs text-slate-300 glass">
              <ShieldCheck className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <span className="text-[11px] leading-tight font-medium">
                Loja Verificada com +2.400 clientes satisfeitos em todo o Brasil.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name} ({STORE_INFO.owner}). Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <span>🇧🇷 Envio Nacional para todos os estados</span>
            <span>•</span>
            <span className="text-[#00E5FF] font-bold">Tech & Gamer Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
