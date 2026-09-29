import { useTranslation } from "react-i18next";
import { platformStack, productStack, type StackItem } from "../data/stack";

function StackCell({ item }: { item: StackItem }) {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "no";

  return (
      <div className="flex items-center gap-3 bg-surface p-4 sm:p-[18px]">
        <img
            src={item.logo}
            alt={`${item.name} logo`}
            className="h-6 w-6 flex-shrink-0 object-contain"
            loading="lazy"
        />
        <div>
          <div className="font-mono text-[13.5px] font-semibold text-ink">{item.name}</div>
          <div className="text-xs text-muted">{item.description[lang]}</div>
        </div>
      </div>
  );
}

export default function TechStack() {
  const { t } = useTranslation();

  return (
      <section id="stack" className="border-t border-border py-16">
        <div className="mx-auto max-w-[950px] px-6">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-sm text-accent before:h-px before:w-4 before:bg-accent">
            {t("techStack.sectionLabel")}
          </div>
          <h2 className="mb-2.5 text-[26px] font-extrabold tracking-tight text-ink">{t("techStack.heading")}</h2>
          <p className="mb-8 max-w-[560px] text-[17px] text-muted">
            {t("techStack.subtitle")}
          </p>

          <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">{t("techStack.techStack")}</h3>
          <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
            {productStack.map((item) => (
                <StackCell key={item.name} item={item} />
            ))}
          </div>

          <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">{t("techStack.ecosystem")}</h3>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
            {platformStack.map((item) => (
                <StackCell key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>
  );
}
