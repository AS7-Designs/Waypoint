# Waypoint — Color, Realism & Polish Pass
### Master prompt for Antigravity: fix specific bugs, formalize a categorical color system, re-lock

This is another amendment on top of the existing `/design-system/DESIGN_SYSTEM.md` - read it first. Do Section 1 (bug fixes) and Section 2 (palette system) before touching Section 3 (per-screen application), since 3 depends on 2 existing as real components/tokens, not one-off fixes.

---

## 0. What's already working - do not regress this

Three places in the current build already do exactly the right thing with color, and should be treated as the reference standard for everything else in Section 3, not changed themselves:
- **Onboarding Tasks' top stat row** - people/green-check/amber-clock/red-alert icons, each color chosen because it means something (completed = green, pending = amber, blocked = red).
- **Onboarding progress rings** next to each hire's name - green ring at 80%, amber ring at 25%, tiered by how much attention that hire needs.
- **Candidate Profile's Evaluation Summary gauges** - Technical (indigo), Communication (teal), Culture Fit (amber), Problem Solving (violet). Four real dimensions, four distinct colors, nothing arbitrary.

The Login/Signup redesign (waypoint markers along the dashed path, the floating progress card, the fixed divider, the password visibility toggle, the role-picker descriptions) is also working well structurally - it just has one layout bug, fixed below.

---

## 1. Bug fixes (P0 - do these first)

```
1. In mockData.ts, every candidate across the Pipeline currently resolves
   to matchScore: 75 except for 3 records. Open the full candidate list
   and hand-assign a distinct matchScore to every single candidate -
   no two candidates should share the exact same number. Distribute
   realistically across all three tiers so the tiered coloring (85+
   green / 60-84 indigo / below 60 amber) actually gets exercised:
   at least 2-3 candidates below 60%, the majority spread across
   65-95%, no clustering on round numbers like 75 or 80.

2. On the Login and Signup screens, the right-panel illustration has the
   "Interviewed" waypoint label rendering underneath/behind the floating
   "Onboarding Progress" card, so it's clipped and unreadable. Reposition
   either the floating card or the waypoint markers so no label ever sits
   behind another element at any viewport width above 1280px. If needed,
   move the floating stat card lower/further right so it sits in genuinely
   empty space along the path rather than overlapping a labeled waypoint.

3. On the Dashboard's Onboarding Completion donut, there's a garbled/
   overlapping text render near the smallest segment (the ~1% Culture
   slice) where its percentage label collides with a neighboring one.
   Fix: only render an external leader-line label for a segment if it's
   5% or larger; segments below that threshold get their value in the
   legend only (which already exists below the chart), not as a label on
   the ring itself. This is standard practice for donut charts specifically
   to avoid this exact collision on small slices.
```

---

## 2. Design system amendment: formalize the categorical palette

The existing accent tokens (`accent-teal`, `accent-amber`, `accent-rose`, `accent-violet`) already exist and are already locked - the problem isn't a missing color, it's that nothing outside the three examples in Section 0 is instructed to actually use them. Formalize this as an explicit rule, and make one small hex adjustment for more visual pop:

```
1. Update accent-rose from #FB7185 to #EC4899 (a more saturated pink/
   magenta) - the current value reads as a muted salmon, this shift
   gives it more presence when it's used as a qualitative chart color,
   closer to the vividness of the reference palette that prompted this
   pass. Every existing usage of accent-rose (danger-adjacent contexts,
   the 6th quick-action tile, etc.) inherits the new value automatically
   since it's a token, not a hardcoded hex - verify that's still true.

2. Document a hard rule in DESIGN_SYSTEM.md: color has exactly two modes
   in this app, and every new chart or tag must declare which mode it's
   using before implementation.

   SEQUENTIAL mode (one hue, varying only in shade/tint) - use when data
   represents different states of the SAME underlying metric: the Hiring
   Funnel's Applied vs Hired bars (both "candidate count," just different
   stages), a single progress bar, a single donut slice representing
   "% complete" vs "% remaining." Stays indigo-only. Do not add other
   hues here - this is correct as-is.

   CATEGORICAL mode (the accent set: primary, accent-teal, accent-amber,
   accent-rose, accent-violet, cycled in that fixed order) - use when data
   represents genuinely different, unrelated categories: job types
   (Full-time/Part-time/Contract/Internship), departments (Design/
   Engineering/Product), onboarding task owners (already using this
   correctly), evaluation dimensions (already using this correctly),
   or a set of quick-action tiles representing different action types.
   Always assign colors in the same fixed order for the same category set
   across every screen, so "Design" is always violet everywhere it
   appears, not violet on one screen and teal on another.

3. Add both modes, with this exact language and the fixed cycling order,
   to DESIGN_SYSTEM.md as a new top-level section titled "Color Modes,"
   positioned right after the existing color token table.
```

---

## 3. Apply the categorical palette (per screen)

### 3.1 Dashboard - Quick Actions

```
Un-flatten the 4 Quick Action tiles - right now every icon square uses
the same primary-tint background, which is the direct cause of the
"monotonous" feeling on this screen. Apply CATEGORICAL mode: Schedule
Interview = primary, Add Candidate = accent-teal, Assign Onboarding =
accent-amber, Post a Job = accent-violet (each as a tint background
behind the icon, same treatment/opacity as before - only the hue
changes per tile).
```

### 3.2 Jobs screen

```
Convert the department label on each job card (currently plain neutral-
gray pill: "Design," "Engineering," "Product") into a CATEGORICAL-mode
colored pill, using the fixed cycling order from Section 2: assign each
distinct department a color the first time it appears, then reuse that
exact same color for that department everywhere else in the app
(the same job's cards in Pipeline filters, etc, should this department
grouping appear there too). Keep the Urgent/Active pills exactly as they
are (danger/success are SEQUENTIAL-mode semantic pills, not part of this
change).
```

### 3.3 Hiring Pipeline

```
No color changes needed here beyond the mock-data fix in Section 1 -
the Match Score tiering (green/indigo/amber) is SEQUENTIAL mode and
already correct. Once the mock data has real variation, this screen
should visibly show all three tier colors across the board instead of
being almost entirely indigo.
```

---

## 4. Re-lock

Once Sections 1-3 are done, update `/design-system/DESIGN_SYSTEM.md`:
- Update the accent-rose hex value in the token table.
- Add the new "Color Modes" section from 2.2/2.3 verbatim.
- Add a dated changelog line: "2026-07 polish pass: fixed duplicate mock
  match-scores, fixed Login/Signup label overlap, formalized Sequential
  vs Categorical color modes, applied categorical coloring to Quick
  Actions and Jobs department tags."

Then do a final read-through of the whole file against the actual code
and flag anything else that's drifted since the last lock.
