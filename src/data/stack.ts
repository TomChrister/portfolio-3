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
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB", description: "Component architecture, hooks" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6", description: "Type-safe application code" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E", description: "Core scripting language" },
  { name: "HTML", logo: "https://cdn.simpleicons.org/html5/E34F26", description: "Markup & semantics" },
  { name: "CSS", logo: "https://cdn.simpleicons.org/css/663399", description: "Styling & layout" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4", description: "Utility-first styling" },
  { name: "Vite", logo: "https://cdn.simpleicons.org/vite/9135FF", description: "Build tooling & dev server" },
  { name: "Cypress", logo: "https://cdn.simpleicons.org/cypress/69D3A7", description: "End-to-end testing" },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/DD2C00", description: "Auth, Firestore, Storage" },
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/claudecode/D97757", description: "AI-assisted development" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E", description: "UX prototyping & design" },
];

export const platformStack: StackItem[] = [
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F03C2E", description: "Version control" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/F5B759", description: "Repos, PRs, collaboration" },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF", description: "CI/CD pipelines & branch rules" },
  { name: "npm", logo: "https://cdn.simpleicons.org/npm/CB3837", description: "Package management" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/node.js/5FA04E", description: "Backend & server" },
  { name: "React Router", logo: "https://cdn.simpleicons.org/reactrouter/CA4245", description: "Routing & navigation" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff", description: "Hosting & deployment" },
  { name: "Sitecore CMS", logo: "https://cdn.simpleicons.org/sitecore/EB1F1F", description: "Global web production" },
  { name: "EPiServer CMS", logo: "/logos/episerver.svg", description: "Global web production" },
  { name: "Dynamics 365", logo: "/logos/d365.svg", description: "Marketing automation" },
  { name: "GA4", logo: "https://cdn.simpleicons.org/googleanalytics/E37400", description: "Analytics & reporting" },
  { name: "Jira", logo: "https://cdn.simpleicons.org/jira/0052CC", description: "Ticket & project coordination" },
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