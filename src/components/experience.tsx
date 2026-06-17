import { motion } from "framer-motion"

import { SectionHeader } from "@/components/terminal-window"
import { TerminalWindow } from "@/components/terminal-window"


interface GitCommit {
  hash: string
  branchLine: string
  date: string
  role: string
  company: string
  desc: string
}

export function Experience() {
  // Map experiences to commit hashes and branch shapes
  const commits: GitCommit[] = [
    {
      hash: "c0d3x12",
      branchLine: "*   ",
      date: "Nov 2025 — Dec 2025",
      role: "Python Developer Intern",
      company: "CodexIntern · Remote",
      desc: "Built a Gemini-based CLI chat application with persistent conversation history. Developed a Python CLI voice assistant powered by Gemini. Created a Flask-based sentiment analysis web app for real-time text evaluation.",
    },
    {
      hash: "jpm0rg1",
      branchLine: "|*  ",
      date: "Feb 2025",
      role: "Quantitative Research Virtual Experience",
      company: "JP Morgan Chase & Co. · Forage",
      desc: "Analyzed a book of loans to estimate probability of default. Used dynamic programming to convert FICO scores into categorical data for default prediction.",
    },
    {
      hash: "b41rw4y",
      branchLine: "|*  ",
      date: "Feb 2025",
      role: "Data Science Virtual Experience",
      company: "British Airways · Forage",
      desc: "Scraped and analyzed customer review data. Built a predictive model to understand factors influencing buying behaviour.",
    },
    {
      hash: "d3l01tt",
      branchLine: "*   ",
      date: "Jan 2025",
      role: "Data Analysis Virtual Experience",
      company: "Deloitte Australia · Forage",
      desc: "Created a data dashboard using Tableau. Used Excel to classify data and draw business conclusions for a forensic technology simulation.",
    },
  ]

  return (
    <section id="experience" className="px-4 py-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="// git log --graph"
          title="Commit History / Work Experience"
          description="Chronological work history rendered as branches and merges in a Git repository."
        />

        <div className="mt-8">
          <TerminalWindow title="git log --graph --oneline --all">
            <div className="font-mono text-xs leading-relaxed space-y-6 select-none">
              
              {/* Timeline Header */}
              <div className="text-muted-foreground border-b border-border/40 pb-2 mb-4">
                <p>Command: git log --graph --all --decorate --oneline</p>
                <p>Repository: /home/aayushmaan/experience</p>
              </div>

              {/* Commit Nodes */}
              {commits.map((commit, idx) => {
                return (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="grid grid-cols-[35px_1fr] md:grid-cols-[45px_1fr] items-start gap-1"
                  >
                    {/* ASCII Branch Drawing */}
                    <div className="text-primary font-bold text-center h-full select-none">
                      <p className="whitespace-pre">{commit.branchLine}</p>
                      <p className="whitespace-pre text-muted-foreground/30">{"|   "}</p>
                      <p className="whitespace-pre text-muted-foreground/30">{"|   "}</p>
                    </div>

                    {/* Commit Content Box */}
                    <div className="bg-secondary/20 border border-border/80 p-4 hover:border-primary/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-terminal-yellow font-bold">commit {commit.hash}</span>
                          <span className="text-primary font-semibold">({commit.date})</span>
                        </div>
                        <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-sm">
                          {idx === 0 ? "HEAD -> main, origin/main" : `branch-${commit.hash}`}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground">
                          Author: Aayushmaan Chakraborty &lt;aayushmaan.chakraborty@gmail.com&gt;
                        </p>
                        <h3 className="text-foreground font-bold text-sm tracking-tight">
                          {commit.role} <span className="text-terminal-cyan">@ {commit.company}</span>
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed pl-2 border-l border-border/80">
                          {commit.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* End of repo merge */}
              <div className="grid grid-cols-[35px_1fr] md:grid-cols-[45px_1fr] items-center gap-1 select-none">
                <div className="text-primary font-bold text-center">
                  <span className="whitespace-pre">*   </span>
                </div>
                <div className="text-muted-foreground text-[10px] pl-4 italic">
                  Initial commit: Created repository aayushmaan/experience
                </div>
              </div>

            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}
