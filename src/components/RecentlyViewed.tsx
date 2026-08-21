import React from 'react';
import { Eye, ShoppingBag, X, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface RecentlyViewedProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClearHistory: () => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onClearHistory,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 relative border-t border-white/5 bg-[#090A0F]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Vistos Recentemente</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                  {products.length} {products.length === 1 ? 'item' : 'itens'}
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Produtos que você consultou nesta sessão
              </p>
            </div>
          </div>

          <button
            onClick={onClearHistory}
            className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
            title="Limpar histórico de visualização"
          >
            <X className="w-3 h-3" />
            <span>Limpar histórico</span>
          </button>
        </div>

        {/* Horizontal scroll / grid list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group relative rounded-2xl bg-[#13151F]/80 border border-white/10 hover:border-[#00E5FF]/40 p-3 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.12)] hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-square rounded-xl bg-[#0D0E15] overflow-hidden mb-2.5">
                <ImageWithSkeleton
                  src={product.image}
                  alt={product.name}
                  aspectRatioClass="aspect-square"
                  imageClassName="group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <span className="absolute top-1.5 left-1.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#00E5FF] border border-[#00E5FF]/20">
                  {product.categoryName.split(' ')[0]}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] text-[#00E5FF] font-bold">R$</span>
                  <span className="text-xs sm:text-sm font-black text-[#00E5FF]">
                    {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="mt-2.5 w-full py-1.5 px-2 rounded-xl bg-white/5 hover:bg-[#00E5FF] text-slate-300 hover:text-black font-extrabold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 border border-white/10 hover:border-transparent active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Adicionar</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
