import { useState } from "react"
import {
  Activity,
  Cpu,
  Layers,
  Radio,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react"

interface OrbitNode {
  id: string
  name: string
  badge: string
  role: string
  ring: "inner" | "middle" | "outer"
  color: string
  textColor: string
  bgLight: string
  borderLight: string
  latency: string
  throughput: string
  description: string
}

const NODES: OrbitNode[] = [
  {
    id: "kafka",
    name: "Apache Kafka",
    badge: "Kafka",
    role: "Distributed Event Streaming & Partition Log",
    ring: "inner",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    latency: "< 2.8ms",
    throughput: "120K msg/s",
    description:
      "High-throughput partitioned publish-subscribe log handling millions of asynchronous events with zero message loss and guaranteed ordering.",
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    badge: "RabbitMQ",
    role: "AMQP Message Broker & Dead-Letter Queuing",
    ring: "inner",
    color: "bg-amber-600",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    latency: "< 1.5ms",
    throughput: "45K msg/s",
    description:
      "Precision task scheduling, dead-letter exchanges, and worker priority queues across distributed background workers.",
  },
  {
    id: "spring",
    name: "Java 21 / Spring Boot 3",
    badge: "Spring",
    role: "Reactive Non-Blocking Microservices Core",
    ring: "middle",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    latency: "< 8.4ms",
    throughput: "15K TPS",
    description:
      "Virtual Threads (Project Loom) powered high-concurrency microservices, Spring Cloud Gateway, and strict schema validation.",
  },
  {
    id: "redis",
    name: "Redis Pub/Sub",
    badge: "Redis",
    role: "Sub-Millisecond In-Memory Cache & Streams",
    ring: "middle",
    color: "bg-rose-600",
    textColor: "text-rose-700",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    latency: "< 0.8ms",
    throughput: "250K ops/s",
    description:
      "Distributed cache synchronization, real-time presence indicators, rate limiters, and ephemeral session storage.",
  },
  {
    id: "postgres",
    name: "PostgreSQL 16",
    badge: "Postgres",
    role: "ACID Relational Source of Truth",
    ring: "middle",
    color: "bg-indigo-600",
    textColor: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    latency: "< 4.2ms",
    throughput: "8.5K TPS",
    description:
      "Relational persistence with connection pooling (HikariCP), JSONB query indexing, and CDC event streaming via Debezium.",
  },
  {
    id: "k8s",
    name: "Kubernetes (K8s)",
    badge: "K8s",
    role: "Automated Container Orchestration & Scaling",
    ring: "outer",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-200",
    latency: "99.999% SLA",
    throughput: "Auto-Scale",
    description:
      "Multi-pod self-healing deployments, ingress routing, automated rolling updates, and zero-downtime canary releases.",
  },
  {
    id: "docker",
    name: "Docker OCI",
    badge: "Docker",
    role: "Containerized Microservice Packaging",
    ring: "outer",
    color: "bg-sky-500",
    textColor: "text-sky-700",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    latency: "Instant Spawn",
    throughput: "Immutable",
    description:
      "Hardened, multi-stage lightweight container images with rootless security profiles and minimal memory footprints.",
  },
]

/** Compact standalone Solar Circle Card matching the user's favorite Bento Grid card */
export function KafkaSolarOrbitCard({
  className = "",
}: {
  className?: string
}) {
  return (
    <div
      className={`card p-7 flex flex-col justify-between bg-white relative overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
            <Radio size={13} className="animate-pulse text-amber-500" /> Event Sourcing
          </span>
          <span className="rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
            Async Architecture
          </span>
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
          Kafka &amp; Event Streaming
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Decoupled microservices architecture with Kafka, RabbitMQ, and Redis
          pub/sub handling thousands of asynchronous tasks with sub-5ms commit
          latency.
        </p>
      </div>

      {/* Concentric Solar Orbiting Graphic */}
      <div className="mt-6 relative h-52 w-full flex items-center justify-center pause-hover cursor-pointer">
        {/* Outer Solar Orbit (K8s & Docker) */}
        <div className="absolute h-44 w-44 rounded-full border border-dashed border-orange-200 animate-orbit flex items-start justify-center">
          <span
            title="Kubernetes Multi-Pod Cluster"
            className="h-6 w-6 -translate-y-3 rounded-full bg-orange-500 text-white text-[9px] font-bold font-mono grid place-items-center shadow-md hover:scale-125 transition-transform"
          >
            K8s
          </span>
          <span
            title="Docker Container Image"
            className="h-5 w-5 translate-y-40 -translate-x-12 rounded-full bg-sky-500 text-white text-[8px] font-bold font-mono grid place-items-center shadow-sm"
          >
            OCI
          </span>
        </div>

        {/* Middle Solar Orbit (Kafka & Spring) */}
        <div className="absolute h-32 w-32 rounded-full border border-dashed border-blue-200 animate-orbit-reverse flex items-end justify-center">
          <span
            title="Apache Kafka Event Stream"
            className="h-6 w-6 translate-y-3 rounded-full bg-blue-600 text-white text-[9px] font-bold font-mono grid place-items-center shadow-md hover:scale-125 transition-transform"
          >
            Kafka
          </span>
          <span
            title="Redis In-Memory Cache"
            className="h-5 w-5 -translate-y-28 translate-x-10 rounded-full bg-rose-600 text-white text-[8px] font-bold font-mono grid place-items-center shadow-sm"
          >
            Redis
          </span>
        </div>

        {/* Inner Solar Orbit (Spring & RabbitMQ) */}
        <div className="absolute h-20 w-20 rounded-full border border-dotted border-amber-300 animate-orbit-slow flex items-center justify-start">
          <span
            title="RabbitMQ Worker Queue"
            className="h-5 w-5 -translate-x-2.5 rounded-full bg-amber-500 text-white text-[8px] font-bold font-mono grid place-items-center shadow-sm"
          >
            MQ
          </span>
        </div>

        {/* Central Solar Nucleus Core */}
        <div className="relative z-10 h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#111a2e] via-slate-800 to-orange-950 text-white shadow-xl shadow-orange-500/20 grid place-items-center font-black text-xs border border-orange-400/30 animate-pulse-glow">
          <div className="text-center leading-none">
            <span className="block text-[11px] font-extrabold tracking-wider text-orange-400">
              API
            </span>
            <span className="text-[7.5px] font-mono text-slate-300 uppercase">
              Bus
            </span>
          </div>
        </div>
      </div>

      {/* Stream Metrics Pill Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <Zap size={12} className="text-amber-500" /> Sub-5ms Lag
        </span>
        <span className="text-emerald-600 font-semibold">Zero Message Loss</span>
      </div>
    </div>
  )
}

/** Full-width Interactive Solar Orbit Architecture Section for the Tech Stack page */
export function KafkaSolarOrbitSection() {
  const [activeNode, setActiveNode] = useState<OrbitNode>(NODES[0])

  return (
    <section className="section-space bg-gradient-to-b from-slate-900 via-[#111a2e] to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glowing nebulas */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-orange-400 uppercase">
            <Radio size={14} className="animate-pulse" />
            Solar Orbit Architecture
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Kafka &amp; Event Streaming Core
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Our 5 senior developers engineer decentralized, reactive backends.
            Explore the live concentric solar orbits that power high-concurrency
            distributed systems without single points of failure.
          </p>
        </div>

        {/* Main Grid: Solar Circle Orbit Visualizer (Left) + Interactive Inspector (Right) */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Concentric Solar Orbit System */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] md:h-[500px] md:w-[500px] flex items-center justify-center pause-hover">
              {/* Starry Dust Grid */}
              <div className="absolute inset-0 rounded-full border border-white/5 bg-radial from-slate-800/20 via-transparent to-transparent pointer-events-none" />

              {/* 3. Outer Orbit: Kubernetes & Docker (~420px) */}
              <div className="absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full border border-dashed border-orange-500/30 animate-orbit-slow flex items-start justify-center">
                {/* Node: K8s */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(NODES.find((n) => n.id === "k8s") || NODES[0])
                  }
                  className={`-translate-y-4 rounded-full px-3 py-1 text-xs font-mono font-bold text-white shadow-lg transition-transform hover:scale-125 cursor-pointer flex items-center gap-1.5 ${
                    activeNode.id === "k8s"
                      ? "bg-orange-500 ring-4 ring-orange-400/40 scale-110"
                      : "bg-orange-600/90"
                  }`}
                >
                  <Server size={12} /> K8s
                </button>

                {/* Node: Docker */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "docker") || NODES[0]
                    )
                  }
                  className={`translate-y-[330px] sm:translate-y-[400px] -translate-x-16 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activeNode.id === "docker"
                      ? "bg-sky-500 ring-4 ring-sky-400/40 scale-110"
                      : "bg-sky-600/90"
                  }`}
                >
                  <Layers size={11} /> Docker
                </button>
              </div>

              {/* 2. Middle Orbit: Spring, Postgres, Redis (~290px) */}
              <div className="absolute h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] rounded-full border border-dashed border-blue-400/35 animate-orbit-reverse flex items-end justify-center">
                {/* Node: Kafka */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "kafka") || NODES[0]
                    )
                  }
                  className={`translate-y-4 rounded-full px-3 py-1 text-xs font-mono font-bold text-white shadow-xl transition-transform hover:scale-125 cursor-pointer flex items-center gap-1.5 ${
                    activeNode.id === "kafka"
                      ? "bg-blue-600 ring-4 ring-blue-400/40 scale-110"
                      : "bg-blue-600/90"
                  }`}
                >
                  <Radio size={12} /> Kafka
                </button>

                {/* Node: Redis */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "redis") || NODES[0]
                    )
                  }
                  className={`-translate-y-[225px] sm:-translate-y-[285px] translate-x-20 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activeNode.id === "redis"
                      ? "bg-rose-600 ring-4 ring-rose-400/40 scale-110"
                      : "bg-rose-600/90"
                  }`}
                >
                  <Zap size={11} /> Redis
                </button>

                {/* Node: Postgres */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "postgres") || NODES[0]
                    )
                  }
                  className={`-translate-y-[120px] sm:-translate-y-[150px] -translate-x-28 sm:-translate-x-36 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activeNode.id === "postgres"
                      ? "bg-indigo-600 ring-4 ring-indigo-400/40 scale-110"
                      : "bg-indigo-600/90"
                  }`}
                >
                  <Cpu size={11} /> Postgres
                </button>
              </div>

              {/* 1. Inner Orbit: RabbitMQ & Spring Boot (~170px) */}
              <div className="absolute h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] rounded-full border border-dotted border-emerald-400/40 animate-orbit flex items-center justify-start">
                {/* Node: Spring */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "spring") || NODES[0]
                    )
                  }
                  className={`-translate-x-3 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activeNode.id === "spring"
                      ? "bg-emerald-600 ring-4 ring-emerald-400/40 scale-110"
                      : "bg-emerald-600/90"
                  }`}
                >
                  <RefreshCw size={10} /> Spring 3
                </button>

                {/* Node: RabbitMQ */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNode(
                      NODES.find((n) => n.id === "rabbitmq") || NODES[0]
                    )
                  }
                  className={`translate-x-28 sm:translate-x-36 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow transition-transform hover:scale-125 cursor-pointer flex items-center gap-1 ${
                    activeNode.id === "rabbitmq"
                      ? "bg-amber-600 ring-4 ring-amber-400/40 scale-110"
                      : "bg-amber-600/90"
                  }`}
                >
                  <Activity size={10} /> MQ
                </button>
              </div>

              {/* Central Glowing Sun Nucleus (API Gateway & Core Event Engine) */}
              <div className="relative z-20 h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-tr from-[#ff5500] via-[#ff7a00] to-[#ffa834] text-white shadow-[0_0_50px_rgba(255,107,36,0.6)] flex flex-col items-center justify-center p-2 border-2 border-amber-200/50 animate-pulse-glow select-none">
                <span className="text-[12px] sm:text-sm font-black tracking-wider uppercase text-white drop-shadow">
                  ARIVOM
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono font-extrabold text-orange-950 uppercase tracking-widest bg-white/80 rounded px-1.5 py-0.2 mt-0.5">
                  CORE API
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs font-mono text-slate-400">
              * Click any planet to inspect live architectural specifications.
            </p>
          </div>

          {/* Right Column: Node Inspector & Realtime Architecture Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-mono font-bold text-orange-400 border border-orange-500/20 uppercase">
                  {activeNode.ring} Solar Orbit
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Active Stream
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-white flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${activeNode.color}`} />
                {activeNode.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-orange-300">
                {activeNode.role}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {activeNode.description}
              </p>

              {/* Metrics Pill Grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Observed Latency
                  </span>
                  <span className="mt-1 text-xl font-mono font-bold text-emerald-400">
                    {activeNode.latency}
                  </span>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Peak Throughput
                  </span>
                  <span className="mt-1 text-xl font-mono font-bold text-amber-400">
                    {activeNode.throughput}
                  </span>
                </div>
              </div>

              {/* Quick Node Selector Pills */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2.5">
                  Select System Component:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {NODES.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                        activeNode.id === node.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {node.badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Guaranteed Architectural Guarantees Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 grid grid-cols-3 gap-4 text-center">
              <div>
                <strong className="block text-lg font-black text-white font-mono">
                  &lt; 5ms
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  P99 Lag
                </span>
              </div>
              <div className="border-x border-white/10">
                <strong className="block text-lg font-black text-emerald-400 font-mono">
                  Zero
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  Data Loss
                </span>
              </div>
              <div>
                <strong className="block text-lg font-black text-amber-400 font-mono">
                  100K+
                </strong>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  TPS Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
