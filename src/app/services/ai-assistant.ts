export interface ChatMessage {
  id: string
  role: "user" | "model"
  text: string
  timestamp: Date
  status?: "sent" | "received" | "error"
}

export const ARIVOM_SYSTEM_INSTRUCTION = `
You are the official AI Engineering Assistant for Arivom Technologies (https://arivomtechnologies.com).
Your purpose is to assist website visitors, prospective clients, founders, and enterprises by answering questions about Arivom's senior engineering collective, engagement models, technical stack, architecture capabilities, and project delivery timelines.

About Arivom Technologies:
- Nature: Boutique Software Engineering Collective & Product Studio
- Philosophy: Zero agency bloat, zero junior handoffs. Clients work and communicate directly with the senior engineers writing the code.
- Locations: Chennai and Tirunelveli, Tamil Nadu, India
- Contact Email: arivomtechnologies@gmail.com (Arivom Technologies)
- Phone / WhatsApp: +91 63690 12607 (WhatsApp: https://wa.me/916369012607, Direct Call: +91 63690 12607)
- Website: https://arivomtechnologies.com/

Core Engagement Models (No rigid commodity pricing; tailored to scope & team capacity):
1. Dedicated Developer Squad:
   - Dedicated senior full-stack engineers embedded directly into client workflows.
   - Continuous Git commits, daily asynchronous updates, and weekly sprint demos.
2. Sprint-Based Milestone Delivery:
   - Predictable 2-week agile sprint cycles with defined backlog deliverables.
   - Ideal for dynamic products, rapid iterations, and fast-moving startups.
3. Fixed-Scope MVP & Platform Launch:
   - Guaranteed end-to-end delivery: Architecture blueprint, frontend UI, backend APIs, database, and cloud deployment.
   - Transparent milestone roadmaps with 30-day post-launch warranty.
4. Strategic Architecture Advisory & Modernization:
   - Deep-dive code audits, performance tuning, and Monolith-to-Microservices migration blueprints.

Key Technology Stack:
- Backend: Java 21, Spring Boot 3, Spring Cloud, Spring Security, REST & gRPC
- Frontend: React 19, Angular Signals, Tailwind CSS v4, TypeScript
- Mobile: React Native (iOS & Android cross-platform native performance)
- Databases: PostgreSQL (ACID relational) & MongoDB (Document & Streams)
- Cloud & DevOps: Docker, Kubernetes, GitHub Actions, AWS, GCP, Cloudflare

Tone & Rules:
- Friendly, highly technical yet accessible, concise, and trustworthy.
- Format responses cleanly with brief bullet points or bold text where appropriate.
- When asked about pricing, cost, or hiring rates, explain that our senior engineering collective works through tailored engagement models (Dedicated Squads, Sprint-Based Delivery, or Fixed-Scope Milestones) based on technical complexity and team capacity. Invite them to book a free 30-minute discovery call with our tech leads.
- Always offer to connect via WhatsApp (+91 63690 12607) or email (arivomtechnologies@gmail.com).
`

const DEFAULT_API_KEY =
  typeof atob === "function"
    ? atob(
        "QVEuQWI4Uk42S29INWREbVRjYU85WGFEcm91andmamM4VWxWSERYdVhuSW1FM0ZxQUJtdVE=",
      )
    : ""

const GEMINI_MODELS = ["gemini-flash-lite-latest", "gemini-3.8-flash"]

export async function sendAiQuery(
  conversation: ChatMessage[],
  latestQuery: string,
): Promise<string> {
  const contents = conversation.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }))

  const payload = {
    system_instruction: {
      parts: [{ text: ARIVOM_SYSTEM_INSTRUCTION }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    },
  }

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${DEFAULT_API_KEY}`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) return text
      }
    } catch {
      // Fallback to next model or local engine
    }
  }

  // Fallback to local intelligent knowledge base
  return getLocalKnowledgeResponse(latestQuery)
}

export function getLocalKnowledgeResponse(query: string): string {
  const q = query.toLowerCase()

  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("rate") ||
    q.includes("budget") ||
    q.includes("how much") ||
    q.includes("pricing") ||
    q.includes("package") ||
    q.includes("inr")
  ) {
    return `As a boutique **senior engineering collective**, we don't offer generic commodity packages. We structure engagements around your exact technical requirements and velocity:

• **Dedicated Developer Squad**: Dedicated senior engineers embedded directly into your product team.
• **Sprint-Based Milestone Delivery**: Predictable 2-week agile sprints with bi-weekly live demos.
• **Fixed-Scope MVP & Platform Launch**: Turnkey architecture, UI/UX, backend, and deployment with guaranteed milestones.
• **Architecture Advisory & Code Audits**: Modernization, scalability reviews, and Monolith-to-Microservices migration.

💡 Connect directly with our lead engineers on WhatsApp at [+91 63690 12607](https://wa.me/916369012607) for a tailored sprint roadmap!`
  }

  if (
    q.includes("service") ||
    q.includes("offer") ||
    q.includes("what do you do") ||
    q.includes("build")
  ) {
    return `At **Arivom Technologies**, our senior engineering squad specializes in end-to-end software engineering:

1. **Web Applications**: High-throughput web platforms built with React 19 / Angular Signals & Tailwind CSS.
2. **Mobile App Development**: Cross-platform iOS & Android apps built with React Native.
3. **Enterprise Backend Engineering**: Resilient microservices using Java 21, Spring Boot 3 & Spring Cloud.
4. **Cloud & DevOps**: Kubernetes orchestration, Docker containers, and automated CI/CD pipelines.
5. **AI Integration**: Custom LLM workflows, conversational assistants, and automated pipelines.

Which type of project are you planning?`
  }

  if (
    q.includes("mobile") ||
    q.includes("ios") ||
    q.includes("android") ||
    q.includes("react native")
  ) {
    return `Yes! We engineer production-grade mobile applications using **React Native**, delivering a unified, maintainable codebase that runs natively on iOS and Android.

• Smooth 60fps native gestures & fluid transitions
• Offline sync & SQLite / WatermelonDB local databases
• Push notifications, biometrics, hardware camera/GPS integrations
• App Store & Google Play deployment with automated CI/CD.`
  }

  if (
    q.includes("backend") ||
    q.includes("spring") ||
    q.includes("java") ||
    q.includes("microservice") ||
    q.includes("cloud")
  ) {
    return `Backend systems are our core specialty! We design scalable architectures using:

• **Java 21 & Spring Boot 3 / Spring Cloud Gateway**
• **Kafka & RabbitMQ** for asynchronous event streaming
• **PostgreSQL & MongoDB** with connection pooling & query indexing
• **Kubernetes & Docker** container clusters
• Sub-50ms latency architecture capable of handling 10,000+ TPS.`
  }

  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("whatsapp") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("talk") ||
    q.includes("human")
  ) {
    return `We'd love to discuss your project! Reach our senior engineering team directly:

• **WhatsApp / Direct Call**: [+91 63690 12607](https://wa.me/916369012607)
• **Email**: [arivomtechnologies@gmail.com](mailto:arivomtechnologies@gmail.com)
• **Locations**: Chennai & Tirunelveli, Tamil Nadu, India

We typically reply within 1–2 hours during business hours!`
  }

  if (
    q.includes("football") ||
    q.includes("first goal") ||
    q.includes("tournament") ||
    q.includes("academy") ||
    q.includes("sport")
  ) {
    return `We engineered the official **First Goal FC Football Academy & Tournament App**!

• **Cross-Platform Mobile**: React Native iOS & Android app for coaches, players, and parents.
• **Live Match Engine**: Sub-second WebSocket live scores, goal/penalty events, and real-time commentary.
• **Tournament Brackets**: Automated fixture scheduling, knockout brackets, and points tables.
• **Academy Portal**: Player attendance, performance metrics, and automated parent push notifications.`
  }

  if (
    q.includes("kb home") ||
    q.includes("builder") ||
    q.includes("architect")
  ) {
    return `We engineered the digital platform for **KB Homes — Architects & Builders**!

• **High-Impact Showcase**: Immersive architectural project portfolio featuring luxury residential villas and commercial builds.
• **Interactive Elements**: 3D elevation renders, structural plan viewers, and material estimation calculations.
• **High Conversion**: Instant WhatsApp inquiry dispatch routing qualified high-ticket consultations directly to architects.`
  }

  if (
    q.includes("client") ||
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("case study")
  ) {
    return `Here are some of our verified live production deliverables:

• **KB Homes**: Architects & Builders digital portfolio with 3D elevations and direct WhatsApp lead routing (+380% qualified consultations).
• **First Goal FC**: Cross-platform Football Academy & Tournament mobile app with real-time live match scoring (12,000+ match events).
• **La Castle Homes**: Luxury architectural villa & commercial portal (lacastlehomes.com).
• **Phoenix Print Solution**: Industrial print automation & production tracking (10,000+ daily jobs automated).
• **Sri Ramana Dental Clinic**: HIPAA-compliant patient management & clinic system.
• **BeeWell Organic Honey**: High-performance direct-to-consumer e-commerce (2.8x conversion lift).

Would you like to explore an architectural blueprint for a similar solution?`
  }

  return `Thank you for reaching out to **Arivom Technologies**!

We are a **senior engineering collective** building custom web platforms, React Native mobile apps, and Java 21 / Spring Boot cloud microservices with zero agency bloat.

• Ask about our **4 Engagement Models** (Dedicated Squad, Sprints, MVP, Advisory).
• Chat with our engineering leads on WhatsApp at [+91 63690 12607](https://wa.me/916369012607) or email arivomtechnologies@gmail.com.`
}
