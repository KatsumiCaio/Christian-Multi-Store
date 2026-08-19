export type CategoryId =
  | 'all'
  | 'fones-bluetooth'
  | 'fones-fio'
  | 'smartwatches'
  | 'caixas-som'
  | 'cabos-carregadores'
  | 'eletronicos-acessorios'
  | 'video-games';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  badge?: 'Mais Vendido' | 'Pronta Entrega' | 'Gamer Choice' | 'Lançamento' | 'Oferta Especial' | 'Top Rated';
  badgeColor?: 'cyan' | 'purple' | 'emerald' | 'amber';
  rating: number;
  reviewCount: number;
  specs: string[];
  description: string;
  features?: string[];
  inStock: boolean;
  warranty: string;
  compatibility?: string;
  isGamerHighlight?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderInfo {
  name: string;
  cityState: string;
  paymentMethod: 'pix' | 'cartao';
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  avatar: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
