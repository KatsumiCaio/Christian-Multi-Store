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
