import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = profile.links.email;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pb-24 pt-8 sm:pb-32 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_60%,black,transparent_75%)]" />
        <div className="absolute bottom-[-20rem] left-1/2 h-[36rem] w-[60rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/var(--glow-strength)),transparent)]" />
      </div>

      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border hairline bg-surface/50 px-5 py-14 backdrop-blur-sm sm:px-12 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <SectionHeading
          id="contact-title"
          index="06"
          label="Contact"
          align="center"
          title="Let's build something useful."
          subtitle="Interested in AI-powered products, full-stack systems, automation, or backend engineering? Let's connect."
          className="max-w-3xl"
        />

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
            <ButtonLink href={profile.links.email} magnetic icon={<ArrowUpRight className="h-4 w-4" />}>
              <Mail className="h-4 w-4" /> Email Me
            </ButtonLink>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border hairline-strong bg-line/[0.03] px-5 font-mono text-[0.8rem] text-fg transition-colors hover:bg-line/[0.07]"
              aria-label={copied ? "Email address copied" : `Copy email address ${profile.email}`}
            >
              {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4 text-muted" />}
              <span className="truncate">{copied ? "Copied to clipboard" : profile.email}</span>
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:bg-line/[0.05] hover:text-fg"
              >
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:bg-line/[0.05] hover:text-fg"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
            <li className="inline-flex h-10 items-center gap-2 px-4 text-sm text-subtle">
              <MapPin className="h-4 w-4" /> {profile.location}
            </li>
          </ul>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
