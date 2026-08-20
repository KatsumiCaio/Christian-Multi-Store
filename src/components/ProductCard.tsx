import React, { useState } from 'react';
import { Star, Plus, Check, Eye, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1800);
    }, 250);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Gamer Choice':
        return 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30';
      case 'Mais Vendido':
        return 'bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/30';
      case 'Pronta Entrega':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Oferta Especial':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  const openWhatsAppItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Olá Christian! Vi o produto "${product.name}" por R$ ${product.price.toFixed(2).replace('.', ',')} no site e gostaria de tirar uma dúvida/comprar.`
    );
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative rounded-3xl bg-[#13151F]/90 border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Top Image Container with Progressive Skeleton */}
      <div className="relative w-full aspect-square bg-[#0D0E15] overflow-hidden">
        <ImageWithSkeleton
          src={product.image}
          alt={product.name}
          aspectRatioClass="aspect-square"
          imageClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13151F] via-transparent to-transparent opacity-85 pointer-events-none" />

        {/* Badge with Bold uppercase style */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border backdrop-blur-md ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge === 'Gamer Choice' && <Zap className="w-3 h-3" />}
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Hover Button */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label="Ver detalhes rápidos"
            className="p-2 rounded-xl bg-[#090A0F]/90 backdrop-blur-md border border-white/15 text-white hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all active:scale-[0.95]"
            title="Ver detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock / Fast Shipping Badge at bottom of image */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] text-slate-300 font-bold z-10 pointer-events-none">
          <span className="flex items-center gap-1.5 text-emerald-400 bg-[#090A0F]/90 px-2.5 py-0.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            Estoque Pronto
          </span>
          <span className="flex items-center gap-1 text-cyan-300 bg-[#090A0F]/90 px-2 py-0.5 rounded-full border border-cyan-500/20 backdrop-blur-md">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            90D Garantia
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-black tracking-widest uppercase text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-black text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-slate-200">{product.rating}</span>
              <span className="text-[10px] text-slate-500 font-medium">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-black text-base text-white line-clamp-2 leading-snug group-hover:text-[#00E5FF] transition-colors tracking-tight">
            {product.name}
          </h3>

          {/* Quick Specs bullets */}
          <ul className="space-y-1 pt-1">
            {product.specs.slice(0, 2).map((spec, index) => (
              <li key={index} className="text-xs text-slate-400 font-medium flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
                <span className="truncate">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-white/5 space-y-3">
          {/* Price Block */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-semibold">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[#00E5FF] font-black">R$</span>
                <span className="text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight">
                  {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <span className="text-[10px] text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
              5% OFF PIX
            </span>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className={`sm:col-span-4 w-full py-3.5 px-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98] ${
                isAdded
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-[#00E5FF] hover:bg-[#33ebff] text-black shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]'
              }`}
            >
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Adicionado!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Pedir Agora</span>
                </>
              )}
            </button>

            <button
              onClick={openWhatsAppItem}
              title="Dúvida direta no WhatsApp"
              className="hidden sm:flex col-span-1 items-center justify-center rounded-2xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 text-slate-300 hover:text-[#25D366] transition-all p-2 cursor-pointer active:scale-[0.95]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

