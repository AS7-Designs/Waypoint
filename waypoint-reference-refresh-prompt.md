# Waypoint — Reference-Inspired Refresh
### Master prompt for Antigravity: amend the design system, then rebuild affected screens

This is an *amendment* pass on top of the existing locked `/design-system/DESIGN_SYSTEM.md` — not a rebuild from zero. Paste Section 1 first and let the agent update the token files and the lock document. Only after that's done and confirmed, move to Section 2 (component additions) and Section 3 (screen changes), in order — later sections depend on the components built in earlier ones.

At the end, tell the agent explicitly: *"Re-read `/design-system/DESIGN_SYSTEM.md` top to bottom against the actual code and fix any line that's now inaccurate. This file must stay the single source of truth — nothing should be true in the code that isn't written down here."*

---

## 1. Design system amendments — apply and re-lock first

### 1.1 Warm the neutral palette (accent colors stay exactly as-is)

The current cool lavender-gray canvas is a big part of why this still reads as an AI-default template rather than a designed product — pull up five other recruiting-dashboard references side by side and none of them land on cool gray-lavender. Keep indigo as the brand accent (that's not changing), but rebuild the *neutral* ramp on a warm axis instead of a cool one:

```
--color-bg-canvas:      #FAF8F4   /* was #F5F5FA - warm off-white, not lavender-gray */
--color-surface:        #FFFFFF   /* unchanged - white cards should still pop */
--color-surface-muted:  #F5F2ED   /* was #F8F9FC */
--color-border:         #EAE5DC   /* was #ECECF3 */

--color-text-primary:   #1C1917   /* was #111827 - warm near-black, not cool slate */
--color-text-secondary: #78716C   /* was #6B7280 */
--color-text-disabled:  #A8A29E   /* was #9CA3AF */

--color-status-neutralBg:   #F1EEE8   /* was #F3F4F6 */
--color-status-neutralText: #78716C   /* was #6B7280, now matches text-secondary */
```

Leave `primary`, `primary-dark`, `primary-tint`, `primary-tint2`, `accent-teal`, `accent-amber`, `accent-rose`, `accent-violet`, and every `status-*` bg/text pair other than `neutral` completely untouched — this is a neutral-ramp change only, not a rebrand.

Because every color in this codebase was already refactored to reference these token names instead of hardcoded hex (confirm this is still true — grep for raw hex outside `mockData.ts`, it should be near-zero), this change should only touch the token definitions in `index.css` and `tailwind.config.js`. If changing 7 lines doesn't repaint the whole app, something is still hardcoded and needs to be found and fixed - that would be a regression from the earlier audit.

### 1.2 New component: StatCard (with inline sparkline)

A compact KPI card - the current app has no top-line "at a glance" numbers anywhere, every reference screen has this.

```
- Card: rounded-card, shadow-card, p-6, flex justify-between.
- Left side: text-caption-ui label (text-secondary) top, text-display number
  below it in text-primary, optional text-caption-ui helper text under the
  number ("vs last month").
- Top-right corner: a small delta badge - text-caption-ui, bold, no pill
  background, just colored text: status-successText with a ^ if positive,
  status-dangerText with a v if negative.
- Right side: a small inline sparkline, ~72x36px SVG. Bar-chart style
  (5-7 thin bars, rounded-full end caps, bg-primary-tint2 for all bars
  except the most recent one which is bg-primary) OR line-chart style
  (single stroke path, stroke-primary, 2px, no fill, no dots, no axes,
  no gridlines - just the line). Pick one style and use it consistently
  across every StatCard, don't mix bar and line sparklines in the same row.
```

### 1.3 New component: MatchScore

A candidate/job-fit indicator - genuinely useful recruiting information that's currently missing from both the Pipeline cards and the Candidate Profile.

```
- Label row: text-caption-ui "Match Score" (text-secondary) left,
  bold percentage right, size depends on context (text-h3 on compact
  Pipeline cards, text-h2 on the Candidate Profile header).
- Progress bar directly below: 6px height, rounded-full, track is
  status-neutralBg, fill is rounded-full and color-coded by score:
  - 85%+ : fill uses status-successText
  - 60-84% : fill uses primary
  - below 60% : fill uses accent-amber
  Width of the fill animates in on mount (same 400ms ease-out as other
  charts) - never a static instant-fill.
```

### 1.4 Fix the SegmentedControl properly this time

This was flagged before and is still visibly broken in the current build (the Recruiter/Manager switch in the top bar still has no track around it). Use the "All / Completed / Pending / Rejected" filter pattern from the interview-tracker reference as the literal target: a light gray rounded-full track containing ALL options, with the selected option sitting on a white rounded-full pill inside it, and unselected options as plain text directly on the gray track (no separate background, but clearly inside the shared container so they read as one group).

```
- Outer track: bg-surface-muted, rounded-full, p-1, inline-flex, gap-1.
- Selected option: bg-white, rounded-full, px-4 py-2, text-text-primary,
  shadow-sm.
- Unselected option: no background (sits directly on the track), px-4 py-2,
  text-text-secondary, hover:text-text-primary.
```

Apply this to every instance in the app: Login/Signup tabs, Signup role picker, Pipeline role filter chips, the drawer's Move Stage pills, and the chart period toggle ("Month ▾" dropdowns can stay dropdowns, this is specifically for multi-option inline switches).

### 1.5 Lock-in instruction

Once 1.1-1.4 are built, update `/design-system/DESIGN_SYSTEM.md`:
- Replace the color token table with the new warm values from 1.1.
- Add new sections documenting StatCard, MatchScore, and SegmentedControl as locked components, with the same level of detail as the existing Button/Card/StatusPill entries - exact classes, states, sizing.
- Add a dated changelog line at the top of the file: "2026-07 refresh: warmed the neutral palette, added StatCard/MatchScore/SegmentedControl as locked components." Keep the old audit note from the previous pass below it - don't delete history, append to it.

---

## 2. Screen changes

### 2.1 Dashboard

```
1. Add a new StatCard row as the very first thing on the page, above Quick
   Actions: four cards - "Open Roles," "Active Candidates," "Interviews
   Scheduled," "Offers Sent" - each with a realistic number, a delta vs
   last month, and a sparkline. Reuse the existing Hiring Funnel mock data
   to derive believable numbers rather than inventing disconnected ones.

2. Reduce Quick Actions from 6 tiles to the 4 most-used: Schedule
   Interview, Add Candidate, Assign Onboarding, Post a Job. Move Review
   Feedback and Send Offer behind the existing "See all" link instead of
   showing all 6 at once - a shorter, more deliberate row reads as a
   product that made a prioritization decision, not one that filled a
   grid because 6 fit.

3. Standardize every AppTile's icon-square background to primary-tint
   (indigo) instead of a different hue per tile. Reserve the accent colors
   (teal/amber/rose/violet) for places where color carries actual meaning
   (status pills, chart series, calendar block type) - not for generic
   navigation icons where a different color per tile just adds visual
   noise without adding information.

4. On the Onboarding Completion donut, add percentage labels with short
   leader lines positioned just outside the ring at each segment's
   midpoint angle (e.g. "34%" floating next to the Documents slice),
   in addition to keeping the legend below. This makes the chart readable
   at a glance instead of requiring a legend lookup.

5. Remove the persistent Recruiter/Manager toggle from the top bar - none
   of the reference products put a role-switcher in primary nav. If you
   still need the ability to preview both personas, move it into the
   avatar dropdown menu as a "Switch view" option instead of a permanent
   top-bar control.
```

### 2.2 Hiring Pipeline (Kanban)

```
Add the MatchScore component (compact size) to every candidate card,
directly below the skill tags and above the "Move: / Profile" row. Add a
matchScore field (0-100) to every candidate in mockData.ts with realistic
variation - most candidates in the 60-90 range, one or two outliers above
90 or below 50 so the color-coding in 1.3 actually gets exercised across
all three tiers.
```

### 2.3 Candidate Profile

```
Add the MatchScore component (larger size) to the header card, positioned
to the right of the status pill (Screening/Interview/etc), so a recruiter
scanning this page sees fit-quality in the same glance as pipeline stage.
```

### 2.4 New screen: Jobs

```
This is a genuine information-architecture gap - the app currently has one
global candidate pipeline with no concept of an individual job posting,
but three reference recruiting products all separate "Jobs" from
"Candidates" as distinct nav items, because a recruiter's actual mental
model is "how is each open role doing," not just "here's everyone in the
pipeline mixed together."

Add "Jobs" as a new item in the sidebar's Main Menu, between Dashboard and
Pipeline & Hiring.

Build a Jobs screen:
- Page header: "Active Job Openings," count of open roles top-right,
  "+ Add Job Opening" primary button.
- A grid of job cards (3 per row on desktop), each showing: role title,
  an "Urgent" StatusPill (danger variant) if applicable plus an "Active"
  StatusPill (success variant), department tag, candidate count, then a
  4-column mini-funnel row (Applied / Screening / Interview / Offer, each
  with its count) matching the pattern from the Flex reference, and a
  "View Pipeline" secondary button at the bottom that deep-links to the
  Pipeline & Hiring kanban filtered to that role.
- Populate mockData with 4-5 job postings with realistic, varied funnel
  counts (offer counts should always be smaller than interview counts,
  which should be smaller than screening, which should be smaller than
  applied - a real funnel narrows at each stage).
```

---

## 3. Verification

Before calling this done, ask the agent to self-check:

- [ ] Changing the 7 neutral-palette tokens in step 1.1 visibly repainted every screen with no leftover cool-gray anywhere - if any surface is still the old lavender-gray, find and fix the hardcoded reference.
- [ ] Every segmented control in the app (Login/Signup, Signup role picker, Pipeline filters, drawer Move Stage, and the removed-then-relocated Recruiter/Manager switch) now uses the shared SegmentedControl component from 1.4 - none should be missing the track.
- [ ] StatCard sparklines are all the same style (all bars or all lines, not mixed).
- [ ] MatchScore appears on both Pipeline cards and Candidate Profile, color-coded correctly across all three score tiers somewhere in the mock data.
- [ ] `/design-system/DESIGN_SYSTEM.md` has been updated to match every change above - nothing shipped in code that isn't documented in the lock file.
