export interface StackItem {
  name: string;
  logo: string;
  description: string;
}

// Logos are pulled from the Simple Icons CDN (cdn.simpleicons.org/<slug>).
// A few tools (Sitecore, Dynamics 365, Claude Code) aren't in that catalog,
// so they fall back to a generated placeholder badge with the same look —
// swap the `logo` URL for a real asset whenever you have one.

export const productStack: StackItem[] = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/5EEAD4", description: "Component architecture, hooks" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/5EEAD4", description: "Type-safe application code" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F5B759", description: "Core scripting language" },
  { name: "HTML", logo: "https://cdn.simpleicons.org/html5/F5B759", description: "Markup & semantics" },
  { name: "CSS", logo: "https://cdn.simpleicons.org/css/5EEAD4", description: "Styling & layout" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/5EEAD4", description: "Utility-first styling" },
  { name: "Vite", logo: "https://cdn.simpleicons.org/vite/F5B759", description: "Build tooling & dev server" },
  { name: "Cypress", logo: "https://cdn.simpleicons.org/cypress/F5B759", description: "End-to-end testing" },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/F5B759", description: "Auth, Firestore, Storage" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/5EEAD4", description: "UX prototyping & design" },
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/claudecode/D97757", description: "AI-assisted development" },
];

export const platformStack: StackItem[] = [
  { name: "Git", logo: "https://cdn.simpleicons.org/git/5EEAD4", description: "Version control" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/F5B759", description: "Repos, PRs, collaboration" },
  { name: "npm", logo: "https://cdn.simpleicons.org/npm/5EEAD4", description: "Package management" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/5EEAD4", description: "Hosting & deployment" },
  { name: "Sitecore CMS", logo: "https://placehold.co/64x64/171E27/F5B759?text=SC&font=jetbrains-mono", description: "Global web production" },
  { name: "EPiServer CMS", logo: "/logos/episerver.svg", description: "Global web production" },
  { name: "Dynamics 365", logo: "/logos/d365.svg", description: "Marketing automation" },
  { name: "GA4", logo: "https://cdn.simpleicons.org/googleanalytics/F5B759", description: "Analytics & reporting" },
  { name: "SEMrush", logo: "https://cdn.simpleicons.org/semrush/5EEAD4", description: "SEO tooling" },
  { name: "Jira", logo: "https://cdn.simpleicons.org/jira/F5B759", description: "Ticket & project coordination" },
];

// Extra logos for technologies used on individual projects that aren't part of
// the two stack registries above.
const extraLogos: Record<string, string> = {
  "claude sonnet 4.6 api": "https://cdn.simpleicons.org/anthropic/D97757",
  "claude": "https://cdn.simpleicons.org/anthropic/D97757",
  "tailwind": "https://cdn.simpleicons.org/tailwindcss/5EEAD4",
  "tiptap": "https://cdn.simpleicons.org/tiptap/5EEAD4",
  "i18n": "https://cdn.simpleicons.org/i18next/5EEAD4",
  "node": "https://cdn.simpleicons.org/nodedotjs/5EEAD4",
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