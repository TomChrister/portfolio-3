import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const links = [
  { label: "email", href: "mailto:tomchrister.dev@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/tom-christer-schöön-bb8ab1226", target: "_blank" },
  { label: "github", href: "https://github.com/TomChrister", target: "_blank" },
  { label: "webloftet.no", href: "https://webloftet.no", target: "_blank" },
];

export default function Contact() {
  const { t } = useTranslation();
  const [commits, setCommits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/commits")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.total && setCommits(d.total))
      .catch(() => {});
  }, []);

  return (
    <footer id="contact" className="border-t border-border py-14">
      <div className="mx-auto max-w-[950px] px-6">
        <div className="mb-3.5 flex items-center gap-2.5 font-mono text-accent before:h-px before:w-4 before:bg-accent">
          {t("contact.sectionLabel")}
        </div>

        <div className="font-mono text-[13px] text-muted">
          <span className="text-accent">tom@oslo</span> ~ %{" "}
          <span className="text-ink">whoami --contact</span>
        </div>
        <div className="mt-2 font-mono text-[13px] text-muted">
          {t("contact.tagline")}
        </div>

        <div className="mt-4 flex flex-wrap gap-5 font-mono text-[14px]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel="noreferrer"
              className="text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        {commits !== null && (
          <div className="mt-6 font-mono text-[13px] text-muted">
            <span className="text-accent">tom@oslo</span> ~ %{" "}
            <span className="text-ink">git log --all --author=tom | wc -l</span>
            <div className="mt-1 text-ink">{commits.toLocaleString("nb-NO")} commits</div>
          </div>
        )}

        <div className="mt-8 font-mono text text-[#4A5560]">
          tcs.dev
        </div>
      </div>
    </footer>
  );
}
