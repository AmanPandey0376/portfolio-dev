import { siGithub } from "simple-icons";

type Props = { className?: string };

export function GithubIcon({ className = "h-4 w-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** The site mark: two nodes joined by an edge — "AP" as a tiny graph. */
export function Logo({ className = "h-7 w-7" }: Props) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="rgb(var(--fg) / 0.04)" stroke="rgb(var(--line) / 0.14)" />
      <path d="M9 22 L14.5 9.5 L20 22 M11.4 17h6.2" fill="none" stroke="rgb(var(--fg))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23.5" cy="11" r="2.4" fill="rgb(var(--accent))" />
      <path d="M20 22 L23.5 11" stroke="rgb(var(--accent) / 0.6)" strokeWidth="1.2" strokeDasharray="1.6 1.8" />
    </svg>
  );
}
