# Design System — LOCKED

> **Changelog**:
> - 2026-08 hiring funnel summary update: updated Dashboard Hiring Funnel Summary component to match Attendance Summary reference layout with header icon square, top KPI metrics with delta pills, right-aligned legend pill indicators, and smooth multi-series area chart curves.
> - 2026-08 work calendar update: updated Dashboard Work Calendar component to match reference layout with header icon square, top day-numbers/bottom day-names selector row, and stroke-bordered event cards.
> - 2026-08 pure white & stroke-bordered theme: updated application canvas to pure white (#FFFFFF), slate hairline stroke borders (#E2E8F0), high-contrast slate typography (#0F172A), and vibrant purple/indigo primary accent (#6366F1).
> - 2026-08 shadow removal: removed all box-shadows globally across all components for a clean, flat border-defined design system.
> - 2026-08 typography update: switched primary font family to Plus Jakarta Sans globally.
> - 2026-07 bg-hierarchy pass: lightened canvas tone to #FBF9F6, aliased surface-muted to bg-canvas (#FBF9F6) creating a strict 2-tone surface hierarchy, removed external donut ring labels in favor of legend inline percentages, explicitly wired Quick Action categorical tile tints.
> - 2026-07 polish pass: fixed duplicate mock match-scores, fixed Login/Signup label overlap, formalized Sequential vs Categorical color modes, applied categorical coloring to Quick Actions and Jobs department tags.
> - 2026-07 refresh: warmed the neutral palette, added StatCard/MatchScore/SegmentedControl as locked components.
> - 2026-07 initial lock: consolidated 13 ad hoc font sizes and stray radiuses into 3-tier token scale.

## 1. Brand direction
Calm, competent, "guided journey" feeling — a trusted co-pilot for hiring, not a corporate HR tool. Visual language: vibrant modern purple/indigo as the hero color (`#6366F1`), generous whitespace, rounded surfaces, crisp pure white canvas background (`#FFFFFF`), high contrast slate typography (`#0F172A`), and explicit slate hairline stroke borders (`#E2E8F0`) defining all cards, sections, and nested panels.

## 2. Color tokens

```css
:root {
  --color-bg-canvas:      #FFFFFF;   /* pure white application canvas */
  --color-surface:        #FFFFFF;   /* pure white card surface */
  --color-surface-muted:  #F8FAFC;   /* slate-50 background for sub-panels & table headers */
  --color-border:         #E2E8F0;   /* slate-200 hairline stroke border */

  --color-primary:        #6366F1;   /* indigo — primary actions, active nav, progress */
  --color-primary-dark:   #4338CA;   /* hover/pressed state */
  --color-primary-tint:   #EEF2FF;   /* active nav background, light chart fills */
  --color-primary-tint-2: #C7D2FE;   /* secondary chart series */

  --color-accent-teal:    #10B981;   /* emerald accent */
  --color-accent-amber:   #F59E0B;   /* amber accent */
  --color-accent-rose:    #F43F5E;   /* rose accent */
  --color-accent-violet:  #8B5CF6;   /* violet accent */

  --color-text-primary:   #0F172A;   /* slate-900 high contrast dark text */
  --color-text-secondary: #64748B;   /* slate-500 metadata text */
  --color-text-disabled:  #94A3B8;   /* slate-400 placeholder text */

  --color-success-bg:     #ECFDF5;
  --color-success-text:   #059669;
  --color-progress-bg:    #EEF2FF;
  --color-progress-text:  #4F46E5;
  --color-neutral-bg:     #F1F5F9;
  --color-neutral-text:   #475569;
  --color-danger-bg:      #FFF1F2;
  --color-danger-text:    #E11D48;
}
```

Rule: status pills use one of the four stroke-bordered pill pairs above (success / progress / neutral / danger).

## 3. Surface & Background Hierarchy (White Canvas + Stroke System)

1. **WHITE CANVAS (`#FFFFFF`)**: The root application background.
2. **CARD SURFACES (`#FFFFFF`, `border border-[#E2E8F0]`)**: Every major UI container card is rendered in crisp white demarcated by a hairline stroke border (`#E2E8F0`).
3. **SUB-PANELS & NESTED ROWS (`#F8FAFC`, `border border-[#E2E8F0]`)**: Sub-sections, table headers, nested stat boxes, and list items sit flush inside cards with a subtle slate-50 background tint and hairline stroke border.

## 4. Color Modes (Sequential vs Categorical)

### 4.1 SEQUENTIAL Mode (Single-hue metric variation)
- **Usage**: Metric variation or tiering (Applied vs Hired, progress bar fill, single progress ring, Match Score tiering).
- **Palette**: Indigo-only (`primary` / `primary-tint` / `primary-tint2`).

### 4.2 CATEGORICAL Mode (Multi-hue category distinction)
- **Usage**: Department distinction, onboarding owners, evaluation dimensions, quick action tile types.
- **Palette & Fixed Cycling Order**:
  1. `primary` (`#6366F1` / indigo) — Schedule Interview
  2. `accent-teal` (`#10B981` / emerald) — Add Candidate, Product dept
  3. `accent-amber` (`#F59E0B` / amber) — Assign Onboarding, Marketing dept
  4. `accent-rose` (`#F43F5E` / rose) — Sales dept
  5. `accent-violet` (`#8B5CF6` / violet) — Post a Job, Design dept

## 5. Typography

- Font family: **Plus Jakarta Sans** (fallback: system-ui, sans-serif).
- Scale:
  - `display-lg`: 36px / 44px, Weight: 700 (hero stat numbers, marketing headline)
  - `display`: 28px / 36px, Weight: 700 ("Dashboard", "Candidate Profile")
  - `h2`: 20px / 28px, Weight: 700 (Card/section titles)
  - `h3`: 16px / 24px, Weight: 600 (Sub-headers, list item titles)
  - `body`: 14px / 20px, Weight: 500 (Default UI text)
  - `body-regular`: 14px / 20px, Weight: 400 (Descriptions, paragraph text)
  - `caption`: 12px / 16px, Weight: 500 (Timestamps, metadata, pill labels)

## 6. Spacing & radius (8px base grid)
- Radius — three tiers:
  - `rounded-element` (12px) — buttons, inputs, small icon squares, tab pills.
  - `rounded-nested` (16px) — sub-cards/panels embedded *inside* a Card.
  - `rounded-card` (20px) — outer Card containers and modals.
  - `rounded-full` — pills, avatars, SegmentedControl track & selected pill.
- Shadow — None: flat design system relying on clean hairline stroke borders (`border border-[#E2E8F0]`).

## 7. Additional Locked Components

### 7.1 StatCard
- **Track/Container**: `bg-surface rounded-card p-6 flex justify-between items-start border border-border`.

### 7.2 SegmentedControl
- **Outer Track**: `bg-surface-muted rounded-full p-1 inline-flex items-center gap-1 border border-border`.
- **Selected Option**: `bg-white rounded-full px-4 py-2 text-text-primary border border-border font-semibold`.
