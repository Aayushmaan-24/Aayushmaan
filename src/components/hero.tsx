import { motion } from "framer-motion"
import { ArrowDown, Code, ExternalLink, Mail } from "lucide-react"
import { site } from "@/data/portfolio"
import { Button } from "@/components/ui/button"

export function Hero() {
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
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-3xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile section */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Profile image */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
              <img
                src="/profile.jpg"
                alt={site.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-[center_20%] border-2 border-primary/20"
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-2">
              {site.name}
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium">{site.title}</p>
          </motion.div>

          {/* School */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-muted-foreground mb-6"
          >
            {site.school}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed mb-8"
          >
            {site.bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-8 mb-12 w-full"
          >
            {site.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Button size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`mailto:${site.email}`}>Get in Touch</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full hover:bg-secondary transition-smooth text-muted-foreground hover:text-primary"
              aria-label="GitHub"
            >
              <Code className="w-6 h-6" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full hover:bg-secondary transition-smooth text-muted-foreground hover:text-primary"
              aria-label="LinkedIn"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="p-3 rounded-full hover:bg-secondary transition-smooth text-muted-foreground hover:text-primary"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          variants={itemVariants}
          onClick={scrollToProjects}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
          aria-label="Scroll to projects"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  )
}
