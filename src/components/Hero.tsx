import { ArrowRight, Briefcase, MapPin, Wrench } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <div className="mx-auto max-w-[900px] px-6 pb-10 pt-16">
            <div
                className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
                {/* Title bar */}
                <div className="flex items-center gap-4 border-b border-border bg-surface2 px-3.5 py-2.5">
                    <div className="flex flex-shrink-0 gap-1.5">
                        <span className="block h-[11px] w-[11px] rounded-full bg-[#F5716C]"/>
                        <span className="block h-[11px] w-[11px] rounded-full bg-[#F5C15E]"/>
                        <span className="block h-[11px] w-[11px] rounded-full bg-[#6FE39A]"/>
                    </div>
                    <div className="flex gap-0.5 overflow-x-auto">
            <span
                className="whitespace-nowrap rounded-t-md border-b-2 border-accent bg-surface px-3 py-1.5 font-mono text-xs text-ink">
              {t("hero.tabs.about")}
            </span>
                        <a
                            href="#stack"
                            className="whitespace-nowrap rounded-t-md border-b-2 border-transparent px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
                        >
                            {t("hero.tabs.stack")}
                        </a>
                        <a
                            href="#contact"
                            className="whitespace-nowrap rounded-t-md border-b-2 border-transparent px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
                        >
                            {t("hero.tabs.contact")}
                        </a>
                    </div>
                </div>

                {/* Editor body */}
                <div className="px-6 py-10 sm:px-9 sm:py-11">
                    <CodeLine n={1}>
                        <Kw>const</Kw> <Fn>developer</Fn> = {"{"}
                    </CodeLine>
                    <CodeLine n={2}>
                        &nbsp;&nbsp;<Prop>name</Prop>: <Str>"Tom Christer Schöön"</Str>,
                    </CodeLine>
                    <CodeLine n={3}>
                        &nbsp;&nbsp;<Prop>location</Prop>: <Str>"Oslo, NO"</Str>,
                    </CodeLine>
                    <CodeLine n={4}>{"};"}</CodeLine>

                    <h1 className="ml-0 mt-4 font-mono text-[28px] font-bold leading-tight tracking-tight text-ink sm:ml-10 sm:text-[44px]">
                        {t("hero.titleLine1")}
                        <br/>
                        {t("hero.titleLine2")}
                        <span
                            className="ml-1 mb-3.5 inline-block h-[0.85em] w-[10px] translate-y-[0.1em] animate-blink bg-accent align-middle"/>
                    </h1>

                    <p className="ml-0 mt-2 text-[17.5px] text-muted sm:ml-10">
                        <Trans
                            i18nKey="hero.bio"
                            components={{ bold: <b className="font-semibold text-ink"/> }}
                        />
                    </p>

                    <div
                        className="ml-0 mt-6 flex flex-col flex-wrap gap-x-6 gap-y-2.5 font-mono text-[12.5px] text-muted sm:ml-10">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-[14px] w-[14px] flex-shrink-0 text-[#F5716C]" aria-hidden="true"/>
              <em className="not-italic text-accent">{t("hero.location")}</em>
            </span>
                        <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-[14px] w-[14px] flex-shrink-0 text-[#F5C15E]" aria-hidden="true"/>
              <span>
                <em className="not-italic text-accent">{t("hero.jobTitle")}</em> @
                <span><a href='https://www.linkedin.com/company/softwareone/' target='_blank'> SoftwareOne</a></span>
              </span>
            </span>
                        <span className="inline-flex items-center gap-1.5">
              <Wrench className="h-[14px] w-[14px] flex-shrink-0 text-[#6FE39A]" aria-hidden="true"/>
              <span>
                <a href="https://webloftet.no" target="_blank" rel="noreferrer">
                  <em className="not-italic text-accent">Webloftet.no</em>
                </a>
                  {" "}{t("hero.studioTagline")}
              </span>
            </span>
                    </div>

                    <div className="ml-0 mt-7 flex flex-wrap gap-3 sm:ml-10">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] font-semibold text-[#08221D] transition-transform hover:-translate-y-px"
                        >
                            {t("hero.viewProjects")}
                            <ArrowRight className="h-[14px] w-[14px]" aria-hidden="true"/>
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-md border border-border px-[18px] py-2.5 font-mono text-[12.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                            {t("hero.getInTouch")}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
    return (
        <div className="flex gap-4">
      <span className="w-[22px] flex-shrink-0 pt-0.5 text-right font-mono text-[13px] text-[#3A4450]">
        {n}
      </span>
            <span className="font-mono text-[13px] text-muted">{children}</span>
        </div>
    );
}

const Kw = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#C58AF0]">{children}</span>
);
const Fn = ({ children }: { children: React.ReactNode }) => (
    <span className="text-accent">{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
    <span className="text-amber">{children}</span>
);
const Prop = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#7FB4F5]">{children}</span>
);
