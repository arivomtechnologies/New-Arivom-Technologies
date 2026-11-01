import { useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers3,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react"
import { Link } from "react-router"

type PersonaKey = "startups" | "saas" | "enterprise"

export function PersonaAdvantagesSection() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("startups")

  const personas = {
    startups: {
      label: "Funded Startups",
      headline: "Move from zero to production without hiring delays.",
      subtext:
        "Skip months of recruiting, onboarding, and agency bloat. Embed a battle-tested squad of senior engineers to ship your investor-ready MVP in 3 to 6 weeks.",
      badgeStat: "4–6 Weeks",
      badgeDesc: "Average time from Discovery to Live Production Launch",
      advantages: [
        {
          num: "01",
          title: "Direct Senior Velocity",
          text: "No junior developers learning on your budget. All code is written and reviewed by engineers with 6+ years of production experience.",
        },
        {
          num: "02",
          title: "Clean Architecture from Day 1",
          text: "We set up scalable PostgreSQL schemas, typed API contracts, and modular monoliths that withstand growth without total rewrites.",
        },
        {
          num: "03",
          title: "Private GitHub Ownership",
          text: "You own every commit, Docker file, and documentation from day one. Zero vendor lock-in or proprietary traps.",
        },
      ],
      terminalCode: [
        "$ git clone git@github.com:client-repo/arivom-mvp.git",
        "✔ Initializing Spring Boot 3 enterprise core...",
        "✔ Angular Signals / React Native UI synced.",
        "✔ PostgreSQL migrations executed (v1.0.0).",
        "🚀 Production build deployed to AWS EKS.",
      ],
    },
    saas: {
      label: "High-Scale SaaS",
      headline: "High-throughput microservices built for multi-tenant scale.",
      subtext:
        "When your existing application struggles with concurrency or tech debt, our senior squad refactors critical paths into resilient, sub-50ms services.",
      badgeStat: "10,000+ TPS",
      badgeDesc: "Tested concurrent throughput on Java 21 & Spring Cloud",
      advantages: [
        {
          num: "01",
          title: "Sub-50ms API Latency",
          text: "Leveraging Java 21 virtual threads (Project Loom) and connection pooling to serve high concurrent traffic with minimal RAM overhead.",
        },
        {
          num: "02",
          title: "Event-Driven Asynchronous Queues",
          text: "Decoupling compute-heavy billing, analytics, and notification pipelines using Kafka and RabbitMQ message brokers.",
        },
        {
          num: "03",
          title: "Automated CI/CD & Zero Downtime",
          text: "Blue-green rolling Kubernetes deployments with automated regression tests to push features multiple times a week safely.",
        },
      ],
      terminalCode: [
        "$ kubectl get pods -n production",
        "spring-gateway-7f89d   1/1   Running   0   42m",
        "auth-service-89cb1     1/1   Running   0   42m",
        "billing-queue-3a1b0    1/1   Running   0   42m",
        "✔ Zero downtime rolling release completed.",
      ],
    },
    enterprise: {
      label: "Enterprise Modernization",
      headline: "De-risk monolith migrations and cloud modernizations.",
      subtext:
        "Transform legacy systems into modern cloud-native architectures with surgical precision, zero service interruption, and comprehensive audits.",
      badgeStat: "60% Faster",
      badgeDesc: "Average reduction in P99 database query response times",
      advantages: [
        {
          num: "01",
          title: "Codebase & Security Audits",
          text: "Comprehensive architectural evaluation, identifying query bottlenecks, security vulnerabilities, and technical debt hotspots.",
        },
        {
          num: "02",
          title: "Strangler Fig Pattern Migration",
          text: "Safely extracting bounded domains from legacy monoliths into modern microservices with zero business disruption.",
        },
        {
          num: "03",
          title: "Bank-Grade Compliance",
          text: "PCI-DSS, HIPAA-ready patterns, TLS 1.3 encryption, automated audit logs, and strict role-based access control (RBAC).",
        },
      ],
      terminalCode: [
        "$ arivom audit --scan-codebase --depth=deep",
        "✔ Monolith dependencies analyzed: 14 modules.",
        "✔ Extracted Service: Payment & Billing Gateway.",
        "✔ Query latency reduced from 840ms to 42ms.",
        "✔ Executive Architecture Report ready.",
      ],
    },
  }

  const current = personas[activePersona]

  return (
    <section className="section-space bg-white border-b border-slate-200/70">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 anim-up">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Targeted Architecture
          </div>
          <h2 className="section-title mt-5">
            Tailored Advantages For Every Stage
          </h2>
          <p className="section-copy mt-4">
            Whether launching from zero, scaling multi-tenant SaaS, or auditing
            legacy infrastructure, our senior engineers adapt to your goals.
          </p>

          {/* Persona Tabs Switcher */}
          <div className="mt-8 flex flex-wrap sm:inline-flex items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-slate-100 border border-slate-200 shadow-inner max-w-full">
            {(Object.keys(personas) as PersonaKey[]).map((key) => {
              const active = activePersona === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePersona(key)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {personas[key].label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] items-center mt-12">
          {/* Left Side: Mockup / Terminal Panel */}
          <div className="rounded-3xl border border-slate-200 bg-[#0f172a] text-white p-6 sm:p-8 shadow-2xl overflow-hidden relative anim-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  arivom-engine.sh
                </span>
              </div>
              <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-400/10 px-2.5 py-0.5 rounded-md border border-orange-400/20">
                SENIOR COLLECTIVE
              </span>
            </div>

            {/* Terminal Output */}
            <div className="space-y-2 font-mono text-xs text-slate-300 leading-relaxed mb-6">
              {current.terminalCode.map((line, i) => (
                <p
                  key={line}
                  className={
                    line.startsWith("✔")
                      ? "text-emerald-400"
                      : line.startsWith("$")
                        ? "text-orange-300 font-bold"
                        : line.startsWith("🚀")
                          ? "text-sky-300 font-bold"
                          : "text-slate-300"
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Highlight Metric Card */}
            <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent border border-orange-500/30 p-5 mt-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-orange-300">
                  Engineering Guarantee
                </p>
                <p className="mt-1 text-2xl font-black text-white font-mono">
                  {current.badgeStat}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {current.badgeDesc}
                </p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500 text-white shadow-lg shrink-0">
                <Sparkles size={22} />
              </span>
            </div>
          </div>

          {/* Right Side: Numbered Advantages */}
          <div className="space-y-6 anim-right">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111a2e] leading-snug">
                {current.headline}
              </h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {current.subtext}
              </p>
            </div>

            <div className="space-y-4 pt-2 anim-stagger-group">
              {current.advantages.map((item) => (
                <div key={item.num} className="card p-5 flex gap-4 items-start">
                  <span className="font-mono text-xl font-black text-orange-600 shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/contact" className="button button-primary">
                Consult With Our Senior Engineers <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
