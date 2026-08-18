const links = [
  { label: "email", href: "mailto:tomchrister.dev@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/tom-christer-schöön-bb8ab1226", target: "_blank" },
  { label: "github", href: "https://github.com/TomChrister", target: "_blank" },
  { label: "webloftet.no", href: "https://webloftet.no", target: "_blank" },
];

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-border py-14">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="mb-3.5 flex items-center gap-2.5 font-mono text-accent before:h-px before:w-4 before:bg-accent">
          03 — contact
        </div>

        <div className="font-mono text-[13px] text-muted">
          <span className="text-accent">tom@oslo</span> ~ %{" "}
          <span className="text-ink">whoami --contact</span>
        </div>
        <div className="mt-2 font-mono text-[13px] text-muted">
          → Open to front-end &amp; web platform roles. Based in Oslo, happy to talk remote.
        </div>

        <div className="mt-4 flex flex-wrap gap-5 font-mono text-[14px]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target='_blank'
              className="text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-8 font-mono text text-[#4A5560]">
          tcs.dev
        </div>
      </div>
    </footer>
  );
}
