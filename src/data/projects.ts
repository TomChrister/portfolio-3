
export interface Project {
  /** URL-safe id used for the detail route: /projects/:slug */
  slug: string;
  title: string;
  /** Short one-liner shown on the project card, per language. */
  description: { no: string; en: string };
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
   * Long-form write-up shown on the detail page, per language. Supports a
   * light markdown subset: `#`/`##`/`###` headings, `- ` bullet lists,
   * blank-line-separated paragraphs, and `**bold**` / `` `code` ``.
   */
  readme: { no: string; en: string };
}

// Swap the `image`, `heroImage` and `liveUrl` fields with real screenshots /
// links, and paste each project's README into `readme`.
export const projects: Project[] = [
  {
    slug: "planbase",
    title: "Planbase",
    description: {
      en: "AI-powered planning assistant with a kanban interface for daily and project-level task flow.",
      no: "AI-drevet planleggingsassistent med et kanban-grensesnitt for daglig og prosjektbasert oppgaveflyt.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API", "Vite", "Vercel", "React Router"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API", "Vite", "Vercel", "React Router"],
    image: "/images/planbase.jpg",
    heroImage: "/images/planbase.jpg",
    liveUrl: "https://planbase-agent.vercel.app/",
    repoUrl: "https://github.com/TomChrister/planbase",
    readme: {
      en: `# Planbase — AI Task Orchestrator

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
      no: `# Planbase — AI-oppgaveorkestrator

Gi Planbase et mål, så bryter en **Planner-agent** (drevet av Claude) det ned i konkrete, selvstendige deloppgaver. Oppgavene vises som kort på en kanban-tavle (To Do / In Progress / Done), hvor du kan flytte, redigere, legge til og slette dem — eller be en **Revise-agent** om å omforme planen med naturlig språk.

## Teknologistack

- **Frontend** — React 19 + Vite 8
- **Styling** — Tailwind CSS 4 + CSS design-tokens
- **AI** — Anthropic Claude via \`@anthropic-ai/sdk\` (modell \`claude-sonnet-4-6\`)
- **Backend (lokalt)** — Express 5 (\`server.js\`)
- **Backend (produksjon)** — Vercel serverless-funksjoner (\`api/\`)
- **State** — React state + \`localStorage\`-persistering
- **Linting** — ESLint 10

Det finnes ikke noe eget state-bibliotek — planstatusen ligger i \`App.jsx\` og lagres til \`localStorage\`, slik at en plan overlever sideoppdateringer.

## Slik fungerer appen

### Brukerflyt

- Skriv inn et mål på landingsskjermen (f.eks. «Planlegg et lite lanseringsarrangement»)
- Frontend sender målet til \`/api/planner\`. En lasteskjerm viser en roterende status og et skjelett-tavlebrett.
- Planner-agenten returnerer inntil 5 deloppgaver, som vises som kort — alle starter i **To Do**.
- Kort kan åpnes for redigering, legges til manuelt, eller flyttes mellom kolonner.
- Revidere planen: skriv en instruksjon i revideringsfeltet. Revise-agenten returnerer et minimalt sett med legg til/oppdater/fjern-endringer, vist i en forhåndsvisning før du godtar eller forkaster dem. Begrenset til 5 revisjoner per plan.

### De to agentene

Begge agentene ligger i backend og svarer kun med JSON.

- **Planner-agent** (\`/api/planner\`) — tar imot et mål, returnerer et kort sammendrag og en liste med oppgaver.
- **Revise-agent** (\`/api/revise\`) — tar imot målet, gjeldende oppgaver og en instruksjon, returnerer oppgaver som skal legges til, oppdateres eller fjernes.

### Frontend og backend

Frontend kaller alltid relative stier (\`/api/planner\`, \`/api/revise\`). I lokal utvikling proxyer Vite disse til en Express-server. I produksjon på Vercel serveres de av serverless-funksjoner. Begge implementasjonene deler samme prompter og oppførsel.

## Responsiv oppførsel

- På mobil stables de tre kanban-kolonnene vertikalt og kan slås sammen.
- **To Do** er åpen som standard; **In Progress** og **Done** starter sammenslått, men viser oppgaveantallet sitt, og utvides automatisk når et nytt kort havner der.
- På desktop vises kolonnene side ved side.

## Veikart

MVP-omfanget er Planner- og Revise-agentene med sekvensiell, klientstyrt oppgaveflytting. En **Worker-agent** og **Reviewer-agent** er planlagt som neste steg.`,
    },
  },
  {
    slug: "jobbsoknadsassistent",
    title: "Jobbsøknadsassistent",
    description: {
      en: "Extracts structured details from a job posting, then drafts and refines a tailored cover letter through chat.",
      no: "Trekker ut strukturerte detaljer fra en stillingsannonse, og utarbeider og finpusser deretter et skreddersydd søknadsbrev gjennom chat.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API", "Zod", "Vercel", "Vercel AI SDK"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Sonnet 4.6 API", "Zod", "Vercel", "Vercel AI SDK"],
    image: "/images/jobbsoknadsassistent.jpg",
    heroImage: "/images/jobbsoknadsassistent.jpg",
    liveUrl: "https://jobbsoknadsassistent.vercel.app",
    repoUrl: "https://github.com/TomChrister/llm-project",
    readme: {
      en: `# Jobbsøknadsassistent — Job Application Assistant

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
      no: `# Jobbsøknadsassistent

Lim inn en stillingsannonse, som URL eller som ren tekst, og få detaljene hentet ut i et strukturert kort — rolle, selskap, ferdigheter, ansvarsområder. Derfra utarbeider en AI-assistent et søknadsbrev skreddersydd til annonsen, og finpusser det gjennom chat.

## Funksjoner

- **Input** — lim inn URL-en til en stillingsannonse eller rå tekst, eller klikk på ett av de innebygde fiktive eksemplene for å prøve det uten å måtte finne en ekte annonse.
- **Utdrag** — URL-er hentes server-side og renses for navigasjon/footer/annonsestøy med [Readability](https://github.com/mozilla/readability), og sendes deretter til Claude med et Zod-skjema. Det strukturerte resultatet strømmes inn i grensesnittet felt for felt.
- **Detaljkort** — tittel, selskap, sted, ansettelsestype, senioritet, påkrevde og ønskede ferdigheter, og ansvarsområder, vist med ferdighetsmerker.
- **Chat** — assistenten åpner med et utkast til søknadsbrev og tilbyr hurtighandlinger («Gjør mer formelt», «Gjør kortere», «Fremhev en ferdighet») i tillegg til fri chat.
- **Historikk** — hver ekstraksjon lagres i \`localStorage\` med hele chattråden og listes i sidepanelet, slik at du kan bytte tilbake til en tidligere jobb uten å miste tidligere arbeid.

## Teknologistack

- **Frontend** — Next.js (App Router) + TypeScript
- **Styling** — Tailwind CSS v4
- **AI** — [Vercel AI SDK](https://ai-sdk.dev) med Anthropic-provideren (\`streamObject\` for utdrag, \`streamText\` for chat)
- **Skjema** — [Zod](https://zod.dev) for ekstraksjonsskjemaet
- **Skraping** — \`@mozilla/readability\` + \`jsdom\` for server-side URL-henting

## Slik fungerer det

De utpakkede jobbdataene sendes som systemkontekst med hver chat-forespørsel, slik at annonsen forblir tilgjengelig gjennom hele samtalen — assistenten kan fortsette å omskrive mot de opprinnelige kravene i stedet for kun mot forrige utkast. Ekstraksjoner og chattrådene deres lagres i \`localStorage\`, slik at en ny ekstraksjon aldri overskriver en tidligere.`,
    },
  },
  {
    slug: "babyens utvikling",
    title: "Babyens utvikling",
    description: {
      en: "Calculates your baby's current week from their birth date and surfaces week-by-week milestones, tips, and safe-sleep guidance.",
      no: "Beregner babyens nåværende uke ut fra fødselsdatoen, og viser uke-for-uke-milepæler, tips og veiledning om trygg søvn.",
    },
    tags: ["Vite","React", "TypeScript", "Tailwind CSS", "React Router"],
    tech: ["Vite","React", "TypeScript", "Tailwind CSS", "React Router"],
    image: "/images/babyens-utvikling.jpg",
    heroImage: "/images/babyens-utvikling.jpg",
    liveUrl: "https://babyens-utvikling.vercel.app/",
    repoUrl: "https://github.com/tomchrister/babyens-utvikling",
    readme: {
      en: `# Babyens utvikling — week by week 👶

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
      no: `# Babyens utvikling — uke for uke 👶

Et lite nettsted som viser et barns utvikling uke for uke gjennom hele det første leveåret (uke 1–52). Du taster inn babyens fødselsdato, og siden åpner automatisk på riktig uke — med mulighet til å bla frem og tilbake. Bygget med **Vite + React + TypeScript + Tailwind CSS + React Router**.

Innholdet på siden er på norsk.

## Slik fungerer det

- **Forsiden** spør om babyens fødselsdato, eller lar deg hoppe over og bla manuelt fra uke 1. Datoen lagres kun lokalt i nettleseren (\`localStorage\`) — ingenting sendes noe sted.
- Når en dato er satt, beregnes gjeldende leveuke, og du tas rett til \`/uke/<n>\`.
- **Bla mellom uker** med knappene, piltastene \`←\` / \`→\`, eller ved å sveipe på mobil.
- Hver uke viser utviklingsfasen, et sammendrag, typiske fokusområder, et tips, og — for utvalgte uker — offisielle milepæler og hva som skjer på helsestasjonen.
- **Søvnsiden** (\`/sovn\`) er en egen referanse for hele det første året: trygt sovemiljø, teknikker, søvn gjennom året, søvnregresjoner, og en oversikt over søvnmetoder med aldersgrenser.

## Innhold og struktur

- Alt tekstinnhold for de 52 ukene ligger i \`src/data/weeks.ts\` som en liste med \`WeekData\`-objekter (uke, fase, sammendrag, fokus, tips, milepæler og helsestasjonsnotater).
- Søvninnholdet ligger i \`src/data/sleep.ts\`.
- De fire utviklingsområdene (\`social\`, \`sprak\`, \`kognitivt\`, \`motorikk\`) har hver sin farge, definert i \`tailwind.config.js\`.

## Kilder

- **Milepæler** — tilpasset fra CDC «Learn the Signs. Act Early.»
- **Helsestasjon** — Helsedirektoratets program for helsestasjon for barn (0–5 år).

Normalvariasjonen er stor, og barn modnes i ulikt tempo. Dette er generell informasjon, **ikke medisinske råd**.`,
    },
  },
  {
    slug: "webloftet",
    title: "Webloftet.no",
    description: {
      en: "Web design & development studio for SMB clients — from Figma prototype to production build.",
      no: "Webdesign- og utviklingsstudio for SMB-kunder — fra Figma-prototype til produksjonsklar løsning.",
    },
    tags: ["Vite", "React", "TypeScript", "Tailwind CSS", "React Router", "Firebase", "Figma"],
    tech: ["Vite", "React", "TypeScript", "Tailwind CSS", "React Router", "Firebase", "Figma"],
    image: "/images/webloftet.jpg",
    heroImage: "/images/webloftet.jpg",
    liveUrl: "https://webloftet.no",
    readme: {
      en: `# Webloftet

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
      no: `# Webloftet

Webloftet er markedsføringsnettstedet for et norsk webbyrå. Det presenterer byråets tjenester og pakker, viser frem tidligere prosjekter, svarer på ofte stilte spørsmål, og lar potensielle kunder ta kontakt via en kontaktskjema. Det inkluderer også en Firebase-drevet blogg med et passordbeskyttet admin-område for å opprette og redigere artikler.

Nettstedet er en single-page-applikasjon, og innholdet er på norsk.

## Funksjoner

- **Markedsføringssider** — Hjem, Tjenester (\`/tjenester\`), Om oss (\`/om-oss\`), Prosjekter (\`/prosjekter\`) og FAQ (\`/faq\`).
- **Kontaktskjema** — Sender henvendelser på e-post via EmailJS, med toast-varsler for tilbakemelding.
- **Blogg** — Enkeltartikler hentes fra Firestore på \`/blogg/:slug\`.
- **Admin-område** — Passordbeskyttet innlogging og dashbord for å opprette, redigere og slette artikler, drevet av Firebase Authentication.
- **Rikteksteditor** — Artikler skrives med MDX-editoren og rendres fra Markdown (sanert med DOMPurify).

## Teknologistack

- **Frontend** — React 19 + Vite + TypeScript
- **Styling** — Tailwind CSS + \`@tailwindcss/typography\`
- **Routing** — React Router
- **Backend / DB** — Firebase (Firestore, Authentication, Storage, App Check med reCAPTCHA v3)
- **E-post** — EmailJS for levering av kontaktskjema
- **Editor** — \`@mdxeditor/editor\`, \`marked\`, \`dompurify\`
- **Animasjon og ikoner** — Framer Motion, React Icons, Lucide

## Slik fungerer det

De offentlige markedsføringssidene og bloggen ligger i én SPA. Blogginnlegg lagres i Firestore og rendres fra sanert Markdown. Bak en Firebase-autentisert innlogging lar et admin-dashbord byrået opprette, redigere og slette artikler med MDX-editoren — uten behov for ny utrulling for å publisere nytt innhold.`,
    },
  },
  {
    slug: "holidaze",
    title: "Holidaze",
    description: {
      en: "Accommodation booking platform with separate customer & admin experiences, prototyped in Figma first.",
      no: "Bookingplattform for overnatting med separate kunde- og adminopplevelser, først prototypet i Figma.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Figma", "Noroff API"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Figma", "Noroff API"],
    image: "/images/holidaze.jpg",
    heroImage: "/images/holidaze.jpg",
    liveUrl: "https://holidaze-eta.vercel.app/",
    repoUrl: "https://github.com/tomchrister/holidaze",
    readme: {
      en: `# Holidaze — Accommodation Booking Front-End

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
      no: `# Holidaze — Front-end for overnattingsbooking

Holidaze er en moderne front-end-applikasjon for et bookingnettsted for overnatting. Brukere kan bla gjennom og bestille overnattingssteder for ferie, og registrere seg som utleiere for å administrere annonser og bestillinger. Den er bygget på det offisielle Holidaze-API-et og designet i Figma før implementering.

## Brukertyper

- **Besøkende** — ikke innlogget; kan bla gjennom og søke etter overnattingssteder og se tilgjengelighetskalendere
- **Kunde** — registrert og innlogget; kan opprette og se bestillinger og oppdatere profilen sin
- **Utleier** — registrert og innlogget; kan opprette, redigere og slette overnattingssteder og se bestillingene sine

## Funksjoner

- Bla gjennom, søk i og se en liste over overnattingssteder, pluss en detaljside per sted
- Registrer deg med en \`stud.noroff.no\`-e-post som kunde eller utleier
- Tilgjengelighetskalender som viser bookede og ledige datoer
- **Kunder** — logg inn/ut, opprett og se kommende bestillinger, oppdater avatar
- **Utleiere** — logg inn/ut, administrer egne overnattingssteder, se bestillinger for stedene, oppdater avatar

## Teknologistack

- **Frontend** — React + Vite + TypeScript
- **Styling** — Tailwind CSS
- **Data** — Holidaze (Noroff) API
- **Design** — Figma-designsystem

## Slik fungerer det

Appen deles i en kundevendt bookingflyt og et adminvendt dashbord for utleiere, begge drevet av Holidaze-API-et. Autentisering er begrenset til \`stud.noroff.no\`-kontoer, og samme registreringsflyt lar en bruker melde seg på enten som kunde eller utleier.`,
    },
  },
  {
    slug: "marka",
    title: "MARKA",
    description: {
      en: "Multilingual e-commerce reference build exploring localized product catalogues and checkout flows.",
      no: "Flerspråklig e-handelsreferanse som utforsker lokaliserte produktkataloger og kasseflyt.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "React Router", "Zustand"],
    tech: ["React", "TypeScript", "Tailwind CSS", "React Router", "Zustand"],
    image: "/images/marka.jpg",
    heroImage: "/images/marka.jpg",
    liveUrl: "https://marka-demo.vercel.app/",
    repoUrl: "https://github.com/tomchrister/marka",
    readme: {
      en: `# Marka

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
      no: `# Marka

Et demo-nettbutikk for et norsk naturproduktmerke — honning, ville vekster og ingredienser fra norsk skog og mark («marka»). Bygget som en single-page-applikasjon med butikk, produktsider, ønskeliste, handlekurv og en redaksjonell magasinseksjon.

Innholdet på siden er på norsk.

## Funksjoner

- **Butikkfront** — landingsside, butikkliste, kategorinavigering og produktdetaljsider
- **Handlekurv** — legg til produkter med valgt antall, en utglidende handlekurv-skuff, og en kasseside
- **Ønskeliste** — lagre favorittprodukter med en hjerteknapp, med teller og utglidende skuff i topp-banneret
- **Magasin** — les artikler og skriv nye
- **Søk** — søkbart overlegg fra navigasjonslinjen
- **Responsiv** — mobiltilpasset layout med sammenleggbar meny
- **SPA-routing** — dype lenker løses ved oppdatering (konfigurert for Vercel)

## Teknologistack

- **Frontend** — React 19 + Vite 6 + TypeScript
- **Styling** — Tailwind CSS v4 (via \`@tailwindcss/vite\`; tema i \`src/index.css\`)
- **Routing** — React Router v7
- **State** — Zustand for handlekurv, ønskeliste og artikler
- **Ikoner** — \`lucide-react\`

## Slik fungerer det

Global state for handlekurv, ønskeliste og artikler ligger i én Zustand-store, holdt i minnet og tilbakestilt ved sideoppdatering. Distribuert på Vercel, hvor \`vercel.json\` omskriver alle forespørsler til \`index.html\` slik at klientsiderute løses korrekt ved oppdatering eller direktelenke.`,
    },
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
