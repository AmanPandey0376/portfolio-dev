import {
  siClaude,
  siCss,
  siDjango,
  siDotnet,
  siFastapi,
  siFlask,
  siGit,
  siGithub,
  siGooglecolab,
  siGooglegemini,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJupyter,
  siLangchain,
  siMongodb,
  siMysql,
  siN8n,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPython,
  siReact,
  siSqlalchemy,
  siSqlite,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import {
  Bot,
  ChartColumn,
  ChartScatter,
  Database,
  DatabaseZap,
  Sheet,
  Soup,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

type SimpleIcon = { path: string; title: string };

const brand: Record<string, SimpleIcon> = {
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  java: siOpenjdk,
  html: siHtml5,
  css: siCss,
  react: siReact,
  tailwind: siTailwindcss,
  fastapi: siFastapi,
  flask: siFlask,
  django: siDjango,
  dotnet: siDotnet,
  mysql: siMysql,
  sqlite: siSqlite,
  mongodb: siMongodb,
  sqlalchemy: siSqlalchemy,
  claude: siClaude,
  gemini: siGooglegemini,
  langchain: siLangchain,
  huggingface: siHuggingface,
  pandas: siPandas,
  numpy: siNumpy,
  n8n: siN8n,
  git: siGit,
  github: siGithub,
  jupyter: siJupyter,
  colab: siGooglecolab,
};

// Technologies without a Simple Icons mark get a consistent line icon instead.
const generic: Record<string, LucideIcon> = {
  sql: Database,
  rest: Webhook,
  groq: Zap,
  agents: Bot,
  bs4: Soup,
  etl: Workflow,
  powerbi: ChartColumn,
  tableau: ChartScatter,
  excel: Sheet,
  mssql: DatabaseZap,
};

export function TechIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const b = brand[name];
  if (b) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d={b.path} />
      </svg>
    );
  }
  const Icon = generic[name] ?? Database;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
