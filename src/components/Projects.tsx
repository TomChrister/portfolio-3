import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border py-16">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="mb-3.5 flex items-center gap-2.5 font-mono text-sm text-accent before:h-px before:w-4 before:bg-accent">
          02 — build output
        </div>
        <h2 className="mb-2.5 text-[26px] font-extrabold tracking-tight text-ink">Selected work</h2>
        <p className="mb-8 max-w-[560px] text-[17px] text-muted">
          A selection of things I've designed and built. Open{" "}
          <span className="font-mono text-accent">About</span> for the full write-up, or jump
          straight to the live site.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const hasLive = project.liveUrl && project.liveUrl !== "#";
            return (
              <div
                key={project.slug}
                className="group flex flex-col overflow-hidden rounded-[10px] border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="w-full overflow-hidden border-b border-border"
                >
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    className="h-full w-full object-contain"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-[22px]">
                  <div className="mb-2.5 flex items-start justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-base font-bold text-ink transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  </div>
                  <p className="mb-3.5 text-[15px] text-muted">{project.description}</p>
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-[11.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      About →
                    </Link>
                    {hasLive ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent px-3 py-1.5 font-mono text-[11.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
                      >
                        Live site ↗
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-[11.5px] font-medium text-[#4A5560]">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
