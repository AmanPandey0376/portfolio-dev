export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  points: { text: string; metric?: string }[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    id: "bhatia",
    title: "Associate Software Engineer",
    company: "Bhatia Brothers FZE",
    location: "Mumbai, India",
    start: "Oct 2025",
    end: "Present",
    current: true,
    summary: "AI agents and LLM workflows that automate inventory analysis, lead discovery and business insight.",
    points: [
      {
        text: "Developed AI-powered Inventory and Lead Generation Agents using Python, LLM APIs and data-processing pipelines to automate inventory analysis, lead discovery and business recommendations.",
      },
      {
        text: "Integrated Claude and Grok APIs into AI workflows for automated data extraction, classification, analysis and intelligent business insights.",
      },
      {
        text: "Prepared MIRF, business analysis and management reports — handling CRM data preparation, validation, KPI analysis, historical data consolidation and reporting to support inventory planning and sales decisions.",
      },
    ],
    stack: ["Python", "Claude API", "Grok API", "Data pipelines", "CRM data", "Reporting"],
  },
  {
    id: "viva",
    title: "Junior Software Developer",
    company: "VIVA Software Solution",
    location: "Mumbai, India",
    start: "Jun 2024",
    end: "May 2025",
    summary: "Production databases, live deployments and dynamic web forms.",
    points: [
      { text: "Managed database operations including CRUD functionality, schema modifications and performance tuning." },
      { text: "Deployed real-time code updates and hotfixes on live production websites hosted on GoDaddy." },
      { text: "Optimised SQL queries to reduce data load time by 35%.", metric: "−35% load time" },
      {
        text: "Developed 10+ dynamic Web Forms, including a smart search feature for retrieving live information.",
        metric: "10+ web forms",
      },
    ],
    stack: ["SQL", "Databases", "Web Forms", "Production deploys"],
  },
];
