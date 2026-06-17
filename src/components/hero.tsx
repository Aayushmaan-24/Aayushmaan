import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { TerminalWindow } from "@/components/terminal-window"
import { site } from "@/data/portfolio"

// Canvas Matrix Digital Rain component
function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 500
    canvas.height = 220

    const columns = Math.floor(canvas.width / 12)
    const yPositions = Array(columns).fill(0)

    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*+-<>[]"
    let frameId: number

    const draw = () => {
      // Pick color based on active document root class
      let color = "rgb(34, 197, 94)"
      if (document.documentElement.classList.contains("theme-amber")) {
        color = "rgb(249, 115, 22)"
      } else if (document.documentElement.classList.contains("theme-cyan")) {
        color = "rgb(6, 182, 212)"
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color
      ctx.font = "11px monospace"

      for (let i = 0; i < yPositions.length; i++) {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)]
        const x = i * 12
        const y = yPositions[i]

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          yPositions[i] = 0
        } else {
          yPositions[i] += 12
        }
      }
      frameId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
      }
    }
    window.addEventListener("resize", handleResize)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="relative w-full h-[220px] bg-black overflow-hidden border border-primary/20 my-2">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-0.5 text-xs text-primary font-mono border border-primary/30">
        ESC to return
      </div>
    </div>
  )
}

interface CommandHistoryItem {
  command: string
  output: React.ReactNode
}

export function Hero() {
  const [inputVal, setInputVal] = useState("")
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "neofetch",
      output: (
        <div className="grid grid-cols-[auto_1fr] gap-4 font-mono text-xs text-muted-foreground leading-normal">
          <div className="text-primary hidden sm:block whitespace-pre select-none">
            {`   .---.\n  /     \\\n  |() ()|\n   \\  -  /\n   .-'---'-.\n  /  |   |  \\\n /   |   |   \\`}
          </div>
          <div>
            <p className="text-primary font-bold">aayushmaan@srmist</p>
            <p className="text-muted-foreground">-----------------</p>
            <p><span className="text-primary">OS:</span> SRMIST CSE (AI/ML)</p>
            <p><span className="text-primary">Host:</span> aayushmaan.dev</p>
            <p><span className="text-primary">CGPA:</span> 9.96 / 10.0</p>
            <p><span className="text-primary">Uptime:</span> 3 Years (Batch 2024-28)</p>
            <p><span className="text-primary">Shell:</span> React 19 / Vite</p>
            <p><span className="text-primary">Core:</span> PyTorch, Ollama, Python, RAG</p>
            <p><span className="text-primary">Status:</span> Available for internships & research</p>
          </div>
        </div>
      ),
    },
  ])

  const [isMatrixActive, setIsMatrixActive] = useState(false)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history, isMatrixActive])

  const changeTheme = (themeName: string) => {
    document.documentElement.className = ""
    if (themeName === "amber") {
      document.documentElement.classList.add("theme-amber")
      return "Switched display color to Amber Phosphor."
    } else if (themeName === "cyan") {
      document.documentElement.classList.add("theme-cyan")
      return "Switched display color to Cyan DEC-VT100."
    } else {
      document.documentElement.classList.add("theme-green")
      return "Switched display color to Green Phosphor."
    }
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    const parts = trimmed.split(" ")
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(" ").toLowerCase()

    let response: React.ReactNode = ""

    switch (cmd) {
      case "help":
        response = (
          <div className="text-xs text-muted-foreground font-mono leading-relaxed">
            <p className="text-primary font-semibold mb-1">Available Shell Commands:</p>
            <p>  <span className="text-foreground">help</span>           - List available shell commands</p>
            <p>  <span className="text-foreground">neofetch</span>       - Show profile specs & system information</p>
            <p>  <span className="text-foreground">cat bio.txt</span>      - Print biographical notes</p>
            <p>  <span className="text-foreground">ls projects</span>      - List key portfolio projects</p>
            <p>  <span className="text-foreground">skills</span>         - Print primary technical skill sets</p>
            <p>  <span className="text-foreground">theme [color]</span>    - Switch theme color: green / amber / cyan</p>
            <p>  <span className="text-foreground">matrix</span>         - Run digital phosphor rain animation</p>
            <p>  <span className="text-foreground">clear</span>          - Clear terminal output history</p>
            <p>  <span className="text-foreground">contact</span>        - Connect to SMTP transmission script</p>
          </div>
        )
        break
      case "neofetch":
        response = (
          <div className="grid grid-cols-[auto_1fr] gap-4 font-mono text-xs text-muted-foreground leading-normal">
            <div className="text-primary hidden sm:block whitespace-pre select-none">
              {`   .---.\n  /     \\\n  |() ()|\n   \\  -  /\n   .-'---'-.\n  /  |   |  \\\n /   |   |   \\`}
            </div>
            <div>
              <p className="text-primary font-bold">aayushmaan@srmist</p>
              <p className="text-muted-foreground">-----------------</p>
              <p><span className="text-primary">OS:</span> SRMIST CSE (AI/ML)</p>
              <p><span className="text-primary">Host:</span> aayushmaan.dev</p>
              <p><span className="text-primary">CGPA:</span> 9.96 / 10.0</p>
              <p><span className="text-primary">Uptime:</span> 3 Years (Batch 2024-28)</p>
              <p><span className="text-primary">Shell:</span> React 19 / Vite</p>
              <p><span className="text-primary">Core:</span> PyTorch, Ollama, Python, RAG</p>
              <p><span className="text-primary">Status:</span> Available for internships & research</p>
            </div>
          </div>
        )
        break
      case "cat":
        if (arg === "bio.txt") {
          response = (
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              {site.bio}
            </p>
          )
        } else {
          response = <span className="text-xs text-terminal-red">cat: {arg || "file"}: No such file or directory. Try 'cat bio.txt'</span>
        }
        break
      case "ls":
        if (arg === "projects") {
          response = (
            <div className="text-xs text-muted-foreground font-mono">
              <p className="text-foreground font-bold">~/projects:</p>
              <p className="text-terminal-cyan">  🎙️ smart_meeting_summarizer.py</p>
              <p className="text-terminal-cyan">  💬 financial_rag_chatbot.py</p>
              <p className="text-terminal-cyan">  🔊 voice_transcriber.sh</p>
              <p className="text-terminal-cyan">  🤖 gemini_assistant.py</p>
              <p className="text-muted-foreground mt-1 text-[10px]">Tip: Select these items in the projects explorer pane below for complete source details.</p>
            </div>
          )
        } else {
          response = <span className="text-xs text-muted-foreground">bio.txt   projects/ (directory)</span>
        }
        break
      case "skills":
        response = (
          <div className="text-xs text-muted-foreground font-mono leading-relaxed">
            <p><span className="text-primary">Languages:</span> Python, Java, JavaScript, C, SQL</p>
            <p><span className="text-primary">AI & ML:</span> PyTorch, OpenCV, HuggingFace, faster-whisper, Ollama, LangChain</p>
            <p><span className="text-primary">Tools:</span> Docker, Git, Linux, Google ADK</p>
          </div>
        )
        break
      case "theme":
        if (arg === "green" || arg === "amber" || arg === "cyan") {
          const msg = changeTheme(arg)
          response = <span className="text-xs text-primary">{msg}</span>
        } else {
          response = <span className="text-xs text-terminal-red">Usage: theme [green | amber | cyan]</span>
        }
        break
      case "matrix":
        setIsMatrixActive(true)
        response = <span className="text-xs text-primary">Executing matrix digital rain...</span>
        break
      case "clear":
        setHistory([])
        setInputVal("")
        return
      case "contact": {
        response = (
          <span className="text-xs text-primary">
            Routing to contact.sh form... scroll down to transmit a message directly to aayushmaan.chakraborty@gmail.com
          </span>
        )
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          setTimeout(() => {
            contactSection.scrollIntoView({ behavior: "smooth" })
          }, 400)
        }
        break
      }
      default:
        response = (
          <span className="text-xs text-terminal-red">
            bash: command not found: {cmd}. Type 'help' to review available operations.
          </span>
        )
        break
    }

    setHistory((prev) => [...prev, { command: trimmed, output: response }])
    setInputVal("")
  }

  return (
    <section id="hero" className="relative min-h-screen px-4 pt-20 pb-12 flex flex-col justify-center border-b border-border bg-background">
      {/* Background Matrix/CRT aesthetics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(34,197,94,0.06),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-5 items-stretch">
          
          {/* LEFT PANEL: System Spec & Photo Card */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <TerminalWindow title="~/system_spec" className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                {/* Photo with phosphor glow effect */}
                <div className="relative w-full aspect-[4/3] bg-secondary/80 border border-primary/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15),transparent_70%)] z-10 pointer-events-none" />
                  <img
                    src="/profile.jpg"
                    alt={site.name}
                    className="w-full h-full object-cover object-[center_20%] scale-150 filter contrast-125 brightness-95 grayscale"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/90 border border-primary/30 px-2 py-0.5 text-[10px] text-primary font-mono z-15">
                    SCAN_ID: aayushmaan.jpg
                  </div>
                </div>

                <div className="font-mono text-xs space-y-2 leading-relaxed">
                  <h1 className="text-lg font-bold text-foreground tracking-tight">{site.name}</h1>
                  <p className="text-primary font-semibold">{site.title}</p>
                  <p className="text-muted-foreground">{site.school}</p>
                  <div className="w-full border-b border-dashed border-border my-2" />
                  <p className="text-[11px] text-muted-foreground leading-normal italic">
                    "{site.bio}"
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-dashed border-border">
                <Button size="sm" asChild>
                  <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                    GitHub <ExternalLink className="size-3" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                    LinkedIn <ExternalLink className="size-3" />
                  </a>
                </Button>
              </div>
            </TerminalWindow>
          </div>

          {/* RIGHT PANEL: Interactive Command-line Console */}
          <div className="lg:col-span-3 flex flex-col h-[480px] lg:h-auto">
            <TerminalWindow title="bash --login" className="flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-mono text-xs scrollbar-thin">
                <div>
                  <p className="text-primary">Welcome to Aayushmaan Chakraborty's TUI v1.0.4</p>
                  <p className="text-muted-foreground text-[10px]">System ready. Type 'help' to print list of terminal operations.</p>
                </div>

                {/* History rendering */}
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 border-l border-primary/10 pl-2">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-primary font-bold">$</span>
                      <span className="text-foreground">{item.command}</span>
                    </div>
                    {item.output && <div className="pl-3">{item.output}</div>}
                  </div>
                ))}

                {/* Canvas matrix insertion */}
                {isMatrixActive && (
                  <MatrixRain onClose={() => setIsMatrixActive(false)} />
                )}

                <div ref={terminalEndRef} />
              </div>

              {/* Form Input Line */}
              <form onSubmit={handleCommand} className="border-t border-border pt-2 mt-2 flex items-center gap-2 font-mono text-xs">
                <span className="text-primary font-bold">$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command..."
                  disabled={isMatrixActive}
                  className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary font-mono placeholder:text-muted-foreground/30 focus:ring-0 focus:border-none p-0"
                  autoFocus
                  autoComplete="off"
                />
                <span className="text-[10px] text-muted-foreground/40 hidden sm:inline">[Press ENTER]</span>
              </form>
            </TerminalWindow>
          </div>

        </div>
      </div>
    </section>
  )
}
