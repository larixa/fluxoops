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
  Package,
  Truck,
  MapPin,
  PackageCheck,
  PackageX,
  Plane,
  Globe2,
  ArrowRightLeft,
  Building2,
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

/* Mascot URL — hosted in the user's portfolio repo for consistency */
const MASCOT_URL = "https://raw.githubusercontent.com/larixa/larixa.github.io/main/fluxoops-mascot.png";

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
      logistics: "Logística",
      myDevices: "Meus devices",
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

    tour: {
      welcomeTitle: "Olá! Quer um tour rápido?",
      welcomeDesc: "Em menos de 1 minuto você conhece tudo que dá pra fazer aqui. Pode pular se preferir.",
      start: "Começar tour",
      skip: "Pular",
      next: "Próximo",
      prev: "Anterior",
      finish: "Concluir",
      step: "Passo",
      of: "de",
      operatorSteps: [
        { title: "Dashboard", desc: "Visão completa de operações: KPIs em tempo real (tickets abertos, P1 críticos, SLA em risco, MTTR), gráficos de tendência e distribuição por tipo ITIL." },
        { title: "Catálogo de Serviços", desc: "Itens padronizados que o time de TI oferece — onboarding, acessos, novos devices, licenças. Cada solicitação vira um ticket com fluxo pré-aprovado." },
        { title: "Tickets", desc: "Lista completa de todos os tickets com filtros por tipo (Incidentes / Solicitações / Mudanças), prioridade e status SLA. Clica num ticket pra abrir, atualizar status ou ver detalhes." },
        { title: "Novo ticket", desc: "Crie um ticket manualmente. A IA analisa título e descrição e sugere automaticamente tipo, categoria, prioridade e time — você pode ajustar antes de salvar." },
        { title: "Logística", desc: "Acompanhe envios e recepções de devices internacionalmente. Pipeline visual, mini-mapa com destinos e fluxo até o registro final no CMDB." },
        { title: "Base de Conhecimento", desc: "Artigos e guias com renderização rica em markdown. Quando alguém abre um ticket, sugestões aparecem automaticamente — pra reduzir solicitações evitáveis." },
        { title: "AIOps", desc: "Toda a categorização, priorização e sugestão de KB é automatizada. Reduz tempo de triagem e padroniza o atendimento." },
      ],
      enduserSteps: [
        { title: "Catálogo de Serviços", desc: "Encontre rapidamente o que você precisa — reset de senha, novo notebook, acesso a aplicações, licenças. Cada item tem SLA conhecido." },
        { title: "Novo ticket", desc: "Não achou no catálogo? Abra um ticket descrevendo o problema. A IA categoriza automaticamente e ainda sugere artigos da Base de Conhecimento que talvez resolvam." },
        { title: "Meus tickets", desc: "Acompanhe o status dos tickets que você abriu — em andamento, aguardando, resolvido. Tudo em tempo real." },
        { title: "Meus devices", desc: "Veja onde estão os devices atribuídos a você — ainda em preparação, em trânsito, entregue ou já registrado no inventário." },
        { title: "Base de Conhecimento", desc: "Antes de abrir um ticket, dá uma olhada aqui. Tem guias de VPN, MFA, phishing, e muito mais — escritos pra você resolver sozinho de forma rápida." },
      ],
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

    logistics: {
      eyebrow: "Asset Logistics",
      title: "Logística de Devices",
      desc: "Acompanhe o envio e a recepção de equipamentos para colaboradores em diferentes países. Cada device é registrado no inventário (CMDB) ao chegar.",
      myEyebrow: "Meu device",
      myTitle: "Meus devices",
      myDesc: "Acompanhe o status de envio dos equipamentos atribuídos a você.",
      kpiInTransit: "Em trânsito",
      kpiPending: "Aguardando registro",
      kpiDelivered: "Entregues hoje",
      kpiTotal: "Total ativo",
      pipelineEyebrow: "Pipeline",
      pipelineTitle: "Status das remessas",
      mapEyebrow: "Distribuição global",
      mapTitle: "Destinos",
      shipmentList: "Remessas",
      newShipment: "Nova remessa",
      newShipmentDesc: "Registrar novo envio ou recepção de device.",
      operationType: "Tipo de operação",
      checkout: "Check-out (envio)",
      checkin: "Check-in (devolução)",
      deviceInfo: "Informações do device",
      deviceType: "Tipo de device",
      deviceTypeLaptop: "Notebook",
      deviceTypeMobile: "Celular",
      deviceTypeDock: "Dock station",
      deviceTypeMonitor: "Monitor",
      deviceTypeOther: "Outro",
      deviceModel: "Modelo",
      deviceModelPh: "Ex: Lenovo ThinkPad T14 Gen 4",
      deviceSerial: "Número de série",
      deviceSerialPh: "Ex: PF3X9K2L",
      deviceAssetTag: "Asset tag",
      deviceAssetTagPh: "Ex: AST-001234",
      shipmentDetails: "Detalhes do envio",
      origin: "Origem",
      originPh: "Escritório central / Lisboa",
      destination: "Destino",
      destinationCountry: "País",
      destinationCity: "Cidade",
      destinationCityPh: "Ex: Estocolmo",
      destinationAddress: "Endereço completo",
      destinationAddressPh: "Rua, número, código postal...",
      recipient: "Destinatário",
      recipientPh: "Nome do colaborador",
      carrier: "Transportadora",
      carrierPh: "DHL, FedEx, UPS, Correios...",
      trackingNumber: "Código de rastreio",
      trackingNumberPh: "Código fornecido pela transportadora",
      expectedDelivery: "Entrega esperada",
      linkedTicket: "Ticket relacionado (opcional)",
      linkedTicketPh: "Ex: REQ-1003",
      submit: "Registrar remessa",
      tableId: "ID",
      tableDevice: "Device",
      tableDest: "Destino",
      tableRecipient: "Destinatário",
      tableStatus: "Status",
      tableShipped: "Enviado",
      empty: "Nenhuma remessa encontrada.",
      countries: {
        PT: "Portugal",
        SE: "Suécia",
        ES: "Espanha",
        FR: "França",
        DE: "Alemanha",
        IT: "Itália",
        UK: "Reino Unido",
        NL: "Holanda",
        BR: "Brasil",
        US: "Estados Unidos",
      },
      detail: {
        eyebrow: "Detalhes da remessa",
        deviceSection: "Device",
        shipmentSection: "Envio",
        timeline: "Linha do tempo",
        progress: "Progresso",
        registerInCmdb: "Registrar no CMDB",
        cmdbHint: "Marca o device como recebido e adicionado ao inventário corporativo.",
        cmdbDone: "Registrado no inventário",
        type: "Tipo",
        operation: "Operação",
        sent: "Enviado em",
        expected: "Previsão",
        delivered: "Entregue em",
        registered: "Registrado em",
        notYet: "—",
        changeStatus: "Atualizar status",
      },
    },

    shipmentStatuses: {
      preparing: "Preparando",
      packed: "Embalado",
      shipped: "Enviado",
      in_transit: "Em trânsito",
      delivered: "Entregue",
      registered: "Registrado no CMDB",
      returned: "Devolvido",
      cancelled: "Cancelado",
    },

    detail: {
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
      logistics: "Logistics",
      myDevices: "My devices",
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

    tour: {
      welcomeTitle: "Hi! Want a quick tour?",
      welcomeDesc: "In less than a minute you'll see everything you can do here. You can skip if you prefer.",
      start: "Start tour",
      skip: "Skip",
      next: "Next",
      prev: "Previous",
      finish: "Finish",
      step: "Step",
      of: "of",
      operatorSteps: [
        { title: "Dashboard", desc: "Complete operations view: real-time KPIs (open tickets, critical P1, SLA at risk, MTTR), trend charts and distribution by ITIL type." },
        { title: "Service Catalog", desc: "Standardised items the IT team offers — onboarding, access, new devices, licenses. Each request becomes a ticket with a pre-approved workflow." },
        { title: "Tickets", desc: "Complete list of all tickets with filters by type (Incidents / Requests / Changes), priority and SLA status. Click a ticket to open it, update status or see details." },
        { title: "New ticket", desc: "Create a ticket manually. AI analyses title and description and automatically suggests type, category, priority and team — you can adjust before saving." },
        { title: "Logistics", desc: "Track international device shipping and receiving. Visual pipeline, mini-map with destinations and full flow until final CMDB registration." },
        { title: "Knowledge Base", desc: "Articles and guides with rich markdown rendering. When someone opens a ticket, suggestions appear automatically — to deflect avoidable requests." },
        { title: "AIOps", desc: "All categorisation, prioritisation and KB suggestions are automated. Reduces triage time and standardises support." },
      ],
      enduserSteps: [
        { title: "Service Catalog", desc: "Quickly find what you need — password reset, new laptop, application access, licenses. Each item has a known SLA." },
        { title: "New ticket", desc: "Didn't find it in the catalog? Open a ticket describing the problem. AI categorises automatically and even suggests Knowledge Base articles that might solve it." },
        { title: "My tickets", desc: "Track the status of tickets you've opened — in progress, waiting, resolved. All in real-time." },
        { title: "My devices", desc: "See where the devices assigned to you are — still preparing, in transit, delivered or already registered in inventory." },
        { title: "Knowledge Base", desc: "Before opening a ticket, take a look here. There are guides for VPN, MFA, phishing, and much more — written for you to solve it yourself, quickly." },
      ],
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

    logistics: {
      eyebrow: "Asset Logistics",
      title: "Device Logistics",
      desc: "Track shipping and receipt of equipment for employees in different countries. Each device is registered in the inventory (CMDB) upon arrival.",
      myEyebrow: "My device",
      myTitle: "My devices",
      myDesc: "Track the shipping status of equipment assigned to you.",
      kpiInTransit: "In transit",
      kpiPending: "Pending registration",
      kpiDelivered: "Delivered today",
      kpiTotal: "Active total",
      pipelineEyebrow: "Pipeline",
      pipelineTitle: "Shipment status",
      mapEyebrow: "Global distribution",
      mapTitle: "Destinations",
      shipmentList: "Shipments",
      newShipment: "New shipment",
      newShipmentDesc: "Register a new device shipment or return.",
      operationType: "Operation type",
      checkout: "Check-out (shipping)",
      checkin: "Check-in (return)",
      deviceInfo: "Device information",
      deviceType: "Device type",
      deviceTypeLaptop: "Laptop",
      deviceTypeMobile: "Mobile phone",
      deviceTypeDock: "Dock station",
      deviceTypeMonitor: "Monitor",
      deviceTypeOther: "Other",
      deviceModel: "Model",
      deviceModelPh: "E.g. Lenovo ThinkPad T14 Gen 4",
      deviceSerial: "Serial number",
      deviceSerialPh: "E.g. PF3X9K2L",
      deviceAssetTag: "Asset tag",
      deviceAssetTagPh: "E.g. AST-001234",
      shipmentDetails: "Shipment details",
      origin: "Origin",
      originPh: "Headquarters / Lisbon",
      destination: "Destination",
      destinationCountry: "Country",
      destinationCity: "City",
      destinationCityPh: "E.g. Stockholm",
      destinationAddress: "Full address",
      destinationAddressPh: "Street, number, postal code...",
      recipient: "Recipient",
      recipientPh: "Employee name",
      carrier: "Carrier",
      carrierPh: "DHL, FedEx, UPS, local mail...",
      trackingNumber: "Tracking number",
      trackingNumberPh: "Code provided by the carrier",
      expectedDelivery: "Expected delivery",
      linkedTicket: "Linked ticket (optional)",
      linkedTicketPh: "E.g. REQ-1003",
      submit: "Register shipment",
      tableId: "ID",
      tableDevice: "Device",
      tableDest: "Destination",
      tableRecipient: "Recipient",
      tableStatus: "Status",
      tableShipped: "Shipped",
      empty: "No shipments found.",
      countries: {
        PT: "Portugal",
        SE: "Sweden",
        ES: "Spain",
        FR: "France",
        DE: "Germany",
        IT: "Italy",
        UK: "United Kingdom",
        NL: "Netherlands",
        BR: "Brazil",
        US: "United States",
      },
      detail: {
        eyebrow: "Shipment details",
        deviceSection: "Device",
        shipmentSection: "Shipment",
        timeline: "Timeline",
        progress: "Progress",
        registerInCmdb: "Register in CMDB",
        cmdbHint: "Marks the device as received and added to corporate inventory.",
        cmdbDone: "Registered in inventory",
        type: "Type",
        operation: "Operation",
        sent: "Sent on",
        expected: "Expected",
        delivered: "Delivered on",
        registered: "Registered on",
        notYet: "—",
        changeStatus: "Update status",
      },
    },

    shipmentStatuses: {
      preparing: "Preparing",
      packed: "Packed",
      shipped: "Shipped",
      in_transit: "In transit",
      delivered: "Delivered",
      registered: "Registered in CMDB",
      returned: "Returned",
      cancelled: "Cancelled",
    },

    detail: {
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
  // ========== Asset Management / Device Logistics ==========
  {
    id: "svc-asset-01",
    name: { pt: "Asset handover (entrega de novo device)", en: "Asset handover (new device delivery)" },
    desc: {
      pt: "Entrega de novo notebook ou device para colaborador, com Autopilot pré-configurado e envio internacional.",
      en: "Delivery of new laptop or device to employee, with Autopilot pre-configured and international shipping.",
    },
    category: "hardware",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "3-5 dias úteis", en: "3-5 business days" },
    approval: true,
  },
  {
    id: "svc-asset-02",
    name: { pt: "Windows Autopilot enrollment", en: "Windows Autopilot enrollment" },
    desc: {
      pt: "Pré-provisionamento Zero Touch via Autopilot. Device chega ao colaborador pronto pra usar.",
      en: "Zero Touch pre-provisioning via Autopilot. Device arrives ready to use.",
    },
    category: "hardware",
    subKey: 0,
    defaultPriority: "P3",
    estimatedTime: { pt: "1 dia útil", en: "1 business day" },
    approval: false,
  },
  {
    id: "svc-asset-03",
    name: { pt: "Device decommissioning", en: "Device decommissioning" },
    desc: {
      pt: "Descomissionamento seguro: wipe certificado, remoção do CMDB, descarte ou reaproveitamento.",
      en: "Secure decommissioning: certified wipe, CMDB removal, disposal or reuse.",
    },
    category: "hardware",
    subKey: 4,
    defaultPriority: "P3",
    estimatedTime: { pt: "5 dias úteis", en: "5 business days" },
    approval: true,
  },
  {
    id: "svc-asset-04",
    name: { pt: "Device return (offboarding)", en: "Device return (offboarding)" },
    desc: {
      pt: "Coleta e devolução de device de colaborador desligado. Inclui wipe e re-registro no inventário.",
      en: "Pickup and return of device from departing employee. Includes wipe and re-registration in inventory.",
    },
    category: "hardware",
    subKey: 0,
    defaultPriority: "P2",
    estimatedTime: { pt: "3-5 dias úteis", en: "3-5 business days" },
    approval: true,
  },
  {
    id: "svc-asset-05",
    name: { pt: "Asset transfer (transferência entre colaboradores)", en: "Asset transfer (between employees)" },
    desc: {
      pt: "Transferência de propriedade de device de um colaborador para outro com atualização do CMDB.",
      en: "Device ownership transfer from one employee to another with CMDB update.",
    },
    category: "hardware",
    subKey: 4,
    defaultPriority: "P3",
    estimatedTime: { pt: "2 dias úteis", en: "2 business days" },
    approval: true,
  },
  {
    id: "svc-asset-06",
    name: { pt: "Reportar device perdido / roubado", en: "Report lost / stolen device" },
    desc: {
      pt: "Bloqueio remoto imediato, wipe via Intune, abertura de incidente de segurança e BO se necessário.",
      en: "Immediate remote block, Intune wipe, security incident opening and police report if needed.",
    },
    category: "security",
    subKey: 4,
    defaultPriority: "P1",
    estimatedTime: { pt: "Imediato", en: "Immediate" },
    approval: false,
  },
  // ========== IAM ==========
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
  const prio = PRIORITIES[ticket.priority] || PRIORITIES.P3;
  const target = prio.slaResolveMin;
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

  // Final safety net: ensure all fields are valid before returning
  const safeCat = CATEGORIES[bestCat] ? bestCat : "general";
  const safePrio = PRIORITIES[priority] ? priority : "P3";
  const safeType = TICKET_TYPES[detectedType] ? detectedType : "incident";
  const cat = CATEGORIES[safeCat];
  let subKey = 0;
  cat.subcategories.pt.forEach((sub, idx) => {
    const firstWord = sub.toLowerCase().split(" ")[0].replace(/[—,.]/g, "");
    if (firstWord && text.includes(firstWord)) subKey = idx;
  });

  return {
    type: safeType,
    category: safeCat,
    subKey,
    priority: safePrio,
    team: cat.defaultTeam,
    aiKey: safeCat,
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

// Defensive normalization: ensures every ticket has the fields the new UI expects,
// even if loaded from older localStorage versions.
const normalizeTicket = (t) => {
  try {
    if (!t || typeof t !== "object") return null;
    return {
      ...t,
      id: t.id || `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      type: TICKET_TYPES[t.type] ? t.type : "incident",
      priority: PRIORITIES[t.priority] ? t.priority : "P3",
      status: STATUSES[t.status] ? t.status : "new",
      category: CATEGORIES[t.category] ? t.category : "general",
      subKey: typeof t.subKey === "number" ? t.subKey : 0,
      attachments: Array.isArray(t.attachments) ? t.attachments : [],
      title: t.title || { pt: "(sem título)", en: "(no title)" },
      description: t.description || { pt: "", en: "" },
      requester: t.requester || "—",
      team: t.team || "Service Desk",
      createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
      updatedAt: typeof t.updatedAt === "number" ? t.updatedAt : Date.now(),
    };
  } catch (e) {
    console.warn("Ticket normalization failed, skipping:", e);
    return null;
  }
};

const loadTickets = () => {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const normalized = parsed.map(normalizeTicket).filter(Boolean);
        if (normalized.length > 0) return normalized;
      }
    }
  } catch (e) {
    console.warn("loadTickets failed, using seed:", e);
  }
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
   SHIPMENTS / LOGISTICS
============================================================ */

const SHIPMENT_STATUSES = {
  preparing: { color: T.textMid, order: 1 },
  packed: { color: T.blueDark, order: 2 },
  shipped: { color: T.catCloud, order: 3 },
  in_transit: { color: T.yellowDark, order: 4 },
  delivered: { color: T.greenDark, order: 5 },
  registered: { color: T.catApps, order: 6 },
  returned: { color: T.pinkDark, order: 7 },
  cancelled: { color: T.textLight, order: 8 },
};

const SHIPMENT_FLOW = ["preparing", "packed", "shipped", "in_transit", "delivered", "registered"];

// Country coordinates for the mini-map (approx capital lat/lng)
const COUNTRY_COORDS = {
  PT: { lat: 38.7, lng: -9.1, flag: "🇵🇹" },
  SE: { lat: 59.3, lng: 18.0, flag: "🇸🇪" },
  ES: { lat: 40.4, lng: -3.7, flag: "🇪🇸" },
  FR: { lat: 48.8, lng: 2.3, flag: "🇫🇷" },
  DE: { lat: 52.5, lng: 13.4, flag: "🇩🇪" },
  IT: { lat: 41.9, lng: 12.5, flag: "🇮🇹" },
  UK: { lat: 51.5, lng: -0.1, flag: "🇬🇧" },
  NL: { lat: 52.4, lng: 4.9, flag: "🇳🇱" },
  BR: { lat: -15.8, lng: -47.9, flag: "🇧🇷" },
  US: { lat: 38.9, lng: -77.0, flag: "🇺🇸" },
};

const newShipmentId = () => `SHIP-${Math.floor(1000 + Math.random() * 9000)}`;

const SEED_SHIPMENTS = [
  {
    id: "SHIP-1001",
    operation: "checkout",
    deviceType: "laptop",
    deviceModel: "Lenovo ThinkPad T14 Gen 4",
    deviceSerial: "PF3X9K2L",
    deviceAssetTag: "AST-001234",
    origin: "Lisboa, PT",
    destinationCountry: "SE",
    destinationCity: "Estocolmo",
    destinationAddress: "Drottninggatan 71, 111 36 Stockholm",
    recipient: "Erik Andersson",
    carrier: "DHL Express",
    trackingNumber: "JD0140698888888888",
    status: "in_transit",
    createdAt: Date.now() - 1000 * 60 * 60 * 36,
    shippedAt: Date.now() - 1000 * 60 * 60 * 30,
    expectedDelivery: Date.now() + 1000 * 60 * 60 * 24,
    deliveredAt: null,
    registeredAt: null,
    linkedTicket: "REQ-1003",
  },
  {
    id: "SHIP-1002",
    operation: "checkout",
    deviceType: "laptop",
    deviceModel: "Apple MacBook Pro 14 M3",
    deviceSerial: "C02XK0LMQ6L4",
    deviceAssetTag: "AST-001235",
    origin: "Lisboa, PT",
    destinationCountry: "ES",
    destinationCity: "Madrid",
    destinationAddress: "Calle de Alcalá 42, 28014 Madrid",
    recipient: "María García",
    carrier: "DHL Express",
    trackingNumber: "JD0140698999999999",
    status: "delivered",
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    shippedAt: Date.now() - 1000 * 60 * 60 * 60,
    expectedDelivery: Date.now() - 1000 * 60 * 60 * 6,
    deliveredAt: Date.now() - 1000 * 60 * 60 * 4,
    registeredAt: null,
    linkedTicket: null,
  },
  {
    id: "SHIP-1003",
    operation: "checkout",
    deviceType: "laptop",
    deviceModel: "Dell Latitude 7440",
    deviceSerial: "9F2H8L5K",
    deviceAssetTag: "AST-001236",
    origin: "Lisboa, PT",
    destinationCountry: "PT",
    destinationCity: "Porto",
    destinationAddress: "Rua de Santa Catarina 245, 4000-447 Porto",
    recipient: "João Ferreira",
    carrier: "CTT Expresso",
    trackingNumber: "DE123456789PT",
    status: "registered",
    createdAt: Date.now() - 1000 * 60 * 60 * 120,
    shippedAt: Date.now() - 1000 * 60 * 60 * 110,
    expectedDelivery: Date.now() - 1000 * 60 * 60 * 96,
    deliveredAt: Date.now() - 1000 * 60 * 60 * 90,
    registeredAt: Date.now() - 1000 * 60 * 60 * 80,
    linkedTicket: null,
  },
  {
    id: "SHIP-1004",
    operation: "checkout",
    deviceType: "laptop",
    deviceModel: "Lenovo ThinkPad X1 Carbon Gen 11",
    deviceSerial: "PF4X1K8M",
    deviceAssetTag: "AST-001237",
    origin: "Lisboa, PT",
    destinationCountry: "DE",
    destinationCity: "Berlim",
    destinationAddress: "Friedrichstraße 68, 10117 Berlin",
    recipient: "Hans Müller",
    carrier: "DHL Express",
    trackingNumber: "JD0140697777777777",
    status: "preparing",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    shippedAt: null,
    expectedDelivery: Date.now() + 1000 * 60 * 60 * 96,
    deliveredAt: null,
    registeredAt: null,
    linkedTicket: "REQ-1008",
  },
  {
    id: "SHIP-1005",
    operation: "checkin",
    deviceType: "laptop",
    deviceModel: "Lenovo ThinkPad T14 Gen 2",
    deviceSerial: "PF2A5K9X",
    deviceAssetTag: "AST-000891",
    origin: "Barcelona, ES",
    destinationCountry: "PT",
    destinationCity: "Lisboa",
    destinationAddress: "HQ — Av. da Liberdade 110, 1250-146 Lisboa",
    recipient: "IT Asset Management",
    carrier: "DHL Express",
    trackingNumber: "JD0140696666666666",
    status: "shipped",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    shippedAt: Date.now() - 1000 * 60 * 60 * 18,
    expectedDelivery: Date.now() + 1000 * 60 * 60 * 36,
    deliveredAt: null,
    registeredAt: null,
    linkedTicket: null,
  },
  {
    id: "SHIP-1006",
    operation: "checkout",
    deviceType: "mobile",
    deviceModel: "iPhone 15 Pro 128GB",
    deviceSerial: "FFMW10ABCDEF",
    deviceAssetTag: "AST-001238",
    origin: "Lisboa, PT",
    destinationCountry: "FR",
    destinationCity: "Paris",
    destinationAddress: "Avenue des Champs-Élysées 99, 75008 Paris",
    recipient: "Sophie Martin",
    carrier: "FedEx",
    trackingNumber: "789456123654",
    status: "delivered",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    shippedAt: Date.now() - 1000 * 60 * 60 * 40,
    expectedDelivery: Date.now() - 1000 * 60 * 60 * 12,
    deliveredAt: Date.now() - 1000 * 60 * 60 * 8,
    registeredAt: null,
    linkedTicket: null,
  },
];

const SHIPMENTS_KEY = "fluxoops-shipments-v1";
const loadShipments = () => {
  try {
    const raw = localStorage.getItem(SHIPMENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return SEED_SHIPMENTS;
};
const saveShipments = (s) => {
  try { localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(s)); } catch (e) {}
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
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
              <img src={MASCOT_URL} alt="FluxoOps mascot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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
    tickets.filter((x) => x.status !== "resolved" && x.status !== "closed").forEach((x) => {
      const key = PRIORITIES[x.priority] ? x.priority : "P3";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .filter(([k]) => PRIORITIES[k])
      .map(([k, v]) => ({ name: k, value: v, color: PRIORITIES[k].color }));
  }, [tickets]);

  const byType = useMemo(() => {
    const map = { incident: 0, service_request: 0, change: 0 };
    tickets.filter((x) => x.status !== "resolved" && x.status !== "closed").forEach((x) => {
      const key = TICKET_TYPES[x.type] ? x.type : "incident";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .filter(([k]) => TICKET_TYPES[k])
      .map(([k, v]) => ({ key: k, value: v, color: TICKET_TYPES[k].color, label: t.typesShort[k] }));
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
   LOGISTICS — pipeline + map + list + new shipment
============================================================ */

const ShipmentStatusPill = ({ status, t }) => {
  const cfg = SHIPMENT_STATUSES[status];
  return <Pill color={cfg.color}>{t.shipmentStatuses[status]}</Pill>;
};

const ShipmentPipeline = ({ shipments, lang }) => {
  const t = i18n[lang];
  const statusCounts = useMemo(() => {
    const counts = {};
    SHIPMENT_FLOW.forEach((s) => (counts[s] = 0));
    shipments.forEach((sh) => {
      if (counts[sh.status] !== undefined) counts[sh.status]++;
    });
    return counts;
  }, [shipments]);

  const stageIcons = {
    preparing: Package,
    packed: PackageCheck,
    shipped: Truck,
    in_transit: Plane,
    delivered: PackageCheck,
    registered: CheckCircle2,
  };

  return (
    <Card className="p-6 mb-6">
      <Eyebrow>{t.logistics.pipelineEyebrow}</Eyebrow>
      <h3 className="text-xl mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
        {t.logistics.pipelineTitle}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SHIPMENT_FLOW.map((stage, idx) => {
          const cfg = SHIPMENT_STATUSES[stage];
          const Icon = stageIcons[stage] || Package;
          const count = statusCounts[stage] || 0;
          return (
            <div key={stage} className="relative">
              <div className="rounded-xl p-3.5 transition-all hover:translate-y-[-2px]"
                style={{ backgroundColor: T.bg2, border: `1px solid ${cfg.color}30` }}>
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} style={{ color: cfg.color }} />
                  <span className="text-2xl tabular-nums" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
                    {count}
                  </span>
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider leading-tight" style={{ color: cfg.color }}>
                  {t.shipmentStatuses[stage]}
                </div>
              </div>
              {idx < SHIPMENT_FLOW.length - 1 && (
                <ChevronRight size={14} className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2"
                  style={{ color: T.textLight, zIndex: 1 }} />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Mini-map: simple equirectangular projection over a soft world background
const ShipmentMap = ({ shipments, lang }) => {
  const t = i18n[lang];

  // Aggregate counts by destination
  const byCountry = useMemo(() => {
    const map = {};
    shipments.forEach((sh) => {
      if (sh.status === "registered" || sh.status === "cancelled") return;
      const c = sh.destinationCountry;
      if (!map[c]) map[c] = 0;
      map[c]++;
    });
    return map;
  }, [shipments]);

  // Project lat/lng to %
  const project = (lat, lng) => {
    // Focused on Europe + a bit of Atlantic; clamp lng to [-30, 40], lat to [25, 70]
    const minLng = -30, maxLng = 40;
    const minLat = 25, maxLat = 70;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const activeCountries = Object.entries(byCountry).filter(([_, n]) => n > 0);

  return (
    <Card className="p-6 mb-6">
      <Eyebrow>{t.logistics.mapEyebrow}</Eyebrow>
      <h3 className="text-xl mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
        {t.logistics.mapTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Map */}
        <div className="md:col-span-2 rounded-2xl relative overflow-hidden"
          style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}`, aspectRatio: "16/10" }}>
          {/* Soft Europe-ish gradient as a backdrop */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 45% 50%, ${T.blueLight} 0%, ${T.bg2} 70%)`,
          }} />
          {/* Decorative continent shape (very abstract) */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            <path d="M 20 25 Q 25 18, 35 20 Q 45 15, 55 22 Q 65 18, 70 28 Q 75 35, 65 45 Q 55 50, 45 48 Q 35 50, 28 42 Q 22 35, 20 25 Z"
              fill={T.blue} opacity="0.3" />
            <path d="M 12 32 Q 18 28, 22 30 Q 25 35, 20 40 Q 15 38, 12 32 Z" fill={T.blue} opacity="0.3" />
          </svg>

          {/* Origin pin (Lisbon) */}
          {(() => {
            const o = project(COUNTRY_COORDS.PT.lat, COUNTRY_COORDS.PT.lng);
            return (
              <div className="absolute" style={{ left: `${o.x}%`, top: `${o.y}%`, transform: "translate(-50%, -50%)" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: T.pinkDark, boxShadow: `0 0 0 4px ${T.pinkLight}` }} />
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] font-bold whitespace-nowrap"
                  style={{ color: T.pinkDark }}>
                  HQ
                </div>
              </div>
            );
          })()}

          {/* Destination pins */}
          {activeCountries.map(([country, count]) => {
            if (country === "PT") return null;
            const coord = COUNTRY_COORDS[country];
            if (!coord) return null;
            const p = project(coord.lat, coord.lng);
            return (
              <div key={country} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: T.yellowDark, opacity: 0.4 }} />
                  <div className="relative w-3 h-3 rounded-full" style={{ backgroundColor: T.yellowDark, boxShadow: `0 0 0 4px ${T.yellowLight}` }} />
                </div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap"
                  style={{ color: T.text }}>
                  {coord.flag} {count}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / list */}
        <div className="space-y-2">
          {activeCountries.length === 0 && (
            <div className="text-sm text-center py-6" style={{ color: T.textLight }}>—</div>
          )}
          {activeCountries.sort((a, b) => b[1] - a[1]).map(([country, count]) => {
            const coord = COUNTRY_COORDS[country];
            return (
              <div key={country} className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ backgroundColor: T.bg2 }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{coord?.flag}</span>
                  <span className="text-sm font-medium" style={{ color: T.text }}>
                    {t.logistics.countries[country] || country}
                  </span>
                </div>
                <span className="text-sm tabular-nums font-semibold" style={{ color: T.pinkDark }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

const LogisticsView = ({ shipments, onSelect, onNewShipment, lang, currentUser }) => {
  const t = i18n[lang];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {
    const inTransit = shipments.filter((s) => ["shipped", "in_transit"].includes(s.status)).length;
    const pendingRegistration = shipments.filter((s) => s.status === "delivered").length;
    const deliveredToday = shipments.filter((s) => s.deliveredAt && Date.now() - s.deliveredAt < 86400000).length;
    const total = shipments.filter((s) => !["registered", "cancelled"].includes(s.status)).length;
    return { inTransit, pendingRegistration, deliveredToday, total };
  }, [shipments]);

  const filtered = useMemo(() => {
    return shipments
      .filter((s) => statusFilter === "all" || s.status === statusFilter)
      .filter((s) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          s.id.toLowerCase().includes(q) ||
          s.deviceModel.toLowerCase().includes(q) ||
          s.deviceSerial.toLowerCase().includes(q) ||
          s.recipient.toLowerCase().includes(q) ||
          s.destinationCity.toLowerCase().includes(q) ||
          (s.trackingNumber || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [shipments, search, statusFilter]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <PageTitle eyebrow={t.logistics.eyebrow} title={t.logistics.title} />
        </div>
        <button onClick={onNewShipment}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
          <PlusCircle size={14} />
          {t.logistics.newShipment}
        </button>
      </div>
      <p className="text-base max-w-3xl mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>
        {t.logistics.desc}
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard icon={Truck} label={t.logistics.kpiInTransit} value={stats.inTransit} accent={T.yellowDark} bg={T.yellowLight} sub="" />
        <KpiCard icon={PackageCheck} label={t.logistics.kpiPending} value={stats.pendingRegistration} accent={T.catApps} bg={T.catAppsLight} sub="" />
        <KpiCard icon={CheckCircle2} label={t.logistics.kpiDelivered} value={stats.deliveredToday} accent={T.greenDark} bg={T.greenLight} sub="" />
        <KpiCard icon={Globe2} label={t.logistics.kpiTotal} value={stats.total} accent={T.blueDark} bg={T.blueLight} sub="" />
      </div>

      <ShipmentPipeline shipments={shipments} lang={lang} />
      <ShipmentMap shipments={shipments} lang={lang} />

      {/* List */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.textLight }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.tickets.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none" style={inputStyle} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer focus:outline-none" style={inputStyle}>
          <option value="all">{t.tickets.filterAll}</option>
          {Object.keys(SHIPMENT_STATUSES).map((s) => (
            <option key={s} value={s}>{t.shipmentStatuses[s]}</option>
          ))}
        </select>
      </div>

      <Card>
        <div className="grid grid-cols-12 gap-3 px-6 py-3 text-[10px] font-semibold uppercase tracking-wider"
          style={{ borderBottom: `1px solid ${T.border}`, color: T.textLight }}>
          <div className="col-span-2">{t.logistics.tableId}</div>
          <div className="col-span-3">{t.logistics.tableDevice}</div>
          <div className="col-span-2">{t.logistics.tableDest}</div>
          <div className="col-span-2">{t.logistics.tableRecipient}</div>
          <div className="col-span-2">{t.logistics.tableStatus}</div>
          <div className="col-span-1 text-right">{t.logistics.tableShipped}</div>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm" style={{ color: T.textMid }}>{t.logistics.empty}</div>
        )}
        {filtered.map((s, idx) => {
          const coord = COUNTRY_COORDS[s.destinationCountry];
          return (
            <button key={s.id} onClick={() => onSelect(s)}
              className="w-full grid grid-cols-12 gap-3 px-6 py-4 text-left items-center transition-colors"
              style={{ borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${T.border}` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.bg2)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              <div className="col-span-2">
                <div className="text-xs tabular-nums font-medium" style={{ color: T.text }}>{s.id}</div>
                <div className="text-[10px] uppercase tracking-wider mt-0.5"
                  style={{ color: s.operation === "checkout" ? T.blueDark : T.pinkDark }}>
                  {s.operation === "checkout" ? "↗ Check-out" : "↙ Check-in"}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-sm font-medium truncate" style={{ color: T.text }}>{s.deviceModel}</div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>{s.deviceSerial}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm flex items-center gap-1.5" style={{ color: T.text }}>
                  <span>{coord?.flag}</span>
                  <span className="truncate">{s.destinationCity}</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.textLight }}>
                  {t.logistics.countries[s.destinationCountry] || s.destinationCountry}
                </div>
              </div>
              <div className="col-span-2 text-sm truncate" style={{ color: T.textMid }}>{s.recipient}</div>
              <div className="col-span-2"><ShipmentStatusPill status={s.status} t={t} /></div>
              <div className="col-span-1 text-right text-xs" style={{ color: T.textLight }}>
                {s.shippedAt ? formatRelative(s.shippedAt, t) : "—"}
              </div>
            </button>
          );
        })}
      </Card>
    </div>
  );
};

const NewShipment = ({ onCreate, onCancel, lang }) => {
  const t = i18n[lang];
  const [form, setForm] = useState({
    operation: "checkout",
    deviceType: "laptop",
    deviceModel: "",
    deviceSerial: "",
    deviceAssetTag: "",
    origin: "Lisboa, PT",
    destinationCountry: "SE",
    destinationCity: "",
    destinationAddress: "",
    recipient: "",
    carrier: "",
    trackingNumber: "",
    expectedDelivery: "",
    linkedTicket: "",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = () => {
    if (!form.deviceModel || !form.recipient || !form.destinationCity) return;
    const shipment = {
      id: newShipmentId(),
      ...form,
      status: "preparing",
      createdAt: Date.now(),
      shippedAt: null,
      expectedDelivery: form.expectedDelivery ? new Date(form.expectedDelivery).getTime() : null,
      deliveredAt: null,
      registeredAt: null,
    };
    onCreate(shipment);
  };

  return (
    <div className="max-w-3xl">
      <button onClick={onCancel} className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
        style={{ color: T.textMid }}>
        <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
        {t.common.back}
      </button>

      <PageTitle eyebrow={t.logistics.eyebrow} title={t.logistics.newShipment} />
      <p className="text-base mb-8" style={{ color: T.textMid, lineHeight: 1.6 }}>{t.logistics.newShipmentDesc}</p>

      <Card className="p-6 mb-6">
        <Field label={t.logistics.operationType}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "checkout", label: t.logistics.checkout, icon: Plane, color: T.blueDark, bg: T.blueLight },
              { key: "checkin", label: t.logistics.checkin, icon: ArrowRightLeft, color: T.pinkDark, bg: T.pinkLight },
            ].map((op) => {
              const Icon = op.icon;
              const active = form.operation === op.key;
              return (
                <button key={op.key} type="button" onClick={() => update("operation", op.key)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: active ? op.bg : T.surface,
                    border: `1.5px solid ${active ? op.color : T.border}`,
                    color: active ? op.color : T.textMid,
                  }}>
                  <Icon size={18} />
                  <span className="text-sm font-semibold">{op.label}</span>
                </button>
              );
            })}
          </div>
        </Field>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-lg mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
          {t.logistics.deviceInfo}
        </h3>
        <div className="space-y-4">
          <Field label={t.logistics.deviceType}>
            <select value={form.deviceType} onChange={(e) => update("deviceType", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
              <option value="laptop">{t.logistics.deviceTypeLaptop}</option>
              <option value="mobile">{t.logistics.deviceTypeMobile}</option>
              <option value="dock">{t.logistics.deviceTypeDock}</option>
              <option value="monitor">{t.logistics.deviceTypeMonitor}</option>
              <option value="other">{t.logistics.deviceTypeOther}</option>
            </select>
          </Field>
          <Field label={`${t.logistics.deviceModel} *`}>
            <input type="text" value={form.deviceModel} onChange={(e) => update("deviceModel", e.target.value)}
              placeholder={t.logistics.deviceModelPh}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.logistics.deviceSerial}>
              <input type="text" value={form.deviceSerial} onChange={(e) => update("deviceSerial", e.target.value)}
                placeholder={t.logistics.deviceSerialPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
            <Field label={t.logistics.deviceAssetTag}>
              <input type="text" value={form.deviceAssetTag} onChange={(e) => update("deviceAssetTag", e.target.value)}
                placeholder={t.logistics.deviceAssetTagPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-lg mb-5" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
          {t.logistics.shipmentDetails}
        </h3>
        <div className="space-y-4">
          <Field label={t.logistics.origin}>
            <input type="text" value={form.origin} onChange={(e) => update("origin", e.target.value)}
              placeholder={t.logistics.originPh}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.logistics.destinationCountry}>
              <select value={form.destinationCountry} onChange={(e) => update("destinationCountry", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer" style={inputStyle}>
                {Object.keys(COUNTRY_COORDS).map((c) => (
                  <option key={c} value={c}>{COUNTRY_COORDS[c].flag} {t.logistics.countries[c]}</option>
                ))}
              </select>
            </Field>
            <Field label={`${t.logistics.destinationCity} *`}>
              <input type="text" value={form.destinationCity} onChange={(e) => update("destinationCity", e.target.value)}
                placeholder={t.logistics.destinationCityPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          </div>
          <Field label={t.logistics.destinationAddress}>
            <input type="text" value={form.destinationAddress} onChange={(e) => update("destinationAddress", e.target.value)}
              placeholder={t.logistics.destinationAddressPh}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </Field>
          <Field label={`${t.logistics.recipient} *`}>
            <input type="text" value={form.recipient} onChange={(e) => update("recipient", e.target.value)}
              placeholder={t.logistics.recipientPh}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.logistics.carrier}>
              <input type="text" value={form.carrier} onChange={(e) => update("carrier", e.target.value)}
                placeholder={t.logistics.carrierPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
            <Field label={t.logistics.trackingNumber}>
              <input type="text" value={form.trackingNumber} onChange={(e) => update("trackingNumber", e.target.value)}
                placeholder={t.logistics.trackingNumberPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.logistics.expectedDelivery}>
              <input type="date" value={form.expectedDelivery} onChange={(e) => update("expectedDelivery", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
            <Field label={t.logistics.linkedTicket}>
              <input type="text" value={form.linkedTicket} onChange={(e) => update("linkedTicket", e.target.value)}
                placeholder={t.logistics.linkedTicketPh}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </Field>
          </div>
        </div>
      </Card>

      <button onClick={submit} disabled={!form.deviceModel || !form.recipient || !form.destinationCity}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
        <Send size={14} />
        {t.logistics.submit}
      </button>
    </div>
  );
};

const ShipmentDetail = ({ shipment, onClose, onUpdate, lang, currentUser }) => {
  if (!shipment) return null;
  const t = i18n[lang];
  const coord = COUNTRY_COORDS[shipment.destinationCountry];
  const currentStageIdx = SHIPMENT_FLOW.indexOf(shipment.status);

  const advance = (newStatus) => {
    const updates = { ...shipment, status: newStatus };
    const now = Date.now();
    if (newStatus === "shipped" && !shipment.shippedAt) updates.shippedAt = now;
    if (newStatus === "delivered" && !shipment.deliveredAt) updates.deliveredAt = now;
    if (newStatus === "registered" && !shipment.registeredAt) updates.registeredAt = now;
    onUpdate(updates);
  };

  const fmtDate = (ts) => {
    if (!ts) return t.logistics.detail.notYet;
    const d = new Date(ts);
    return d.toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 flex items-start justify-between gap-4" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium tabular-nums" style={{ color: T.textMid }}>{shipment.id}</span>
            <Pill color={shipment.operation === "checkout" ? T.blueDark : T.pinkDark}>
              {shipment.operation === "checkout" ? t.logistics.checkout : t.logistics.checkin}
            </Pill>
            <ShipmentStatusPill status={shipment.status} t={t} />
          </div>
          <h2 className="text-2xl leading-tight" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
            {shipment.deviceModel}
          </h2>
        </div>
        <button onClick={onClose} className="p-1" style={{ color: T.textMid }}><X size={22} /></button>
      </div>

      <div className="p-6 space-y-5">
        {/* Progress timeline */}
        <div className="rounded-xl p-5" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-4" style={{ color: T.textLight }}>
            {t.logistics.detail.progress}
          </div>
          <div className="flex items-center gap-1">
            {SHIPMENT_FLOW.map((stage, idx) => {
              const passed = idx <= currentStageIdx;
              const cfg = SHIPMENT_STATUSES[stage];
              return (
                <React.Fragment key={stage}>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: passed ? cfg.color : T.surface,
                        border: `2px solid ${passed ? cfg.color : T.border}`,
                        color: "#fff",
                      }}>
                      {passed ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-bold" style={{ color: T.textLight }}>{idx + 1}</span>}
                    </div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider mt-1.5 text-center leading-tight"
                      style={{ color: passed ? cfg.color : T.textLight }}>
                      {t.shipmentStatuses[stage]}
                    </div>
                  </div>
                  {idx < SHIPMENT_FLOW.length - 1 && (
                    <div className="flex-1 h-0.5 mb-6 transition-colors"
                      style={{ backgroundColor: idx < currentStageIdx ? SHIPMENT_STATUSES[SHIPMENT_FLOW[idx + 1]].color : T.border }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Device info */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textLight }}>
            {t.logistics.detail.deviceSection}
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
            <DetailItem label={t.logistics.deviceType} value={t.logistics[`deviceType${shipment.deviceType.charAt(0).toUpperCase() + shipment.deviceType.slice(1)}`] || shipment.deviceType} />
            <DetailItem label={t.logistics.deviceSerial} value={shipment.deviceSerial || "—"} />
            <DetailItem label={t.logistics.deviceAssetTag} value={shipment.deviceAssetTag || "—"} />
            <DetailItem label={t.logistics.deviceModel} value={shipment.deviceModel} />
          </div>
        </div>

        {/* Shipment info */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textLight }}>
            {t.logistics.detail.shipmentSection}
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
            <DetailItem label={t.logistics.origin} value={shipment.origin} />
            <DetailItem label={t.logistics.destination} value={`${coord?.flag} ${shipment.destinationCity}, ${t.logistics.countries[shipment.destinationCountry] || shipment.destinationCountry}`} />
            <div className="col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: T.textLight }}>{t.logistics.destinationAddress}</div>
              <div className="text-sm" style={{ color: T.text }}>{shipment.destinationAddress || "—"}</div>
            </div>
            <DetailItem label={t.logistics.recipient} value={shipment.recipient} />
            <DetailItem label={t.logistics.carrier} value={shipment.carrier || "—"} />
            {shipment.trackingNumber && (
              <div className="col-span-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: T.textLight }}>{t.logistics.trackingNumber}</div>
                <div className="text-sm font-mono" style={{ color: T.text }}>{shipment.trackingNumber}</div>
              </div>
            )}
            {shipment.linkedTicket && (
              <div className="col-span-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: T.textLight }}>{t.logistics.linkedTicket}</div>
                <Pill color={T.blueDark}>{shipment.linkedTicket}</Pill>
              </div>
            )}
          </div>
        </div>

        {/* Timeline dates */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.textLight }}>
            {t.logistics.detail.timeline}
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl p-4" style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
            <DetailItem label={t.logistics.detail.sent} value={fmtDate(shipment.shippedAt)} />
            <DetailItem label={t.logistics.detail.expected} value={fmtDate(shipment.expectedDelivery)} />
            <DetailItem label={t.logistics.detail.delivered} value={fmtDate(shipment.deliveredAt)} />
            <DetailItem label={t.logistics.detail.registered} value={fmtDate(shipment.registeredAt)} />
          </div>
        </div>

        {/* Actions — only for operator */}
        {currentUser === "operator" && (
          <>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: T.textLight }}>
                {t.logistics.detail.changeStatus}
              </div>
              <div className="flex flex-wrap gap-2">
                {SHIPMENT_FLOW.map((stage) => {
                  const cfg = SHIPMENT_STATUSES[stage];
                  const active = shipment.status === stage;
                  return (
                    <button key={stage} onClick={() => advance(stage)} disabled={active}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all"
                      style={{
                        backgroundColor: active ? `${cfg.color}15` : "transparent",
                        borderColor: active ? cfg.color : T.border,
                        borderWidth: 1.5, borderStyle: "solid",
                        color: active ? cfg.color : T.textMid,
                        cursor: active ? "default" : "pointer",
                      }}>
                      {t.shipmentStatuses[stage]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Register in CMDB CTA */}
            {shipment.status === "delivered" && (
              <Card className="p-5" style={{ backgroundColor: T.greenLight, border: `1px solid ${T.green}` }}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: T.surface }}>
                    <Building2 size={20} style={{ color: T.greenDark }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: T.greenDark }}>
                      {t.logistics.detail.registerInCmdb}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: T.greenDark }}>{t.logistics.detail.cmdbHint}</p>
                    <button onClick={() => advance("registered")}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all"
                      style={{ backgroundColor: T.greenDark, color: "#fff" }}>
                      <CheckCircle2 size={14} />
                      {t.logistics.detail.registerInCmdb}
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {shipment.status === "registered" && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ backgroundColor: T.greenLight, border: `1px solid ${T.green}`, color: T.greenDark }}>
                <CheckCircle2 size={16} />
                <span className="text-sm font-semibold">{t.logistics.detail.cmdbDone}</span>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

/* ============================================================
   QUICK TOUR — anchored tooltips
============================================================ */

const TOUR_KEY = "fluxoops-tour-completed";

const QuickTour = ({ steps, onFinish, lang }) => {
  const t = i18n[lang];
  // -1 = welcome modal, 0..n-1 = step pointing at nav item
  const [stepIdx, setStepIdx] = useState(-1);
  const [anchorRect, setAnchorRect] = useState(null);

  // Find anchor element for current step
  useEffect(() => {
    if (stepIdx < 0) return;
    const updateRect = () => {
      const navKey = steps[stepIdx]?.navKey;
      if (!navKey) {
        setAnchorRect(null);
        return;
      }
      const el = document.querySelector(`[data-tour="${navKey}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        setAnchorRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setAnchorRect(null);
      }
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [stepIdx, steps]);

  const skip = () => onFinish();
  const next = () => stepIdx < steps.length - 1 ? setStepIdx(stepIdx + 1) : onFinish();
  const prev = () => setStepIdx(Math.max(0, stepIdx - 1));

  // === WELCOME MODAL ===
  if (stepIdx === -1) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(44,40,37,0.55)", backdropFilter: "blur(4px)" }}>
        <div className="rounded-2xl max-w-md w-full p-7 text-center"
          style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${T.pinkDark}, ${T.pink})` }}>
            <Sparkles size={28} style={{ color: "#fff" }} />
          </div>
          <h2 className="text-2xl mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
            {t.tour.welcomeTitle}
          </h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: T.textMid }}>
            {t.tour.welcomeDesc}
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={skip}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{ backgroundColor: T.surface, border: `1.5px solid ${T.border}`, color: T.textMid }}>
              {t.tour.skip}
            </button>
            <button onClick={() => setStepIdx(0)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
              style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
              <Sparkles size={14} />
              {t.tour.start}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = steps[stepIdx];

  // Tooltip position: to the right of sidebar item, fall back to centered
  const tooltipStyle = anchorRect
    ? {
        top: anchorRect.top + anchorRect.height / 2,
        left: anchorRect.left + anchorRect.width + 16,
        transform: "translateY(-50%)",
      }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  // Build 4 dark rectangles around the anchor to create a "spotlight" effect.
  // This is more reliable than mix-blend or huge box-shadows.
  const overlayRects = anchorRect
    ? [
        { top: 0, left: 0, width: "100vw", height: anchorRect.top - 4 },
        { top: anchorRect.top - 4, left: 0, width: anchorRect.left - 4, height: anchorRect.height + 8 },
        { top: anchorRect.top - 4, left: anchorRect.left + anchorRect.width + 4, right: 0, height: anchorRect.height + 8 },
        { top: anchorRect.top + anchorRect.height + 4, left: 0, width: "100vw", bottom: 0 },
      ]
    : [{ top: 0, left: 0, right: 0, bottom: 0 }];

  return (
    <div className="fixed inset-0 z-[100]" onClick={skip}>
      {/* Dark overlay rectangles around the anchor (or full screen if no anchor) */}
      {overlayRects.map((r, i) => (
        <div key={i} className="absolute" style={{ ...r, backgroundColor: "rgba(44,40,37,0.5)" }} />
      ))}

      {/* Pink highlight ring on top of the anchor */}
      {anchorRect && (
        <div className="absolute pointer-events-none rounded-xl"
          style={{
            top: anchorRect.top - 4,
            left: anchorRect.left - 4,
            width: anchorRect.width + 8,
            height: anchorRect.height + 8,
            border: `3px solid ${T.pink}`,
            boxShadow: `0 0 0 1px ${T.pinkDark}, 0 4px 20px rgba(184,92,114,0.4)`,
            animation: "tourPulse 2s ease-in-out infinite",
          }} />
      )}

      {/* Tooltip card */}
      <div className="absolute rounded-2xl p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...tooltipStyle,
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          width: 320,
          maxWidth: "calc(100vw - 32px)",
        }}>
        {/* Arrow pointing to anchor */}
        {anchorRect && (
          <div className="absolute" style={{
            left: -8,
            top: "50%",
            transform: "translateY(-50%) rotate(45deg)",
            width: 14, height: 14,
            backgroundColor: T.surface,
            borderLeft: `1px solid ${T.border}`,
            borderBottom: `1px solid ${T.border}`,
          }} />
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.pinkDark }}>
            {t.tour.step} {stepIdx + 1} {t.tour.of} {steps.length}
          </span>
          <button onClick={skip} className="text-xs font-medium transition-colors"
            style={{ color: T.textLight }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.pinkDark)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.textLight)}>
            {t.tour.skip}
          </button>
        </div>

        <h3 className="text-lg mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
          {current.title}
        </h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: T.textMid }}>
          {current.desc}
        </p>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-4">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full transition-colors"
              style={{ backgroundColor: i <= stepIdx ? T.pinkDark : T.border }} />
          ))}
        </div>

        <div className="flex justify-between gap-2">
          <button onClick={prev} disabled={stepIdx === 0}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: "transparent", border: `1.5px solid ${T.border}`, color: T.textMid }}>
            {t.tour.prev}
          </button>
          <button onClick={next}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
            style={{ backgroundColor: T.pinkDark, color: "#fff" }}>
            {stepIdx === steps.length - 1 ? t.tour.finish : t.tour.next}
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ERROR BOUNDARY
============================================================ */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("FluxoOps error boundary:", error, info);
  }
  resetData = () => {
    try {
      ["fluxoops-tickets-v4", "fluxoops-shipments-v1", "fluxoops-tour-completed", "fluxoops-user", "fluxoops-lang"].forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", backgroundColor: T.bg, padding: "3rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Sans, sans-serif" }}>
          <div style={{ maxWidth: 480, backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "2rem" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: T.pinkLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <AlertTriangle size={22} style={{ color: T.pinkDark }} />
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: T.text, marginBottom: "0.5rem" }}>Algo deu errado</h2>
            <p style={{ fontSize: 14, color: T.textMid, marginBottom: "1.5rem", lineHeight: 1.6 }}>
              O FluxoOps encontrou um erro inesperado. Provavelmente são dados antigos no navegador. Reinicia que costuma resolver.
            </p>
            <details style={{ marginBottom: "1.5rem", fontSize: 12, color: T.textLight }}>
              <summary style={{ cursor: "pointer", marginBottom: "0.5rem" }}>Detalhes técnicos</summary>
              <pre style={{ backgroundColor: T.bg2, padding: "0.75rem", borderRadius: 8, overflow: "auto", fontSize: 11 }}>
                {String(this.state.error?.message || this.state.error || "unknown")}
              </pre>
            </details>
            <button onClick={this.resetData}
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 999, backgroundColor: T.pinkDark, color: "#fff", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Reiniciar e limpar dados
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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

function AppInner() {
  const [currentUser, setCurrentUser] = useState(loadUser());
  const [view, setView] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState(loadLang());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedKbId, setFocusedKbId] = useState(null);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => { setTickets(loadTickets()); setShipments(loadShipments()); setLoaded(true); }, []);
  useEffect(() => { if (loaded) saveTickets(tickets); }, [tickets, loaded]);
  useEffect(() => { if (loaded) saveShipments(shipments); }, [shipments, loaded]);
  useEffect(() => { saveLang(lang); }, [lang]);
  useEffect(() => { saveUser(currentUser); }, [currentUser]);

  const t = i18n[lang];

  // Default view by role
  useEffect(() => {
    if (currentUser === "operator") setView("dashboard");
    if (currentUser === "enduser") setView("catalog");

    // Trigger tour on first login per role (persists per role)
    if (currentUser) {
      try {
        const completed = JSON.parse(localStorage.getItem(TOUR_KEY) || "{}");
        if (!completed[currentUser]) {
          // Small delay so the UI settles before showing the tour
          setTimeout(() => setShowTour(true), 400);
        }
      } catch (e) {}
    }
  }, [currentUser]);

  const finishTour = () => {
    setShowTour(false);
    try {
      const completed = JSON.parse(localStorage.getItem(TOUR_KEY) || "{}");
      completed[currentUser] = true;
      localStorage.setItem(TOUR_KEY, JSON.stringify(completed));
    } catch (e) {}
  };

  const handleCreate = (ticket) => {
    setTickets([ticket, ...tickets]);
    setView(currentUser === "enduser" ? "myTickets" : "tickets");
  };

  const handleUpdate = (updated) => {
    setTickets(tickets.map((x) => (x.id === updated.id ? updated : x)));
    setSelected(updated);
  };

  const handleCreateShipment = (shipment) => {
    setShipments([shipment, ...shipments]);
    setView("logistics");
  };

  const handleUpdateShipment = (updated) => {
    setShipments(shipments.map((x) => (x.id === updated.id ? updated : x)));
    setSelectedShipment(updated);
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
    { key: "logistics", label: t.nav.logistics, icon: Package },
    { key: "kb", label: t.nav.kb, icon: HelpCircle },
  ];

  const enduserNav = [
    { key: "catalog", label: t.nav.catalog, icon: BookOpen },
    { key: "new", label: t.nav.newTicket, icon: PlusCircle },
    { key: "myTickets", label: t.nav.myTickets, icon: Ticket },
    { key: "myDevices", label: t.nav.myDevices, icon: Package },
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
        @keyframes tourPulse { 0%,100% { box-shadow: 0 0 0 1px ${T.pinkDark}, 0 4px 20px rgba(184,92,114,0.4); } 50% { box-shadow: 0 0 0 1px ${T.pinkDark}, 0 4px 28px rgba(184,92,114,0.7); } }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex w-60 flex-col p-5" style={{ backgroundColor: T.bg2, borderRight: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2.5 mb-8 px-1">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
              <img src={MASCOT_URL} alt="FluxoOps" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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
                <button key={item.key} data-tour={item.key} onClick={() => { setView(item.key); setMobileMenuOpen(false); }}
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

          <div data-tour="aiops" className="rounded-xl p-3.5 text-xs mb-3" style={{ backgroundColor: T.pinkLight, border: `1px solid ${T.pink}` }}>
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
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: T.bg2, border: `1px solid ${T.border}` }}>
              <img src={MASCOT_URL} alt="FluxoOps" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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
              {view === "logistics" && currentUser === "operator" && (
                <LogisticsView shipments={shipments} onSelect={setSelectedShipment} onNewShipment={() => setView("newShipment")} lang={lang} currentUser={currentUser} />
              )}
              {view === "newShipment" && currentUser === "operator" && (
                <NewShipment onCreate={handleCreateShipment} onCancel={() => setView("logistics")} lang={lang} />
              )}
              {view === "myDevices" && currentUser === "enduser" && (
                <LogisticsView
                  shipments={shipments.filter((s) => s.recipient === "End User" || s.linkedTicket?.startsWith("REQ"))}
                  onSelect={setSelectedShipment}
                  onNewShipment={() => {}}
                  lang={lang}
                  currentUser={currentUser}
                />
              )}
            </>
          )}
        </main>
      </div>

      {selected && (
        <TicketDetail ticket={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} lang={lang} currentUser={currentUser} />
      )}

      {selectedShipment && (
        <ShipmentDetail shipment={selectedShipment} onClose={() => setSelectedShipment(null)} onUpdate={handleUpdateShipment} lang={lang} currentUser={currentUser} />
      )}

      {/* Quick tour — shows on first login per role */}
      {showTour && currentUser && (() => {
        const operatorTourSteps = [
          { navKey: "dashboard", ...t.tour.operatorSteps[0] },
          { navKey: "catalog", ...t.tour.operatorSteps[1] },
          { navKey: "tickets", ...t.tour.operatorSteps[2] },
          { navKey: "new", ...t.tour.operatorSteps[3] },
          { navKey: "logistics", ...t.tour.operatorSteps[4] },
          { navKey: "kb", ...t.tour.operatorSteps[5] },
          { navKey: "aiops", ...t.tour.operatorSteps[6] },
        ];
        const enduserTourSteps = [
          { navKey: "catalog", ...t.tour.enduserSteps[0] },
          { navKey: "new", ...t.tour.enduserSteps[1] },
          { navKey: "myTickets", ...t.tour.enduserSteps[2] },
          { navKey: "myDevices", ...t.tour.enduserSteps[3] },
          { navKey: "kb", ...t.tour.enduserSteps[4] },
        ];
        const tourSteps = currentUser === "operator" ? operatorTourSteps : enduserTourSteps;
        return <QuickTour steps={tourSteps} onFinish={finishTour} lang={lang} />;
      })()}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
