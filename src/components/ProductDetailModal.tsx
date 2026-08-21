import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Plus, Minus, Check, ShieldCheck, Truck, Zap, Share2, Copy } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleDirectWhatsApp = () => {
    if (!product) return;
    const totalItemPrice = product.price * quantity;
    const text = encodeURIComponent(
      `Olá Christian! Gostaria de comprar o produto direto pelo WhatsApp:\n- ${quantity}x ${product.name} (R$ ${totalItemPrice.toFixed(2).replace('.', ',')})\n\nPor favor, me informe o valor do frete e opções de pagamento!`
    );
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleShareProduct = async () => {
    if (!product) return;

    const shareTitle = `${product.name} | Christian Multi Store`;
    const shareText = `Olha esse ${product.name} por R$ ${product.price.toFixed(2).replace('.', ',')} na Christian Multi Store!`;
    const shareUrl = window.location.origin + window.location.pathname;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        // Se o usuário cancelou o diálogo de compartilhamento, não faz fallback para cópia
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copiar dados formatados para a Área de Transferência
    try {
      const clipboardContent = `${shareText}\nConfira aqui: ${shareUrl}`;
      await navigator.clipboard.writeText(clipboardContent);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    } catch (err) {
      console.error('Falha ao copiar link:', err);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card with Jakub Krehel Enter/Exit Polish */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(2px)' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="relative w-full max-w-3xl bg-[#13151F] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] z-10 my-auto glass"
          >
            {/* Top Action Bar: Share & Close */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {/* Share Button with Live Feedback */}
              <button
                onClick={handleShareProduct}
                title="Compartilhar produto"
                aria-label="Compartilhar produto com amigos ou redes sociais"
                className={`h-9 px-3 rounded-full flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.95] text-xs font-bold ${
                  isCopied
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#090A0F]/90 text-slate-300 hover:text-[#00E5FF] hover:bg-white/10 border border-white/10'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    <span className="text-[11px] font-black text-emerald-400">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-300 group-hover:text-[#00E5FF]" />
                    <span className="hidden sm:inline text-[11px] font-medium text-slate-300">Compartilhar</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Fechar detalhes"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#090A0F]/90 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer active:scale-[0.95]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
              {/* Left Column: Image & Badges */}
              <div className="relative bg-[#090A0F] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden border border-white/5 bg-[#0D0E15]">
                  <ImageWithSkeleton
                    src={product.image}
                    alt={product.name}
                    aspectRatioClass="aspect-square"
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Guarantee badges box */}
                <div className="w-full mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-slate-300 font-bold">
                    <Truck className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span className="text-[11px] leading-tight">Envio Brasil</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-slate-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px] leading-tight">90D Garantia</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Specs & Buy Controls */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between pr-20 sm:pr-28">
                    <span className="text-xs uppercase tracking-widest text-[#00E5FF] font-black">
                      {product.categoryName}
                    </span>
                    <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount} avaliações)</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-white leading-tight tracking-tight">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="p-4 rounded-2xl bg-[#090A0F] border border-white/10 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through block font-semibold">
                          De R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-[#00E5FF] font-black">R$</span>
                        <span className="text-2xl sm:text-3xl font-black text-[#00E5FF] tracking-tight">
                          {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-[10px] uppercase tracking-wider">
                        5% OFF PIX
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">ou até 12x no cartão</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Highlights & Features */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-black text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
                      Especificações Técnicas:
                    </span>
                    <div className="space-y-1.5">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="text-xs text-slate-300 font-medium flex items-start gap-2">
                          <span className="text-[#00E5FF] font-bold">✓</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compatibility info if exists */}
                  {product.compatibility && (
                    <div className="p-3.5 rounded-2xl bg-[#181B26] border border-white/5 text-xs text-slate-300">
                      <strong className="text-white block mb-0.5 font-extrabold">Compatibilidade:</strong>
                      {product.compatibility}
                    </div>
                  )}
                </div>

                {/* Quantity and Actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Quantidade:</span>
                    <div className="flex items-center bg-[#090A0F] border border-white/10 rounded-2xl p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 cursor-pointer active:scale-[0.95]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer active:scale-[0.95]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAdd}
                      className={`w-full py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] ${
                        isAdded
                          ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                          : 'bg-[#00E5FF] hover:bg-[#33ebff] text-black shadow-[0_0_25px_rgba(0,229,255,0.35)]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Adicionar ao Pedido</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDirectWhatsApp}
                      className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Pedir no WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

