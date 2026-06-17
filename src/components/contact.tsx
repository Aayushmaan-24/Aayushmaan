import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { Code2, Mail, UserRound, Play, RefreshCw } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { TerminalWindow } from "@/components/terminal-window"
import { Button } from "@/components/ui/button"
import { site } from "@/data/portfolio"

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add Gmail as an Email Service  →  copy the Service ID below
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" in template to: aayushmaan.chakraborty@gmail.com
// 4. Go to Account → API Keys → copy the Public Key below
const EMAILJS_SERVICE_ID  = "service_4cohxrl"
const EMAILJS_TEMPLATE_ID = "template_9md3d7j"
const EMAILJS_PUBLIC_KEY  = "hkGwUFMJdQGcuxrGQ"
// ─────────────────────────────────────────────────────────────────────────────

const socialLinks = [
  {
    href: `https://github.com/${site.github.split("github.com/")[1] ?? ""}`,
    label: "GitHub (F2)",
    icon: Code2,
    color: "text-terminal-cyan",
  },
  {
    href: site.linkedin,
    label: "LinkedIn (F3)",
    icon: UserRound,
    color: "text-terminal-yellow",
  },
] as const

type Step = "idle" | "name" | "email" | "message" | "sending" | "done" | "error"

export function Contact() {
  const [step, setStep]       = useState<Step>("idle")
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [message, setMessage] = useState("")
  const [smtpLog, setSmtpLog] = useState<string[]>([])

  const inputRef    = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const logEndRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step === "name" || step === "email") inputRef.current?.focus()
    if (step === "message") textareaRef.current?.focus()
  }, [step])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [smtpLog])

  const addLog = (line: string) =>
    setSmtpLog((prev) => [...prev, line])

  const startScript = () => {
    setStep("name")
    setSmtpLog([])
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) setStep("email")
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setStep("message")
  }

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setStep("sending")

    // ── Animated SMTP-style log lines ──────────────────────────────────────
    const fakeLog = [
      "Connecting to emailjs relay...",
      "220 relay.emailjs.com ESMTP ready",
      `EHLO aayushmaan.dev`,
      "250-PIPELINING 8BITMIME STARTTLS",
      "STARTTLS",
      "220 2.0.0 Ready to start TLS",
      `MAIL FROM: <${email}>`,
      "250 2.1.0 OK",
      "RCPT TO: <aayushmaan.chakraborty@gmail.com>",
      "250 2.1.5 OK",
      "DATA",
      "354 Go ahead",
      `Subject: Portfolio message from ${name}`,
      "Transmitting payload via EmailJS SDK...",
    ]

    for (const line of fakeLog) {
      await new Promise((r) => setTimeout(r, 180))
      addLog(line)
    }

    // ── Real EmailJS send ──────────────────────────────────────────────────
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  name,
          from_email: email,
          message:    message,
          reply_to:   email,
        },
        EMAILJS_PUBLIC_KEY
      )
      await new Promise((r) => setTimeout(r, 200))
      addLog("250 2.0.0 OK: queued as msg_" + Math.random().toString(36).slice(2, 9))
      addLog("QUIT")
      addLog("221 2.0.0 Goodbye")
      setStep("done")
    } catch (err) {
      addLog(">>> ERROR: Failed to relay message. Check EmailJS credentials.")
      setStep("error")
    }
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setMessage("")
    setStep("idle")
    setSmtpLog([])
  }

  return (
    <section id="contact" className="px-4 py-20 border-b border-border bg-background">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <TerminalWindow title="./contact.sh" className="overflow-hidden min-h-[360px] flex flex-col justify-between">
            <div className="font-mono text-xs leading-relaxed space-y-4">

              {/* IDLE */}
              {step === "idle" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-primary font-bold">SMTP Client Ready</p>
                    <p className="text-muted-foreground">
                      This script sends your message directly to{" "}
                      <span className="text-primary">aayushmaan.chakraborty@gmail.com</span> — no login required.
                    </p>
                  </div>
                  <Button onClick={startScript} className="flex items-center gap-2 cursor-pointer">
                    <Play className="size-3.5" />
                    Run contact.sh
                  </Button>
                </div>
              )}

              {/* NAME */}
              {step === "name" && (
                <form onSubmit={handleNameSubmit} className="space-y-3">
                  <span className="text-primary font-bold">$ ./contact.sh</span>
                  <div className="flex items-center gap-2">
                    <label className="text-terminal-cyan font-semibold shrink-0">Enter Name &gt;</label>
                    <input
                      ref={inputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary focus:ring-0 p-0"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">[Press ENTER to continue]</p>
                </form>
              )}

              {/* EMAIL */}
              {step === "email" && (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> Name: <span className="text-foreground font-bold">{name}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-terminal-cyan font-semibold shrink-0">Enter Email &gt;</label>
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary focus:ring-0 p-0"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">[Press ENTER to continue]</p>
                </form>
              )}

              {/* MESSAGE */}
              {step === "message" && (
                <form onSubmit={handleMessageSubmit} className="space-y-3">
                  <div className="space-y-1 text-muted-foreground">
                    <p><span className="text-primary">$</span> Name: <span className="text-foreground font-bold">{name}</span></p>
                    <p><span className="text-primary">$</span> From: <span className="text-foreground font-bold">{email}</span></p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-terminal-cyan font-semibold">Enter Message &gt;</label>
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows={4}
                      className="w-full bg-secondary/20 border border-border outline-none text-foreground caret-primary p-2 focus:ring-1 focus:ring-primary focus:border-primary mt-1 resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="cursor-pointer">
                    Transmit Message
                  </Button>
                </form>
              )}

              {/* SENDING / DONE / ERROR */}
              {(step === "sending" || step === "done" || step === "error") && (
                <div className="space-y-1 font-mono text-[11px] leading-normal">
                  {smtpLog.map((line, idx) => {
                    let cls = "text-muted-foreground"
                    if (/^2[25]\d/.test(line))                      cls = "text-primary"
                    else if (/^354/.test(line) || /^Subject/.test(line)) cls = "text-terminal-yellow"
                    else if (/Connecting|Transmitting/.test(line))  cls = "text-terminal-cyan"
                    else if (/ERROR/.test(line))                    cls = "text-terminal-red"
                    return <div key={idx} className={cls}>{line}</div>
                  })}
                  <div ref={logEndRef} />

                  {step === "done" && (
                    <div className="pt-4 space-y-3">
                      <p className="text-primary font-bold">✔ Message delivered to aayushmaan.chakraborty@gmail.com</p>
                      <Button onClick={resetForm} variant="outline" className="flex items-center gap-1.5 cursor-pointer">
                        <RefreshCw className="size-3" /> Send another
                      </Button>
                    </div>
                  )}

                  {step === "error" && (
                    <div className="pt-4 space-y-3">
                      <p className="text-terminal-red font-bold">✘ Transmission failed. Please try again or email directly.</p>
                      <Button onClick={resetForm} variant="outline" className="flex items-center gap-1.5 cursor-pointer">
                        <RefreshCw className="size-3" /> Retry
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick shortcuts footer */}
            <div className="mt-8 pt-4 border-t border-border flex flex-wrap gap-3 items-center justify-between">
              <span className="text-[10px] text-muted-foreground/60 font-mono">Quick Shortcuts:</span>
              <div className="flex flex-wrap gap-2">
                {/* Direct Gmail link — always works */}
                <Button variant="outline" size="sm" asChild className="h-7 px-2.5 font-mono text-[10px] cursor-pointer">
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=aayushmaan.chakraborty@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    <Mail className="size-3" />
                    <span className="text-primary">Gmail (F1)</span>
                  </a>
                </Button>
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Button key={link.label} variant="outline" size="sm" asChild className="h-7 px-2.5 font-mono text-[10px] cursor-pointer">
                      <a href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                        <Icon className="size-3" />
                        <span className={link.color}>{link.label}</span>
                      </a>
                    </Button>
                  )
                })}
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 px-4 py-4 select-none">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left font-mono text-xs">
        <p className="text-muted-foreground">
          Built by <span className="text-primary font-semibold">{site.name}</span> · 2026
        </p>
        <p className="text-muted-foreground/60">exit code: 0</p>
      </div>
    </footer>
  )
}
