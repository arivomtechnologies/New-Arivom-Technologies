import { useState } from "react"
import {
  Blocks,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers,
  Radio,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react"

export interface TechItem {
  id: string
  name: string
  badge: string
  category: "backend" | "frontend" | "mobile" | "database" | "cloud" | "ai"
  categoryLabel: string
  ring: "inner" | "middle" | "outer"
  color: string
  textColor: string
  bgLight: string
  borderLight: string
  version: string
  benchmark: string
  description: string
  shippedIn: string
}

const TECH_PLANETS: TechItem[] = [
  // Inner Orbit: Backend & Core Microservices
  {
    id: "java21",
    name: "Java 21 (LTS)",
    badge: "Java 21",
    category: "backend",
    categoryLabel: "Backend Core",
    ring: "inner",
    color: "bg-red-600",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
    borderLight: "border-red-200",
    version: "Java 21 LTS",
    benchmark: "10,000+ TPS with Virtual Threads",
    description:
      "Enterprise backend runtime leveraging Project Loom lightweight Virtual Threads for massive I/O concurrency without memory bloat.",
    shippedIn: "Phoenix Print Solution & FinTech Ledger Core",
  },
  {
    id: "springboot3",
    name: "Spring Boot 3",
    badge: "Spring 3",
    category: "backend",
    categoryLabel: "Backend Core",
    ring: "inner",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    version: "Spring Boot 3.3",
    benchmark: "Sub-10ms P99 API Latency",
    description:
      "Production-grade microservices framework featuring Spring Cloud Gateway, declarative security, and zero-leak connection pooling.",
    shippedIn: "Sri Ramana Dental Clinic & Enterprise APIs",
  },
  {
    id: "microservices",
    name: "Microservices & gRPC",
    badge: "gRPC",
    category: "backend",
    categoryLabel: "Backend Core",
    ring: "inner",
    color: "bg-purple-600",
    textColor: "text-purple-700",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    version: "HTTP/2 + Protobuf",
    benchmark: "7x Faster Than REST JSON",
    description:
      "Decoupled service-to-service communication with strongly typed protocol buffers, bidirectional streaming, and circuit breakers.",
    shippedIn: "Phoenix Factory Floor & Cloud Microservices",
  },

  // Middle Orbit: Frontend, Mobile & Databases
  {
    id: "react19",
    name: "React 19",
    badge: "React 19",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    ring: "middle",
    color: "bg-cyan-500",
    textColor: "text-cyan-700",
    bgLight: "bg-cyan-50",
    borderLight: "border-cyan-200",
    version: "React 19 Stable",
    benchmark: "Zero-Lag Concurrent Rendering",
    description:
      "High-speed modern component architectures, Server Components, optimistic UI mutations, and state machines.",
    shippedIn: "La Castle Homes & BeeWell Organic Honey",
  },
  {
    id: "angular",
    name: "Angular Signals",
    badge: "Angular",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    ring: "middle",
    color: "bg-rose-600",
    textColor: "text-rose-700",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    version: "Angular 18/21",
    benchmark: "Fine-Grained Reactive DOM",
    description:
      "Signal-driven enterprise web applications with granular reactivity, standalone components, and strict dependency injection.",
    shippedIn: "Phoenix Print Production Dashboard",
  },
  {
    id: "reactnative",
    name: "React Native",
    badge: "React Native",
    category: "mobile",
    categoryLabel: "Mobile Engineering",
    ring: "middle",
    color: "bg-indigo-600",
    textColor: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    version: "New Architecture / Fabric",
    benchmark: "60fps Smooth Native Gestures",
    description:
      "Unified cross-platform mobile codebase running native iOS & Android views, offline SQLite sync, biometrics, and push notifications.",
    shippedIn: "Sri Ramana Dental Patient Mobile App",
  },
  {
    id: "postgres",
    name: "PostgreSQL 16",
    badge: "Postgres",
    category: "database",
    categoryLabel: "Databases & Storage",
    ring: "middle",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    version: "PostgreSQL 16",
    benchmark: "Strict ACID & JSONB Indexing",
    description:
      "Primary relational source of truth with foreign key constraints, connection pooling via HikariCP, and Debezium change data capture.",
    shippedIn: "All Live Production Deployments",
  },
  {
    id: "redis",
    name: "Redis Pub/Sub",
    badge: "Redis",
    category: "database",
    categoryLabel: "Databases & Storage",
    ring: "middle",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
    borderLight: "border-red-200",
    version: "Redis 7.2",
    benchmark: "Sub-Millisecond In-Memory Reads",
    description:
      "Distributed cache layer, rate-limiting counters, pub/sub notification brokers, and high-velocity session storage.",
    shippedIn: "Phoenix Factory Dashboard & Auth Caching",
  },

  // Outer Orbit: Cloud, DevOps, Streaming & AI
  {
    id: "k8s",
    name: "Kubernetes (K8s)",
    badge: "K8s",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    ring: "outer",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    version: "v1.30+ Cloud Clusters",
    benchmark: "99.999% SLA Multi-Pod Auto-Scaling",
    description:
      "Self-healing container orchestration, horizontal pod autoscaling, zero-downtime rolling deployments, and ingress routing.",
    shippedIn: "Enterprise Multi-Region Cloud Clusters",
  },
  {
    id: "docker",
    name: "Docker OCI",
    badge: "Docker",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    ring: "outer",
    color: "bg-sky-500",
    textColor: "text-sky-700",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    version: "Rootless OCI Containers",
    benchmark: "Immutable Multi-Stage Builds (< 80MB)",
    description:
      "Hardened, minimal container images built with multi-stage Dockerfiles for reproducible deployments across local and cloud environments.",
    shippedIn: "100% of Arivom Shipped Codebases",
  },
  {
    id: "cloudinfra",
    name: "AWS & GCP Cloud",
    badge: "AWS / GCP",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    ring: "outer",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    version: "Managed VPC & Cloud Clusters",
    benchmark: "Multi-Zone Fault Tolerance",
    description:
      "Terraform-managed cloud topologies, RDS replication, S3 secure buckets, and VPC peering for bulletproof data protection.",
    shippedIn: "Production Cloud Hosting",
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    badge: "Kafka",
    category: "backend",
    categoryLabel: "Event Streaming",
    ring: "outer",
    color: "bg-slate-800",
    textColor: "text-slate-800",
    bgLight: "bg-slate-100",
    borderLight: "border-slate-300",
    version: "Kafka 3.7",
    benchmark: "120K+ Events/sec with Zero Loss",
    description:
      "Decoupled event-driven streaming architecture with partitioned commit logs, consumer groups, and asynchronous task execution.",
    shippedIn: "Industrial Event Pipelines & Streaming Switch",
  },
  {
    id: "geminiai",
    name: "Gemini AI & RAG",
    badge: "Gemini AI",
    category: "ai",
    categoryLabel: "AI & Automations",
    ring: "outer",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    version: "Gemini 2.0 API & LangChain",
    benchmark: "Sub-Second Intelligent Inference",
    description:
      "Custom vector knowledge retrieval (RAG), conversational copilot drawers, automated data extraction, and intelligent customer routing.",
    shippedIn: "Arivom AI Assistant & Intelligent SaaS",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    badge: "Tailwind",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    ring: "outer",
    color: "bg-teal-500",
    textColor: "text-teal-700",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    version: "Tailwind v4 Oxide Engine",
    benchmark: "Zero Runtime CSS Overhead",
    description:
      "Modern CSS design system with CSS variables, fluid typography, dark mode tokens, and custom hardware-accelerated animations.",
    shippedIn: "All Web & Mobile Frontends",
  },
]

type FilterCategory = "all" | "backend" | "frontend" | "mobile" | "database" | "cloud" | "ai"

export function TechStackSolarOrbit() {
  const [activePlanet, setActivePlanet] = useState<TechItem>(TECH_PLANETS[0])
  const [filter, setFilter] = useState<FilterCategory>("all")

  const filteredPlanets =
    filter === "all"
      ? TECH_PLANETS
      : TECH_PLANETS.filter((p) => p.category === filter)

  return (
    <section className="section-space bg-gradient-to-b from-[#0B1437] via-[#111a2e] to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glowing nebulas */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center anim-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-orange-400 uppercase">
            <Radio size={14} className="animate-pulse" />
            Solar Circle Architecture
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Our Complete Tech Stack in Orbit
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Every layer in our engineering stack revolves around high
            throughput, type safety, and zero-downtime reliability. Click any
            planet in the solar orbits to inspect its production benchmarks.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: "all", label: "Full Solar System" },
              { id: "backend", label: "Backend Core" },
              { id: "frontend", label: "Frontend" },
              { id: "mobile", label: "Mobile" },
              { id: "database", label: "Databases" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "ai", label: "AI & Automations" },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setFilter(tab.id as FilterCategory)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-mono font-bold transition cursor-pointer border ${
                  filter === tab.id
                    ? "bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/20"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Solar Circle Orbit System (Left) + Interactive Inspector (Right) */}
        <div className="mt-10 sm:mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Concentric Solar Orbit System */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full overflow-hidden py-4 sm:py-0 anim-left">
            <div className="relative h-[340px] w-[340px] sm:h-[480px] sm:w-[480px] md:h-[520px] md:w-[520px] scale-[0.82] xs:scale-[0.9] sm:scale-100 origin-center flex items-center justify-center pause-hover">
              {/* Starry Ambient Grid Circle */}
              <div className="absolute inset-0 rounded-full border border-white/5 bg-radial from-slate-800/20 via-transparent to-transparent pointer-events-none" />

              {/* 3. Outer Solar Orbit: K8s, Docker, Cloud, Kafka, Gemini AI (~440px) */}
              <div className="absolute h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full border border-dashed border-orange-500/25 animate-orbit-slow flex items-start justify-center">
                {/* Node: K8s */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "k8s") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`-translate-y-4 rounded-full px-3 py-1 text-xs font-mono font-bold text-white shadow-lg transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "k8s"
                      ? "bg-orange-500 ring-4 ring-orange-400/40 scale-110"
                      : "bg-orange-600/90"
                  }`}
                >
                  <Server size={11} /> K8s
                </button>

                {/* Node: Docker */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "docker") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`translate-y-[330px] sm:translate-y-[420px] -translate-x-20 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "docker"
                      ? "bg-sky-500 ring-4 ring-sky-400/40 scale-110"
                      : "bg-sky-600/90"
                  }`}
                >
                  <Layers size={10} /> Docker
                </button>

                {/* Node: Gemini AI */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "geminiai") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`translate-y-[160px] sm:translate-y-[210px] translate-x-[165px] sm:translate-x-[215px] rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "geminiai"
                      ? "bg-purple-500 ring-4 ring-purple-400/40 scale-110"
                      : "bg-purple-600/90"
                  }`}
                >
                  <Sparkles size={10} /> Gemini AI
                </button>

                {/* Node: AWS / Cloud */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "cloudinfra") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`translate-y-[160px] sm:translate-y-[210px] -translate-x-[165px] sm:-translate-x-[215px] rounded-full px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "cloudinfra"
                      ? "bg-amber-500 ring-4 ring-amber-400/40 scale-110"
                      : "bg-amber-600/90"
                  }`}
                >
                  <Globe2 size={10} /> AWS/GCP
                </button>
              </div>

              {/* 2. Middle Solar Orbit: React 19, Angular, React Native, Postgres, Redis (~310px) */}
              <div className="absolute h-[250px] w-[250px] sm:h-[310px] sm:w-[310px] rounded-full border border-dashed border-blue-400/35 animate-orbit-reverse flex items-end justify-center">
                {/* Node: React 19 */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "react19") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`translate-y-4 rounded-full px-3 py-1 text-xs font-mono font-bold text-white shadow-xl transition-transform hover:scale-125 cursor-pointer flex items-center gap-1.5 ${
                    activePlanet.id === "react19"
                      ? "bg-cyan-500 ring-4 ring-cyan-400/40 scale-110"
                      : "bg-cyan-600/90"
                  }`}
                >
                  <Code2 size={12} /> React 19
                </button>

                {/* Node: React Native */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "reactnative") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`-translate-y-[235px] sm:-translate-y-[295px] translate-x-24 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "reactnative"
                      ? "bg-indigo-600 ring-4 ring-indigo-400/40 scale-110"
                      : "bg-indigo-600/90"
                  }`}
                >
                  <Smartphone size={11} /> React Native
                </button>

                {/* Node: Postgres */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "postgres") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`-translate-y-[120px] sm:-translate-y-[150px] -translate-x-32 sm:-translate-x-38 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "postgres"
                      ? "bg-blue-600 ring-4 ring-blue-400/40 scale-110"
                      : "bg-blue-600/90"
                  }`}
                >
                  <Database size={11} /> Postgres 16
                </button>

                {/* Node: Redis */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "redis") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`-translate-y-[120px] sm:-translate-y-[150px] translate-x-32 sm:translate-x-38 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "redis"
                      ? "bg-red-500 ring-4 ring-red-400/40 scale-110"
                      : "bg-red-600/90"
                  }`}
                >
                  <Zap size={10} /> Redis
                </button>
              </div>

              {/* 1. Inner Solar Orbit: Java 21, Spring Boot 3 (~190px) */}
              <div className="absolute h-[160px] w-[160px] sm:h-[190px] sm:w-[190px] rounded-full border border-dotted border-emerald-400/45 animate-orbit flex items-center justify-start">
                {/* Node: Java 21 */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "java21") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`-translate-x-3 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "java21"
                      ? "bg-red-600 ring-4 ring-red-400/40 scale-110"
                      : "bg-red-600/90"
                  }`}
                >
                  <Cpu size={10} /> Java 21
                </button>

                {/* Node: Spring Boot 3 */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePlanet(
                      TECH_PLANETS.find((p) => p.id === "springboot3") ||
                        TECH_PLANETS[0],
                    )
                  }
                  className={`translate-x-28 sm:translate-x-36 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activePlanet.id === "springboot3"
                      ? "bg-emerald-600 ring-4 ring-emerald-400/40 scale-110"
                      : "bg-emerald-600/90"
                  }`}
                >
                  <Blocks size={10} /> Spring 3
                </button>
              </div>

              {/* Central Glowing Sun Nucleus (Arivom Core Engine) */}
              <div className="relative z-20 h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-tr from-[#ff5500] via-[#ff7a00] to-[#ffa834] text-white shadow-[0_0_50px_rgba(255,107,36,0.65)] flex flex-col items-center justify-center p-2 border-2 border-amber-200/60 animate-pulse-glow select-none">
                <span className="text-[12px] sm:text-sm font-black tracking-wider uppercase text-white drop-shadow">
                  ARIVOM
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-mono font-extrabold text-orange-950 uppercase tracking-widest bg-white/90 rounded px-1.5 py-0.2 mt-0.5">
                  CORE TECH
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs font-mono text-slate-400">
              * Click any planetary technology to inspect architecture
              benchmarks.
            </p>
          </div>

          {/* Right Column: Active Technology Inspector HUD */}
          <div className="lg:col-span-5 space-y-6 anim-right">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-mono font-bold text-orange-400 border border-orange-500/20 uppercase">
                  {activePlanet.categoryLabel} &bull; {activePlanet.ring} Orbit
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Active Layer
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-white flex items-center gap-2.5">
                <span
                  className={`h-3.5 w-3.5 rounded-full ${activePlanet.color}`}
                />
                {activePlanet.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-orange-300">
                {activePlanet.version}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {activePlanet.description}
              </p>

              {/* Benchmarks & Shipped Proof */}
              <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Engineering Benchmark
                  </span>
                  <span className="mt-1 text-base font-mono font-bold text-emerald-400 block">
                    {activePlanet.benchmark}
                  </span>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Deployed Production Deliverables
                  </span>
                  <span className="mt-1 text-xs font-mono text-amber-300 block">
                    {activePlanet.shippedIn}
                  </span>
                </div>
              </div>

              {/* Planet Quick Switcher */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2.5">
                  Quick Select Planet:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {filteredPlanets.map((planet) => (
                    <button
                      key={planet.id}
                      type="button"
                      onClick={() => setActivePlanet(planet)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                        activePlanet.id === planet.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {planet.badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Engineering Standards Guarantees */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 grid grid-cols-3 gap-4 text-center">
              <div>
                <strong className="block text-lg font-black text-white font-mono">
                  Java 21
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  Enterprise Core
                </span>
              </div>
              <div className="border-x border-white/10">
                <strong className="block text-lg font-black text-emerald-400 font-mono">
                  React 19
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  Fluid Frontend
                </span>
              </div>
              <div>
                <strong className="block text-lg font-black text-amber-400 font-mono">
                  K8s &amp; Docker
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  Cloud Clusters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
