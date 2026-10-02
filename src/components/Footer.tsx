import { profile } from "@/data/profile";
import { Logo } from "./BrandIcons";

const links = [
  { label: "GitHub", href: profile.links.github, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, external: true },
  { label: "Email", href: profile.links.email },
  { label: "Resume", href: profile.links.resume, download: true },
];

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div>
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="text-xs text-muted">{profile.role}</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(l.download ? { download: "Aman_Pandey_Resume.pdf" } : {})}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-2xs text-subtle">© 2026 Aman Pandey</p>
      </div>
    </footer>
  );
}
