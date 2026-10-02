export const profile = {
  name: "Aman Pandey",
  role: "Full-Stack Developer • AI Engineer",
  location: "Mumbai, Maharashtra, India",
  email: "amanap0376@gmail.com",
  headline: "Building intelligent software that turns complex problems into scalable products.",
  summary:
    "Full-Stack Developer with 2+ years of experience building web applications, APIs, AI agents, data pipelines, and automation workflows.",
  current: { title: "Associate Software Engineer", company: "Bhatia Brothers FZE" },
  links: {
    github: "https://github.com/AmanPandey0376",
    linkedin: "https://www.linkedin.com/in/amanpandey76/",
    email: "mailto:amanap0376@gmail.com",
    resume: "/Aman_Pandey_Resume.pdf",
  },
  llms: ["Claude", "Gemini", "Groq"],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

/** The four layers Aman works across — used in the About section. */
export const stackLayers = [
  {
    key: "interface",
    label: "Interface",
    detail: "React, TypeScript, Tailwind CSS — responsive dashboards and product UIs.",
    tools: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    key: "api",
    label: "APIs & Services",
    detail: "FastAPI, Flask, Django, ASP.NET — REST endpoints, streaming pipelines, production hotfixes.",
    tools: ["FastAPI", "Flask", "REST"],
  },
  {
    key: "intelligence",
    label: "Intelligence",
    detail: "AI agents and LLM integrations with Claude, Gemini and Groq for extraction, classification and analysis.",
    tools: ["Claude", "Gemini", "Groq"],
  },
  {
    key: "data",
    label: "Data & Automation",
    detail: "SQL tuning, ETL pipelines, Pandas, scraping and n8n workflows that feed reporting and decisions.",
    tools: ["SQL", "Pandas", "n8n"],
  },
] as const;

export const highlights = [
  { value: "2+", label: "Years building software" },
  { value: "AI / LLM", label: "Agents & integrations" },
  { value: "Full-Stack", label: "React → FastAPI" },
  { value: "Backend", label: "APIs & databases" },
  { value: "Data", label: "Pipelines & automation" },
] as const;
