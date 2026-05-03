# FluxoOps — Sistema ITSM com Categorização Inteligente

> Protótipo de portfólio de um sistema de Service Desk com Service Catalog, dashboard de KPIs, fluxo de SLA e categorização automática de tickets (AIOps).

![React](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Funcionalidades

- **Dashboard executivo** — KPIs em tempo real (tickets abertos, P1 críticos, SLA em risco, MTTR), gráficos de tendência e distribuição por categoria/prioridade
- **Catálogo de Serviços** — 19 itens padronizados de IT (reset de senha, novo usuário, VPN, notebook, licenças, etc.) com SLAs e fluxos de aprovação
- **Categorização automática (AIOps)** — análise inteligente do conteúdo do ticket para sugerir categoria, subcategoria, prioridade e time responsável
- **Lista de tickets** com busca, filtros (P1, SLA estourado, etc.) e ordenação por urgência
- **Fluxo de SLA** com indicadores visuais de prazo (dentro / em risco / estourado)
- **Persistência local** via `localStorage` — os tickets ficam salvos no navegador

## 🚀 Como executar

### Opção 1 — StackBlitz (mais rápido, sem instalar nada)

1. Acesse [stackblitz.com](https://stackblitz.com)
2. Login com sua conta GitHub (gratuita)
3. Clique em **"New project"** → **"Vite + React"**
4. Substitua o conteúdo de `src/App.jsx` pelo arquivo deste projeto
5. No painel de dependências (canto superior esquerdo), adicione: `lucide-react` e `recharts`
6. Pronto! O StackBlitz já te dá um link público pra compartilhar

### Opção 2 — Vercel (recomendado pra portfólio)

Você ganha uma URL profissional tipo `fluxoops.vercel.app`.

**Pré-requisito:** conta no GitHub (gratuita) e conta no Vercel (gratuita, login pelo GitHub).

1. Crie um repositório novo no GitHub (ex: `fluxoops`)
2. Suba todos os arquivos deste projeto pra esse repo
3. Acesse [vercel.com](https://vercel.com) → **"Add New Project"**
4. Importe o repositório do GitHub
5. O Vercel detecta Vite automaticamente — clique em **"Deploy"**
6. Em 1 minuto, sua URL pública estará no ar

A cada `git push` na branch principal, o Vercel faz redeploy automático.

### Opção 3 — Local (no seu computador)

**Pré-requisito:** [Node.js](https://nodejs.org) instalado (versão LTS).

```bash
# 1. Instale as dependências
npm install

# 2. Rode o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

Para gerar o build de produção:
```bash
npm run build
npm run preview
```

## 🧠 Sobre a categorização "AIOps"

Esta versão standalone usa um classificador baseado em palavras-chave em português que roda no próprio navegador — funciona offline, não exige API key e não tem custo.

**Para evoluir para IA generativa real** (Claude, GPT, etc.) em produção:

1. Crie uma serverless function (Vercel Functions, Netlify Functions, AWS Lambda)
2. Mantenha a chave de API no servidor (nunca exponha no frontend)
3. Substitua a função `categorizeWithAI` em `src/App.jsx` por uma chamada `fetch` à sua serverless function
4. A função no servidor faz a chamada à API Anthropic / OpenAI e retorna o JSON

Exemplo de estrutura para Vercel Functions: arquivo `api/categorize.js` na raiz do projeto.

## 📂 Estrutura

```
fluxoops/
├── index.html              # HTML raiz com Tailwind via CDN
├── package.json            # Dependências
├── vite.config.js          # Configuração do Vite
├── src/
│   ├── main.jsx            # Entry point do React
│   └── App.jsx             # Aplicação completa (single-file)
└── README.md
```

## 🎨 Stack técnica

- **React 18** com hooks (useState, useEffect, useMemo)
- **Vite 5** como build tool
- **Tailwind CSS** (via CDN) para estilização utilitária
- **Recharts** para gráficos do dashboard
- **Lucide React** para iconografia

## 📌 Conceitos ITSM aplicados

Este projeto aplica práticas do framework ITIL e de operações modernas de TI:

- **Service Catalog Management** — itens padronizados com fluxo pré-aprovado
- **Incident vs. Service Request** — separação entre falhas (P1-P2) e solicitações (P3-P4)
- **SLA Management** — alvos de resposta e resolução por prioridade
- **Triagem automatizada (AIOps)** — categorização inteligente reduzindo tempo de roteamento
- **KPIs operacionais** — MTTR, SLA compliance, volume por categoria
- **Escalation workflow** — encaminhamento automático ao time correto

## 📝 Licença

Projeto pessoal de portfólio.
