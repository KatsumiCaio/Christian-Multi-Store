import React from 'react';
import { Instagram, Users, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const InstagramBanner: React.FC = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#131522]/90 border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl glass">
          
          {/* Neon background ring glow */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-gradient-to-tl from-pink-600/20 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090A0F] border border-pink-500/40 text-xs font-bold text-pink-300">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="uppercase tracking-wider text-[10px]">Perfil Oficial • Instagram</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                Siga <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-[#00E5FF]">@{STORE_INFO.instagram}</span> e Acompanhe os Envios!
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal">
                Mais de <strong className="text-white font-extrabold">+{STORE_INFO.followers} seguidores</strong> acompanham nossos stories diários com novidades, unboxing de controles e comprovantes de rastreamento para todo o Brasil.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5 bg-[#090A0F]/80 px-3.5 py-2 rounded-2xl border border-white/5">
                  <Users className="w-4 h-4 text-[#00E5FF]" />
                  Comunidade Gamer Ativa
                </span>
                <span className="flex items-center gap-1.5 bg-[#090A0F]/80 px-3.5 py-2 rounded-2xl border border-white/5">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  Promoções Exclusivas nos Stories
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-[#00E5FF] hover:opacity-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
                <span>Seguir no Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
