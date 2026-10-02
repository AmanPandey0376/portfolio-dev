import { Award, GraduationCap, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, education } from "@/data/education";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading id="education-title" index="05" label="Education" title="Foundations." subtitle="Computer science and IT at the University of Mumbai." />

            <ol className="relative mt-10 space-y-8 border-l hairline pl-6">
              {education.map((e, i) => (
                <Reveal as="li" key={e.id} delay={i * 0.08} className="relative">
                  <span aria-hidden="true" className="absolute -left-[1.85rem] top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-line/25 bg-bg">
                    <span className="h-[5px] w-[5px] rounded-full bg-accent/80" />
                  </span>
                  <p className="font-mono text-2xs text-subtle">{e.period}</p>
                  <h3 className="mt-1.5 flex items-center gap-2 text-[1.05rem] font-medium text-fg">
                    <GraduationCap className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    {e.short}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {e.school} · {e.location}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 rounded-md border hairline px-2 py-1 font-mono text-2xs text-muted">
                    CGPA <span className="text-fg">{e.cgpa}</span>
                  </p>
                  <p className="sr-only">{e.degree}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:pt-6">
            <Reveal>
              <h3 className="eyebrow flex items-center gap-2">
                <Award className="h-3.5 w-3.5" aria-hidden="true" /> Certifications &amp; internships
              </h3>
            </Reveal>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {certifications.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 0.05}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between gap-6 rounded-xl border hairline bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line/[0.16]"
                    aria-label={`${c.title} — ${c.issuer} (view credential)`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="rounded-full border hairline px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-subtle">
                        {c.kind}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    </span>
                    <span>
                      <span className="block text-[0.98rem] font-medium text-fg">{c.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{c.issuer}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
