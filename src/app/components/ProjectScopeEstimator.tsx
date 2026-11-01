import { useState, useMemo } from "react"
import { Link } from "react-router"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  Globe2,
  Layers,
  Radio,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stethoscope,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react"

type ProjectScale = "mvp" | "fullstack" | "crossplatform" | "enterprise"
type TargetPlatform = "web" | "mobile" | "unified"
type BackendType = "spring-monolith" | "spring-microservices" | "kafka-streaming"
type DatabaseType = "postgres" | "mongo" | "polyglot"

interface ArchetypePreset {
  id: string
  name: string
  clientExample: string
  industry: string
  icon: any
  scale: ProjectScale
  platform: TargetPlatform
  backend: BackendType
  database: DatabaseType
  features: string[]
  color: string
  borderColor: string
  badgeBg: string
  badgeText: string
  description: string
}

const ARCHETYPES: ArchetypePreset[] = [
  {
    id: "realestate",
    name: "Architects & Builders Portal",
    clientExample: "KB Homes & La Castle Homes (Live Clients)",
    industry: "Luxury Architecture & Real Estate",
    icon: Building2,
    scale: "fullstack",
    platform: "web",
    backend: "spring-monolith",
    database: "postgres",
    features: [
      "Virtual 3D Elevation",
      "Floorplans",
      "WhatsApp Lead Dispatch",
      "Cloudflare CDN",
    ],
    color: "from-amber-500/15 to-orange-500/10",
    borderColor: "hover:border-amber-400",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    description:
      "Ultra-fast interactive property catalog with high-res media CDN, dynamic floorplans, structural elevation models, and automated client lead dispatch.",
  },
  {
    id: "sportstech",
    name: "Tournament & Sports Academy App",
    clientExample: "First Goal FC (Live Client)",
    industry: "SportsTech & Athletics",
    icon: Trophy,
    scale: "crossplatform",
    platform: "mobile",
    backend: "spring-microservices",
    database: "polyglot",
    features: [
      "Live Match Scoring",
      "Push Notifications",
      "Tournament Brackets",
      "Player Rosters",
    ],
    color: "from-emerald-500/15 to-green-500/10",
    borderColor: "hover:border-emerald-400",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    description:
      "Cross-platform iOS and Android mobile app with live WebSocket match scores, tournament bracket scheduling, player attendance, and instant goal notifications.",
  },
  {
    id: "industrial",
    name: "Print Order & Factory ERP",
    clientExample: "Phoenix Print Solution (Live Client)",
    industry: "Industrial Manufacturing",
    icon: Factory,
    scale: "enterprise",
    platform: "unified",
    backend: "spring-microservices",
    database: "polyglot",
    features: [
      "Barcode Scanning",
      "Job Tracking",
      "Kafka Events",
      "Invoice Engine",
    ],
    color: "from-blue-500/15 to-indigo-500/10",
    borderColor: "hover:border-blue-400",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    description:
      "Full factory floor automation tracking thousands of concurrent custom print runs with live operator dashboards and hardware integration.",
  },
  {
    id: "healthcare",
    name: "Dental Clinic & Patient EHR",
    clientExample: "Sri Ramana Dental Clinic (Live Client)",
    industry: "HealthTech & Medical",
    icon: Stethoscope,
    scale: "crossplatform",
    platform: "unified",
    backend: "spring-monolith",
    database: "postgres",
    features: [
      "HIPAA Encryption",
      "Patient Portal",
      "SMS/WhatsApp Reminders",
      "X-Ray Vault",
    ],
    color: "from-emerald-500/15 to-teal-500/10",
    borderColor: "hover:border-emerald-400",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    description:
      "Encrypted patient records, chair-side appointment scheduling, digital medical history, and automated WhatsApp appointment reminders.",
  },
  {
    id: "ecommerce",
    name: "Direct-to-Consumer D2C Store",
    clientExample: "BeeWell Organic Honey (Live Client)",
    industry: "E-Commerce & Retail",
    icon: ShoppingBag,
    scale: "fullstack",
    platform: "unified",
    backend: "spring-monolith",
    database: "postgres",
    features: [
      "Razorpay Gateway",
      "Batch Traceability",
      "Abandoned Cart Recovery",
      "WhatsApp Alerts",
    ],
    color: "from-yellow-500/15 to-amber-500/10",
    borderColor: "hover:border-yellow-400",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
    description:
      "Zero-lag shopping experience with instant payment gateway, farm-to-jar QR traceability, and real-time courier tracking.",
  },
  {
    id: "fintech",
    name: "Event-Driven FinTech Switch",
    clientExample: "High-Throughput Payment Core",
    industry: "FinTech & Banking",
    icon: Zap,
    scale: "enterprise",
    platform: "web",
    backend: "kafka-streaming",
    database: "polyglot",
    features: [
      "Sub-5ms Latency",
      "Kafka Event Sourcing",
      "Double-Entry Ledger",
      "Docker Clusters",
    ],
    color: "from-purple-500/15 to-violet-500/10",
    borderColor: "hover:border-purple-400",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    description:
      "Decoupled microservices architecture handling millions of real-time transactions with zero data loss and automated audit reconciliations.",
  },
  {
    id: "aisaas",
    name: "AI SaaS with Vector RAG",
    clientExample: "Intelligent Workflow Engine",
    industry: "AI & Automations",
    icon: Sparkles,
    scale: "fullstack",
    platform: "web",
    backend: "spring-microservices",
    database: "polyglot",
    features: [
      "Gemini 2.0 API",
      "Vector Embeddings",
      "Multi-Tenant Workspaces",
      "Stripe Billing",
    ],
    color: "from-rose-500/15 to-pink-500/10",
    borderColor: "hover:border-rose-400",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    description:
      "Multi-tenant software-as-a-service with intelligent conversational AI agents, custom knowledge retrieval (RAG), and subscription tiers.",
  },
]

export function ProjectScopeEstimator() {
  const [scale, setScale] = useState<ProjectScale>("fullstack")
  const [platform, setPlatform] = useState<TargetPlatform>("unified")
  const [backend, setBackend] = useState<BackendType>("spring-monolith")
  const [database, setDatabase] = useState<DatabaseType>("postgres")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "auth",
    "payments",
    "cicd",
  ])

  // Apply a preset archetype
  const applyPreset = (preset: ArchetypePreset) => {
    setScale(preset.scale)
    setPlatform(preset.platform)
    setBackend(preset.backend)
    setDatabase(preset.database)
  }

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  // Real-time calculation based on selected inputs
  const calculation = useMemo(() => {
    let sprintBase = 2
    let devProfile = "Senior Full-Stack Engineering Squad"

    // Scale impact
    if (scale === "mvp") {
      sprintBase = 2
      devProfile = "Senior Full-Stack & Cloud Architecture Squad"
    } else if (scale === "fullstack") {
      sprintBase = 3
      devProfile = "Senior Full-Stack Engineering Squad"
    } else if (scale === "crossplatform") {
      sprintBase = 4
      devProfile = "Cross-Platform Senior Squad (Web, Mobile & Backend)"
    } else if (scale === "enterprise") {
      sprintBase = 6
      devProfile =
        "Enterprise Senior Engineering Squad (Backend, Data & DevOps)"
    }

    // Platform impact
    if (platform === "unified") {
      sprintBase += 1
    }

    // Backend impact
    if (backend === "spring-microservices") {
      sprintBase += 1
    } else if (backend === "kafka-streaming") {
      sprintBase += 2
    }

    // Database impact
    if (database === "polyglot") {
      sprintBase += 0.5
    }

    // Addons impact
    if (selectedAddons.length > 3) {
      sprintBase += 0.5
    }

    const totalWeeks = Math.round(sprintBase * 2)

    // Dynamic phase milestones
    const phases = [
      {
        phase: "Phase 1: Architecture Blueprint & Schema",
        sprint: "Sprint 1",
        description: `Domain entities, ${
          database === "postgres"
            ? "PostgreSQL relational schemas"
            : database === "mongo"
              ? "MongoDB collections"
              : "PostgreSQL ACID & Redis caching"
        }, and Git CI/CD repository initialization.`,
      },
      {
        phase: "Phase 2: Core Backend Engine & APIs",
        sprint: "Sprint 2 – 3",
        description: `Java 21 / Spring Boot 3 services with ${
          backend === "kafka-streaming"
            ? "Kafka event streaming topics & consumer groups"
            : backend === "spring-microservices"
              ? "Spring Cloud Gateway & service discovery"
              : "RESTful endpoints & Spring Security JWT"
        }.`,
      },
      {
        phase: "Phase 3: Client Frontends & Integrations",
        sprint: `Sprint 3 – ${Math.max(3, Math.round(sprintBase - 1))}`,
        description: `Client delivery for ${
          platform === "web"
            ? "React 19 / Angular high-speed web application"
            : platform === "mobile"
              ? "React Native native iOS & Android applications"
              : "Unified React 19 web portal + React Native mobile apps"
        }.`,
      },
      {
        phase: "Phase 4: Security Audit, Testing & Launch",
        sprint: `Sprint ${Math.round(sprintBase)}`,
        description:
          "Integration test suites, Docker containers, SSL provisioning, and production deployment with 60-day warranty.",
      },
    ]

    return {
      sprints: Math.round(sprintBase),
      weeks: totalWeeks,
      devProfile,
      phases,
    }
  }, [scale, platform, backend, database, selectedAddons])

  // Construct a pre-formatted WhatsApp message
  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hi Arivom Technologies, I used your Project Scope & Sprint Estimator:
- Scale: ${scale.toUpperCase()}
- Platform: ${platform}
- Backend: ${backend}
- Database: ${database}
- Estimated Scope: ${calculation.sprints} Sprints (${calculation.weeks} Weeks)
- Team Allocation: ${calculation.devProfile}

I'd like to schedule a 30-minute discovery call with your lead engineers to review our roadmap.`,
    )
    return `https://wa.me/916369012607?text=${text}`
  }, [scale, platform, backend, database, calculation])

  return (
    <div className="bg-slate-50/50">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-orange-400/10 blur-[120px]" />
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-orange-600 uppercase shadow-xs">
            <Sparkles size={14} className="text-orange-500" />
            Interactive Scope &amp; Sprint Blueprint
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#111a2e] sm:text-5xl lg:text-6xl">
            Project Scope &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Sprint Estimator
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg max-w-3xl mx-auto">
            Calculate realistic team capacity, sprint milestones, and
            architectural blueprints tailored to your application. Partner
            directly with our senior engineering team with transparent sprint
            commitments.
          </p>
        </div>
      </section>

      {/* 2. Archetype Presets from Real Arivom Client Deliverables */}
      <section className="section-space border-b border-slate-200/70 bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 anim-up">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                Proven Reference Blueprints
              </span>
              <h2 className="mt-2 text-2xl font-black text-[#111a2e] sm:text-3xl">
                Start from a Real-World Application
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Click any archetype below to instantly pre-fill its production
                architecture, or customize every parameter manually.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              6 Live Production References
            </div>
          </div>

          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 anim-stagger-group"
            data-stagger-direction="scale"
          >
            {ARCHETYPES.map((preset) => {
              const Icon = preset.icon
              return (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`card p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border ${preset.borderColor} group relative overflow-hidden anim-scale`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-2xl ${preset.badgeBg} ${preset.badgeText} transition-transform group-hover:scale-110`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">
                      {preset.industry}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111a2e] group-hover:text-orange-600 transition-colors">
                    {preset.name}
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold block mt-0.5">
                    {preset.clientExample}
                  </span>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {preset.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {preset.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-600 rounded px-2 py-0.5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-orange-600">
                    <span>Load Architecture Blueprint</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Custom Scope Configurator + Live Dynamic Blueprint Output */}
      <section className="section-space">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
              Custom Architecture Configurator
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#111a2e] sm:text-4xl">
              Configure Your Exact Application Scope
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Select your project parameters to dynamically generate team
              capacity, agile sprint roadmaps, and delivery milestones.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left 7 Columns: Step-by-Step Customization Controls */}
            <div className="lg:col-span-7 space-y-6 anim-left">
              {/* Step 1: Scale */}
              <div className="card p-6 sm:p-7">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3 flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    1
                  </span>
                  Project Scale &amp; Scope
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      id: "mvp",
                      name: "Fast-Track MVP",
                      desc: "1 – 2 Sprints",
                    },
                    {
                      id: "fullstack",
                      name: "Web Platform",
                      desc: "2 – 4 Sprints",
                    },
                    {
                      id: "crossplatform",
                      name: "Web & Mobile",
                      desc: "4 – 6 Sprints",
                    },
                    {
                      id: "enterprise",
                      name: "Enterprise Core",
                      desc: "6 – 8 Sprints",
                    },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setScale(item.id as ProjectScale)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        scale === item.id
                          ? "border-orange-500 bg-orange-50/70 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                      }`}
                    >
                      <strong className="block text-xs font-bold text-[#111a2e]">
                        {item.name}
                      </strong>
                      <span className="text-[10px] font-mono text-orange-600 font-semibold block mt-1">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Target Platform */}
              <div className="card p-6 sm:p-7">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3 flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    2
                  </span>
                  Target Platforms
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "web",
                      name: "Web Portal",
                      sub: "React 19 / Angular Signals",
                      icon: Globe2,
                    },
                    {
                      id: "mobile",
                      name: "Mobile Apps",
                      sub: "React Native iOS & Android",
                      icon: Smartphone,
                    },
                    {
                      id: "unified",
                      name: "Unified Multi-Platform",
                      sub: "Web + iOS + Android (Shared API)",
                      icon: Layers,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setPlatform(item.id as TargetPlatform)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                          platform === item.id
                            ? "border-orange-500 bg-orange-50/70 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-100 text-orange-700 shrink-0 mt-0.5">
                          <Icon size={16} />
                        </span>
                        <div>
                          <strong className="block text-xs font-bold text-[#111a2e]">
                            {item.name}
                          </strong>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {item.sub}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Backend & Messaging Engine */}
              <div className="card p-6 sm:p-7">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3 flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    3
                  </span>
                  Backend &amp; Event Layer
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "spring-monolith",
                      name: "Spring Boot 3 Core",
                      sub: "High-throughput modular engine",
                      icon: Server,
                    },
                    {
                      id: "spring-microservices",
                      name: "Spring Cloud Microservices",
                      sub: "Gateway, discovery & isolation",
                      icon: Cpu,
                    },
                    {
                      id: "kafka-streaming",
                      name: "Kafka Event Streaming",
                      sub: "Solar orbit async pub/sub",
                      icon: Radio,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setBackend(item.id as BackendType)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                          backend === item.id
                            ? "border-orange-500 bg-orange-50/70 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-100 text-orange-700 shrink-0 mt-0.5">
                          <Icon size={16} />
                        </span>
                        <div>
                          <strong className="block text-xs font-bold text-[#111a2e]">
                            {item.name}
                          </strong>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {item.sub}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 4: Database Layer */}
              <div className="card p-6 sm:p-7">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3 flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    4
                  </span>
                  Database &amp; Storage Architecture
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "postgres",
                      name: "PostgreSQL 16",
                      sub: "ACID transactions & JSONB",
                      icon: Database,
                    },
                    {
                      id: "mongo",
                      name: "MongoDB",
                      sub: "Document NoSQL flexibility",
                      icon: Database,
                    },
                    {
                      id: "polyglot",
                      name: "Polyglot Architecture",
                      sub: "PostgreSQL + Redis Cache + CDC",
                      icon: Layers,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setDatabase(item.id as DatabaseType)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                          database === item.id
                            ? "border-orange-500 bg-orange-50/70 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-100 text-orange-700 shrink-0 mt-0.5">
                          <Icon size={16} />
                        </span>
                        <div>
                          <strong className="block text-xs font-bold text-[#111a2e]">
                            {item.name}
                          </strong>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {item.sub}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 5: Advanced Addon Capabilities */}
              <div className="card p-6 sm:p-7">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3 flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    5
                  </span>
                  Specialized Feature Modules
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: "payments",
                      name: "Payment Switch (Stripe/Razorpay)",
                    },
                    { id: "ai", name: "AI Copilot / RAG (Gemini API)" },
                    { id: "websockets", name: "Real-Time WebSockets" },
                    { id: "auth", name: "Role-Based Auth & 2FA" },
                    { id: "cicd", name: "Docker & GitHub Actions CI/CD" },
                    { id: "telemetry", name: "Prometheus Telemetry" },
                  ].map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id)
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl text-left text-xs transition border cursor-pointer flex items-center gap-2 ${
                          isChecked
                            ? "border-emerald-500 bg-emerald-50/60 font-semibold text-emerald-950"
                            : "border-slate-200 text-slate-600 bg-slate-50/40 hover:border-slate-300"
                        }`}
                      >
                        <CheckCircle2
                          size={15}
                          className={
                            isChecked
                              ? "text-emerald-600 shrink-0"
                              : "text-slate-300 shrink-0"
                          }
                        />
                        <span>{addon.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Dynamic Blueprint & Roadmap Output */}
            <div className="lg:col-span-5 sticky top-24 space-y-6 anim-right">
              <div className="rounded-3xl border-2 border-orange-500 bg-gradient-to-b from-[#111a2e] to-slate-900 p-7 text-white shadow-2xl relative overflow-hidden">
                <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-orange-500/20 blur-[50px]" />

                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal size={14} /> Blueprint Estimate
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 border border-emerald-500/30">
                    Live Calculation
                  </span>
                </div>

                {/* Primary Metrics Highlight */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.05] p-4 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Agile Timeline
                    </span>
                    <strong className="mt-1 text-2xl font-black font-mono text-white block">
                      {calculation.sprints} Sprints
                    </strong>
                    <span className="text-[11px] font-mono text-orange-400 block">
                      ~{calculation.weeks} Weeks Total
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white/[0.05] p-4 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Dedicated Team
                    </span>
                    <strong className="mt-1 text-2xl font-black font-mono text-white block">
                      Senior Squad
                    </strong>
                    <span className="text-[11px] font-mono text-emerald-400 block">
                      Zero Junior Handoffs
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-300">
                  <span className="text-white font-bold">Allocation:</span>{" "}
                  {calculation.devProfile}
                </div>

                {/* Phased Sprint Breakdown */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    Phased Sprint Deliverables:
                  </span>
                  {calculation.phases.map((phase) => (
                    <div
                      key={phase.phase}
                      className="rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 text-xs transition hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center justify-between text-slate-200 font-bold mb-1">
                        <span>{phase.phase}</span>
                        <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                          {phase.sprint}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Instant Action CTA Buttons */}
                <div className="mt-7 space-y-3 pt-5 border-t border-white/10">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary w-full justify-center !py-3.5 text-sm font-bold shadow-lg shadow-orange-500/30"
                  >
                    💬 Discuss Blueprint on WhatsApp &rarr;
                  </a>

                  <Link
                    to="/contact"
                    className="button button-secondary w-full justify-center !py-3 text-xs font-semibold !text-slate-200 !border-white/20 hover:!bg-white/10"
                  >
                    Book 30-Min Technical Discovery Call
                  </Link>
                </div>

                <p className="mt-4 text-[11px] text-center text-slate-400 font-mono">
                  * 100% IP ownership, private GitHub repo commits &amp; 60-day
                  launch warranty.
                </p>
              </div>

              {/* Collective Advantage Callout */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Why Senior Collectives Win:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Traditional agencies charge 3x markups to pay account
                  executives and junior trainees. With Arivom, every dollar goes
                  directly to the senior engineers writing your code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Technical Scoping FAQ */}
      <section className="section-space bg-white border-t border-slate-200/70">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="text-center mb-12 anim-up">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
              Scoping Questions
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#111a2e]">
              How Sprint Estimations Work
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers on how we plan, commit, and guarantee delivery.
            </p>
          </div>

          <div className="space-y-4 anim-stagger-group">
            {[
              {
                q: "How accurate is this sprint estimator?",
                a: "Our estimator is calibrated against the exact sprint velocities of live deliverables like La Castle Homes, Phoenix Print, and Sri Ramana Dental. Following a 30-minute discovery call where we review wireframes or user stories, we provide a formal milestone agreement with fixed commitments.",
              },
              {
                q: "What happens if our product requirements change mid-sprint?",
                a: "Because we run 2-week agile sprints, scope adjustments are natural. At the end of every sprint demo, we re-prioritize the backlog together before locking in the next sprint goals. You never get locked into obsolete specifications.",
              },
              {
                q: "Who owns the code, intellectual property, and cloud infra?",
                a: "You do—100%. From Sprint 1, all commits are pushed directly to your organization's private GitHub repository, and all cloud services (AWS, GCP, PostgreSQL) run inside your own accounts. There are zero proprietary lock-ins.",
              },
              {
                q: "How are sprint payments and milestones structured?",
                a: "Engagements are funded on a sprint-by-sprint basis. You review working software deployed to staging at the conclusion of each sprint before the next sprint is authorized. This guarantees total alignment and zero risk.",
              },
            ].map((faq, index) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 p-5 bg-slate-50/40"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#111a2e] flex items-center gap-2">
                  <span className="text-xs font-mono text-orange-600 font-bold">
                    0{index + 1}.
                  </span>
                  {faq.q}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-center text-white shadow-xl">
            <h3 className="text-2xl font-black">
              Ready to review your project scope with a lead engineer?
            </h3>
            <p className="mt-2 text-sm text-orange-50 max-w-xl mx-auto">
              Book a direct 30-minute session. We’ll review your architecture,
              recommend the most efficient stack, and plan your sprint delivery.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="button button-light">
                Schedule Technical Discovery &rarr;
              </Link>
              <a
                href="https://wa.me/916369012607?text=Hi%20Arivom%20Technologies,%20I'd%20like%20to%20discuss%20a%20project%20scope%20and%20sprint%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="button !bg-emerald-600 hover:!bg-emerald-700 !text-white !border-transparent"
              >
                💬 WhatsApp Lead (+91 63690 12607)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
