export interface Project {
  /** URL-safe id used for the detail route: /projects/:slug */
  slug: string;
  title: string;
  /** Short one-liner shown on the project card. */
  description: string;
  /** Chips shown on the card. */
  tags: string[];
  /** Technology names rendered as icon + label on the detail page. */
  tech: string[];
  /** Card thumbnail. */
  image: string;
  /** Large banner shown at the top of the detail page. */
  heroImage: string;
  /** Live site URL. Use "#" (or omit) when there's nothing public to link to yet. */
  liveUrl: string;
  /** Optional source-code link. */
  repoUrl?: string;
  /**
   * Long-form write-up shown on the detail page. Paste README text here.
   * Supports a light markdown subset: `#`/`##`/`###` headings, `- ` bullet
   * lists, blank-line-separated paragraphs, and `**bold**` / `` `code` ``.
   */
  readme: string;
}

// Swap the `image`, `heroImage` and `liveUrl` fields with real screenshots /
// links, and paste each project's README into `readme`.
export const projects: Project[] = [
  {
    slug: "planbase",
    title: "Planbase",
    description:
      "AI-powered planning assistant with a kanban interface for daily and project-level task flow.",
    tags: ["React", "TypeScript", "Claude Sonnet 4.6 API"],
    tech: ["React", "TypeScript", "Tailwind", "Vite", "Claude Sonnet 4.6 API", "Vercel"],
    image: "/images/planbase.png",
    heroImage: "/images/planbase.png",
    liveUrl: "https://planbase-agent.vercel.app/",
    readme: `# Planbase

An AI-powered planning assistant that turns loose intentions into an organised
kanban board. Describe what you want to get done and Planbase drafts the tasks,
groups them, and slots them onto daily and project-level lanes.

## Highlights

- **Conversational planning** — powered by the Claude Sonnet 4.6 API.
- **Kanban flow** for daily and project-level work.
- **Drag-and-drop** task management with a fast, keyboard-friendly UI.

## Stack

Built with React, TypeScript and Tailwind, bundled by Vite and deployed on Vercel.

_Paste the real project README here to replace this placeholder copy._`,
  },
  {
    slug: "webloftet",
    title: "Webloftet.no",
    description:
      "Web design & development studio for SMB clients — from Figma prototype to production build.",
    tags: ["React", "TypeScript", "Tailwind"],
    tech: ["React", "TypeScript", "Tailwind", "Vite", "Figma", "Vercel"],
    image: "/images/webloftet.png",
    heroImage: "/images/webloftet.png",
    liveUrl: "https://webloftet.no",
    readme: `# Webloftet.no

An independent web design & development studio serving small and medium-sized
businesses. Every project runs from a Figma prototype through to a production
React build.

## What it covers

- Discovery & UX prototyping in Figma
- Production front-end builds in React + TypeScript
- Hosting, deployment and ongoing maintenance

_Paste the real project README here to replace this placeholder copy._`,
  },
  {
    slug: "holidaze",
    title: "Holidaze",
    description:
      "Accommodation booking platform with separate customer & admin experiences, prototyped in Figma first.",
    tags: ["React", "TypeScript", "Tailwind"],
    tech: ["React", "TypeScript", "Tailwind", "Figma", "Noroff API"],
    image: "/images/holidaze.png",
    heroImage: "/images/holidaze.png",
    liveUrl: "#",
    readme: `# Holidaze

An accommodation booking platform with two distinct experiences: a customer-facing
booking flow and an admin dashboard for venue managers. Designed in Figma before
implementation.

## Highlights

- Separate **customer** and **admin** experiences
- Venue search, availability and booking management
- Figma-first design process

_Paste the real project README here to replace this placeholder copy._`,
  },
  {
    slug: "marka",
    title: "MARKA",
    description:
      "Multilingual e-commerce reference build exploring localized product catalogues and checkout flows.",
    tags: ["React", "i18n"],
    tech: ["React", "TypeScript", "i18n", "Tailwind"],
    image: "/images/marka.png",
    heroImage: "/images/marka.png",
    liveUrl: "#",
    readme: `# MARKA

A multilingual e-commerce reference build exploring localized product catalogues
and checkout flows across languages and regions.

## Highlights

- **i18n** localisation across the catalogue and checkout
- Region-aware product presentation
- A reference architecture for multilingual storefronts

_Paste the real project README here to replace this placeholder copy._`,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
