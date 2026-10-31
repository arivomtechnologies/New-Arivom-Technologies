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
  ChevronLeft,
  ChevronRight,
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

function TypewriterHeroHeadline() {
  const staticPrefix = "Custom Enterprise Software."
  const dynamicPhrases = [
    { gradient: "Engineered to Scale", suffix: " from Day 1." },
    { gradient: "Java 21 & Spring Boot 3", suffix: " Architecture." },
    { gradient: "React 19 & React Native", suffix: " Full-Stack." },
    { gradient: "High-Throughput", suffix: " with Kafka & Cloud." },
  ]

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayedPrefix, setDisplayedPrefix] = useState("")
  const [displayedGradient, setDisplayedGradient] = useState("")
  const [displayedSuffix, setDisplayedSuffix] = useState("")
  const [phase, setPhase] = useState<"prefix" | "gradient" | "suffix" | "pause" | "deleting">("prefix")

  // Initial prefix typing on mount (letter by letter)
  useEffect(() => {
    let currentLen = 0
    const interval = setInterval(() => {
      currentLen++
      setDisplayedPrefix(staticPrefix.slice(0, currentLen))
      if (currentLen >= staticPrefix.length) {
        clearInterval(interval)
        setPhase("gradient")
      }
    }, 38)
    return () => clearInterval(interval)
  }, [])

  // Dynamic phrase typing & cycling (letter by letter)
  useEffect(() => {
    if (phase === "prefix") return

    const currentPhrase = dynamicPhrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === "gradient") {
      if (displayedGradient.length < currentPhrase.gradient.length) {
        timeout = setTimeout(() => {
          setDisplayedGradient(currentPhrase.gradient.slice(0, displayedGradient.length + 1))
        }, 36)
      } else {
        setPhase("suffix")
      }
    } else if (phase === "suffix") {
      if (displayedSuffix.length < currentPhrase.suffix.length) {
        timeout = setTimeout(() => {
          setDisplayedSuffix(currentPhrase.suffix.slice(0, displayedSuffix.length + 1))
        }, 36)
      } else {
        setPhase("pause")
      }
    } else if (phase === "pause") {
      // Hold for 5.5s so user can read comfortably
      timeout = setTimeout(() => {
        setPhase("deleting")
      }, 5500)
    } else if (phase === "deleting") {
      if (displayedSuffix.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedSuffix((prev) => prev.slice(0, -1))
        }, 22)
      } else if (displayedGradient.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedGradient((prev) => prev.slice(0, -1))
        }, 22)
      } else {
        // Switch to next phrase
        setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length)
        setPhase("gradient")
      }
    }

    return () => clearTimeout(timeout)
  }, [phase, displayedGradient, displayedSuffix, phraseIndex])

  return (
    <h1 className="hero-title mt-6 min-h-[140px] sm:min-h-[160px] lg:min-h-[190px]">
      <span className="text-[#0B1437]">{displayedPrefix}</span>{" "}
      <span className="text-gradient font-black">{displayedGradient}</span>
      <span className="text-[#0B1437]">{displayedSuffix}</span>
      <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.82em] ml-1.5 align-middle bg-[#FF6B00] rounded-sm animate-cursor-blink" />
    </h1>
  )
}

function HeroBannerCarousel() {
  const slides = [
    {
      id: "architecture",
      tabLabel: "Cloud & Kafka",
      image: `${cleanBase}images/hero-enterprise-architecture.jpg`,
      tag: "Production Architecture",
      title: "Java 21 + Spring Boot 3 + Kafka",
      subtitle: "High-throughput event streaming & enterprise microservices",
      metricValue: 99.9,
      metricDecimals: 1,
      metricSuffix: "%",
      metricLabel: "Production SLA Uptime",
      badgePill: "1.2M msg/s Throughput",
      icon: Rocket,
    },
    {
      id: "developer",
      tabLabel: "Full-Stack & Mobile",
      image: `${cleanBase}images/hero-developer-workspace.jpg`,
      tag: "Full-Stack Ecosystem",
      title: "React 19 + Next.js & React Native",
      subtitle: "Web applications & cross-platform iOS/Android apps",
      metricValue: 100,
      metricDecimals: 0,
      metricSuffix: "/100",
      metricLabel: "Lighthouse Performance",
      badgePill: "60 FPS Fluid Gestures",
      icon: Code2,
    },
    {
      id: "ai",
      tabLabel: "AI Multi-Agent",
      image: `${cleanBase}images/hero-ai-automation-agents.jpg`,
      tag: "Autonomous Systems",
      title: "Gemini 2.5 + Multi-Agent Orchestration",
      subtitle: "Intelligent autonomous agent workflows embedded into production",
      metricValue: 10,
      metricDecimals: 0,
      metricSuffix: "x",
      metricLabel: "Operational Velocity",
      badgePill: "Neural Multi-Agent Mesh",
      icon: Bot,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  const activeSlide = slides[current]
  const Icon = activeSlide.icon

  return (
    <div
      className="hero-visual relative perspective-1000 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Backdrop Glow */}
      <div className="hero-glow absolute -inset-8 rounded-full bg-gradient-to-tr from-orange-500/25 via-amber-500/15 to-transparent blur-3xl transition-all duration-700 group-hover:from-orange-500/35" />

      {/* Titanium Glass Command Console Frame */}
      <div className="relative overflow-hidden rounded-[28px] border border-slate-700/60 bg-[#0B1437]/95 p-3.5 sm:p-4 shadow-[0_30px_90px_rgba(11,20,55,0.45)] ring-1 ring-white/10 backdrop-blur-2xl">
        {/* Top Window Titlebar & Architecture Tabs */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 px-1">
          {/* Traffic Lights & Live Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-xs" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-xs" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-xs" />
            </div>
            <div className="hidden xs:flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10.5px] font-mono text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>prod-mesh.arivom.live</span>
            </div>
          </div>

          {/* Interactive Architecture Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {slides.map((slide, idx) => {
              const isSelected = idx === current
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{slide.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main 16:9 Cinema Viewport */}
        <div className="relative h-[340px] w-full overflow-hidden rounded-[20px] bg-slate-950 sm:h-[450px]">
          {slides.map((slide, index) => {
            const isActive = index === current
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-100" : "scale-105"
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1437]/95 via-[#0B1437]/35 to-transparent" />
              </div>
            )
          })}

          {/* Top-Left Telemetry Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10.5px] font-mono font-semibold text-orange-300 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-ping" />
              {activeSlide.badgePill}
            </span>
          </div>

          {/* Prev / Next Arrows */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white border border-white/10 backdrop-blur-md hover:bg-orange-500 hover:border-orange-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous banner"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white border border-white/10 backdrop-blur-md hover:bg-orange-500 hover:border-orange-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Next banner"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bottom Integrated Architecture HUD Bar */}
          <div className="absolute right-4 bottom-7 left-4 z-20 sm:left-6 sm:right-6 sm:bottom-9">
            <div className="flex max-w-[95%] items-center justify-between rounded-2xl border border-white/20 bg-[#0B1437]/90 p-3.5 sm:p-4 text-white shadow-2xl backdrop-blur-xl">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[10px] uppercase tracking-[.2em] text-orange-300 font-mono font-bold truncate">
                    {activeSlide.tag}
                  </p>
                </div>
                <p className="mt-1 font-bold text-white text-sm sm:text-base tracking-tight truncate">
                  {activeSlide.title}
                </p>
                <p className="hidden sm:block text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {activeSlide.subtitle}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md">
                <Icon size={18} />
              </span>
            </div>
          </div>

          {/* Bottom Slide Progress Indicators */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === current ? "w-7 bg-orange-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating SLA & Verified Metric Badge */}
      <div className="floating-badge absolute -right-2 -bottom-5 z-20 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 sm:p-4 shadow-2xl sm:-right-8 transition-all duration-500 hover:scale-105 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-mono">
            Verified Production SLA
          </span>
        </div>
        <p className="mt-1 text-2xl sm:text-3xl font-black text-[#0B1437] tracking-tight">
          <AnimatedCounter
            key={activeSlide.id}
            value={activeSlide.metricValue}
            decimals={activeSlide.metricDecimals}
            suffix={activeSlide.metricSuffix}
          />
        </p>
        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          {activeSlide.metricLabel}
        </p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      {/* 1. High-Impact Hero with Senior Engineering Collective Identity */}
      <section className="hero-grid overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              Senior Engineering Collective • Zero Agency Bloat
            </div>

            {/* Letter-by-Letter Animated Headline */}
            <TypewriterHeroHeadline />

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 animate-fade-in-up delay-200">
              Direct access to senior full-stack engineers specializing in Java 21, Spring Boot 3, React 19 / Angular Signals, and React Native mobile apps.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row animate-fade-in-up delay-400">
              <Link to="/contact" className="button button-primary">
                Start a Sprint Project <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openAiAssistantWithPrompt()}
                className="button button-secondary cursor-pointer flex items-center gap-2"
              >
                <Bot size={18} className="text-orange-600" />
                Chat with Arivom AI
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-600 animate-fade-in-up delay-600">
              {[
                "Direct Senior Git Access",
                "2-Week Agile Sprints",
                "100% Codebase Handover",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-600" /> {item}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Multi-Slide Hero Banner */}
          <HeroBannerCarousel />
        </div>
      </section>

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
    <section className="hero-grid border-b border-slate-200/70 pb-20 pt-36 text-center lg:pt-44">
      <div className="container-wide">
        <div className="page-hero-copy mx-auto max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="hero-title mt-6">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
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
                    className="h-full min-h-[360px] w-full object-cover transition-transform duration-700 hover:scale-105"
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
                <div className="flex flex-col justify-center p-8 lg:p-12">
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
        <div className="container-wide grid gap-8 text-center sm:grid-cols-4">
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
    <section className="px-4 py-16 sm:px-6">
      <div className="container-wide overflow-hidden rounded-[32px] bg-gradient-to-r from-[#ff6b24] to-[#ff8a1f] px-6 py-14 text-center text-white shadow-[0_25px_60px_rgba(255,107,36,.22)] sm:px-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-100">
          Have an idea in mind?
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Let’s turn it into your next growth engine.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-orange-50">
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
