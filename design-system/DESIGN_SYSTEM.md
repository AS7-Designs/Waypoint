# Design System — LOCKED

> **Changelog**:
> - 2026-07 polish pass: fixed duplicate mock match-scores, fixed Login/Signup label overlap, formalized Sequential vs Categorical color modes, applied categorical coloring to Quick Actions and Jobs department tags.
> - 2026-07 refresh: warmed the neutral palette, added StatCard/MatchScore/SegmentedControl as locked components.
> - 2026-07 initial lock: consolidated 13 ad hoc font sizes and stray radiuses into 3-tier token scale.

## 1. Brand direction
Calm, competent, "guided journey" feeling — a trusted co-pilot for hiring, not a corporate HR tool. Visual language: soft indigo/violet as the hero color, generous whitespace, rounded surfaces, warm neutral background tones, low-contrast data visualizations that don't compete with content. Warm off-white canvas, white elevated cards, a single saturated primary color used sparingly (charts, active states, primary buttons only) against a warm neutral palette.

## 2. Color tokens

```css
:root {
  --color-bg-canvas:      #FAF8F4;   /* warm off-white, not lavender-gray */
  --color-surface:        #FFFFFF;   /* unchanged - white cards should still pop */
  --color-surface-muted:  #F5F2ED;   /* was #F8F9FC */
  --color-border:         #EAE5DC;   /* was #ECECF3 */

  --color-primary:        #4F46E5;   /* indigo — primary actions, active nav, bars */
  --color-primary-dark:   #4338CA;   /* hover/pressed state */
  --color-primary-tint:   #EEF0FD;   /* active nav background, light chart bars */
  --color-primary-tint-2: #C7D2FE;   /* secondary chart series, subtle fills */

  --color-accent-teal:    #14B8A6;   /* "remote"/secondary status, secondary charts */
  --color-accent-amber:   #F59E0B;   /* scheduled/in-progress highlight card */
  --color-accent-rose:    #EC4899;   /* vivid pink/magenta for categorical distinctions */
  --color-accent-violet:  #8B5CF6;   /* violet accent */

  --color-text-primary:   #1C1917;   /* warm near-black, not cool slate */
  --color-text-secondary: #78716C;   /* was #6B7280 */
  --color-text-disabled:  #A8A29E;   /* was #9CA3AF */

  --color-success-bg:     #DCFCE7;
  --color-success-text:   #16A34A;
  --color-progress-bg:    #E0E7FF;
  --color-progress-text:  #4F46E5;
  --color-neutral-bg:     #F1EEE8;   /* was #F3F4F6 */
  --color-neutral-text:   #78716C;   /* was #6B7280, now matches text-secondary */
  --color-danger-bg:      #FEE2E2;
  --color-danger-text:    #DC2626;
}
```

Rule: status pills only ever use one of the four pairs above (success / progress / neutral / danger). Never invent a fifth pill color.

## 3. Color Modes (Sequential vs Categorical)

Color has exactly two modes in this application, and every chart, tag, or tile set must declare which mode it uses:

### 3.1 SEQUENTIAL Mode (Single-hue metric variation)
- **Usage**: Use when data represents different states or tiers of the **SAME** underlying metric (e.g. Applied vs Hired bars, progress bar fill, single progress ring, Match Score tiering).
- **Palette**: Indigo-only (`primary` / `primary-tint` / `primary-tint2`).
- **Rule**: Do not add extra hues here. Keep metrics visually coherent.

### 3.2 CATEGORICAL Mode (Multi-hue category distinction)
- **Usage**: Use when data represents genuinely **different, unrelated categories** (job departments, onboarding task owners, evaluation dimensions, quick action tile types).
- **Palette & Fixed Cycling Order**:
  1. `primary` (`#4F46E5` / indigo)
  2. `accent-teal` (`#14B8A6` / teal)
  3. `accent-amber` (`#F59E0B` / amber)
  4. `accent-rose` (`#EC4899` / magenta)
  5. `accent-violet` (`#8B5CF6` / violet)
- **Rule**: Always assign colors in this fixed order for the same category set across every screen so "Design" or a specific department remains identical everywhere it appears.

## 4. Typography

- Font family: **Inter** (fallback: system-ui, sans-serif).
- Scale:
  - `display-lg`: 36px / 44px, Weight: 700 (hero stat numbers, marketing headline only)
  - `display`: 28px / 36px, Weight: 700 ("Dashboard", "Candidate Profile")
  - `h2`: 20px / 28px, Weight: 700 (Card/section titles)
  - `h3`: 16px / 24px, Weight: 600 (Sub-headers, list item titles)
  - `body`: 14px / 20px, Weight: 500 (Default UI text)
  - `body-regular`: 14px / 20px, Weight: 400 (Descriptions, paragraph text)
  - `caption`: 12px / 16px, Weight: 500 (Timestamps, metadata, pill labels)

## 5. Spacing & radius (8px base grid)
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

## 6. Additional Locked Components

### 6.1 StatCard
- **Usage**: Top-line KPI summary card with inline trend visualization.
- **Track/Container**: `bg-surface rounded-card shadow-card p-6 flex justify-between items-start border border-border`.
- **Left Content**: `text-caption-ui text-text-secondary` label top, `text-display text-text-primary` number below, optional `text-caption-ui text-text-secondary` helper text underneath.
- **Delta Badge**: Top-right corner, `text-caption-ui font-bold`, colored text (`text-status-successText` with ↑ or `text-status-dangerText` with ↓). No pill background.
- **Sparkline**: Right side, 72x36px mini bar chart (5-7 thin bars, `rounded-full` caps, `bg-primary-tint2` for historical bars, `bg-primary` for the latest bar).

### 6.2 MatchScore
- **Usage**: Candidate or job fit percentage visualization.
- **Label Row**: `text-caption-ui text-text-secondary` left, score percentage right.
- **Progress Track**: `h-1.5` or `h-2` height, `rounded-full bg-status-neutralBg`.
- **Fill Bar**: `rounded-full` with 500ms ease-out width transition. Color-coded:
  - 85%+ : `bg-status-successText`
  - 60–84% : `bg-primary`
  - Below 60% : `bg-accent-amber`

### 6.3 SegmentedControl
- **Usage**: Multi-option inline switch (Login/Signup, role picker, filters, Move Stage pills, chart period).
- **Outer Track**: `bg-surface-muted rounded-full p-1 inline-flex items-center gap-1`.
- **Selected Option**: `bg-white rounded-full px-4 py-2 text-text-primary shadow-sm`.
- **Unselected Option**: `bg-transparent rounded-full px-4 py-2 text-text-secondary hover:text-text-primary`.
