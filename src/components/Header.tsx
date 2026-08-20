import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, ShieldCheck, Truck, Zap } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_INFO } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onSearchClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (categoryId: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onSearchClick,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Catálogo', href: '#catalogo', action: () => onSelectCategory('all') },
    { name: 'Consoles & Games', href: '#catalogo', action: () => onSelectCategory('video-games') },
    { name: 'Smartwatches', href: '#catalogo', action: () => onSelectCategory('smartwatches') },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Garantia & FAQ', href: '#faq' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.action) {
      link.action();
    }
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent('Olá Christian! Estou navegando no site da Christian Multi Store e gostaria de tirar uma dúvida sobre os produtos.');
    window.open(`https://wa.me/55${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Bar / Faixa de Benefícios */}
      <div className="bg-[#090A0F]/90 border-b border-white/5 py-2 px-4 text-xs font-medium text-slate-300 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 whitespace-nowrap mx-auto sm:mx-0 text-[11px] font-semibold tracking-wider uppercase">
            <span className="flex items-center gap-1.5 text-[#00E5FF]">
              <span className="text-[#00E5FF]">•</span>
              <span>Loja Online</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Truck className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Envio para todo o Brasil</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Garantia 90 Dias</span>
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[10px] font-extrabold text-white tracking-wider uppercase">Loja Aberta</span>
            </div>

            <button
              onClick={openWhatsAppDirect}
              className="hidden sm:flex items-center gap-1.5 text-[#25D366] hover:text-emerald-400 transition-colors font-bold text-[11px]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>{STORE_INFO.whatsappFormatted}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#090A0F]/95 backdrop-blur-xl border-white/10 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.9)]'
            : 'bg-[#090A0F]/80 backdrop-blur-md border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <a href="#inicio" className="flex items-center gap-3 focus:outline-none group">
            <Logo size="md" showTextBeside={true} />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1 relative group tracking-wide"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Tools: Search, WhatsApp & Cart Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Toggle / Input */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-[#13151F] border border-cyan-500/40 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-cyan-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Buscar fone, game, cabo..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-slate-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Pesquisar produtos"
                  className="p-2 rounded-xl bg-[#13151F] hover:bg-[#1A1E2C] border border-white/10 text-slate-300 hover:text-cyan-400 transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Action Button */}
            <button
              onClick={openWhatsAppDirect}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-xs font-semibold"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              aria-label="Abrir carrinho de compras"
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 via-[#161B2E] to-purple-500/15 hover:from-cyan-500/25 hover:to-purple-500/25 border border-cyan-400/30 text-white shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.8)] animate-pulse">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Meu Pedido</span>
                <span className="text-xs font-bold text-cyan-300">
                  {cartTotal > 0 ? `R$ ${cartTotal.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#13151F] border border-white/10 text-slate-300 hover:text-white"
              aria-label="Menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cyan-500/20 bg-[#090A0F]/98 backdrop-blur-xl px-4 pt-3 pb-6 mt-2 space-y-3">
            {/* Quick search inside mobile menu */}
            <div className="flex items-center bg-[#13151F] border border-cyan-500/30 rounded-xl px-3 py-2 w-full">
              <Search className="w-4 h-4 text-cyan-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Buscar produto, marca, modelo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-1.5 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link)}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-[#13151F] hover:text-cyan-400 font-medium text-sm transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-cyan-500/60 text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={openWhatsAppDirect}
                className="w-full py-3 rounded-xl bg-[#25D366] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chamar Christian no WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
