# Waypoint — Employee Onboarding Platform
### Master Build Prompt for Google Antigravity

Paste everything below (as-is) into a new Antigravity Project as your task brief. It's written the way Antigravity expects to receive work: one locked spec, broken into planned tasks, with explicit verification criteria — not a loose creative brief. The "Design System — LOCKED" section is written as a hard constraint block; repeat the phrase "per DESIGN_SYSTEM.md, no deviation" in follow-up messages if the agent ever drifts.

---

## 0. How to use this doc with Antigravity

1. Create a new Project folder called `waypoint-onboarding`.
2. Paste **Section 1 (Product Brief)** as your first message so the agent plans the full task list first — let it propose a plan before it touches code.
3. Once the plan is approved, tell the agent: *"Before building any screen, create `/design-system/DESIGN_SYSTEM.md` and `tailwind.config.ts` from Section 2 exactly as specified. Treat every token as locked — do not introduce colors, fonts, spacing, or radii outside this file."*
4. Build screens one at a time in the order in Section 4, referencing Section 3 (component library) for every element. Ask the agent to verify each screen in its built-in browser against the Section 5 acceptance checklist before moving on.
5. Use Section 6 for the logo.

---

## 1. Product Brief (give this to the agent first)

Build **Waypoint**, a web platform that helps recruiters and hiring managers run the hiring pipeline and new-hire onboarding in one place. Two primary user roles: **Recruiter/Talent Partner** and **Hiring/Team Manager**. Core jobs-to-be-done:

- Track candidates through a hiring pipeline (Applied → Screening → Interview → Offer → Hired).
- Schedule and run interviews, capture structured feedback/scorecards.
- Convert a hired candidate into a structured onboarding journey (Day 1 / Week 1 / Month 1 tasks, document collection, equipment, training).
- Give managers a single dashboard of what's overdue, upcoming, and in progress across both hiring and onboarding.

Stack: React + TypeScript + Tailwind + shadcn/ui components + lucide-react icons + Recharts for charts. Mock data only (no real backend) — use a local JSON/fixtures layer so every screen is populated realistically. Responsive down to 1280px min; primary target is desktop.

Build in this order: Design tokens → shared components → Login/Signup → Dashboard → Candidate Profile → Interview Process (pipeline) → Onboarding Process. Verify each in the browser preview before moving to the next.

---

## 2. Design System — LOCKED

*(Save as `/design-system/DESIGN_SYSTEM.md`. Everything in this section is a hard constraint, not a suggestion — the agent should not introduce any value not listed here.)*

### 2.1 Brand direction
Calm, competent, "guided journey" feeling — a trusted co-pilot for hiring, not a corporate HR tool. Visual language: soft indigo/violet as the hero color, generous whitespace, rounded surfaces, pastel-tinted status pills, low-contrast data visualizations that don't compete with content. Directly inspired by the reference dashboard: light lavender-grey canvas, white elevated cards, a single saturated primary color used sparingly (charts, active states, primary buttons only) against a mostly neutral palette.

### 2.2 Color tokens

```
--color-bg-canvas:      #F5F5FA   /* page background, light lavender-grey */
--color-surface:        #FFFFFF   /* cards, sidebar, modals */
--color-surface-muted:  #F8F9FC   /* nested panels inside cards */
--color-border:         #ECECF3   /* hairline borders on cards/inputs */

--color-primary:        #4F46E5   /* indigo — primary actions, active nav, bars */
--color-primary-dark:   #4338CA   /* hover/pressed state */
--color-primary-tint:   #EEF0FD   /* active nav background, light chart bars */
--color-primary-tint-2: #C7D2FE   /* secondary chart series, subtle fills */

--color-accent-teal:    #14B8A6   /* "remote"/secondary status, secondary charts */
--color-accent-amber:   #F59E0B   /* scheduled/in-progress highlight card (e.g. calendar item) */
--color-accent-rose:    #FB7185   /* destructive/at-risk sparingly */

--color-text-primary:   #111827   /* headings, primary text */
--color-text-secondary: #6B7280   /* metadata, timestamps, labels */
--color-text-disabled:  #9CA3AF

--color-success-bg:     #DCFCE7
--color-success-text:   #16A34A
--color-progress-bg:    #E0E7FF
--color-progress-text:  #4F46E5
--color-neutral-bg:     #F3F4F6
--color-neutral-text:   #6B7280
--color-danger-bg:      #FEE2E2
--color-danger-text:    #DC2626
```

Rule: **status pills only ever use one of the four pairs above** (success / progress / neutral / danger). Never invent a fifth pill color.

### 2.3 Typography

- Font family: **Inter** (fallback: system-ui, sans-serif). Load via `next/font` or Google Fonts — no other typeface anywhere in the product.
- Scale (use these exact sizes, nothing in between):

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| `display` | 28px / 36px | 700 | Page titles ("Dashboard", "Candidate Profile") |
| `h2` | 20px / 28px | 700 | Card/section titles |
| `h3` | 16px / 24px | 600 | Sub-headers, list item titles |
| `body` | 14px / 20px | 500 | Default UI text |
| `body-regular` | 14px / 20px | 400 | Descriptions, paragraph text |
| `caption` | 12px / 16px | 500 | Timestamps, metadata, pill labels |

### 2.4 Spacing & radius (8px base grid — no arbitrary values)

- Spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64` px only.
- Card padding: 24px. Card-to-card gutter: 24px. Page margin: 32px.
- Radius: `12px` small elements (buttons, inputs, pills), `20px` cards/modals, `999px` pills/avatars only.
- Shadow (one shadow, used everywhere, never stacked/varied): `0 2px 8px rgba(17, 24, 39, 0.04), 0 1px 2px rgba(17, 24, 39, 0.03)`.

### 2.5 Iconography
`lucide-react` only, 20px default size, 1.5px stroke, colored to match text-secondary unless it's an active/status icon. App-tile icons (like the "Design App / Design Web" tiles in the reference) sit in a 40×40px rounded-12px pastel-tinted square matching the tint of that item's category.

### 2.6 Layout skeleton (applies to every authenticated screen)
- Fixed left sidebar, 260px, white surface, logo + product name top-left, nav grouped under "Main Menu" and "Others," active item = pill with `--color-primary-tint` background and `--color-primary` text/icon.
- Top bar: page title left, global search center-left (pill input, 360px), notification bell, avatar + name + role dropdown right.
- Content area: `--color-bg-canvas` background, cards floating on top in white surfaces with the locked shadow and 20px radius.

### 2.7 Motion (keep subtle — no bouncy easing anywhere)
- Hover: 150ms ease-out, opacity/background shift only.
- Panel/modal enter: 200ms ease-out, 8px translate-y + fade.
- Charts animate in once on mount, 400ms, no looping animation.

---

## 3. Shared Component Library

Build these once in `/components/ui` before any screen, all driven by the tokens above:

- **Button** — variants: `primary` (solid indigo, white text), `secondary` (white, border, dark text), `ghost` (no border/bg, used in tables/rows), `destructive` (rose). Sizes: `sm` (32px height), `md` (40px height). Radius 12px.
- **StatusPill** — props: `variant: success | progress | neutral | danger`, always rounded-full, caption weight, 4px vertical / 12px horizontal padding.
- **Card** — white surface, 20px radius, locked shadow, 24px padding, optional header slot with title + right-aligned action link ("See all", "Month ▾").
- **Avatar** — circular, with optional colored ring for role (recruiter = indigo ring, manager = teal ring).
- **AppTile** — icon-in-pastel-square + label + chevron, used for quick-action grids (mirrors the "Add More Task" row in the reference).
- **DataTable** — for candidate lists: sortable headers, row hover = `--color-surface-muted`, StatusPill in a dedicated column, avatar + name combined in first column.
- **Tabs** — underline style, active tab = `--color-primary` underline + text, inactive = `--color-text-secondary`.
- **ProgressRing** (donut) — used for onboarding completion %, center label = big bold number, legend below with colored dots (reuse pattern from the "Employment status" donut in the reference).
- **Timeline/Stepper** — vertical, used in Onboarding Process and Candidate Profile; each step has a filled/outlined circle, connecting line, title, timestamp, optional status pill.
- **Modal / Drawer** — for scheduling interviews, adding candidates, assigning onboarding tasks. Right-side drawer (420px) for quick actions, centered modal for confirmations.
- **EmptyState** — icon + short copy + primary action, used when a pipeline stage or checklist has nothing in it.
- **Toast** — bottom-right, success/neutral/danger variants matching pill colors.

---

## 4. Screens (build in this order)

### 4.1 Login / Signup
- Split-screen layout: left 45% = auth form on `--color-bg-canvas`, right 55% = full-bleed panel in `--color-primary` gradient (primary → primary-dark) with a simple abstract illustration (dot-path/route graphic reflecting "onboarding journey") and a short value-prop headline over it.
- Form: logo + product name top-left of the form panel, `Log in` / `Sign up` tab toggle (Tabs component), email + password fields, "Continue with Google/Microsoft SSO" secondary buttons above the divider ("or continue with email"), primary button full-width, role selector for signup (`Recruiter` / `Hiring Manager`) as a two-option segmented control, link to switch between login/signup below the card.
- States to include: default, validation error (danger-text helper under field), loading (spinner in button), and a "forgot password" link.

### 4.2 Dashboard
Recreate the density and rhythm of the reference image, restyled to Waypoint's tokens:
- Top row: "Quick Actions" card of AppTiles — *Post a Job, Schedule Interview, Add Candidate, Assign Onboarding, Review Feedback, Send Offer* — with "See all" link top-right.
- Second row (2/3 + 1/3 split): **Hiring Funnel** bar chart (Recharts) showing candidates per stage over months, dual-series (Applied vs Hired) like the Completed/Late legend in the reference, "Month ▾" filter top-right of the card. Beside it: **To-do list** card — mix of hiring tasks ("Review Sam's scorecard") and onboarding tasks ("Send laptop request — Priya"), each row = checkbox/avatar + title + timestamp + StatusPill.
- Third row (3 columns): **Active Interviews** list (candidate avatar, role, interview type icon, time, StatusPill), **Onboarding Completion** ProgressRing (% of active new hires fully onboarded, legend: Docs / Training / Equipment / Culture), **Calendar** mini-month view + "Schedule" list below showing today's interviews/onboarding check-ins as colored blocks (indigo = interview, amber = onboarding milestone).

### 4.3 Candidate Profile
- Header card: large avatar, name, role applied for, current pipeline stage as a prominent StatusPill, primary actions top-right (`Schedule Interview`, `Move to Offer`, overflow menu).
- Left column (2/3): Tabs for `Overview / Resume / Interview Feedback / Documents / Notes`. Overview = contact info grid, source (referral/LinkedIn/careers site), applied date, recruiter owner, tags/skills as small neutral pills. Interview Feedback tab = list of scorecards per interviewer (rating, strengths/concerns, recommend hire y/n).
- Right column (1/3): vertical Timeline/Stepper of every touchpoint (Applied → Screen call → Onsite → Offer sent) with timestamps, plus a small "Next step" card at top pinned above the timeline.

### 4.4 Interview Process (Pipeline)
- Kanban board, columns = `Applied, Screening, Interview, Offer, Hired` (each column header shows count + avg. days in stage).
- Cards = candidate avatar+name, role, small tags (e.g. "Referral"), next scheduled interview time if any, StatusPill only when something needs attention (e.g. "Overdue feedback" in danger variant). Cards are draggable between columns (optimistic UI, mock only).
- Right-side Drawer opens on card click: interview scheduling form (interviewer picker, date/time, type: Phone/Technical/Onsite/Panel, video-call link field) plus a scorecard template (rating scale + structured questions) for after the interview.
- Top bar of the page: filters (role, recruiter, date range) as pill-style dropdown buttons, "+ Add Candidate" primary button top-right.

### 4.5 Onboarding Process
- Per-hire view, selected from a left-hand roster list (avatar, name, start date, ProgressRing mini-badge showing % complete) — clicking a hire loads their onboarding plan on the right.
- Right panel: horizontal phase tabs `Pre-boarding / Day 1 / Week 1 / Month 1`, each phase = a checklist (Timeline/Stepper vertical) of tasks grouped by owner (`IT`, `HR`, `Manager`, `New Hire`) with checkboxes, due dates, and StatusPill (`Not Started/Process/Done`) matching the to-do list style from the dashboard.
- Top of panel: a summary Card with overall ProgressRing, start date, buddy/manager assigned, and a `Send welcome email` / `View offer letter` quick-action row.
- Empty/blocked state: if a required document (e.g. signed offer, ID upload) is missing, show an EmptyState-style inline banner in danger tint blocking that phase's completion.

---

## 5. Acceptance checklist (ask the agent to self-verify against this in-browser before calling a screen done)

- [ ] Every color used traces back to a token in Section 2.2 — no hex values invented ad hoc.
- [ ] Only Inter is used, only the six type sizes in 2.3.
- [ ] All spacing is a multiple of 4 from the approved scale; all cards are 20px radius, all buttons/inputs/pills are 12px/999px per 2.4.
- [ ] Status pills only use the four success/progress/neutral/danger pairs.
- [ ] Sidebar + top bar layout matches 2.6 on every authenticated screen.
- [ ] Charts use `--color-primary` / `--color-primary-tint-2` / `--color-accent-teal` only — no default Recharts palette colors leaking through.
- [ ] Every screen has a populated, realistic mock-data state AND at least one empty/edge state shown somewhere (empty pipeline column, no upcoming interviews, blocked onboarding task).
- [ ] Nothing scrolls horizontally at 1280px width.

---

## 6. Logo brief

**Name: Waypoint** — a marker on a journey, which maps directly to guiding someone through hiring → onboarding.

Mark direction: an abstract geometric route/checkpoint mark — three small dots of decreasing size connected by a gently curved line, terminating in a solid filled dot (the "arrival" point), all in `--color-primary` with the final dot in `--color-accent-teal` for a subtle two-tone accent. Alternatively, a simple rounded chevron/arrow forming a "W" negative-space shape inside a 12px-radius square tile (matching the AppTile treatment used elsewhere), so the logo visually belongs to the same design system as the rest of the app.

Ask Antigravity to generate this as a clean SVG (no gradients, 2 colors max, works at 24px in the sidebar and favicon size), then place it in `/design-system/logo.svg` and reference it from the sidebar and the login screen split panel.

Lockup: icon mark + "Waypoint" in `h3` weight (600), letter-spacing -0.01em, always icon-then-wordmark, never stacked.
