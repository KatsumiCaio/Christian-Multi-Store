import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Diferenciais } from './components/Diferenciais';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramBanner } from './components/InstagramBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastNotification } from './components/ToastNotification';
import { PRODUCTS, CATEGORIES, STORE_INFO } from './data/products';
import { CategoryId, Product, CartItem } from './types';
import { Sparkles, SlidersHorizontal, Search, ArrowUpDown, RefreshCcw } from 'lucide-react';

export default function App() {
  // State
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Modals & Notifications
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; subMessage?: string }>({
    isOpen: false,
    message: '',
  });

  // Calculate counts per category
  const productCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: PRODUCTS.length,
      'fones-bluetooth': 0,
      'fones-fio': 0,
      smartwatches: 0,
      'caixas-som': 0,
      'cabos-carregadores': 0,
      'eletronicos-acessorios': 0,
      'video-games': 0,
    };

    PRODUCTS.forEach((p) => {
      if (counts[p.categoryId] !== undefined) {
        counts[p.categoryId]++;
      }
    });

    return counts;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.specs.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Prioritize isGamerHighlight or items with badge
        result.sort((a, b) => {
          if (a.isGamerHighlight && !b.isGamerHighlight) return -1;
          if (!a.isGamerHighlight && b.isGamerHighlight) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToast({
      isOpen: true,
      message: `${product.name} adicionado!`,
      subMessage: `${quantity}x no seu carrinho de compras`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsAppGeneral = () => {
    const text = encodeURIComponent(
      'Olá Christian! Estou visitando o site da Christian Multi Store e gostaria de tirar algumas dúvidas.'
    );
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 1. Header with Navbar & Cart preview */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onSearchClick={scrollToCatalog}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) scrollToCatalog();
        }}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          scrollToCatalog();
        }}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onOpenWhatsApp={openWhatsAppGeneral}
        />

        {/* 3. Interactive Catalog Section */}
        <section id="catalogo" className="py-12 sm:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-black text-[#00E5FF]">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="uppercase tracking-widest text-[10px]">Catálogo Exclusivo • Pronta Entrega</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                  Vitrine de Produtos & Setup
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-normal">
                  {activeCategoryObj?.description || 'Explore nossos fones bluetooth, smartwatches, controles e acessórios gamer.'}
                </p>
              </div>

              {/* Sorting and Search Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-300 glass">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="text-slate-400 font-bold hidden sm:inline">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white font-black text-xs uppercase tracking-wider focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#13151F] text-white">Destaques Gamer</option>
                    <option value="price-asc" className="bg-[#13151F] text-white">Menor Preço</option>
                    <option value="price-desc" className="bg-[#13151F] text-white">Maior Preço</option>
                    <option value="rating" className="bg-[#13151F] text-white">Mais Bem Avaliados</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filter Chips Bar */}
            <div className="mb-8">
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                productCounts={productCounts}
              />
            </div>

            {/* Active search filter display banner */}
            {searchQuery.trim() && (
              <div className="mb-6 p-4 rounded-3xl bg-[#131726]/90 border border-[#00E5FF]/30 flex items-center justify-between text-xs glass">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-slate-300">
                    Resultados para: <strong className="text-white font-extrabold">"{searchQuery}"</strong> ({filteredProducts.length} itens encontrados)
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#00E5FF] hover:underline font-black uppercase tracking-wider text-[11px] cursor-pointer"
                >
                  Limpar busca
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="text-center py-16 px-4 rounded-3xl bg-[#13151F] border border-white/10 max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#090A0F] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Nenhum produto encontrado</h3>
                  <p className="text-xs text-slate-400">
                    Não encontramos produtos correspondentes a "{searchQuery}" nesta categoria.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>Ver Todos os Produtos</span>
                </button>
              </div>
            )}

          </div>
        </section>

        {/* 4. Store Key Differentiators */}
        <Diferenciais />

        {/* 5. Instagram Community Banner */}
        <InstagramBanner />

        {/* 6. Social Proof Reviews */}
        <ReviewsSection />

        {/* 7. Interactive FAQ */}
        <FaqSection />
      </main>

      {/* 8. Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          scrollToCatalog();
        }}
      />

      {/* 9. Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 10. Cart Drawer (Checkout WhatsApp) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 11. Product Quick Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 12. Dynamic Toast Alert */}
      <ToastNotification
        isOpen={toast.isOpen}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast({ ...toast, isOpen: false })}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
