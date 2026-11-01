import { useState } from "react"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router"

interface ClientProject {
  title: string
  category: string
  result: string
  url: string
  image: string
  badge: string
  architecture: string
  sprints: string
  team: string
  description: string
  logo?: string
}

const base = import.meta.env.BASE_URL || "/"
const cleanBase = base.endsWith("/") ? base : `${base}/`

const deliverables: ClientProject[] = [
  {
    title: "KB Homes",
    category: "Architecture & Luxury Construction",
    result: "+380% qualified construction inquiries",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    logo: `${cleanBase}images/kb-homes-logo.png`,
    badge: "Production Portal • Architects & Builders",
    architecture: "React 19 + TypeScript + Cloudflare Edge",
    sprints: "2 Agile Sprints",
    team: "Senior Frontend & Architecture Squad",
    description:
      "Bespoke digital portal for KB Homes architects and builders featuring high-resolution architectural project portfolio, 3D elevation showcases, interactive floorplan viewer, and direct WhatsApp project inquiry routing.",
  },
  {
    title: "First Goal FC",
    category: "SportsTech & Tournament Management",
    result: "12,000+ match events & live scoring",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=85",
    badge: "Mobile App • iOS & Android",
    architecture: "React Native + Spring Boot 3 + WebSockets",
    sprints: "4 Agile Sprints",
    team: "Senior Mobile & Real-Time Backend Squad",
    description:
      "Cross-platform mobile application and tournament manager for First Goal FC football academy. Features live match center, instant push notifications for goals and penalties, automated bracket scheduling, and academy player rosters.",
  },
  {
    title: "La Castle Homes",
    category: "Real Estate & Architecture",
    result: "+420% qualified buyer inquiries",
    url: "https://lacastlehomes.com/",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
    badge: "Live Website • Verified Client",
    architecture: "React + Node + Cloudflare CDN",
    sprints: "2 Sprints (Fast-Track)",
    team: "Senior Frontend & Cloud Engineers",
    description:
      "Luxury architectural residential villas and commercial landmarks portal. Delivered ahead of schedule with sub-second page loads and direct inquiry routing.",
  },
  {
    title: "Phoenix Print Solution",
    category: "Industrial IoT & Automation",
    result: "10,000+ daily orders automated",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    badge: "Production System • Active",
    architecture: "Java 21 + Spring Boot 3 + PostgreSQL",
    sprints: "4 Agile Sprints",
    team: "Senior Backend & Architecture Squad",
    description:
      "High-volume prepress and offset printing workflow tracking software eliminating departmental bottlenecks and paper job slips.",
  },
  {
    title: "Sri Ramana Dental Clinic",
    category: "HealthTech & Clinic Management",
    result: "3,200+ digital appointments booked",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    badge: "HIPAA-Ready Clinic Portal",
    architecture: "Angular Signals + Spring Cloud",
    sprints: "3 Sprints",
    team: "Senior Full-Stack Engineering Squad",
    description:
      "Comprehensive multi-doctor clinic management platform with automated SMS reminders, digital prescription records, and consultation queues.",
  },
  {
    title: "BeeWell Organic Honey",
    category: "D2C E-Commerce & Logistics",
    result: "2.8x conversion lift & zero dropped carts",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1400&q=85",
    badge: "High-Traffic D2C Store",
    architecture: "React Native + Headless PostgreSQL",
    sprints: "3 Sprints",
    team: "Senior Mobile & Full-Stack Squad",
    description:
      "Artisanal organic honey direct-to-consumer store with Razorpay payment processing, instant WhatsApp tracking, and farm-to-bottle batch traceability.",
  },
]

export function ClientDeliverablesCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? deliverables.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === deliverables.length - 1 ? 0 : prev + 1))
  }

  const current = deliverables[currentIdx]

  return (
    <section className="section-space bg-white border-b border-slate-200/70">
      <div className="container-wide">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 anim-up">
          <div>
            <div className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Verified Client Deliverables
            </div>
            <h2 className="section-title mt-5">
              Production Systems Shipped by Our Squad
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-sm font-bold text-slate-500 mr-2">
              0{currentIdx + 1} / 0{deliverables.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous deliverable"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-orange-500 hover:text-orange-600 transition shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next deliverable"
              className="grid h-11 w-11 place-items-center rounded-full bg-orange-600 text-white hover:bg-orange-500 transition shadow-md shadow-orange-500/20 cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Deliverable Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl overflow-hidden grid lg:grid-cols-2 anim-scale">
          {/* Image & Frosted Overlays */}
          <div className="relative h-[360px] sm:h-[440px] lg:h-full overflow-hidden anim-left anim-image image-reveal-wrapper">
            <img
              src={current.image}
              alt={current.title}
              className="h-full w-full object-cover transition-transform duration-700 hover-zoom-img hover:scale-105"
            />
            <div className="image-curtain" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

            {/* Frosted Badges Overlaid on Photo */}
            <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2 z-10">
              <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-mono font-bold text-slate-900 shadow-sm">
                ▲ {current.badge}
              </span>
              {current.logo && (
                <div className="rounded-full bg-black/90 backdrop-blur-md px-3 py-1 border border-white/20 shadow-md flex items-center">
                  <img
                    src={current.logo}
                    alt={`${current.title} Logo`}
                    className="h-4 w-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div className="absolute bottom-5 left-5 right-5 glass-pill-dark p-4 rounded-2xl z-10">
              <p className="text-[11px] uppercase tracking-wider text-orange-400 font-mono font-bold">
                Measured Business Impact
              </p>
              <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {current.result}
              </p>
            </div>
          </div>

          {/* Details & Dotted Leader Metrics */}
          <div className="p-6 sm:p-10 flex flex-col justify-between anim-right">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600">
                {current.category}
              </span>
              <h3 className="mt-3 text-3xl font-extrabold text-[#111a2e]">
                {current.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Dotted Leader Rows */}
              <div className="mt-8 space-y-4 pt-6 border-t border-slate-100 text-xs sm:text-sm">
                <div className="dotted-leader">
                  <span className="dotted-leader-label text-slate-500">
                    Architecture
                  </span>
                  <span className="dotted-leader-value font-mono font-bold text-slate-900">
                    {current.architecture}
                  </span>
                </div>

                <div className="dotted-leader">
                  <span className="dotted-leader-label text-slate-500">
                    Timeline
                  </span>
                  <span className="dotted-leader-value font-mono font-bold text-orange-600">
                    {current.sprints}
                  </span>
                </div>

                <div className="dotted-leader">
                  <span className="dotted-leader-label text-slate-500">
                    Team Squad
                  </span>
                  <span className="dotted-leader-value font-mono font-bold text-slate-900">
                    {current.team}
                  </span>
                </div>

                <div className="dotted-leader">
                  <span className="dotted-leader-label text-slate-500">
                    Code Handover
                  </span>
                  <span className="dotted-leader-value font-mono font-bold text-emerald-600">
                    100% Client Ownership
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {current.url !== "#" ? (
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
                >
                  Visit Live Platform <ExternalLink size={16} />
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-500">
                  Client NDA Verified
                </span>
              )}

              <Link
                to="/contact"
                className="button button-primary !py-2.5 !px-5 text-xs"
              >
                Build a Similar Product &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
