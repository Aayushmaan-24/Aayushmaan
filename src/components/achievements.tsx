import { motion } from "framer-motion"

import { SectionHeader } from "@/components/terminal-window"
import { TerminalWindow } from "@/components/terminal-window"
import { achievements, certifications } from "@/data/portfolio"

export function Achievements() {
  return (
    <section id="achievements" className="px-4 py-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="// pytest & verification"
          title="Wins & Certifications Spec"
          description="Validation test suites confirming achievements, hackathons, and certifications."
        />

        <div className="grid gap-6 lg:grid-cols-2 items-stretch mt-8">
          
          {/* Left Panel: Pytest Runner (Achievements) */}
          <div>
            <TerminalWindow title="pytest -v achievements_spec.py" className="h-full flex flex-col justify-between">
              <div className="font-mono text-xs leading-relaxed space-y-4">
                
                {/* Pytest Header */}
                <div className="text-muted-foreground/60 border-b border-border/40 pb-2">
                  <p>============================= test session starts =============================</p>
                  <p>platform linux -- Python 3.10.12, pytest-7.4.3, pluggy-1.3.0</p>
                  <p>rootdir: /home/aayushmaan/achievements</p>
                  <p>collected {achievements.length} items</p>
                </div>

                {/* Test Suite Items */}
                <div className="space-y-3">
                  {achievements.map((item, idx) => {
                    const testName = item.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "_")
                      .replace(/_+/g, "_")

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="border-l border-primary/20 pl-2 py-0.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-muted-foreground font-mono">
                            tests/test_wins.py::<span className="text-foreground">test_{testName}</span>
                          </span>
                          <span className="text-primary font-bold bg-primary/10 border border-primary/20 px-1 rounded-sm text-[10px]">
                            PASSED
                          </span>
                        </div>
                        <div className="pl-4 mt-1 text-[10px] text-muted-foreground">
                          <span className="text-terminal-yellow font-semibold">{item.icon}</span> {item.title} — {item.subtitle}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Pytest Summary Footer */}
              <div className="mt-8 pt-2 border-t border-border/40 font-mono text-xs text-primary font-bold text-center">
                ========================= {achievements.length} passed in 0.42s =========================
              </div>
            </TerminalWindow>
          </div>

          {/* Right Panel: Certifications check */}
          <div>
            <TerminalWindow title="bash ./verify_certs.sh" className="h-full flex flex-col justify-between">
              <div className="font-mono text-xs leading-relaxed space-y-4">
                
                {/* Script Header */}
                <div className="text-muted-foreground/60 border-b border-border/40 pb-2">
                  <p>$ ./verify_certs.sh --verbose</p>
                  <p>Initializing SHA256 checksum verifications for credentials...</p>
                  <p>Verifying signatures via external public key keyservers...</p>
                </div>

                {/* Cert Listings */}
                <div className="space-y-2.5">
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, x: 5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="flex items-start justify-between gap-4 border border-border/60 bg-secondary/10 px-3 py-1.5 hover:border-primary/30 transition-colors"
                    >
                      <div>
                        <p className="text-foreground font-semibold text-xs">{cert.name}</p>
                        <p className="text-[10px] text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary font-mono text-[10px] font-bold">OK</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Validation Result Footer */}
              <div className="mt-8 pt-2 border-t border-border/40 font-mono text-xs text-primary font-bold flex justify-between">
                <span>Verification status: SUCCESS</span>
                <span>Exit code: 0</span>
              </div>
            </TerminalWindow>
          </div>

        </div>
      </div>
    </section>
  )
}
