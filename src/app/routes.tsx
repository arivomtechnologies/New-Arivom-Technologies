import { FormEvent, useEffect, useRef, useState } from "react"
import {
  Activity,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Blocks,
  Bot,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Globe2,
  Layers3,
  LoaderCircle,
  Lock,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Palette,
  Phone,
  Play,
  Rocket,
  Quote,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react"
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
} from "react-router"
import {
  AiAssistantWidget,
  openAiAssistantWithPrompt,
} from "./components/AiAssistantWidget"
import { StickyProcessSection } from "./components/StickyProcessSection"
import { PersonaAdvantagesSection } from "./components/PersonaAdvantagesSection"
import { BentoGridSection } from "./components/BentoGridSection"
import { ClientDeliverablesCarousel } from "./components/ClientDeliverablesCarousel"
import { AiCopilotSection } from "./components/AiCopilotSection"
import { TechStackSolarOrbit } from "./components/TechStackSolarOrbit"
import { ProjectScopeEstimator } from "./components/ProjectScopeEstimator"
import { AboutCompanyView } from "./components/AboutCompanyView"

const base = import.meta.env.BASE_URL || "/"
const cleanBase = base.endsWith("/") ? base : `${base}/`

const photos = {
  code: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
  office:
    "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1400&q=85",
  collaboration:
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=1400&q=85",
}

const services = [
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    slug: "web-development",
    summary:
      "High-performance websites and web apps engineered for conversion, scale, and speed.",
    tags: ["React 19", "Next.js", "APIs"],
    image: `${cleanBase}images/zigzag-web-application.jpg`,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    slug: "mobile-apps",
    summary:
      "Polished iOS and Android experiences that make complex workflows feel effortless.",
    tags: ["React Native", "iOS", "Android"],
    image: `${cleanBase}images/zigzag-mobile-application.jpg`,
  },
  {
    icon: Bot,
    title: "AI Automation",
    slug: "ai-automation",
    summary:
      "Practical AI assistants and workflow automation that give your team hours back.",
    tags: ["Gemini AI", "Agents", "Workflows"],
    image: `${cleanBase}images/service-ai-saas.jpg`,
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    summary:
      "Secure cloud foundations, automated delivery pipelines, and reliable infrastructure.",
    tags: ["Kubernetes", "Docker", "CI/CD"],
    image: `${cleanBase}images/zigzag-cloud-deployment.jpg`,
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    slug: "ui-ux-design",
    summary:
      "Research-led product design systems that are useful, memorable, and ready to build.",
    tags: ["Figma", "Design System", "Prototypes"],
    image: `${cleanBase}images/arivom-services-dashboard.jpg`,
  },
  {
    icon: CircleDollarSign,
    title: "FinTech & Enterprise",
    slug: "fintech-solutions",
    summary:
      "Secure payment, lending, and financial microservices built for trust and compliance.",
    tags: ["Java 21", "Spring Boot", "Kafka"],
    image: `${cleanBase}images/service-enterprise-erp.jpg`,
  },
]

const projects = [
  {
    title: "KB Homes — Architects & Builders",
    category: "Real Estate & Architecture",
    result: "+380% qualified construction consultations",
    url: "#",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    logo: `${cleanBase}images/kb-homes-logo.png`,
    color: "from-amber-600/20 to-orange-100",
    badge: "Client Platform • Architects & Builders",
    architecture: "React 19 + TypeScript + Cloudflare Edge",
    sprints: "2 Agile Sprints",
    team: "Senior Frontend & Architecture Squad",
    valuation: "Luxury Villa & Commercial Builder",
    description: "Bespoke digital portal for KB Homes architects and builders featuring high-resolution architectural project portfolio, 3D elevation showcases, interactive floorplan viewer, and direct WhatsApp project inquiry routing.",
  },
  {
    title: "First Goal FC — Tournament & Academy App",
    category: "SportsTech & Mobile Application",
    result: "12,000+ match events & live tournament scoring",
    url: "#",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=85",
    color: "from-emerald-600/20 to-green-100",
    badge: "Mobile App • iOS & Android",
    architecture: "React Native + Spring Boot 3 + WebSockets",
    sprints: "4 Agile Sprints",
    team: "Senior Mobile & Real-Time Backend Squad",
    valuation: "Live Tournament Engine",
    description: "Cross-platform mobile application and tournament manager for First Goal FC football academy. Features live match center, instant push notifications for goals and penalties, automated bracket scheduling, and academy player rosters.",
  },
  {
    title: "La Castle Homes",
    category: "Real Estate & Architecture",
    result: "+420% qualified buyer inquiries",
    url: "https://lacastlehomes.com/",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
    color: "from-blue-500/20 to-sky-100",
    badge: "Live Website • Verified Client",
    architecture: "React + Node + Cloudflare CDN",
    sprints: "2 Sprints (Fast-Track)",
    team: "Senior Frontend & Cloud Engineers",
    valuation: "$1.8M+ Portfolio",
    description: "Luxury architectural villas and construction portal showcasing high-end commercial landmarks and residential properties with astonishing speed.",
  },
  {
    title: "Phoenix Print Solution",
    category: "Industrial IoT & Print Automation",
    result: "10,000+ daily orders automated",
    url: "https://phoenixprintsolution.com/",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    color: "from-orange-500/20 to-amber-100",
    badge: "Production System • Active",
    architecture: "Java 21 + Spring Boot 3 + PostgreSQL",
    sprints: "4 Sprints",
    team: "Senior Backend & Architecture Squad",
    valuation: "10k+ Daily Jobs",
    description: "High-volume prepress and offset printing workflow tracking software eliminating departmental bottlenecks and paper job slips.",
  },
  {
    title: "Sri Ramana Dental Clinic",
    category: "HealthTech & Patient Management",
    result: "3,200+ digital appointments booked",
    url: "#",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    color: "from-emerald-500/20 to-teal-100",
    badge: "HIPAA-Ready Clinic Portal",
    architecture: "Angular Signals + Spring Cloud",
    sprints: "3 Sprints",
    team: "Senior Full-Stack Engineering Squad",
    valuation: "3,200+ Patients",
    description: "Comprehensive multi-doctor clinic management platform with automated SMS reminders, medical records, and digital consultation queue.",
  },
  {
    title: "BeeWell Organic Honey",
    category: "Direct-to-Consumer E-Commerce",
    result: "2.8x conversion lift & 0 dropped carts",
    url: "#",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1400&q=85",
    color: "from-amber-500/20 to-yellow-100",
    badge: "High-Traffic D2C Store",
    architecture: "React Native + Headless PostgreSQL",
    sprints: "3 Sprints",
    team: "Senior Mobile & Full-Stack Squad",
    valuation: "Zero-Lag Checkout",
    description: "Artisanal organic honey direct-to-consumer store with Razorpay payment processing, instant WhatsApp tracking, and farm-to-bottle traceability.",
  },
]

function Logo({ inverted = false }: { inverted?: boolean }) {
  const base = import.meta.env.BASE_URL || "/"
  const cleanBase = base.endsWith("/") ? base : `${base}/`
  const logoSrc = `${cleanBase}images/arivom-header-logo.svg`

  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 sm:gap-3 select-none"
      aria-label="Arivom Technologies home"
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
          inverted
            ? "rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1 shadow-sm"
            : ""
        }`}
      >
        <img
          src={logoSrc}
          alt="Arivom Technologies"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`text-[19px] sm:text-[21px] font-black tracking-tight font-sans transition-colors ${
            inverted ? "text-white" : "text-[#0B1437]"
          }`}
        >
          ARIVOM
        </span>
        <span
          className={`text-[9px] sm:text-[9.5px] font-bold tracking-[0.33em] font-sans mt-1 uppercase transition-colors ${
            inverted ? "text-[#FF6B00]" : "text-[#64748B]"
          }`}
        >
          TECHNOLOGIES
        </span>
      </div>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])

  const links = [
    { to: "/", label: "Home" },
    {
      to: "/services",
      label: "Services",
      children: [
        { to: "/services/web-development", label: "Web development" },
        { to: "/services/mobile-apps", label: "Mobile apps" },
        { to: "/services/ui-ux-design", label: "UI/UX design" },
        { to: "/services/ai-automation", label: "AI automation" },
        { to: "/services/cloud-devops", label: "Cloud & DevOps" },
        { to: "/services/fintech-solutions", label: "FinTech & Enterprise" },
      ],
    },
    { to: "/work", label: "Work" },
    { to: "/pricing", label: "Scope Estimator" },
    { to: "/technology", label: "Tech Stack" },
    {
      to: "/about",
      label: "Company",
      children: [
        { to: "/about", label: "About Arivom" },
        { to: "/work", label: "Case studies" },
        { to: "/contact", label: "Contact us" },
      ],
    },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-5 shadow-[0_12px_35px_rgba(20,27,45,.08)] backdrop-blur-xl lg:px-7">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <div className="nav-dropdown" key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
                end={item.to === "/"}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="nav-chevron" size={14} />
                )}
              </NavLink>

              {item.children && (
                <div className="dropdown-panel">
                  <div className="dropdown-inner">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="dropdown-item"
                      >
                        <span>{child.label}</span>
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link to="/contact" className="button button-primary !px-5 !py-3">
            Start a project <ArrowRight size={16} />
          </Link>
        </div>
        <button
          type="button"
          className={`hamburger ${open ? "hamburger-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Drawer with Services Submenu */}
      <div className={`mobile-drawer ${open ? "mobile-drawer-open" : ""}`}>
        <div className="mobile-drawer-inner">
          <div className="space-y-1 pb-2">
            {links.map((item) => {
              if (!item.children) {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `mobile-nav-item flex items-center justify-between ${
                        isActive ? "text-orange-600 font-bold bg-orange-50/70" : ""
                      }`
                    }
                    end={item.to === "/"}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={15} />
                  </NavLink>
                )
              }

              const isServices = item.label === "Services"
              const isOpen = isServices ? mobileServicesOpen : mobileCompanyOpen
              const toggleOpen = () => {
                if (isServices) setMobileServicesOpen(!mobileServicesOpen)
                else setMobileCompanyOpen(!mobileCompanyOpen)
              }

              return (
                <div
                  key={item.to}
                  className="rounded-xl border border-slate-200/60 bg-slate-50/60 p-1.5 my-1"
                >
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          isActive
                            ? "text-orange-600 font-bold"
                            : "text-slate-800 hover:text-orange-600"
                        }`
                      }
                      end={item.to === "/"}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={toggleOpen}
                      className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-orange-600" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-1 space-y-0.5 border-t border-slate-200/60 pt-1.5 pl-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                              isActive
                                ? "text-orange-600 bg-orange-50/80 font-bold"
                                : "text-slate-600 hover:bg-white hover:text-orange-600"
                            }`
                          }
                        >
                          <span>{child.label}</span>
                          <ArrowRight size={13} className="text-slate-400" />
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="button button-primary w-full justify-center !py-3 shadow-md"
            >
              Start a project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#111a2e] text-white">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            A product-minded freelance technology company helping ambitious
            teams turn ideas into fast, secure, and beautifully useful digital
            products.
          </p>
          <div className="mt-5 space-y-2">
            <a
              className="flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              href="mailto:arivomtechnologies@gmail.com"
            >
              <Mail size={16} /> arivomtechnologies@gmail.com
            </a>
            <a
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              href="tel:+916369012607"
            >
              <Phone size={16} className="text-orange-400" /> +91 63690 12607
            </a>
          </div>
        </div>
        <FooterLinks
          title="Services"
          links={[
            ["/services/web-development", "Web development"],
            ["/services/mobile-apps", "Mobile apps"],
            ["/services/ui-ux-design", "UI/UX design"],
            ["/services/ai-automation", "AI automation"],
          ]}
        />
        <FooterLinks
          title="Company"
          links={[
            ["/about", "About us"],
            ["/work", "Our work"],
            ["/pricing", "Scope Estimator"],
            ["/contact", "Contact"],
          ]}
        />
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[.18em] text-white">
            Let’s build
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Direct access to our senior engineering team. We reply in under 12 hours.
          </p>
          <Link to="/contact" className="button button-primary mt-5">
            Discuss your idea <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Huge Typographic Watermark as seen in the Dribbble design */}
      <div className="relative overflow-hidden pointer-events-none select-none py-6 border-t border-white/5">
        <div className="container-wide">
          <span className="block text-[clamp(4.5rem,15vw,11.5rem)] font-black tracking-tighter text-white/[0.04] leading-none uppercase font-mono">
            ARIVOM
          </span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Arivom Technologies. Senior Engineering Collective & Product Studio.</span>
          <span>Delivering scalable enterprise web, cloud & mobile software.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[.18em] text-white">
        {title}
      </h3>
      <div className="mt-4 space-y-3">
        {links.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="block text-sm text-slate-400 hover:text-orange-400"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

function Root() {
  const location = useLocation()
  return (
    <>
      <Header />
      <main>
        <MotionEnhancer routeKey={location.pathname}>
          <div className="page-enter" key={location.pathname}>
            <Outlet />
          </div>
        </MotionEnhancer>
      </main>
      <Footer />
      <BackToTop />
      <AiAssistantWidget />
      <ScrollRestoration />
    </>
  )
}

function MotionEnhancer({
  routeKey,
  children,
}: {
  routeKey: string
  children: React.ReactNode
}) {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced || !scope.current) return

    const targets = scope.current.querySelectorAll<HTMLElement>(
      "section:not(:first-child) .container-wide > *, .card, article, .section-title",
    )
    targets.forEach((target, index) => {
      target.classList.add("reveal-item")
      target.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [routeKey])

  return <div ref={scope}>{children}</div>
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 560)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "back-to-top-visible" : ""}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="h-2 w-2 rounded-full bg-orange-500" />
      {children}
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string
  title: string
  text?: string
  center?: boolean
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title mt-5">{title}</h2>
      {text && <p className="section-copy mt-5">{text}</p>}
    </div>
  )
}

function ServiceCard({ service }: { service: typeof services[number] }) {
  const Icon = service.icon
  return (
    <Link to={`/services/${service.slug}`} className="card group p-7">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600">
          <Icon size={23} />
        </span>
        <ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-[#111a2e]">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span className="pill" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

function FullHeroBannerSlider() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  const projects = [
    {
      id: "kb-homes",
      tabNumber: "01",
      tabTitle: "KB Homes",
      tabCategory: "3D Architecture & Web Portal",
      tabTech: "3D Elevations & Virtual Tours",
      client: "KB Homes — Architects & Builders",
      eyebrowBadge: "Architecture & Real Estate Tech",
      headlinePrefix: "3D Architectural Platforms. ",
      headlineHighlight: "Engineered to Convert",
      headlineSuffix: " from Day 1.",
      description: "Direct access to senior engineers building immersive 3D elevation portals, interactive virtual floorplans, and instant WhatsApp inquiry routing (+380% consultations).",
      primaryCta: { label: "Explore Architectural Scope", to: "/work" },
      badges: ["Interactive 3D Virtual Tours", "Instant WhatsApp Lead Hook", "Sub-Second Edge Rendering"],
      badgeTitle: "KB Homes 3D Portal",
      badgeSubtitle: "Live Architectural Walkthrough",
      heroImage: `${cleanBase}images/lacastle-showcase.jpg`,
      thumb1: `${cleanBase}images/zigzag-business-website.jpg`,
      thumb2: `${cleanBase}images/arivom-services-dashboard.jpg`,
      mobileStatLabel: "Inquiry Velocity",
      mobileStatValue: "+380%",
      mobileStatSub: "42 3D Elevations Rendered",
      urlPath: "arivom.live/work/kb-homes",
      liveStatus: "Live Client Platform",
      features: [
        "Interactive 3D elevation showcase & virtual floorplans",
        "Direct WhatsApp project lead routing (+380% inquiries)",
        "Mobile-first speed with sub-second image loading",
      ],
      mobileItems: [
        { title: "Grand Palm Villa (3D)", status: "Active View", metric: "4.8K views" },
        { title: "Signature Residence", status: "Floorplan Ready", metric: "38 leads" },
        { title: "WhatsApp Lead Hook", status: "Instant Route", metric: "99.4% sent" },
      ],
      floatingMetric: "+380% Inquiries",
      icon: Sparkles,
    },
    {
      id: "first-goal",
      tabNumber: "02",
      tabTitle: "First Goal FC",
      tabCategory: "Tournament & Academy App",
      tabTech: "React Native & Real-Time Scoring",
      client: "First Goal FC — Football Academy",
      eyebrowBadge: "SportsTech & Mobile Engineering",
      headlinePrefix: "Real-Time Mobile Applications. ",
      headlineHighlight: "Engineered for 60 FPS",
      headlineSuffix: " at Any Scale.",
      description: "Polished iOS and Android mobile apps engineered with sub-150ms live match scoring, instant push notifications, automated bracket management, and academy player rosters.",
      primaryCta: { label: "Explore Mobile App Scope", to: "/work" },
      badges: ["React Native Cross-Platform", "Sub-150ms Live WebSockets", "Auto-Bracket Scheduling"],
      badgeTitle: "First Goal FC App",
      badgeSubtitle: "Live Tournament Match Center",
      heroImage: `${cleanBase}images/cs-fitness-app.jpg`,
      thumb1: `${cleanBase}images/zigzag-mobile-application.jpg`,
      thumb2: `${cleanBase}images/mobile-portfolio.jpg`,
      mobileStatLabel: "Match Events",
      mobileStatValue: "12,000+",
      mobileStatSub: "16 Academy Teams Synced",
      urlPath: "arivom.live/work/first-goal-fc",
      liveStatus: "Active Mobile App",
      features: [
        "Real-time live match scoring & push alerts (<150ms)",
        "Automated bracket generation & referee match logs",
        "Academy player profiles, rosters & attendance sync",
      ],
      mobileItems: [
        { title: "U17 Summer Cup (Live 2-1)", status: "Match Center", metric: "Min 78'" },
        { title: "Push Notification Hub", status: "Sub-150ms", metric: "12K alerts" },
        { title: "Academy Roster Manager", status: "Auto-Bracket", metric: "16 teams" },
      ],
      floatingMetric: "12K Match Events",
      icon: Activity,
    },
    {
      id: "enterprise-cloud",
      tabNumber: "03",
      tabTitle: "Enterprise Cloud",
      tabCategory: "Java 21 & Event Streaming",
      tabTech: "Spring Boot 3 • Kafka Engine",
      client: "Enterprise FinTech Microservices",
      eyebrowBadge: "Top 1% Senior Engineering Collective",
      headlinePrefix: "Custom Enterprise Software. ",
      headlineHighlight: "Engineered to Scale",
      headlineSuffix: " from Day 1.",
      description: "Direct access to senior full-stack engineers specializing in Java 21 Virtual Threads, Spring Boot 3 reactive microservices, and Kafka event streaming engines with 99.9% uptime.",
      primaryCta: { label: "Start a Sprint Project", to: "/contact" },
      badges: ["Direct Senior Git Access", "2-Week Agile Sprints", "100% Codebase Handover"],
      badgeTitle: "Arivom Cloud Mesh",
      badgeSubtitle: "1.2M msg/s Streaming Engine",
      heroImage: `${cleanBase}images/hero-enterprise-architecture.jpg`,
      thumb1: `${cleanBase}images/cs-fintech-gateway.jpg`,
      thumb2: `${cleanBase}images/service-cloud-devops.jpg`,
      mobileStatLabel: "Production SLA",
      mobileStatValue: "99.9%",
      mobileStatSub: "1.2M msg/s Throughput",
      urlPath: "arivom.live/architecture/mesh",
      liveStatus: "Verified Production Mesh",
      features: [
        "Distributed Kafka event pipeline with zero consumer lag",
        "Java 21 Virtual Threads & Spring Boot 3 reactive core",
        "Zero-downtime automated blue/green delivery pipeline",
      ],
      mobileItems: [
        { title: "Kafka Event Cluster", status: "Zero Lag", metric: "1.2M msg/s" },
        { title: "Payment Routing Engine", status: "PCI-DSS", metric: "18ms lag" },
        { title: "Kubernetes Auto-Scaler", status: "99.9% SLA", metric: "48 nodes" },
      ],
      floatingMetric: "99.9% SLA Uptime",
      icon: Rocket,
    },
  ]

  const activeProject = projects[activeTab]

  // Typewriter animation state for headline synced to activeTab
  const [typedTitle, setTypedTitle] = useState("")
  const [typedHighlight, setTypedHighlight] = useState("")
  const [typedSuffix, setTypedSuffix] = useState("")

  useEffect(() => {
    let tIdx = 0
    let hIdx = 0
    let sIdx = 0

    setTypedTitle("")
    setTypedHighlight("")
    setTypedSuffix("")

    const cur = projects[activeTab]
    let tInterval: ReturnType<typeof setInterval>
    let hInterval: ReturnType<typeof setInterval>
    let sInterval: ReturnType<typeof setInterval>

    tInterval = setInterval(() => {
      tIdx++
      setTypedTitle(cur.headlinePrefix.slice(0, tIdx))
      if (tIdx >= cur.headlinePrefix.length) {
        clearInterval(tInterval)
        hInterval = setInterval(() => {
          hIdx++
          setTypedHighlight(cur.headlineHighlight.slice(0, hIdx))
          if (hIdx >= cur.headlineHighlight.length) {
            clearInterval(hInterval)
            sInterval = setInterval(() => {
              sIdx++
              setTypedSuffix(cur.headlineSuffix.slice(0, sIdx))
              if (sIdx >= cur.headlineSuffix.length) {
                clearInterval(sInterval)
              }
            }, 18)
          }
        }, 18)
      }
    }, 16)

    return () => {
      clearInterval(tInterval)
      clearInterval(hInterval)
      clearInterval(sInterval)
    }
  }, [activeTab])

  // Auto-advance tabs every 8 seconds unless hovered
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % projects.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [isPaused, projects.length])

  // Mouse 3D parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMouseOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
  }

  // Calculate 3D perspective rotation values
  const desktopRotateX = 4 - mouseOffset.y * 10
  const desktopRotateY = -8 + mouseOffset.x * 12
  const phoneRotateX = 2 - mouseOffset.y * 6
  const phoneRotateY = -3 + mouseOffset.x * 8

  return (
    <section
      className="hero-grid overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-36 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-wide">
        {/* 2-Column Hero Grid: Left Copy & Right 3D Visual */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.15fr]">
          {/* Left Column: Copy & Social Proof Stack */}
          <div className="hero-copy min-w-0 max-w-full">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs backdrop-blur-md">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white shadow-xs">
                <Star size={11} className="fill-white" />
              </span>
              <span key={activeProject.id} className="transition-all duration-300">
                {activeProject.eyebrowBadge}
              </span>
              <span className="text-orange-500 font-bold">›</span>
            </div>

            {/* Main Headline with Highlight Capsule */}
            <h1 className="hero-title mt-4 min-h-[90px] sm:min-h-[105px] lg:min-h-[115px] break-words text-[#0B1437]">
              <span>{typedTitle}</span>
              <span className="relative inline-block px-2.5 py-0.5 rounded-xl bg-[#FFE4A0] text-[#0B1437] font-black shadow-xs ring-1 ring-amber-300/60 leading-tight mx-1">
                {typedHighlight}
              </span>{" "}
              <span>{typedSuffix}</span>
              <span className="inline-block w-[3px] sm:w-[3.5px] h-[0.82em] ml-1 align-middle bg-[#FF6B00] rounded-sm animate-cursor-blink" />
            </h1>

            {/* Subtitle / Description synchronized to active project */}
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 min-h-[48px] transition-opacity duration-300">
              {activeProject.description}
            </p>

            {/* Social Proof / Reviews Avatar Stack */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Senior Architect"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Lead Engineer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Mobile Lead"
                />
              </div>

              <div className="text-xs sm:text-sm text-slate-700">
                <span className="font-bold text-amber-500">★★★★★</span>{" "}
                <span className="font-extrabold text-slate-900">5.0</span>{" "}
                <span className="text-slate-500">(40+ Verified Sprints) • </span>
                <Link
                  to="/work"
                  className="underline font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  See Client Reviews
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={activeProject.primaryCta.to}
                className="button button-primary !rounded-full !px-6 !py-3 text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                {activeProject.primaryCta.label} <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => openAiAssistantWithPrompt()}
                className="button button-secondary !rounded-full !px-5 !py-3 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Bot size={16} className="text-orange-600" />
                Chat with Arivom AI
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
              {activeProject.badges.map((badge, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Multi-Device & Glass HUD Composition */}
          <div
            className="hero-visual relative perspective-1200 group w-full select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-orange-500/15 via-blue-500/10 to-transparent blur-3xl transition-all duration-700 pointer-events-none" />

            {/* 3D Scene Wrapper with Dynamic Mouse Tilt */}
            <div
              className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[510px] preserve-3d transition-transform duration-200 ease-out flex items-center justify-end"
              style={{
                transform: `rotateX(${desktopRotateX}deg) rotateY(${desktopRotateY}deg)`,
              }}
            >
              {/* --- Layer 1: Desktop Browser Dashboard Window (Tilted 3D) --- */}
              <div
                className="relative w-full sm:w-[92%] ml-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] overflow-hidden ring-1 ring-black/5"
                style={{
                  transform: "translateZ(0px)",
                }}
              >
                {/* Browser Titlebar */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white border border-slate-200/70 px-3 py-0.5 text-[10.5px] font-mono text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeProject.urlPath}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 hidden sm:inline-block">
                      {activeProject.liveStatus}
                    </span>
                  </div>
                </div>

                {/* Sub-navigation bar inside browser */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-2 text-xs">
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <span className="text-orange-600 font-bold border-b-2 border-orange-600 pb-1">
                      Live Showcase
                    </span>
                    <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">Architecture</span>
                    <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">Sprint Deliverables</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {activeProject.tabCategory}
                  </span>
                </div>

                {/* Main Media Gallery Section - Left Metrics, Right Hero Showcase (Zero Image Overlap) */}
                <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.35fr] gap-3">
                    {/* Left Inner Column: Metrics & Features (pl reserved for mobile device in foreground) */}
                    <div className="flex flex-col justify-between pl-0 sm:pl-28 py-1 space-y-2.5">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Client Verified Impact
                        </span>
                        <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                          {activeProject.floatingMetric}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {activeProject.tabTech}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {activeProject.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Inner Column: Big, Pristine Hero Showcase Image */}
                    <div className="relative h-[190px] sm:h-[220px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs group/img">
                      <img
                        key={activeProject.id}
                        src={activeProject.heroImage}
                        alt={activeProject.client}
                        className="h-full w-full object-cover transition-all duration-700 ease-out group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                        <span className="font-bold truncate drop-shadow-sm">{activeProject.client}</span>
                        <span className="bg-orange-600/90 text-white font-mono text-[10px] px-2 py-0.5 rounded-md shadow-xs shrink-0">
                          {activeProject.tabCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Layer 2: Foreground Floating Smartphone Mockup (Overlapping & Bobbing) --- */}
              <div
                className="absolute -left-3 sm:-left-6 -bottom-4 sm:-bottom-6 z-20 w-[170px] sm:w-[190px] lg:w-[200px] rounded-[32px] sm:rounded-[36px] border-[5px] border-slate-900 bg-white shadow-[0_25px_50px_-12px_rgba(15,23,42,0.3)] overflow-hidden animate-float-slow select-none hidden sm:block"
                style={{
                  transform: `rotateX(${phoneRotateX}deg) rotateY(${phoneRotateY}deg) translateZ(45px)`,
                }}
              >
                {/* Speaker Notch / Dynamic Island */}
                <div className="bg-slate-900 pt-1.5 pb-1 flex justify-center">
                  <div className="h-2.5 w-14 bg-slate-800 rounded-full" />
                </div>

                {/* Smartphone Status Bar */}
                <div className="flex items-center justify-between px-3 pt-1 text-[9px] font-semibold text-slate-600">
                  <span>9:41</span>
                  <div className="flex items-center gap-1 text-[9px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>5G</span>
                  </div>
                </div>

                {/* Smartphone App Header */}
                <div className="p-2.5 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9.5px] text-slate-500 block">Welcome back</span>
                      <span className="text-[11.5px] font-bold text-slate-900">Alex • Client</span>
                    </div>
                    <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-[10px] font-bold">
                      A
                    </span>
                  </div>

                  {/* Gradient Metric Card */}
                  <div className="mt-2 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 p-2 text-white shadow-md">
                    <span className="text-[9px] uppercase tracking-wider text-blue-200 font-semibold block">
                      {activeProject.mobileStatLabel}
                    </span>
                    <span className="text-lg font-black tracking-tight text-white block mt-0.5">
                      {activeProject.mobileStatValue}
                    </span>
                    <span className="text-[9.5px] text-blue-100 font-medium block mt-0.5">
                      {activeProject.mobileStatSub}
                    </span>
                  </div>

                  {/* Top Deliverables List */}
                  <div className="mt-2">
                    <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Active Sprint Features
                    </span>
                    <div className="space-y-1">
                      {activeProject.mobileItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-md bg-slate-50 p-1.5 border border-slate-100 text-[9.5px]"
                        >
                          <div className="min-w-0 pr-1">
                            <span className="font-semibold text-slate-800 truncate block">
                              {item.title}
                            </span>
                            <span className="text-slate-500 text-[8.5px] truncate block">
                              {item.status}
                            </span>
                          </div>
                          <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded shrink-0">
                            {item.metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Layer 3: Floating 3D Badges (Cleanly Positioned HUD) --- */}
              {/* Badge 1: Top-Right Project Status Pill */}
              <div
                className="absolute -top-4 right-2 sm:right-6 z-30 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 p-2 sm:p-2.5 pr-4 shadow-xl backdrop-blur-md animate-badge-float"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="h-8 w-8 rounded-xl overflow-hidden shadow-xs shrink-0 bg-slate-100">
                  <img
                    src={activeProject.heroImage}
                    alt={activeProject.badgeTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                      {activeProject.badgeTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-orange-600 block">
                    {activeProject.floatingMetric}
                  </span>
                </div>
              </div>
            </div>

            {/* Showcase Slide Pagination Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {projects.map((proj, idx) => {
                const isSelected = idx === activeTab
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`group flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#0B1437] text-white shadow-xs ring-1 ring-orange-500/40"
                        : "bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                    aria-label={`Switch to ${proj.tabTitle}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-300"
                      }`}
                    />
                    <span>{proj.tabTitle}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      {/* 1. High-Impact Unified Hero Banner Slider */}
      <FullHeroBannerSlider />

      {/* 2. Client Domain Bar */}
      <section className="border-y border-slate-200/70 bg-white py-7">
        <div className="container-wide flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-xs font-bold uppercase tracking-[.2em] text-slate-400">
          <span>Trusted Engineering Collective For</span>
          {["FinTech & Payments", "HealthTech & Clinics", "Real Estate Portals", "IoT Industrial", "D2C Brands"].map(
            (item) => (
              <span key={item} className="text-slate-700">
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      {/* 3. Sticky-Scroll 3-Step Process (From Dribbble Video) */}
      <StickyProcessSection />

      {/* 4. Interactive Bento Feature Grid (From Dribbble Video) */}
      <BentoGridSection />

      {/* 5. Persona Advantages Tab Switcher (From Dribbble Video) */}
      <PersonaAdvantagesSection />

      {/* 6. Horizontal Client Deliverables Carousel (From Dribbble Video) */}
      <ClientDeliverablesCarousel />

      {/* 7. AI Co-Pilot 3D Fan Showcase (From Dribbble Video) */}
      <AiCopilotSection />

      {/* 8. Core Service Matrix */}
      <section className="section-space bg-white border-b border-slate-200/70">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What We Build"
            title="Full-Stack Engineering Without Middlemen"
            text="Strategy, system architecture, backend microservices, mobile apps, and cloud deployment from our senior engineers."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  )
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <Link
      to="/work"
      className="group overflow-hidden rounded-3xl bg-white/5 p-3"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={`${project.title} case study`}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-3 pt-5 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-orange-400">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{project.result}</p>
          </div>
          <ExternalLink className="text-slate-500 group-hover:text-orange-400" />
        </div>
      </div>
    </Link>
  )
}

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }
    if (!ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const started = performance.now()
        const duration = 1100
        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(value * eased)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Arivom understood the business problem before touching the code. The result was faster, clearer, and far more polished than our original scope.",
      name: "Meera Krishnan",
      role: "Founder, NexaPay",
    },
    {
      quote:
        "Weekly demos made the entire build feel transparent. We launched on schedule and saw adoption improve from the first week.",
      name: "Aarav Menon",
      role: "Product Lead, CareFlow",
    },
    {
      quote:
        "The team brought product thinking, not just execution. Every recommendation connected back to a measurable customer outcome.",
      name: "Nisha Rao",
      role: "Director, Northstar Commerce",
    },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % testimonials.length),
      5200,
    )
    return () => window.clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="section-space bg-white">
      <div className="container-wide">
        <SectionHeading
          center
          eyebrow="Client perspective"
          title="Trusted for the way we work."
        />
        <div className="testimonial-stage mx-auto mt-12 max-w-3xl text-center">
          <Quote className="mx-auto text-orange-400" size={36} />
          <div key={active} className="testimonial-slide">
            <blockquote className="mt-6 text-xl leading-9 font-semibold text-[#111a2e] sm:text-2xl">
              “{testimonials[active].quote}”
            </blockquote>
            <p className="mt-7 font-bold text-[#111a2e]">
              {testimonials[active].name}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {testimonials[active].role}
            </p>
          </div>
          <div
            className="mt-8 flex justify-center gap-2"
            aria-label="Choose testimonial"
          >
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setActive(index)}
                className={`slider-dot ${
                  active === index ? "slider-dot-active" : ""
                }`}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={active === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    [
      "01",
      "Discover",
      "We align on users, outcomes, scope, and the smartest path to value.",
    ],
    [
      "02",
      "Design",
      "We shape flows, validate direction, and create an implementation-ready system.",
    ],
    [
      "03",
      "Build",
      "We ship in focused sprints with demos, testing, and transparent progress.",
    ],
    [
      "04",
      "Grow",
      "We launch safely, measure impact, and keep improving what matters.",
    ],
  ]
  return (
    <section className="section-space">
      <div className="container-wide">
        <SectionHeading
          center
          eyebrow="How we work"
          title="Clear process. No black boxes."
          text="You always know what’s happening, why it matters, and what comes next."
        />
        <div className="relative mt-14 grid gap-5 md:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <div className="card relative p-6" key={number}>
              <span className="text-4xl font-black text-orange-100">
                {number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#111a2e]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string
  title: string
  text: string
  children?: React.ReactNode
}) {
  return (
    <section className="hero-grid border-b border-slate-200/70 pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pt-44 text-center">
      <div className="container-wide">
        <div className="page-hero-copy mx-auto max-w-4xl px-3 sm:px-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1437] mt-5 max-w-3xl mx-auto leading-[1.18] break-words">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            {text}
          </p>
          {children}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Technology that earns its place in your business."
        text="From first sketch to production scale, we combine product thinking with dependable engineering."
      >
        <div className="mt-8">
          <Link to="/contact" className="button button-primary">
            Discuss your project <ArrowRight size={17} />
          </Link>
        </div>
      </PageHero>
      <section className="section-space">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="A complete partner"
              title="Senior expertise at every stage."
              text="We plug into your team where you need us most—or own the full journey from discovery to launch."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Product strategy",
                "UX research",
                "Interface design",
                "Frontend engineering",
                "Backend & APIs",
                "Quality assurance",
                "Cloud deployment",
                "Ongoing optimization",
              ].map((item) => (
                <div
                  className="flex items-center gap-3 text-sm font-medium"
                  key={item}
                >
                  <CheckCircle2 size={18} className="text-emerald-600" /> {item}
                </div>
              ))}
            </div>
          </div>
          <img
            src={photos.collaboration}
            alt="Team collaborating on a digital product"
            className="h-[480px] w-full rounded-[28px] object-cover shadow-xl"
          />
        </div>
      </section>
      <CTA />
    </>
  )
}

function ServiceDetail() {
  const slug = useLocation().pathname.split("/").pop()
  const service = services.find((item) => item.slug === slug) || services[0]
  const Icon = service.icon
  return (
    <>
      <PageHero
        eyebrow="Specialist service"
        title={service.title}
        text={service.summary}
      >
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/contact" className="button button-primary">
            Get a project estimate <ArrowRight size={17} />
          </Link>
          <Link to="/work" className="button button-secondary">
            See related work
          </Link>
        </div>
      </PageHero>
      <section className="section-space">
        <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="card h-fit p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
              <Icon size={26} />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-[#111a2e]">
              What you get
            </h2>
            <div className="mt-5 space-y-4">
              {[
                "Dedicated senior specialist",
                "Weekly demos and progress reports",
                "Production-ready, documented delivery",
                "30 days post-launch support",
              ].map((item) => (
                <div className="flex gap-3 text-sm text-slate-600" key={item}>
                  <Check size={18} className="shrink-0 text-emerald-600" />{" "}
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Built the right way"
              title={`A focused ${service.title.toLowerCase()} team, shaped around your goal.`}
              text="We avoid one-size-fits-all delivery. Your roadmap, architecture, and engagement model are designed around the outcome you need and the constraints you have."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                [
                  "Fast validation",
                  "Prototype the riskiest assumptions before investing in a full build.",
                ],
                [
                  "Scalable foundation",
                  "Clean architecture and standards that make future growth easier.",
                ],
                [
                  "Visible progress",
                  "Frequent releases, practical documentation, and no surprise invoices.",
                ],
                [
                  "Quality included",
                  "Accessibility, performance, security, and testing from the start.",
                ],
              ].map(([title, text]) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                  key={title}
                >
                  <h3 className="font-bold text-[#111a2e]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Process />
      <CTA />
    </>
  )
}

function Work() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))]
  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter)
  return (
    <>
      <PageHero
        eyebrow="Portfolio & trust"
        title="Work that makes the metric move."
        text="A selection of digital products and production platforms designed and engineered by our senior squad."
      />
      <section className="section-space">
        <div className="container-wide">
          <div className="portfolio-tabs mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setFilter(category)}
                className={`portfolio-tab ${
                  filter === category ? "portfolio-tab-active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="space-y-8">
            {visibleProjects.map((project, index) => (
              <article
                key={`${filter}-${project.title}`}
                className="card project-row grid overflow-hidden lg:grid-cols-2"
              >
                <div
                  className={`overflow-hidden relative ${index % 2 ? "lg:order-2" : ""}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    className="h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {"logo" in project && project.logo && (
                    <div className="absolute top-4 left-4 rounded-xl bg-black/90 backdrop-blur-md px-3.5 py-2 border border-white/20 shadow-xl flex items-center">
                      <img
                        src={project.logo}
                        alt="Brand Logo"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-[.18em] text-orange-600">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-orange-100/70 border border-orange-200/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-orange-800">
                      {project.badge}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#111a2e]">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono font-bold text-slate-800">
                      ⚡ {project.architecture}
                    </span>
                    <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
                      ⏱ {project.sprints}
                    </span>
                    <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
                      👥 {project.team}
                    </span>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-mono text-orange-600">
                        {project.result.split(" ")[0]}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 font-medium">
                        Measured Impact ({project.result.substring(project.result.indexOf(" ") + 1)})
                      </p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-mono text-[#111a2e]">
                        {project.sprints}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 font-medium">
                        To Production
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="animated-link inline-flex items-center gap-2 font-bold text-orange-600 text-sm"
                    >
                      Build something like this <ArrowRight size={17} />
                    </Link>
                    {project.url && project.url !== '#' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-mono"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-[#111a2e] text-white">
        <div className="container-wide grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            [50, "+", 0, "Projects shipped"],
            [14, "", 0, "Industries served"],
            [96, "%", 0, "On-time delivery"],
            [4.9, "/5", 1, "Average rating"],
          ].map(([number, suffix, decimals, label]) => (
            <div key={label}>
              <p className="text-4xl font-black text-orange-400">
                <AnimatedCounter
                  value={number as number}
                  suffix={suffix as string}
                  decimals={decimals as number}
                />
              </p>
              <p className="mt-2 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}

function Pricing() {
  return <ProjectScopeEstimator />
}

function FAQ() {
  const [open, setOpen] = useState(0)
  const items = [
    [
      "How do your engagement models and sprint milestones work?",
      "We don't offer rigid commodity packages. We structure engagements around your exact technical requirements, sprint velocity, and team capacity. After a short discovery call, we provide a transparent sprint roadmap with clear deliverables and no hidden fees.",
    ],
    [
      "Can we begin with a small discovery phase?",
      "Yes! A one-to-two week architecture discovery sprint is often the best way to clarify scope, validate system feasibility, and create an actionable implementation blueprint.",
    ],
    [
      "Do you work with existing products and codebases?",
      "Absolutely. We frequently audit, redesign, modernize, or extend existing products while working safely within your current tech stack (e.g., monolith to microservices migrations).",
    ],
    [
      "What happens after launch?",
      "Every launch includes 30 to 60 days of complimentary stabilization support and warranty. We also offer dedicated monthly squad capacity for product improvements, monitoring, and new features.",
    ],
  ]
  return (
    <div className="faq-list mx-auto mt-10 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
      {items.map(([question, answer], index) => (
        <div key={question}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 py-6 text-left font-bold text-[#111a2e]"
            aria-expanded={open === index}
            aria-controls={`faq-answer-${index}`}
          >
            {question}
            <ChevronDown
              className={`shrink-0 transition ${
                open === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`accordion-content ${
              open === index ? "accordion-open" : ""
            }`}
          >
            <div>
              <p className="pb-6 pr-8 text-sm leading-7 text-slate-600">
                {answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Technology() {
  const groups = [
    [
      "Backend & Microservices",
      Blocks,
      [
        "Java 21",
        "Spring Boot 3",
        "Spring Cloud Gateway",
        "REST & gRPC",
        "Virtual Threads",
      ],
    ],
    [
      "Frontend Architecture",
      Code2,
      [
        "React 19",
        "Angular Signals",
        "TypeScript",
        "Tailwind CSS v4",
        "Next.js",
      ],
    ],
    [
      "Mobile Engineering",
      Smartphone,
      [
        "React Native",
        "iOS Native Bridge",
        "Android Kotlin",
        "Offline-First SQLite",
      ],
    ],
    [
      "Cloud & DevOps",
      Cloud,
      [
        "Kubernetes (K8s)",
        "Docker OCI",
        "AWS & GCP",
        "GitHub Actions",
        "Cloudflare Edge",
      ],
    ],
    [
      "Databases & Persistence",
      Database,
      [
        "PostgreSQL 16",
        "MongoDB",
        "Redis Caching",
        "HikariCP Pooling",
        "Debezium CDC",
      ],
    ],
    [
      "AI & Intelligent Workflows",
      Sparkles,
      [
        "Gemini 2.0 API",
        "LangChain",
        "Vector RAG",
        "Automated Pipelines",
        "Python FastAPI",
      ],
    ],
  ] as const

  return (
    <>
      <PageHero
        eyebrow="Our technology stack"
        title="Modern tools. Sound engineering judgment."
        text="A boutique senior engineering collective engineering high-throughput Spring Boot microservices, fluid React / React Native applications, and automated cloud infrastructure."
      />

      {/* Solar Circle Orbit System for the Complete Tech Stack */}
      <TechStackSolarOrbit />

      {/* Categorized Tech Stack Grid */}
      <section className="section-space bg-slate-50/60 border-b border-slate-200/60">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Full-Stack Specialization"
            title="Senior Engineering Across Every Layer"
            text="Every tool in our stack is chosen for predictable low latency, strict type safety, and zero-downtime deployment."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(([name, Icon, items]) => (
              <div className="card p-7 flex flex-col justify-between" key={name}>
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600">
                    <Icon size={23} />
                  </span>
                  <h2 className="mt-6 text-xl font-bold text-[#111a2e]">{name}</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span className="pill !px-3 !py-2" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#111a2e] text-white">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Engineering principles"
              title="Production-ready means more than working code."
              text="Security, accessibility, performance, observability, and maintainability are part of the build—not optional extras."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [ShieldCheck, "Secure by default"],
              [Zap, "Performance budgets (< 5ms)"],
              [Globe2, "Zero data loss semantics"],
              [BarChart3, "100K+ TPS event streaming"],
            ].map(([Icon, label]) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                key={label as string}
              >
                <Icon className="text-orange-400" />
                <p className="mt-4 font-bold">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}

function About() {
  return <AboutCompanyView />
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.classList.add("form-invalid")
      form.reportValidity()
      window.setTimeout(() => form.classList.remove("form-invalid"), 450)
      return
    }
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 850)
  }
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Tell us what you want to build."
        text="Share the idea, challenge, or goal. We’ll reply within one business day with a useful next step."
      />
      <section className="section-space">
        <div className="container-wide grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-bold text-[#111a2e]">
              Talk directly with the team.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              No sales desk. Your first conversation is with the people who will
              shape and build your product.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:arivomtechnologies@gmail.com"
                className="card flex items-center gap-4 p-5 hover:border-orange-400 transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-600">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Email us</p>
                  <p className="mt-1 text-sm font-bold">
                    arivomtechnologies@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="https://wa.me/916369012607?text=Hi%20Arivom%20Technologies,%20I%20have%20an%20engineering%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 hover:border-emerald-400 transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">WhatsApp / Direct Call</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    +91 63690 12607
                  </p>
                </div>
              </a>
              <div className="card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-600">
                  <Globe2 size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Locations & Availability</p>
                  <p className="mt-1 text-sm font-bold">
                    Chennai &amp; Tirunelveli • Remote Worldwide
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-slate-600">
              <strong className="text-[#111a2e]">What happens next?</strong>
              <p className="mt-2">
                A 30-minute discovery call, a clear scope recommendation, then a
                detailed proposal if we’re a fit.
              </p>
            </div>
          </div>
          <div className="card p-6 sm:p-9">
            {sent ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={30} />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-[#111a2e]">
                  Your brief is on its way.
                </h2>
                <p className="mt-3 max-w-md text-slate-600">
                  Thanks for reaching out. We’ll review the details and reply
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="button button-secondary mt-7"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                  />
                  <Field
                    label="Work email"
                    name="email"
                    placeholder="jane@company.com"
                    type="email"
                    required
                  />
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Your company"
                  />
                  <label className="form-label">
                    Engagement model
                    <select
                      className="form-input mt-2"
                      name="engagementModel"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a model
                      </option>
                      <option>Dedicated Senior Developer Squad</option>
                      <option>Sprint-Based Milestone Delivery (2-Week Sprints)</option>
                      <option>Fixed-Scope MVP &amp; Platform Launch</option>
                      <option>Strategic Architecture Advisory &amp; Modernization</option>
                    </select>
                  </label>
                </div>
                <label className="form-label mt-5 block">
                  What can we help you build?
                  <select
                    className="form-input mt-2"
                    name="service"
                    defaultValue="Web development"
                  >
                    {services.map((service) => (
                      <option key={service.slug}>{service.title}</option>
                    ))}
                  </select>
                </label>
                <label className="form-label mt-5 block">
                  Project details
                  <textarea
                    className="form-input mt-2 min-h-36 resize-y"
                    required
                    name="details"
                    placeholder="Tell us about the goal, current stage, and ideal timeline..."
                  />
                </label>
                <button
                  type="submit"
                  className="button button-primary mt-6 w-full sm:w-auto"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      Sending{" "}
                      <LoaderCircle className="loading-spinner" size={17} />
                    </>
                  ) : (
                    <>
                      Send project brief <ArrowRight size={17} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-xs text-slate-500">
                  By submitting, you agree to be contacted about your project.
                  No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="form-label">
      {label}
      <input
        className="form-input mt-2"
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  )
}

function CTA() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="container-wide overflow-hidden rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-[#ff6b24] to-[#ff8a1f] px-5 py-10 sm:px-12 sm:py-14 text-center text-white shadow-[0_25px_60px_rgba(255,107,36,.22)]">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-100">
          Have an idea in mind?
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl sm:text-4xl font-extrabold tracking-tight">
          Let’s turn it into your next growth engine.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-orange-50">
          A focused discovery call is all it takes to find the right first step.
        </p>
        <Link to="/contact" className="button button-light mt-7">
          Book a free consultation <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center px-6 pt-28 text-center">
      <div>
        <p className="text-8xl font-black text-orange-200">404</p>
        <h1 className="mt-4 text-3xl font-bold text-[#111a2e]">
          This page isn’t in the roadmap.
        </h1>
        <p className="mt-3 text-slate-600">
          Let’s get you back to something useful.
        </p>
        <Link to="/" className="button button-primary mt-7">
          Back to home <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "services", Component: Services },
        { path: "services/:slug", Component: ServiceDetail },
        { path: "work", Component: Work },
        { path: "pricing", Component: Pricing },
        { path: "estimator", Component: Pricing },
        { path: "technology", Component: Technology },
        { path: "about", Component: About },
        { path: "contact", Component: Contact },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)
