export type SkillCategory =
  | "frontend"
  | "backend"
  | "ai"
  | "database"
  | "data"
  | "languages"
  | "tools";

export const skillCategories: { id: "all" | SkillCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI / LLM" },
  { id: "database", label: "Database" },
  { id: "data", label: "Data" },
  { id: "languages", label: "Languages" },
  { id: "tools", label: "Tools" },
];

export const categoryLabel: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI / LLM",
  database: "Database",
  data: "Data / Automation",
  languages: "Language",
  tools: "Tools",
};

export interface Skill {
  id: string;
  name: string;
  /** Icon key resolved by <TechIcon /> */
  icon: string;
  categories: SkillCategory[];
  /** How Aman uses it — only facts from the resume or public repositories. */
  usage: string;
  /** Where it shows up (roles / projects). Optional. */
  seenIn?: string[];
}

const LG = "Lead Generation Agent";
const RM = "Learning Roadmap Generator";
const MD = "MovieDiary";
const BB = "Bhatia Brothers FZE";
const VIVA = "VIVA Software Solution";

export const skills: Skill[] = [
  // Languages
  {
    id: "python",
    name: "Python",
    icon: "python",
    categories: ["languages", "backend", "ai", "data"],
    usage:
      "The core language across Aman's work — backend services, AI agents, data processing, automation and API development.",
    seenIn: [BB, LG, RM, MD],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "javascript",
    categories: ["languages", "frontend"],
    usage: "Frontend logic for React applications and dynamic, interactive web pages.",
    seenIn: [RM],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "typescript",
    categories: ["languages", "frontend"],
    usage: "Type-safe React frontend for the Lead Generation Agent dashboard.",
    seenIn: [LG],
  },
  {
    id: "java",
    name: "Java",
    icon: "java",
    categories: ["languages"],
    usage: "Object-oriented programming foundations, built up through two Java internships and early systems projects on GitHub.",
    seenIn: ["CodeAlpha internship", "Compozent internship"],
  },
  {
    id: "sql",
    name: "SQL",
    icon: "sql",
    categories: ["languages", "database"],
    usage: "Production query work — CRUD operations, schema modifications and query optimisation that reduced data load time by 35%.",
    seenIn: [VIVA],
  },
  {
    id: "html",
    name: "HTML",
    icon: "html",
    categories: ["languages", "frontend"],
    usage: "Semantic markup for web applications and the 10+ dynamic web forms delivered in production.",
    seenIn: [VIVA],
  },
  {
    id: "css",
    name: "CSS",
    icon: "css",
    categories: ["languages", "frontend"],
    usage: "Layout and styling for responsive web interfaces.",
  },

  // Frontend
  {
    id: "react",
    name: "React",
    icon: "react",
    categories: ["frontend"],
    usage: "Builds product frontends — the Lead Generation Agent dashboard and the Learning Roadmap Generator's multi-page app.",
    seenIn: [LG, RM],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwind",
    categories: ["frontend"],
    usage: "Utility-first styling for responsive, mobile-first interfaces.",
    seenIn: [LG, RM],
  },

  // Backend
  {
    id: "fastapi",
    name: "FastAPI",
    icon: "fastapi",
    categories: ["backend"],
    usage:
      "Async Python APIs — the Lead Generation Agent's pipeline streams progress to the UI over Server-Sent Events, and MovieDiary exposes a CRUD API tested through Swagger UI.",
    seenIn: [LG, MD],
  },
  {
    id: "flask",
    name: "Flask",
    icon: "flask",
    categories: ["backend"],
    usage: "Backend for the Learning Roadmap Generator — blueprint routes, Groq integration and a Gunicorn production config.",
    seenIn: [RM],
  },
  {
    id: "django",
    name: "Django",
    icon: "django",
    categories: ["backend"],
    usage: "Python web framework in Aman's backend toolkit alongside FastAPI and Flask.",
  },
  {
    id: "aspnet",
    name: "ASP.NET",
    icon: "dotnet",
    categories: ["backend"],
    usage: "Microsoft web framework in Aman's backend toolkit for server-rendered web applications.",
  },
  {
    id: "rest",
    name: "REST APIs",
    icon: "rest",
    categories: ["backend"],
    usage: "Designs and integrates REST endpoints — lead pipeline routes, roadmap and resource endpoints, and MovieDiary's CRUD API.",
    seenIn: [LG, RM, MD],
  },

  // Databases
  {
    id: "mysql",
    name: "MySQL",
    icon: "mysql",
    categories: ["database"],
    usage: "Relational database for CRUD-heavy web applications.",
  },
  {
    id: "sqlite",
    name: "SQLite",
    icon: "sqlite",
    categories: ["database"],
    usage: "Embedded storage behind the MovieDiary API.",
    seenIn: [MD],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "mongodb",
    categories: ["database"],
    usage: "Document database in Aman's toolkit for flexible, schema-light data.",
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    icon: "sqlalchemy",
    categories: ["database", "backend"],
    usage: "ORM models and session management for MovieDiary's FastAPI + SQLite backend.",
    seenIn: [MD],
  },
  {
    id: "mssql",
    name: "MS SQL Server",
    icon: "mssql",
    categories: ["database", "tools"],
    usage: "Microsoft relational database and tooling in Aman's stack.",
  },

  // AI / LLM
  {
    id: "claude",
    name: "Claude API",
    icon: "claude",
    categories: ["ai"],
    usage:
      "Integrated into AI workflows for automated data extraction, classification and analysis. In the Lead Generation Agent it drives product analysis, structured lead extraction and enrichment.",
    seenIn: [BB, LG],
  },
  {
    id: "gemini",
    name: "Gemini API",
    icon: "gemini",
    categories: ["ai"],
    usage: "One of the LLM APIs Aman integrates. The Lead Generation Agent ships with a Gemini SDK wrapper alongside other providers.",
    seenIn: [LG],
  },
  {
    id: "groq",
    name: "Groq API",
    icon: "groq",
    categories: ["ai"],
    usage:
      "Fast LLM inference that generates structured learning roadmaps in the Roadmap Generator, with fallback roadmaps if the API is unavailable.",
    seenIn: [RM, LG],
  },
  {
    id: "agents",
    name: "AI Agents",
    icon: "agents",
    categories: ["ai"],
    usage:
      "Built AI-powered Inventory and Lead Generation Agents that automate inventory analysis, lead discovery and business recommendations.",
    seenIn: [BB, LG],
  },
  {
    id: "langchain",
    name: "LangChain",
    icon: "langchain",
    categories: ["ai"],
    usage: "LLM application framework in Aman's AI toolkit.",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    icon: "huggingface",
    categories: ["ai"],
    usage: "Model hub and libraries in Aman's AI toolkit.",
  },

  // Data / Automation
  {
    id: "pandas",
    name: "Pandas",
    icon: "pandas",
    categories: ["data"],
    usage: "Data processing and analysis — including parsing uploaded Excel files in the Lead Generation Agent backend.",
    seenIn: [LG],
  },
  {
    id: "numpy",
    name: "NumPy",
    icon: "numpy",
    categories: ["data"],
    usage: "Numerical computing for data analysis work.",
  },
  {
    id: "bs4",
    name: "BeautifulSoup",
    icon: "bs4",
    categories: ["data"],
    usage: "HTML parsing for the Roadmap Generator's multi-platform resource scrapers.",
    seenIn: [RM],
  },
  {
    id: "n8n",
    name: "n8n",
    icon: "n8n",
    categories: ["data", "tools"],
    usage: "Workflow automation for connecting services and data flows.",
  },
  {
    id: "etl",
    name: "ETL Pipelines",
    icon: "etl",
    categories: ["data"],
    usage:
      "Data extraction, classification and consolidation — including historical CRM data consolidation that feeds KPI analysis and reporting.",
    seenIn: [BB],
  },

  // Tools
  {
    id: "git",
    name: "Git & GitHub",
    icon: "github",
    categories: ["tools"],
    usage: "Version control across every project; GitHub hosts Aman's public projects and experiments.",
  },
  {
    id: "powerbi",
    name: "Power BI",
    icon: "powerbi",
    categories: ["tools", "data"],
    usage: "Business intelligence dashboards for analysis and reporting.",
  },
  {
    id: "tableau",
    name: "Tableau",
    icon: "tableau",
    categories: ["tools", "data"],
    usage: "Data visualisation for analysis and reporting.",
  },
  {
    id: "excel",
    name: "Excel",
    icon: "excel",
    categories: ["tools", "data"],
    usage: "Data preparation, validation and reporting; the Lead Generation Agent also imports and exports leads as .xlsx.",
    seenIn: [LG],
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    icon: "jupyter",
    categories: ["tools", "data"],
    usage: "Notebook environment for data exploration and analysis.",
  },
  {
    id: "colab",
    name: "Google Colab",
    icon: "colab",
    categories: ["tools", "data"],
    usage: "Hosted notebooks for data and ML experiments.",
  },
];
