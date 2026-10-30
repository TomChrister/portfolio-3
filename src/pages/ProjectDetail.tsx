import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import { getProject } from "../data/projects";
import { logoFor } from "../data/stack";
import Readme from "../components/Readme";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "en" ? "en" : "no";

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[950px] px-6 py-24 text-center">
          <h1 className="mb-3 text-[26px] font-extrabold tracking-tight text-ink">
            {t("projectDetail.notFoundTitle")}
          </h1>
          <p className="mb-6 text-[17px] text-muted">
            {t("projectDetail.notFoundBody")}
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
          >
            {t("projectDetail.backToProjects")}
          </Link>
        </div>
      </>
    );
  }

  const hasLive = project.liveUrl && project.liveUrl !== "#";

  return (
    <>
      <Navbar />

      <article className="mx-auto max-w-[950px] px-6 pb-20 pt-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted transition-colors hover:text-accent"
        >
          {t("projectDetail.backToWork")}
        </Link>

        {/* Hero image */}
        <div className="mt-5 overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <img
            src={project.heroImage ?? project.image}
            alt={`${project.title} banner`}
            className="aspect-[2/1] w-full object-cover"
          />
        </div>

        {/* Title + actions */}
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[32px] font-extrabold tracking-tight text-ink sm:text-[38px]">
              {project.title}
            </h1>
            <p className="mt-2 max-w-[560px] text-[17px] text-muted">{project.description[lang]}</p>
          </div>

          <div className="flex flex-shrink-0 flex-wrap gap-2">
            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
              >
                {t("projectDetail.liveSite")}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-md border border-border px-[18px] py-2.5 font-mono text-[12.5px] font-medium text-[#4A5560]">
                {t("projectDetail.liveSiteComingSoon")}
              </span>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-[18px] py-2.5 font-mono text-[12.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {t("projectDetail.repo")}
              </a>
            )}
          </div>
        </div>

        {/* Tech used */}
        <h2 className="mb-3 mt-10 font-mono text-xs uppercase tracking-wide text-muted">
          {t("projectDetail.builtWith")}
        </h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
          {project.tech.map((name) => (
            <div key={name} className="flex items-center gap-3 bg-surface p-4">
              <img
                src={logoFor(name)}
                alt={`${name} logo`}
                className="h-6 w-6 flex-shrink-0 object-contain"
                loading="lazy"
              />
              <span className="font-mono text-[13px] font-semibold text-ink">{name}</span>
            </div>
          ))}
        </div>

        {/* Write-up */}
        <div className="mt-12 border-t border-border pt-10">
          <Readme text={project.readme[lang]} />
        </div>
      </article>
    </>
  );
}
