import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  Trash2,
  X,
  ArrowRight,
} from 'lucide-react'
import { ChatMessage, sendAiQuery } from '../services/ai-assistant'

const QUICK_PROMPTS = [
  '🤝 Engagement Models',
  '⚡ Tech Stack & Architecture',
  '🚀 How Sprints Work',
  '📱 React Native Mobile Apps',
  '💼 Client Case Studies',
]

export function openAiAssistantWithPrompt(prompt?: string) {
  window.dispatchEvent(
    new CustomEvent('open-arivom-ai', { detail: { prompt } })
  )
}

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! 👋 I am **Arivom AI**, your architecture and engineering co-pilot.\n\nWe are a **senior software engineering collective** specializing in Java 21, Spring Boot 3, React 19 / Angular, and React Native.\n\nAsk me about our **engagement models**, **2-week sprint delivery**, or how our team can build your product!",
      timestamp: new Date(),
      status: 'received',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>
      setIsOpen(true)
      if (customEvent.detail?.prompt) {
        handleSend(customEvent.detail.prompt)
      }
    }
    window.addEventListener('open-arivom-ai', handleOpen)
    return () => window.removeEventListener('open-arivom-ai', handleOpen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isOpen])

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isTyping) return

    setInput('')
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date(),
      status: 'sent',
    }

    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setIsTyping(true)

    try {
      const replyText = await sendAiQuery(nextMessages, query)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date(),
        status: 'received',
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: 'Sorry, I encountered an issue. Please connect with our team directly on WhatsApp at [+91 63690 12607](https://wa.me/916369012607) or email arivomtechnologies@gmail.com.',
        timestamp: new Date(),
        status: 'error',
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'Chat history cleared. How can our engineering team help your product today?',
        timestamp: new Date(),
        status: 'received',
      },
    ])
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-3.5 sm:px-5 sm:py-3.5 text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 cursor-pointer active:scale-95"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <Bot size={20} className="transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
            </span>
            <span className="hidden sm:inline font-bold text-xs tracking-wider uppercase font-mono">
              Arivom AI Co-Pilot
            </span>
          </button>
        ) : null}
      </div>

      {/* Slide-in Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[580px] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-[#111a2e] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md">
                <Sparkles size={18} />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#111a2e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span>Arivom AI Co-Pilot</span>
                  <span className="rounded-md bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-mono text-orange-300">
                    ENGINEERING SQUAD
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Direct senior developer intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                title="Clear chat history"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <Trash2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                    <Bot size={15} />
                  </span>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-orange-600 text-white rounded-tr-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/70 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                  <Bot size={15} />
                </span>
                <div className="rounded-2xl rounded-tl-xs bg-white border border-slate-200/70 px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-slate-100 bg-white px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="shrink-0 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200/60 px-2.5 py-1 text-[10px] font-medium text-slate-700 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="border-t border-slate-100 bg-white p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sprints, architecture, stack..."
              disabled={isTyping}
              className="flex-1 rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="grid h-8 w-8 place-items-center rounded-xl bg-orange-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-500 transition cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>

          {/* Direct WhatsApp Callout */}
          <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-100 text-center text-[10px] text-slate-500 flex items-center justify-between">
            <span>Need immediate technical scoping?</span>
            <a
              href="https://wa.me/916369012607?text=Hi%20Arivom%20Technologies,%20I%20have%20an%20architecture%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
            >
              WhatsApp Lead &rarr;
            </a>
          </div>

        </div>
      )}
    </>
  )
}
