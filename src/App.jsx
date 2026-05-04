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
  Smartphone,
  Mail,
  Wifi,
  Bug,
  Send,
  Flame,
  BookOpen,
  Menu,
  Cloud,
  Layers,
  Paperclip,
  FileText,
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
   THEME — paleta warm light do portfólio
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

  // categorias adicionais (variações da paleta)
  catSecurity: "#8B2845",
  catCloud: "#5A8FBE",
  catApps: "#7B5BA5",
  catAppsLight: "#EFE7F5",
  catGeneral: "#8B7E73",
};

/* ============================================================
   I18N — dicionários PT / EN
============================================================ */

const i18n = {
  pt: {
    appName: "FluxoOps",
    appTagline: "ITSM · v1.0",
    aiopsLabel: "AIOps",
    aiopsDesc:
      "Categorização e priorização automáticas de tickets, reduzindo tempo de triagem.",

    nav: {
      dashboard: "Dashboard",
      catalog: "Catálogo",
      tickets: "Tickets",
      newTicket: "Novo ticket",
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
    },

    dashboard: {
      eyebrow: "Operations Center",
      title: "Dashboard",
      kpiOpen: "Tickets abertos",
      kpiCritical: "Críticos (P1)",
      kpiSlaRisk: "SLA em risco",
      kpiMttr: "MTTR médio",
      resolvedToday: (n) => `${n} resolvidos hoje`,
      maxResponse: "Resposta máx. 15min",
      breached: (n) => `${n} já estouraram`,
      lastResolved: "Últimos resolvidos",
      dailyVolumeEyebrow: "Volume diário",
      dailyVolumeTitle: "Tickets abertos vs resolvidos",
      sevenDays: "7 dias",
      distributionEyebrow: "Distribuição",
      distributionTitle: "Por prioridade",
      catalogEyebrow: "Service Catalog",
      catalogTitle: "Tickets por categoria",
      chartOpened: "Abertos",
      chartResolved: "Resolvidos",
    },

    tickets: {
      eyebrow: "Service Desk",
      title: "Tickets",
      searchPlaceholder: "Buscar por título, ID ou descrição...",
      filterAll: "Todos",
      filterOpen: "Abertos",
      filterP1: "P1",
      filterBreach: "SLA estourado",
      thId: "ID",
      thTitle: "Título",
      thCategory: "Categoria",
      thPrio: "Prio",
      thStatus: "Status",
      thSla: "SLA",
      empty: "Nenhum ticket encontrado.",
    },

    newTicket: {
      eyebrow: "AIOps Categorization",
      title: "Novo ticket",
      desc: "A IA analisa o conteúdo e propõe categoria, prioridade e time. Você pode revisar e ajustar tudo antes de salvar.",
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
      category: "Categoria",
      subcategory: "Subcategoria",
      priority: "Prioridade",
      teamLabel: "Time responsável",
      slaTarget: "Tempo de resolução alvo",
      initialResponse: "Resposta inicial em até",
      submit: "Criar ticket",
      reviewHint:
        "Caso a IA não tenha classificado corretamente, ajuste os campos abaixo manualmente.",
      attachmentHint: "Tipos aceitos: imagens, PDFs, logs (até 10MB)",
    },

    catalog: {
      eyebrow: "Self-service portal",
      title: "Catálogo de Serviços",
      desc: "Itens padronizados que o time de TI oferece. Solicitações pelo catálogo seguem fluxo pré-aprovado e SLAs definidos — reduzem tempo de triagem e padronizam o atendimento.",
      searchPh: "O que você precisa? Ex: VPN, AWS, App Interna A...",
      all: "Todos",
      requestBtn: "Solicitar",
      empty: "Nenhum serviço encontrado.",
      modalEyebrow: "Confirmar solicitação",
      modalEstTime: "Tempo estimado",
      modalNotes: "Observações (opcional)",
      modalNotesPh: "Detalhes adicionais, urgência, contexto...",
      modalApproval:
        "Esse serviço requer aprovação. O ticket será criado em status 'Novo' e aguardará validação do gestor antes da execução.",
      modalSubmit: "Abrir solicitação",
      approval: "Aprovação",
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
      security:
        "Indicadores de incidente de segurança detectados — escalada prioritária para o SOC.",
      network:
        "Problema de conectividade ou infraestrutura de rede identificado.",
      iam: "Solicitação relacionada a identidade, autenticação ou controle de acesso.",
      hardware: "Falha ou solicitação de hardware físico identificada.",
      cloud:
        "Solicitação envolvendo infraestrutura cloud (AWS / Azure / GCP) — provisionamento, escalonamento ou configuração.",
      apps_internal:
        "Problema ou solicitação relacionada a uma aplicação interna da empresa.",
      saas: "SaaS corporativo (M365, Google Workspace, Salesforce, etc.) impactado.",
      general: "Solicitação geral sem categoria técnica específica.",
      catalog: (id) =>
        `Solicitação aberta via Catálogo de Serviços (${id}). Item padronizado, fluxo automatizado.`,
    },
  },

  en: {
    appName: "FluxoOps",
    appTagline: "ITSM · v1.0",
    aiopsLabel: "AIOps",
    aiopsDesc:
      "Automated ticket categorisation and prioritisation, reducing triage time.",

    nav: {
      dashboard: "Dashboard",
      catalog: "Catalog",
      tickets: "Tickets",
      newTicket: "New ticket",
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
    },

    dashboard: {
      eyebrow: "Operations Center",
      title: "Dashboard",
      kpiOpen: "Open tickets",
      kpiCritical: "Critical (P1)",
      kpiSlaRisk: "SLA at risk",
      kpiMttr: "Avg MTTR",
      resolvedToday: (n) => `${n} resolved today`,
      maxResponse: "Max response 15min",
      breached: (n) => `${n} already breached`,
      lastResolved: "Last resolved",
      dailyVolumeEyebrow: "Daily volume",
      dailyVolumeTitle: "Opened vs resolved tickets",
      sevenDays: "7 days",
      distributionEyebrow: "Distribution",
      distributionTitle: "By priority",
      catalogEyebrow: "Service Catalog",
      catalogTitle: "Tickets by category",
      chartOpened: "Opened",
      chartResolved: "Resolved",
    },

    tickets: {
      eyebrow: "Service Desk",
      title: "Tickets",
      searchPlaceholder: "Search by title, ID or description...",
      filterAll: "All",
      filterOpen: "Open",
      filterP1: "P1",
      filterBreach: "SLA breached",
      thId: "ID",
      thTitle: "Title",
      thCategory: "Category",
      thPrio: "Prio",
      thStatus: "Status",
      thSla: "SLA",
      empty: "No tickets found.",
    },

    newTicket: {
      eyebrow: "AIOps Categorisation",
      title: "New ticket",
      desc: "AI analyses the content and proposes category, priority and team. You can review and adjust everything before saving.",
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
      category: "Category",
      subcategory: "Subcategory",
      priority: "Priority",
      teamLabel: "Assigned team",
      slaTarget: "Target resolution time",
      initialResponse: "Initial response within",
      submit: "Create ticket",
      reviewHint: "If the AI did not classify correctly, adjust the fields manually below.",
      attachmentHint: "Accepted: images, PDFs, logs (up to 10MB)",
    },

    catalog: {
      eyebrow: "Self-service portal",
      title: "Service Catalog",
      desc: "Standardised items offered by the IT team. Catalog requests follow pre-approved workflows and defined SLAs — reducing triage time and standardising support.",
      searchPh: "What do you need? E.g. VPN, AWS, Internal App A...",
      all: "All",
      requestBtn: "Request",
      empty: "No services found.",
      modalEyebrow: "Confirm request",
      modalEstTime: "Estimated time",
      modalNotes: "Notes (optional)",
      modalNotesPh: "Additional details, urgency, context...",
      modalApproval:
        "This service requires approval. The ticket will be created in 'New' status and will await manager validation before execution.",
      modalSubmit: "Submit request",
      approval: "Approval",
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
      cloud:
        "Request involving cloud infrastructure (AWS / Azure / GCP) — provisioning, scaling or configuration.",
      apps_internal: "Issue or request related to an internal company application.",
      saas:
        "Corporate SaaS (M365, Google Workspace, Salesforce, etc.) impacted.",
      general: "General request without specific technical category.",
      catalog: (id) =>
        `Request opened via Service Catalog (${id}). Standardised item, automated workflow.`,
    },
  },
};

/* ============================================================
   DATA MODEL
============================================================ */

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
   SERVICE CATALOG (cloud-focused)
============================================================ */

const SERVICE_CATALOG = [
  // IAM
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

  // Hardware
  {
    id: "svc-hw-01",
    name: { pt: "Solicitar notebook corporativo", en: "Request corporate laptop" },
    desc: {
      pt: "Provisão de notebook conforme catálogo padrão.",
      en: "Laptop provisioning per standard catalog.",
    },
    category: "hardware",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "3 dias úteis", en: "3 business days" },
    approval: true,
  },
  {
    id: "svc-hw-02",
    name: { pt: "Solicitar periféricos", en: "Request peripherals" },
    desc: {
      pt: "Mouse, teclado, headset, monitor adicional, dock station.",
      en: "Mouse, keyboard, headset, additional monitor, dock station.",
    },
    category: "hardware",
    subKey: 1,
    defaultPriority: "P4",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: false,
  },

  // Cloud Infrastructure
  {
    id: "svc-cl-01",
    name: { pt: "Provisionar VM AWS / Azure", en: "Provision AWS / Azure VM" },
    desc: {
      pt: "Criação de instância EC2 ou Azure VM via Terraform com tags e ownership.",
      en: "EC2 or Azure VM creation via Terraform with tags and ownership.",
    },
    category: "cloud",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-cl-02",
    name: { pt: "Criar bucket S3 / Azure Blob", en: "Create S3 / Azure Blob bucket" },
    desc: {
      pt: "Provisionamento de storage com políticas de retenção, criptografia e acesso.",
      en: "Storage provisioning with retention, encryption and access policies.",
    },
    category: "cloud",
    subKey: 1,
    defaultPriority: "P3",
    estimatedTime: { pt: "4h", en: "4h" },
    approval: true,
  },
  {
    id: "svc-cl-03",
    name: { pt: "Conceder acesso IAM cloud", en: "Grant cloud IAM access" },
    desc: {
      pt: "Atribuição de role / policy AWS IAM ou Azure RBAC com least privilege.",
      en: "AWS IAM role / policy or Azure RBAC assignment with least privilege.",
    },
    category: "cloud",
    subKey: 2,
    defaultPriority: "P3",
    estimatedTime: { pt: "4h", en: "4h" },
    approval: true,
  },
  {
    id: "svc-cl-04",
    name: { pt: "Deploy em Kubernetes", en: "Kubernetes deployment" },
    desc: {
      pt: "Deploy de novo serviço em cluster EKS / AKS / GKE com manifests revisados.",
      en: "Deploy new service to EKS / AKS / GKE cluster with reviewed manifests.",
    },
    category: "cloud",
    subKey: 6,
    defaultPriority: "P3",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },
  {
    id: "svc-cl-05",
    name: { pt: "Escalar recursos cloud", en: "Scale cloud resources" },
    desc: {
      pt: "Aumento de capacidade (CPU, memória, storage) em ambiente produtivo.",
      en: "Capacity increase (CPU, memory, storage) in production environment.",
    },
    category: "cloud",
    subKey: 0,
    defaultPriority: "P2",
    estimatedTime: { pt: "2h", en: "2h" },
    approval: true,
  },
  {
    id: "svc-cl-06",
    name: { pt: "Investigar custo / billing cloud", en: "Investigate cloud cost / billing" },
    desc: {
      pt: "Análise FinOps de gastos anormais ou alertas de orçamento.",
      en: "FinOps analysis of abnormal spend or budget alerts.",
    },
    category: "cloud",
    subKey: 9,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: false,
  },
  {
    id: "svc-cl-07",
    name: { pt: "Configurar alerta de monitoramento", en: "Configure monitoring alert" },
    desc: {
      pt: "Criação de alarme no CloudWatch / Azure Monitor / Datadog.",
      en: "Alarm creation in CloudWatch / Azure Monitor / Datadog.",
    },
    category: "cloud",
    subKey: 8,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: false,
  },

  // Internal Apps
  {
    id: "svc-app-01",
    name: { pt: "Acesso à App Interna A", en: "Access to Internal App A" },
    desc: {
      pt: "Solicitação de acesso e atribuição de papel na App Interna A.",
      en: "Access request and role assignment in Internal App A.",
    },
    category: "apps_internal",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-app-02",
    name: { pt: "Reportar bug na App Interna A", en: "Report bug in Internal App A" },
    desc: {
      pt: "Ticket técnico para o time de desenvolvimento da App Interna A.",
      en: "Technical ticket for the Internal App A development team.",
    },
    category: "apps_internal",
    subKey: 1,
    defaultPriority: "P2",
    estimatedTime: { pt: "Análise em 4h", en: "Analysis within 4h" },
    approval: false,
  },
  {
    id: "svc-app-03",
    name: { pt: "Acesso à App Interna B", en: "Access to Internal App B" },
    desc: {
      pt: "Solicitação de acesso e atribuição de papel na App Interna B.",
      en: "Access request and role assignment in Internal App B.",
    },
    category: "apps_internal",
    subKey: 4,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-app-04",
    name: { pt: "Reportar bug na App Interna B", en: "Report bug in Internal App B" },
    desc: {
      pt: "Ticket técnico para o time de desenvolvimento da App Interna B.",
      en: "Technical ticket for the Internal App B development team.",
    },
    category: "apps_internal",
    subKey: 5,
    defaultPriority: "P2",
    estimatedTime: { pt: "Análise em 4h", en: "Analysis within 4h" },
    approval: false,
  },
  {
    id: "svc-app-05",
    name: { pt: "Solicitar nova funcionalidade", en: "Request new feature" },
    desc: {
      pt: "Submissão de feature request para apps internas. Avaliação pelo PO.",
      en: "Feature request submission for internal apps. Evaluation by PO.",
    },
    category: "apps_internal",
    subKey: 3,
    defaultPriority: "P4",
    estimatedTime: { pt: "Avaliação em 5 dias", en: "Evaluation within 5 days" },
    approval: true,
  },

  // Network
  {
    id: "svc-net-01",
    name: { pt: "Acesso VPN", en: "VPN access" },
    desc: {
      pt: "Configuração e habilitação de cliente VPN para acesso remoto.",
      en: "VPN client setup and enablement for remote access.",
    },
    category: "network",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "2h", en: "2h" },
    approval: true,
  },
  {
    id: "svc-net-02",
    name: { pt: "Liberação de regra de firewall", en: "Firewall rule exception" },
    desc: {
      pt: "Solicitação de exceção de firewall com justificativa de segurança.",
      en: "Firewall exception request with security justification.",
    },
    category: "network",
    subKey: 3,
    defaultPriority: "P3",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },

  // SaaS
  {
    id: "svc-sa-01",
    name: { pt: "Solicitar licença M365", en: "Request M365 license" },
    desc: {
      pt: "Atribuição de licença Microsoft 365 (E3, E5, Business Premium).",
      en: "Microsoft 365 license assignment (E3, E5, Business Premium).",
    },
    category: "saas",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: true,
  },
  {
    id: "svc-sa-02",
    name: { pt: "Novo site SharePoint / Teams", en: "New SharePoint / Teams site" },
    desc: {
      pt: "Criação de site colaborativo com governança e proprietário.",
      en: "Collaborative site creation with governance and owner.",
    },
    category: "saas",
    subKey: 0,
    defaultPriority: "P4",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },

  // Security
  {
    id: "svc-sec-01",
    name: { pt: "Reportar phishing", en: "Report phishing" },
    desc: {
      pt: "Notificação de tentativa de phishing para análise pelo SOC.",
      en: "Phishing attempt notification for SOC analysis.",
    },
    category: "security",
    subKey: 0,
    defaultPriority: "P2",
    estimatedTime: { pt: "1h", en: "1h" },
    approval: false,
  },
  {
    id: "svc-sec-02",
    name: { pt: "Reportar incidente de segurança", en: "Report security incident" },
    desc: {
      pt: "Abertura formal de incidente para investigação imediata.",
      en: "Formal incident report for immediate investigation.",
    },
    category: "security",
    subKey: 2,
    defaultPriority: "P1",
    estimatedTime: { pt: "Imediato", en: "Immediate" },
    approval: false,
  },

  // General
  {
    id: "svc-gen-01",
    name: { pt: "Dúvida geral / Como faço?", en: "General question / How do I?" },
    desc: {
      pt: "Suporte e orientação sobre processos, ferramentas ou políticas de TI.",
      en: "Support and guidance on IT processes, tools or policies.",
    },
    category: "general",
    subKey: 0,
    defaultPriority: "P4",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: false,
  },
];

/* ============================================================
   SEED DATA
============================================================ */

const SEED_TICKETS = [
  {
    id: "INC-1001",
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
    id: "INC-1004",
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
    id: "INC-1005",
    title: { pt: "Provisionar nova VM em AWS", en: "Provision new AWS VM" },
    description: {
      pt: "Time de dados precisa de nova EC2 t3.large para processamento ETL.",
      en: "Data team needs a new EC2 t3.large for ETL processing.",
    },
    category: "cloud",
    subKey: 0,
    priority: "P3",
    status: "waiting",
    team: "Cloud Operations",
    requester: "Julia Wagner",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    aiKey: "cloud",
    attachments: [],
  },
  {
    id: "INC-1006",
    title: { pt: "App Interna B lenta no relatório", en: "Internal App B slow on reports" },
    description: {
      pt: "Geração de relatórios mensais demora mais de 5 minutos. Antes era instantâneo.",
      en: "Monthly report generation takes over 5 minutes. Previously instantaneous.",
    },
    category: "apps_internal",
    subKey: 6,
    priority: "P2",
    status: "in_progress",
    team: "Internal Apps Support",
    requester: "Pedro Costa",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    updatedAt: Date.now() - 1000 * 60 * 30,
    aiKey: "apps_internal",
    attachments: [],
  },
  {
    id: "INC-1007",
    title: {
      pt: "Adicionar permissão IAM em bucket S3",
      en: "Add IAM permission to S3 bucket",
    },
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

const newId = () => `INC-${Math.floor(1000 + Math.random() * 9000)}`;

const bi = (val, lang) => {
  if (typeof val === "string") return val;
  if (val && typeof val === "object") return val[lang] || val.pt || val.en || "";
  return "";
};

/* ============================================================
   AI CATEGORIZATION (offline keyword-based)
============================================================ */

const KEYWORDS = {
  security: ["phishing", "malware", "ransomware", "vírus", "virus", "incidente", "incident", "vazamento", "leak", "violação", "violacao", "violation", "fraude", "fraud", "ataque", "attack", "invasão", "invasao", "breach", "comprometido", "compromised", "spam", "suspicious", "suspeito", "vulnerability", "vulnerabilidade"],
  cloud: ["aws", "azure", "gcp", "ec2", "s3", "lambda", "kubernetes", "k8s", "eks", "aks", "gke", "terraform", "iac", "cloudwatch", "cloudfront", "rds", "dynamodb", "blob", "storage", "vpc", "subnet", "container", "docker", "helm", "finops", "billing"],
  apps_internal: ["app interna", "internal app", "checkko", "chekko", "app a", "app b", "aplicação interna", "aplicacao interna"],
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

  let bestCat = "general";
  let bestScore = 0;
  for (const [cat, terms] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const term of terms) {
      if (text.includes(term)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }

  let priority = "P3";
  for (const [p, signals] of Object.entries(PRIORITY_SIGNALS)) {
    if (signals.some((s) => text.includes(s))) {
      priority = p;
      break;
    }
  }

  if (bestCat === "security" && (priority === "P3" || priority === "P4")) {
    priority = "P2";
  }

  const cat = CATEGORIES[bestCat];
  let subKey = 0;
  cat.subcategories.pt.forEach((sub, idx) => {
    const firstWord = sub.toLowerCase().split(" ")[0].replace(/[—,.]/g, "");
    if (firstWord && text.includes(firstWord)) subKey = idx;
  });

  return {
    category: bestCat,
    subKey,
    priority,
    team: cat.defaultTeam,
    aiKey: bestCat,
  };
};

/* ============================================================
   STORAGE
============================================================ */

const TICKETS_KEY = "fluxoops-tickets-v3";
const LANG_KEY = "fluxoops-lang";

const loadTickets = () => {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return SEED_TICKETS;
};
const saveTickets = (tickets) => {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  } catch (e) {}
};
const loadLang = () => {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === "pt" || v === "en") return v;
  } catch (e) {}
  return "pt";
};
const saveLang = (lang) => {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
};

/* ============================================================
   UI PRIMITIVES
============================================================ */

const Pill = ({ color, bg, children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${className}`}
    style={{
      backgroundColor: bg || `${color}15`,
      color: color,
      border: `1px solid ${color}40`,
    }}
  >
    {children}
  </span>
);

const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-2xl ${className}`}
    style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, ...style }}
  >
    {children}
  </div>
);

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="block w-7 h-0.5 rounded-sm" style={{ backgroundColor: T.pink }} />
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.15em]"
      style={{ color: T.pinkDark }}
    >
      {children}
    </span>
  </div>
);

const PageTitle = ({ eyebrow, title, accent }) => (
  <div className="mb-6">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1
      className="text-4xl md:text-5xl leading-[1.1]"
      style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
    >
      {accent ? (
        <>
          {title}{" "}
          <em style={{ color: T.pinkDark, fontStyle: "italic" }}>{accent}</em>
        </>
      ) : (
        title
      )}
    </h1>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label
      className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
      style={{ color: T.textMid }}
    >
      {label}
    </label>
    {children}
    {hint && (
      <div className="text-xs mt-1.5" style={{ color: T.textLight }}>
        {hint}
      </div>
    )}
  </div>
);

const inputStyle = {
  backgroundColor: T.surface,
  border: `1.5px solid ${T.border}`,
  color: T.text,
  fontFamily: "DM Sans",
};

/* ============================================================
   ATTACHMENT INPUT
============================================================ */

const AttachmentInput = ({ files, onChange, t }) => {
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    onChange([...files, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFiles}
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        style={{
          backgroundColor: T.surface,
          border: `1.5px dashed ${T.border}`,
          color: T.textMid,
        }}
      >
        <Paperclip size={14} />
        {t.common.addAttachment}
      </button>

      {files.length > 0 && (
        <div className="space-y-2 mt-3">
          {files.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}
            >
              <FileText size={14} style={{ color: T.textMid, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate" style={{ color: T.text }}>
                  {f.name}
                </div>
                <div className="text-xs" style={{ color: T.textLight }}>
                  {formatFileSize(f.size)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-xs font-medium px-2 py-1 rounded-md"
                style={{ color: T.pinkDark }}
              >
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
   DASHBOARD
============================================================ */

const Dashboard = ({ tickets, lang }) => {
  const t = i18n[lang];

  const stats = useMemo(() => {
    const open = tickets.filter((x) => x.status !== "resolved" && x.status !== "closed");
    const breached = open.filter((x) => slaStatus(x).state === "breach").length;
    const atRisk = open.filter((x) => slaStatus(x).state === "risk").length;
    const p1 = open.filter((x) => x.priority === "P1").length;
    const resolvedToday = tickets.filter(
      (x) => x.status === "resolved" && Date.now() - x.updatedAt < 86400000
    ).length;
    const resolvedTickets = tickets.filter((x) => x.status === "resolved");
    const avgMTTR =
      resolvedTickets.length > 0
        ? resolvedTickets.reduce((s, x) => s + (x.updatedAt - x.createdAt), 0) /
          resolvedTickets.length /
          3600000
        : 0;
    return { totalOpen: open.length, breached, atRisk, p1, resolvedToday, avgMTTR };
  }, [tickets]);

  const byPriority = useMemo(() => {
    const map = { P1: 0, P2: 0, P3: 0, P4: 0 };
    tickets
      .filter((x) => x.status !== "resolved" && x.status !== "closed")
      .forEach((x) => (map[x.priority] = (map[x.priority] || 0) + 1));
    return Object.entries(map).map(([k, v]) => ({
      name: k,
      value: v,
      color: PRIORITIES[k].color,
    }));
  }, [tickets]);

  const trend = useMemo(() => {
    const days = 7;
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = Date.now() - i * 86400000;
      const dayEnd = dayStart + 86400000;
      const created = tickets.filter(
        (x) => x.createdAt >= dayStart - 86400000 && x.createdAt < dayEnd
      ).length;
      const resolved = tickets.filter(
        (x) =>
          x.status === "resolved" &&
          x.updatedAt >= dayStart - 86400000 &&
          x.updatedAt < dayEnd
      ).length;
      const d = new Date(dayStart);
      result.push({
        day: `${d.getDate()}/${d.getMonth() + 1}`,
        [t.dashboard.chartOpened]: created,
        [t.dashboard.chartResolved]: resolved,
      });
    }
    return result;
  }, [tickets, lang]);

  return (
    <div>
      <PageTitle eyebrow={t.dashboard.eyebrow} title={t.dashboard.title} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={Activity}
          label={t.dashboard.kpiOpen}
          value={stats.totalOpen}
          accent={T.blueDark}
          bg={T.blueLight}
          sub={t.dashboard.resolvedToday(stats.resolvedToday)}
        />
        <KpiCard
          icon={Flame}
          label={t.dashboard.kpiCritical}
          value={stats.p1}
          accent={T.pinkDark}
          bg={T.pinkLight}
          sub={t.dashboard.maxResponse}
        />
        <KpiCard
          icon={AlertTriangle}
          label={t.dashboard.kpiSlaRisk}
          value={stats.atRisk + stats.breached}
          accent={T.yellowDark}
          bg={T.yellowLight}
          sub={t.dashboard.breached(stats.breached)}
        />
        <KpiCard
          icon={Clock}
          label={t.dashboard.kpiMttr}
          value={stats.avgMTTR.toFixed(1)}
          unit="h"
          accent={T.greenDark}
          bg={T.greenLight}
          sub={t.dashboard.lastResolved}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <Eyebrow>{t.dashboard.dailyVolumeEyebrow}</Eyebrow>
              <h3
                className="text-xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
              >
                {t.dashboard.dailyVolumeTitle}
              </h3>
            </div>
            <Pill color={T.greenDark} bg={T.greenLight}>
              {t.dashboard.sevenDays}
            </Pill>
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
              <XAxis
                dataKey="day"
                stroke={T.textLight}
                tick={{ fontSize: 11, fontFamily: "DM Sans" }}
              />
              <YAxis stroke={T.textLight} tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontFamily: "DM Sans",
                }}
              />
              <Area
                type="monotone"
                dataKey={t.dashboard.chartOpened}
                stroke={T.pinkDark}
                fill="url(#gradOpen)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey={t.dashboard.chartResolved}
                stroke={T.greenDark}
                fill="url(#gradRes)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <Eyebrow>{t.dashboard.distributionEyebrow}</Eyebrow>
          <h3
            className="text-xl mb-5"
            style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
          >
            {t.dashboard.distributionTitle}
          </h3>
          <div className="space-y-4">
            {byPriority.map((p) => {
              const total = byPriority.reduce((s, x) => s + x.value, 0) || 1;
              const pct = (p.value / total) * 100;
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: T.text }}>
                      {p.name}
                    </span>
                    <span className="text-sm tabular-nums" style={{ color: T.textMid }}>
                      {p.value}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: T.bg2 }}
                  >
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Eyebrow>{t.dashboard.catalogEyebrow}</Eyebrow>
        <h3
          className="text-xl mb-5"
          style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
        >
          {t.dashboard.catalogTitle}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const Icon = cat.icon;
            const count = tickets.filter((x) => x.category === key).length;
            return (
              <div
                key={key}
                className="rounded-xl p-3 transition-all hover:translate-y-[-2px]"
                style={{
                  backgroundColor: cat.bg,
                  border: `1px solid ${cat.accent}30`,
                }}
              >
                <Icon size={18} style={{ color: cat.accent }} />
                <div
                  className="text-2xl mt-2 tabular-nums"
                  style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
                >
                  {count}
                </div>
                <div
                  className="text-[10px] uppercase tracking-wider mt-0.5 leading-tight font-semibold"
                  style={{ color: cat.accent }}
                >
                  {t.categories[key]}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, value, unit, accent, bg, sub }) => (
  <Card className="p-5 relative overflow-hidden">
    <div
      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"
      style={{ backgroundColor: bg }}
    />
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textMid }}
        >
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <Icon size={15} style={{ color: accent }} />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-4xl tabular-nums"
          style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm" style={{ color: T.textMid }}>
            {unit}
          </span>
        )}
      </div>
      <div className="text-xs mt-1" style={{ color: T.textLight }}>
        {sub}
      </div>
    </div>
  </Card>
);

/* ============================================================
   MODAL
============================================================ */

const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(44,40,37,0.5)", backdropFilter: "blur(4px)" }}
    onClick={onClose}
  >
    <div
      className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

/* ============================================================
   SERVICE CATALOG VIEW
============================================================ */

const CategoryChip = ({ active, onClick, color, bg, children }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
    style={{
      backgroundColor: active ? bg : "transparent",
      borderColor: active ? color : T.border,
      borderWidth: 1.5,
      borderStyle: "solid",
      color: active ? color : T.textMid,
    }}
  >
    {children}
  </button>
);

const ServiceCatalogView = ({ onRequest, lang }) => {
  const t = i18n[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [requesting, setRequesting] = useState(null);
  const [requesterName, setRequesterName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [attachments, setAttachments] = useState([]);

  const filtered = useMemo(() => {
    return SERVICE_CATALOG.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        bi(s.name, lang).toLowerCase().includes(q) ||
        bi(s.desc, lang).toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory, lang]);

  const submitRequest = () => {
    if (!requesting || !requesterName) return;
    const cat = CATEGORIES[requesting.category];
    const ticket = {
      id: newId(),
      title: requesting.name,
      description: extraNotes
        ? {
            pt: `${requesting.desc.pt}\n\nObservações: ${extraNotes}`,
            en: `${requesting.desc.en}\n\nNotes: ${extraNotes}`,
          }
        : requesting.desc,
      category: requesting.category,
      subKey: requesting.subKey,
      priority: requesting.defaultPriority,
      status: "new",
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
    setRequesterName("");
    setExtraNotes("");
    setAttachments([]);
  };

  return (
    <div>
      <PageTitle eyebrow={t.catalog.eyebrow} title={t.catalog.title} />
      <p className="text-base max-w-2xl mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>
        {t.catalog.desc}
      </p>

      <div className="space-y-3 mb-8">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: T.textLight }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.catalog.searchPh}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none transition-colors"
            style={inputStyle}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            color={T.pinkDark}
            bg={T.pinkLight}
          >
            {t.catalog.all} ({SERVICE_CATALOG.length})
          </CategoryChip>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = SERVICE_CATALOG.filter((s) => s.category === key).length;
            if (count === 0) return null;
            const Icon = cat.icon;
            return (
              <CategoryChip
                key={key}
                active={activeCategory === key}
                onClick={() => setActiveCategory(key)}
                color={cat.accent}
                bg={cat.bg}
              >
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
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: cat.bg, border: `1px solid ${cat.accent}30` }}
                >
                  <Icon size={20} style={{ color: cat.accent }} />
                </div>
                <Pill color={PRIORITIES[svc.defaultPriority].color}>
                  {svc.defaultPriority}
                </Pill>
              </div>

              <h3
                className="text-lg leading-tight mb-2"
                style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
              >
                {bi(svc.name, lang)}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4 min-h-[3rem]"
                style={{ color: T.textMid }}
              >
                {bi(svc.desc, lang)}
              </p>

              <div
                className="flex items-center justify-between text-xs mb-4 pb-4"
                style={{ color: T.textLight, borderBottom: `1px solid ${T.border}` }}
              >
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

              <button
                onClick={() => setRequesting(svc)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all group-hover:translate-y-[-1px]"
                style={{ backgroundColor: T.text, color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.pinkDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = T.text)}
              >
                {t.catalog.requestBtn}
                <ArrowUpRight size={14} />
              </button>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center" style={{ color: T.textMid }}>
          {t.catalog.empty}
        </div>
      )}

      {requesting && (
        <Modal onClose={() => setRequesting(null)}>
          <div className="p-6" style={{ borderBottom: `1px solid ${T.border}` }}>
            <Eyebrow>{t.catalog.modalEyebrow}</Eyebrow>
            <h3
              className="text-2xl"
              style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
            >
              {bi(requesting.name, lang)}
            </h3>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-sm leading-relaxed" style={{ color: T.textMid }}>
              {bi(requesting.desc, lang)}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}
              >
                <div
                  className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: T.textLight }}
                >
                  {t.newTicket.priority}
                </div>
                <Pill color={PRIORITIES[requesting.defaultPriority].color}>
                  {t.priorities[requesting.defaultPriority]}
                </Pill>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}
              >
                <div
                  className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: T.textLight }}
                >
                  {t.catalog.modalEstTime}
                </div>
                <div className="text-sm font-medium" style={{ color: T.text }}>
                  {bi(requesting.estimatedTime, lang)}
                </div>
              </div>
            </div>

            <Field label={`${t.common.requester} *`}>
              <input
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                placeholder={t.newTicket.requesterPh}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
              />
            </Field>

            <Field label={t.catalog.modalNotes}>
              <textarea
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                rows={3}
                placeholder={t.catalog.modalNotesPh}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                style={inputStyle}
              />
            </Field>

            <Field label={t.common.attachments}>
              <AttachmentInput files={attachments} onChange={setAttachments} t={t} />
            </Field>

            {requesting.approval && (
              <div
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}
              >
                <Lock size={16} style={{ color: T.pinkDark, flexShrink: 0, marginTop: 2 }} />
                <div className="text-sm leading-relaxed" style={{ color: T.pinkDark }}>
                  {t.catalog.modalApproval}
                </div>
              </div>
            )}

            <button
              onClick={submitRequest}
              disabled={!requesterName}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: T.pinkDark, color: "#fff" }}
            >
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

const TicketList = ({ tickets, onSelect, lang }) => {
  const t = i18n[lang];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tickets
      .filter((x) => {
        if (filter === "all") return true;
        if (filter === "open") return x.status !== "resolved" && x.status !== "closed";
        if (filter === "p1") return x.priority === "P1";
        if (filter === "breach") return slaStatus(x).state === "breach";
        return true;
      })
      .filter((x) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
          bi(x.title, lang).toLowerCase().includes(s) ||
          x.id.toLowerCase().includes(s) ||
          bi(x.description, lang).toLowerCase().includes(s)
        );
      })
      .sort((a, b) => {
        const wa = PRIORITIES[a.priority].weight;
        const wb = PRIORITIES[b.priority].weight;
        if (wa !== wb) return wb - wa;
        return b.createdAt - a.createdAt;
      });
  }, [tickets, filter, search, lang]);

  return (
    <div>
      <PageTitle eyebrow={t.tickets.eyebrow} title={t.tickets.title} />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: T.textLight }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.tickets.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none"
            style={inputStyle}
          />
        </div>
        <div
          className="flex gap-1 p-1 rounded-full"
          style={{ backgroundColor: T.surface, border: `1.5px solid ${T.border}` }}
        >
          {[
            { key: "all", label: t.tickets.filterAll },
            { key: "open", label: t.tickets.filterOpen },
            { key: "p1", label: t.tickets.filterP1 },
            { key: "breach", label: t.tickets.filterBreach },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors"
              style={{
                backgroundColor: filter === f.key ? T.text : "transparent",
                color: filter === f.key ? "#fff" : T.textMid,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div
          className="grid grid-cols-12 gap-3 px-6 py-3 text-[10px] font-semibold uppercase tracking-wider"
          style={{ borderBottom: `1px solid ${T.border}`, color: T.textLight }}
        >
          <div className="col-span-1">{t.tickets.thId}</div>
          <div className="col-span-5">{t.tickets.thTitle}</div>
          <div className="col-span-2">{t.tickets.thCategory}</div>
          <div className="col-span-1">{t.tickets.thPrio}</div>
          <div className="col-span-2">{t.tickets.thStatus}</div>
          <div className="col-span-1">{t.tickets.thSla}</div>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm" style={{ color: T.textMid }}>
            {t.tickets.empty}
          </div>
        )}
        {filtered.map((x, idx) => {
          const cat = CATEGORIES[x.category];
          const Icon = cat?.icon || Ticket;
          const sla = slaStatus(x);
          const slaColor =
            sla.state === "breach"
              ? T.pinkDark
              : sla.state === "risk"
              ? T.yellowDark
              : T.greenDark;
          return (
            <button
              key={x.id}
              onClick={() => onSelect(x)}
              className="w-full grid grid-cols-12 gap-3 px-6 py-4 text-left items-center transition-colors"
              style={{
                borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${T.border}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.bg2)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div className="col-span-1 text-xs tabular-nums" style={{ color: T.textMid }}>
                {x.id}
              </div>
              <div className="col-span-5">
                <div
                  className="text-sm font-medium truncate flex items-center gap-2"
                  style={{ color: T.text }}
                >
                  {bi(x.title, lang)}
                  {x.attachments?.length > 0 && (
                    <Paperclip size={12} style={{ color: T.textLight, flexShrink: 0 }} />
                  )}
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>
                  {x.requester} · {formatRelative(x.createdAt, t)}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: cat?.accent }} />
                  <span className="text-xs" style={{ color: T.textMid }}>
                    {t.categories[x.category]}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <Pill color={PRIORITIES[x.priority].color}>{x.priority}</Pill>
              </div>
              <div className="col-span-2">
                <Pill color={STATUSES[x.status].color}>{t.statuses[x.status]}</Pill>
              </div>
              <div className="col-span-1">
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: T.bg2 }}
                >
                  <div
                    className="h-full transition-all rounded-full"
                    style={{ width: `${sla.pct}%`, backgroundColor: slaColor }}
                  />
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
   NEW TICKET (with override + attachments)
============================================================ */

const NewTicket = ({ onCreate, lang }) => {
  const t = i18n[lang];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [override, setOverride] = useState({});

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
    const finalCat = override.category || aiResult.category;
    const finalSub = override.subKey ?? aiResult.subKey;
    const finalPrio = override.priority || aiResult.priority;
    const finalTeam = override.team || aiResult.team;
    const ticket = {
      id: newId(),
      title: { pt: title, en: title },
      description: { pt: description, en: description },
      category: finalCat,
      subKey: finalSub,
      priority: finalPrio,
      status: "new",
      team: finalTeam,
      requester,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      aiKey: aiResult.aiKey,
      attachments,
    };
    onCreate(ticket);
    setTitle("");
    setDescription("");
    setRequester("");
    setAttachments([]);
    setAiResult(null);
    setOverride({});
  };

  const activeCat = override.category || aiResult?.category;
  const cat = activeCat ? CATEGORIES[activeCat] : null;

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow={t.newTicket.eyebrow} title={t.newTicket.title} />
      <p className="text-base mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>
        {t.newTicket.desc}
      </p>

      <Card className="p-6 mb-6">
        <div className="space-y-5">
          <Field label={t.common.requester}>
            <input
              type="text"
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              placeholder={t.newTicket.requesterPh}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={inputStyle}
            />
          </Field>
          <Field label={t.newTicket.titleLabel}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.newTicket.titlePh}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={inputStyle}
            />
          </Field>
          <Field label={t.newTicket.descLabel}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.newTicket.descPh}
              rows={5}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
              style={inputStyle}
            />
          </Field>
          <Field label={t.common.attachments} hint={t.newTicket.attachmentHint}>
            <AttachmentInput files={attachments} onChange={setAttachments} t={t} />
          </Field>

          <button
            onClick={runAI}
            disabled={!title || !description || loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: T.text, color: "#fff" }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {t.newTicket.analyzing}
              </>
            ) : (
              <>
                <Sparkles size={14} />
                {t.newTicket.analyzeBtn}
              </>
            )}
          </button>
        </div>
      </Card>

      {aiResult && (
        <Card
          className="p-6"
          style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} style={{ color: T.pinkDark }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: T.pinkDark }}
            >
              {t.newTicket.aiAnalysis}
            </span>
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
          >
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: T.textLight }}
            >
              {t.newTicket.reasoning}
            </div>
            <div className="text-sm italic" style={{ color: T.textMid }}>
              {t.reasoning[aiResult.aiKey]}
            </div>
          </div>

          <div
            className="text-xs mb-5 italic"
            style={{ color: T.pinkDark }}
          >
            ↓ {t.newTicket.reviewHint}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <Field label={t.newTicket.category}>
              <select
                value={activeCat}
                onChange={(e) =>
                  setOverride({ ...override, category: e.target.value, subKey: 0 })
                }
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                style={inputStyle}
              >
                {Object.keys(CATEGORIES).map((k) => (
                  <option key={k} value={k}>
                    {t.categories[k]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t.newTicket.priority}>
              <select
                value={override.priority || aiResult.priority}
                onChange={(e) => setOverride({ ...override, priority: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                style={inputStyle}
              >
                {Object.keys(PRIORITIES).map((k) => (
                  <option key={k} value={k}>
                    {t.priorities[k]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t.newTicket.subcategory}>
              <select
                value={override.subKey ?? aiResult.subKey}
                onChange={(e) =>
                  setOverride({ ...override, subKey: parseInt(e.target.value, 10) })
                }
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                style={inputStyle}
              >
                {cat &&
                  cat.subcategories[lang].map((s, i) => (
                    <option key={i} value={i}>
                      {s}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label={t.newTicket.teamLabel}>
              <input
                type="text"
                value={override.team || aiResult.team}
                onChange={(e) => setOverride({ ...override, team: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
              />
            </Field>
          </div>

          {cat && (
            <div
              className="rounded-xl p-4 mb-5 flex items-center gap-3"
              style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: cat.bg }}
              >
                <cat.icon size={20} style={{ color: cat.accent }} />
              </div>
              <div className="flex-1">
                <div className="text-sm" style={{ color: T.text }}>
                  {t.newTicket.slaTarget}:{" "}
                  <span className="font-semibold tabular-nums" style={{ color: T.pinkDark }}>
                    {(
                      PRIORITIES[override.priority || aiResult.priority].slaResolveMin / 60
                    ).toFixed(1)}
                    h
                  </span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>
                  {t.newTicket.initialResponse}{" "}
                  {PRIORITIES[override.priority || aiResult.priority].slaResponseMin}min
                </div>
              </div>
            </div>
          )}

          <button
            onClick={create}
            disabled={!requester}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: T.greenDark, color: "#fff" }}
          >
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
    <div
      className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
      style={{ color: T.textLight }}
    >
      {label}
    </div>
    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: T.text }}>
      {Icon && <Icon size={14} style={{ color: accent }} />}
      {value}
    </div>
  </div>
);

const TicketDetail = ({ ticket, onClose, onUpdate, lang }) => {
  if (!ticket) return null;
  const t = i18n[lang];
  const cat = CATEGORIES[ticket.category];
  const Icon = cat?.icon || Ticket;
  const sla = slaStatus(ticket);
  const slaColor =
    sla.state === "breach" ? T.pinkDark : sla.state === "risk" ? T.yellowDark : T.greenDark;

  const updateStatus = (status) => {
    onUpdate({ ...ticket, status, updatedAt: Date.now() });
  };

  const subLabel = cat?.subcategories[lang][ticket.subKey] || "";

  return (
    <Modal onClose={onClose}>
      <div
        className="p-6 flex items-start justify-between gap-4"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium tabular-nums" style={{ color: T.textMid }}>
              {ticket.id}
            </span>
            <Pill color={PRIORITIES[ticket.priority].color}>{ticket.priority}</Pill>
            <Pill color={STATUSES[ticket.status].color}>{t.statuses[ticket.status]}</Pill>
          </div>
          <h2
            className="text-2xl leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
          >
            {bi(ticket.title, lang)}
          </h2>
        </div>
        <button onClick={onClose} className="p-1" style={{ color: T.textMid }}>
          <X size={22} />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <div
            className="text-[10px] font-semibold uppercase tracking-wider mb-2"
            style={{ color: T.textLight }}
          >
            {t.detail.description}
          </div>
          <div
            className="text-sm leading-relaxed rounded-xl p-4 whitespace-pre-line"
            style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}`, color: T.text }}
          >
            {bi(ticket.description, lang)}
          </div>
        </div>

        {ticket.attachments?.length > 0 && (
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: T.textLight }}
            >
              {t.common.attachments}
            </div>
            <div className="space-y-2">
              {ticket.attachments.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}
                >
                  <FileText size={14} style={{ color: T.textMid }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: T.text }}>
                      {f.name}
                    </div>
                    <div className="text-xs" style={{ color: T.textLight }}>
                      {formatFileSize(f.size)}
                    </div>
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
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: T.pinkDark }}
              >
                {t.detail.aiAnalysis}
              </span>
            </div>
            <div
              className="text-sm italic rounded-xl p-4"
              style={{
                backgroundColor: T.pinkLight,
                border: `1px solid ${T.pink}`,
                color: T.pinkDark,
              }}
            >
              {ticket.aiKey === "catalog"
                ? t.reasoning.catalog(ticket.catalogId)
                : t.reasoning[ticket.aiKey]}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <DetailItem
            label={t.newTicket.category}
            value={t.categories[ticket.category]}
            icon={Icon}
            accent={cat?.accent}
          />
          <DetailItem label={t.newTicket.subcategory} value={subLabel} />
          <DetailItem label={t.common.team} value={ticket.team} />
          <DetailItem label={t.common.requester} value={ticket.requester} />
          <DetailItem label={t.common.created} value={formatRelative(ticket.createdAt, t)} />
          <DetailItem label={t.common.updated} value={formatRelative(ticket.updatedAt, t)} />
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textLight }}
            >
              {t.detail.slaStatus}
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: slaColor }}
            >
              {sla.state === "breach"
                ? t.detail.breached
                : sla.state === "risk"
                ? t.detail.atRisk
                : t.detail.onTrack}
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: T.surface }}
          >
            <div
              className="h-full transition-all rounded-full"
              style={{ width: `${sla.pct}%`, backgroundColor: slaColor }}
            />
          </div>
          <div className="text-xs mt-2 tabular-nums" style={{ color: T.textMid }}>
            {t.detail.slaTarget}: {(PRIORITIES[ticket.priority].slaResolveMin / 60).toFixed(1)}{" "}
            {t.detail.hoursTotal}
          </div>
        </div>

        <div>
          <div
            className="text-[10px] font-semibold uppercase tracking-wider mb-3"
            style={{ color: T.textLight }}
          >
            {t.detail.changeStatus}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATUSES).map(([key, s]) => (
              <button
                key={key}
                onClick={() => updateStatus(key)}
                disabled={ticket.status === key}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all"
                style={{
                  backgroundColor: ticket.status === key ? `${s.color}15` : "transparent",
                  borderColor: ticket.status === key ? s.color : T.border,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  color: ticket.status === key ? s.color : T.textMid,
                  cursor: ticket.status === key ? "default" : "pointer",
                }}
              >
                {t.statuses[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

/* ============================================================
   LANGUAGE TOGGLE
============================================================ */

const LangToggle = ({ lang, onChange }) => (
  <div
    className="inline-flex items-center rounded-full overflow-hidden"
    style={{ border: `1.5px solid ${T.border}` }}
  >
    {["en", "pt"].map((l) => (
      <button
        key={l}
        onClick={() => onChange(l)}
        className="px-3 py-1 text-[11px] font-bold tracking-wider transition-all"
        style={{
          backgroundColor: lang === l ? T.text : "transparent",
          color: lang === l ? "#fff" : T.textLight,
          borderRadius: lang === l ? "99px" : 0,
        }}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

/* ============================================================
   MAIN APP
============================================================ */

export default function App() {
  const [view, setView] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState(loadLang());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTickets(loadTickets());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveTickets(tickets);
  }, [tickets, loaded]);

  useEffect(() => {
    saveLang(lang);
  }, [lang]);

  const t = i18n[lang];

  const handleCreate = (ticket) => {
    setTickets([ticket, ...tickets]);
    setView("tickets");
  };

  const handleUpdate = (updated) => {
    setTickets(tickets.map((x) => (x.id === updated.id ? updated : x)));
    setSelected(updated);
  };

  const navItems = [
    { key: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { key: "catalog", label: t.nav.catalog, icon: BookOpen },
    { key: "tickets", label: t.nav.tickets, icon: Ticket },
    { key: "new", label: t.nav.newTicket, icon: PlusCircle },
  ];

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
        <aside
          className="hidden md:flex w-60 flex-col p-5"
          style={{ backgroundColor: T.bg2, borderRight: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2.5 mb-10 px-1">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}
            >
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>F</span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: T.text,
                  fontSize: 17,
                  lineHeight: 1,
                }}
              >
                {t.appName}
              </div>
              <div
                className="text-[9px] font-semibold uppercase tracking-[0.2em] mt-1"
                style={{ color: T.textLight }}
              >
                {t.appTagline}
              </div>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setView(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: active ? T.pinkLight : "transparent",
                    color: active ? T.pinkDark : T.textMid,
                    border: active ? `1px solid ${T.pink}` : "1px solid transparent",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div
            className="rounded-xl p-3.5 text-xs mb-3"
            style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={11} style={{ color: T.pinkDark }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: T.pinkDark }}
              >
                {t.aiopsLabel}
              </span>
            </div>
            <div style={{ color: T.pinkDark, lineHeight: 1.5 }}>{t.aiopsDesc}</div>
          </div>

          <div className="flex justify-center pt-2">
            <LangToggle lang={lang} onChange={setLang} />
          </div>
        </aside>

        {/* Mobile top bar */}
        <div
          className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: T.bg2, borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}
            >
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>F</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16 }}>
              {t.appName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} onChange={setLang} />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={20} style={{ color: T.text }} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden fixed top-[57px] left-0 right-0 z-30 p-3"
            style={{ backgroundColor: T.bg2, borderBottom: `1px solid ${T.border}` }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setView(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium mb-1"
                  style={{
                    backgroundColor: active ? T.pinkLight : "transparent",
                    color: active ? T.pinkDark : T.textMid,
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <main className="flex-1 p-5 md:p-10 overflow-y-auto pt-20 md:pt-10">
          {!loaded ? (
            <div
              className="flex items-center justify-center h-64"
              style={{ color: T.textMid }}
            >
              <Loader2 size={20} className="animate-spin mr-2" /> {t.common.loading}
            </div>
          ) : (
            <>
              {view === "dashboard" && <Dashboard tickets={tickets} lang={lang} />}
              {view === "catalog" && <ServiceCatalogView onRequest={handleCreate} lang={lang} />}
              {view === "tickets" && (
                <TicketList tickets={tickets} onSelect={setSelected} lang={lang} />
              )}
              {view === "new" && <NewTicket onCreate={handleCreate} lang={lang} />}
            </>
          )}
        </main>
      </div>

      {selected && (
        <TicketDetail
          ticket={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
          lang={lang}
        />
      )}
    </div>
  );
}
