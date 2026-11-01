# Complete Portfolio Transformation Report
## Editorial Minimalism Inspired by Azimul Kabir

**Author:** Antigravity Senior Product Designer & Principal Frontend Architect  
**Target:** Tanvir Hasan Portfolio (`tanvir-portfolio`)  
**Branch:** `redesign/editorial-minimalism`  
**Date:** November 1, 2026  
**Status:** Local Development Complete & Fully Verified  

---

## 1. Executive Summary

This project completely redesigned and rebuilt Tanvir Hasan's personal portfolio into an **editorial minimalist web publication** inspired by the visual language, typography, and spacing of [Azimul Kabir's personal website](https://azimulkabir.com/), while preserving **100% of Tanvir's verified factual identity**, existing built-in **Headless CMS (`/admin`)**, and backend API functionality.

The redesign eliminates generic SaaS aesthetics, neon gradients, bloated container cards, and decorative gimmicks in favor of:
- **Newsreader Serif & Inter Sans-Serif Typography:** Graceful editorial display headings paired with high-legibility body copy and restrained tabular monospace metrics.
- **Warm Editorial Color Palette:** Subtle stone background (`#fafaf9`) with dark charcoal text (`#18181b`) and deep evergreen accents (`#166534`) for light mode; deep obsidian (`#09090b`) with zinc text (`#f4f4f5`) and fresh mint accents (`#86efac`) for dark mode.
- **Restrained Visual Polish:** Hairline 1px border dividers (`border-line`), tactile pill controls (`.btn`, `.btn-primary`), editorial tags (`.tag`), and unified container widths (`container-wide: 64rem / max-w-5xl` and `container-page: 48rem / max-w-3xl`).
- **Complete Content Inventory & Seed Synchronization:** Synchronized verified data across all 21 sections, including all 5 verified experience roles, 2 AIUB faculty references, verified DOI for the 8th IEOM Bangladesh conference paper, verified education at AIUB and Military Collegiate School Khulna (MCSK), and genuine reading list items.
- **Flawless Backend & CMS Compatibility:** Zero regressions in `/admin`, password-based HMAC session authentication, Redis/KV storage with local dev filesystem fallback (`.localdata/`), contact form honeypot protection, and Next.js ISR cache invalidation.

---

## 2. Design System & Editorial Principles

| Feature | Reference (`azimulkabir.com`) | New Tanvir Hasan Portfolio Implementation |
| :--- | :--- | :--- |
| **Aesthetic Personality** | Calm, mature, understated editorial publication | Digital publication of an aspiring networking & systems engineer and researcher |
| **Typography Display** | `Newsreader` (Editorial Serif, italic display accents) | `Newsreader` (Weights: 400, 500, 600, 700; normal + italic) via `next/font/google` |
| **Typography Body** | `Inter` (Neutral, highly legible grotesque) | `Inter` (Weights: 400, 500, 600, 700) via `next/font/google` |
| **Typography Code/Meta** | Tabular Monospace | JetBrains Mono / SF Mono fallback for tags, metrics, and DOIs |
| **Light Theme** | Stone White (`#fafaf9`), Pure White (`#ffffff`), Pine (`#166534`) | Stone White (`#fafaf9`), Pure White (`#ffffff`), Evergreen (`#166534`) |
| **Dark Theme** | Obsidian (`#09090b`), Dark Card (`#151518`), Mint (`#86efac`) | Obsidian (`#09090b`), Dark Card (`#151518`), Mint (`#86efac`) |
| **Grid / Width** | `max-w-5xl` (64rem) wide, `max-w-3xl` (48rem) reading | `.container-wide` (`max-w-5xl`) and `.container-page` (`max-w-3xl`) |
| **Borders & Dividers** | Hairline 1px subtle rules (`#e4e4e7` / `#27272a`) | Hairline 1px dividers on all ledgers, cards, and section boundaries |
| **Buttons & Controls** | Pill shaped (`rounded-full`), understated hover | Tactile pill buttons (`.btn`, `.btn-primary`) with subtle scaling & contrast |
| **Tags & Badges** | Monospace / Sans compact pill tags | Compact `.tag` badges for technology stacks, categories, and statuses |

---

## 3. Architecture & File Changes

### 3.1 Core Styling & Infrastructure
- [app/globals.css](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/globals.css): Rebuilt with Tailwind CSS v4 `@theme` tokens (`--font-serif`, `--font-sans`, `--color-bg`, `--color-surface`, `--color-fg`, `--color-muted`, `--color-line`, `--color-accent`), utility classes (`.container-wide`, `.container-page`, `.eyebrow`, `.btn`, `.btn-primary`, `.tag`, `.card`), and backward compatibility aliases for `/admin`.
- [app/layout.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/layout.tsx): Loaded `Newsreader` and `Inter` via `next/font/google`, mapped CSS variables, enhanced SEO metadata, and added accessible skip link.
- [next.config.ts](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/next.config.ts): Added `turbopack: { root: process.cwd() }` to suppress workspace directory inference warnings, configured remote image patterns for book cover assets.

### 3.2 Public Pages & Routes
- [app/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/page.tsx): Redesigned single-column editorial layout with rhythmic vertical spacing, conditional section rendering, and smooth anchor navigation.
- [app/blog/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/blog/page.tsx): Editorial archive featuring calculated reading times, category tags, published dates, and excerpt previews.
- [app/blog/[slug]/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/blog/[slug]/page.tsx): Long-form article reading layout restricted to `.container-page` with Newsreader serif headings, generous line-height prose, and back navigation.
- [app/projects/[slug]/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/projects/[slug]/page.tsx): Minimalist case study reader for in-depth technical breakdowns.

### 3.3 Transformed Components
1. [components/Navbar.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Navbar.tsx): Clean typographic wordmark `Tanvir.`, understated text links, sticky blur header, mobile drawer menu.
2. [components/ThemeToggle.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/ThemeToggle.tsx): Hydration-safe React 19 `useSyncExternalStore` theme switcher with Sun/Moon icons.
3. [components/Hero.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Hero.tsx): Newsreader serif display H1, verified portrait with live status indicator, location, focus pills, action buttons, one-click copy email button, and verified social links.
4. [components/Now.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Now.tsx): Minimalist ledger card with pulsing green status dot detailing current learning and building activities.
5. [components/Projects.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Projects.tsx): Editorial card grid with category pills, live demo / GitHub links, and deep case study routes.
6. [components/Publications.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Publications.tsx): Academic ledger with verified DOI link (`https://doi.org/10.46254/BA08.20250452`) and 8th IEOM conference venue details.
7. [components/Research.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Research.tsx): Dedicated research interest notes on networking, SDN, and environmental data analysis.
8. [components/Experience.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Experience.tsx) & [components/CareerExperience.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/CareerExperience.tsx): Chronological timeline ledger separated by hairline rules detailing all 5 verified leadership and developer positions.
9. [components/Education.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Education.tsx): 3-card academic background layout for AIUB (B.Sc. CSE, ongoing), MCSK HSC (GPA 5.00/5.00), and MCSK SSC (GPA 5.00/5.00).
10. [components/TechnicalSkills.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/TechnicalSkills.tsx): Grouped typographic skill tags without fabricated percentage progress bars.
11. [components/Certifications.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Certifications.tsx): Credential ledger for Cisco Networking Academy (CCNA 1-3) and Coursera / University of Michigan.
12. [components/GitHubRepos.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/GitHubRepos.tsx) & [components/CodingProfiles.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/CodingProfiles.tsx): Open-source ledger cards and competitive coding platforms (LeetCode, Codeforces, HackerRank, Beecrowd).
13. [components/Achievements.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Achievements.tsx): Verified academic distinctions and leadership recognition.
14. [components/Beyond.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Beyond.tsx): Personal memories and conference gallery preserving swipeable image carousels, keyboard accessible modal lightbox (Escape/Arrows), and YouTube channel view statistics.
15. [components/Bookshelf.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Bookshelf.tsx): Current reading ledger card featuring *Recharge your down battery* by Jhankar Mahbub with 2:3 aspect ratio cover art.
16. [components/AcademicReferences.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/AcademicReferences.tsx) & [components/Affiliations.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Affiliations.tsx): Mentorship details for AIUB faculty (Mejbah Ahammad and Iftekhar Mahmud) and professional student memberships (ESAB, IEEE).
17. [components/FromBlog.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/FromBlog.tsx): Homepage writing section displaying latest published article with calculated read times.
18. [components/Contact.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Contact.tsx): Understated contact form with hidden honeypot spam protection, direct email mailto fallback, and asynchronous submission status.
19. [components/Footer.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/Footer.tsx): Clean editorial footer with copyright, location, social links, discreet CMS admin link, and live visitor flags.
20. [components/ScrollToTop.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/ScrollToTop.tsx) & [components/ScrollProgress.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/components/ScrollProgress.tsx): Subtle progress indicator and understated scroll-to-top pill.

### 3.4 Admin Panel & API Hardening
- [app/admin/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/admin/page.tsx): Preserved complete headless CMS management across all 21 sections; resolved React Compiler `react-hooks/set-state-in-effect` by initializing session token synchronously via lazy initializer.
- [app/admin/beyond/page.tsx](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/admin/beyond/page.tsx): Preserved Vercel Blob multi-image uploads, category selection, and re-order operations with zero ESLint warnings.
- [app/api/youtube-views/route.ts](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/api/youtube-views/route.ts): Replaced untyped `any` signatures with strict TypeScript interfaces for YouTube playlist response schemas.
- [app/api/visitor/route.ts](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/app/api/visitor/route.ts): Hardened geolocation parsing with typed optional catch bindings.

---

## 4. Content Synchronization & Factual Integrity (Rule 0.1)

All content was verified directly against the production live API at `https://tanvirh.vercel.app/api/content/[section]` and the local repository. Discrepancies were resolved in favor of verified ground truth:

1. **Experience (5 Items Synchronized):**
   - Microsoft Learn Student Ambassador (Alpha) — Microsoft (Jan 2026 – Present)
   - Founder & Former Lead — Microsoft Learn Student Ambassadors AIUB (Feb 2025 – Present)
   - Assistant General Secretary — Engineering Students' Association of Bangladesh (ESAB) AIUB Unit Face (Aug 2024 – Dec 2025)
   - Executive Member — ESAB AIUB Unit Face (Jan 2024 – Jul 2024)
   - General Member — ESAB AIUB Unit Face (May 2023 – Dec 2023)
2. **Academic References (2 Faculty Members Synchronized):**
   - Mejbah Ahammad — Assistant Professor, Department of Computer Science, AIUB
   - Iftekhar Mahmud — Assistant Professor, Department of Computer Science, AIUB
3. **Publications (Verified Conference Paper):**
   - Title: *"Study of Air Pollutant Concentrations and AQI Trends in Bangladesh"*
   - Conference: 8th Industrial Engineering and Operations Management (IEOM) Bangladesh Conference (Dhaka, Dec 20–21, 2025)
   - DOI: `https://doi.org/10.46254/BA08.20250452` (Verified and linked)
4. **Bookshelf (Synchronized):**
   - Title: *Recharge your down battery* by Jhankar Mahbub (Status: Currently reading)
5. **Academic Background:**
   - American International University-Bangladesh (AIUB) — B.Sc. in Computer Science & Engineering (2022 – 2026, ongoing)
   - Military Collegiate School Khulna (MCSK) — Higher Secondary Certificate (Science, GPA 5.00/5.00, 2018 – 2020)
   - Military Collegiate School Khulna (MCSK) — Secondary School Certificate (Science, GPA 5.00/5.00, 2016 – 2018)

---

## 5. Verification & Test Suite Results (Rule 0.4)

All checks were executed locally with fresh terminal verification evidence:

```
========================================================================================
CHECK                                    COMMAND                      RESULT
========================================================================================
1. Unit Tests (Vitest)                   npm test                     12/12 PASSED (0 fails)
2. TypeScript Type Check                 npx tsc --noEmit             0 ERRORS (Exit code 0)
3. ESLint Code Quality                   npm run lint                 0 ERRORS, 0 WARNINGS
4. Next.js Turbopack Production Build    npm run build                EXIT CODE 0 (12 routes)
5. Live HTTP Route & API Verification    node test-routes.mjs         11/11 PASSED (0 fails)
========================================================================================
```

### Detailed Route Test Results:
- `[PASS] Homepage (/)`: HTTP 200, 155 KB, `Newsreader` font loaded via Google Fonts CDN/self-hosted variable, `Tanvir Hasan` rendered.
- `[PASS] Blog listing (/blog)`: HTTP 200, 26 KB, article previews and reading times rendered.
- `[PASS] Blog single post (/blog/welcome)`: HTTP 200, article body and typography rendered.
- `[PASS] Admin CMS (/admin)`: HTTP 200, 21 KB, CMS forms and section editors rendered.
- `[PASS] Sitemap XML (/sitemap.xml)`: HTTP 200, valid XML sitemap structure.
- `[PASS] API Content (/api/content/hero)`: HTTP 200, JSON matches `Tanvir Hasan`.
- `[PASS] API Content (/api/content/experience)`: HTTP 200, returns all 5 verified entries.
- `[PASS] API Content (/api/content/publications)`: HTTP 200, verified DOI `10.46254/BA08.20250452`.
- `[PASS] API Content (/api/content/books)`: HTTP 200, returns Jhankar Mahbub reading list item.
- `[PASS] Contact Form API (/api/contact)`: HTTP 200, spam honeypot silent trap confirmed.
- `[PASS] CMS Authorization Guard`: HTTP 401 Unauthorized returned on unauthenticated write attempts.

---

## 6. How to Run & Preview Locally

The project remains strictly in local development on branch `redesign/editorial-minimalism`. No remote git commits or cloud deployments were made (Rule 0.3).

### Step 1: Start the Local Development Server
```bash
npm run dev
```

### Step 2: Open in Your Browser
- Portfolio Homepage: [http://localhost:3000](http://localhost:3000)
- Blog Listing: [http://localhost:3000/blog](http://localhost:3000/blog)
- Blog Article: [http://localhost:3000/blog/welcome](http://localhost:3000/blog/welcome)
- Headless CMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### Step 3: Run Tests & Verification Anytime
```bash
npm test            # Run Vitest test suites
npm run lint        # Run ESLint check
npx tsc --noEmit    # Run TypeScript check
npm run build       # Run Next.js production build
```

---

## 7. Deliverables Reference
- Audit & Architecture: [PROJECT_AUDIT.md](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/PROJECT_AUDIT.md)
- Content Inventory: [CONTENT_INVENTORY.md](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/CONTENT_INVENTORY.md)
- Design System: [DESIGN_SYSTEM.md](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/DESIGN_SYSTEM.md)
- Implementation Plan: [IMPLEMENTATION_PLAN.md](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/IMPLEMENTATION_PLAN.md)
- Redesign Report: [REDESIGN_REPORT.md](file:///C:/Users/Tanvir/OneDrive%20-%20American%20International%20University-Bangladesh/Desktop/tanvir-portfolio-v2/REDESIGN_REPORT.md)
