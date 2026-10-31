import {
  Activity,
  ArrowRight,
  Blocks,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  Lock,
  MessageSquare,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router'

export function BentoGridSection() {
  return (
    <section className="section-space bg-[#fbfaf7] relative overflow-hidden">
      <div className="container-wide">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Engineering Ecosystem
          </div>
          <h2 className="section-title mt-5">
            Engineering Capabilities. Simplified.
          </h2>
          <p className="section-copy mt-4">
            A boutique collective of 5 senior engineers delivering enterprise backend microservices, modern web applications, mobile apps, and cloud orchestration.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Full-Stack Enterprise Stack */}
          <div className="card p-7 flex flex-col justify-between bg-white relative overflow-hidden group">
            <div className="dot-grid-bg absolute inset-0 opacity-40 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                  Full-Stack Mastery
                </span>
                <span className="rounded-md bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5">
                  Production-Ready
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
                Java 21 & Spring Boot 3 Core
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clean architectural boundaries, virtual threads (Project Loom), Spring Security, and sub-50ms API response times.
              </p>
              
              <div className="mt-5">
                <span className="highlighter-yellow text-xs">
                  Spring Boot 3 + React 19 / Angular
                </span>
              </div>
            </div>

            {/* 3D Tilted Card Preview */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-[#1e293b] text-white shadow-xl transform group-hover:scale-102 transition duration-300">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2 mb-2">
                <span>Architecture</span>
                <span className="text-emerald-400">REST & gRPC</span>
              </div>
              <div className="space-y-1 font-mono text-xs text-slate-200">
                <p>• Java 21 Virtual Threads</p>
                <p>• Spring Cloud API Gateway</p>
                <p>• PostgreSQL ACID Relational</p>
              </div>
            </div>
          </div>

          {/* Card 2: Global Multi-Region Cloud Map */}
          <div className="card p-7 flex flex-col justify-between bg-white relative overflow-hidden lg:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                  Cloud Infrastructure
                </span>
                <span className="rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5">
                  Kubernetes Multi-Region
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
                Global Cloud & High-Availability Topology
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Deployed across multi-region Kubernetes clusters on AWS and GCP with Cloudflare edge caching, ensuring zero downtime and geographic low-latency routing.
              </p>
            </div>

            {/* Map Representation with Interactive Server Ping Nodes */}
            <div className="mt-6 relative h-52 w-full rounded-2xl bg-slate-900 text-white p-5 overflow-hidden flex items-center justify-center">
              
              {/* World Grid Lines */}
              <div className="absolute inset-0 dot-grid-bg opacity-30" />
              
              {/* Connecting Dashed SVG Routes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200">
                <path d="M 120 100 Q 250 40 340 90 T 520 80" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 220 120 Q 320 160 440 110" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Node 1: Mumbai */}
              <div className="absolute left-[36%] top-[55%] flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-orange-500 animate-beacon" />
                <span className="mt-1 glass-pill-dark px-2 py-0.5 rounded text-[9px] font-mono text-orange-300">
                  Mumbai • 18ms
                </span>
              </div>

              {/* Node 2: Singapore */}
              <div className="absolute left-[54%] top-[65%] flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-beacon" />
                <span className="mt-1 glass-pill-dark px-2 py-0.5 rounded text-[9px] font-mono text-sky-300">
                  Singapore • 24ms
                </span>
              </div>

              {/* Node 3: Frankfurt */}
              <div className="absolute left-[24%] top-[30%] flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-beacon" />
                <span className="mt-1 glass-pill-dark px-2 py-0.5 rounded text-[9px] font-mono text-emerald-300">
                  Frankfurt • 42ms
                </span>
              </div>

              {/* Node 4: US East */}
              <div className="absolute left-[10%] top-[45%] flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-indigo-500 animate-beacon" />
                <span className="mt-1 glass-pill-dark px-2 py-0.5 rounded text-[9px] font-mono text-indigo-300">
                  US-East • 68ms
                </span>
              </div>

              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400">
                Multi-cluster active-active failover
              </div>
            </div>
          </div>

          {/* Card 3: Concentric Orbitals (Kafka & Event Streaming) */}
          <div className="card p-7 flex flex-col justify-between bg-white relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                  Event Sourcing
                </span>
                <span className="rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
                  Async
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
                Kafka & Event Streaming
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Decoupled microservices architecture with Kafka, RabbitMQ, and Redis pub/sub handling thousands of asynchronous tasks seamlessly.
              </p>
            </div>

            {/* Concentric Orbiting Graphic */}
            <div className="mt-6 relative h-48 w-full flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute h-40 w-40 rounded-full border border-dashed border-orange-200 animate-orbit flex items-start justify-center">
                <span className="h-6 w-6 -translate-y-3 rounded-full bg-orange-500 text-white text-[9px] font-bold font-mono grid place-items-center shadow-md">
                  K8s
                </span>
              </div>

              {/* Middle Ring */}
              <div className="absolute h-28 w-28 rounded-full border border-dashed border-blue-200 animate-orbit-reverse flex items-end justify-center">
                <span className="h-6 w-6 translate-y-3 rounded-full bg-blue-600 text-white text-[9px] font-bold font-mono grid place-items-center shadow-md">
                  Kafka
                </span>
              </div>

              {/* Inner Center Icon */}
              <div className="relative z-10 h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#111a2e] to-slate-800 text-white shadow-xl grid place-items-center font-black text-sm">
                API
              </div>
            </div>
          </div>

          {/* Card 4: Live Telemetry & Dashboard */}
          <div className="card p-7 flex flex-col justify-between bg-white relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase">
                  Realtime Telemetry
                </span>
                <span className="rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  Sub-50ms P99
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
                High-Concurrency Telemetry
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Prometheus & Grafana metrics tracking query latency, memory pooling, and peak transaction processing.
              </p>
            </div>

            {/* Sparkline & Bar Chart Visual */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-slate-500">Live Throughput</span>
                <span className="text-xs font-mono font-bold text-emerald-600">+12,450 TPS Peak</span>
              </div>

              {/* Bar Capsules */}
              <div className="flex items-end justify-between h-20 gap-2 pt-2">
                {[45, 60, 80, 50, 95, 70, 85, 100].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ${
                        i === 7 ? 'bg-orange-500' : i % 2 === 0 ? 'bg-slate-300' : 'bg-slate-800'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 5: Bank-Grade Security Shield */}
          <div className="card p-7 flex flex-col justify-between bg-white relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                  Defense in Depth
                </span>
                <span className="rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5">
                  PCI-DSS Ready
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#111a2e]">
                Hardened Security & Compliance
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                OWASP top-10 mitigation, OAuth2/JWT token signing, cryptographic encryption at rest, and automated static vulnerability audits.
              </p>
            </div>

            {/* Glowing Shield Icon */}
            <div className="mt-6 relative h-40 w-full flex items-center justify-center">
              <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-2xl grid place-items-center animate-pulse-glow">
                <ShieldCheck size={38} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
