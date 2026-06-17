import { useEffect, useState } from "react"
import { navLinks, site } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [time, setTime] = useState("17:54")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hrs = String(now.getHours()).padStart(2, "0")
      const mins = String(now.getMinutes()).padStart(2, "0")
      setTime(`${hrs}:${mins}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250
      const sections = ["hero", ...navLinks.map((l) => l.href.replace("#", ""))]

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-secondary border-b border-border text-foreground font-mono text-xs select-none">
      <div className="flex h-8 items-center justify-between px-3 md:px-4">
        {/* Left Block: Tmux session tag */}
        <div className="flex items-center gap-1.5">
          <span className="bg-primary text-primary-foreground px-1.5 py-0.5 font-bold uppercase">
            [TUI: {site.handle}]
          </span>
          <span className="text-muted-foreground hidden sm:inline">status: online</span>
        </div>

        {/* Middle Block: Tmux Window list */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          <a
            href="#hero"
            className={cn(
              "px-1 py-0.5 transition-colors hover:text-foreground",
              activeSection === "hero"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            0:home{activeSection === "hero" ? "*" : ""}
          </a>
          {navLinks.map((link, idx) => {
            const id = link.href.replace("#", "")
            const isActive = activeSection === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-1 py-0.5 transition-colors hover:text-foreground whitespace-nowrap",
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {idx + 1}:{link.label}
                {isActive ? "*" : ""}
              </a>
            )
          })}
        </div>

        {/* Right Block: Hostname & DateTime */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="hidden md:inline">@aayushmaan</span>
          <span className="bg-muted px-1.5 py-0.5 text-foreground flex items-center gap-1 border border-border/50">
            {time}
          </span>
        </div>
      </div>
    </header>
  )
}
