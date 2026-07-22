# Design System — LOCKED

## 1. Brand direction
Calm, competent, "guided journey" feeling — a trusted co-pilot for hiring, not a corporate HR tool. Visual language: soft indigo/violet as the hero color, generous whitespace, rounded surfaces, pastel-tinted status pills, low-contrast data visualizations that don't compete with content. Directly inspired by the reference dashboard: light lavender-grey canvas, white elevated cards, a single saturated primary color used sparingly (charts, active states, primary buttons only) against a mostly neutral palette.

## 2. Color tokens

```css
:root {
  --color-bg-canvas:      #F5F5FA;   /* page background, light lavender-grey */
  --color-surface:        #FFFFFF;   /* cards, sidebar, modals */
  --color-surface-muted:  #F8F9FC;   /* nested panels inside cards */
  --color-border:         #ECECF3;   /* hairline borders on cards/inputs */

  --color-primary:        #4F46E5;   /* indigo — primary actions, active nav, bars */
  --color-primary-dark:   #4338CA;   /* hover/pressed state */
  --color-primary-tint:   #EEF0FD;   /* active nav background, light chart bars */
  --color-primary-tint-2: #C7D2FE;   /* secondary chart series, subtle fills */

  --color-accent-teal:    #14B8A6;   /* "remote"/secondary status, secondary charts */
  --color-accent-amber:   #F59E0B;   /* scheduled/in-progress highlight card */
  --color-accent-rose:    #FB7185;   /* destructive/at-risk sparingly */

  --color-text-primary:   #111827;   /* headings, primary text */
  --color-text-secondary: #6B7280;   /* metadata, timestamps, labels */
  --color-text-disabled:  #9CA3AF;

  --color-success-bg:     #DCFCE7;
  --color-success-text:   #16A34A;
  --color-progress-bg:    #E0E7FF;
  --color-progress-text:  #4F46E5;
  --color-neutral-bg:     #F3F4F6;
  --color-neutral-text:   #6B7280;
  --color-danger-bg:      #FEE2E2;
  --color-danger-text:    #DC2626;
}
```

Rule: status pills only ever use one of the four pairs above (success / progress / neutral / danger). Never invent a fifth pill color.

## 3. Typography

- Font family: **Inter** (fallback: system-ui, sans-serif).
- Scale:
  - `display`: 28px / 36px, Weight: 700 ("Dashboard", "Candidate Profile")
  - `h2`: 20px / 28px, Weight: 700 (Card/section titles)
  - `h3`: 16px / 24px, Weight: 600 (Sub-headers, list item titles)
  - `body`: 14px / 20px, Weight: 500 (Default UI text)
  - `body-regular`: 14px / 20px, Weight: 400 (Descriptions, paragraph text)
  - `caption`: 12px / 16px, Weight: 500 (Timestamps, metadata, pill labels)

## 4. Spacing & radius (8px base grid)
- Spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64` px only.
- Card padding: 24px. Card-to-card gutter: 24px. Page margin: 32px.
- Radius: `12px` small elements (buttons, inputs, pills), `20px` cards/modals, `999px` pills/avatars only.
- Shadow: `0 2px 8px rgba(17, 24, 39, 0.04), 0 1px 2px rgba(17, 24, 39, 0.03)`.
