import Link from "next/link";
import { ArrowUpRight, FlaskConical, Sparkles } from "lucide-react";
import { experiments, type ExperimentStatus } from "@/data/experiments";

const statusStyles: Record<ExperimentStatus, string> = {
  Live: "border-[rgba(62,199,162,0.45)] bg-[rgba(62,199,162,0.16)] text-[rgba(62,199,162,0.95)]",
  Building:
    "border-[rgba(107,184,255,0.45)] bg-[rgba(107,184,255,0.16)] text-[rgba(107,184,255,0.95)]",
  Archived:
    "border-[rgba(255,209,123,0.45)] bg-[rgba(255,209,123,0.14)] text-[rgba(255,209,123,0.95)]",
};

export default function LabPage() {
  const liveCount = experiments.filter(
    (experiment) => experiment.status === "Live",
  ).length;

  return (
    <section className="section-shell relative min-h-screen px-4 pb-20 pt-30 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/15 p-7 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,184,255,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(62,199,162,0.16),transparent_45%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/7 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-(--ink-1)">
              <FlaskConical size={14} className="text-(--accent-a)" />
              Lab / Experiments
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-4xl">
              Playground of
              <span className="block text-accent-gradient">
                ideas & experiments.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--ink-1) sm:text-lg">
              This space collects prototypes, interaction studies, and technical
              experiments. Some are production-ready, others are active work in
              progress.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-white/20 bg-white/7 px-3 py-1 text-xs uppercase tracking-[0.12em] text-(--ink-1)">
                {experiments.length} total
              </span>
              <span className="rounded-full border border-[rgba(62,199,162,0.45)] bg-[rgba(62,199,162,0.16)] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[rgba(62,199,162,0.95)]">
                {liveCount} live
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experiments.map((experiment) => (
            <article
              key={experiment.title}
              className="glass-panel group flex h-full flex-col rounded-2xl border border-white/12 p-5 transition-all duration-300 hover:border-[rgba(107,184,255,0.45)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">
                  {experiment.title}
                </h2>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] ${statusStyles[experiment.status]}`}
                >
                  {experiment.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-(--ink-1)">
                {experiment.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {experiment.stack.map((item) => (
                  <span
                    key={`${experiment.title}-${item}`}
                    className="rounded-full border border-white/20 bg-white/7 px-2.5 py-1 text-[11px] uppercase tracking-[0.11em] text-(--ink-1)"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                {experiment.href ? (
                  <Link
                    href={experiment.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/7 px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:border-[rgba(62,199,162,0.55)] hover:bg-white/12"
                  >
                    Open experiment
                    <ArrowUpRight size={14} className="text-(--accent-b)" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-xl border border-white/15 bg-white/6 px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-(--ink-2)">
                    Private preview
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
