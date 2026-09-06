import { motion } from "framer-motion"
import { skillGroups } from "@/data/portfolio"

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section id="skills" className="px-4 py-20 md:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary mb-2">Technical Expertise</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Deep expertise in AI/ML, privacy-first systems, and full-stack development with a focus on production quality.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {/* Category title */}
              <div>
                <h3 className="text-lg font-display font-bold mb-2">{group.title}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>

              {/* Skills for this category */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth text-sm font-medium text-foreground/90 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
