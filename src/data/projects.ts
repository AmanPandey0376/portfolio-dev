export type ProjectFilter = "all" | "ai" | "fullstack" | "backend" | "apis";

export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
  { id: "apis", label: "APIs" },
];

export interface ArchNode {
  id: string;
  label: string;
  sub: string;
  detail: string;
}

export interface Project {
  id: "leadgen" | "roadmap" | "moviediary";
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  filters: Exclude<ProjectFilter, "all">[];
  summary: string;
  problem: string;
  solution: string;
  architecture: ArchNode[];
  stack: string[];
  features: string[];
  results: { value?: string; label: string }[];
  links: { github: string; live?: string };
}

export const projects: Project[] = [
  {
    id: "leadgen",
    title: "Lead Generation Agent",
    tagline: "AI-Powered B2B Lead Generation Platform",
    category: "AI Agent · Full-Stack",
    featured: true,
    filters: ["ai", "fullstack", "backend", "apis"],
    summary:
      "An AI agent that turns a product description into validated, enriched B2B leads — streaming every pipeline stage to a live dashboard.",
    problem:
      "B2B prospecting means hours of manual searching, copying contact details and cleaning spreadsheets — especially when targeting a specific regional market such as the UAE and wider GCC.",
    solution:
      "A six-stage agentic pipeline. An LLM analyses the product to produce regional search keywords, the agent discovers companies through Google Search and Maps, extracts structured leads, enriches missing contact fields, validates them, and deduplicates everything into PostgreSQL — reporting progress to the UI in real time.",
    architecture: [
      {
        id: "user",
        label: "User",
        sub: "Product brief or .xlsx",
        detail: "Pick a product/service from the dashboard dropdowns or upload an Excel file for bulk runs.",
      },
      {
        id: "frontend",
        label: "React Dashboard",
        sub: "React · TypeScript · Vite",
        detail: "Dark dashboard built with Tailwind CSS and shadcn/ui. Reads the pipeline stream, renders a lead grid and exports to Excel.",
      },
      {
        id: "api",
        label: "FastAPI",
        sub: "SSE StreamingResponse",
        detail: "POST /api/generate-leads opens a Server-Sent Events stream and pushes a status event at every pipeline stage.",
      },
      {
        id: "agent",
        label: "AI Agent",
        sub: "Claude API",
        detail: "LLM calls handle product analysis, structured JSON lead extraction and contact enrichment. Wrappers also exist for Gemini, Groq, OpenAI and xAI Grok.",
      },
      {
        id: "search",
        label: "Search APIs",
        sub: "Serper.dev — Search + Maps",
        detail: "Concurrent keyword queries (asyncio.gather) return organic results and Places listings with phones, addresses and domains.",
      },
      {
        id: "validate",
        label: "Validation",
        sub: "Rules-based filtering",
        detail: "Checks domain format, filters placeholder data such as example.com, and enforces GCC phone formats.",
      },
      {
        id: "db",
        label: "PostgreSQL",
        sub: "asyncpg · dedupe",
        detail: "Upserts leads; a match on website or email updates missing fields instead of creating duplicates.",
      },
      {
        id: "result",
        label: "Result",
        sub: "Lead grid · Excel · Email",
        detail: "Lead table with contact details, one-click email actions and .xlsx export.",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "Claude API", "Serper.dev", "SSE"],
    features: [
      "Live pipeline progress over Server-Sent Events",
      "AI product analysis → regional keywords and buyer profiles",
      "Concurrent company discovery across Google Search and Maps",
      "LLM-structured extraction: contact, title, segment, priority",
      "Batched enrichment for missing email, phone and LinkedIn",
      "Rules-based validation and placeholder filtering",
      "PostgreSQL deduplication by website, email and company",
      "Bulk mode via Excel upload; export leads to .xlsx",
    ],
    results: [
      { label: "Automates lead discovery, market research, data enrichment and email outreach" },
      { label: "Deployed frontend on Vercel" },
    ],
    links: {
      github: "https://github.com/AmanPandey0376/Lead-Generation-Agent",
    },
  },
  {
    id: "roadmap",
    title: "AI Learning Roadmap Generator",
    tagline: "Personalised roadmaps + resources from 5 platforms",
    category: "AI · Full-Stack",
    featured: true,
    filters: ["ai", "fullstack", "backend", "apis"],
    summary:
      "Type a skill or job title and get a structured, AI-generated learning roadmap — plus curated resources aggregated from five platforms.",
    problem:
      "People struggle to find structured, personalised learning paths for a new skill or career move, and good resources are scattered across many platforms.",
    solution:
      "Groq generates a structured roadmap as JSON — modules, mini-projects, a capstone and time estimates — while concurrent collectors gather resources from YouTube, GitHub, Udemy, Coursera and Kaggle. Results are ranked and filtered, with fallbacks at every layer.",
    architecture: [
      {
        id: "user",
        label: "User Goal",
        sub: "Skill or job title",
        detail: "e.g. “Data Scientist” or “React Developer” entered on the Home page.",
      },
      {
        id: "frontend",
        label: "React App",
        sub: "React · Vite · Tailwind",
        detail: "Home, Roadmap and Resources pages with Axios API client, error boundary and accessibility helpers.",
      },
      {
        id: "api",
        label: "Flask API",
        sub: "Blueprint routes",
        detail: "POST /api/roadmap and GET /api/resources/<skill>, with CORS, input validation and a Gunicorn config.",
      },
      {
        id: "agent",
        label: "Groq AI",
        sub: "Llama 3.1 8B Instant",
        detail: "Prompted for structured JSON output: modules, mini-projects, capstone, difficulty and time estimates. Falls back to template roadmaps if the call fails.",
      },
      {
        id: "search",
        label: "Resource Collectors",
        sub: "YouTube · GitHub · Udemy · Coursera · Kaggle",
        detail: "APIs and BeautifulSoup scrapers run concurrently in a ThreadPoolExecutor with 10s per-source and 30s total timeouts.",
      },
      {
        id: "validate",
        label: "Rank & Filter",
        sub: "AI ranker · URL validation",
        detail: "Ranks resources for relevance and filters out irrelevant content and personal playlists.",
      },
      {
        id: "result",
        label: "Roadmap",
        sub: "Modules + resources",
        detail: "A personalised, structured roadmap with free and paid resources the learner can filter.",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Python", "Flask", "Groq API", "BeautifulSoup", "YouTube Data API", "Gunicorn"],
    features: [
      "Structured modules with mini-projects and a capstone",
      "Adaptive difficulty and realistic time estimates",
      "Concurrent aggregation from 5 educational platforms",
      "AI-ranked resources with smart filtering",
      "Free / paid resource toggle",
      "Multi-layer fallbacks for AI and scraping failures",
      "Mobile-first UI built toward WCAG 2.1 AA",
      "Production config with Gunicorn",
    ],
    results: [
      { value: "<2s", label: "Response times with parallel fetching and caching" },
      { value: "95%+", label: "Uptime with intelligent failover" },
      { value: "5+", label: "Platforms aggregated concurrently" },
    ],
    links: {
      github: "https://github.com/AmanPandey0376/ai-powered-learning-roadmap-generator",
    },
  },
  {
    id: "moviediary",
    title: "MovieDiary",
    tagline: "Personal Movie Tracker API",
    category: "Backend · REST API",
    featured: false,
    filters: ["backend", "apis"],
    summary:
      "A compact REST API for keeping a personal log of watched movies, built with FastAPI and SQLAlchemy on SQLite.",
    problem: "A simple, well-structured backend for logging the movies you watch — with a clean, self-documenting API.",
    solution:
      "FastAPI endpoints backed by SQLAlchemy models and Pydantic schemas. Entries are created through multipart forms with a poster upload, stored in SQLite, and every endpoint can be tried live in Swagger UI.",
    architecture: [
      { id: "user", label: "Client", sub: "Swagger UI / HTTP", detail: "Interactive docs at /docs exercise every endpoint." },
      { id: "api", label: "FastAPI", sub: "Routes + dependencies", detail: "POST /movies/, GET /movies/ and DELETE /movies/{id}, with a DB session dependency." },
      { id: "agent", label: "CRUD layer", sub: "Pydantic + SQLAlchemy", detail: "Schemas validate input; crud.py isolates database operations from the routes." },
      { id: "db", label: "SQLite", sub: "movies table", detail: "title, genre, watch_date and the stored poster image path." },
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "Pydantic", "Swagger UI"],
    features: [
      "Full create / read / delete flow",
      "Poster image upload via multipart form",
      "Pydantic request and response schemas",
      "Separated CRUD layer and ORM models",
      "Self-documenting API with Swagger UI",
    ],
    results: [{ label: "Endpoints implemented and tested through Swagger UI" }],
    links: { github: "https://github.com/AmanPandey0376/MovieDiary" },
  },
];
