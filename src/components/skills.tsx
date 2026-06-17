import { useState } from "react"

import { SectionHeader } from "@/components/terminal-window"
import { TerminalWindow } from "@/components/terminal-window"
import { skillGroups } from "@/data/portfolio"

interface SkillProcess {
  pid: number
  pri: number
  ni: number
  virt: string
  res: string
  shr: string
  cpu: number
  mem: number
  time: string
  command: string
  category: string
}

export function Skills() {
  const [filterCat, setFilterCat] = useState<string | null>(null)

  // Generate processes list from data/portfolio
  const allProcesses: SkillProcess[] = []
  let pidCounter = 2048

  skillGroups.forEach((group) => {
    group.skills.forEach((skill) => {
      // Custom proficiencies and stats
      let cpu = 75
      let time = "0:12.44"

      if (["Python", "PyTorch", "RAG", "faster-whisper"].includes(skill)) {
        cpu = 95
        time = "3:14.20"
      } else if (["Java", "JavaScript", "SQL", "Git", "Linux"].includes(skill)) {
        cpu = 85
        time = "2:40.10"
      } else if (["React", "FastAPI", "Ollama", "LangChain", "Docker"].includes(skill)) {
        cpu = 90
        time = "1:55.30"
      } else if (["Pandas", "NumPy", "Tableau"].includes(skill)) {
        cpu = 80
        time = "1:22.00"
      }

      allProcesses.push({
        pid: pidCounter++,
        pri: 20,
        ni: 0,
        virt: "1.2G",
        res: "420M",
        shr: "84M",
        cpu,
        mem: parseFloat((cpu * 0.08).toFixed(1)),
        time,
        command: `/bin/stack/${skill.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        category: group.title,
      })
    })
  })

  // Filter processes if a category is selected
  const filteredProcesses = filterCat
    ? allProcesses.filter((p) => p.category === filterCat)
    : allProcesses

  // Sort processes by CPU descending
  const sortedProcesses = [...filteredProcesses].sort((a, b) => b.cpu - a.cpu)

  // Render a nice progress bar
  const renderBar = (percent: number, colorClass = "text-primary") => {
    const totalBars = 20
    const filledBars = Math.round((percent / 100) * totalBars)
    const emptyBars = totalBars - filledBars

    return (
      <span className="font-mono text-xs select-none">
        [
        <span className={colorClass}>{"|".repeat(filledBars)}</span>
        <span className="text-muted-foreground/30">{".".repeat(emptyBars)}</span>
        <span className="text-foreground"> {percent.toFixed(1)}%</span>]
      </span>
    )
  }

  return (
    <section id="skills" className="px-4 py-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="// htop systems"
          title="System Core Skills"
          description="A visual processes list mapping out technical proficiencies as CPU operations and resources."
        />

        <div className="mt-8">
          <TerminalWindow title="htop --view=skills" className="p-0">
            {/* HTOP HEADER AREA */}
            <div className="grid md:grid-cols-2 gap-4 p-4 border-b border-border bg-secondary/20 font-mono text-xs">
              
              {/* Left Column: Cores / Resource Bars */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground w-12 font-semibold">1 [Lang]</span>
                  <div className="flex-1 text-right">{renderBar(92, "text-primary")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground w-12 font-semibold">2 [AI]</span>
                  <div className="flex-1 text-right">{renderBar(95, "text-primary")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground w-12 font-semibold">3 [Web]</span>
                  <div className="flex-1 text-right">{renderBar(80, "text-terminal-cyan")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground w-12 font-semibold">4 [Tools]</span>
                  <div className="flex-1 text-right">{renderBar(85, "text-terminal-cyan")}</div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-border/30">
                  <span className="text-muted-foreground w-12 font-semibold">Mem</span>
                  <div className="flex-1 text-right">
                    {renderBar(70, "text-terminal-yellow")}
                    <span className="text-[10px] text-muted-foreground ml-1">5.6G/8.0G</span>
                  </div>
                </div>
              </div>

              {/* Right Column: System metadata */}
              <div className="space-y-1.5 md:pl-6 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0">
                <p>
                  <span className="text-muted-foreground font-semibold">Tasks:</span>{" "}
                  <span className="text-foreground">{allProcesses.length} total, 4 running</span>
                </p>
                <p>
                  <span className="text-muted-foreground font-semibold">Load average:</span>{" "}
                  <span className="text-primary font-bold">0.96 0.95 0.90</span>
                </p>
                <p>
                  <span className="text-muted-foreground font-semibold">Uptime:</span>{" "}
                  <span className="text-foreground">3 Years (2024-present)</span>
                </p>
                <p>
                  <span className="text-muted-foreground font-semibold">Target Node:</span>{" "}
                  <span className="text-terminal-cyan">aayushmaan@srmist.edu</span>
                </p>
                
                <div className="pt-2 flex flex-wrap gap-1 items-center">
                  <span className="text-muted-foreground text-[10px]">Filter by category:</span>
                  <button
                    onClick={() => setFilterCat(null)}
                    className={`px-1.5 py-0.5 text-[10px] border font-bold ${
                      filterCat === null
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    ALL
                  </button>
                  {skillGroups.map((g) => (
                    <button
                      key={g.title}
                      onClick={() => setFilterCat(g.title)}
                      className={`px-1.5 py-0.5 text-[10px] border font-bold ${
                        filterCat === g.title
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {g.title.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* PROCESSES TABLE AREA */}
            <div className="overflow-x-auto w-full max-h-[300px] overflow-y-auto scrollbar-thin">
              <table className="w-full font-mono text-[11px] text-left border-collapse select-none">
                <thead>
                  <tr className="bg-primary text-primary-foreground font-bold sticky top-0 uppercase">
                    <th className="px-3 py-1.5 w-16">PID</th>
                    <th className="px-3 py-1.5 w-20">USER</th>
                    <th className="px-2 py-1.5 w-10 text-center">PR</th>
                    <th className="px-2 py-1.5 w-10 text-center">NI</th>
                    <th className="px-2 py-1.5 w-16 text-right">VIRT</th>
                    <th className="px-2 py-1.5 w-16 text-right">RES</th>
                    <th className="px-2 py-1.5 w-16 text-right">SHR</th>
                    <th className="px-2 py-1.5 w-8 text-center">S</th>
                    <th className="px-3 py-1.5 w-14 text-right">%CPU</th>
                    <th className="px-3 py-1.5 w-14 text-right">%MEM</th>
                    <th className="px-3 py-1.5 w-24 text-right">TIME+</th>
                    <th className="px-4 py-1.5">COMMAND</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-muted-foreground">
                  {sortedProcesses.map((proc) => (
                    <tr
                      key={proc.pid}
                      className="hover:bg-secondary/40 hover:text-foreground transition-colors group"
                    >
                      <td className="px-3 py-1 text-primary group-hover:text-primary font-semibold">{proc.pid}</td>
                      <td className="px-3 py-1">aayushm+</td>
                      <td className="px-2 py-1 text-center">{proc.pri}</td>
                      <td className="px-2 py-1 text-center">{proc.ni}</td>
                      <td className="px-2 py-1 text-right">{proc.virt}</td>
                      <td className="px-2 py-1 text-right">{proc.res}</td>
                      <td className="px-2 py-1 text-right">{proc.shr}</td>
                      <td className="px-2 py-1 text-center text-primary font-bold">R</td>
                      <td className="px-3 py-1 text-right text-foreground font-bold">{proc.cpu}.0</td>
                      <td className="px-3 py-1 text-right">{proc.mem}</td>
                      <td className="px-3 py-1 text-right font-semibold">{proc.time}</td>
                      <td className="px-4 py-1 text-foreground font-semibold truncate max-w-[200px]" title={proc.command}>
                        {proc.command}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* HTOP F-KEYS FOOTER */}
            <div className="bg-secondary text-muted-foreground font-mono text-[10px] grid grid-cols-5 md:grid-cols-10 divide-x divide-border border-t border-border select-none leading-none">
              <div className="py-2 text-center"><span className="text-primary font-bold">F1</span> Help</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F2</span> Setup</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F3</span> Search</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F4</span> Filter</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F5</span> Tree</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F6</span> SortBy</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F7</span> Nice -</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F8</span> Nice +</div>
              <div className="py-2 text-center bg-terminal-red/10 text-terminal-red"><span className="font-bold">F9</span> Kill</div>
              <div className="py-2 text-center"><span className="text-primary font-bold">F10</span> Quit</div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}
