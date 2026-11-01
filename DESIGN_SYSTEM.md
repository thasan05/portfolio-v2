# Editorial Minimalist Design System
## Inspired by Azimul Kabir (`azimulkabir.com`) for Tanvir Hasan

---

## 1. Design Philosophy & Creative Direction

The redesign transforms the portfolio from a developer-dashboard / "liquid glass" visual style into a calm, mature, intentional, and typographic digital publication. 

The aesthetic is:
> **EDITORIAL · MINIMAL · INTENTIONAL · TYPOGRAPHIC · PERSONAL · UNDERSTATED**

It combines the gravitas of an academic journal with the crisp clarity of an independent software engineer's digital notebook. It eschews generic SaaS tropes (floating badges, heavy blurs, neon gradients, cards inside cards) in favor of purposeful content hierarchy, generous negative space, and disciplined typography.

---

## 2. Color System & Design Tokens

### 2.1 Principles
- **Light mode:** Grounded in warm paper stone (`#fafaf9`), providing organic warmth compared to sterile clinical white (`#ffffff`).
- **Dark mode:** Deep obsidian zinc (`#09090b`), avoiding muddy grays while preserving contrast ratios.
- **Accents:** Restrained forest emerald (`#166534` light / `#86efac` dark) reflecting growth, clarity, and precision without shouting.
- **Lines & Hairlines:** Crisp 1px rules (`#e4e4e7` light / `#27272a` dark) replacing heavy container shadows.

### 2.2 Semantic CSS Variables

```css
:root {
  /* Surface & Base */
  --bg: #fafaf9;
  --surface: #ffffff;
  --fg: #18181b;         /* zinc-900 */
  --muted: #5f5f68;      /* zinc-600 */
  --line: #e4e4e7;       /* zinc-200 */
  
  /* Brand Accent */
  --accent: #166534;     /* emerald-800 */
  --accent-soft: #dcfce7;/* emerald-100 */

  /* Typography Families */
  --font-serif: var(--font-newsreader), "Newsreader Variable", ui-serif, Georgia, Cambria, serif;
  --font-sans: var(--font-inter), "Inter Variable", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Layout Containers */
  --container-wide: 64rem; /* 1024px */
  --container-page: 48rem; /* 768px */

  color-scheme: light;
}

[data-theme="dark"],
.dark {
  --bg: #09090b;
  --surface: #151518;
  --fg: #f4f4f5;         /* zinc-100 */
  --muted: #a1a1aa;      /* zinc-400 */
  --line: #27272a;       /* zinc-800 */

  --accent: #86efac;     /* emerald-300 */
  --accent-soft: #14532d;/* emerald-900 */

  color-scheme: dark;
}
```

---

## 3. Typography Scale & Hierarchy

| Role | Font Family | Size (Mobile) | Size (Desktop) | Weight | Leading | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow / Category** | Sans / Mono | `0.75rem` (12px) | `0.75rem` (12px) | Medium (500) | Tight | `0.14em` (Uppercase) |
| **Hero Display H1** | Editorial Serif | `2.6rem` (42px) | `3.75rem` (60px) | Semibold (600) | `1.05` | `-0.025em` |
| **Section Heading H2** | Editorial Serif | `1.875rem` (30px)| `2.25rem` (36px) | Semibold (600) | `1.2` | `-0.02em` |
| **Card / Entry Title H3**| Editorial Serif | `1.125rem` (18px)| `1.25rem` (20px) | Semibold (600) | `1.35` | `-0.015em` |
| **Hero Subtitle Lead** | Editorial Serif | `1.25rem` (20px) | `1.6rem` (26px)  | Normal (400) | `1.4` | Normal |
| **Body Primary** | Sans (Inter) | `0.9375rem` (15px)| `1.0rem` (16px)  | Normal (400) | `1.6` | Normal |
| **Body Secondary / Muted**| Sans (Inter)| `0.875rem` (14px) | `0.9375rem` (15px)| Normal (400) | `1.5` | Normal |
| **Metadata / Numbers** | Monospace / Tabular| `0.8125rem` (13px)| `0.875rem` (14px)| Normal / Medium | `1.4` | Normal / Tabular |

---

## 4. Layout Architecture & Containers

### 4.1 Content Columns
- **`.container-wide` (`max-w-5xl` / 1024px):**
  - Used for top navigation, hero introduction, projects showcases, article grids, and footer.
  - Centered horizontally with responsive horizontal padding: `px-4 sm:px-6`.
- **`.container-page` (`max-w-3xl` / 768px):**
  - Used for editorial long-form reading, article bodies (`/blog/[slug]`), project case studies (`/projects/[slug]`), and focused informational lists.
  - Keeps paragraph measure strictly under 70 characters for comfortable reading.

### 4.2 Spacing Cadence
- **Section Margin:** `mt-16 sm:mt-24` separating major thematic divisions.
- **Header to Content Gap:** `mt-4 sm:mt-6` establishing tight grouping between titles and accompanying narrative.
- **List Item Spacing:** Subtle 1px dividers (`divide-y divide-line border-y border-line`) with vertical item padding `py-3 sm:py-4`.

---

## 5. Core Reusable Component Primitives

### 5.1 Eyebrow
- **Appearance:** Small, uppercase, letter-spaced metadata label.
- **Classes:** `text-xs font-medium tracking-[0.14em] uppercase text-muted`

### 5.2 Pill Buttons (`.btn` & `.btn-primary`)
- **Default (`.btn`):**
  - Height: 44px (`min-h-[44px]`).
  - Radius: Pill (`rounded-full`).
  - Border: `1px solid var(--line)`.
  - Padding: `px-5 py-2.5`.
  - Typography: `text-sm font-medium text-fg`.
  - Hover: `hover:border-fg transition-colors duration-150`.
- **Primary (`.btn-primary`):**
  - Background: `var(--fg)`.
  - Text: `var(--bg)`.
  - Hover: `hover:bg-accent hover:border-accent hover:text-white`.

### 5.3 Pill Tags (`.tag`)
- **Appearance:** Minimal indicator for technologies, dates, and statuses.
- **Classes:** `inline-flex items-center text-xs text-muted border border-line rounded-full px-2.5 py-0.5`.

### 5.4 Editorial Cards (`.card`)
- **Appearance:** Crisp, restrained container with subtle 1px border.
- **Classes:** `rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-muted`.

### 5.5 Section List Entries (Editorial Rows)
- **Appearance:** Replaces cluttered card grids for Experience, Education, and Publications with a clean two-column editorial ledger.
- **Structure:**
  - Left column: Title, institution/organization, narrative summary.
  - Right column: Tabular date / period, formatted in monospace or muted tabular sans.

---

## 6. Motion & Accessibility

- **Animation Strategy:** Gentle, understated fade-and-rise entrance animations (`fade-up`, 8px translation, 400ms duration).
- **Reduced Motion Support:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Focus Rings:** Distinct, accessible keyboard navigation rings (`focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`).
- **Contrast Ratios:** All text combinations exceed WCAG AA standards (minimum 4.5:1 for body copy, 3:1 for large display titles).
