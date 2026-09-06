import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section id="projects" className="px-4 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary mb-2">Featured Work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Projects & Contributions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Production AI systems, privacy-first applications, and research tools built with Python, PyTorch, and modern web technologies.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -2 }}
            >
              <div className="h-full rounded-xl border border-border bg-card hover:bg-secondary transition-smooth overflow-hidden">
                {/* Card content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl md:text-4xl">{project.icon}</span>
                    <Badge variant="outline">{project.badge}</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-smooth">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag.label} variant="secondary" className="text-xs">
                        {tag.label}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-sm"
                  >
                    View on GitHub
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-xl transition-all pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
