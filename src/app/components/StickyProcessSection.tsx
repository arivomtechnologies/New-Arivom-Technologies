import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Flame,
  GitBranch,
  Layers3,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react'

export function StickyProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      num: '01',
      title: 'Architecture Blueprint & Schema from Day 1',
      highlighter: '100% Source Code Ownership',
      desc: 'We architect modular monoliths and Spring Cloud microservices tailored to your exact domain. From day one, every commit lives in your private repository with clean DB schema definitions, CI/CD, and zero tech debt.',
      details: [
        'Domain-Driven Design (DDD) with bounded contexts',
        'PostgreSQL ACID relational schemas & migration scripts',
        'REST, GraphQL & gRPC type-safe API contracts',
      ],
    },
    {
      num: '02',
      title: 'Get 2-Week Agile Sprints & Production Commits',
      highlighter: 'Zero Management Bloat',
      desc: 'No account managers or junior delegations. You interface directly with the senior engineers writing your code through predictable 2-week sprint cadences, automated test suites, and weekly live demos.',
      details: [
        'Fortnightly sprint reviews with live staging deployments',
        'Direct Slack/Teams channel with senior tech leads',
        'Unit, integration & end-to-end automated testing',
      ],
    },
    {
      num: '03',
      title: 'Scale to 10k+ TPS With Resilient Cloud Infra',
      highlighter: 'Bank-Grade Scalability',
      desc: 'Deploy with confidence. We configure Kubernetes clusters, Kafka asynchronous streaming, and multi-region caching to ensure your platform handles heavy peak concurrency with sub-50ms latency.',
      details: [
        'Kubernetes auto-scaling & containerized Docker workloads',
        'Kafka & RabbitMQ event-driven asynchronous queues',
        'Zero-downtime rolling releases & automated rollbacks',
      ],
    },
  ]

  return (
    <section className="section-space relative overflow-hidden bg-[#fbfaf7] border-y border-slate-200/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container-wide relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Engineering Methodology
          </div>
          <h2 className="section-title mt-5">
            How Arivom Engineers Deliver
          </h2>
          <p className="section-copy mt-4">
            Understand how our senior engineering collective transforms complex product requirements into high-throughput production systems in 3 clear stages.
          </p>
        </div>

        {/* 3-Step Sticky / Interactive Showcase */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr] items-start">
          
          {/* Left Column: Interactive Steps List */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-7 transition-all duration-300 border ${
                    isActive
                      ? 'bg-white border-orange-500/80 shadow-xl shadow-orange-500/10 -translate-y-1'
                      : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm font-bold ${isActive ? 'text-orange-600' : 'text-slate-400'}`}>
                      STEP {step.num}
                    </span>
                    <span className="highlighter-yellow text-xs">
                      {step.highlighter}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold text-[#111a2e]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>

                  {isActive && (
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 animate-in fade-in duration-300">
                      {step.details.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column: Dynamic 3D Visual Stage */}
          <div className="sticky top-28 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center">
            
            {/* Step 1 Visual: 3D Stacked Cards Fanning Out */}
            {activeStep === 0 && (
              <div className="relative py-8 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                {/* Background Fanned Cards */}
                <div className="relative w-full max-w-[380px] h-[220px]">
                  
                  {/* Layer 1 (Left -8deg) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-300/80 p-5 shadow-lg transform -rotate-6 -translate-x-4 -translate-y-2 opacity-70">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500">
                      <span>SPRING BOOT 3 REST API</span>
                      <span className="rounded bg-blue-100 text-blue-700 px-2 py-0.5">Java 21</span>
                    </div>
                  </div>

                  {/* Layer 2 (Right +8deg) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-50 to-amber-100 border border-orange-200/80 p-5 shadow-lg transform rotate-6 translate-x-4 -translate-y-2 opacity-70">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-orange-600">
                      <span>POSTGRESQL CLUSTER</span>
                      <span className="rounded bg-orange-200 text-orange-800 px-2 py-0.5">ACID</span>
                    </div>
                  </div>

                  {/* Main Foreground Card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#111a2e] to-[#18233c] text-white p-6 shadow-2xl border border-white/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 text-[10px] font-mono font-bold uppercase">
                          Architecture Blueprint
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          v1.0 Ready
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-white">
                        Distributed Enterprise Backend
                      </h4>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                        Spring Cloud Gateway • Event Sourcing • Multi-Tenant DB
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Ownership:</span>
                      <span className="text-white font-bold">Private GitHub Organization</span>
                    </div>
                  </div>

                </div>

                {/* Floating 3D Badge */}
                <div className="mt-8 flex items-center gap-3 glass-pill px-4 py-2.5 rounded-full shadow-lg">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-bold text-xs shadow-md">
                    A
                  </span>
                  <div className="text-left text-xs">
                    <p className="font-bold text-[#111a2e]">Modular Monolith & Microservices</p>
                    <p className="text-[11px] text-slate-500">Zero vendor lock-in • 100% clean code</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual: Live Sprint Notification Bubbles */}
            {activeStep === 1 && (
              <div className="relative py-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Sprint 4 Active • Bi-Weekly Milestone
                  </span>
                </div>

                {/* Floating Notification 1 */}
                <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200/80 p-4 shadow-lg transform hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600 font-mono font-bold text-xs">
                      <GitBranch size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Sprint Backlog Commits</p>
                      <p className="text-[11px] text-slate-500">48 automated PRs merged & verified</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    +48 Commits
                  </span>
                </div>

                {/* Floating Notification 2 */}
                <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200/80 p-4 shadow-lg transform hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 font-mono font-bold text-xs">
                      <Zap size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">API Response Latency</p>
                      <p className="text-[11px] text-slate-500">Java 21 Loom virtual threads</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    38ms P99
                  </span>
                </div>

                {/* Floating Notification 3 */}
                <div className="flex items-center justify-between rounded-2xl bg-[#111a2e] text-white p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white font-mono font-bold text-xs">
                      <Workflow size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">Live Staging Demonstration</p>
                      <p className="text-[11px] text-slate-400">Direct senior engineer walkthrough</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2.5 py-1 rounded-full">
                    Demo Ready
                  </span>
                </div>
              </div>
            )}

            {/* Step 3 Visual: Scale & Spline Trajectory */}
            {activeStep === 2 && (
              <div className="relative py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    High-Concurrency Scaling Trajectory
                  </span>
                </div>

                {/* SVG Performance Spline */}
                <div className="relative h-48 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                    <defs>
                      <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b24" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid */}
                    <line x1="0" y1="40" x2="400" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" />

                    {/* Smooth Spline Curve */}
                    <path
                      d="M 10 140 C 90 135, 140 100, 200 70 C 260 40, 320 25, 390 15"
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Nodes along the curve */}
                    <circle cx="90" cy="120" r="5" fill="#ff6b24" />
                    <circle cx="200" cy="70" r="6" fill="#2563eb" />
                    <circle cx="370" cy="18" r="7" fill="#10b981" className="animate-ping opacity-75" />
                    <circle cx="370" cy="18" r="6" fill="#10b981" />
                  </svg>

                  {/* Floating Metric Badges */}
                  <div className="absolute top-2 right-4 glass-pill px-3 py-1.5 rounded-xl shadow-md text-right">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Throughput Peak</p>
                    <p className="text-xs font-black text-emerald-600 font-mono">10,000+ TPS</p>
                  </div>

                  <div className="absolute top-20 left-1/3 glass-pill px-3 py-1.5 rounded-xl shadow-md text-left">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Availability</p>
                    <p className="text-xs font-black text-blue-600 font-mono">99.99% Uptime</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-slate-400 text-[10px]">CONTAINERS</span>
                    <span className="font-bold text-slate-800">Docker & K8s</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-slate-400 text-[10px]">STREAMING</span>
                    <span className="font-bold text-slate-800">Kafka Events</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-slate-400 text-[10px]">SECURITY</span>
                    <span className="font-bold text-slate-800">PCI-DSS Ready</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
