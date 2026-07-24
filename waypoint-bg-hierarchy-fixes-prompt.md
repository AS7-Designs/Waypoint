# Waypoint — Background Hierarchy & Outstanding Fixes
### Master prompt for Antigravity: amend tokens, then fix what didn't land last round

Read `/design-system/DESIGN_SYSTEM.md` first. This round has two carried-over bugs that were assigned last time but didn't actually get applied - re-read those instructions as written below, they're now more explicit/literal specifically so there's no room to partially apply them.

---

## 1. Background hierarchy - lighten the canvas, cut it down to two tones

Right now there are three different near-white/cream values competing in the UI: the page canvas, plain white cards, and a separate muted-beige tone used inconsistently for nested panels and some kanban cards. That's the actual cause of the "slightly muddy" feeling - not any single wrong color, but too many close-but-not-quite-matching neutrals sitting next to each other. Fix:

```
1. Lighten --color-bg-canvas from #FAF8F4 to #FBF9F6 - still a warm
   off-white, not lavender-gray, but perceptibly lighter than before.

2. Delete the separate --color-surface-muted value and make it exactly
   equal to --color-bg-canvas (#FBF9F6) - same token value, not just a
   similar one. Everywhere in the codebase that currently uses
   surface-muted should now render visually identical to the page canvas
   behind it.

3. This creates exactly two tones from here forward: the canvas/recessed
   tone (#FBF9F6) and white (#FFFFFF) for elevated surfaces. Apply them
   by this rule, and re-check every screen against it:

   WHITE (elevated, shadow-card): the outer "container" card that holds
   an entire section - Dashboard's Hiring Funnel card, To-do list card,
   Active Interviews card, Onboarding Completion card; Candidate Profile's
   header card and the Overview tab-content card; Onboarding Journeys'
   Active New Hires card and the hire-detail card; each Job card on the
   Jobs screen; the outer boundary of each Kanban COLUMN.

   CANVAS TONE (recessed, no shadow, sits flush with the page): anything
   nested one level inside a white card - the individual candidate cards
   inside each Kanban column, the To-do list's individual task rows, the
   Active Interviews list's individual rows, the "Contact Information" and
   "Candidate Details & Attributes" boxes on Candidate Profile, the
   individual "Applied/Screen/Interview/Offer" mini-stat boxes inside each
   Job card's Candidate Funnel row.

   Specifically fix the Kanban candidate cards - they're currently plain
   white sitting on the canvas, which is what prompted this whole change.
   They should be the canvas tone instead, so the column reads as one
   continuous recessed surface with cards distinguished by a hairline
   border, not by a stark white-block-on-cream contrast.

4. Because these are token changes, not per-component hex edits, verify
   afterward: search the codebase, there should be no leftover reference
   to a "surface-muted" value that differs from bg-canvas anywhere.
```

---

## 2. Bugs from last round that still need fixing

### 2.1 Donut chart label collision (still broken)

The threshold-based leader-line label approach didn't fully resolve the collision on the smallest segment. Stop trying to position labels around the ring - remove them entirely and move the percentage into the legend instead, which can't collide with anything:

```
Remove the external ring/leader-line labels from the Onboarding
Completion donut completely. Instead, update each legend row to include
the percentage inline: "● Documents  40%" / "● Training  20%" /
"● Equipment  10%" / "● Culture  1%" - color dot, label, and right-aligned
(or immediately-following) percentage value on the same row. The center
of the donut keeps its big "77% Onboarded" label exactly as it is now -
only the small floating percentages around the ring's edge are removed.
```

### 2.2 Quick Actions - still monochrome (still broken)

This needs to be applied literally, tile by tile - not "apply categorical mode" as a general instruction, which apparently got skipped last time:

```
Set these exact icon-square background/icon colors on the Dashboard's
4 Quick Action tiles, replacing whatever is currently there:
- "Schedule Interview": bg-primary-tint background, text-primary icon color.
- "Add Candidate": bg-accent-teal/15 background, text-accent-teal icon color.
- "Assign Onboarding": bg-accent-amber/15 background, text-accent-amber icon color.
- "Post a Job": bg-accent-violet/15 background, text-accent-violet icon color.
Before marking this done, take a screenshot of the Dashboard and confirm
by eye that all 4 icon squares are visibly different colors from each
other - if they still look like the same blue/indigo, the fix wasn't
applied and needs to be redone.
```

### 2.3 Login/Signup - waypoint label still crowds the floating card

```
The "Interviewed" label and the floating "Onboarding Progress" card are
no longer overlapping/clipped, but they're still touching - the card's
left edge sits right against the label's text with no breathing room.
Increase the gap: the floating card's nearest edge must be at least 48px
away from the bounding box of any waypoint marker's label, at the
viewport width used in the current build. If that means moving the card
further down/right along the path, or moving the "Interviewed" marker
slightly, do whichever preserves the path's overall shape better.
```

---

## 3. Re-lock

Update `/design-system/DESIGN_SYSTEM.md`:
- Update `--color-bg-canvas` to #FBF9F6.
- Remove the separate `--color-surface-muted` entry, note that it's now
  an alias of bg-canvas.
- Add the two-tone hierarchy rule from Section 1.3 as a new documented
  rule (which surfaces are white vs. canvas-toned), with the same level
  of explicit named examples as written above - this is exactly the kind
  of rule that's ambiguous enough to drift again if it's not spelled out
  concretely per component.
- Add a changelog line noting this pass and that two items (donut labels,
  Quick Action tints) required a second, more explicit pass after the
  first instruction didn't fully apply - worth noting so future prompts
  know to double-check application, not just issue the instruction once.
