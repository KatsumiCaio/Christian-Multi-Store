# Diretrizes de Desenvolvimento e Protocolo de Trabalho — Christian Multi Store

Este arquivo define os padrões obrigatórios de engenharia, governança de código e ciclo de vida de desenvolvimento que **todos os agentes de IA e desenvolvedores** devem seguir antes de propor ou implementar qualquer mudança no projeto.

---

## 📌 1. Regra Fundamental de Fluxo de Trabalho (Workflow)

Todas as tarefas a serem executadas neste projeto devem obrigatoriamente seguir o fluxo estruturado de **Issues** e **Pull Requests (PRs)**:

1. **Issue prévia para toda tarefa**: Nenhuma linha de código deve ser modificada sem antes haver uma Issue mapeada e classificada.
2. **Classificação estrita de tarefas**:
   - 🐛 **[Correção] (Bugfix)**: Correção de bugs visuais, falhas de cálculo de frete/desconto, links quebrados, regressões ou comportamentos inesperados.
   - ⚡ **[Melhoria] (Enhancement / Refactor)**: Otimização de performance, aprimoramento de acessibilidade, refinamento de UI/UX, redução de código redundante e melhorias de SEO.
   - ✨ **[Nova função] (Feature)**: Novas seções, novos métodos de pagamento, integração com APIs externas, persistência em nuvem, filtros adicionais, sistema de cupons, etc.
3. **Pull Requests para toda entrega e deploy**: Nenhuma alteração é mesclada diretamente sem a documentação completa no formato de PR.

---

## 📋 2. Padrão Obrigatório para Pull Requests (PR Template)

Todo Pull Request criado deve conter obrigatoriamente a seguinte estrutura na descrição:

```markdown
### 🔗 Issue Relacionada
- Closes #[Número da Issue] ou Relacionado à Issue #[Número da Issue]

### 📝 O que mudou?
- [Resumo claro em tópicos das alterações de código realizadas]
- [Componentes ou arquivos modificados]

### 🧪 Como foi validado?
- [Comandos de build executados, ex: `npm run build` ou `compile_applet`]
- [Comandos de linting executados, ex: `npm run lint` ou `tsc --noEmit`]
- [Testes manuais de usabilidade em desktop e mobile (responsividade, clique nos botões, fluxo de carrinho, abertura de modal, geração de link do WhatsApp)]

### ⚠️ Riscos e Limitações
- [Impactos colaterais potenciais]
- [Limitações técnicas conhecidas na versão atual]

### 🎯 Próximos Passos
- [Tarefas de continuidade ou novas melhorias decorrentes desta entrega]
```

---

## 🎨 3. Design System & Diretrizes Técnicas do Projeto

- **Identidade:** Dark Minimal Tech / Cyber-Gamer Sofisticado (`#090A0F`, `#0D0E15`, `#13151F`).
- **Tema:** *Bold Typography* (Tipografia marcante, alto contraste, superfícies em glassmorphism, sem bordas pesadas concorrendo com cantos arredondados).
- **Cores de Destaque:**
  - Neon Cyan (`#00E5FF`) — Destaques principais, badges de tecnologia, preços ativos.
  - Neon Purple (`#A855F7`) — Tags secundárias e iluminação ambiente.
  - WhatsApp Green (`#25D366`) — Ações de checkout, conversão e suporte direto.
- **Tipografia:**
  - Títulos/Headings: `Plus Jakarta Sans` com pesos `font-black` / `font-extrabold`.
  - Corpo/Leitura: `Inter` com entrelinha 1.5–1.7 e contraste WCAG AA.
- **Frameworks:** React 19 + TypeScript + Tailwind CSS v4 + Lucide React + Motion.
- **Mobile-First:** Proibido qualquer transbordamento horizontal (`overflow-x-hidden`). Toques mínimos de 44px em botões móveis.

---

## ⚡ 4. Taste Skill & Padrões Anti-Slop (skills/taste-skill/SKILL.md)

Todos os agentes devem seguir rigorosamente as regras da **Taste Skill v2** documentadas em `skills/taste-skill/SKILL.md`:
- **Banimento Total de Em-Dash (`—`)**: Proibido o uso de travessão em qualquer elemento de UI, títulos, botões e descrições. Use hífen comum (`-`) ou vírgula/ponto.
- **Fidelidade de Cores e Formas**: Trava de consistência em `#00E5FF` (Cyan), `#A855F7` (Purple) e `#25D366` (WhatsApp), com raio consistente (`rounded-3xl` / `rounded-2xl` / `rounded-full`).
- **Contraste WCAG AA em CTAs**: Botões com texto escuro de alto contraste sobre fundos luminosos. Textos de botões em linha única (`whitespace-nowrap`).
- **Física Háptica com Motion**: Efeitos de clique tátil (`active:scale-[0.98]`) e transições em mola (Spring physics `stiffness: 100, damping: 20`).
- **Sem Emojis em Código ou Badges**: Utilizar ícones SVG limpos do `lucide-react`.

