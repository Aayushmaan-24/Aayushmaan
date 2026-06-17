import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, FileCode, FolderOpen } from "lucide-react"
import { useState, useEffect } from "react"

import { SectionHeader } from "@/components/terminal-window"
import { Badge } from "@/components/ui/badge"
import { TerminalWindow } from "@/components/terminal-window"
import { projects } from "@/data/portfolio"

export function Projects() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Map project to mock filename
  const getFilename = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_") + ".py"
  }

  // Trigger loading effect when selected index changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [selectedIdx])

  const selectedProj = projects[selectedIdx]

  return (
    <section id="projects" className="px-4 py-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="// ranger projects"
          title="File System / Projects"
          description="Navigate the files to read project summaries. Built for on-device operations."
        />

        <div className="grid gap-6 lg:grid-cols-5 items-stretch mt-8">
          {/* Left Panel: Ranger directory list */}
          <div className="lg:col-span-2">
            <TerminalWindow title="ranger ~/projects" className="h-full flex flex-col">
              <div className="flex items-center gap-2 text-primary font-bold text-xs mb-3 pb-2 border-b border-border">
                <FolderOpen className="size-3.5" />
                <span>projects/ (4 items)</span>
              </div>
              <div className="space-y-1 font-mono text-xs flex-1">
                {projects.map((proj, idx) => {
                  const filename = getFilename(proj.title)
                  const isSelected = selectedIdx === idx
                  return (
                    <button
                      key={proj.title}
                      onClick={() => setSelectedIdx(idx)}
                      className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileCode className="size-3.5 shrink-0" />
                        <span className="truncate">{filename}</span>
                      </div>
                      <span className="text-[10px] opacity-60">
                        {isSelected ? "[active]" : ""}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-border text-[10px] text-muted-foreground flex justify-between">
                <span>Select file to run cat</span>
                <span>Total: 4 files</span>
              </div>
            </TerminalWindow>
          </div>

          {/* Right Panel: Code file previewer */}
          <div className="lg:col-span-3 flex flex-col min-h-[300px]">
            <TerminalWindow
              title={`cat ~/projects/${getFilename(selectedProj.title)}`}
              className="flex-1 flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex items-center justify-center font-mono text-xs text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">⧗</span>
                      <span>READING FILE SYSTEM METADATA...</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Meta stats block */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground font-mono bg-secondary/40 p-2.5 border border-border mb-4">
                        <div>
                          <span className="text-primary">Permissions:</span> -rwxr-xr-x
                        </div>
                        <div>
                          <span className="text-primary">Last Edit:</span> 2026-06-14
                        </div>
                        <div>
                          <span className="text-primary">Status:</span> {selectedProj.badge}
                        </div>
                        <div>
                          <span className="text-primary">Encoding:</span> UTF-8
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-lg font-bold text-foreground font-mono flex items-center gap-2">
                            <span className="text-primary">{selectedProj.icon}</span>
                            {selectedProj.title}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-mono">
                            {selectedProj.description}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-2 font-mono">
                            // Import Dependencies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedProj.tags.map((tag) => (
                              <Badge key={tag.label} variant={tag.variant}>
                                {tag.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-border flex flex-wrap gap-4 items-center justify-between font-mono text-xs">
                      <Badge variant="outline">Exit Code: 0</Badge>
                      <a
                        href={selectedProj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-terminal-cyan hover:text-primary transition-colors hover:underline"
                      >
                        Launch Source Executable
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  )
}
