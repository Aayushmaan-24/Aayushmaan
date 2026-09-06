import { motion } from "framer-motion"
import { achievements, certifications } from "@/data/portfolio"

export function Achievements() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section id="achievements" className="px-4 py-20 md:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary mb-2">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Achievements & Certifications
          </h2>
          <p className="text-lg text-muted-foreground">
            Competitions, awards, and professional certifications recognizing expertise.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Achievements */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Awards & Recognition</h3>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-smooth"
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</span>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Certifications</h3>
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-secondary/30 transition-smooth"
                >
                  <h4 className="font-medium text-foreground text-sm">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
