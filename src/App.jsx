import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Search,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Activity,
  ArrowUpRight,
  Sparkles,
  Loader2,
  X,
  Network,
  Lock,
  Monitor,
  Mail,
  Wifi,
  Send,
  Flame,
  BookOpen,
  Menu,
  Cloud,
  Layers,
  Paperclip,
  FileText,
  LogOut,
  User,
  GitBranch,
  AlertOctagon,
  Wrench,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

/* ============================================================
   THEME
============================================================ */

const T = {
  bg: "#FDFAF7",
  bg2: "#F7F3EF",
  surface: "#FFFFFF",
  border: "rgba(44,40,37,0.1)",
  text: "#2C2825",
  textMid: "#6B6460",
  textLight: "#A09890",

  pink: "#F2A7BB",
  pinkLight: "#FCE8EF",
  pinkDark: "#B85C72",

  yellow: "#F7D97A",
  yellowLight: "#FEF6DC",
  yellowDark: "#9E7A10",

  blue: "#93BEE8",
  blueLight: "#DCF0FF",
  blueDark: "#3A6E9E",

  green: "#6BBF8A",
  greenLight: "#E5F5EC",
  greenDark: "#2E7D52",

  catSecurity: "#8B2845",
  catCloud: "#5A8FBE",
  catApps: "#7B5BA5",
  catAppsLight: "#EFE7F5",
  catGeneral: "#8B7E73",
};

/* ============================================================
   I18N
============================================================ */

const i18n = {
  pt: {
    appName: "FluxoOps",
    appTagline: "ITSM · v2.0",
    aiopsLabel: "AIOps",
    aiopsDesc: "Categorização e priorização automáticas de tickets, reduzindo tempo de triagem.",

    login: {
      welcome: "Bem-vindo ao",
      subtitle: "Sistema de Gestão de Serviços de TI",
      selectRole: "Selecione seu perfil para entrar",
      operator: "Operador",
      operatorDesc: "Acesso completo: dashboard, tickets, gestão e ferramentas técnicas",
      enduser: "Usuário Final",
      enduserDesc: "Abrir tickets, consultar catálogo e base de conhecimento",
      enter: "Entrar",
      footer: "Demonstração — sem autenticação real",
    },

    nav: {
      dashboard: "Dashboard",
      catalog: "Catálogo",
      tickets: "Tickets",
      myTickets: "Meus tickets",
      newTicket: "Novo ticket",
      kb: "Base de Conhecimento",
      logout: "Sair",
    },

    common: {
      loading: "Carregando...",
      now: "agora",
      mAgo: "m atrás",
      hAgo: "h atrás",
      dAgo: "d atrás",
      requester: "Solicitante",
      team: "Time",
      created: "Criado",
      updated: "Atualizado",
      close: "Fechar",
      cancel: "Cancelar",
      attachment: "Anexo",
      attachments: "Anexos",
      addAttachment: "Adicionar anexo",
      removeAttachment: "Remover",
      viewAll: "Ver tudo",
      back: "Voltar",
      type: "Tipo",
    },

    types: {
      incident: "Incidente",
      service_request: "Solicitação de Serviço",
      change: "Requisição de Mudança",
    },

    typesShort: {
      incident: "Incidente",
      service_request: "Serviço",
      change: "Mudança",
    },

    typeDesc: {
      incident: "Algo está quebrado ou com mau funcionamento",
      service_request: "Solicitação padronizada (acessos, equipamentos, licenças)",
      change: "Mudança planejada em ambiente produtivo (com aprovação e janela)",
    },

    dashboard: {
      eyebrow: "Operations Center",
      title: "Dashboard",
      kpiOpen: "Tickets abertos",
      kpiCritical: "Críticos (P1)",
      kpiSlaRisk: "SLA em risco",
      kpiMttr: "MTTR médio",
      kpiIncidents: "Incidentes ativos",
      kpiChanges: "Mudanças pendentes",
      resolvedToday: (n) => `${n} resolvidos hoje`,
      maxResponse: "Resposta máx. 15min",
      breached: (n) => `${n} já estouraram`,
      lastResolved: "Últimos resolvidos",
      dailyVolumeEyebrow: "Volume diário",
      dailyVolumeTitle: "Tickets abertos vs resolvidos",
      sevenDays: "7 dias",
      distributionEyebrow: "Distribuição",
      distributionTitle: "Por prioridade",
      typeBreakdownEyebrow: "ITIL",
      typeBreakdownTitle: "Por tipo",
      catalogEyebrow: "Service Catalog",
      catalogTitle: "Tickets por categoria",
      chartOpened: "Abertos",
      chartResolved: "Resolvidos",
    },

    tickets: {
      eyebrow: "Service Desk",
      title: "Tickets",
      myEyebrow: "Meu portal",
      myTitle: "Meus tickets",
      myDesc: "Acompanhe o status das solicitações que você abriu.",
      searchPlaceholder: "Buscar por título, ID ou descrição...",
      filterAll: "Todos",
      filterOpen: "Abertos",
      filterIncident: "Incidentes",
      filterService: "Serviços",
      filterChange: "Mudanças",
      filterP1: "P1",
      filterBreach: "SLA estourado",
      thId: "ID",
      thTitle: "Título",
      thType: "Tipo",
      thCategory: "Categoria",
      thPrio: "Prio",
      thStatus: "Status",
      thSla: "SLA",
      empty: "Nenhum ticket encontrado.",
      emptyMy: "Você ainda não abriu nenhum ticket. Clique em 'Novo ticket' ou 'Catálogo' para começar.",
    },

    newTicket: {
      eyebrow: "AIOps Categorization",
      title: "Novo ticket",
      desc: "A IA analisa o conteúdo e propõe categoria, tipo, prioridade e time. Você pode revisar e ajustar tudo antes de salvar.",
      requester: "Solicitante",
      requesterPh: "Nome do usuário",
      titleLabel: "Título",
      titlePh: "Resumo curto do problema",
      descLabel: "Descrição detalhada",
      descPh: "Descreva o problema, o que aconteceu, o que tentou...",
      analyzeBtn: "Categorizar com IA",
      analyzing: "Analisando...",
      aiAnalysis: "Análise da IA",
      reasoning: "Raciocínio",
      type: "Tipo",
      category: "Categoria",
      subcategory: "Subcategoria",
      priority: "Prioridade",
      teamLabel: "Time responsável",
      slaTarget: "Tempo de resolução alvo",
      initialResponse: "Resposta inicial em até",
      submit: "Criar ticket",
      reviewHint: "Caso a IA não tenha classificado corretamente, ajuste os campos abaixo manualmente.",
      attachmentHint: "Tipos aceitos: imagens, PDFs, logs (até 10MB)",
      changeFields: "Campos específicos de Mudança",
      changeWindow: "Janela de mudança",
      changeWindowPh: "Ex: Sábado 23h–01h",
      changeRisk: "Risco",
      riskLow: "Baixo",
      riskMedium: "Médio",
      riskHigh: "Alto",
      changeRollback: "Plano de rollback",
      changeRollbackPh: "Como reverter caso algo dê errado...",
      kbSuggestionsTitle: "Artigos relacionados",
      kbSuggestionsHint: "Talvez um destes resolva sua dúvida antes de abrir o ticket:",
    },

    catalog: {
      eyebrow: "Self-service portal",
      title: "Catálogo de Serviços",
      desc: "Itens padronizados que o time de TI oferece. Solicitações pelo catálogo seguem fluxo pré-aprovado e SLAs definidos.",
      searchPh: "O que você precisa? Ex: VPN, AWS, App Interna A...",
      all: "Todos",
      requestBtn: "Solicitar",
      empty: "Nenhum serviço encontrado.",
      modalEyebrow: "Confirmar solicitação",
      modalEstTime: "Tempo estimado",
      modalNotes: "Observações (opcional)",
      modalNotesPh: "Detalhes adicionais, urgência, contexto...",
      modalApproval: "Esse serviço requer aprovação. O ticket será criado em status 'Novo' e aguardará validação do gestor antes da execução.",
      modalSubmit: "Abrir solicitação",
      approval: "Aprovação",
    },

    kb: {
      eyebrow: "Knowledge Base",
      title: "Base de Conhecimento",
      desc: "Artigos, tutoriais e guias para resolver dúvidas comuns sem precisar abrir um ticket.",
      searchPh: "Buscar artigos... Ex: VPN, senha, MFA",
      all: "Todos",
      empty: "Nenhum artigo encontrado.",
      readTime: "min de leitura",
      backToList: "Voltar à lista",
      stillNeedHelp: "Ainda precisa de ajuda?",
      stillNeedHelpDesc: "Se este artigo não resolveu seu problema, abra um ticket e nosso time vai te ajudar.",
      openTicket: "Abrir ticket",
    },

    detail: {
      description: "Descrição",
      aiAnalysis: "Análise da IA",
      slaStatus: "Status do SLA",
      breached: "Estourado",
      atRisk: "Em risco",
      onTrack: "Dentro do prazo",
      slaTarget: "Alvo",
      hoursTotal: "h totais",
      changeStatus: "Mudar status",
      changeInfo: "Informações da mudança",
      window: "Janela",
      risk: "Risco",
      rollback: "Plano de rollback",
    },

    priorities: {
      P1: "P1 — Crítico",
      P2: "P2 — Alto",
      P3: "P3 — Médio",
      P4: "P4 — Baixo",
    },

    statuses: {
      new: "Novo",
      in_progress: "Em andamento",
      waiting: "Aguardando usuário",
      pending_approval: "Aguardando aprovação",
      resolved: "Resolvido",
      closed: "Fechado",
    },

    categories: {
      iam: "Acesso e Identidade",
      hardware: "Hardware",
      cloud: "Cloud Infrastructure",
      apps_internal: "Aplicações Internas",
      network: "Rede",
      security: "Segurança",
      saas: "SaaS Corporativo",
      general: "Geral",
    },

    reasoning: {
      security: "Indicadores de incidente de segurança detectados — escalada prioritária para o SOC.",
      network: "Problema de conectividade ou infraestrutura de rede identificado.",
      iam: "Solicitação relacionada a identidade, autenticação ou controle de acesso.",
      hardware: "Falha ou solicitação de hardware físico identificada.",
      cloud: "Solicitação envolvendo infraestrutura cloud (AWS / Azure / GCP) — provisionamento, escalonamento ou configuração.",
      apps_internal: "Problema ou solicitação relacionada a uma aplicação interna da empresa.",
      saas: "SaaS corporativo (M365, Google Workspace, Salesforce, etc.) impactado.",
      general: "Solicitação geral sem categoria técnica específica.",
      catalog: (id) => `Solicitação aberta via Catálogo de Serviços (${id}). Item padronizado, fluxo automatizado.`,
    },
  },

  en: {
    appName: "FluxoOps",
    appTagline: "ITSM · v2.0",
    aiopsLabel: "AIOps",
    aiopsDesc: "Automated ticket categorisation and prioritisation, reducing triage time.",

    login: {
      welcome: "Welcome to",
      subtitle: "IT Service Management System",
      selectRole: "Select your role to sign in",
      operator: "Operator",
      operatorDesc: "Full access: dashboard, tickets, management and technical tools",
      enduser: "End user",
      enduserDesc: "Open tickets, browse catalog and knowledge base",
      enter: "Sign in",
      footer: "Demonstration — no real authentication",
    },

    nav: {
      dashboard: "Dashboard",
      catalog: "Catalog",
      tickets: "Tickets",
      myTickets: "My tickets",
      newTicket: "New ticket",
      kb: "Knowledge Base",
      logout: "Sign out",
    },

    common: {
      loading: "Loading...",
      now: "now",
      mAgo: "m ago",
      hAgo: "h ago",
      dAgo: "d ago",
      requester: "Requester",
      team: "Team",
      created: "Created",
      updated: "Updated",
      close: "Close",
      cancel: "Cancel",
      attachment: "Attachment",
      attachments: "Attachments",
      addAttachment: "Add attachment",
      removeAttachment: "Remove",
      viewAll: "View all",
      back: "Back",
      type: "Type",
    },

    types: {
      incident: "Incident",
      service_request: "Service Request",
      change: "Request for Change",
    },

    typesShort: {
      incident: "Incident",
      service_request: "Request",
      change: "Change",
    },

    typeDesc: {
      incident: "Something is broken or malfunctioning",
      service_request: "Standardised request (access, equipment, licenses)",
      change: "Planned change to production environment (with approval and window)",
    },

    dashboard: {
      eyebrow: "Operations Center",
      title: "Dashboard",
      kpiOpen: "Open tickets",
      kpiCritical: "Critical (P1)",
      kpiSlaRisk: "SLA at risk",
      kpiMttr: "Avg MTTR",
      kpiIncidents: "Active incidents",
      kpiChanges: "Pending changes",
      resolvedToday: (n) => `${n} resolved today`,
      maxResponse: "Max response 15min",
      breached: (n) => `${n} already breached`,
      lastResolved: "Last resolved",
      dailyVolumeEyebrow: "Daily volume",
      dailyVolumeTitle: "Opened vs resolved tickets",
      sevenDays: "7 days",
      distributionEyebrow: "Distribution",
      distributionTitle: "By priority",
      typeBreakdownEyebrow: "ITIL",
      typeBreakdownTitle: "By type",
      catalogEyebrow: "Service Catalog",
      catalogTitle: "Tickets by category",
      chartOpened: "Opened",
      chartResolved: "Resolved",
    },

    tickets: {
      eyebrow: "Service Desk",
      title: "Tickets",
      myEyebrow: "My portal",
      myTitle: "My tickets",
      myDesc: "Track the status of the requests you've opened.",
      searchPlaceholder: "Search by title, ID or description...",
      filterAll: "All",
      filterOpen: "Open",
      filterIncident: "Incidents",
      filterService: "Requests",
      filterChange: "Changes",
      filterP1: "P1",
      filterBreach: "SLA breached",
      thId: "ID",
      thTitle: "Title",
      thType: "Type",
      thCategory: "Category",
      thPrio: "Prio",
      thStatus: "Status",
      thSla: "SLA",
      empty: "No tickets found.",
      emptyMy: "You haven't opened any tickets yet. Click 'New ticket' or 'Catalog' to start.",
    },

    newTicket: {
      eyebrow: "AIOps Categorisation",
      title: "New ticket",
      desc: "AI analyses the content and proposes category, type, priority and team. You can review and adjust everything before saving.",
      requester: "Requester",
      requesterPh: "User name",
      titleLabel: "Title",
      titlePh: "Brief summary of the issue",
      descLabel: "Detailed description",
      descPh: "Describe the issue, what happened, what you've tried...",
      analyzeBtn: "Categorise with AI",
      analyzing: "Analysing...",
      aiAnalysis: "AI Analysis",
      reasoning: "Reasoning",
      type: "Type",
      category: "Category",
      subcategory: "Subcategory",
      priority: "Priority",
      teamLabel: "Assigned team",
      slaTarget: "Target resolution time",
      initialResponse: "Initial response within",
      submit: "Create ticket",
      reviewHint: "If the AI did not classify correctly, adjust the fields manually below.",
      attachmentHint: "Accepted: images, PDFs, logs (up to 10MB)",
      changeFields: "Change-specific fields",
      changeWindow: "Change window",
      changeWindowPh: "E.g. Saturday 11pm–1am",
      changeRisk: "Risk",
      riskLow: "Low",
      riskMedium: "Medium",
      riskHigh: "High",
      changeRollback: "Rollback plan",
      changeRollbackPh: "How to revert if something goes wrong...",
      kbSuggestionsTitle: "Related articles",
      kbSuggestionsHint: "One of these might solve your question before opening a ticket:",
    },

    catalog: {
      eyebrow: "Self-service portal",
      title: "Service Catalog",
      desc: "Standardised items offered by the IT team. Catalog requests follow pre-approved workflows and defined SLAs.",
      searchPh: "What do you need? E.g. VPN, AWS, Internal App A...",
      all: "All",
      requestBtn: "Request",
      empty: "No services found.",
      modalEyebrow: "Confirm request",
      modalEstTime: "Estimated time",
      modalNotes: "Notes (optional)",
      modalNotesPh: "Additional details, urgency, context...",
      modalApproval: "This service requires approval. The ticket will be created in 'New' status and will await manager validation before execution.",
      modalSubmit: "Submit request",
      approval: "Approval",
    },

    kb: {
      eyebrow: "Knowledge Base",
      title: "Knowledge Base",
      desc: "Articles, tutorials and guides to solve common questions without opening a ticket.",
      searchPh: "Search articles... E.g. VPN, password, MFA",
      all: "All",
      empty: "No articles found.",
      readTime: "min read",
      backToList: "Back to list",
      stillNeedHelp: "Still need help?",
      stillNeedHelpDesc: "If this article didn't solve your issue, open a ticket and our team will help you.",
      openTicket: "Open ticket",
    },

    detail: {
      description: "Description",
      aiAnalysis: "AI Analysis",
      slaStatus: "SLA status",
      breached: "Breached",
      atRisk: "At risk",
      onTrack: "On track",
      slaTarget: "Target",
      hoursTotal: "h total",
      changeStatus: "Change status",
      changeInfo: "Change information",
      window: "Window",
      risk: "Risk",
      rollback: "Rollback plan",
    },

    priorities: {
      P1: "P1 — Critical",
      P2: "P2 — High",
      P3: "P3 — Medium",
      P4: "P4 — Low",
    },

    statuses: {
      new: "New",
      in_progress: "In progress",
      waiting: "Waiting on user",
      pending_approval: "Pending approval",
      resolved: "Resolved",
      closed: "Closed",
    },

    categories: {
      iam: "Identity & Access",
      hardware: "Hardware",
      cloud: "Cloud Infrastructure",
      apps_internal: "Internal Applications",
      network: "Network",
      security: "Security",
      saas: "Corporate SaaS",
      general: "General",
    },

    reasoning: {
      security: "Security incident indicators detected — priority escalation to the SOC.",
      network: "Connectivity or network infrastructure issue identified.",
      iam: "Request related to identity, authentication or access control.",
      hardware: "Physical hardware failure or request identified.",
      cloud: "Request involving cloud infrastructure (AWS / Azure / GCP) — provisioning, scaling or configuration.",
      apps_internal: "Issue or request related to an internal company application.",
      saas: "Corporate SaaS (M365, Google Workspace, Salesforce, etc.) impacted.",
      general: "General request without specific technical category.",
      catalog: (id) => `Request opened via Service Catalog (${id}). Standardised item, automated workflow.`,
    },
  },
};

/* ============================================================
   DATA MODEL
============================================================ */

const TICKET_TYPES = {
  incident: { icon: AlertOctagon, color: T.pinkDark, bg: T.pinkLight, prefix: "INC" },
  service_request: { icon: Wrench, color: T.blueDark, bg: T.blueLight, prefix: "REQ" },
  change: { icon: GitBranch, color: T.yellowDark, bg: T.yellowLight, prefix: "CHG" },
};

const PRIORITIES = {
  P1: { color: T.pinkDark, slaResponseMin: 15, slaResolveMin: 240, weight: 4 },
  P2: { color: T.yellowDark, slaResponseMin: 60, slaResolveMin: 480, weight: 3 },
  P3: { color: T.blueDark, slaResponseMin: 240, slaResolveMin: 1440, weight: 2 },
  P4: { color: T.textLight, slaResponseMin: 1440, slaResolveMin: 4320, weight: 1 },
};

const STATUSES = {
  new: { color: T.blueDark },
  in_progress: { color: T.yellowDark },
  waiting: { color: T.pinkDark },
  pending_approval: { color: T.catApps },
  resolved: { color: T.greenDark },
  closed: { color: T.textLight },
};

const CATEGORIES = {
  iam: {
    icon: Lock,
    accent: T.pinkDark,
    bg: T.pinkLight,
    subcategories: {
      pt: ["Reset de senha", "MFA", "Provisionamento", "Desprovisionamento", "Permissões RBAC", "SSO / SAML"],
      en: ["Password reset", "MFA", "Provisioning", "Deprovisioning", "RBAC permissions", "SSO / SAML"],
    },
    defaultTeam: "Identity Team",
  },
  hardware: {
    icon: Monitor,
    accent: T.yellowDark,
    bg: T.yellowLight,
    subcategories: {
      pt: ["Notebook", "Periféricos", "Mobile", "Impressora", "Estação de trabalho"],
      en: ["Laptop", "Peripherals", "Mobile", "Printer", "Workstation"],
    },
    defaultTeam: "Field Support",
  },
  cloud: {
    icon: Cloud,
    accent: T.catCloud,
    bg: T.blueLight,
    subcategories: {
      pt: [
        "AWS — EC2 / Compute",
        "AWS — S3 / Storage",
        "AWS — IAM / Permissões",
        "Azure — Virtual Machines",
        "Azure — Entra ID",
        "GCP — Compute / GKE",
        "Kubernetes / Containers",
        "Terraform / IaC",
        "Monitoramento (CloudWatch / Azure Monitor)",
        "Custos / FinOps",
      ],
      en: [
        "AWS — EC2 / Compute",
        "AWS — S3 / Storage",
        "AWS — IAM / Permissions",
        "Azure — Virtual Machines",
        "Azure — Entra ID",
        "GCP — Compute / GKE",
        "Kubernetes / Containers",
        "Terraform / IaC",
        "Monitoring (CloudWatch / Azure Monitor)",
        "Cost / FinOps",
      ],
    },
    defaultTeam: "Cloud Operations",
  },
  apps_internal: {
    icon: Layers,
    accent: T.catApps,
    bg: T.catAppsLight,
    subcategories: {
      pt: [
        "App Interna A — Login / Acesso",
        "App Interna A — Erro / Bug",
        "App Interna A — Performance",
        "App Interna A — Solicitação de funcionalidade",
        "App Interna B — Login / Acesso",
        "App Interna B — Erro / Bug",
        "App Interna B — Performance",
        "App Interna B — Solicitação de funcionalidade",
        "Integração entre apps internas",
      ],
      en: [
        "Internal App A — Login / Access",
        "Internal App A — Error / Bug",
        "Internal App A — Performance",
        "Internal App A — Feature request",
        "Internal App B — Login / Access",
        "Internal App B — Error / Bug",
        "Internal App B — Performance",
        "Internal App B — Feature request",
        "Integration between internal apps",
      ],
    },
    defaultTeam: "Internal Apps Support",
  },
  network: {
    icon: Wifi,
    accent: T.greenDark,
    bg: T.greenLight,
    subcategories: {
      pt: ["VPN", "WiFi", "Conectividade", "Firewall", "DNS / DHCP", "Lentidão de rede"],
      en: ["VPN", "WiFi", "Connectivity", "Firewall", "DNS / DHCP", "Network slowness"],
    },
    defaultTeam: "Network Operations",
  },
  security: {
    icon: ShieldAlert,
    accent: T.catSecurity,
    bg: "#F5E5EA",
    subcategories: {
      pt: ["Phishing", "Malware", "Incidente", "Violação de política", "Acesso indevido", "Vulnerabilidade reportada"],
      en: ["Phishing", "Malware", "Incident", "Policy violation", "Unauthorised access", "Reported vulnerability"],
    },
    defaultTeam: "SOC / Security",
  },
  saas: {
    icon: Network,
    accent: T.blueDark,
    bg: T.blueLight,
    subcategories: {
      pt: ["Microsoft 365", "Google Workspace", "Salesforce", "SAP / ERP", "Slack / Teams", "Outras SaaS"],
      en: ["Microsoft 365", "Google Workspace", "Salesforce", "SAP / ERP", "Slack / Teams", "Other SaaS"],
    },
    defaultTeam: "SaaS Support",
  },
  general: {
    icon: Mail,
    accent: T.catGeneral,
    bg: T.bg2,
    subcategories: {
      pt: ["Dúvida", "Solicitação de informação", "Onboarding", "Treinamento"],
      en: ["Question", "Information request", "Onboarding", "Training"],
    },
    defaultTeam: "Service Desk N1",
  },
};


/* ============================================================
   KNOWLEDGE BASE
============================================================ */

const KB_ARTICLES = [
  {
    id: "kb-001",
    category: "iam",
    keywords: ["senha", "password", "esqueci", "forgot", "reset"],
    readTime: 3,
    title: { pt: "Como resetar minha senha corporativa", en: "How to reset my corporate password" },
    summary: {
      pt: "Passo a passo para recuperar acesso quando você esqueceu a senha do domínio.",
      en: "Step-by-step to recover access when you've forgotten your domain password.",
    },
    body: {
      pt: `## Reset de senha — Passo a passo

1. **Acesse** o portal de auto-atendimento em https://senha.empresa.com
2. **Clique em** "Esqueci minha senha"
3. **Digite** seu email corporativo
4. **Confirme** sua identidade pelo seu celular cadastrado (SMS ou app autenticador)
5. **Crie** uma nova senha seguindo a política:
   - Mínimo 12 caracteres
   - Ao menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
   - Não pode repetir as últimas 5 senhas

## Não recebi o SMS de verificação

Se o SMS não chegar em até 5 minutos, abra um ticket pedindo "Reset de MFA" — o time de Identidade vai te ajudar.

## Senha bloqueada após 5 tentativas

A conta fica bloqueada automaticamente. Aguarde 30 minutos ou abra ticket pedindo desbloqueio.`,
      en: `## Password reset — Step by step

1. **Access** the self-service portal at https://senha.empresa.com
2. **Click** "Forgot my password"
3. **Enter** your corporate email
4. **Confirm** your identity via your registered phone (SMS or authenticator app)
5. **Create** a new password following the policy:
   - Minimum 12 characters
   - At least 1 uppercase, 1 lowercase, 1 number and 1 special character
   - Cannot repeat the last 5 passwords

## SMS verification not received

If SMS doesn't arrive within 5 minutes, open a ticket requesting "MFA reset" — the Identity team will help you.

## Account locked after 5 attempts

The account is automatically locked. Wait 30 minutes or open a ticket requesting unlock.`,
    },
  },
  {
    id: "kb-002",
    category: "iam",
    keywords: ["mfa", "autenticador", "authenticator", "celular", "phone", "perdeu", "lost"],
    readTime: 4,
    title: { pt: "Configurar MFA em um novo celular", en: "Setting up MFA on a new phone" },
    summary: {
      pt: "Como transferir o app autenticador ao trocar de aparelho sem perder o acesso.",
      en: "How to transfer the authenticator app when changing devices without losing access.",
    },
    body: {
      pt: `## Antes de trocar de celular (recomendado)

1. **No celular antigo**, abra o Microsoft Authenticator
2. **Vá em** Configurações → Backup → Ativar backup em nuvem
3. **No celular novo**, instale o Authenticator e faça login com a mesma conta
4. **Restaure** o backup — todos os tokens voltam automaticamente

## Já troquei e perdi acesso ao antigo

Sem pânico. Abra um ticket de "Reset de MFA" pelo catálogo. Você vai precisar:

- Confirmar seus dados pessoais com o time de Identidade
- Aguardar até 30 minutos para a reconfiguração
- Reescanear o QR code no novo aparelho

## Token de backup

Se você guardou os 10 códigos de recuperação na primeira configuração, pode usar um deles para entrar e reconfigurar o app.`,
      en: `## Before changing phones (recommended)

1. **On the old phone**, open Microsoft Authenticator
2. **Go to** Settings → Backup → Enable cloud backup
3. **On the new phone**, install Authenticator and sign in with the same account
4. **Restore** the backup — all tokens return automatically

## Already switched and lost access to the old one

Don't panic. Open an "MFA reset" ticket from the catalog. You'll need to:

- Confirm your personal data with the Identity team
- Wait up to 30 minutes for reconfiguration
- Rescan the QR code on the new device

## Backup token

If you saved the 10 recovery codes during initial setup, you can use one to sign in and reconfigure the app.`,
    },
  },
  {
    id: "kb-003",
    category: "network",
    keywords: ["vpn", "anyconnect", "remoto", "remote", "conectar", "connect"],
    readTime: 5,
    title: { pt: "Configurar VPN para acesso remoto", en: "Setting up VPN for remote access" },
    summary: {
      pt: "Guia para instalar e conectar ao VPN corporativo trabalhando de casa.",
      en: "Guide to install and connect to the corporate VPN while working from home.",
    },
    body: {
      pt: `## Instalação do cliente VPN

1. **Baixe** o Cisco AnyConnect na intranet em /downloads/vpn
2. **Execute** o instalador como administrador
3. **Reinicie** o computador após a instalação

## Primeira conexão

1. **Abra** o AnyConnect
2. **Servidor:** vpn.empresa.com
3. **Login:** seu email corporativo completo
4. **Senha:** sua senha de domínio
5. **Aprovar** push do MFA no celular

## Erro "authentication failed"

- Confirme se a senha está correta tentando logar no portal web
- Verifique se o MFA não expirou (push tem 30 segundos)
- Limpe cache: Configurações → Avançado → Limpar credenciais salvas

## VPN conecta mas internet não funciona

Provavelmente é split tunneling mal configurado. Reconecte selecionando o perfil "Full Tunnel" no canto superior direito.`,
      en: `## VPN client installation

1. **Download** Cisco AnyConnect from intranet at /downloads/vpn
2. **Run** the installer as administrator
3. **Restart** the computer after installation

## First connection

1. **Open** AnyConnect
2. **Server:** vpn.empresa.com
3. **Login:** your full corporate email
4. **Password:** your domain password
5. **Approve** MFA push on your phone

## "Authentication failed" error

- Confirm the password by trying to sign in on the web portal
- Check that MFA hasn't expired (push has 30 seconds)
- Clear cache: Settings → Advanced → Clear saved credentials

## VPN connects but internet doesn't work

Likely a split tunneling misconfiguration. Reconnect selecting the "Full Tunnel" profile in the top right.`,
    },
  },
  {
    id: "kb-004",
    category: "security",
    keywords: ["phishing", "email", "suspeito", "suspicious", "fraude", "fraud", "reportar", "report"],
    readTime: 3,
    title: { pt: "Como identificar e reportar phishing", en: "How to identify and report phishing" },
    summary: {
      pt: "Sinais de email malicioso e o que fazer ao encontrar um.",
      en: "Signs of malicious email and what to do when you find one.",
    },
    body: {
      pt: `## Sinais de phishing

- **Remetente externo** se passando por colega, gestor ou CEO
- **Urgência artificial:** "responda agora", "antes que feche o sistema"
- **Pedido de transferência financeira** ou compra de gift cards
- **Links suspeitos** — passe o mouse e veja a URL real antes de clicar
- **Anexos inesperados**, especialmente .zip, .exe, .docm
- **Erros de português** ou inglês ruim em comunicações corporativas

## O que fazer

1. **Não clique** em links nem abra anexos
2. **Não responda** ao remetente
3. **Reporte** usando o botão "Phishing" no Outlook (canto superior direito)
4. Se já clicou ou forneceu credenciais: **abra ticket P1 de segurança IMEDIATAMENTE** e troque sua senha

## Em caso de dúvida

Sempre confirme por outro canal (telefone, Teams) antes de executar qualquer ação financeira ou compartilhar credenciais.`,
      en: `## Signs of phishing

- **External sender** impersonating a colleague, manager or CEO
- **Artificial urgency:** "reply now", "before the system closes"
- **Financial transfer request** or gift card purchases
- **Suspicious links** — hover the mouse and see the real URL before clicking
- **Unexpected attachments**, especially .zip, .exe, .docm
- **Poor grammar** in corporate communications

## What to do

1. **Don't click** links or open attachments
2. **Don't reply** to the sender
3. **Report** using the "Phishing" button in Outlook (top right corner)
4. If you already clicked or provided credentials: **open a P1 security ticket IMMEDIATELY** and change your password

## When in doubt

Always confirm via another channel (phone, Teams) before executing any financial action or sharing credentials.`,
    },
  },
  {
    id: "kb-005",
    category: "cloud",
    keywords: ["aws", "ec2", "instance", "vm", "provision", "criar"],
    readTime: 6,
    title: { pt: "Solicitar provisionamento de VM AWS", en: "Requesting AWS VM provisioning" },
    summary: {
      pt: "Como pedir uma instância EC2 com tags, ownership e governança corretos.",
      en: "How to request an EC2 instance with proper tags, ownership and governance.",
    },
    body: {
      pt: `## Antes de solicitar

Confirme com seu gestor:
- **Justificativa de negócio** (vai entrar no ticket)
- **Tipo de workload** (web app, batch, banco de dados)
- **Estimativa de custo mensal** (use a calculadora AWS)
- **Centro de custo** (cost center) que vai pagar

## Padrões obrigatórios

Toda VM no nosso ambiente precisa:
- **Tags:** Owner, CostCenter, Environment (dev/staging/prod), Project
- **Subnet privada** (sem IP público direto)
- **Security Group** mínimo necessário (least privilege)
- **Backup** habilitado (AWS Backup)
- **Monitoramento** CloudWatch + alertas básicos

## Como abrir

Use o Catálogo de Serviços → "Provisionar VM AWS / Azure". O time Cloud Ops vai criar via Terraform e te entregar acesso SSH/RDP.

SLA: 1 dia útil após aprovação.`,
      en: `## Before requesting

Confirm with your manager:
- **Business justification** (goes in the ticket)
- **Workload type** (web app, batch, database)
- **Monthly cost estimate** (use AWS calculator)
- **Cost center** that will pay

## Mandatory standards

Every VM in our environment requires:
- **Tags:** Owner, CostCenter, Environment (dev/staging/prod), Project
- **Private subnet** (no direct public IP)
- **Minimum Security Group** (least privilege)
- **Backup** enabled (AWS Backup)
- **CloudWatch monitoring** + basic alerts

## How to request

Use the Service Catalog → "Provision AWS / Azure VM". The Cloud Ops team will create via Terraform and deliver SSH/RDP access.

SLA: 1 business day after approval.`,
    },
  },
  {
    id: "kb-006",
    category: "apps_internal",
    keywords: ["app interna", "internal app", "login", "acesso", "access", "erro", "error"],
    readTime: 4,
    title: { pt: "Resolver problemas de login nas apps internas", en: "Troubleshooting login issues on internal apps" },
    summary: {
      pt: "Checklist antes de abrir ticket por problema de acesso na App Interna A ou B.",
      en: "Checklist before opening a ticket for access issues on Internal App A or B.",
    },
    body: {
      pt: `## Tente nesta ordem

1. **Limpe cache e cookies** do navegador para o domínio da app
2. **Tente em janela anônima** — se funcionar, é problema de cache
3. **Confirme** que está usando o link oficial (cuidado com phishing)
4. **Verifique conexão VPN** — algumas apps internas exigem VPN ativo
5. **Tente outro navegador** (Chrome → Edge ou vice-versa)
6. **Reinicie** o computador

## Ainda não funciona

Abra ticket informando:
- **Qual app** (A ou B)
- **Erro exato** (screenshot ajuda muito)
- **Horário** do problema
- **Já tentei:** lista do que você fez do checklist acima

## Erros comuns

- **403 Forbidden:** você não tem permissão. Solicite acesso pelo catálogo
- **500 Internal Error:** problema no servidor. O time já foi notificado
- **Página em branco:** geralmente cache. Faça Ctrl+Shift+R`,
      en: `## Try in this order

1. **Clear cache and cookies** for the app's domain
2. **Try incognito window** — if it works, it's a cache issue
3. **Confirm** you're using the official link (beware phishing)
4. **Check VPN connection** — some internal apps require active VPN
5. **Try another browser** (Chrome → Edge or vice versa)
6. **Restart** the computer

## Still not working

Open a ticket informing:
- **Which app** (A or B)
- **Exact error** (screenshot helps a lot)
- **Time** of the problem
- **Already tried:** list what you did from the checklist above

## Common errors

- **403 Forbidden:** you don't have permission. Request access via the catalog
- **500 Internal Error:** server issue. The team is already notified
- **Blank page:** usually cache. Press Ctrl+Shift+R`,
    },
  },
  {
    id: "kb-007",
    category: "hardware",
    keywords: ["notebook", "laptop", "lento", "slow", "performance"],
    readTime: 4,
    title: { pt: "Notebook lento — o que fazer antes de abrir ticket", en: "Slow laptop — what to do before opening a ticket" },
    summary: {
      pt: "Diagnóstico básico de performance e otimizações que você pode fazer sozinho.",
      en: "Basic performance diagnosis and optimisations you can do yourself.",
    },
    body: {
      pt: `## Verifique o básico

1. **Reinicie** o notebook (não use sleep, faça shutdown)
2. **Espaço em disco:** mantenha pelo menos 15% livre no SSD
3. **Atualizações pendentes:** Configurações → Windows Update
4. **Apps na inicialização:** Gerenciador de Tarefas → Inicializar → desabilite o que não usa

## Limpeza rápida

- **Limpeza de disco:** Win + R → cleanmgr → selecione tudo
- **Cache de navegadores** (especialmente Chrome com muitas abas)
- **Esvaziar lixeira**

## Se ainda estiver lento

Abra ticket de hardware informando:
- Modelo do notebook
- Há quanto tempo está lento (sempre ou começou agora?)
- O que faz quando trava (qual programa)
- Quantos GB de RAM e tipo de disco (HD ou SSD)

O time de Field Support pode verificar se precisa de upgrade ou troca.`,
      en: `## Check the basics

1. **Restart** the laptop (don't use sleep, do shutdown)
2. **Disk space:** keep at least 15% free on SSD
3. **Pending updates:** Settings → Windows Update
4. **Startup apps:** Task Manager → Startup → disable what you don't use

## Quick cleanup

- **Disk cleanup:** Win + R → cleanmgr → select all
- **Browser cache** (especially Chrome with many tabs)
- **Empty recycle bin**

## If still slow

Open a hardware ticket informing:
- Laptop model
- How long it's been slow (always or just started?)
- What you do when it freezes (which program)
- How many GB of RAM and disk type (HDD or SSD)

The Field Support team can check if it needs upgrade or replacement.`,
    },
  },
  {
    id: "kb-008",
    category: "saas",
    keywords: ["m365", "office", "outlook", "teams", "sharepoint", "licença", "license"],
    readTime: 3,
    title: { pt: "Como solicitar licença Microsoft 365", en: "How to request Microsoft 365 license" },
    summary: {
      pt: "Tipos de licença disponíveis e como pedir a correta para sua função.",
      en: "Available license types and how to request the right one for your role.",
    },
    body: {
      pt: `## Licenças disponíveis

- **Business Basic:** apenas web (Outlook web, Teams web, OneDrive). Para funções administrativas leves.
- **Business Standard:** apps desktop completos. Padrão para a maioria.
- **Business Premium:** Standard + Intune + segurança avançada. Para gestores e funções sensíveis.
- **E5:** licença completa enterprise. Apenas para times de TI/Segurança.

## Como pedir

1. Acesse o **Catálogo de Serviços** → "Solicitar licença M365"
2. Indique o tipo desejado e a justificativa
3. Aprovação do gestor é obrigatória
4. SLA: 1 dia útil após aprovação

## Quero mudar de tipo

Mesma flow do catálogo, mas mencione no campo de observações qual licença atual você tem e por que quer mudar.`,
      en: `## Available licenses

- **Business Basic:** web only (Outlook web, Teams web, OneDrive). For light admin roles.
- **Business Standard:** full desktop apps. Default for most users.
- **Business Premium:** Standard + Intune + advanced security. For managers and sensitive roles.
- **E5:** full enterprise license. Only for IT/Security teams.

## How to request

1. Go to **Service Catalog** → "Request M365 license"
2. Indicate the desired type and justification
3. Manager approval is required
4. SLA: 1 business day after approval

## I want to change type

Same catalog flow, but mention in the notes field which current license you have and why you want to change.`,
    },
  },
];


/* ============================================================
   SERVICE CATALOG
============================================================ */

const SERVICE_CATALOG = [
  {
    id: "svc-iam-01",
    name: { pt: "Reset de senha", en: "Password reset" },
    desc: {
      pt: "Recuperação de senha do domínio corporativo (AD / Entra ID).",
      en: "Corporate domain password recovery (AD / Entra ID).",
    },
    category: "iam",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "15 min", en: "15 min" },
    approval: false,
  },
  {
    id: "svc-iam-02",
    name: { pt: "Reset de MFA", en: "MFA reset" },
    desc: {
      pt: "Restabelecer autenticação multifator após troca de aparelho.",
      en: "Re-establish multi-factor authentication after device change.",
    },
    category: "iam",
    subKey: 1,
    defaultPriority: "P2",
    estimatedTime: { pt: "30 min", en: "30 min" },
    approval: false,
  },
  {
    id: "svc-iam-03",
    name: { pt: "Onboarding de novo usuário", en: "New user onboarding" },
    desc: {
      pt: "Provisionamento completo: AD, M365, acessos básicos por departamento.",
      en: "Complete provisioning: AD, M365, basic department access.",
    },
    category: "iam",
    subKey: 2,
    defaultPriority: "P3",
    estimatedTime: { pt: "4h", en: "4h" },
    approval: true,
  },
  {
    id: "svc-iam-04",
    name: { pt: "Offboarding completo", en: "Complete offboarding" },
    desc: {
      pt: "Bloqueio de contas, revogação de acessos, arquivamento de dados conforme GDPR.",
      en: "Account block, access revocation, data archival per GDPR.",
    },
    category: "iam",
    subKey: 3,
    defaultPriority: "P2",
    estimatedTime: { pt: "2h", en: "2h" },
    approval: true,
  },
  {
    id: "svc-iam-05",
    name: { pt: "Configurar SSO para nova app", en: "Configure SSO for new app" },
    desc: {
      pt: "Integração SAML / OIDC com Entra ID para nova aplicação.",
      en: "SAML / OIDC integration with Entra ID for new application.",
    },
    category: "iam",
    subKey: 5,
    defaultPriority: "P3",
    estimatedTime: { pt: "3 dias úteis", en: "3 business days" },
    approval: true,
  },
  {
    id: "svc-hw-01",
    name: { pt: "Solicitar notebook corporativo", en: "Request corporate laptop" },
    desc: { pt: "Provisão de notebook conforme catálogo padrão.", en: "Laptop provisioning per standard catalog." },
    category: "hardware",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "3 dias úteis", en: "3 business days" },
    approval: true,
  },
  {
    id: "svc-hw-02",
    name: { pt: "Solicitar periféricos", en: "Request peripherals" },
    desc: { pt: "Mouse, teclado, headset, monitor adicional, dock station.", en: "Mouse, keyboard, headset, additional monitor, dock station." },
    category: "hardware",
    subKey: 1,
    defaultPriority: "P4",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: false,
  },
  {
    id: "svc-cl-01",
    name: { pt: "Provisionar VM AWS / Azure", en: "Provision AWS / Azure VM" },
    desc: { pt: "Criação de instância EC2 ou Azure VM via Terraform com tags e ownership.", en: "EC2 or Azure VM creation via Terraform with tags and ownership." },
    category: "cloud",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-cl-02",
    name: { pt: "Criar bucket S3 / Azure Blob", en: "Create S3 / Azure Blob bucket" },
    desc: { pt: "Provisionamento de storage com políticas de retenção, criptografia e acesso.", en: "Storage provisioning with retention, encryption and access policies." },
    category: "cloud",
    subKey: 1,
    defaultPriority: "P3",
    estimatedTime: { pt: "4h", en: "4h" },
    approval: true,
  },
  {
    id: "svc-cl-03",
    name: { pt: "Conceder acesso IAM cloud", en: "Grant cloud IAM access" },
    desc: { pt: "Atribuição de role / policy AWS IAM ou Azure RBAC com least privilege.", en: "AWS IAM role / policy or Azure RBAC assignment with least privilege." },
    category: "cloud",
    subKey: 2,
    defaultPriority: "P3",
    estimatedTime: { pt: "4h", en: "4h" },
    approval: true,
  },
  {
    id: "svc-cl-04",
    name: { pt: "Deploy em Kubernetes", en: "Kubernetes deployment" },
    desc: { pt: "Deploy de novo serviço em cluster EKS / AKS / GKE com manifests revisados.", en: "Deploy new service to EKS / AKS / GKE cluster with reviewed manifests." },
    category: "cloud",
    subKey: 6,
    defaultPriority: "P3",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },
  {
    id: "svc-cl-05",
    name: { pt: "Investigar custo / billing cloud", en: "Investigate cloud cost / billing" },
    desc: { pt: "Análise FinOps de gastos anormais ou alertas de orçamento.", en: "FinOps analysis of abnormal spend or budget alerts." },
    category: "cloud",
    subKey: 9,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: false,
  },
  {
    id: "svc-app-01",
    name: { pt: "Acesso à App Interna A", en: "Access to Internal App A" },
    desc: { pt: "Solicitação de acesso e atribuição de papel na App Interna A.", en: "Access request and role assignment in Internal App A." },
    category: "apps_internal",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-app-02",
    name: { pt: "Reportar bug na App Interna A", en: "Report bug in Internal App A" },
    desc: { pt: "Ticket técnico para o time de desenvolvimento da App Interna A.", en: "Technical ticket for the Internal App A development team." },
    category: "apps_internal",
    subKey: 1,
    defaultPriority: "P2",
    estimatedTime: { pt: "Análise em 4h", en: "Analysis within 4h" },
    approval: false,
  },
  {
    id: "svc-app-03",
    name: { pt: "Acesso à App Interna B", en: "Access to Internal App B" },
    desc: { pt: "Solicitação de acesso e atribuição de papel na App Interna B.", en: "Access request and role assignment in Internal App B." },
    category: "apps_internal",
    subKey: 4,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-app-04",
    name: { pt: "Reportar bug na App Interna B", en: "Report bug in Internal App B" },
    desc: { pt: "Ticket técnico para o time de desenvolvimento da App Interna B.", en: "Technical ticket for the Internal App B development team." },
    category: "apps_internal",
    subKey: 5,
    defaultPriority: "P2",
    estimatedTime: { pt: "Análise em 4h", en: "Analysis within 4h" },
    approval: false,
  },
  {
    id: "svc-net-01",
    name: { pt: "Acesso VPN", en: "VPN access" },
    desc: { pt: "Configuração e habilitação de cliente VPN para acesso remoto.", en: "VPN client setup and enablement for remote access." },
    category: "network",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "2h", en: "2h" },
    approval: true,
  },
  {
    id: "svc-net-02",
    name: { pt: "Liberação de regra de firewall", en: "Firewall rule exception" },
    desc: { pt: "Solicitação de exceção de firewall com justificativa de segurança.", en: "Firewall exception request with security justification." },
    category: "network",
    subKey: 3,
    defaultPriority: "P3",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },
  {
    id: "svc-sa-01",
    name: { pt: "Solicitar licença M365", en: "Request M365 license" },
    desc: { pt: "Atribuição de licença Microsoft 365 (E3, E5, Business Premium).", en: "Microsoft 365 license assignment (E3, E5, Business Premium)." },
    category: "saas",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-sec-01",
    name: { pt: "Reportar phishing", en: "Report phishing" },
    desc: { pt: "Notificação de tentativa de phishing para análise pelo SOC.", en: "Phishing attempt notification for SOC analysis." },
    category: "security",
    subKey: 0,
    defaultPriority: "P2",
    estimatedTime: { pt: "1h", en: "1h" },
    approval: false,
  },
  {
    id: "svc-sec-02",
    name: { pt: "Reportar incidente de segurança", en: "Report security incident" },
    desc: { pt: "Abertura formal de incidente para investigação imediata.", en: "Formal incident report for immediate investigation." },
    category: "security",
    subKey: 2,
    defaultPriority: "P1",
    estimatedTime: { pt: "Imediato", en: "Immediate" },
    approval: false,
  },
];

/* ============================================================
   SEED DATA
============================================================ */

const SEED_TICKETS = [
  {
    id: "INC-1001",
    type: "incident",
    title: { pt: "Não consigo acessar o VPN corporativo", en: "Cannot access corporate VPN" },
    description: {
      pt: "Desde manhã o cliente AnyConnect retorna 'authentication failed'.",
      en: "Since this morning the AnyConnect client returns 'authentication failed'.",
    },
    category: "network",
    subKey: 0,
    priority: "P2",
    status: "in_progress",
    team: "Network Operations",
    requester: "Anna Becker",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    updatedAt: Date.now() - 1000 * 60 * 30,
    aiKey: "network",
    attachments: [],
  },
  {
    id: "INC-1002",
    type: "incident",
    title: { pt: "Phishing reportado por equipe financeira", en: "Phishing reported by finance team" },
    description: {
      pt: "Email externo fingindo ser CEO solicitando transferência. 3 usuários receberam.",
      en: "External email impersonating CEO requesting transfer. 3 users received.",
    },
    category: "security",
    subKey: 0,
    priority: "P1",
    status: "in_progress",
    team: "SOC / Security",
    requester: "Lucas Meyer",
    createdAt: Date.now() - 1000 * 60 * 45,
    updatedAt: Date.now() - 1000 * 60 * 10,
    aiKey: "security",
    attachments: [{ name: "phishing_screenshot.png", size: 245678 }],
  },
  {
    id: "INC-1003",
    type: "incident",
    title: { pt: "App Interna A com erro 500 no login", en: "Internal App A with 500 error on login" },
    description: {
      pt: "Vários usuários reportam erro 500 ao tentar logar na App Interna A.",
      en: "Several users report 500 error when trying to log into Internal App A.",
    },
    category: "apps_internal",
    subKey: 1,
    priority: "P1",
    status: "in_progress",
    team: "Internal Apps Support",
    requester: "Sofia Romano",
    createdAt: Date.now() - 1000 * 60 * 90,
    updatedAt: Date.now() - 1000 * 60 * 5,
    aiKey: "apps_internal",
    attachments: [{ name: "error_log.txt", size: 12450 }],
  },
  {
    id: "REQ-1004",
    type: "service_request",
    title: { pt: "Reset de MFA — perdeu o celular", en: "MFA reset — lost phone" },
    description: {
      pt: "Usuário trocou de aparelho e não conseguiu transferir o autenticador.",
      en: "User changed devices and could not transfer the authenticator.",
    },
    category: "iam",
    subKey: 1,
    priority: "P3",
    status: "resolved",
    team: "Identity Team",
    requester: "Marco Silva",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 18,
    aiKey: "iam",
    attachments: [],
  },
  {
    id: "REQ-1005",
    type: "service_request",
    title: { pt: "Provisionar nova VM em AWS", en: "Provision new AWS VM" },
    description: {
      pt: "Time de dados precisa de nova EC2 t3.large para processamento ETL.",
      en: "Data team needs a new EC2 t3.large for ETL processing.",
    },
    category: "cloud",
    subKey: 0,
    priority: "P3",
    status: "pending_approval",
    team: "Cloud Operations",
    requester: "Julia Wagner",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    aiKey: "cloud",
    attachments: [],
  },
  {
    id: "CHG-1006",
    type: "change",
    title: { pt: "Atualização do firewall perimetral", en: "Perimeter firewall upgrade" },
    description: {
      pt: "Atualização de firmware do firewall principal para versão 9.2.1 com correção de CVE crítica.",
      en: "Main firewall firmware upgrade to version 9.2.1 with critical CVE fix.",
    },
    category: "network",
    subKey: 3,
    priority: "P2",
    status: "pending_approval",
    team: "Network Operations",
    requester: "Pedro Costa",
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
    aiKey: "network",
    attachments: [],
    changeWindow: "Sábado 23h00 — 02h00",
    changeRisk: "medium",
    changeRollback: "Reverter via snapshot pré-atualização (já gerado). Tempo estimado de rollback: 15 minutos.",
  },
  {
    id: "CHG-1007",
    type: "change",
    title: { pt: "Migração de banco de dados RDS", en: "RDS database migration" },
    description: {
      pt: "Migração de PostgreSQL 13 para 15 com downtime planejado.",
      en: "PostgreSQL 13 to 15 migration with planned downtime.",
    },
    category: "cloud",
    subKey: 0,
    priority: "P3",
    status: "in_progress",
    team: "Cloud Operations",
    requester: "Cloud Team",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    updatedAt: Date.now() - 1000 * 60 * 60 * 6,
    aiKey: "cloud",
    attachments: [],
    changeWindow: "Domingo 02h00 — 06h00",
    changeRisk: "high",
    changeRollback: "Restaurar snapshot do RDS de backup automático. RTO: 1 hora.",
  },
  {
    id: "REQ-1008",
    type: "service_request",
    title: { pt: "Adicionar permissão IAM em bucket S3", en: "Add IAM permission to S3 bucket" },
    description: {
      pt: "Novo membro do time de dados precisa de read/write no bucket de analytics.",
      en: "New data team member needs read/write on analytics bucket.",
    },
    category: "cloud",
    subKey: 2,
    priority: "P4",
    status: "resolved",
    team: "Cloud Operations",
    requester: "RH / HR",
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
    updatedAt: Date.now() - 1000 * 60 * 60 * 28,
    aiKey: "cloud",
    attachments: [],
  },
];

/* ============================================================
   HELPERS
============================================================ */

const formatRelative = (ts, t) => {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return t.common.now;
  if (min < 60) return `${min}${t.common.mAgo}`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}${t.common.hAgo}`;
  const days = Math.floor(hr / 24);
  return `${days}${t.common.dAgo}`;
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const slaStatus = (ticket) => {
  if (ticket.status === "resolved" || ticket.status === "closed") return { state: "ok", pct: 100 };
  const elapsed = (Date.now() - ticket.createdAt) / 60000;
  const target = PRIORITIES[ticket.priority].slaResolveMin;
  const pct = Math.min(100, (elapsed / target) * 100);
  if (pct >= 100) return { state: "breach", pct: 100 };
  if (pct >= 75) return { state: "risk", pct };
  return { state: "ok", pct };
};

const newId = (type) => {
  const prefix = TICKET_TYPES[type]?.prefix || "INC";
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const bi = (val, lang) => {
  if (typeof val === "string") return val;
  if (val && typeof val === "object") return val[lang] || val.pt || val.en || "";
  return "";
};

/* ============================================================
   AI CATEGORIZATION
============================================================ */

const TYPE_SIGNALS = {
  incident: ["fora do ar", "down", "não funciona", "nao funciona", "not working", "erro", "error", "quebrado", "broken", "crash", "falha", "failure", "indisponível", "indisponivel", "unavailable", "perdi acesso", "lost access", "phishing", "ataque", "attack", "vazamento", "leak"],
  service_request: ["solicitar", "request", "novo", "nova", "new", "preciso de", "need", "gostaria", "would like", "criar", "create", "provisionar", "provision", "acesso a", "access to", "licença para", "license for"],
  change: ["atualização", "atualizacao", "update", "upgrade", "migração", "migracao", "migration", "deploy em produção", "deploy in production", "mudança planejada", "planned change", "manutenção programada", "scheduled maintenance", "patch"],
};

const KEYWORDS = {
  security: ["phishing", "malware", "ransomware", "vírus", "virus", "incidente", "incident", "vazamento", "leak", "violação", "violacao", "violation", "fraude", "fraud", "ataque", "attack", "invasão", "invasao", "breach", "comprometido", "compromised", "spam", "suspicious", "suspeito", "vulnerability", "vulnerabilidade"],
  cloud: ["aws", "azure", "gcp", "ec2", "s3", "lambda", "kubernetes", "k8s", "eks", "aks", "gke", "terraform", "iac", "cloudwatch", "cloudfront", "rds", "dynamodb", "blob", "storage", "vpc", "subnet", "container", "docker", "helm", "finops", "billing"],
  apps_internal: ["app interna", "internal app", "app a", "app b", "aplicação interna", "aplicacao interna"],
  network: ["vpn", "wifi", "wi-fi", "rede", "network", "conectividade", "connectivity", "internet", "firewall", "dns", "dhcp", "lentidão", "lentidao", "slow", "conexão", "conexao", "connection", "ping", "anyconnect", "proxy"],
  iam: ["senha", "password", "mfa", "autenticação", "autenticacao", "authentication", "login", "acesso", "access", "permissão", "permissao", "permission", "grupo", "group", "rbac", "provisionamento", "provisioning", "desprovisionamento", "deprovisioning", "conta", "account", "ad ", "entra", "azure ad", "sso", "saml", "oidc"],
  hardware: ["notebook", "laptop", "mouse", "teclado", "keyboard", "monitor", "impressora", "printer", "headset", "celular", "phone", "dock", "thinkpad", "macbook", "tela", "screen", "bateria", "battery", "carregador", "charger", "periférico", "periferico", "peripheral"],
  saas: ["m365", "microsoft 365", "office 365", "outlook", "sharepoint", "teams", "google workspace", "salesforce", "sap", "slack", "zoom", "saas"],
  general: ["dúvida", "duvida", "question", "informação", "informacao", "information", "como faço", "como faco", "how do i", "onboarding", "treinamento", "training"],
};

const PRIORITY_SIGNALS = {
  P1: ["múltiplos usuários", "multiplos usuarios", "multiple users", "todos usuários", "all users", "fora do ar", "down", "inoperante", "outage", "produção parada", "producao parada", "production down", "crítico", "critico", "critical", "incidente", "incident", "phishing", "ransomware", "vazamento", "leak", "ataque", "attack", "ceo", "diretor", "director", "erro 500", "500 error"],
  P2: ["bloqueio total", "blocked", "não consigo trabalhar", "nao consigo trabalhar", "cannot work", "parado", "stuck", "urgente", "urgent", "vpn", "mfa", "perdeu", "lost", "não liga", "nao liga", "won't power", "won't turn on", "não acessa", "nao acessa", "cannot access", "lenta", "lento", "slow"],
  P3: ["intermitente", "intermittent", "às vezes", "as vezes", "sometimes", "ajuda", "help", "configurar", "configure", "provisionar", "provision"],
  P4: ["solicitar", "solicitação", "solicitacao", "request", "novo", "nova", "new", "quero", "want", "preciso de", "need", "gostaria", "would like", "dúvida", "duvida", "question", "como faço", "como faco", "how do i"],
};

const categorizeWithAI = async (title, description) => {
  await new Promise((r) => setTimeout(r, 700));
  const text = `${title} ${description}`.toLowerCase();

  // Detect type
  let detectedType = "incident";
  let typeScore = 0;
  for (const [type, signals] of Object.entries(TYPE_SIGNALS)) {
    const score = signals.filter((s) => text.includes(s)).length;
    if (score > typeScore) {
      typeScore = score;
      detectedType = type;
    }
  }
  if (typeScore === 0) detectedType = "incident";

  // Detect category
  let bestCat = "general";
  let bestScore = 0;
  for (const [cat, terms] of Object.entries(KEYWORDS)) {
    const score = terms.filter((t) => text.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }

  // Detect priority
  let priority = "P3";
  for (const [p, signals] of Object.entries(PRIORITY_SIGNALS)) {
    if (signals.some((s) => text.includes(s))) {
      priority = p;
      break;
    }
  }
  if (bestCat === "security" && (priority === "P3" || priority === "P4")) priority = "P2";

  const cat = CATEGORIES[bestCat];
  let subKey = 0;
  cat.subcategories.pt.forEach((sub, idx) => {
    const firstWord = sub.toLowerCase().split(" ")[0].replace(/[—,.]/g, "");
    if (firstWord && text.includes(firstWord)) subKey = idx;
  });

  return {
    type: detectedType,
    category: bestCat,
    subKey,
    priority,
    team: cat.defaultTeam,
    aiKey: bestCat,
  };
};

/* Suggest KB articles based on title + description */
const suggestKbArticles = (title, description, lang) => {
  if (!title && !description) return [];
  const text = `${title} ${description}`.toLowerCase();
  if (text.length < 5) return [];

  const scored = KB_ARTICLES.map((article) => {
    let score = 0;
    article.keywords.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) score += 2;
    });
    if (text.includes(bi(article.title, lang).toLowerCase().split(" ")[0])) score += 1;
    return { article, score };
  });

  return scored
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.article);
};

/* ============================================================
   STORAGE
============================================================ */

const TICKETS_KEY = "fluxoops-tickets-v4";
const LANG_KEY = "fluxoops-lang";

const loadTickets = () => {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return SEED_TICKETS;
};
const saveTickets = (tickets) => {
  try { localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); } catch (e) {}
};
const loadLang = () => {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === "pt" || v === "en") return v;
  } catch (e) {}
  return "pt";
};
const saveLang = (lang) => {
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
};


/* ============================================================
   UI PRIMITIVES
============================================================ */

const Pill = ({ color, bg, children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${className}`}
    style={{ backgroundColor: bg || `${color}15`, color, border: `1px solid ${color}40` }}
  >
    {children}
  </span>
);

const Card = ({ children, className = "", style = {} }) => (
  <div className={`rounded-2xl ${className}`} style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, ...style }}>
    {children}
  </div>
);

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="block w-7 h-0.5 rounded-sm" style={{ backgroundColor: T.pink }} />
    <span className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: T.pinkDark }}>
      {children}
    </span>
  </div>
);

const PageTitle = ({ eyebrow, title, accent }) => (
  <div className="mb-6">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="text-4xl md:text-5xl leading-[1.1]" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
      {accent ? (<>{title} <em style={{ color: T.pinkDark, fontStyle: "italic" }}>{accent}</em></>) : title}
    </h1>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textMid }}>{label}</label>
    {children}
    {hint && <div className="text-xs mt-1.5" style={{ color: T.textLight }}>{hint}</div>}
  </div>
);

const inputStyle = {
  backgroundColor: T.surface,
  border: `1.5px solid ${T.border}`,
  color: T.text,
  fontFamily: "DM Sans",
};

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(44,40,37,0.5)", backdropFilter: "blur(4px)" }} onClick={onClose}>
    <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const TypeBadge = ({ type, t, size = "md" }) => {
  const cfg = TICKET_TYPES[type];
  const Icon = cfg.icon;
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} rounded-full text-[11px] font-medium`}
      style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
      <Icon size={11} />
      {t.typesShort[type]}
    </span>
  );
};

/* ============================================================
   LOGIN SCREEN
============================================================ */

const LoginScreen = ({ onLogin, lang, setLang }) => {
  const t = i18n[lang];
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: T.bg }}>
      <div className="absolute top-5 right-5">
        <LangToggle lang={lang} onChange={setLang} />
      </div>

      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 22, fontFamily: "'DM Serif Display', serif" }}>F</span>
            </div>
          </div>
          <div className="text-sm font-medium uppercase tracking-[0.2em] mb-2" style={{ color: T.pinkDark }}>{t.login.welcome}</div>
          <h1 className="text-5xl md:text-6xl mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: T.text, lineHeight: 1.05 }}>
            {t.appName}
          </h1>
          <p className="text-base" style={{ color: T.textMid }}>{t.login.subtitle}</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm font-medium" style={{ color: T.textMid }}>{t.login.selectRole}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RoleCard
            icon={ShieldCheck}
            title={t.login.operator}
            desc={t.login.operatorDesc}
            accent={T.pinkDark}
            bg={T.pinkLight}
            onClick={() => onLogin("operator")}
            cta={t.login.enter}
          />
          <RoleCard
            icon={User}
            title={t.login.enduser}
            desc={t.login.enduserDesc}
            accent={T.blueDark}
            bg={T.blueLight}
            onClick={() => onLogin("enduser")}
            cta={t.login.enter}
          />
        </div>

        <div className="text-center mt-10 text-xs" style={{ color: T.textLight }}>{t.login.footer}</div>
      </div>
    </div>
  );
};

const RoleCard = ({ icon: Icon, title, desc, accent, bg, onClick, cta }) => (
  <button onClick={onClick} className="group p-7 rounded-2xl text-left transition-all hover:translate-y-[-2px] hover:shadow-xl"
    style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: bg }}>
      <Icon size={26} style={{ color: accent }} />
    </div>
    <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{title}</h3>
    <p className="text-sm leading-relaxed mb-5" style={{ color: T.textMid }}>{desc}</p>
    <div className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: accent }}>
      {cta} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </div>
  </button>
);

/* ============================================================
   LANGUAGE TOGGLE
============================================================ */

const LangToggle = ({ lang, onChange }) => (
  <div className="inline-flex items-center rounded-full overflow-hidden" style={{ border: `1.5px solid ${T.border}` }}>
    {["en", "pt"].map((l) => (
      <button key={l} onClick={() => onChange(l)} className="px-3 py-1 text-[11px] font-bold tracking-wider transition-all"
        style={{
          backgroundColor: lang === l ? T.text : "transparent",
          color: lang === l ? "#fff" : T.textLight,
          borderRadius: lang === l ? "99px" : 0,
        }}>
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

/* ============================================================
   ATTACHMENT INPUT
============================================================ */

const AttachmentInput = ({ files, onChange, t }) => {
  const inputRef = useRef(null);
  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map((f) => ({ name: f.name, size: f.size }));
    onChange([...files, ...newFiles]);
    e.target.value = "";
  };
  const removeFile = (idx) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div>
      <input ref={inputRef} type="file" multiple onChange={handleFiles} style={{ display: "none" }} />
      <button type="button" onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        style={{ backgroundColor: T.surface, border: `1.5px dashed ${T.border}`, color: T.textMid }}>
        <Paperclip size={14} />
        {t.common.addAttachment}
      </button>
      {files.length > 0 && (
        <div className="space-y-2 mt-3">
          {files.map((f, idx) => (
            <div key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
              <FileText size={14} style={{ color: T.textMid, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                <div className="text-xs" style={{ color: T.textLight }}>{formatFileSize(f.size)}</div>
              </div>
              <button type="button" onClick={() => removeFile(idx)} className="text-xs font-medium px-2 py-1 rounded-md" style={{ color: T.pinkDark }}>
                {t.common.removeAttachment}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


/* ============================================================
   DASHBOARD (operator only)
============================================================ */

const KpiCard = ({ icon: Icon, label, value, unit, accent, bg, sub }) => (
  <Card className="p-5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: bg }} />
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.textMid }}>{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
          <Icon size={15} style={{ color: accent }} />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl tabular-nums" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{value}</span>
        {unit && <span className="text-sm" style={{ color: T.textMid }}>{unit}</span>}
      </div>
      <div className="text-xs mt-1" style={{ color: T.textLight }}>{sub}</div>
    </div>
  </Card>
);

const Dashboard = ({ tickets, lang }) => {
  const t = i18n[lang];

  const stats = useMemo(() => {
    const open = tickets.filter((x) => x.status !== "resolved" && x.status !== "closed");
    const breached = open.filter((x) => slaStatus(x).state === "breach").length;
    const atRisk = open.filter((x) => slaStatus(x).state === "risk").length;
    const p1 = open.filter((x) => x.priority === "P1").length;
    const incidents = open.filter((x) => x.type === "incident").length;
    const changesPending = tickets.filter((x) => x.type === "change" && x.status === "pending_approval").length;
    const resolvedToday = tickets.filter((x) => x.status === "resolved" && Date.now() - x.updatedAt < 86400000).length;
    const resolvedTickets = tickets.filter((x) => x.status === "resolved");
    const avgMTTR = resolvedTickets.length > 0
      ? resolvedTickets.reduce((s, x) => s + (x.updatedAt - x.createdAt), 0) / resolvedTickets.length / 3600000
      : 0;
    return { totalOpen: open.length, breached, atRisk, p1, incidents, changesPending, resolvedToday, avgMTTR };
  }, [tickets]);

  const byPriority = useMemo(() => {
    const map = { P1: 0, P2: 0, P3: 0, P4: 0 };
    tickets.filter((x) => x.status !== "resolved" && x.status !== "closed").forEach((x) => (map[x.priority] = (map[x.priority] || 0) + 1));
    return Object.entries(map).map(([k, v]) => ({ name: k, value: v, color: PRIORITIES[k].color }));
  }, [tickets]);

  const byType = useMemo(() => {
    const map = { incident: 0, service_request: 0, change: 0 };
    tickets.filter((x) => x.status !== "resolved" && x.status !== "closed").forEach((x) => (map[x.type] = (map[x.type] || 0) + 1));
    return Object.entries(map).map(([k, v]) => ({ key: k, value: v, color: TICKET_TYPES[k].color, label: t.typesShort[k] }));
  }, [tickets, lang]);

  const trend = useMemo(() => {
    const days = 7;
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = Date.now() - i * 86400000;
      const dayEnd = dayStart + 86400000;
      const created = tickets.filter((x) => x.createdAt >= dayStart - 86400000 && x.createdAt < dayEnd).length;
      const resolved = tickets.filter((x) => x.status === "resolved" && x.updatedAt >= dayStart - 86400000 && x.updatedAt < dayEnd).length;
      const d = new Date(dayStart);
      result.push({ day: `${d.getDate()}/${d.getMonth() + 1}`, [t.dashboard.chartOpened]: created, [t.dashboard.chartResolved]: resolved });
    }
    return result;
  }, [tickets, lang]);

  return (
    <div>
      <PageTitle eyebrow={t.dashboard.eyebrow} title={t.dashboard.title} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard icon={Activity} label={t.dashboard.kpiOpen} value={stats.totalOpen} accent={T.blueDark} bg={T.blueLight} sub={t.dashboard.resolvedToday(stats.resolvedToday)} />
        <KpiCard icon={AlertOctagon} label={t.dashboard.kpiIncidents} value={stats.incidents} accent={T.pinkDark} bg={T.pinkLight} sub={`${stats.p1} P1`} />
        <KpiCard icon={GitBranch} label={t.dashboard.kpiChanges} value={stats.changesPending} accent={T.yellowDark} bg={T.yellowLight} sub={t.dashboard.maxResponse} />
        <KpiCard icon={Clock} label={t.dashboard.kpiMttr} value={stats.avgMTTR.toFixed(1)} unit="h" accent={T.greenDark} bg={T.greenLight} sub={t.dashboard.lastResolved} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <Eyebrow>{t.dashboard.dailyVolumeEyebrow}</Eyebrow>
              <h3 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{t.dashboard.dailyVolumeTitle}</h3>
            </div>
            <Pill color={T.greenDark} bg={T.greenLight}>{t.dashboard.sevenDays}</Pill>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.pinkDark} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={T.pinkDark} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.greenDark} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={T.greenDark} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="day" stroke={T.textLight} tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <YAxis stroke={T.textLight} tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <Tooltip contentStyle={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", fontSize: "12px", fontFamily: "DM Sans" }} />
              <Area type="monotone" dataKey={t.dashboard.chartOpened} stroke={T.pinkDark} fill="url(#gradOpen)" strokeWidth={2} />
              <Area type="monotone" dataKey={t.dashboard.chartResolved} stroke={T.greenDark} fill="url(#gradRes)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <Eyebrow>{t.dashboard.typeBreakdownEyebrow}</Eyebrow>
          <h3 className="text-xl mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{t.dashboard.typeBreakdownTitle}</h3>
          <div className="space-y-4">
            {byType.map((item) => {
              const total = byType.reduce((s, x) => s + x.value, 0) || 1;
              const pct = (item.value / total) * 100;
              const TypeIcon = TICKET_TYPES[item.key].icon;
              return (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: T.text }}>
                      <TypeIcon size={12} style={{ color: item.color }} />
                      {item.label}
                    </span>
                    <span className="text-sm tabular-nums" style={{ color: T.textMid }}>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.bg2 }}>
                    <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <Eyebrow>{t.dashboard.distributionEyebrow}</Eyebrow>
        <h3 className="text-xl mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{t.dashboard.distributionTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {byPriority.map((p) => {
            const total = byPriority.reduce((s, x) => s + x.value, 0) || 1;
            const pct = (p.value / total) * 100;
            return (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: T.text }}>{p.name}</span>
                  <span className="text-sm tabular-nums" style={{ color: T.textMid }}>{p.value}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.bg2 }}>
                  <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <Eyebrow>{t.dashboard.catalogEyebrow}</Eyebrow>
        <h3 className="text-xl mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{t.dashboard.catalogTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const Icon = cat.icon;
            const count = tickets.filter((x) => x.category === key).length;
            return (
              <div key={key} className="rounded-xl p-3 transition-all hover:translate-y-[-2px]" style={{ backgroundColor: cat.bg, border: `1px solid ${cat.accent}30` }}>
                <Icon size={18} style={{ color: cat.accent }} />
                <div className="text-2xl mt-2 tabular-nums" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{count}</div>
                <div className="text-[10px] uppercase tracking-wider mt-0.5 leading-tight font-semibold" style={{ color: cat.accent }}>{t.categories[key]}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};


/* ============================================================
   SERVICE CATALOG VIEW
============================================================ */

const CategoryChip = ({ active, onClick, color, bg, children }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
    style={{
      backgroundColor: active ? bg : "transparent",
      borderColor: active ? color : T.border,
      borderWidth: 1.5, borderStyle: "solid",
      color: active ? color : T.textMid,
    }}>
    {children}
  </button>
);

const ServiceCatalogView = ({ onRequest, lang, currentUser }) => {
  const t = i18n[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [requesting, setRequesting] = useState(null);
  const [requesterName, setRequesterName] = useState(currentUser === "enduser" ? "End User" : "");
  const [extraNotes, setExtraNotes] = useState("");
  const [attachments, setAttachments] = useState([]);

  const filtered = useMemo(() => {
    return SERVICE_CATALOG.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return bi(s.name, lang).toLowerCase().includes(q) || bi(s.desc, lang).toLowerCase().includes(q);
    });
  }, [search, activeCategory, lang]);

  const submitRequest = () => {
    if (!requesting || !requesterName) return;
    const cat = CATEGORIES[requesting.category];
    const ticket = {
      id: newId("service_request"),
      type: "service_request",
      title: requesting.name,
      description: extraNotes
        ? { pt: `${requesting.desc.pt}\n\nObservações: ${extraNotes}`, en: `${requesting.desc.en}\n\nNotes: ${extraNotes}` }
        : requesting.desc,
      category: requesting.category,
      subKey: requesting.subKey,
      priority: requesting.defaultPriority,
      status: requesting.approval ? "pending_approval" : "new",
      team: cat.defaultTeam,
      requester: requesterName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      aiKey: "catalog",
      catalogId: requesting.id,
      attachments,
    };
    onRequest(ticket);
    setRequesting(null);
    setExtraNotes("");
    setAttachments([]);
  };

  return (
    <div>
      <PageTitle eyebrow={t.catalog.eyebrow} title={t.catalog.title} />
      <p className="text-base max-w-2xl mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>{t.catalog.desc}</p>

      <div className="space-y-3 mb-8">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.textLight }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.catalog.searchPh}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none transition-colors" style={inputStyle} />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip active={activeCategory === "all"} onClick={() => setActiveCategory("all")} color={T.pinkDark} bg={T.pinkLight}>
            {t.catalog.all} ({SERVICE_CATALOG.length})
          </CategoryChip>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = SERVICE_CATALOG.filter((s) => s.category === key).length;
            if (count === 0) return null;
            const Icon = cat.icon;
            return (
              <CategoryChip key={key} active={activeCategory === key} onClick={() => setActiveCategory(key)} color={cat.accent} bg={cat.bg}>
                <Icon size={12} />
                {t.categories[key]} ({count})
              </CategoryChip>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((svc) => {
          const cat = CATEGORIES[svc.category];
          const Icon = cat.icon;
          return (
            <Card key={svc.id} className="p-5 transition-all hover:shadow-lg group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.bg, border: `1px solid ${cat.accent}30` }}>
                  <Icon size={20} style={{ color: cat.accent }} />
                </div>
                <Pill color={PRIORITIES[svc.defaultPriority].color}>{svc.defaultPriority}</Pill>
              </div>
              <h3 className="text-lg leading-tight mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{bi(svc.name, lang)}</h3>
              <p className="text-sm leading-relaxed mb-4 min-h-[3rem]" style={{ color: T.textMid }}>{bi(svc.desc, lang)}</p>
              <div className="flex items-center justify-between text-xs mb-4 pb-4" style={{ color: T.textLight, borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span className="font-medium">{bi(svc.estimatedTime, lang)}</span>
                </div>
                {svc.approval && (
                  <div className="flex items-center gap-1.5" style={{ color: T.pinkDark }}>
                    <Lock size={12} />
                    <span className="font-medium">{t.catalog.approval}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setRequesting(svc)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all group-hover:translate-y-[-1px]"
                style={{ backgroundColor: T.text, color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.pinkDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = T.text)}>
                {t.catalog.requestBtn}
                <ArrowUpRight size={14} />
              </button>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="p-12 text-center" style={{ color: T.textMid }}>{t.catalog.empty}</div>}

      {requesting && (
        <Modal onClose={() => setRequesting(null)}>
          <div className="p-6" style={{ borderBottom: `1px solid ${T.border}` }}>
            <Eyebrow>{t.catalog.modalEyebrow}</Eyebrow>
            <h3 className="text-2xl" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{bi(requesting.name, lang)}</h3>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-sm leading-relaxed" style={{ color: T.textMid }}>{bi(requesting.desc, lang)}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{t.newTicket.priority}</div>
                <Pill color={PRIORITIES[requesting.defaultPriority].color}>{t.priorities[requesting.defaultPriority]}</Pill>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{t.catalog.modalEstTime}</div>
                <div className="text-sm font-medium" style={{ color: T.text }}>{bi(requesting.estimatedTime, lang)}</div>
              </div>
            </div>
            <Field label={`${t.common.requester} *`}>
              <input type="text" value={requesterName} onChange={(e) => setRequesterName(e.target.value)} placeholder={t.newTicket.requesterPh}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
            <Field label={t.catalog.modalNotes}>
              <textarea value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} rows={3} placeholder={t.catalog.modalNotesPh}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none" style={inputStyle} />
            </Field>
            <Field label={t.common.attachments}>
              <AttachmentInput files={attachments} onChange={setAttachments} t={t} />
            </Field>
            {requesting.approval && (
              <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}>
                <Lock size={16} style={{ color: T.pinkDark, flexShrink: 0, marginTop: 2 }} />
                <div className="text-sm leading-relaxed" style={{ color: T.pinkDark }}>{t.catalog.modalApproval}</div>
              </div>
            )}
            <button onClick={submitRequest} disabled={!requesterName}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
              <Send size={14} />
              {t.catalog.modalSubmit}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};


/* ============================================================
   TICKET LIST
============================================================ */

const TicketList = ({ tickets, onSelect, lang, isMyTickets, currentUser }) => {
  const t = i18n[lang];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tickets
      .filter((x) => {
        if (filter === "all") return true;
        if (filter === "open") return x.status !== "resolved" && x.status !== "closed";
        if (filter === "incident") return x.type === "incident";
        if (filter === "service_request") return x.type === "service_request";
        if (filter === "change") return x.type === "change";
        if (filter === "p1") return x.priority === "P1";
        if (filter === "breach") return slaStatus(x).state === "breach";
        return true;
      })
      .filter((x) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return bi(x.title, lang).toLowerCase().includes(s) || x.id.toLowerCase().includes(s) || bi(x.description, lang).toLowerCase().includes(s);
      })
      .sort((a, b) => {
        const wa = PRIORITIES[a.priority].weight;
        const wb = PRIORITIES[b.priority].weight;
        if (wa !== wb) return wb - wa;
        return b.createdAt - a.createdAt;
      });
  }, [tickets, filter, search, lang]);

  const filterOptions = isMyTickets
    ? [
        { key: "all", label: t.tickets.filterAll },
        { key: "open", label: t.tickets.filterOpen },
        { key: "incident", label: t.tickets.filterIncident },
        { key: "service_request", label: t.tickets.filterService },
      ]
    : [
        { key: "all", label: t.tickets.filterAll },
        { key: "open", label: t.tickets.filterOpen },
        { key: "incident", label: t.tickets.filterIncident },
        { key: "service_request", label: t.tickets.filterService },
        { key: "change", label: t.tickets.filterChange },
        { key: "p1", label: t.tickets.filterP1 },
        { key: "breach", label: t.tickets.filterBreach },
      ];

  return (
    <div>
      <PageTitle eyebrow={isMyTickets ? t.tickets.myEyebrow : t.tickets.eyebrow} title={isMyTickets ? t.tickets.myTitle : t.tickets.title} />
      {isMyTickets && <p className="text-base mb-6" style={{ color: T.textMid }}>{t.tickets.myDesc}</p>}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.textLight }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.tickets.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none" style={inputStyle} />
        </div>
        <div className="flex gap-1 p-1 rounded-full flex-wrap" style={{ backgroundColor: T.surface, border: `1.5px solid ${T.border}` }}>
          {filterOptions.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors"
              style={{ backgroundColor: filter === f.key ? T.text : "transparent", color: filter === f.key ? "#fff" : T.textMid }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-12 gap-3 px-6 py-3 text-[10px] font-semibold uppercase tracking-wider" style={{ borderBottom: `1px solid ${T.border}`, color: T.textLight }}>
          <div className="col-span-1">{t.tickets.thId}</div>
          <div className="col-span-4">{t.tickets.thTitle}</div>
          <div className="col-span-1">{t.tickets.thType}</div>
          <div className="col-span-2">{t.tickets.thCategory}</div>
          <div className="col-span-1">{t.tickets.thPrio}</div>
          <div className="col-span-2">{t.tickets.thStatus}</div>
          <div className="col-span-1">{t.tickets.thSla}</div>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm" style={{ color: T.textMid }}>
            {isMyTickets ? t.tickets.emptyMy : t.tickets.empty}
          </div>
        )}
        {filtered.map((x, idx) => {
          const cat = CATEGORIES[x.category];
          const Icon = cat?.icon || Ticket;
          const sla = slaStatus(x);
          const slaColor = sla.state === "breach" ? T.pinkDark : sla.state === "risk" ? T.yellowDark : T.greenDark;
          return (
            <button key={x.id} onClick={() => onSelect(x)} className="w-full grid grid-cols-12 gap-3 px-6 py-4 text-left items-center transition-colors"
              style={{ borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${T.border}` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.bg2)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              <div className="col-span-1 text-xs tabular-nums" style={{ color: T.textMid }}>{x.id}</div>
              <div className="col-span-4">
                <div className="text-sm font-medium truncate flex items-center gap-2" style={{ color: T.text }}>
                  {bi(x.title, lang)}
                  {x.attachments?.length > 0 && <Paperclip size={12} style={{ color: T.textLight, flexShrink: 0 }} />}
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>{x.requester} · {formatRelative(x.createdAt, t)}</div>
              </div>
              <div className="col-span-1"><TypeBadge type={x.type} t={t} size="sm" /></div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: cat?.accent }} />
                  <span className="text-xs truncate" style={{ color: T.textMid }}>{t.categories[x.category]}</span>
                </div>
              </div>
              <div className="col-span-1"><Pill color={PRIORITIES[x.priority].color}>{x.priority}</Pill></div>
              <div className="col-span-2"><Pill color={STATUSES[x.status].color}>{t.statuses[x.status]}</Pill></div>
              <div className="col-span-1">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.bg2 }}>
                  <div className="h-full transition-all rounded-full" style={{ width: `${sla.pct}%`, backgroundColor: slaColor }} />
                </div>
              </div>
            </button>
          );
        })}
      </Card>
    </div>
  );
};


/* ============================================================
   NEW TICKET (with type, KB suggestions, Change fields)
============================================================ */

const NewTicket = ({ onCreate, lang, currentUser, onOpenKb }) => {
  const t = i18n[lang];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState(currentUser === "enduser" ? "End User" : "");
  const [attachments, setAttachments] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [override, setOverride] = useState({});
  const [changeWindow, setChangeWindow] = useState("");
  const [changeRisk, setChangeRisk] = useState("medium");
  const [changeRollback, setChangeRollback] = useState("");

  // Live KB suggestions
  const kbSuggestions = useMemo(() => suggestKbArticles(title, description, lang), [title, description, lang]);

  const runAI = async () => {
    if (!title || !description) return;
    setLoading(true);
    setAiResult(null);
    const result = await categorizeWithAI(title, description);
    setLoading(false);
    if (result) {
      setAiResult(result);
      setOverride(result);
    }
  };

  const create = () => {
    if (!aiResult || !requester) return;
    const finalType = override.type || aiResult.type;
    const ticket = {
      id: newId(finalType),
      type: finalType,
      title: { pt: title, en: title },
      description: { pt: description, en: description },
      category: override.category || aiResult.category,
      subKey: override.subKey ?? aiResult.subKey,
      priority: override.priority || aiResult.priority,
      status: finalType === "change" ? "pending_approval" : "new",
      team: override.team || aiResult.team,
      requester,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      aiKey: aiResult.aiKey,
      attachments,
      ...(finalType === "change" ? { changeWindow, changeRisk, changeRollback } : {}),
    };
    onCreate(ticket);
    setTitle(""); setDescription(""); setAttachments([]);
    setAiResult(null); setOverride({});
    setChangeWindow(""); setChangeRisk("medium"); setChangeRollback("");
  };

  const activeCat = override.category || aiResult?.category;
  const activeType = override.type || aiResult?.type;
  const cat = activeCat ? CATEGORIES[activeCat] : null;

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow={t.newTicket.eyebrow} title={t.newTicket.title} />
      <p className="text-base mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>{t.newTicket.desc}</p>

      <Card className="p-6 mb-6">
        <div className="space-y-5">
          {currentUser !== "enduser" && (
            <Field label={t.common.requester}>
              <input type="text" value={requester} onChange={(e) => setRequester(e.target.value)} placeholder={t.newTicket.requesterPh}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          )}
          <Field label={t.newTicket.titleLabel}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.newTicket.titlePh}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </Field>
          <Field label={t.newTicket.descLabel}>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.newTicket.descPh}
              rows={5} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none" style={inputStyle} />
          </Field>

          {/* KB suggestions appear live as you type */}
          {kbSuggestions.length > 0 && !aiResult && (
            <div className="rounded-xl p-4" style={{ backgroundColor: T.yellowLight, border: `1px solid ${T.yellow}` }}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} style={{ color: T.yellowDark }} />
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.yellowDark }}>
                  {t.newTicket.kbSuggestionsTitle}
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: T.yellowDark }}>{t.newTicket.kbSuggestionsHint}</p>
              <div className="space-y-2">
                {kbSuggestions.map((article) => (
                  <button key={article.id} onClick={() => onOpenKb(article.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                    style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
                    <FileText size={14} style={{ color: T.yellowDark, flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: T.text }}>{bi(article.title, lang)}</div>
                      <div className="text-xs truncate" style={{ color: T.textMid }}>{bi(article.summary, lang)}</div>
                    </div>
                    <ChevronRight size={14} style={{ color: T.textLight, flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <Field label={t.common.attachments} hint={t.newTicket.attachmentHint}>
            <AttachmentInput files={attachments} onChange={setAttachments} t={t} />
          </Field>

          <button onClick={runAI} disabled={!title || !description || loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: T.text, color: "#fff" }}>
            {loading ? (<><Loader2 size={14} className="animate-spin" />{t.newTicket.analyzing}</>)
                     : (<><Sparkles size={14} />{t.newTicket.analyzeBtn}</>)}
          </button>
        </div>
      </Card>

      {aiResult && (
        <Card className="p-6" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} style={{ color: T.pinkDark }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.pinkDark }}>{t.newTicket.aiAnalysis}</span>
          </div>
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{t.newTicket.reasoning}</div>
            <div className="text-sm italic" style={{ color: T.textMid }}>{t.reasoning[aiResult.aiKey]}</div>
          </div>
          <div className="text-xs mb-5 italic" style={{ color: T.pinkDark }}>↓ {t.newTicket.reviewHint}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <Field label={t.newTicket.type}>
              <select value={activeType} onChange={(e) => setOverride({ ...override, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
                {Object.keys(TICKET_TYPES).map((k) => (
                  <option key={k} value={k}>{t.types[k]}</option>
                ))}
              </select>
            </Field>
            <Field label={t.newTicket.priority}>
              <select value={override.priority || aiResult.priority} onChange={(e) => setOverride({ ...override, priority: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
                {Object.keys(PRIORITIES).map((k) => (<option key={k} value={k}>{t.priorities[k]}</option>))}
              </select>
            </Field>
            <Field label={t.newTicket.category}>
              <select value={activeCat} onChange={(e) => setOverride({ ...override, category: e.target.value, subKey: 0 })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
                {Object.keys(CATEGORIES).map((k) => (<option key={k} value={k}>{t.categories[k]}</option>))}
              </select>
            </Field>
            <Field label={t.newTicket.subcategory}>
              <select value={override.subKey ?? aiResult.subKey} onChange={(e) => setOverride({ ...override, subKey: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
                {cat && cat.subcategories[lang].map((s, i) => (<option key={i} value={i}>{s}</option>))}
              </select>
            </Field>
            <Field label={t.newTicket.teamLabel}>
              <input type="text" value={override.team || aiResult.team} onChange={(e) => setOverride({ ...override, team: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          </div>

          {/* Change-specific fields */}
          {activeType === "change" && (
            <div className="rounded-xl p-5 mb-5" style={{ backgroundColor: T.yellowLight, border: `1px solid ${T.yellow}` }}>
              <div className="flex items-center gap-2 mb-4">
                <GitBranch size={14} style={{ color: T.yellowDark }} />
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.yellowDark }}>{t.newTicket.changeFields}</span>
              </div>
              <div className="space-y-4">
                <Field label={t.newTicket.changeWindow}>
                  <input type="text" value={changeWindow} onChange={(e) => setChangeWindow(e.target.value)} placeholder={t.newTicket.changeWindowPh}
                    className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
                </Field>
                <Field label={t.newTicket.changeRisk}>
                  <div className="flex gap-2">
                    {[
                      { key: "low", label: t.newTicket.riskLow, color: T.greenDark },
                      { key: "medium", label: t.newTicket.riskMedium, color: T.yellowDark },
                      { key: "high", label: t.newTicket.riskHigh, color: T.pinkDark },
                    ].map((r) => (
                      <button key={r.key} onClick={() => setChangeRisk(r.key)} type="button"
                        className="flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          backgroundColor: changeRisk === r.key ? `${r.color}20` : T.surface,
                          border: `1.5px solid ${changeRisk === r.key ? r.color : T.border}`,
                          color: changeRisk === r.key ? r.color : T.textMid,
                        }}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label={t.newTicket.changeRollback}>
                  <textarea value={changeRollback} onChange={(e) => setChangeRollback(e.target.value)} rows={3} placeholder={t.newTicket.changeRollbackPh}
                    className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none resize-none" style={inputStyle} />
                </Field>
              </div>
            </div>
          )}

          {cat && (
            <div className="rounded-xl p-4 mb-5 flex items-center gap-3" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.bg }}>
                <cat.icon size={20} style={{ color: cat.accent }} />
              </div>
              <div className="flex-1">
                <div className="text-sm" style={{ color: T.text }}>
                  {t.newTicket.slaTarget}:{" "}
                  <span className="font-semibold tabular-nums" style={{ color: T.pinkDark }}>
                    {(PRIORITIES[override.priority || aiResult.priority].slaResolveMin / 60).toFixed(1)}h
                  </span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>
                  {t.newTicket.initialResponse} {PRIORITIES[override.priority || aiResult.priority].slaResponseMin}min
                </div>
              </div>
            </div>
          )}

          <button onClick={create} disabled={!requester}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: T.greenDark, color: "#fff" }}>
            <Send size={14} />
            {t.newTicket.submit}
          </button>
        </Card>
      )}
    </div>
  );
};


/* ============================================================
   TICKET DETAIL
============================================================ */

const DetailItem = ({ label, value, icon: Icon, accent }) => (
  <div>
    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{label}</div>
    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: T.text }}>
      {Icon && <Icon size={14} style={{ color: accent }} />}
      {value}
    </div>
  </div>
);

const TicketDetail = ({ ticket, onClose, onUpdate, lang, currentUser }) => {
  if (!ticket) return null;
  const t = i18n[lang];
  const cat = CATEGORIES[ticket.category];
  const Icon = cat?.icon || Ticket;
  const sla = slaStatus(ticket);
  const slaColor = sla.state === "breach" ? T.pinkDark : sla.state === "risk" ? T.yellowDark : T.greenDark;
  const updateStatus = (status) => onUpdate({ ...ticket, status, updatedAt: Date.now() });
  const subLabel = cat?.subcategories[lang][ticket.subKey] || "";
  const riskLabel = ticket.changeRisk === "low" ? t.newTicket.riskLow : ticket.changeRisk === "high" ? t.newTicket.riskHigh : t.newTicket.riskMedium;
  const riskColor = ticket.changeRisk === "low" ? T.greenDark : ticket.changeRisk === "high" ? T.pinkDark : T.yellowDark;

  return (
    <Modal onClose={onClose}>
      <div className="p-6 flex items-start justify-between gap-4" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium tabular-nums" style={{ color: T.textMid }}>{ticket.id}</span>
            <TypeBadge type={ticket.type} t={t} size="sm" />
            <Pill color={PRIORITIES[ticket.priority].color}>{ticket.priority}</Pill>
            <Pill color={STATUSES[ticket.status].color}>{t.statuses[ticket.status]}</Pill>
          </div>
          <h2 className="text-2xl leading-tight" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>{bi(ticket.title, lang)}</h2>
        </div>
        <button onClick={onClose} className="p-1" style={{ color: T.textMid }}><X size={22} /></button>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textLight }}>{t.detail.description}</div>
          <div className="text-sm leading-relaxed rounded-xl p-4 whitespace-pre-line" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}`, color: T.text }}>
            {bi(ticket.description, lang)}
          </div>
        </div>

        {/* Change-specific info */}
        {ticket.type === "change" && (
          <div className="rounded-xl p-5" style={{ backgroundColor: T.yellowLight, border: `1px solid ${T.yellow}` }}>
            <div className="flex items-center gap-2 mb-3">
              <GitBranch size={14} style={{ color: T.yellowDark }} />
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.yellowDark }}>{t.detail.changeInfo}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <DetailItem label={t.detail.window} value={ticket.changeWindow || "—"} icon={Clock} accent={T.yellowDark} />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{t.detail.risk}</div>
                <Pill color={riskColor}>{riskLabel}</Pill>
              </div>
            </div>
            {ticket.changeRollback && (
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: T.textLight }}>{t.detail.rollback}</div>
                <div className="text-sm leading-relaxed" style={{ color: T.text }}>{ticket.changeRollback}</div>
              </div>
            )}
          </div>
        )}

        {ticket.attachments?.length > 0 && (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textLight }}>{t.common.attachments}</div>
            <div className="space-y-2">
              {ticket.attachments.map((f, idx) => (
                <div key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
                  <FileText size={14} style={{ color: T.textMid }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                    <div className="text-xs" style={{ color: T.textLight }}>{formatFileSize(f.size)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ticket.aiKey && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={12} style={{ color: T.pinkDark }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.pinkDark }}>{t.detail.aiAnalysis}</span>
            </div>
            <div className="text-sm italic rounded-xl p-4" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}`, color: T.pinkDark }}>
              {ticket.aiKey === "catalog" ? t.reasoning.catalog(ticket.catalogId) : t.reasoning[ticket.aiKey]}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <DetailItem label={t.newTicket.category} value={t.categories[ticket.category]} icon={Icon} accent={cat?.accent} />
          <DetailItem label={t.newTicket.subcategory} value={subLabel} />
          <DetailItem label={t.common.team} value={ticket.team} />
          <DetailItem label={t.common.requester} value={ticket.requester} />
          <DetailItem label={t.common.created} value={formatRelative(ticket.createdAt, t)} />
          <DetailItem label={t.common.updated} value={formatRelative(ticket.updatedAt, t)} />
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.textLight }}>{t.detail.slaStatus}</div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: slaColor }}>
              {sla.state === "breach" ? t.detail.breached : sla.state === "risk" ? t.detail.atRisk : t.detail.onTrack}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.surface }}>
            <div className="h-full transition-all rounded-full" style={{ width: `${sla.pct}%`, backgroundColor: slaColor }} />
          </div>
          <div className="text-xs mt-2 tabular-nums" style={{ color: T.textMid }}>
            {t.detail.slaTarget}: {(PRIORITIES[ticket.priority].slaResolveMin / 60).toFixed(1)} {t.detail.hoursTotal}
          </div>
        </div>

        {/* Status actions only for operator */}
        {currentUser === "operator" && (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: T.textLight }}>{t.detail.changeStatus}</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUSES).map(([key, s]) => (
                <button key={key} onClick={() => updateStatus(key)} disabled={ticket.status === key}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all"
                  style={{
                    backgroundColor: ticket.status === key ? `${s.color}15` : "transparent",
                    borderColor: ticket.status === key ? s.color : T.border,
                    borderWidth: 1.5, borderStyle: "solid",
                    color: ticket.status === key ? s.color : T.textMid,
                    cursor: ticket.status === key ? "default" : "pointer",
                  }}>
                  {t.statuses[key]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};


/* ============================================================
   KNOWLEDGE BASE
============================================================ */

/* Simple markdown renderer for KB articles (just headings and bullets) */
const renderMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1.5 mb-4" style={{ color: T.text }}>
          {listBuffer.map((item, i) => (<li key={i} className="text-sm leading-relaxed">{renderInline(item)}</li>))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const renderInline = (txt) => {
    const parts = txt.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ color: T.text, fontWeight: 600 }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>);
  };

  lines.forEach((line, idx) => {
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xl mt-6 mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
          {line.slice(3)}
        </h3>
      );
    } else if (line.match(/^\d+\. /)) {
      flushList();
      const match = line.match(/^(\d+)\. (.+)/);
      if (match) {
        elements.push(
          <div key={idx} className="flex gap-3 mb-2">
            <span className="text-sm font-semibold tabular-nums" style={{ color: T.pinkDark, minWidth: 18 }}>{match[1]}.</span>
            <span className="text-sm leading-relaxed flex-1" style={{ color: T.text }}>{renderInline(match[2])}</span>
          </div>
        );
      }
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={idx} className="text-sm leading-relaxed mb-3" style={{ color: T.text }}>{renderInline(line)}</p>
      );
    }
  });
  flushList();
  return elements;
};

const KnowledgeBase = ({ lang, focusedArticleId, onClearFocus, onOpenTicket }) => {
  const t = i18n[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(null);

  // If parent forced a focused article, show it
  useEffect(() => {
    if (focusedArticleId) {
      const article = KB_ARTICLES.find((a) => a.id === focusedArticleId);
      if (article) {
        setSelected(article);
        onClearFocus?.();
      }
    }
  }, [focusedArticleId]);

  const filtered = useMemo(() => {
    return KB_ARTICLES.filter((a) => {
      if (activeCategory !== "all" && a.category !== activeCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return bi(a.title, lang).toLowerCase().includes(q) ||
             bi(a.summary, lang).toLowerCase().includes(q) ||
             a.keywords.some((k) => k.includes(q));
    });
  }, [search, activeCategory, lang]);

  // Article view
  if (selected) {
    const cat = CATEGORIES[selected.category];
    const Icon = cat.icon;
    return (
      <div className="max-w-3xl">
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
          style={{ color: T.textMid }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.pinkDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.textMid)}>
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
          {t.kb.backToList}
        </button>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Pill color={cat.accent} bg={cat.bg}><Icon size={11} />{t.categories[selected.category]}</Pill>
          <Pill color={T.textLight}><Clock size={11} />{selected.readTime} {t.kb.readTime}</Pill>
        </div>

        <h1 className="text-4xl mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: T.text, lineHeight: 1.15 }}>{bi(selected.title, lang)}</h1>
        <p className="text-base mb-8 leading-relaxed" style={{ color: T.textMid }}>{bi(selected.summary, lang)}</p>

        <Card className="p-7 mb-6">
          <div>{renderMarkdown(bi(selected.body, lang))}</div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: T.surface }}>
              <HelpCircle size={20} style={{ color: T.pinkDark }} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: T.pinkDark }}>{t.kb.stillNeedHelp}</h4>
              <p className="text-sm mb-4" style={{ color: T.pinkDark }}>{t.kb.stillNeedHelpDesc}</p>
              <button onClick={onOpenTicket}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
                <PlusCircle size={14} />
                {t.kb.openTicket}
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // List view
  return (
    <div>
      <PageTitle eyebrow={t.kb.eyebrow} title={t.kb.title} />
      <p className="text-base max-w-2xl mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>{t.kb.desc}</p>

      <div className="space-y-3 mb-8">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.textLight }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.kb.searchPh}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none" style={inputStyle} />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip active={activeCategory === "all"} onClick={() => setActiveCategory("all")} color={T.pinkDark} bg={T.pinkLight}>
            {t.kb.all} ({KB_ARTICLES.length})
          </CategoryChip>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = KB_ARTICLES.filter((a) => a.category === key).length;
            if (count === 0) return null;
            const Icon = cat.icon;
            return (
              <CategoryChip key={key} active={activeCategory === key} onClick={() => setActiveCategory(key)} color={cat.accent} bg={cat.bg}>
                <Icon size={12} />{t.categories[key]} ({count})
              </CategoryChip>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((article) => {
          const cat = CATEGORIES[article.category];
          const Icon = cat.icon;
          return (
            <button key={article.id} onClick={() => setSelected(article)}
              className="text-left p-5 rounded-2xl transition-all hover:translate-y-[-2px] hover:shadow-lg"
              style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.bg }}>
                  <Icon size={20} style={{ color: cat.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cat.accent }}>{t.categories[article.category]}</span>
                    <span className="text-[10px]" style={{ color: T.textLight }}>·</span>
                    <span className="text-[10px]" style={{ color: T.textLight }}>{article.readTime} {t.kb.readTime}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-1.5" style={{ color: T.text, lineHeight: 1.3 }}>{bi(article.title, lang)}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: T.textMid }}>{bi(article.summary, lang)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="p-12 text-center" style={{ color: T.textMid }}>{t.kb.empty}</div>}
    </div>
  );
};


/* ============================================================
   MAIN APP
============================================================ */

const USER_KEY = "fluxoops-user";
const loadUser = () => {
  try {
    const v = localStorage.getItem(USER_KEY);
    if (v === "operator" || v === "enduser") return v;
  } catch (e) {}
  return null;
};
const saveUser = (u) => { try { u ? localStorage.setItem(USER_KEY, u) : localStorage.removeItem(USER_KEY); } catch (e) {} };

export default function App() {
  const [currentUser, setCurrentUser] = useState(loadUser());
  const [view, setView] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState(loadLang());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedKbId, setFocusedKbId] = useState(null);

  useEffect(() => { setTickets(loadTickets()); setLoaded(true); }, []);
  useEffect(() => { if (loaded) saveTickets(tickets); }, [tickets, loaded]);
  useEffect(() => { saveLang(lang); }, [lang]);
  useEffect(() => { saveUser(currentUser); }, [currentUser]);

  const t = i18n[lang];

  // Default view by role
  useEffect(() => {
    if (currentUser === "operator") setView("dashboard");
    if (currentUser === "enduser") setView("catalog");
  }, [currentUser]);

  const handleCreate = (ticket) => {
    setTickets([ticket, ...tickets]);
    setView(currentUser === "enduser" ? "myTickets" : "tickets");
  };

  const handleUpdate = (updated) => {
    setTickets(tickets.map((x) => (x.id === updated.id ? updated : x)));
    setSelected(updated);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("dashboard");
    setSelected(null);
  };

  const openKbWithArticle = (id) => {
    setFocusedKbId(id);
    setView("kb");
  };

  // Login screen
  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} lang={lang} setLang={setLang} />;
  }

  // Filter "my tickets" for end user
  const userTickets = currentUser === "enduser"
    ? tickets.filter((x) => x.requester === "End User")
    : tickets;

  // Build nav per role
  const operatorNav = [
    { key: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { key: "catalog", label: t.nav.catalog, icon: BookOpen },
    { key: "tickets", label: t.nav.tickets, icon: Ticket },
    { key: "new", label: t.nav.newTicket, icon: PlusCircle },
    { key: "kb", label: t.nav.kb, icon: HelpCircle },
  ];

  const enduserNav = [
    { key: "catalog", label: t.nav.catalog, icon: BookOpen },
    { key: "new", label: t.nav.newTicket, icon: PlusCircle },
    { key: "myTickets", label: t.nav.myTickets, icon: Ticket },
    { key: "kb", label: t.nav.kb, icon: HelpCircle },
  ];

  const navItems = currentUser === "operator" ? operatorNav : enduserNav;

  return (
    <div className="min-h-screen" style={{ backgroundColor: T.bg, color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body, html, * { font-family: 'DM Sans', system-ui, sans-serif; }
        ::selection { background-color: ${T.pink}; color: ${T.text}; }
        input::placeholder, textarea::placeholder { color: ${T.textLight}; }
        select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A09890' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 14px; padding-right: 2rem; }
        input:focus, textarea:focus, select:focus { border-color: ${T.pinkDark} !important; }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex w-60 flex-col p-5" style={{ backgroundColor: T.bg2, borderRight: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2.5 mb-8 px-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>F</span>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", color: T.text, fontSize: 17, lineHeight: 1 }}>{t.appName}</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] mt-1" style={{ color: T.textLight }}>{t.appTagline}</div>
            </div>
          </div>

          {/* Role badge */}
          <div className="rounded-xl p-3 mb-6" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2">
              {currentUser === "operator" ? (
                <ShieldCheck size={14} style={{ color: T.pinkDark }} />
              ) : (
                <User size={14} style={{ color: T.blueDark }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: T.textLight }}>
                  {currentUser === "operator" ? t.login.operator : t.login.enduser}
                </div>
              </div>
              <button onClick={handleLogout} title={t.nav.logout} className="p-1 rounded transition-colors" style={{ color: T.textLight }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.pinkDark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.textLight)}>
                <LogOut size={13} />
              </button>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button key={item.key} onClick={() => { setView(item.key); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: active ? T.pinkLight : "transparent",
                    color: active ? T.pinkDark : T.textMid,
                    border: active ? `1px solid ${T.pink}` : "1px solid transparent",
                  }}>
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="rounded-xl p-3.5 text-xs mb-3" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={11} style={{ color: T.pinkDark }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.pinkDark }}>{t.aiopsLabel}</span>
            </div>
            <div style={{ color: T.pinkDark, lineHeight: 1.5 }}>{t.aiopsDesc}</div>
          </div>

          <div className="flex justify-center pt-2">
            <LangToggle lang={lang} onChange={setLang} />
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between" style={{ backgroundColor: T.bg2, borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>F</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16 }}>{t.appName}</span>
          </div>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} onChange={setLang} />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={20} style={{ color: T.text }} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[57px] left-0 right-0 z-30 p-3" style={{ backgroundColor: T.bg2, borderBottom: `1px solid ${T.border}` }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button key={item.key} onClick={() => { setView(item.key); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium mb-1"
                  style={{ backgroundColor: active ? T.pinkLight : "transparent", color: active ? T.pinkDark : T.textMid }}>
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium mb-1 mt-2"
              style={{ color: T.pinkDark, borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
              <LogOut size={16} />
              {t.nav.logout}
            </button>
          </div>
        )}

        <main className="flex-1 p-5 md:p-10 overflow-y-auto pt-20 md:pt-10">
          {!loaded ? (
            <div className="flex items-center justify-center h-64" style={{ color: T.textMid }}>
              <Loader2 size={20} className="animate-spin mr-2" /> {t.common.loading}
            </div>
          ) : (
            <>
              {view === "dashboard" && currentUser === "operator" && <Dashboard tickets={tickets} lang={lang} />}
              {view === "catalog" && <ServiceCatalogView onRequest={handleCreate} lang={lang} currentUser={currentUser} />}
              {view === "tickets" && currentUser === "operator" && (
                <TicketList tickets={tickets} onSelect={setSelected} lang={lang} isMyTickets={false} currentUser={currentUser} />
              )}
              {view === "myTickets" && currentUser === "enduser" && (
                <TicketList tickets={userTickets} onSelect={setSelected} lang={lang} isMyTickets={true} currentUser={currentUser} />
              )}
              {view === "new" && (
                <NewTicket onCreate={handleCreate} lang={lang} currentUser={currentUser} onOpenKb={openKbWithArticle} />
              )}
              {view === "kb" && (
                <KnowledgeBase lang={lang} focusedArticleId={focusedKbId} onClearFocus={() => setFocusedKbId(null)} onOpenTicket={() => setView("new")} />
              )}
            </>
          )}
        </main>
      </div>

      {selected && (
        <TicketDetail ticket={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} lang={lang} currentUser={currentUser} />
      )}
    </div>
  );
}
