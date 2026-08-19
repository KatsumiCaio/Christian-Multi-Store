# ⚡ Christian Multi Store — Tech & Gamer E-Commerce

> Single-Page Application moderna e de alta conversão para a loja de eletrônicos e games **Christian Multi Store**, desenvolvida com foco em performance, estética Dark Minimal Tech e checkout direto via WhatsApp.

---

## 🚀 Recursos Principais

- 🛒 **Carrinho Interativo com Drawer**: Gestão de itens, cálculo de subtotal e desconto instantâneo de 5% no PIX.
- 💬 **Checkout Automatizado no WhatsApp**: Geração de link com mensagem estruturada contendo dados do cliente, endereço e itens do pedido.
- 🔍 **Catálogo com Busca e Filtro por Categorias**: Fones Bluetooth, Smartwatches, Games, Controles e Acessórios.
- 🔎 **Modal de Detalhes do Produto**: Especificações técnicas, badges de garantia de 90 dias e compra expressa.
- 🎨 **Design System "Bold Typography"**: Fundo escuro tech (`#090A0F`), superfícies em glassmorphism, tipografia Plus Jakarta Sans e acentos em Neon Cyan (`#00E5FF`) e Purple (`#A855F7`).
- 📱 **Mobile-First**: Experiência fluida e sem transbordamento horizontal.

---

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **Lucide React** + **Motion**
- **Vite**

---

## 📂 Estrutura do Projeto

```text
├── .github/
│   ├── ISSUE_TEMPLATE/       # Templates de Issues (Bug, Feature, Enhancement)
│   └── PULL_REQUEST_TEMPLATE.md # Template obrigatório de Pull Request
├── src/
│   ├── components/           # Componentes modulares
│   ├── data/                 # Dados estáticos (produtos, reviews, faqs)
│   ├── types.ts              # Interfaces TypeScript
│   ├── App.tsx               # Orquestrador de estado global
│   └── index.css             # Estilos e utilitários globais
├── AGENTS.md                 # Diretrizes de desenvolvimento para Agentes de IA
├── ISSUES.md                 # Backlog completo de Issues mapeadas
├── README.md                 # Documentação principal
└── vite.config.ts
```

---

## 📋 Padrão de Contribuição & Workflow (Issues e Pull Requests)

Todo desenvolvimento no projeto segue obrigatoriamente as diretrizes em `AGENTS.md`:

### 1. Categorização de Issues
- 🐛 **[Correção] (Bugfix)**: Correção de falhas, erros de layout ou regressões.
- ⚡ **[Melhoria] (Enhancement)**: Otimização de performance, acessibilidade e refinamento de UX/UI.
- ✨ **[Nova função] (Feature)**: Novas seções, integrações de APIs e novas ferramentas de checkout.

### 2. Estrutura Obrigatória de Pull Requests
Todo PR deve incluir:
1. **Issue Relacionada** (`Closes #...` ou `Relacionado à Issue #...`)
2. **O que mudou** (resumo das alterações)
3. **Como foi validado** (comandos de build/lint e testes manuais)
4. **Riscos e Limitações** (impactos potenciais e restrições conhecidas)
5. **Próximos Passos** (tarefas subsequentes)

Consulte o arquivo [`ISSUES.md`](./ISSUES.md) para visualizar o backlog completo.

---

## 💻 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Executar em desenvolvimento
npm run dev

# 3. Validar build de produção
npm run build
```

---

## 📱 Contato & Loja Oficial

- **Loja**: Christian Multi Store (Christian Dias)
- **Instagram**: [@christian_multistore](https://instagram.com/christian_multistore)
- **WhatsApp**: (15) 99825-3627
