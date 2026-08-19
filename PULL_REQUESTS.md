# 🚀 Histórico de Pull Requests — Christian Multi Store

Este arquivo registra todas as entregas e deploys realizados no projeto, associando cada alteração à sua respectiva Issue e detalhando as validações executadas.

---

## 🔀 Pull Request #1: Sistema de Cupons Promocionais, Cálculo de Frete e Persistência de Carrinho
- **Status:** Merged / Deployed
- **Data:** 19/08/2026

### 🔗 Issue Relacionada
- Closes #4 (Persistência automática do carrinho no `localStorage`)
- Closes #8 (Estimador de Frete por CEP com API ViaCEP)
- Closes #9 (Sistema de Cupons de Desconto Promocionais)

### 📝 O que mudou?
- Implementada persistência local robusta de itens do carrinho com migração segura e `try/catch`.
- Integrada consulta pública ViaCEP (`src/services/cep.ts`) com cálculo em tempo real de frete PAC, Sedex e Frete Grátis acima de R$ 250.
- Criado motor de cupons (`src/data/coupons.ts`) com descontos percentuais e nominais (`CHRISTIAN10`, `PRIMEIRACOMPRA`, `PIXGAMER`).
- Atualizado gerador de links estruturados do WhatsApp para incluir cupons e frete detalhados.

### 🧪 Como foi validado?
- `compile_applet` e `lint_applet` executados com sucesso (0 erros).
- Testado fluxo de cupom inválido/válido e persistência após recarregamento de página.

### ⚠️ Riscos e Limitações
- API ViaCEP depende de conectividade externa; implementado fallback gracioso para preenchimento manual caso a API esteja fora do ar.

### 🎯 Próximos Passos
- Refinamento de UI/UX, inclusão de Skeleton Screens e animações suaves de entrada/saída.

---

## 🔀 Pull Request #2: Design System & Motion Upgrade — Skeleton Screens, Progressive Loading e Física Tátil
- **Status:** Merged / Deployed
- **Data:** 19/08/2026

### 🔗 Issue Relacionada
- Closes #3 (Tratamento de fallback para carregamento de imagens de produtos)
- Closes #5 (Skeleton Loaders e pré-carregamento visual de cards)
- Relacionado à diretriz de UX sênior: Lazy loading, skeletons, física de mola e feedback tátil.

### 📝 O que mudou?
- **Componente Reutilizável de Imagem Progressiva (`ImageWithSkeleton.tsx`)**:
  - Implementado `loading="lazy"` e `decoding="async"`.
  - Transição de entrada suave com desfoque progressivo (`blur(4px)` para `blur(0px)`).
  - Shimmer de carregamento customizado sem pulsos artificiais de baixa qualidade.
  - Tratamento de fallback com ícone tech da loja em caso de falha de carregamento da imagem remota.
- **Componente `ProductCardSkeleton.tsx`**:
  - Criado skeleton screen que replica fielmente o card de produto, badges de tecnologia e botões de compra.
- **Melhorias nos Cards de Produto (`ProductCard.tsx`)**:
  - Feedback visual de "Adicionado" temporário (1.2s) com micro-ícone de check no botão de compra.
  - Micro-física tátil no clique (`active:scale-[0.98]`).
  - Remoção de animações repetitivas ou pulsos desnecessários (Anti-Slop).
- **Accordions e Modais com Motion (`FaqSection.tsx`, `CartDrawer.tsx`, `ProductDetailModal.tsx`)**:
  - Transições suaves de abertura/fechamento com `AnimatePresence`.
  - Spring physics calibrada (`stiffness: 130, damping: 22`).
- **Design Tokens e Utilitários (`index.css`)**:
  - Criado `@keyframes shimmer` global e utilitário `.skeleton-shimmer`.

### 🧪 Como foi validado?
- `compile_applet` executado com status verde (Build succeeded).
- `lint_applet` executado com TypeScript 0 erros (`tsc --noEmit`).
- Testada responsividade mobile e desktop, abertura do carrinho, transições de imagem e feedback tátil em botões.

### ⚠️ Riscos e Limitações
- Dispositivos muito antigos com suporte desabilitado a animações serão respeitados via `prefers-reduced-motion`.

### 🎯 Próximos Passos
- Implementar Issue #10 (Construtor de Combo "Monte Seu Setup Gamer") e Issue #7 (Atalhos de acessibilidade e tecla ESC).

---

## 🔀 Pull Request #3: Remoção da Seção de Depoimentos e Limpeza de Navegação
- **Status:** Merged / Deployed
- **Data:** 19/08/2026

### 🔗 Issue Relacionada
- Closes #13 (Remoção da seção de depoimentos/avaliações)

### 📝 O que mudou?
- Removido o componente de depoimentos (`ReviewsSection`) da página inicial (`src/App.tsx`).
- Atualizada a barra de navegação principal (`src/components/Header.tsx`) para retirar o link "Depoimentos".
- Atualizado o rodapé (`src/components/Footer.tsx`) na coluna de ajuda para remover o link de depoimentos.
- Removido o arquivo não utilizado `src/components/ReviewsSection.tsx`.

### 🧪 Como foi validado?
- `compile_applet` executado com status de sucesso.
- `lint_applet` executado sem nenhum erro de TypeScript (`tsc --noEmit`).
- Verificação visual da transição direta entre o banner do Instagram e a seção de FAQ.

### ⚠️ Riscos e Limitações
- Nenhum risco identificado.

### 🎯 Próximos Passos
- Continuidade dos itens do backlog em `ISSUES.md`.

---

## 🔀 Pull Request #4: Limpeza da Base de Produtos para Entrada do Catálogo Oficial
- **Status:** Merged / Deployed
- **Data:** 19/08/2026

### 🔗 Issue Relacionada
- Closes #14 (Limpeza da base de produtos para inclusão do catálogo oficial)

### 📝 O que mudou?
- Zerado o array `PRODUCTS` em `src/data/products.ts` mantendo as 8 categorias e metadados da loja ativos.
- Implementado estado vazio elegante e minimalista no catálogo (`src/App.tsx`) sinalizando prontidão para receber novos itens.
- Preservada toda a infraestrutura de carrinho, persistência, cupons e cálculo de frete.

### 🧪 Como foi validado?
- `compile_applet` e `lint_applet` executados com sucesso (0 erros).
- Validação do comportamento das categorias e barra de busca com a base zerada.

### ⚠️ Riscos e Limitações
- O catálogo permanecerá exibindo o estado de prontidão até o envio dos novos produtos.

### 🎯 Próximos Passos
- Receber a listagem de produtos por categoria enviada pelo usuário e cadastrá-los em `src/data/products.ts`.

---

## 🔀 Pull Request #5: Cadastro Oficial da Linha de Fones Bluetooth & Headsets
- **Status:** Merged / Deployed
- **Data:** 19/08/2026

### 🔗 Issue Relacionada
- Closes #15 (Cadastro oficial da linha de Fones Bluetooth & Headsets)

### 📝 O que mudou?
- Cadastrados os 11 modelos oficiais de fones Bluetooth e headsets em `src/data/products.ts`:
  1. `Fone Gamer Bluetooth GM2 Pro Lenovo` (R$ 99,99)
  2. `Fone Bluetooth M20 com Display LED e Case Power Bank` (R$ 69,99)
  3. `Fone Bluetooth XT62 Pro Lenovo em Acrílico` (R$ 89,99)
  4. `Fone Bluetooth TWS i12` (R$ 49,99)
  5. `Fone Bluetooth A6S com Marcador Digital` (R$ 49,99)
  6. `Fone Bluetooth LP40 Pro Lenovo` (R$ 99,99)
  7. `Headset Bluetooth TH10 Lenovo Over-Ear` (R$ 139,99)
  8. `Fone Bluetooth Inpods i13` (R$ 69,99)
  9. `Fone Bluetooth UMIDIGI AirBass Hi-Fi` (R$ 89,99)
  10. `Fone Bluetooth Realfit F3 Compact` (R$ 79,99)
  11. `Headset Bluetooth P47 com Entrada para Cartão SD` (R$ 44,99)
- Inseridas todas as especificações técnicas, compatibilidades com iPhone e Android, cases recarregáveis, LEDs e marcadores digitais.
- Adicionadas imagens temáticas de alta resolução com progressive lazy loading.

### 🧪 Como foi validado?
- `compile_applet` executado com status de sucesso.
- `lint_applet` executado com TypeScript 0 erros (`tsc --noEmit`).
- Testada filtragem pela categoria "Fones Bluetooth", busca textual e adição ao carrinho com geração de link no WhatsApp.

### ⚠️ Riscos e Limitações
- Nenhuma limitação técnica identificada.

### 🎯 Próximos Passos
- Cadastrar as próximas categorias conforme envio (Smartwatches, Caixas de Som, Cabos & Carregadores, Eletrônicos & Acessórios, Vídeo Games).



