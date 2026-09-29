export interface StackItem {
  name: string;
  logo: string;
  description: { no: string; en: string };
}

// Logos are pulled from the Simple Icons CDN (cdn.simpleicons.org/<slug>).
// A few tools (Sitecore, Dynamics 365, Claude Code) aren't in that catalog,
// so they fall back to a generated placeholder badge with the same look —
// swap the `logo` URL for a real asset whenever you have one.

export const productStack: StackItem[] = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB", description: { en: "Component architecture, hooks", no: "Komponentarkitektur, hooks" } },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6", description: { en: "Type-safe application code", no: "Typesikker applikasjonskode" } },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E", description: { en: "Core scripting language", no: "Grunnleggende skriptspråk" } },
  { name: "HTML", logo: "https://cdn.simpleicons.org/html5/E34F26", description: { en: "Markup & semantics", no: "Markup og semantikk" } },
  { name: "CSS", logo: "https://cdn.simpleicons.org/css/663399", description: { en: "Styling & layout", no: "Styling og layout" } },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4", description: { en: "Utility-first styling", no: "Utility-first styling" } },
  { name: "Vite", logo: "https://cdn.simpleicons.org/vite/9135FF", description: { en: "Build tooling & dev server", no: "Byggeverktøy og dev-server" } },
  { name: "Cypress", logo: "https://cdn.simpleicons.org/cypress/69D3A7", description: { en: "End-to-end testing", no: "Ende-til-ende-testing" } },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/DD2C00", description: { en: "Auth, Firestore, Storage", no: "Auth, Firestore, Storage" } },
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/claudecode/D97757", description: { en: "AI-assisted development", no: "AI-assistert utvikling" } },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E", description: { en: "UX prototyping & design", no: "UX-prototyping og design" } },
];

export const platformStack: StackItem[] = [
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F03C2E", description: { en: "Version control", no: "Versjonskontroll" } },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/F5B759", description: { en: "Repos, PRs, collaboration", no: "Repos, PR-er, samarbeid" } },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF", description: { en: "CI/CD pipelines & branch rules", no: "CI/CD-pipeliner og branch-regler" } },
  { name: "npm", logo: "https://cdn.simpleicons.org/npm/CB3837", description: { en: "Package management", no: "Pakkehåndtering" } },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/node.js/5FA04E", description: { en: "Backend & server", no: "Backend og server" } },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/ffffff", description: { en: "REST APIs & middleware", no: "REST-API-er og middleware" } },
  { name: "React Router", logo: "https://cdn.simpleicons.org/reactrouter/CA4245", description: { en: "Routing & navigation", no: "Routing og navigasjon" } },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff", description: { en: "Hosting & deployment", no: "Hosting og deployment" } },
  { name: "Sitecore CMS", logo: "https://cdn.simpleicons.org/sitecore/EB1F1F", description: { en: "Global web production", no: "Global webproduksjon" } },
  { name: "EPiServer CMS", logo: "/logos/episerver.svg", description: { en: "Global web production", no: "Global webproduksjon" } },
  { name: "Dynamics 365", logo: "/logos/d365.svg", description: { en: "Marketing automation", no: "Markedsføringsautomatisering" } },
  { name: "GA4", logo: "https://cdn.simpleicons.org/googleanalytics/E37400", description: { en: "Analytics & reporting", no: "Analyse og rapportering" } },
];

// Extra logos for technologies used on individual projects that aren't part of
// the two stack registries above.
const extraLogos: Record<string, string> = {
  "next.js": "https://cdn.simpleicons.org/nextdotjs/5EEAD4",
  "nextjs": "https://cdn.simpleicons.org/nextdotjs/5EEAD4",
  "zod": "https://cdn.simpleicons.org/zod/408AFF",
  "claude sonnet 4.6 api": "https://cdn.simpleicons.org/anthropic/D97757",
  "claude": "https://cdn.simpleicons.org/anthropic/D97757",
  "tailwind": "https://cdn.simpleicons.org/tailwindcss/5EEAD4",
  "tiptap": "https://cdn.simpleicons.org/tiptap/5EEAD4",
  "i18n": "https://cdn.simpleicons.org/i18next/5EEAD4",
  "node": "https://cdn.simpleicons.org/nodedotjs/5EEAD4",
  "vercel ai sdk": "https://cdn.simpleicons.org/vercel/ffffff",
  "zustand": "/logos/zustand.svg",
  "helmet": "/logos/helmet.svg",
  "cors": "/logos/cors.svg",
};

const logoIndex: Record<string, string> = (() => {
  const index: Record<string, string> = {};
  for (const item of [...productStack, ...platformStack]) {
    index[item.name.toLowerCase()] = item.logo;
  }
  return { ...index, ...extraLogos };
})();

// Resolve a technology name to a logo URL, falling back to an on-brand
// generated badge with the tech's initials when no icon is known.
export function logoFor(name: string): string {
  const hit = logoIndex[name.trim().toLowerCase()];
  if (hit) return hit;
  const initials = name
    .split(/[\s.-]+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return `https://placehold.co/64x64/171E27/5EEAD4?text=${encodeURIComponent(
    initials || "•"
  )}&font=jetbrains-mono`;
}
