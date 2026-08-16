
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
    tags: ["React", "TypeScript","Tailwind CSS", "Claude Sonnet 4.6 API"],
    tech: ["Vite", "React", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API", "Vercel", "React Router"],
    image: "/images/planbase.png",
    heroImage: "/images/planbase.png",
    liveUrl: "https://planbase-agent.vercel.app/",
    repoUrl: "https://github.com/TomChrister/planbase",
    readme: `# Planbase — AI Task Orchestrator

Give Planbase a goal and a **Planner Agent** (powered by Claude) breaks it down into concrete, self-contained subtasks. The tasks appear as cards on a kanban board (To Do / In Progress / Done), where you can move, edit, add, and delete them — or ask a **Revise Agent** to reshape the plan in natural language.

## Tech stack

- **Frontend** — React 19 + Vite 8
- **Styling** — Tailwind CSS 4 + CSS design tokens
- **AI** — Anthropic Claude via \`@anthropic-ai/sdk\` (model \`claude-sonnet-4-6\`)
- **Backend (local)** — Express 5 (\`server.js\`)
- **Backend (production)** — Vercel serverless functions (\`api/\`)
- **State** — React state + \`localStorage\` persistence
- **Linting** — ESLint 10

There is no separate state library — plan state lives in \`App.jsx\` and is persisted to \`localStorage\` so a plan survives page reloads.

## How the app works

### User flow

- Enter a goal on the landing screen (e.g. "Plan a small launch event")
- The frontend sends the goal to \`/api/planner\`. A loading screen shows a rotating status and skeleton board.
- The Planner Agent returns up to 5 subtasks, which render as cards — all starting in **To Do**.
- Cards can be opened for editing, added manually, or moved between columns.
- Revising the plan: type an instruction in the revise bar. The Revise Agent returns a minimal set of add/update/remove changes, shown in a preview before you apply or discard them. Limited to 5 revisions per plan.

### The two agents

Both agents live in the backend and respond with JSON only.

- **Planner Agent** (\`/api/planner\`) — takes a goal, returns a short summary and a list of tasks.
- **Revise Agent** (\`/api/revise\`) — takes the goal, current tasks and an instruction, returns tasks to add, update or remove.

### Frontend & backend

The frontend always calls relative paths (\`/api/planner\`, \`/api/revise\`). In local development, Vite proxies these to an Express server. In production on Vercel, they're served by serverless functions. Both implementations share the same prompts and behaviour.

## Responsive behaviour

- On phones, the three kanban columns stack vertically and are collapsible.
- **To Do** is open by default; **In Progress** and **Done** start collapsed but show their task count, and auto-expand when a new card lands in them.
- On desktop, the columns are shown side by side.

## Roadmap

MVP scope is the Planner and Revise agents with sequential, client-side task movement. A **Worker Agent** and **Reviewer Agent** are planned next.`,
  },
  {
    slug: "jobbsoknadsassistent",
    title: "Jobbsøknadsassistent",
    description:
        "Extracts structured details from a job posting, then drafts and refines a tailored cover letter through chat.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "Claude Sonnet 4.6 API", "Zod", "Vercel"],
    image: "/images/jobbsoknadsassistent.png",
    heroImage: "/images/jobbsoknadsassistent.png",
    liveUrl: "https://jobbsoknadsassistent.vercel.app",
    repoUrl: "https://github.com/TomChrister/llm-project",
    readme: `# Jobbsøknadsassistent — Job Application Assistant

Paste a job posting, as a URL or as plain text, and get its details pulled out into a structured card — role, company, skills, responsibilities. From there an AI assistant drafts a cover letter tailored to the posting and refines it through chat.

## Features

- **Input** — paste a job posting URL or its raw text, or click one of the built-in fictional examples to try it without hunting down a real posting.
- **Extraction** — URLs are fetched server-side and stripped of nav/footer/ad noise with [Readability](https://github.com/mozilla/readability), then sent to Claude with a Zod schema. The structured result streams into the UI field by field.
- **Details card** — title, company, location, employment type, seniority, required and nice-to-have skills, and responsibilities, rendered with skill tags.
- **Chat** — the assistant opens with a draft cover letter and offers quick actions ("Make more formal", "Make shorter", "Highlight a skill") alongside free-form chat.
- **History** — every extraction is saved to \`localStorage\` with its full chat thread and listed in the sidebar, so you can switch back to a past job without losing earlier work.

## Tech stack

- **Frontend** — Next.js (App Router) + TypeScript
- **Styling** — Tailwind CSS v4
- **AI** — [Vercel AI SDK](https://ai-sdk.dev) with the Anthropic provider (\`streamObject\` for extraction, \`streamText\` for chat)
- **Schema** — [Zod](https://zod.dev) for the extraction schema
- **Scraping** — \`@mozilla/readability\` + \`jsdom\` for server-side URL fetching

## How it works

The extracted job data is sent as system context with every chat request, so the posting stays available for the whole conversation — the assistant can keep rewriting against the original requirements instead of only the previous draft. Extractions and their chat threads persist in \`localStorage\`, so starting a new extraction never discards an earlier one.`,
  },
  {
    slug: "babyens utvikling",
    title: "Babyens utvikling",
    description:
        "Calculates your baby's current week from their birth date and surfaces week-by-week milestones, tips, and safe-sleep guidance.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    tech: ["Vite","react", "TypeScript", "Tailwind CSS", "React Router"],
    image: "/images/babyens-utvikling.png",
    heroImage: "/images/babyens-utvikling.png",
    liveUrl: "https://babyens-utvikling.vercel.app/",
    repoUrl: "https://github.com/tomchrister/babyens-utvikling",
    readme: `# Babyens utvikling — week by week 👶

A small website that shows a child's development week by week through the whole first year (weeks 1–52). You enter the baby's birthdate and the site automatically opens on the right week — with the option to page back and forth. Built with **Vite + React + TypeScript + Tailwind CSS + React Router**.

The page content is in Norwegian.

## How it works

- **The front page** asks for the baby's birthdate, or lets you skip and page manually from week 1. The date is stored only locally in the browser (\`localStorage\`) — nothing is sent anywhere.
- Once a date is set, the current week of life is calculated and you're taken straight to \`/uke/<n>\`.
- **Move between weeks** with the buttons, the arrow keys \`←\` / \`→\`, or by swiping on mobile.
- Each week shows the developmental phase, a summary, typical focus areas, a tip, and — on selected weeks — official milestones and what happens at the health clinic.
- **The sleep page** (\`/sovn\`) is a separate reference for the whole first year: safe sleep environment, techniques, sleep across the year, sleep regressions, and an overview of sleep methods with age limits.

## Content & structure

- All text content for the 52 weeks lives in \`src/data/weeks.ts\` as a list of \`WeekData\` objects (week, phase, summary, focus, tip, milestones, and health-clinic notes).
- The sleep content lives in \`src/data/sleep.ts\`.
- The four developmental areas (\`social\`, \`sprak\`, \`kognitivt\`, \`motorikk\`) each have their own color, defined in \`tailwind.config.js\`.

## Sources

- **Milestones** — adapted from CDC "Learn the Signs. Act Early."
- **Health clinic** — the Norwegian Directorate of Health's child health-clinic programme (ages 0–5).

Normal variation is wide, and children mature at different rates. This is general information, **not medical advice**.`,
  },
  {
    slug: "webloftet",
    title: "Webloftet.no",
    description:
      "Web design & development studio for SMB clients — from Figma prototype to production build.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    tech: ["Vite", "React", "TypeScript", "Tailwind CSS", "React Router", "Firebase", "Figma"],
    image: "/images/webloftet.png",
    heroImage: "/images/webloftet.png",
    liveUrl: "https://webloftet.no",
    readme: `# Webloftet

Webloftet is the marketing website for a Norwegian web agency. It presents the agency's services and packages, showcases past projects, answers FAQs, and lets prospective clients get in touch through a contact form. It also includes a Firebase-backed blog with a password-protected admin area for creating and editing articles.

The site is a single-page application and the content is in Norwegian.

## Features

- **Marketing pages** — Home, Services (\`/tjenester\`), About (\`/om-oss\`), Projects (\`/prosjekter\`) and FAQ (\`/faq\`).
- **Contact form** — Sends enquiries by email via EmailJS, with toast notifications for feedback.
- **Blog** — Individual articles served from Firestore at \`/blogg/:slug\`.
- **Admin area** — Password-protected login and dashboard for creating, editing and deleting articles, backed by Firebase Authentication.
- **Rich-text editing** — Articles are authored with the MDX editor and rendered from Markdown (sanitized with DOMPurify).

## Tech stack

- **Frontend** — React 19 + Vite + TypeScript
- **Styling** — Tailwind CSS + \`@tailwindcss/typography\`
- **Routing** — React Router
- **Backend / DB** — Firebase (Firestore, Authentication, Storage, App Check with reCAPTCHA v3)
- **Email** — EmailJS for contact-form delivery
- **Editor** — \`@mdxeditor/editor\`, \`marked\`, \`dompurify\`
- **Animation & icons** — Framer Motion, React Icons, Lucide

## How it works

The public marketing pages and the blog live under one SPA. Blog articles are stored in Firestore and rendered from sanitized Markdown. Behind a Firebase-authenticated login, an admin dashboard lets the agency create, edit and delete articles with the MDX editor — no redeploy needed to publish new content.`,
  },
  {
    slug: "holidaze",
    title: "Holidaze",
    description:
      "Accommodation booking platform with separate customer & admin experiences, prototyped in Figma first.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Figma", "Noroff API"],
    image: "/images/holidaze.png",
    heroImage: "/images/holidaze.png",
    liveUrl: "https://holidaze-eta.vercel.app/",
    repoUrl: "https://github.com/tomchrister/holidaze",
    readme: `# Holidaze — Accommodation Booking Front-End

Holidaze is a modern front-end application for an accommodation booking site. Users can browse and book venues for holidays, and register as venue managers to manage listings and bookings. It's built on the official Holidaze API and designed in Figma before implementation.

## User types

- **Visitor** — not logged in; can browse and search venues and view availability calendars
- **Customer** — registered and logged in; can create and view bookings and update their profile
- **Venue Manager** — registered and logged in; can create, edit and delete venues and view their bookings

## Features

- Browse, search and view a list of venues, plus a detail page per venue
- Register with a \`stud.noroff.no\` email as a customer or venue manager
- Availability calendar showing booked and open dates
- **Customers** — login/logout, create and view upcoming bookings, update avatar
- **Venue Managers** — login/logout, manage their own venues, view venue bookings, update avatar

## Tech stack

- **Frontend** — React + Vite + TypeScript
- **Styling** — Tailwind CSS
- **Data** — Holidaze (Noroff) API
- **Design** — Figma design system

## How it works

The app splits into a customer-facing booking flow and an admin-facing dashboard for venue managers, both driven by the Holidaze API. Authentication is scoped to \`stud.noroff.no\` accounts, and the same registration flow lets a user sign up as either a customer or a venue manager.`,
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
    liveUrl: "https://marka-demo.vercel.app/",
    repoUrl: "https://github.com/tomchrister/marka",
    readme: `# Marka

A demo e-commerce website for a Norwegian natural-products brand — honey, foraged goods, and wild ingredients from the Norwegian outdoors (*marka*). Built as a single-page application with a shop, product pages, a wishlist, a cart, and an editorial magazine section.

The page content is in Norwegian.

## Features

- **Storefront** — landing page, shop listing, category browsing, and product detail pages
- **Cart** — add products with a chosen quantity, a slide-out cart drawer, and a checkout page
- **Wishlist** — save favourite products via a heart button, with a counter and slide-out drawer in the top banner
- **Magazine** — read articles and write new ones
- **Search** — searchable overlay from the navbar
- **Responsive** — mobile-first layout with a collapsible menu
- **SPA routing** — deep links resolve on refresh (configured for Vercel)

## Tech stack

- **Frontend** — React 19 + Vite 6 + TypeScript
- **Styling** — Tailwind CSS v4 (via \`@tailwindcss/vite\`; theme in \`src/index.css\`)
- **Routing** — React Router v7
- **State** — Zustand for cart, wishlist and articles
- **Icons** — \`lucide-react\`

## How it works

Global state for the cart, wishlist and articles lives in a single Zustand store, held in memory and reset on page reload. Deployed on Vercel, where \`vercel.json\` rewrites all requests to \`index.html\` so client-side routes resolve correctly on refresh or a direct link.`,
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
