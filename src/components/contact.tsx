import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { Mail, Code, ExternalLink, ArrowRight } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { site } from "@/data/portfolio"

const EMAILJS_SERVICE_ID = "service_4cohxrl"
const EMAILJS_TEMPLATE_ID = "template_9md3d7j"
const EMAILJS_PUBLIC_KEY = "hkGwUFMJdQGcuxrGQ"

type FormState = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [state, setState] = useState<FormState>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("loading")

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
          reply_to: email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setState("success")
      setName("")
      setEmail("")
      setMessage("")
      // Reset after 3 seconds
      setTimeout(() => setState("idle"), 3000)
    } catch (err) {
      setState("error")
      setTimeout(() => setState("idle"), 3000)
    }
  }

  return (
    <section id="contact" className="px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-primary mb-2">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's Build Something
          </h2>
          <p className="text-lg text-muted-foreground">
            Have an idea, opportunity, or just want to chat? Reach out.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          <a
            href={`mailto:${site.email}`}
            className="p-6 rounded-lg border border-border bg-card hover:bg-secondary hover:border-primary/50 transition-smooth group"
          >
            <Mail className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold mb-1">Email</h3>
            <p className="text-sm text-muted-foreground break-all">{site.email}</p>
          </a>

          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-lg border border-border bg-card hover:bg-secondary hover:border-primary/50 transition-smooth group"
          >
            <Code className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold mb-1">GitHub</h3>
            <p className="text-sm text-muted-foreground">View my repositories</p>
          </a>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-lg border border-border bg-card hover:bg-secondary hover:border-primary/50 transition-smooth group"
          >
            <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold mb-1">LinkedIn</h3>
            <p className="text-sm text-muted-foreground">Connect with me</p>
          </a>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-xl border border-border bg-secondary/30">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={state === "loading"}
                className="w-full"
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : state === "success" ? (
                  <span className="flex items-center gap-2">
                    <span>✓ Sent!</span>
                  </span>
                ) : state === "error" ? (
                  <span className="flex items-center gap-2">
                    <span>✗ Failed. Try emailing directly.</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Branding */}
          <div>
            <h3 className="font-display font-bold text-lg mb-2">{site.handle}</h3>
            <p className="text-sm text-muted-foreground">{site.title}</p>
          </div>

          {/* Center: Status */}
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Status</p>
            <p className="text-sm text-primary">{site.status}</p>
          </div>

          {/* Right: Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 {site.name} · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
