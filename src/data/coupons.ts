export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 = 10%) or fixed amount in BRL (e.g. 15 = R$ 15,00)
  minSubtotal?: number;
  description: string;
}

export const ACTIVE_COUPONS: Coupon[] = [
  {
    code: 'CHRISTIAN10',
    type: 'percentage',
    value: 10,
    description: '10% de desconto no valor total dos produtos',
  },
  {
    code: 'PRIMEIRACOMPRA',
    type: 'fixed',
    value: 15,
    minSubtotal: 100,
    description: 'R$ 15,00 OFF para compras acima de R$ 100,00',
  },
  {
    code: 'SETUPGAMER',
    type: 'percentage',
    value: 5,
    description: '5% OFF extra em toda a linha de acessórios e games',
  },
];

export function validateCoupon(code: string, subtotal: number): { isValid: boolean; coupon?: Coupon; error?: string } {
  const cleanCode = code.toUpperCase().trim();
  const coupon = ACTIVE_COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) {
    return { isValid: false, error: 'Cupom inválido ou expirado.' };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      isValid: false,
      error: `Cupom válido apenas para pedidos a partir de R$ ${coupon.minSubtotal.toFixed(2).replace('.', ',')}.`,
    };
  }

  return { isValid: true, coupon };
}
