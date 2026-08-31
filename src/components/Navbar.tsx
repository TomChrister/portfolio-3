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
      <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-6">
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_8px_#5EEAD4]" />
          tcs.dev
        </a>

        <div className="hidden gap-6 font-mono text-[12.5px] text-muted sm:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accentTint px-3 py-1 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-accent" />
            {t("nav.openToWork")}
          </div>

          <div className="flex items-center overflow-hidden rounded-full border border-border font-mono text-[11px]">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("no")}
              aria-pressed={i18n.language === "no"}
              className={`px-2.5 py-1 transition-colors ${
                i18n.language === "no" ? "bg-accent text-[#08221D]" : "text-muted hover:text-ink"
              }`}
            >
              NO
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              aria-pressed={i18n.language === "en"}
              className={`px-2.5 py-1 transition-colors ${
                i18n.language === "en" ? "bg-accent text-[#08221D]" : "text-muted hover:text-ink"
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
