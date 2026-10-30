import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const links = [
    { href: "/#stack", label: t("nav.stack") },
    { href: "/#projects", label: t("nav.projects") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[950px] items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_8px_#5EEAD4]" />
          tcs.dev
        </Link>

        <div className="hidden gap-6 font-mono text-[12.5px] text-muted sm:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-full border border-border font-mono text-[11px]">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("no")}
              aria-pressed={i18n.resolvedLanguage === "no"}
              className={`px-2.5 py-1 transition-colors ${
                i18n.resolvedLanguage === "no" ? "bg-accent text-[#08221D]" : "text-muted hover:text-ink"
              }`}
            >
              NO
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              aria-pressed={i18n.resolvedLanguage === "en"}
              className={`px-2.5 py-1 transition-colors ${
                i18n.resolvedLanguage === "en" ? "bg-accent text-[#08221D]" : "text-muted hover:text-ink"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
