import { Bot, MessageSquare, Sparkles } from 'lucide-react'
import { openAiAssistantWithPrompt } from './AiAssistantWidget'

export function AiCopilotSection() {
  const cards = [
    {
      rotation: 'lg:-rotate-6 lg:-translate-y-2',
      question: 'How do your 5 senior developers handle scaling?',
      user: 'Founder',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      answer:
        'We design modular monoliths and Spring Cloud microservices with Kafka event queues and PostgreSQL clustering capable of 10,000+ TPS.',
    },
    {
      rotation: 'z-10 shadow-2xl scale-102 border-orange-500/40',
      question: 'Can we hire 1 to 2 dedicated engineers or the whole squad?',
      user: 'CTO',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      answer:
        'Both! We provide flexible dedicated squads (1 to 5 engineers) or 2-week sprint-based milestone delivery with full Git ownership.',
    },
    {
      rotation: 'lg:rotate-6 lg:-translate-y-2',
      question: 'Do we get 100% source code ownership from day 1?',
      user: 'Product Lead',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      answer:
        'Yes. All source code is committed directly into your private repository with clean licensing, Docker configs, and full documentation.',
    },
  ]

  return (
    <section className="section-space bg-[#fbfaf7] border-b border-slate-200/70 relative overflow-hidden">
      <div className="container-wide">
        
        {/* 3D Conversational Card Fan */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16 pt-6">
          {cards.map((card, i) => (
            <div
              key={card.question}
              onClick={() => openAiAssistantWithPrompt(card.question)}
              className={`w-full max-w-[360px] rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer ${card.rotation}`}
            >
              {/* Question bubble */}
              <div className="flex items-start gap-3">
                <img
                  src={card.userAvatar}
                  alt={card.user}
                  className="h-8 w-8 rounded-full object-cover shrink-0 ring-2 ring-orange-200"
                />
                <div className="rounded-2xl rounded-tl-xs bg-slate-100 p-3 text-xs font-bold text-slate-800 leading-snug">
                  {card.question}
                </div>
              </div>

              {/* Bot Answer bubble */}
              <div className="mt-4 flex items-start gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500 text-white shrink-0 shadow-sm">
                  <Bot size={17} />
                </span>
                <div className="rounded-2xl rounded-tl-xs bg-orange-50/80 border border-orange-200/60 p-3.5 text-xs text-slate-700 leading-relaxed font-medium">
                  {card.answer}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Click to ask in AI chat &rarr;</span>
                <span className="text-orange-600 font-bold">Arivom AI</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Headline & Actions */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            24/7 Technical Consultation
          </div>
          <h2 className="section-title mt-5">
            Meet Arivom AI: Your Architecture Co-Pilot
          </h2>
          <p className="section-copy mt-4">
            Have questions about how our 5-developer collective operates, our sprint delivery cadence, or technical stack? Arivom AI is available 24/7 to guide you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openAiAssistantWithPrompt()}
              className="button button-primary cursor-pointer w-full sm:w-auto"
            >
              <Bot size={18} /> Chat with Arivom AI
            </button>
            <a
              href="https://wa.me/918667684683?text=Hi%20Arivom%20Technologies,%20I'd%20like%20to%20discuss%20an%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary w-full sm:w-auto"
            >
              WhatsApp Lead Engineer &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
