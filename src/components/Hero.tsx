import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Instagram, Zap, Award, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { STORE_INFO } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenWhatsApp }) => {
  return (
    <section id="inicio" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber Grid Subtle Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00e5ff 1px, transparent 1px), linear-gradient(to bottom, #00e5ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Call to Action (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Tag / Instagram proof */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131726] border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.15)] text-xs font-semibold text-cyan-300">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>+{STORE_INFO.followers} Seguidores • @{STORE_INFO.instagram}</span>
            </div>

            {/* Main Headline with Bold Typography */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white">
                CHRISTIAN<br />
                <span className="text-[#00E5FF] italic drop-shadow-[0_0_25px_rgba(0,229,255,0.45)]">
                  MULTI STORE.
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
                E-commerce premium de alta performance. Especialistas em <strong className="text-white font-bold">PlayStation, Xbox, Fones e Smartwatches</strong> com envio ágil para todo o Brasil.
              </p>
            </div>

            {/* Authority Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 glass">
                <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>Garantia de 90 Dias</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 glass">
                <Zap className="w-4 h-4 text-[#A855F7] shrink-0" />
                <span>Envio Ágil com Rastreio</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 glass">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Originais & Testados</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#00E5FF] hover:bg-[#33ebff] text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explorar Catálogo & Pedir</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-whatsapp-btn"
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chamar no WhatsApp</span>
              </button>
            </div>

            {/* Payment & Security micro text */}
            <div className="pt-1 text-slate-400 text-xs flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pague via PIX com desconto ou Cartão em até 12x</span>
            </div>
          </div>

          {/* Right Visual Card & Logo Ring Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 rounded-3xl blur-2xl transform rotate-1 scale-95" />
              
              {/* Showcase Tech Card */}
              <div className="relative rounded-3xl bg-[#13151F]/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
                
                {/* Visual Emblem Center */}
                <div className="flex flex-col items-center justify-center text-center py-4">
                  <Logo size="xl" />
                  
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest font-bold">
                      Loja Oficial • Brasil
                    </span>
                  </div>
                </div>

                {/* Fast Categories Highlight Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-[#090A0F]/80 border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xl">🎮</span>
                    <span className="text-xs font-bold text-white mt-1">PS5 & Xbox</span>
                    <span className="text-[10px] text-slate-400">Controles & Acessórios</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090A0F]/80 border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xl">🎧</span>
                    <span className="text-xs font-bold text-white mt-1">Fones TWS & Gamer</span>
                    <span className="text-[10px] text-slate-400">ANC & Surround 7.1</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090A0F]/80 border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xl">⌚️</span>
                    <span className="text-xs font-bold text-white mt-1">Smartwatches</span>
                    <span className="text-[10px] text-slate-400">Tela AMOLED HD</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090A0F]/80 border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xl">⚡</span>
                    <span className="text-xs font-bold text-white mt-1">Carregadores GaN</span>
                    <span className="text-[10px] text-slate-400">Turbo PD 35W/65W</span>
                  </div>
                </div>

                {/* Direct support guarantee footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Atendimento Humanizado</span>
                  <span className="text-cyan-400 font-semibold">Garantia e NF</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
