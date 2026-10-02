# Aman Pandey — Portfolio

React + TypeScript + Vite + Tailwind CSS + Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview
```

## Updating content

All copy lives in `src/data/` — components only render it.

| File | What it holds |
| --- | --- |
| `profile.ts` | name, headline, links, nav, About layers & highlights |
| `skills.ts` | skill cards, categories, "How Aman uses it" text |
| `experience.ts` | roles, bullet points, metric badges |
| `projects.ts` | project cards, case-study modal content, architecture nodes |
| `education.ts` | degrees, certifications (credential links from the resume) |
| `console.ts` | hero console commands + offline "ask" knowledge base |

The resume download is `public/Aman_Pandey_Resume.pdf` — replace the file to update it.

## Theming

Design tokens are CSS variables at the top of `src/styles/index.css` (dark + light). Change `--accent` to re-colour the whole site.

## Before deploying

Replace the `https://example.com/` placeholders in `index.html`, `public/robots.txt` and `public/sitemap.xml` with the real domain.

## Structure

```
src/
  components/   Navbar, Button, Dialog, DevConsole, ProjectCard, ProjectModal, ProjectVisuals, TechIcon…
  sections/     Hero, About, Skills, Experience, Projects, GithubSection, Education, Contact
  data/         portfolio content
  hooks/        useActiveSection, useTheme, useGithubRepos, useMediaQuery
  lib/          utils
  styles/       tokens + base styles
```

The GitHub section calls the public GitHub API (no token), caches results in `sessionStorage` for an hour, and falls back to a plain link if the request fails.
