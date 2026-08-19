import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, MessageCircle, CreditCard, QrCode } from 'lucide-react';
import { CartItem, CustomerOrderInfo } from '../types';
import { STORE_INFO } from '../data/products';

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
    cityState: '',
    paymentMethod: 'pix',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; cityState?: string }>({});

  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const pixDiscount = customerInfo.paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const finalTotal = subtotal - pixDiscount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; cityState?: string } = {};
    if (!customerInfo.name.trim()) {
      errors.name = 'Por favor, informe seu nome';
    }
    if (!customerInfo.cityState.trim()) {
      errors.cityState = 'Informe sua Cidade / UF para o frete';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Build the WhatsApp message matching required format
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
        ? 'PIX (com 5% de desconto promocional)'
        : 'Cartão de Crédito (em até 12x)';

    let message = `Olá Christian! Gostaria de fechar o seguinte pedido na *Christian Multi Store*:\n\n${itemsList}\n\n`;
    message += `💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (customerInfo.paymentMethod === 'pix') {
      message += `🎁 *Desconto PIX (5%):* -R$ ${pixDiscount.toFixed(2).replace('.', ',')}\n`;
      message += `🔥 *Total com Desconto:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`;
    }
    message += `\n👤 *Nome:* ${customerInfo.name.trim()}\n`;
    message += `📍 *Local de Entrega:* ${customerInfo.cityState.trim()}\n`;
    message += `💳 *Forma de Pagamento:* ${paymentText}\n`;
    if (customerInfo.notes?.trim()) {
      message += `📝 *Observações:* ${customerInfo.notes.trim()}\n`;
    }
    message += `\nPor favor, me informe o valor do frete e os dados para pagamento!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0E15] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header with Bold Typography and Pill Counter */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between glass">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                Meu Pedido
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#00E5FF] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITENS'}
              </span>

              <button
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content: Items List & Checkout Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#13151F] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Seu carrinho está vazio</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore nosso catálogo de fones, games e eletrônicos e adicione itens para fechar no WhatsApp.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                    <span>PRODUTOS ADICIONADOS</span>
                    <button
                      onClick={onClearCart}
                      className="text-red-400 hover:text-red-300 transition-colors text-[11px]"
                    >
                      Limpar tudo
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-[#13151F] border border-white/5 flex gap-3 items-center group"
                    >
                      {/* Product thumb */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-black shrink-0 border border-white/10"
                      />

                      {/* Info & pricing */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-white truncate leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="flex items-baseline gap-1 text-xs">
                          <span className="text-cyan-400 font-bold">R$</span>
                          <span className="text-sm font-extrabold text-white">
                            {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-[10px] text-slate-500">
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
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                            aria-label="Remover item"
                            title="Remover"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2 border-t border-white/10">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <span>Dados para o Pedido & Frete</span>
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
                        formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
                      } text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors`}
                    />
                    {formErrors.name && (
                      <span className="text-[10px] text-red-400 mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  {/* City and State */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Sua Cidade / UF (para calcular o envio) *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Sorocaba / SP ou Curitiba / PR"
                      value={customerInfo.cityState}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, cityState: e.target.value });
                        if (formErrors.cityState) setFormErrors({ ...formErrors, cityState: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#13151F] border ${
                        formErrors.cityState ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
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
                        className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
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
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                            -5% OFF
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">Aprovação imediata</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: 'cartao' })
                        }
                        className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                          customerInfo.paymentMethod === 'cartao'
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                            : 'bg-[#13151F] border-white/10 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5" />
                            Cartão
                          </span>
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#13151F] border border-white/10 focus:border-cyan-400 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer with Calculation & WhatsApp Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 glass space-y-4">
              {/* Order Summary breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {customerInfo.paymentMethod === 'pix' ? (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Desconto PIX (5%)</span>
                    <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-slate-400">
                    <span>Frete (Brasil)</span>
                    <span className="text-[#00E5FF] font-bold">A Calcular</span>
                  </div>
                )}
                <div className="h-[1px] bg-white/5 my-2" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-extrabold text-xs uppercase tracking-widest text-slate-300">Total Estimado</span>
                  <span className="text-2xl font-black text-[#00E5FF] tracking-tight">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#25D366] text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Finalizar via WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-slate-500 font-medium">
                Compra 100% segura e atendimento personalizado direto com Christian.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
