# 📋 Backlog de Issues — Christian Multi Store

Este documento centraliza todas as **Issues planejadas e categorizadas** para o desenvolvimento contínuo da aplicação.

---

## 🐛 1. Correções (Bugfixes)

### [Issue #1] [Correção] Scroll locking e prevenção de rolagem de fundo com Drawer/Modal abertos
- **Tipo:** `Correção` (Bugfix)
- **Prioridade:** Média
- **Descrição:** Quando o `CartDrawer` ou o `ProductDetailModal` estão abertos em dispositivos móveis, o usuário ainda consegue rolar o corpo da página de fundo em alguns navegadores (iOS WebKit).
- **Ação:** Bloquear a rolagem do elemento `body` (`overflow: hidden`) enquanto houver modal ou drawer ativo, restaurando ao fechar.
- **Arquivos afetados:** `src/components/CartDrawer.tsx`, `src/components/ProductDetailModal.tsx`.

---

### [Issue #2] [Correção] Sanitização de caracteres especiais na mensagem codificada do WhatsApp
- **Tipo:** `Correção` (Bugfix)
- **Prioridade:** Baixa
- **Descrição:** Em alguns dispositivos e navegadores móveis, caracteres especiais ou quebras de linha múltiplas no `encodeURIComponent` podem sofrer truncamento em links diretos `wa.me`.
- **Ação:** Garantir substituição padronizada de espaços e quebras de linha (`\n` para `%0A`) antes do disparo.
- **Arquivos afetados:** `src/components/CartDrawer.tsx`, `src/components/ProductDetailModal.tsx`, `src/components/FloatingWhatsApp.tsx`.

---

### [Issue #3] [Correção] Tratamento de fallback para carregamento de imagens de produtos
- **Tipo:** `Correção` (Bugfix)
- **Prioridade:** Média
- **Descrição:** Caso uma imagem externa falhe ao carregar (Unsplash/CDN indisponível), o card deve exibir um placeholder elegante com a logo tech da loja em vez de um espaço vazio ou ícone quebrado.
- **Ação:** Adicionar evento `onError` nas tags `<img>` para renderizar uma imagem reserva estilizada.
- **Arquivos afetados:** `src/components/ProductCard.tsx`, `src/components/ProductDetailModal.tsx`.

---

## ⚡ 2. Melhorias (Enhancements)

### [Issue #4] [Melhoria] Persistência automática do carrinho no `localStorage`
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Alta
- **Descrição:** Se o usuário fechar a aba ou recarregar a página sem querer, os itens adicionados ao carrinho devem ser restaurados automaticamente.
- **Ação:** Sincronizar o estado `cartItems` com `localStorage` com tratamento de versão e fallback em caso de storage desabilitado.
- **Arquivos afetados:** `src/App.tsx`, `src/types.ts`.

---

### [Issue #5] [Melhoria] Skeleton Loaders e pré-carregamento visual de cards
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Média
- **Descrição:** Aprimorar a percepção de performance (LCP) durante a troca rápida de categorias e filtragens com animações de pulso suaves (`glass skeleton`).
- **Ação:** Criar componente `ProductCardSkeleton.tsx` para transições de filtro e busca.
- **Arquivos afetados:** `src/components/ProductCardSkeleton.tsx`, `src/App.tsx`.

---

### [Issue #6] [Melhoria] Otimização de SEO, Open Graph e Metadados para compartilhamento
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Média
- **Descrição:** Quando o link da loja for compartilhado no WhatsApp, Instagram, Twitter/X ou Telegram, deve exibir card com título chamativo, descrição atraente e imagem de pré-visualização oficial da marca.
- **Ação:** Configurar tags `<meta property="og:...">`, `<meta name="twitter:...">` e `theme-color` no `index.html`.
- **Arquivos afetados:** `index.html`.

---

### [Issue #7] [Melhoria] Aprimoramento de Acessibilidade (WCAG 2.1 AA) e atalhos de teclado
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Média
- **Descrição:** Permitir fechar o carrinho e o modal com a tecla `Escape` (ESC), além de adicionar `aria-labels` e foco automático (`focus trap`) nos modais.
- **Ação:** Implementar listeners de teclado globais para navegação acessível.
- **Arquivos afetados:** `src/components/CartDrawer.tsx`, `src/components/ProductDetailModal.tsx`.

---

## ✨ 3. Novas Funções (Features)

### [Issue #8] [Nova função] Estimador de Frete por CEP (Integração ViaCEP)
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Permitir que o cliente informe o CEP no carrinho para identificar cidade/estado e estimar prazo e faixas de envio antes de ir para o WhatsApp.
- **Ação:** Criar componente de consulta de CEP consumindo API pública e pré-preenchendo a cidade e UF no formulário do pedido.
- **Arquivos afetados:** `src/components/CartDrawer.tsx`, `src/services/cep.ts`.

---

### [Issue #9] [Nova função] Sistema de Cupons de Desconto Promocionais
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Permitir que o cliente aplique cupons promocionais (ex: `CHRISTIAN10`, `PRIMEIRACOMPRA`, `PIXGAMER`) no carrinho com validação visual e desconto automático no cálculo final do WhatsApp.
- **Ação:** Criar campo de cupom no `CartDrawer` com cálculo dinâmico de abatimento.
- **Arquivos afetados:** `src/components/CartDrawer.tsx`, `src/data/coupons.ts`.

---

### [Issue #10] [Nova função] Construtor de Combo "Monte Seu Setup Gamer"
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Média
- **Descrição:** Criar uma experiência guiada onde o cliente escolhe: 1 Fone + 1 Controle + 1 Acessório e ganha automaticamente 10% de desconto adicional no combo.
- **Ação:** Adicionar seção/modal "Monte seu Combo" na página inicial com seleção passo a passo.
- **Arquivos afetados:** `src/components/SetupBuilder.tsx`, `src/App.tsx`.

---

### [Issue #11] [Nova função] Filtro por Faixa de Preço e Ordenação Avançada
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Baixa
- **Descrição:** Permitir ao usuário filtrar produtos por slider de preço mínimo/máximo ou faixas pré-definidas (Até R$ 100, R$ 100-250, Acima de R$ 250).
- **Ação:** Adicionar controles de faixa de preço no cabeçalho do catálogo.
- **Arquivos afetados:** `src/components/CategoryFilter.tsx`, `src/App.tsx`.

---

### [Issue #12] [Nova função] Captura de Leads VIP via WhatsApp (Alerta de Promoções)
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Baixa
- **Descrição:** Seção para o cliente entrar na lista VIP de lançamentos e promoções exclusivas da Christian Multi Store no WhatsApp.
- **Ação:** Adicionar banner/modal de inscrição com botão de entrada direta na lista de transmissão.
- **Arquivos afetados:** `src/components/VipListBanner.tsx`, `src/App.tsx`.
