import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Truck, 
  MessageCircle, 
  CreditCard, 
  QrCode, 
  Tag, 
  Check, 
  Loader2, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { CartItem, CustomerOrderInfo } from '../types';
import { STORE_INFO } from '../data/products';
import { fetchCepAddress, calculateShippingOptions, ShippingOption } from '../services/cep';
import { validateCoupon, Coupon } from '../data/coupons';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>({
    name: '',
    cep: '',
    street: '',
    neighborhood: '',
    cityState: '',
    paymentMethod: 'pix',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; cityState?: string }>({});
  
  // Shipping State
  const [cepInput, setCepInput] = useState('');
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  // Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = (subtotal * appliedCoupon.value) / 100;
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  // Shipping cost
  const shippingPrice = selectedShipping ? selectedShipping.price : 0;

  // Subtotal after coupon
  const subtotalAfterCoupon = Math.max(0, subtotal - couponDiscount);

  // PIX discount on subtotal after coupon
  const pixDiscount = customerInfo.paymentMethod === 'pix' ? subtotalAfterCoupon * 0.05 : 0;

  // Final Total
  const finalTotal = subtotalAfterCoupon - pixDiscount + shippingPrice;

  // Handle CEP Search
  const handleSearchCep = async () => {
    const cleanCep = cepInput.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError('Informe um CEP válido com 8 dígitos.');
      return;
    }

    setIsLoadingCep(true);
    setCepError('');

    try {
      const address = await fetchCepAddress(cleanCep);
      if (!address) {
        setCepError('CEP não encontrado. Verifique os números digitados.');
        setIsLoadingCep(false);
        return;
      }

      const formattedLocation = `${address.localidade} / ${address.uf}${address.bairro ? ` - ${address.bairro}` : ''}`;
      setCustomerInfo((prev) => ({
        ...prev,
        cep: cleanCep,
        street: address.logradouro || '',
        neighborhood: address.bairro || '',
        cityState: formattedLocation,
      }));

      // Calculate options
      const options = calculateShippingOptions(address.uf, subtotal);
      setShippingOptions(options);
      setSelectedShipping(options[0]); // Default to first (e.g. PAC or Free)
    } catch (err) {
      setCepError('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setIsLoadingCep(false);
    }
  };

  // Handle Apply Coupon with micro-loading
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setTimeout(() => {
      const result = validateCoupon(couponInput, subtotal);
      if (!result.isValid) {
        setCouponError(result.error || 'Cupom inválido');
        setAppliedCoupon(null);
      } else if (result.coupon) {
        setAppliedCoupon(result.coupon);
        setCouponError('');
      }
      setIsApplyingCoupon(false);
    }, 300);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; cityState?: string } = {};
    if (!customerInfo.name.trim()) {
      errors.name = 'Por favor, informe seu nome';
    }
    if (!customerInfo.cityState.trim()) {
      errors.cityState = 'Informe seu CEP ou Cidade / UF para envio';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Build the structured WhatsApp message
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (R$ ${(
            item.product.price * item.quantity
          )
            .toFixed(2)
            .replace('.', ',')})`
      )
      .join('\n');

    const paymentText =
      customerInfo.paymentMethod === 'pix'
        ? 'PIX (5% de desconto à vista)'
        : 'Cartão de Crédito (em até 12x)';

    let message = `Olá Christian! Gostaria de fechar o seguinte pedido na *Christian Multi Store*:\n\n${itemsList}\n\n`;
    message += `💰 *Subtotal dos Produtos:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;

    if (appliedCoupon && couponDiscount > 0) {
      message += `🎟️ *Cupom Aplicado (${appliedCoupon.code}):* -R$ ${couponDiscount.toFixed(2).replace('.', ',')}\n`;
    }

    if (customerInfo.paymentMethod === 'pix') {
      message += `⚡ *Desconto PIX (5%):* -R$ ${pixDiscount.toFixed(2).replace('.', ',')}\n`;
    }

    if (selectedShipping) {
      message += `🚚 *Frete (${selectedShipping.name}):* ${
        selectedShipping.price === 0
          ? 'GRÁTIS'
          : `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`
      } (${selectedShipping.deadline})\n`;
    }

    message += `🔥 *Total do Pedido:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`;
    message += `\n👤 *Nome:* ${customerInfo.name.trim()}\n`;
    message += `📍 *Destino:* ${customerInfo.cityState.trim()}\n`;
    if (customerInfo.street) {
      message += `🏠 *Endereço:* ${customerInfo.street}\n`;
    }
    message += `💳 *Forma de Pagamento:* ${paymentText}\n`;
    if (customerInfo.notes?.trim()) {
      message += `📝 *Observações:* ${customerInfo.notes.trim()}\n`;
    }
    message += `\nPor favor, me envie a chave PIX ou o link de pagamento seguro para confirmar!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            {/* Drawer Container with Spring Slide Animation */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 130, damping: 22 }}
              className="w-screen max-w-md bg-[#0D0E15] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header with Bold Typography and Pill Counter */}
              <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between glass shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-black text-lg text-white tracking-tight flex items-center gap-2">
                    Meu Carrinho
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#00E5FF] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {totalItems} {totalItems === 1 ? 'ITEM' : 'ITENS'}
                  </span>

                  <button
                    onClick={onClose}
                    aria-label="Fechar carrinho"
                    className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer active:scale-[0.95]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#13151F] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">Seu carrinho está vazio</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Adicione controles, fones ou smartwatches para finalizar seu pedido com desconto.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-2xl bg-[#00E5FF] text-black text-xs font-black uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Ver Catálogo
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
                        <span className="uppercase tracking-wider text-[10px]">Produtos Adicionados</span>
                        <button
                          onClick={onClearCart}
                          className="text-red-400 hover:text-red-300 transition-colors text-[11px] font-bold cursor-pointer"
                        >
                          Limpar tudo
                        </button>
                      </div>

                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="p-3 rounded-2xl bg-[#13151F] border border-white/5 flex gap-3 items-center group shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                            <ImageWithSkeleton
                              src={item.product.image}
                              alt={item.product.name}
                              aspectRatioClass="aspect-square"
                              className="w-full h-full"
                              imageClassName="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="text-xs font-bold text-white truncate leading-tight">
                              {item.product.name}
                            </h4>
                            <div className="flex items-baseline gap-1 text-xs">
                              <span className="text-[#00E5FF] font-bold">R$</span>
                              <span className="text-sm font-black text-white">
                                {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                (R$ {item.product.price.toFixed(2).replace('.', ',')} un.)
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 pt-1">
                              <div className="flex items-center bg-[#090A0F] border border-white/10 rounded-lg p-0.5">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  className="p-1 text-slate-400 hover:text-white cursor-pointer active:scale-[0.95]"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-black text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="p-1 text-slate-400 hover:text-white cursor-pointer active:scale-[0.95]"
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                aria-label="Remover item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Estimator (Issue #8) */}
                    <div className="p-4 rounded-2xl bg-[#13151F] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                        <Truck className="w-4 h-4 text-[#00E5FF]" />
                        <span>Calcular Frete & Prazo</span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={9}
                          placeholder="00000-000"
                          value={cepInput}
                          onChange={(e) => setCepInput(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#090A0F] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={handleSearchCep}
                          disabled={isLoadingCep}
                          className="px-4 py-2 rounded-xl bg-[#00E5FF] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        >
                          {isLoadingCep ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Calcular'}
                        </button>
                      </div>

                      {cepError && (
                        <p className="text-[10px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{cepError}</span>
                        </p>
                      )}

                      {/* Shipping Options Selection */}
                      {shippingOptions.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#00E5FF]" />
                            <span>Destino: <strong className="text-white">{customerInfo.cityState}</strong></span>
                          </p>

                          <div className="space-y-1.5">
                            {shippingOptions.map((opt) => (
                              <div
                                key={opt.id}
                                onClick={() => setSelectedShipping(opt)}
                                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                                  selectedShipping?.id === opt.id
                                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                                    : 'bg-[#090A0F] border-white/5 text-slate-300 hover:border-white/20'
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <div className="font-bold flex items-center gap-1.5">
                                    <span className={selectedShipping?.id === opt.id ? 'text-[#00E5FF]' : 'text-slate-400'}>
                                      {opt.name}
                                    </span>
                                    {opt.isFree && (
                                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-black">
                                        GRÁTIS
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-500 font-medium">Prazo: {opt.deadline}</span>
                                </div>

                                <span className="font-black text-sm text-[#00E5FF]">
                                  {opt.price === 0 ? 'R$ 0,00' : `R$ ${opt.price.toFixed(2).replace('.', ',')}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Promotional Coupon (Issue #9) */}
                    <div className="p-4 rounded-2xl bg-[#13151F] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                        <Tag className="w-4 h-4 text-[#A855F7]" />
                        <span>Cupom Promocional</span>
                      </div>

                      {!appliedCoupon ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ex: CHRISTIAN10"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              className="flex-1 px-3.5 py-2 rounded-xl bg-[#090A0F] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#A855F7] uppercase tracking-wider font-bold transition-colors"
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              disabled={isApplyingCoupon}
                              className="px-4 py-2 rounded-xl bg-[#A855F7] text-white font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] cursor-pointer flex items-center justify-center min-w-[75px]"
                            >
                              {isApplyingCoupon ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                'Aplicar'
                              )}
                            </button>
                          </div>

                          {couponError && (
                            <p className="text-[10px] text-red-400">{couponError}</p>
                          )}

                          <p className="text-[10px] text-slate-500">
                            Dica: use <strong className="text-slate-400">CHRISTIAN10</strong> para 10% OFF no pedido.
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/40 text-xs">
                          <div className="flex items-center gap-2 text-white">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <div>
                              <span className="font-black uppercase tracking-wider text-[#A855F7]">
                                {appliedCoupon.code}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                Desconto de R$ {couponDiscount.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-red-400 hover:underline text-[10px] font-bold cursor-pointer"
                          >
                            Remover
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Customer Details Form */}
                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2 border-t border-white/10">
                      <div className="text-xs font-black text-slate-300 uppercase tracking-wide">
                        <span>Dados do Comprador</span>
                      </div>

                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: João Victor Silva"
                          value={customerInfo.name}
                          onChange={(e) => {
                            setCustomerInfo({ ...customerInfo, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#13151F] border ${
                            formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'
                          } text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors`}
                        />
                        {formErrors.name && (
                          <span className="text-[10px] text-red-400 mt-1 block">{formErrors.name}</span>
                        )}
                      </div>

                      {/* City and State */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Cidade / UF para Entrega *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Sorocaba / SP"
                          value={customerInfo.cityState}
                          onChange={(e) => {
                            setCustomerInfo({ ...customerInfo, cityState: e.target.value });
                            if (formErrors.cityState) setFormErrors({ ...formErrors, cityState: undefined });
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#13151F] border ${
                            formErrors.cityState ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'
                          } text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors`}
                        />
                        {formErrors.cityState && (
                          <span className="text-[10px] text-red-400 mt-1 block">{formErrors.cityState}</span>
                        )}
                      </div>

                      {/* Payment Method Selector */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                          Forma de Pagamento Preferida
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCustomerInfo({ ...customerInfo, paymentMethod: 'pix' })
                            }
                            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer active:scale-[0.98] ${
                              customerInfo.paymentMethod === 'pix'
                                ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                : 'bg-[#13151F] border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold flex items-center gap-1">
                                <QrCode className="w-3.5 h-3.5" />
                                PIX
                              </span>
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-black">
                                -5% OFF
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">À vista com desconto</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setCustomerInfo({ ...customerInfo, paymentMethod: 'cartao' })
                            }
                            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer active:scale-[0.98] ${
                              customerInfo.paymentMethod === 'cartao'
                                ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                                : 'bg-[#13151F] border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5" />
                                Cartão
                              </span>
                              <span className="text-[9px] bg-[#00E5FF]/20 text-[#00E5FF] px-1.5 py-0.5 rounded font-black">
                                Até 12x
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">Link seguro</span>
                          </button>
                        </div>
                      </div>

                      {/* Notes / Optional */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Observações ou Preferência de Cor (Opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Cor preta, modelo PS5..."
                          value={customerInfo.notes}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, notes: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#13151F] border border-white/10 focus:border-[#00E5FF] text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Footer with Calculation & WhatsApp Action */}
              {cartItems.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-white/10 glass space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {/* Order Summary breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-bold text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-[#A855F7] font-bold">
                        <span>Cupom ({appliedCoupon.code})</span>
                        <span>- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}

                    {customerInfo.paymentMethod === 'pix' && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Desconto PIX (5%)</span>
                        <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}

                    {selectedShipping && (
                      <div className="flex justify-between text-slate-300">
                        <span>Frete ({selectedShipping.name})</span>
                        <span className="font-bold text-[#00E5FF]">
                          {selectedShipping.price === 0 ? 'GRÁTIS' : `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`}
                        </span>
                      </div>
                    )}

                    <div className="h-[1px] bg-white/5 my-2" />

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-black text-xs uppercase tracking-widest text-slate-300">Total Final</span>
                      <span className="text-2xl font-black text-[#00E5FF] tracking-tight">
                        R$ {finalTotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-[#25D366] text-black py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Finalizar via WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500 font-medium">
                    Compra 100% segura e atendimento personalizado direto com Christian.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

