import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-border bg-card shadow-[0_0_30px_rgba(34,197,94,0.05)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="size-3 rounded-full bg-terminal-red" />
        <span className="size-3 rounded-full bg-terminal-yellow" />
        <span className="size-3 rounded-full bg-primary" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function TerminalPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-1">
      <span className="text-primary">$</span>
      <span>{children}</span>
    </div>
  )
}

export function TerminalCursor() {
  return (
    <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary cursor-blink" />
  )
}

export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 font-mono text-xs tracking-widest text-primary uppercase">
        {label}
      </p>
      <h2 className="font-mono text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
