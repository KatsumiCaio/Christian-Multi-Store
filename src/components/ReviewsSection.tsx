import React from 'react';
import { Star, CheckCircle, Instagram } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { STORE_INFO } from '../data/products';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-16 md:py-20 bg-[#0D0E17]/60 border-y border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/30 text-xs font-bold text-[#A855F7]">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span className="uppercase tracking-wider text-[10px]">Avaliações Verificadas 5.0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-normal">
              Confira os relatos reais de quem comprou e comprovou a procedência, agilidade e qualidade da Christian Multi Store.
            </p>
          </div>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] border border-pink-500/30 hover:border-pink-500/60 text-slate-200 hover:text-pink-300 transition-all text-xs font-black uppercase tracking-wider shrink-0 self-start md:self-auto glass active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@{STORE_INFO.instagram}</span>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-[#13151F]/90 border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] glass"
            >
              <div className="space-y-3">
                {/* Rating stars & verified tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] text-emerald-400 font-black uppercase tracking-wider flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    Verificado
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-normal">
                  "{review.comment}"
                </p>
              </div>

              {/* Customer footer */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00E5FF]/40 shrink-0">
                  <ImageWithSkeleton
                    src={review.avatar}
                    alt={review.name}
                    aspectRatioClass="aspect-square"
                    className="w-full h-full"
                    imageClassName="rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-white truncate">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-[#00E5FF] font-bold">
                    {review.city} • <span className="text-slate-500 font-normal">{review.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

