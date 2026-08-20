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

### [Issue #13] [Melhoria] Remoção da seção de depoimentos/avaliações
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Média
- **Descrição:** Remoção da seção de depoimentos (reviews) da página inicial e atualização dos links do cabeçalho e rodapé conforme solicitação.
- **Ação:** Remover o componente `ReviewsSection` do fluxo de renderização e limpar referências no `Header.tsx` e `Footer.tsx`.
- **Arquivos afetados:** `src/App.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`.

---

### [Issue #14] [Melhoria] Limpeza da base de produtos para inclusão do catálogo oficial
- **Tipo:** `Melhoria` (Enhancement)
- **Prioridade:** Alta
- **Descrição:** Zerar a lista de produtos de teste no arquivo `src/data/products.ts` para que o proprietário envie a lista oficial organizada por cada tipo/categoria.
- **Ação:** Definir `PRODUCTS = []` com tipagem preservada e exibir estado amigável de catálogo pronto para receber novos itens.
- **Arquivos afetados:** `src/data/products.ts`, `src/App.tsx`.

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

---

### [Issue #15] [Nova função / Conteúdo] Cadastro Oficial da Linha de Fones Bluetooth & Headsets
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Cadastro completo dos 11 modelos oficiais de fones Bluetooth e headsets enviados pelo proprietário (Lenovo GM2 Pro, M20 Power Bank, XT62 Pro, TWS i12, A6s com Marcador, LP40 Pro, Headset TH10, Inpods i13, UMIDIGI, Realfit F3 e Headset P47).
- **Ação:** Inserir os produtos no array `PRODUCTS` com valores exatos (R$), características formatadas, fotos temáticas em alta resolução, badges tech e compatibilidade total com iPhone e Android.
- **Arquivos afetados:** `src/data/products.ts`.

---

### [Issue #16] [Nova função / Conteúdo] Cadastro Oficial da Linha de Smartwatches & Kits Inteligentes
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Cadastro completo dos 9 modelos oficiais de smartwatches e kits enviados pelo proprietário (Zeblaze Btalk 2 Lite, Zeblaze GTS 3, Kit T900 Ultra + Fone Bluetooth, Kit 7 em 1 S100 Ultra, T10 Ultra, W29s Microwear com ChatGPT/GPS, Zeblaze Btalk 3 Plus, Kit H10 Mini 41mm e Zeblaze Beyond 3 Pro com GPS/À prova d'água).
- **Ação:** Inserir os smartwatches no array `PRODUCTS` com valores exatos (R$), funções de monitoramento de saúde, integração com Strava, chamadas Bluetooth, pulseiras extras e fotos em alta resolução.
- **Arquivos afetados:** `src/data/products.ts`.

---

### [Issue #17] [Nova função / Conteúdo] Cadastro Oficial da Linha de Caixas de Som Bluetooth 10W
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Cadastro completo dos 3 modelos oficiais de caixas de som Eletro Mex de 10W (Caixa Redonda com LED RGB, Caixa Quadrada com LED RGB e Caixa à Prova d'Água 10W com alça).
- **Ação:** Inserir as caixas de som no array `PRODUCTS` sob a categoria `caixas-som` com valores exatos (R$), potência 10W, iluminação LED que troca de cor, entradas USB/SD/P2, rádio FM, alça de transporte e fotos em alta resolução.
- **Arquivos afetados:** `src/data/products.ts`.

---

### [Issue #18] [Nova função / Conteúdo] Cadastro Oficial da Linha de Cabos & Carregadores Turbo
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Cadastro completo dos cabos e carregadores turbo oficiais enviados pelo proprietário (Cabo Tipo C / iPhone 30W, Cabo Tipo C Duplo 65W, Cabo para iPhone 1m, Cabo Tipo C para Android 1m, Carregador Turbo Completo Android com Fonte, Carregador Turbo Completo iPhone com Fonte, Cabo Turbo iPhone 2m, Cabo Turbo Android 2m e Cabo 2m Linha Econômica).
- **Ação:** Inserir os produtos sob a categoria `cabos-carregadores` no array `PRODUCTS` com valores exatos (R$), potências de carga rápida, comprimentos de 1m e 2m, materiais reforçados e compatibilidades detalhadas.
- **Arquivos afetados:** `src/data/products.ts`.

---

### [Issue #19] [Nova função / Conteúdo] Cadastro Oficial da Linha de Fones de Ouvido com Fio
- **Tipo:** `Nova função` (Feature)
- **Prioridade:** Alta
- **Descrição:** Cadastro dos 4 modelos oficiais de fones de ouvido com fio enviados pelo proprietário (Fone com Fio Entrada Tipo C, Fone de Ouvido Lelong com Borrachinhas + 4 Extras P2, Fone de Ouvido PMCell com Borrachinhas P2 e Fone de Ouvido Lelong sem Borrachinha P2).
- **Ação:** Inserir os modelos sob a categoria `fones-fio` no array `PRODUCTS` com valores exatos (R$), conectores Tipo C e P2 (3.5mm), microfones embutidos para chamadas e áudios, ponteiras de silicone e alta fidelidade sonora.
- **Arquivos afetados:** `src/data/products.ts`.





