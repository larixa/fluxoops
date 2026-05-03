import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldAlert,
  Zap,
  Activity,
  Users,
  ArrowUpRight,
  Sparkles,
  Loader2,
  ChevronRight,
  X,
  AlertCircle,
  Network,
  Lock,
  Monitor,
  Smartphone,
  Mail,
  HardDrive,
  Wifi,
  Bug,
  Settings,
  Send,
  Flame,
  BookOpen,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

// ============ DATA MODEL ============

const PRIORITIES = {
  P1: { label: "P1 — Crítico", color: "#ff3b5c", slaResponseMin: 15, slaResolveMin: 240, weight: 4 },
  P2: { label: "P2 — Alto", color: "#f5a623", slaResponseMin: 60, slaResolveMin: 480, weight: 3 },
  P3: { label: "P3 — Médio", color: "#4a9eff", slaResponseMin: 240, slaResolveMin: 1440, weight: 2 },
  P4: { label: "P4 — Baixo", color: "#7a8499", slaResponseMin: 1440, slaResolveMin: 4320, weight: 1 },
};

const STATUSES = {
  new: { label: "Novo", color: "#4a9eff" },
  in_progress: { label: "Em andamento", color: "#f5a623" },
  waiting: { label: "Aguardando usuário", color: "#a78bfa" },
  resolved: { label: "Resolvido", color: "#00d4aa" },
  closed: { label: "Fechado", color: "#7a8499" },
};

const CATEGORIES = {
  iam: {
    label: "Acesso e Identidade",
    icon: Lock,
    accent: "#a78bfa",
    subcategories: ["Reset de senha", "MFA", "Provisionamento", "Desprovisionamento", "Permissões RBAC"],
    defaultTeam: "Identity Team",
  },
  hardware: {
    label: "Hardware",
    icon: Monitor,
    accent: "#f5a623",
    subcategories: ["Notebook", "Periféricos", "Mobile", "Impressora", "Estação de trabalho"],
    defaultTeam: "Field Support",
  },
  software: {
    label: "Software",
    icon: Bug,
    accent: "#4a9eff",
    subcategories: ["Licença", "Instalação", "Erro / Bug", "Atualização", "Configuração"],
    defaultTeam: "Application Support",
  },
  network: {
    label: "Rede",
    icon: Wifi,
    accent: "#00d4aa",
    subcategories: ["VPN", "WiFi", "Conectividade", "Firewall", "DNS / DHCP"],
    defaultTeam: "Network Operations",
  },
  security: {
    label: "Segurança",
    icon: ShieldAlert,
    accent: "#ff3b5c",
    subcategories: ["Phishing", "Malware", "Incidente", "Violação de política", "Acesso indevido"],
    defaultTeam: "SOC / Security",
  },
  apps: {
    label: "Aplicações",
    icon: Network,
    accent: "#06b6d4",
    subcategories: ["SaaS (M365, Google)", "ERP / CRM", "Integração", "API"],
    defaultTeam: "Application Support",
  },
  telecom: {
    label: "Telefonia",
    icon: Smartphone,
    accent: "#ec4899",
    subcategories: ["Softphone", "Conferência", "Mobile corporativo"],
    defaultTeam: "Telecom",
  },
  general: {
    label: "Geral",
    icon: Mail,
    accent: "#7a8499",
    subcategories: ["Dúvida", "Solicitação de informação", "Onboarding"],
    defaultTeam: "Service Desk N1",
  },
};

// ============ SERVICE CATALOG ============

const SERVICE_CATALOG = [
  // IAM
  {
    id: "svc-iam-01",
    name: "Reset de senha",
    description: "Recuperação de senha do domínio corporativo (AD / Entra ID).",
    category: "iam",
    subcategory: "Reset de senha",
    defaultPriority: "P3",
    estimatedTime: "15 min",
    approval: false,
  },
  {
    id: "svc-iam-02",
    name: "Reset de MFA",
    description: "Restabelecer autenticação multifator após troca de aparelho ou perda de acesso.",
    category: "iam",
    subcategory: "MFA",
    defaultPriority: "P2",
    estimatedTime: "30 min",
    approval: false,
  },
  {
    id: "svc-iam-03",
    name: "Criação de novo usuário",
    description: "Provisionamento de conta para novo colaborador com perfil padrão por departamento.",
    category: "iam",
    subcategory: "Provisionamento",
    defaultPriority: "P3",
    estimatedTime: "4h",
    approval: true,
  },
  {
    id: "svc-iam-04",
    name: "Desprovisionamento (offboarding)",
    description: "Bloqueio e arquivamento de conta de colaborador desligado conforme política.",
    category: "iam",
    subcategory: "Desprovisionamento",
    defaultPriority: "P2",
    estimatedTime: "2h",
    approval: true,
  },
  {
    id: "svc-iam-05",
    name: "Adicionar a grupo de segurança",
    description: "Concessão de permissão via grupo RBAC (SharePoint, Teams, file share, app).",
    category: "iam",
    subcategory: "Permissões RBAC",
    defaultPriority: "P3",
    estimatedTime: "1h",
    approval: true,
  },
  // Hardware
  {
    id: "svc-hw-01",
    name: "Solicitar notebook corporativo",
    description: "Provisão de notebook conforme catálogo padrão (perfil Office / Dev / Design).",
    category: "hardware",
    subcategory: "Notebook",
    defaultPriority: "P3",
    estimatedTime: "3 dias úteis",
    approval: true,
  },
  {
    id: "svc-hw-02",
    name: "Solicitar periféricos",
    description: "Mouse, teclado, headset, monitor adicional, dock station.",
    category: "hardware",
    subcategory: "Periféricos",
    defaultPriority: "P4",
    estimatedTime: "2 dias úteis",
    approval: false,
  },
  {
    id: "svc-hw-03",
    name: "Solicitar celular corporativo",
    description: "Smartphone gerenciado via MDM com perfil corporativo.",
    category: "hardware",
    subcategory: "Mobile",
    defaultPriority: "P3",
    estimatedTime: "5 dias úteis",
    approval: true,
  },
  // Software
  {
    id: "svc-sw-01",
    name: "Solicitar licença de software",
    description: "Atribuição de licença (M365, Adobe CC, Visio, Project, ferramentas dev).",
    category: "software",
    subcategory: "Licença",
    defaultPriority: "P3",
    estimatedTime: "1 dia útil",
    approval: true,
  },
  {
    id: "svc-sw-02",
    name: "Instalação de software",
    description: "Instalação remota via Intune ou agendamento com Field Support.",
    category: "software",
    subcategory: "Instalação",
    defaultPriority: "P4",
    estimatedTime: "1 dia útil",
    approval: false,
  },
  // Network
  {
    id: "svc-net-01",
    name: "Acesso VPN",
    description: "Configuração e habilitação de cliente VPN para acesso remoto.",
    category: "network",
    subcategory: "VPN",
    defaultPriority: "P3",
    estimatedTime: "2h",
    approval: true,
  },
  {
    id: "svc-net-02",
    name: "WiFi para visitante",
    description: "Acesso temporário à rede de visitantes (até 7 dias).",
    category: "network",
    subcategory: "WiFi",
    defaultPriority: "P4",
    estimatedTime: "30 min",
    approval: false,
  },
  {
    id: "svc-net-03",
    name: "Liberação de regra de firewall",
    description: "Solicitação de exceção de firewall com justificativa de segurança.",
    category: "network",
    subcategory: "Firewall",
    defaultPriority: "P3",
    estimatedTime: "2 dias úteis",
    approval: true,
  },
  // Apps
  {
    id: "svc-app-01",
    name: "Acesso a aplicação SaaS",
    description: "Provisionamento e atribuição de papel em aplicação SaaS corporativa.",
    category: "apps",
    subcategory: "SaaS (M365, Google)",
    defaultPriority: "P3",
    estimatedTime: "1 dia útil",
    approval: true,
  },
  {
    id: "svc-app-02",
    name: "Novo site SharePoint / Teams",
    description: "Criação de site colaborativo com governança e proprietário definidos.",
    category: "apps",
    subcategory: "SaaS (M365, Google)",
    defaultPriority: "P4",
    estimatedTime: "2 dias úteis",
    approval: true,
  },
  // Security
  {
    id: "svc-sec-01",
    name: "Reportar phishing",
    description: "Notificação de tentativa de phishing para análise pelo SOC.",
    category: "security",
    subcategory: "Phishing",
    defaultPriority: "P2",
    estimatedTime: "1h",
    approval: false,
  },
  {
    id: "svc-sec-02",
    name: "Reportar incidente de segurança",
    description: "Abertura formal de incidente de segurança para investigação imediata.",
    category: "security",
    subcategory: "Incidente",
    defaultPriority: "P1",
    estimatedTime: "Imediato",
    approval: false,
  },
  // General
  {
    id: "svc-gen-01",
    name: "Onboarding de novo colaborador",
    description: "Pacote completo: conta, equipamento, acessos básicos, treinamento.",
    category: "general",
    subcategory: "Onboarding",
    defaultPriority: "P2",
    estimatedTime: "3 dias úteis",
    approval: true,
  },
  {
    id: "svc-gen-02",
    name: "Dúvida geral / Como faço?",
    description: "Suporte e orientação sobre processos, ferramentas ou políticas de TI.",
    category: "general",
    subcategory: "Dúvida",
    defaultPriority: "P4",
    estimatedTime: "1 dia útil",
    approval: false,
  },
];

// ============ SEED DATA ============

const SEED_TICKETS = [
  {
    id: "INC-1001",
    title: "Não consigo acessar o VPN corporativo",
    description: "Desde manhã o cliente AnyConnect retorna 'authentication failed' mesmo com senha correta.",
    category: "network",
    subcategory: "VPN",
    priority: "P2",
    status: "in_progress",
    team: "Network Operations",
    requester: "Anna Becker",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    updatedAt: Date.now() - 1000 * 60 * 30,
    aiReasoning: "Problema de autenticação em VPN é típico de bloqueio de conta, expiração de cert ou MFA dessincronizado.",
  },
  {
    id: "INC-1002",
    title: "Phishing reportado por equipe financeira",
    description: "Email com remetente externo fingindo ser CEO solicitando transferência urgente. 3 usuários receberam.",
    category: "security",
    subcategory: "Phishing",
    priority: "P1",
    status: "in_progress",
    team: "SOC / Security",
    requester: "Lucas Meyer",
    createdAt: Date.now() - 1000 * 60 * 45,
    updatedAt: Date.now() - 1000 * 60 * 10,
    aiReasoning: "Tentativa de fraude tipo CEO/BEC envolvendo finanças — escalada imediata para SOC.",
  },
  {
    id: "INC-1003",
    title: "Solicitar nova licença Adobe Creative Cloud",
    description: "Novo designer entrando segunda-feira, precisa de licença CC completa.",
    category: "software",
    subcategory: "Licença",
    priority: "P3",
    status: "new",
    team: "Application Support",
    requester: "Sofia Romano",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    updatedAt: Date.now() - 1000 * 60 * 60 * 6,
    aiReasoning: "Solicitação padrão de provisionamento de licença para onboarding.",
  },
  {
    id: "INC-1004",
    title: "Reset de MFA — perdeu o celular",
    description: "Usuário trocou de aparelho e não conseguiu transferir o app autenticador.",
    category: "iam",
    subcategory: "MFA",
    priority: "P3",
    status: "resolved",
    team: "Identity Team",
    requester: "Marco Silva",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 18,
    aiReasoning: "Procedimento padrão de reset de MFA com verificação de identidade.",
  },
  {
    id: "INC-1005",
    title: "Notebook não liga",
    description: "ThinkPad T14 não responde ao botão de power, LED não acende.",
    category: "hardware",
    subcategory: "Notebook",
    priority: "P2",
    status: "waiting",
    team: "Field Support",
    requester: "Julia Wagner",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    aiReasoning: "Falha de hardware, precisa diagnóstico físico ou substituição via swap pool.",
  },
  {
    id: "INC-1006",
    title: "Erro 500 no portal de RH",
    description: "Múltiplos usuários relatam erro 500 ao acessar a página de holerites.",
    category: "apps",
    subcategory: "ERP / CRM",
    priority: "P1",
    status: "in_progress",
    team: "Application Support",
    requester: "Multiple users",
    createdAt: Date.now() - 1000 * 60 * 90,
    updatedAt: Date.now() - 1000 * 60 * 5,
    aiReasoning: "Indisponibilidade afetando múltiplos usuários — possível incidente major.",
  },
  {
    id: "INC-1007",
    title: "Adicionar membro ao grupo SharePoint Marketing",
    description: "Onboarding de novo gerente de marketing.",
    category: "iam",
    subcategory: "Permissões RBAC",
    priority: "P4",
    status: "resolved",
    team: "Identity Team",
    requester: "RH",
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
    updatedAt: Date.now() - 1000 * 60 * 60 * 28,
    aiReasoning: "Solicitação padrão de RBAC, baixa prioridade.",
  },
];

// ============ HELPERS ============

const formatRelative = (ts) => {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min}m atrás`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h atrás`;
  const days = Math.floor(hr / 24);
  return `${days}d atrás`;
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

// ============ AI CATEGORIZATION (offline, keyword-based) ============
//
// Esta versão standalone usa classificação por palavras-chave para funcionar
// sem chave de API e sem CORS. Para produção real com IA generativa, faça
// proxy via uma serverless function (Vercel/Netlify Functions) e troque
// esta função por uma chamada à sua API.

const KEYWORDS = {
  security: {
    terms: ["phishing", "malware", "ransomware", "vírus", "virus", "incidente", "vazamento", "violação", "violacao", "suspeito", "fraude", "ataque", "invasão", "invasao", "comprometido", "spam"],
    weight: 10,
  },
  network: {
    terms: ["vpn", "wifi", "wi-fi", "rede", "conectividade", "internet", "firewall", "dns", "dhcp", "lentidão", "lentidao", "conexão", "conexao", "ping", "anyconnect", "proxy"],
    weight: 8,
  },
  iam: {
    terms: ["senha", "password", "mfa", "autenticação", "autenticacao", "login", "acesso", "permissão", "permissao", "grupo", "rbac", "provisionamento", "desprovisionamento", "conta", "ad", "entra", "azure ad"],
    weight: 8,
  },
  hardware: {
    terms: ["notebook", "laptop", "mouse", "teclado", "monitor", "impressora", "headset", "celular", "mobile", "dock", "thinkpad", "macbook", "tela", "bateria", "carregador", "periférico", "periferico"],
    weight: 7,
  },
  software: {
    terms: ["licença", "licenca", "instalação", "instalacao", "install", "erro", "bug", "atualização", "atualizacao", "update", "office", "excel", "word", "outlook", "adobe", "visio"],
    weight: 6,
  },
  apps: {
    terms: ["sharepoint", "teams", "saas", "erp", "crm", "salesforce", "sap", "portal", "aplicação", "aplicacao", "app", "integração", "integracao", "api", "m365", "google workspace"],
    weight: 6,
  },
  telecom: {
    terms: ["telefone", "telefonia", "ramal", "softphone", "conferência", "conferencia", "zoom", "voip"],
    weight: 5,
  },
  general: {
    terms: ["dúvida", "duvida", "informação", "informacao", "como faço", "como faco", "onboarding", "treinamento"],
    weight: 3,
  },
};

const PRIORITY_SIGNALS = {
  P1: ["múltiplos usuários", "multiplos usuarios", "todos usuários", "todos usuarios", "fora do ar", "down", "inoperante", "produção parada", "producao parada", "crítico", "critico", "incidente", "phishing", "ransomware", "vazamento", "ataque", "ceo", "diretor"],
  P2: ["bloqueio total", "não consigo trabalhar", "nao consigo trabalhar", "parado", "urgente", "vpn", "mfa", "perdeu", "não liga", "nao liga", "não acessa", "nao acessa"],
  P3: ["lentidão", "lentidao", "intermitente", "às vezes", "as vezes", "ajuda", "configurar"],
  P4: ["solicitar", "solicitação", "solicitacao", "novo", "nova", "quero", "preciso de", "gostaria", "dúvida", "duvida", "como faço", "como faco"],
};

const categorizeWithAI = async (title, description) => {
  // Simulate slight async delay so the loading UI feels real
  await new Promise((r) => setTimeout(r, 600));

  const text = `${title} ${description}`.toLowerCase();

  // Score each category by keyword matches
  let bestCat = "general";
  let bestScore = 0;
  for (const [cat, { terms, weight }] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const term of terms) {
      if (text.includes(term)) score += weight;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }

  // Determine priority by signals (P1 > P2 > P3 > P4)
  let priority = "P3";
  for (const [p, signals] of Object.entries(PRIORITY_SIGNALS)) {
    if (signals.some((s) => text.includes(s))) {
      priority = p;
      break;
    }
  }

  // Security incidents always at least P2
  if (bestCat === "security" && (priority === "P3" || priority === "P4")) {
    priority = "P2";
  }

  // Find best subcategory match
  const cat = CATEGORIES[bestCat];
  let subcategory = cat.subcategories[0];
  for (const sub of cat.subcategories) {
    if (text.includes(sub.toLowerCase().split(" ")[0])) {
      subcategory = sub;
      break;
    }
  }

  const reasoningMap = {
    security: "Indicadores de incidente de segurança detectados — escalada prioritária para o SOC.",
    network: "Problema de conectividade ou infraestrutura de rede identificado.",
    iam: "Solicitação relacionada a identidade, autenticação ou controle de acesso.",
    hardware: "Falha ou solicitação de hardware físico identificada.",
    software: "Questão envolvendo aplicação instalada, licença ou bug.",
    apps: "Aplicação SaaS ou de negócio impactada.",
    telecom: "Solicitação relacionada à telefonia corporativa.",
    general: "Solicitação geral sem categoria técnica específica.",
  };

  return {
    category: bestCat,
    subcategory,
    priority,
    team: cat.defaultTeam,
    reasoning: reasoningMap[bestCat],
  };
};

// ============ STORAGE (localStorage) ============

const TICKETS_KEY = "fluxoops-tickets-v1";

const loadTickets = async () => {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Load failed:", e);
  }
  return SEED_TICKETS;
};

const saveTickets = async (tickets) => {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error("Save failed:", e);
  }
};

// ============ UI PRIMITIVES ============

const Badge = ({ color, children, dot = true }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider"
    style={{
      backgroundColor: `${color}15`,
      color: color,
      border: `1px solid ${color}30`,
    }}
  >
    {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#0f1320] border border-[#1f2438] rounded-lg ${className}`}>{children}</div>
);

// ============ DASHBOARD ============

const Dashboard = ({ tickets }) => {
  const stats = useMemo(() => {
    const open = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed");
    const breached = open.filter((t) => slaStatus(t).state === "breach").length;
    const atRisk = open.filter((t) => slaStatus(t).state === "risk").length;
    const p1 = open.filter((t) => t.priority === "P1").length;
    const resolvedToday = tickets.filter(
      (t) => t.status === "resolved" && Date.now() - t.updatedAt < 86400000
    ).length;

    const resolvedTickets = tickets.filter((t) => t.status === "resolved");
    const avgMTTR =
      resolvedTickets.length > 0
        ? resolvedTickets.reduce((sum, t) => sum + (t.updatedAt - t.createdAt), 0) /
          resolvedTickets.length /
          3600000
        : 0;

    return { totalOpen: open.length, breached, atRisk, p1, resolvedToday, avgMTTR };
  }, [tickets]);

  const byCategory = useMemo(() => {
    const map = {};
    tickets.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + 1;
    });
    return Object.entries(map).map(([k, v]) => ({
      name: CATEGORIES[k]?.label || k,
      value: v,
      color: CATEGORIES[k]?.accent || "#7a8499",
    }));
  }, [tickets]);

  const byPriority = useMemo(() => {
    const map = { P1: 0, P2: 0, P3: 0, P4: 0 };
    tickets
      .filter((t) => t.status !== "resolved" && t.status !== "closed")
      .forEach((t) => (map[t.priority] = (map[t.priority] || 0) + 1));
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
      const created = tickets.filter((t) => t.createdAt >= dayStart - 86400000 && t.createdAt < dayEnd).length;
      const resolved = tickets.filter(
        (t) =>
          t.status === "resolved" && t.updatedAt >= dayStart - 86400000 && t.updatedAt < dayEnd
      ).length;
      const d = new Date(dayStart);
      result.push({
        day: `${d.getDate()}/${d.getMonth() + 1}`,
        Abertos: created,
        Resolvidos: resolved,
      });
    }
    return result;
  }, [tickets]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8b94a3] mb-1">
          Operations Center
        </div>
        <h1 className="text-3xl font-display text-white">Dashboard</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Activity}
          label="Tickets abertos"
          value={stats.totalOpen}
          accent="#4a9eff"
          sub={`${stats.resolvedToday} resolvidos hoje`}
        />
        <KpiCard
          icon={Flame}
          label="Críticos (P1)"
          value={stats.p1}
          accent="#ff3b5c"
          sub="Resposta máx. 15min"
        />
        <KpiCard
          icon={AlertTriangle}
          label="SLA em risco"
          value={stats.atRisk + stats.breached}
          accent="#f5a623"
          sub={`${stats.breached} já estouraram`}
        />
        <KpiCard
          icon={Clock}
          label="MTTR médio"
          value={stats.avgMTTR.toFixed(1)}
          unit="h"
          accent="#00d4aa"
          sub="Últimos resolvidos"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend chart */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8b94a3]">
                Volume diário
              </div>
              <h3 className="text-lg text-white font-display">Tickets abertos vs resolvidos</h3>
            </div>
            <Badge color="#00d4aa">7 dias</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a9eff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4a9eff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2438" />
              <XAxis dataKey="day" stroke="#8b94a3" tick={{ fontSize: 11, fontFamily: "monospace" }} />
              <YAxis stroke="#8b94a3" tick={{ fontSize: 11, fontFamily: "monospace" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0e1a",
                  border: "1px solid #1f2438",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="Abertos"
                stroke="#4a9eff"
                fill="url(#gradOpen)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Resolvidos"
                stroke="#00d4aa"
                fill="url(#gradRes)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Priority breakdown */}
        <Card className="p-5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8b94a3]">
            Distribuição
          </div>
          <h3 className="text-lg text-white font-display mb-4">Por prioridade</h3>
          <div className="space-y-3">
            {byPriority.map((p) => {
              const total = byPriority.reduce((s, x) => s + x.value, 0) || 1;
              const pct = (p.value / total) * 100;
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-mono">{p.name}</span>
                    <span className="text-sm text-[#8b94a3] font-mono">{p.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#1f2438] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Category breakdown */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#8b94a3]">
              Service Catalog
            </div>
            <h3 className="text-lg text-white font-display">Tickets por categoria</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const Icon = cat.icon;
            const count = tickets.filter((t) => t.category === key).length;
            return (
              <div
                key={key}
                className="bg-[#0a0e1a] border border-[#1f2438] rounded p-3 hover:border-[#2d3554] transition-colors"
              >
                <Icon size={18} style={{ color: cat.accent }} />
                <div className="text-xl text-white font-mono mt-2">{count}</div>
                <div className="text-[10px] text-[#8b94a3] uppercase tracking-wider mt-0.5 leading-tight">
                  {cat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, value, unit, accent, sub }) => (
  <Card className="p-5 relative overflow-hidden group">
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
      style={{ backgroundColor: accent }}
    />
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#8b94a3]">{label}</div>
        <Icon size={16} style={{ color: accent }} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl text-white font-display tabular-nums">{value}</span>
        {unit && <span className="text-sm text-[#8b94a3] font-mono">{unit}</span>}
      </div>
      <div className="text-xs text-[#8b94a3] mt-1">{sub}</div>
    </div>
  </Card>
);

// ============ SERVICE CATALOG VIEW ============

const ServiceCatalog = ({ onRequest }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [requesting, setRequesting] = useState(null);
  const [requesterName, setRequesterName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const filtered = useMemo(() => {
    return SERVICE_CATALOG.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    });
  }, [search, activeCategory]);

  const submitRequest = () => {
    if (!requesting || !requesterName) return;
    const cat = CATEGORIES[requesting.category];
    const ticket = {
      id: newId(),
      title: requesting.name,
      description: extraNotes
        ? `${requesting.description}\n\nObservações: ${extraNotes}`
        : requesting.description,
      category: requesting.category,
      subcategory: requesting.subcategory,
      priority: requesting.defaultPriority,
      status: "new",
      team: cat?.defaultTeam || "Service Desk N1",
      requester: requesterName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      aiReasoning: `Solicitação aberta via Catálogo de Serviços (${requesting.id}). Item padronizado, fluxo automatizado.`,
      fromCatalog: requesting.id,
    };
    onRequest(ticket);
    setRequesting(null);
    setRequesterName("");
    setExtraNotes("");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8b94a3] mb-1">
          Self-service portal
        </div>
        <h1 className="text-3xl font-display text-white">Catálogo de Serviços</h1>
        <p className="text-sm text-[#8b94a3] mt-2 max-w-2xl">
          Itens padronizados que o time de TI oferece. Solicitações pelo catálogo seguem
          fluxo pré-aprovado e SLAs definidos — reduzem tempo de triagem e padronizam o atendimento.
        </p>
      </div>

      {/* Search + categories */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b94a3]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="O que você precisa? Ex: notebook, VPN, licença..."
            className="w-full bg-[#0f1320] border border-[#1f2438] text-white pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-[#5a6378] focus:outline-none focus:border-[#4a9eff]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            color="#4a9eff"
          >
            Todos ({SERVICE_CATALOG.length})
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
              >
                <Icon size={12} />
                {cat.label} ({count})
              </CategoryChip>
            );
          })}
        </div>
      </div>

      {/* Service items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((svc) => {
          const cat = CATEGORIES[svc.category];
          const Icon = cat?.icon || Ticket;
          return (
            <Card
              key={svc.id}
              className="p-5 hover:border-[#2d3554] transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${cat.accent}15`, border: `1px solid ${cat.accent}30` }}
                >
                  <Icon size={18} style={{ color: cat.accent }} />
                </div>
                <Badge color={PRIORITIES[svc.defaultPriority].color}>
                  {svc.defaultPriority}
                </Badge>
              </div>

              <h3 className="text-white font-display text-base mb-1.5 leading-tight">
                {svc.name}
              </h3>
              <p className="text-xs text-[#8b94a3] leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                {svc.description}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#5a6378] mb-4 pb-4 border-b border-[#1f2438]">
                <div className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {svc.estimatedTime}
                </div>
                {svc.approval && (
                  <div className="flex items-center gap-1.5 text-[#a78bfa]">
                    <Lock size={11} />
                    Aprovação
                  </div>
                )}
              </div>

              <button
                onClick={() => setRequesting(svc)}
                className="w-full flex items-center justify-center gap-2 bg-[#1f2438] hover:bg-[#4a9eff] hover:text-white text-[#c8cdd9] text-xs font-mono uppercase tracking-wider py-2.5 rounded transition-colors"
              >
                Solicitar
                <ArrowUpRight size={12} />
              </button>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center text-[#8b94a3] text-sm">
          Nenhum serviço encontrado. Tente outra busca ou abra um ticket geral.
        </div>
      )}

      {/* Request modal */}
      {requesting && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setRequesting(null)}
        >
          <div
            className="bg-[#0f1320] border border-[#1f2438] rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#1f2438] flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3] mb-1">
                  Confirmar solicitação
                </div>
                <h3 className="text-lg font-display text-white">{requesting.name}</h3>
              </div>
              <button onClick={() => setRequesting(null)} className="text-[#8b94a3] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#c8cdd9]">{requesting.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0a0e1a] border border-[#1f2438] rounded p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378]">
                    Prioridade
                  </div>
                  <div className="mt-1.5">
                    <Badge color={PRIORITIES[requesting.defaultPriority].color}>
                      {PRIORITIES[requesting.defaultPriority].label}
                    </Badge>
                  </div>
                </div>
                <div className="bg-[#0a0e1a] border border-[#1f2438] rounded p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378]">
                    Tempo estimado
                  </div>
                  <div className="mt-1.5 text-sm text-white font-mono">
                    {requesting.estimatedTime}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                  Solicitante *
                </label>
                <input
                  type="text"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                  Observações (opcional)
                </label>
                <textarea
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  rows={3}
                  placeholder="Detalhes adicionais, urgência, contexto..."
                  className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff] resize-none"
                />
              </div>

              {requesting.approval && (
                <div className="flex items-start gap-2 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded p-3">
                  <Lock size={14} className="text-[#a78bfa] mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-[#c8cdd9]">
                    Esse serviço requer aprovação. O ticket será criado em status "Novo" e
                    aguardará validação do gestor antes da execução.
                  </div>
                </div>
              )}

              <button
                onClick={submitRequest}
                disabled={!requesterName}
                className="w-full flex items-center justify-center gap-2 bg-[#00d4aa] text-[#0a0e1a] font-mono uppercase tracking-wider text-xs py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00b894] transition-colors"
              >
                <Send size={14} />
                Abrir solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryChip = ({ active, onClick, color, children }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border"
    style={{
      backgroundColor: active ? `${color}20` : "transparent",
      borderColor: active ? color : "#1f2438",
      color: active ? color : "#8b94a3",
    }}
  >
    {children}
  </button>
);

// ============ TICKET LIST ============

const TicketList = ({ tickets, onSelect }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tickets
      .filter((t) => {
        if (filter === "all") return true;
        if (filter === "open") return t.status !== "resolved" && t.status !== "closed";
        if (filter === "p1") return t.priority === "P1";
        if (filter === "breach") return slaStatus(t).state === "breach";
        return true;
      })
      .filter((t) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(s) ||
          t.id.toLowerCase().includes(s) ||
          t.description.toLowerCase().includes(s)
        );
      })
      .sort((a, b) => {
        const wa = PRIORITIES[a.priority].weight;
        const wb = PRIORITIES[b.priority].weight;
        if (wa !== wb) return wb - wa;
        return b.createdAt - a.createdAt;
      });
  }, [tickets, filter, search]);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8b94a3] mb-1">
          Service Desk
        </div>
        <h1 className="text-3xl font-display text-white">Tickets</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b94a3]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, ID ou descrição..."
            className="w-full bg-[#0f1320] border border-[#1f2438] text-white pl-10 pr-4 py-2.5 rounded-lg text-sm font-mono placeholder:text-[#5a6378] focus:outline-none focus:border-[#4a9eff]"
          />
        </div>
        <div className="flex gap-1 bg-[#0f1320] border border-[#1f2438] rounded-lg p-1">
          {[
            { key: "all", label: "Todos" },
            { key: "open", label: "Abertos" },
            { key: "p1", label: "P1" },
            { key: "breach", label: "SLA estourado" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                filter === f.key
                  ? "bg-[#4a9eff] text-white"
                  : "text-[#8b94a3] hover:text-white hover:bg-[#1f2438]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-[#1f2438] text-[10px] font-mono uppercase tracking-wider text-[#5a6378]">
          <div className="col-span-1">ID</div>
          <div className="col-span-5">Título</div>
          <div className="col-span-2">Categoria</div>
          <div className="col-span-1">Prio</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">SLA</div>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-[#8b94a3] text-sm">
            Nenhum ticket encontrado.
          </div>
        )}
        {filtered.map((t) => {
          const cat = CATEGORIES[t.category];
          const Icon = cat?.icon || Ticket;
          const sla = slaStatus(t);
          const slaColor =
            sla.state === "breach" ? "#ff3b5c" : sla.state === "risk" ? "#f5a623" : "#00d4aa";
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full grid grid-cols-12 gap-3 px-5 py-4 border-b border-[#1f2438] last:border-b-0 hover:bg-[#131829] transition-colors text-left items-center"
            >
              <div className="col-span-1 font-mono text-xs text-[#8b94a3]">{t.id}</div>
              <div className="col-span-5">
                <div className="text-sm text-white truncate">{t.title}</div>
                <div className="text-xs text-[#5a6378] mt-0.5">
                  {t.requester} · {formatRelative(t.createdAt)}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: cat?.accent }} />
                  <span className="text-xs text-[#8b94a3]">{cat?.label}</span>
                </div>
              </div>
              <div className="col-span-1">
                <Badge color={PRIORITIES[t.priority].color}>{t.priority}</Badge>
              </div>
              <div className="col-span-2">
                <Badge color={STATUSES[t.status].color}>{STATUSES[t.status].label}</Badge>
              </div>
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-[#1f2438] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${sla.pct}%`, backgroundColor: slaColor }}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </Card>
    </div>
  );
};

// ============ NEW TICKET ============

const NewTicket = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState("");
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
    const ticket = {
      id: newId(),
      title,
      description,
      category: override.category || aiResult.category,
      subcategory: override.subcategory || aiResult.subcategory,
      priority: override.priority || aiResult.priority,
      status: "new",
      team: override.team || aiResult.team,
      requester,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      aiReasoning: aiResult.reasoning,
    };
    onCreate(ticket);
    setTitle("");
    setDescription("");
    setRequester("");
    setAiResult(null);
    setOverride({});
  };

  const cat = aiResult ? CATEGORIES[override.category || aiResult.category] : null;

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8b94a3] mb-1">
          AIOps Categorization
        </div>
        <h1 className="text-3xl font-display text-white">Novo ticket</h1>
        <p className="text-sm text-[#8b94a3] mt-2">
          A IA analisa o conteúdo e propõe categoria, prioridade e time. Você pode revisar antes
          de salvar.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
            Solicitante
          </label>
          <input
            type="text"
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
            placeholder="Nome do usuário"
            className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#4a9eff]"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resumo curto do problema"
            className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#4a9eff]"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
            Descrição detalhada
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o problema, o que aconteceu, o que tentou..."
            rows={5}
            className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#4a9eff] resize-none"
          />
        </div>

        <button
          onClick={runAI}
          disabled={!title || !description || loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a9eff] to-[#a78bfa] text-white font-mono uppercase tracking-wider text-xs py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Categorizar com IA
            </>
          )}
        </button>
      </Card>

      {aiResult && (
        <Card className="p-6 border-[#4a9eff]/40 bg-gradient-to-br from-[#0f1320] to-[#131829]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#4a9eff]" />
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#4a9eff]">
              Análise da IA
            </div>
          </div>

          <div className="bg-[#0a0e1a] border border-[#1f2438] rounded p-4 mb-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378] mb-1.5">
              Raciocínio
            </div>
            <div className="text-sm text-[#c8cdd9] italic">{aiResult.reasoning}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                Categoria
              </label>
              <select
                value={override.category || aiResult.category}
                onChange={(e) => setOverride({ ...override, category: e.target.value })}
                className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff]"
              >
                {Object.entries(CATEGORIES).map(([k, c]) => (
                  <option key={k} value={k}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                Prioridade
              </label>
              <select
                value={override.priority || aiResult.priority}
                onChange={(e) => setOverride({ ...override, priority: e.target.value })}
                className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff]"
              >
                {Object.entries(PRIORITIES).map(([k, p]) => (
                  <option key={k} value={k}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                Subcategoria
              </label>
              <input
                type="text"
                value={override.subcategory || aiResult.subcategory}
                onChange={(e) => setOverride({ ...override, subcategory: e.target.value })}
                className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff]"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8b94a3]">
                Time responsável
              </label>
              <input
                type="text"
                value={override.team || aiResult.team}
                onChange={(e) => setOverride({ ...override, team: e.target.value })}
                className="w-full mt-1.5 bg-[#0a0e1a] border border-[#1f2438] text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-[#4a9eff]"
              />
            </div>
          </div>

          {cat && (
            <div className="bg-[#0a0e1a] border border-[#1f2438] rounded p-4 mb-5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: `${cat.accent}20` }}
              >
                <cat.icon size={18} style={{ color: cat.accent }} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">
                  Tempo de resolução alvo:{" "}
                  <span className="font-mono text-[#4a9eff]">
                    {(PRIORITIES[override.priority || aiResult.priority].slaResolveMin / 60).toFixed(1)}h
                  </span>
                </div>
                <div className="text-xs text-[#8b94a3] mt-0.5">
                  Resposta inicial em até{" "}
                  {PRIORITIES[override.priority || aiResult.priority].slaResponseMin}min
                </div>
              </div>
            </div>
          )}

          <button
            onClick={create}
            disabled={!requester}
            className="w-full flex items-center justify-center gap-2 bg-[#00d4aa] text-[#0a0e1a] font-mono uppercase tracking-wider text-xs py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00b894] transition-colors"
          >
            <Send size={14} />
            Criar ticket
          </button>
        </Card>
      )}
    </div>
  );
};

// ============ TICKET DETAIL MODAL ============

const TicketDetail = ({ ticket, onClose, onUpdate }) => {
  if (!ticket) return null;
  const cat = CATEGORIES[ticket.category];
  const Icon = cat?.icon || Ticket;
  const sla = slaStatus(ticket);

  const updateStatus = (status) => {
    onUpdate({ ...ticket, status, updatedAt: Date.now() });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1320] border border-[#1f2438] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1f2438] flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#8b94a3]">{ticket.id}</span>
              <Badge color={PRIORITIES[ticket.priority].color}>{ticket.priority}</Badge>
              <Badge color={STATUSES[ticket.status].color}>{STATUSES[ticket.status].label}</Badge>
            </div>
            <h2 className="text-xl text-white font-display">{ticket.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b94a3] hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378] mb-2">
              Descrição
            </div>
            <div className="text-sm text-[#c8cdd9] bg-[#0a0e1a] border border-[#1f2438] rounded p-4">
              {ticket.description}
            </div>
          </div>

          {ticket.aiReasoning && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={12} className="text-[#a78bfa]" />
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#a78bfa]">
                  Análise da IA
                </div>
              </div>
              <div className="text-sm text-[#c8cdd9] italic bg-[#0a0e1a] border border-[#a78bfa]/30 rounded p-4">
                {ticket.aiReasoning}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Detail label="Categoria" value={cat?.label} icon={Icon} accent={cat?.accent} />
            <Detail label="Subcategoria" value={ticket.subcategory} />
            <Detail label="Time" value={ticket.team} />
            <Detail label="Solicitante" value={ticket.requester} />
            <Detail label="Criado" value={formatRelative(ticket.createdAt)} />
            <Detail label="Atualizado" value={formatRelative(ticket.updatedAt)} />
          </div>

          {/* SLA */}
          <div className="bg-[#0a0e1a] border border-[#1f2438] rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378]">
                Status do SLA
              </div>
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{
                  color:
                    sla.state === "breach"
                      ? "#ff3b5c"
                      : sla.state === "risk"
                      ? "#f5a623"
                      : "#00d4aa",
                }}
              >
                {sla.state === "breach"
                  ? "Estourado"
                  : sla.state === "risk"
                  ? "Em risco"
                  : "Dentro do prazo"}
              </span>
            </div>
            <div className="h-2 bg-[#1f2438] rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: `${sla.pct}%`,
                  backgroundColor:
                    sla.state === "breach"
                      ? "#ff3b5c"
                      : sla.state === "risk"
                      ? "#f5a623"
                      : "#00d4aa",
                }}
              />
            </div>
            <div className="text-xs text-[#8b94a3] mt-2 font-mono">
              Alvo: {(PRIORITIES[ticket.priority].slaResolveMin / 60).toFixed(1)}h totais
            </div>
          </div>

          {/* Status actions */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378] mb-3">
              Mudar status
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUSES).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => updateStatus(key)}
                  disabled={ticket.status === key}
                  className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all"
                  style={{
                    backgroundColor: ticket.status === key ? `${s.color}20` : "transparent",
                    borderColor: ticket.status === key ? s.color : "#1f2438",
                    color: ticket.status === key ? s.color : "#8b94a3",
                    cursor: ticket.status === key ? "default" : "pointer",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, icon: Icon, accent }) => (
  <div>
    <div className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378] mb-1">
      {label}
    </div>
    <div className="flex items-center gap-2 text-sm text-white">
      {Icon && <Icon size={14} style={{ color: accent }} />}
      {value}
    </div>
  </div>
);

// ============ MAIN APP ============

export default function App() {
  const [view, setView] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadTickets().then((t) => {
      setTickets(t);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveTickets(tickets);
  }, [tickets, loaded]);

  const handleCreate = (ticket) => {
    setTickets([ticket, ...tickets]);
    setView("tickets");
  };

  const handleUpdate = (updated) => {
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
    setSelected(updated);
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "catalog", label: "Catálogo", icon: BookOpen },
    { key: "tickets", label: "Tickets", icon: Ticket },
    { key: "new", label: "Novo ticket", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white" style={{ fontFamily: "'Geist', system-ui" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=Geist:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        body { font-family: 'Geist', sans-serif; }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-60 bg-[#070a13] border-r border-[#1f2438] p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4a9eff] to-[#a78bfa] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-display text-white leading-none">FluxoOps</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#5a6378] mt-0.5">
                ITSM · v1.0
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
                  onClick={() => setView(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-[#4a9eff]/10 text-[#4a9eff] border border-[#4a9eff]/30"
                      : "text-[#8b94a3] hover:text-white hover:bg-[#131829] border border-transparent"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="bg-[#0f1320] border border-[#1f2438] rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-[#a78bfa]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a78bfa]">
                AIOps
              </span>
            </div>
            <div className="text-[#8b94a3] leading-relaxed">
              Categorização e priorização automáticas via Claude API.
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 overflow-y-auto">
          {!loaded ? (
            <div className="flex items-center justify-center h-64 text-[#8b94a3]">
              <Loader2 size={20} className="animate-spin mr-2" /> Carregando...
            </div>
          ) : (
            <>
              {view === "dashboard" && <Dashboard tickets={tickets} />}
              {view === "catalog" && <ServiceCatalog onRequest={handleCreate} />}
              {view === "tickets" && <TicketList tickets={tickets} onSelect={setSelected} />}
              {view === "new" && <NewTicket onCreate={handleCreate} />}
            </>
          )}
        </main>
      </div>

      {selected && (
        <TicketDetail
          ticket={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
