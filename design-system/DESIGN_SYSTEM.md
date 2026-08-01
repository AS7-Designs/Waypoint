# Design System — LOCKED

> **Changelog**:
> - 2026-08 typography update: switched primary font family to Plus Jakarta Sans globally.
> - 2026-07 bg-hierarchy pass: lightened canvas tone to #FBF9F6, aliased surface-muted to bg-canvas (#FBF9F6) creating a strict 2-tone surface hierarchy, removed external donut ring labels in favor of legend inline percentages, explicitly wired Quick Action categorical tile tints.
> - 2026-07 polish pass: fixed duplicate mock match-scores, fixed Login/Signup label overlap, formalized Sequential vs Categorical color modes, applied categorical coloring to Quick Actions and Jobs department tags.
> - 2026-07 refresh: warmed the neutral palette, added StatCard/MatchScore/SegmentedControl as locked components.
> - 2026-07 initial lock: consolidated 13 ad hoc font sizes and stray radiuses into 3-tier token scale.

## 1. Brand direction
Calm, competent, "guided journey" feeling — a trusted co-pilot for hiring, not a corporate HR tool. Visual language: soft indigo/violet as the hero color, generous whitespace, rounded surfaces, warm neutral background tones, low-contrast data visualizations that don't compete with content. Light warm off-white canvas, white elevated cards, a single saturated primary color used sparingly (charts, active states, primary buttons only) against a warm neutral palette.

## 2. Color tokens

```css
:root {
  --color-bg-canvas:      #FBF9F6;   /* warm off-white canvas tone */
  --color-surface:        #FFFFFF;   /* elevated white cards */
  --color-surface-muted:  #FBF9F6;   /* alias of bg-canvas for recessed nested panels */
  --color-border:         #EAE5DC;   /* hairline border */

  --color-primary:        #4F46E5;   /* indigo — primary actions, active nav, bars */
  --color-primary-dark:   #4338CA;   /* hover/pressed state */
  --color-primary-tint:   #EEF0FD;   /* active nav background, light chart bars */
  --color-primary-tint-2: #C7D2FE;   /* secondary chart series, subtle fills */

  --color-accent-teal:    #14B8A6;   /* "remote"/secondary status, secondary charts */
  --color-accent-amber:   #F59E0B;   /* scheduled/in-progress highlight card */
  --color-accent-rose:    #EC4899;   /* vivid pink/magenta for categorical distinctions */
  --color-accent-violet:  #8B5CF6;   /* violet accent */

  --color-text-primary:   #1C1917;   /* warm near-black, not cool slate */
  --color-text-secondary: #78716C;   /* metadata, timestamps, labels */
  --color-text-disabled:  #A8A29E;

  --color-success-bg:     #DCFCE7;
  --color-success-text:   #16A34A;
  --color-progress-bg:    #E0E7FF;
  --color-progress-text:  #4F46E5;
  --color-neutral-bg:     #F1EEE8;   /* neutral pill background */
  --color-neutral-text:   #78716C;   /* matches text-secondary */
  --color-danger-bg:      #FEE2E2;
  --color-danger-text:    #DC2626;
}
```

Rule: status pills only ever use one of the four pairs above (success / progress / neutral / danger). Never invent a fifth pill color.

## 3. Surface & Background Hierarchy (Two-Tone Rule)

The application uses exactly **two neutral surface tones**:

1. **WHITE (`#FFFFFF`, elevated `shadow-card`)**:
   - The outer container card holding an entire section: Dashboard's Hiring Funnel card, To-do list card, Active Interviews card, Onboarding Completion card; Candidate Profile's header card & Overview tab card; Onboarding Journeys' Active New Hires card & hire detail card; each Job card; outer boundary of each Kanban column.
2. **CANVAS TONE (`#FBF9F6`, `bg-surface-muted`, recessed, no shadow)**:
   - Anything nested one level inside a white card: individual candidate cards inside each Kanban column, To-do list individual task rows, Active Interviews individual rows, "Contact Information" & "Candidate Details & Attributes" boxes on Candidate Profile, individual mini-stat boxes inside Job card Candidate Funnel rows.

## 4. Color Modes (Sequential vs Categorical)

Color has exactly two modes in this application, and every chart, tag, or tile set must declare which mode it uses:

### 4.1 SEQUENTIAL Mode (Single-hue metric variation)
- **Usage**: Use when data represents different states or tiers of the **SAME** underlying metric (e.g. Applied vs Hired bars, progress bar fill, single progress ring, Match Score tiering).
- **Palette**: Indigo-only (`primary` / `primary-tint` / `primary-tint2`).
- **Rule**: Do not add extra hues here. Keep metrics visually coherent.

### 4.2 CATEGORICAL Mode (Multi-hue category distinction)
- **Usage**: Use when data represents genuinely **different, unrelated categories** (job departments, onboarding task owners, evaluation dimensions, quick action tile types).
- **Palette & Fixed Cycling Order**:
  1. `primary` (`#4F46E5` / indigo) — Schedule Interview
  2. `accent-teal` (`#14B8A6` / teal) — Add Candidate, Product dept
  3. `accent-amber` (`#F59E0B` / amber) — Assign Onboarding, Marketing dept
  4. `accent-rose` (`#EC4899` / magenta) — Sales dept
  5. `accent-violet` (`#8B5CF6` / violet) — Post a Job, Design dept
- **Rule**: Always assign colors in this fixed order for the same category set across every screen so "Design" or a specific department remains identical everywhere it appears.

## 5. Typography

- Font family: **Plus Jakarta Sans** (fallback: system-ui, sans-serif).
- Scale:
  - `display-lg`: 36px / 44px, Weight: 700 (hero stat numbers, marketing headline only)
  - `display`: 28px / 36px, Weight: 700 ("Dashboard", "Candidate Profile")
  - `h2`: 20px / 28px, Weight: 700 (Card/section titles)
  - `h3`: 16px / 24px, Weight: 600 (Sub-headers, list item titles)
  - `body`: 14px / 20px, Weight: 500 (Default UI text)
  - `body-regular`: 14px / 20px, Weight: 400 (Descriptions, paragraph text)
  - `caption`: 12px / 16px, Weight: 500 (Timestamps, metadata, pill labels)

## 6. Spacing & radius (8px base grid)
- Spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64` px only.
- Card padding: 24px. Card-to-card gutter: 24px. Page margin: 32px.
- Radius — three tiers, use `rounded-element` / `rounded-nested` / `rounded-card` (no raw `rounded-[Npx]` anywhere):
  - `rounded-element` (12px) — buttons, inputs, small icon squares, tab pills.
  - `rounded-nested` (16px) — sub-cards/panels embedded *inside* a Card: kanban cards, table wrappers, toasts, info panels, dashed upload zones.
  - `rounded-card` (20px) — the outer Card component itself, and modals.
  - `rounded-full` — pills, avatars, SegmentedControl track & selected pill.
- Shadow — two tiers, use `shadow-card` / `shadow-elevated`:
  - `shadow-card`: `0 2px 8px rgba(17,24,39,0.04), 0 1px 2px rgba(17,24,39,0.03)` — every Card, AppTile, and nested panel.
  - `shadow-elevated`: `0 25px 50px -12px rgba(17,24,39,0.25)` — Modal, Drawer, Toast: anything floating above a scrim.

## 7. Additional Locked Components

### 7.1 StatCard
- **Usage**: Top-line KPI summary card with inline trend visualization.
- **Track/Container**: `bg-surface rounded-card shadow-card p-6 flex justify-between items-start border border-border`.
- **Left Content**: `text-caption-ui text-text-secondary` label top, `text-display text-text-primary` number below, optional `text-caption-ui text-text-secondary` helper text underneath.
- **Delta Badge**: Top-right corner, `text-caption-ui font-bold`, colored text (`text-status-successText` with ↑ or `text-status-dangerText` with ↓). No pill background.
- **Sparkline**: Right side, 72x36px mini bar chart (5-7 thin bars, `rounded-full` caps, `bg-primary-tint2` for historical bars, `bg-primary` for the latest bar).

### 7.2 MatchScore
- **Usage**: Candidate or job fit percentage visualization.
- **Label Row**: `text-caption-ui text-text-secondary` left, score percentage right.
- **Progress Track**: `h-1.5` or `h-2` height, `rounded-full bg-status-neutralBg`.
- **Fill Bar**: `rounded-full` with 500ms ease-out width transition. Color-coded:
  - 85%+ : `bg-status-successText`
  - 60–84% : `bg-primary`
  - Below 60% : `bg-accent-amber`

### 7.3 SegmentedControl
- **Usage**: Multi-option inline switch (Login/Signup, role picker, filters, Move Stage pills, chart period).
- **Outer Track**: `bg-surface-muted rounded-full p-1 inline-flex items-center gap-1`.
- **Selected Option**: `bg-white rounded-full px-4 py-2 text-text-primary shadow-sm`.
- **Unselected Option**: `bg-transparent rounded-full px-4 py-2 text-text-secondary hover:text-text-primary`.
