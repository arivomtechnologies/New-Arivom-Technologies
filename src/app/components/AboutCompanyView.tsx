import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Code2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router'

export function AboutCompanyView() {
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const teamPhoto = `${cleanBase}images/arivom-team-office.jpg`

  const stats = [
    { value: '50+', label: 'Projects Delivered', desc: 'Web, mobile & cloud systems' },
    { value: '30+', label: 'Happy Clients', desc: 'Startups & enterprises' },
    { value: '5+', label: 'Years Experience', desc: 'Full-lifecycle software engineering' },
    { value: '99%', label: 'Client Satisfaction', desc: 'Verified delivery SLA' },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Integrity',
      desc: "We do what's right. Honest timelines, fixed transparent quotations, and zero hidden costs.",
      badge: 'Transparent',
    },
    {
      icon: Target,
      title: 'Excellence',
      desc: 'We aim for the best. Pixel-perfect responsiveness, clean SOLID code, and sub-second page performance.',
      badge: 'High Standard',
    },
    {
      icon: Users,
      title: 'Collaboration',
      desc: 'We grow together. Direct engineer communication, shared Git repos, and transparent bi-weekly sprint demos.',
      badge: 'Direct Access',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      desc: 'We build for tomorrow. Modern technology stacks (Java 21, Spring Boot 3, React 19, React Native) that stay ahead.',
      badge: 'Modern Stack',
    },
    {
      icon: ShieldCheck,
      title: 'Accountability',
      desc: 'We take ownership. Guaranteed milestone delivery, comprehensive test coverage, and a 60-day post-launch warranty.',
      badge: '60-Day SLA',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Success',
      desc: 'Your success is our success. We obsess over user conversion, sub-50ms latency, and long-term business scalability.',
      badge: 'Client First',
    },
  ]

  const engineeringPillars = [
    {
      icon: '🏛️',
      title: 'Domain Experience',
      desc: 'Deep functional knowledge across FinTech payment gateways, Real Estate platforms, Industrial IoT telemetry, HealthTech EHR, and D2C e-commerce.',
    },
    {
      icon: '⚡',
      title: 'Modern Tooling',
      desc: 'Java 21, Spring Boot 3, React 19, Angular Signals, React Native, Docker, Kubernetes, and PostgreSQL for unmatched developer speed and reliability.',
    },
    {
      icon: '🛡️',
      title: 'Proactive Security',
      desc: 'OWASP Top 10 hardening, SSL/TLS enforcement, automated vulnerability scans, and strict RBAC authorization baked into every system.',
    },
    {
      icon: '🤝',
      title: '60-Day Code Warranty',
      desc: 'Free bug resolution period on every project plus comprehensive architectural documentation and cloud infrastructure handover.',
    },
  ]

  const testimonials = [
    {
      client: 'KB Homes',
      category: 'Architects & Builders',
      quote:
        'Arivom Technologies built an architectural showcase portal that perfectly embodies the precision and luxury of our projects. High-ticket construction inquiries jumped significantly.',
      stars: 5,
      avatar: 'K',
      bg: 'bg-[#111a2e] text-amber-400 border border-amber-500/30',
    },
    {
      client: 'First Goal FC',
      category: 'SportsTech & Tournament App',
      quote:
        'The mobile app and tournament engine built by Arivom handle thousands of academy players seamlessly. Live scores, goal push alerts, and bracket updates run flawlessly.',
      stars: 5,
      avatar: 'F',
      bg: 'bg-emerald-600',
    },
    {
      client: 'La Castle Homes',
      category: 'Real Estate & Architecture',
      quote:
        'Arivom Technologies delivered our website ahead of schedule with flawless communication. The team is deeply technical, responsive, and truly understood our luxury brand vision.',
      stars: 5,
      avatar: 'L',
      bg: 'bg-[#0A1628]',
    },
    {
      client: 'Phoenix Print Solution',
      category: 'Industrial Automation & Workflow',
      quote:
        'They automated our entire prepress and order routing pipeline with remarkable speed. 10,000+ daily jobs now flow seamlessly without paper bottlenecks.',
      stars: 5,
      avatar: 'P',
      bg: 'bg-orange-600',
    },
  ]

  return (
    <div className="bg-[#fbfaf7]">
      {/* 1. Page Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-38 lg:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-orange-50/50 via-white to-[#fbfaf7]">
        <div className="container-wide text-center px-3 sm:px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1.5 text-xs font-bold text-orange-700 shadow-xs backdrop-blur-sm">
            <span>❖</span> About Arivom Technologies
          </div>

          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] break-words">
            Building Digital Solutions <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
              for a Better Tomorrow
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Arivom Technologies is a modern software engineering collective specializing in web,
            mobile, and cloud solutions. We help startups, scale-ups, and enterprises turn their
            ideas into scalable, secure, and high-performance digital products.
          </p>

          {/* 4 Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {[
              { label: '⚡ Innovation Driven', color: 'border-orange-200 bg-orange-50/80 text-orange-800' },
              { label: '👥 Client Focused', color: 'border-blue-200 bg-blue-50/80 text-blue-800' },
              { label: '🛡️ Quality Assured', color: 'border-emerald-200 bg-emerald-50/80 text-emerald-800' },
              { label: '📈 Long-Term Partnerships', color: 'border-amber-200 bg-amber-50/80 text-amber-800' },
            ].map((b) => (
              <span
                key={b.label}
                className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs ${b.color}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Story & Team Visual Showcase */}
      <section className="section-space">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider">
                Our Story
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Product Gets Our Direct, Undivided Senior Engineering Attention.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Arivom Technologies was established with a clear mission: eliminate agency bloat,
                bypass layers of non-technical middlemen, and provide growing businesses direct
                access to senior engineers who take genuine ownership of what they build.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                From initial architecture design and schema modeling to full-stack implementation
                and automated Kubernetes deployments, our senior engineering collective stays
                immersed in your product. We care deeply about the elegance and resilience of the
                code—and even more about the measurable business value it creates.
              </p>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-slate-200/90 bg-white p-4.5 text-center shadow-xs transition hover:border-orange-300 hover:shadow-md"
                  >
                    <div className="text-2xl sm:text-3xl font-black font-mono text-orange-600">
                      {s.value}
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{s.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Team Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-orange-200/80 bg-slate-950">
                <img
                  src={teamPhoto}
                  alt="Arivom Technologies Senior Software Engineering Team Collaborating"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    // Fallback to high-resolution engineering office photo if local path needs resolution
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                {/* Floating Overlay Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-950/85 text-amber-300 border border-white/20 backdrop-blur-md shadow-md">
                    ✨ Senior Full-Stack Architects
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span className="bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Spring Boot • React • Cloud • Mobile
                  </span>
                  <span className="text-emerald-400 font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    ⚡ 99% Satisfaction
                  </span>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-orange-400/15 to-amber-400/15 blur-2xl opacity-70 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values: What Drives Us (6 Cards) */}
      <section className="section-space bg-white border-y border-slate-200/60">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              What Drives Us Every Day
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Our principles shape how we architect software, tackle complexity, and build enduring
              relationships with founders and enterprise engineering leads.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="rounded-3xl border border-slate-200/80 bg-[#fbfaf7] p-7 transition hover:border-orange-300 hover:bg-white hover:shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </span>
                    <span className="text-[11px] font-mono font-bold text-orange-600 bg-orange-100/60 px-2.5 py-0.5 rounded-full border border-orange-200/60">
                      {v.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-600">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Engineering DNA & Delivery Principles */}
      <section className="section-space">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider">
                Engineering DNA
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Built by Engineers. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  Led by Craft.
                </span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                At Arivom Technologies, we don't believe in layers of middle managers or non-technical
                account executives. When you partner with us, you speak directly with senior
                architects who write the code, inspect the schemas, and orchestrate the deployments.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '100% In-House Dedicated Engineering (Chennai & Tirunelveli, Tamil Nadu)',
                  'Strict Test-Driven & Clean Architecture (SOLID & Hexagonal Principles)',
                  'Direct Slack / Teams / WhatsApp Collaboration (+91 63690 12607)',
                  'Continuous Git Commits & Automated Daily Production Pipelines',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="text-orange-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to="/technology" className="button button-secondary">
                  Explore Full Tech Stack <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Pillars Grid */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {engineeringPillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-orange-300 hover:shadow-md"
                >
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className="section-space bg-white border-t border-slate-200/60">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Real feedback from production platforms we have architected and deployed.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div
                key={t.client}
                className="rounded-3xl border border-slate-200/80 bg-[#fbfaf7] p-7 flex flex-col justify-between shadow-xs transition hover:shadow-lg hover:border-orange-300"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
                  <div
                    className={`w-10 h-10 rounded-full ${t.bg} text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.client}</div>
                    <div className="text-xs text-slate-500">{t.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ready to Build CTA */}
      <section className="section-space bg-[#0d1627] text-white relative overflow-hidden">
        <div className="container-wide relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-bold text-orange-400">
            <Sparkles size={14} /> Ready to Ship?
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let’s Build Software That Moves Your Business Forward.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you need a dedicated senior engineering squad or a high-performance custom MVP,
            we are ready to start planning your sprint roadmap.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="button button-primary w-full sm:w-auto">
              Schedule Architecture Call <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/916369012607"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
              <span className="text-xs text-slate-400">+91 63690 12607</span>
            </a>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      </section>
    </div>
  )
}
