import { motion } from "framer-motion"
import { experience } from "@/data/portfolio"

export function Experience() {
  return (
    <section id="experience" className="px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary mb-2">Professional Journey</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Internships, research experiences, and professional development opportunities.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-4 md:gap-8 items-start"
            >
              {/* Timeline line and dot */}
              <div className="absolute left-0 md:left-1/2 md:translate-x-[-50%] top-0 md:top-4 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              {idx < experience.length - 1 && (
                <div className="absolute left-2 md:left-1/2 md:translate-x-[-50%] top-8 bottom-0 w-0.5 bg-border/50" />
              )}

              {/* Date - desktop only */}
              <div className="hidden md:block text-right pr-8">
                <p className="text-sm font-mono text-primary font-semibold">{exp.date}</p>
              </div>

              {/* Content */}
              <div className="md:col-span-3">
                {/* Date - mobile only */}
                <p className="md:hidden text-xs font-mono text-primary font-semibold mb-2">
                  {exp.date}
                </p>

                {/* Role */}
                <h3 className="text-lg font-display font-bold mb-1">{exp.role}</h3>

                {/* Company */}
                <p className="text-sm text-primary font-medium mb-3">{exp.company}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
