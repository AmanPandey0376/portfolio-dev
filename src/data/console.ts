/**
 * Static knowledge base for the hero console and its "ask" command.
 * No LLM is called — answers are matched locally from portfolio data only.
 */

export const bootSequence: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: ["Aman Pandey — Full-Stack Developer · AI Engineer"] },
  { cmd: "focus", out: ["AI Agents · Full-Stack · Backend · Automation"] },
  { cmd: "stack", out: ["Python  React  FastAPI", "LLMs    SQL    GitHub"] },
];

export const commands: Record<string, string[]> = {
  help: [
    "whoami       who is this",
    "focus        what I work on",
    "stack        core technologies",
    "experience   roles and dates",
    "projects     selected work",
    "contact      how to reach me",
    "ask <q>      ask about Aman, e.g. ask ai experience",
    "clear        clear the console",
  ],
  whoami: ["Aman Pandey — Full-Stack Developer · AI Engineer", "Based in Mumbai, India."],
  focus: ["AI Agents · LLM integrations · Full-Stack · Backend · Data automation"],
  stack: [
    "lang    Python · JavaScript · TypeScript · SQL · Java",
    "web     React · Tailwind CSS · FastAPI · Flask",
    "ai      Claude · Gemini · Groq · LangChain",
    "data    Pandas · NumPy · BeautifulSoup · n8n",
  ],
  experience: [
    "2025 → now   Associate Software Engineer · Bhatia Brothers FZE",
    "2024 → 2025  Junior Software Developer · VIVA Software Solution",
  ],
  projects: [
    "01  Lead Generation Agent — AI B2B lead pipeline",
    "02  AI Learning Roadmap Generator — Groq + 5 platforms",
    "03  MovieDiary — FastAPI movie tracker API",
  ],
  contact: ["amanap0376@gmail.com", "github.com/AmanPandey0376", "linkedin.com/in/amanpandey76"],
};

export const quickQuestions = [
  "What AI experience does Aman have?",
  "What is Aman's backend stack?",
  "Where does Aman work?",
];

const knowledge: { keys: string[]; answer: string }[] = [
  {
    keys: ["ai", "llm", "agent", "agents", "claude", "gemini", "groq", "grok", "gpt", "model"],
    answer:
      "Aman builds AI-powered agents — Inventory and Lead Generation Agents at Bhatia Brothers FZE — and integrates LLM APIs including Claude, Gemini, Groq and Grok for data extraction, classification and analysis.",
  },
  {
    keys: ["backend", "api", "apis", "server", "fastapi", "flask", "django", "rest"],
    answer:
      "Backend work centres on Python: FastAPI (Lead Generation Agent, MovieDiary) and Flask (Roadmap Generator), plus Django and ASP.NET, REST API design, and SQL databases.",
  },
  {
    keys: ["frontend", "react", "ui", "tailwind", "typescript", "javascript"],
    answer:
      "On the frontend Aman uses React with TypeScript or JavaScript and Tailwind CSS — e.g. the Lead Generation Agent dashboard and the Roadmap Generator UI.",
  },
  {
    keys: ["work", "job", "company", "employer", "current", "role", "experience", "years"],
    answer:
      "Aman is an Associate Software Engineer at Bhatia Brothers FZE (Oct 2025 – present). Previously Junior Software Developer at VIVA Software Solution (Jun 2024 – May 2025). 2+ years in total.",
  },
  {
    keys: ["sql", "database", "databases", "mysql", "mongodb", "sqlite", "postgres", "performance", "optimi"],
    answer:
      "Database work includes CRUD, schema changes and performance tuning in production — SQL optimisation cut data load time by 35%. Toolkit: MySQL, SQLite, MongoDB, SQLAlchemy, MS SQL Server.",
  },
  {
    keys: ["data", "automation", "pandas", "etl", "n8n", "pipeline", "report"],
    answer:
      "Data and automation: Pandas, NumPy, BeautifulSoup, n8n and ETL pipelines — plus CRM data preparation, KPI analysis and management reporting.",
  },
  {
    keys: ["project", "projects", "lead", "roadmap", "movie", "built", "build"],
    answer:
      "Selected work: Lead Generation Agent (React + FastAPI AI pipeline), AI Learning Roadmap Generator (Flask + Groq, 5 resource platforms) and MovieDiary (FastAPI + SQLite API).",
  },
  {
    keys: ["education", "degree", "university", "study", "msc", "bsc", "cgpa"],
    answer:
      "M.Sc. Computer Science (2023–2025, CGPA 7.97) and B.Sc. Information Technology (2020–2023, CGPA 7.72), both from the University of Mumbai.",
  },
  {
    keys: ["contact", "email", "reach", "hire", "linkedin", "github"],
    answer: "Email amanap0376@gmail.com, or find Aman on GitHub (AmanPandey0376) and LinkedIn (amanpandey76).",
  },
  {
    keys: ["where", "location", "based", "mumbai", "india"],
    answer: "Aman is based in Mumbai, Maharashtra, India.",
  },
  {
    keys: ["cert", "certificate", "certification", "internship", "java"],
    answer:
      "Certifications: HP LIFE Data Analytics, Simplilearn Data Analytics, and Java internships with CodeAlpha and Compozent.",
  },
];

export function answer(question: string): string {
  const q = question.toLowerCase();
  let best: { score: number; answer: string } = { score: 0, answer: "" };
  for (const entry of knowledge) {
    const score = entry.keys.reduce((s, k) => (q.includes(k) ? s + 1 : s), 0);
    if (score > best.score) best = { score, answer: entry.answer };
  }
  return best.score > 0
    ? best.answer
    : "I only know what's on this portfolio. Try asking about AI work, backend stack, projects, experience or education.";
}
