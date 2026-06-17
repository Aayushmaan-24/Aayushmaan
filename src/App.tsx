import { useState, useEffect } from "react"
import { Achievements } from "@/components/achievements"
import { Contact, Footer } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"

export function App() {
  const [crtActive, setCrtActive] = useState(true)
  const [activeTheme, setActiveTheme] = useState<"green" | "amber" | "cyan">("green")

  // Sync state with theme selector when switched in terminal
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const classes = document.documentElement.classList
      if (classes.contains("theme-amber")) {
        setActiveTheme("amber")
      } else if (classes.contains("theme-cyan")) {
        setActiveTheme("cyan")
      } else {
        setActiveTheme("green")
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = (theme: "green" | "amber" | "cyan") => {
    document.documentElement.className = ""
    document.documentElement.classList.add(`theme-${theme}`)
    setActiveTheme(theme)
  }

  return (
    <div className={`${crtActive ? "scanlines crt-flicker-animation" : ""} min-h-screen bg-background text-foreground transition-colors duration-200`}>
      <Navbar />
      <main className="pb-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />

      {/* Floating CRT & Color Monitor Control Widget */}
      <div className="fixed bottom-4 right-4 z-50 font-mono text-[10px] bg-secondary/90 backdrop-blur border border-border p-2 shadow-2xl flex flex-col gap-2 select-none md:max-w-xs">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-1">
          <span className="text-primary font-bold">CRT MONITOR v1.0</span>
          <span className="size-2 rounded-full bg-primary animate-pulse" />
        </div>
        
        <div className="space-y-1.5">
          {/* Theme Selector */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Phosphor:</span>
            <div className="flex gap-1">
              <button
                onClick={() => toggleTheme("green")}
                className={`px-1 py-0.5 border cursor-pointer ${
                  activeTheme === "green"
                    ? "bg-primary border-primary text-primary-foreground font-bold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                GRN
              </button>
              <button
                onClick={() => toggleTheme("amber")}
                className={`px-1 py-0.5 border cursor-pointer ${
                  activeTheme === "amber"
                    ? "bg-primary border-primary text-primary-foreground font-bold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                AMB
              </button>
              <button
                onClick={() => toggleTheme("cyan")}
                className={`px-1 py-0.5 border cursor-pointer ${
                  activeTheme === "cyan"
                    ? "bg-primary border-primary text-primary-foreground font-bold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                CYN
              </button>
            </div>
          </div>

          {/* CRT scanline toggler */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Scanlines:</span>
            <button
              onClick={() => setCrtActive(!crtActive)}
              className={`px-1.5 py-0.5 border font-bold cursor-pointer ${
                crtActive
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {crtActive ? "ENABLED" : "DISABLED"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
