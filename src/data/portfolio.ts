export const site = {
  name: "Aayushmaan Chakraborty",
  handle: "aayushmaan.dev",
  title: "AI Engineer",
  tagline: "Building privacy-first systems that run without the cloud",
  email: "aayushmaan.chakraborty@gmail.com",
  github: "https://github.com/Aayushmaan-24",
  linkedin: "https://www.linkedin.com/in/aayushmaanchakraborty/",
  school: "CSE (AI/ML) · SRMIST Chennai",
  status: "Available for research & internships",
  bio: "Third-year student with a 9.96 CGPA shipping production AI tools — RAG pipelines, local LLMs, speech processing systems. Everything runs offline, costs ₹0 to operate, and handles sensitive data without it ever leaving your machine.",
  stats: [
    { value: "3+", label: "Projects Shipped" },
    { value: "9+", label: "Certifications" },
    { value: "1st", label: "2x Hackathons" },
  ],
} as const

export const navLinks = [
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#achievements", label: "achievements" },
] as const

export const projects = [
  {
    icon: "🎙️",
    title: "Smart Meeting Summarizer",
    description:
      "Fully offline pipeline: faster-whisper for ASR + local LLM via Ollama. Transcribes any audio/video, outputs meeting notes, action items, and a follow-up email. Zero cloud. Zero cost.",
    tags: [
      { label: "100% Offline", variant: "default" as const },
      { label: "faster-whisper", variant: "cyan" as const },
      { label: "Ollama", variant: "cyan" as const },
      { label: "Python", variant: "secondary" as const },
      { label: "LLM", variant: "secondary" as const },
    ],
    badge: "arXiv paper in prep",
    url: "https://github.com/Aayushmaan-24/MeetingSummarizer",
  },
  {
    icon: "💬",
    title: "Financial RAG Chatbot",
    description:
      "Deep learning chatbot fine-tuned on domain-specific CSV and trade data using retrieval-augmented generation. Explicitly refuses to answer outside its grounding documents — hallucination-resistant by design.",
    tags: [
      { label: "RAG", variant: "default" as const },
      { label: "LangChain", variant: "cyan" as const },
      { label: "PyTorch", variant: "cyan" as const },
      { label: "Finance", variant: "secondary" as const },
      { label: "Python", variant: "secondary" as const },
    ],
    badge: "Deployed",
    url: "https://github.com/Aayushmaan-24/Financial-RAG-ChatBot",
  },
  {
    icon: "🔊",
    title: "Voice Transcriber",
    description:
      "Records voice, transcribes using OpenAI Whisper, cleans up transcript with a local AI model. All processing on-device for complete privacy. No audio ever leaves your machine.",
    tags: [
      { label: "On-device", variant: "default" as const },
      { label: "Whisper", variant: "cyan" as const },
      { label: "Privacy-first", variant: "accent" as const },
      { label: "Web App", variant: "secondary" as const },
    ],
    badge: "Production",
    url: "https://github.com/Aayushmaan-24/VoiceTranscriber",
  },
  {
    icon: "🤖",
    title: "Gemini AI Chat with Real-Time Search",
    description:
      "Python-based Gemini chatbot with live Google Search integration, persistent conversation history, and support for both interactive and demo modes.",
    tags: [
      { label: "Gemini API", variant: "cyan" as const },
      { label: "Python", variant: "secondary" as const },
      { label: "CLI", variant: "secondary" as const },
      { label: "Google Search", variant: "secondary" as const },
    ],
    badge: "Shipped",
    url: "https://github.com/Aayushmaan-24/GeminiAssistant",
  },
] as const

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "Java", "JavaScript", "C", "HTML/CSS", "SQL"],
  },
  {
    title: "AI / ML",
    skills: [
      "PyTorch",
      "OpenCV",
      "HuggingFace",
      "faster-whisper",
      "Ollama",
      "LangChain",
      "CrewAI",
      "RAG",
    ],
  },
  {
    title: "Web & Backend",
    skills: ["FastAPI", "Flask", "React", "Next.js", "Tailwind", "Streamlit"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Docker", "Git", "Linux", "Google ADK", "Jupyter", "VS Code"],
  },
  {
    title: "Data",
    skills: ["Pandas", "NumPy", "Tableau", "Excel"],
  },
  {
    title: "Specialisations",
    skills: [
      "On-device AI",
      "Speech Processing",
      "Prompt Engineering",
      "Computer Vision",
      "Deep Learning",
    ],
  },
] as const

export const experience = [
  {
    date: "Nov 2025 — Dec 2025",
    role: "Python Developer Intern",
    company: "CodexIntern · Remote",
    description:
      "Built a Gemini-based CLI chat application with persistent conversation history. Developed a Python CLI voice assistant powered by Gemini. Created a Flask-based sentiment analysis web app for real-time text evaluation.",
  },
  {
    date: "Feb 2025",
    role: "Quantitative Research Virtual Experience",
    company: "JP Morgan Chase & Co. · Forage",
    description:
      "Analyzed a book of loans to estimate probability of default. Used dynamic programming to convert FICO scores into categorical data for default prediction.",
  },
  {
    date: "Feb 2025",
    role: "Data Science Virtual Experience",
    company: "British Airways · Forage",
    description:
      "Scraped and analyzed customer review data. Built a predictive model to understand factors influencing buying behaviour.",
  },
  {
    date: "Jan 2025",
    role: "Data Analysis Virtual Experience",
    company: "Deloitte Australia · Forage",
    description:
      "Created a data dashboard using Tableau. Used Excel to classify data and draw business conclusions for a forensic technology simulation.",
  },
] as const

export const achievements = [
  {
    icon: "🥇",
    title: "1st Place — PyQuest",
    subtitle: "SRMIST · Jan 2026 · Python + DSA competition",
  },
  {
    icon: "🏆",
    title: "Finalist — Pentathon 2.0 Datathon",
    subtitle: "SRMIST · Mar 2025 · Bias mitigation model",
  },
  {
    icon: "🏆",
    title: "Finalist — Data Samurai Hackathon",
    subtitle: "SRMIST · Feb 2025 · 97% accuracy dataset cleaning",
  },
  {
    icon: "🌐",
    title: "GSSoC 2025 & 2026",
    subtitle: "Open source contributor · 12+ PRs merged",
  },
  {
    icon: "🎓",
    title: "CGPA 9.96",
    subtitle: "CSE (AI/ML) · SRMIST Chennai · Batch 2024–28",
  },
] as const

export const certifications = [
  { name: "Code in Place 2025", issuer: "Stanford University" },
  { name: "Deep Learning Institute", issuer: "NVIDIA — Satellite Imagery" },
  { name: "OpenCV & PyTorch", issuer: "OpenCV University" },
  { name: "Prompt Engineering", issuer: "Columbia University" },
  { name: "Forward Program", issuer: "McKinsey & Company" },
  { name: "Agentforce Specialist", issuer: "Salesforce" },
] as const

export const terminalLines = [
  { type: "cmd" as const, text: "python main.py meeting.mp3" },
  { type: "out" as const, text: "  Loading faster-whisper (base)..." },
  {
    type: "out" as const,
    parts: [
      { text: "  Connecting to ", className: "" },
      { text: "ollama", className: "text-primary" },
      { text: " (llama3.2)...", className: "" },
    ],
  },
  {
    type: "out" as const,
    parts: [
      { text: "  Transcribing... ", className: "" },
      { text: "✓ done", className: "text-primary" },
    ],
  },
  {
    type: "out" as const,
    parts: [
      { text: "  Summarizing...  ", className: "" },
      { text: "✓ done", className: "text-primary" },
    ],
  },
  {
    type: "out" as const,
    parts: [
      { text: "  Output: ", className: "" },
      { text: "meeting_notes.md", className: "text-terminal-cyan" },
    ],
  },
  {
    type: "out" as const,
    parts: [
      { text: "         ", className: "" },
      { text: "meeting_email.md", className: "text-terminal-cyan" },
    ],
  },
  {
    type: "out" as const,
    parts: [
      { text: "         ", className: "" },
      { text: "transcript.txt", className: "text-terminal-cyan" },
    ],
  },
  {
    type: "success" as const,
    text: "  ✓ 100% offline. Zero API keys.",
  },
] as const
