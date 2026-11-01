# Comprehensive Project Audit: Tanvir Hasan Portfolio

**Date:** November 2026  
**Target Repository:** `thasan05/tanvir-portfolio`  
**Current Live Production:** `https://tanvirh.vercel.app/`  
**Redesign Target:** Editorial Minimalism inspired by `https://azimulkabir.com/`

---

## 1. Executive Summary & Objective

This audit establishes the baseline technical and architectural state of Tanvir Hasan's personal portfolio prior to its transformation into an editorial minimalist web publication. The project is an existing Next.js 16 full-stack application featuring an integrated headless CMS, ISR caching, Redis persistence with local fallback, and contact management.

The redesign must strictly preserve:
- All factual content, assets, credentials, and verification points.
- The entire built-in Headless CMS (`/admin` and related APIs).
- The full data schema and backward compatibility across 21 content sections.
- Zero breaking changes to existing routes (`/`, `/admin`, `/blog`, `/blog/[slug]`, `/projects/[slug]`, `/api/*`).
- Local-only execution and testing (strict prohibition against unauthorized git push, Vercel deployments, or production modifications).

---

## 2. Technology Stack & Dependencies

| Category | Technology | Version / Specification | Role / Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `16.2.10` (App Router) | React Server Components (RSC), Turbopack, ISR (`revalidate = 3600`) |
| **Runtime / Library** | React & React-DOM | `19.2.3` | Modern concurrent rendering, Server Actions & Form state |
| **Language** | TypeScript | `^5` | Strict mode enabled, zero-tolerance typing errors |
| **Styling** | Tailwind CSS | `v4` (`@tailwindcss/postcss`) | Modern `@theme` tokens, pure CSS cascade layers |
| **Fonts** | Google Fonts via `next/font/google` | Currently `Inter`, expanding to `Newsreader` + `Inter` + `JetBrains Mono` | Zero CLS, self-hosted font loading |
| **Animation** | Framer Motion | `^12.23.25` | Spring physics, layout animations, drag-to-reorder in Admin |
| **Icons** | Lucide React, Heroicons, React Icons | `lucide-react@0.563.0`, `react-icons@5.5.0` | SVG icons; bundle tree-shaking optimized via `next.config.ts` |
| **Content / Markdown** | react-markdown, remark-gfm, gray-matter | Markdown parsing for blog posts and project case studies |
| **Persistence** | Upstash Redis (`@upstash/redis`) | Primary KV storage in production; auto-falls back to `.localdata/` in dev |
| **File Storage** | `@vercel/blob` | `^1.1.1` | Asset/photo uploads via `/api/admin/upload` |
| **Theme System** | `next-themes` | `^0.4.6` | Class-based dark/light theme toggle |
| **Testing** | Vitest | `^4.1.10` | Unit & API route tests in `lib/__tests__` |
| **Linting** | ESLint & Next.js config | `eslint@^9`, `eslint-config-next@16.2.10` | Flat configuration in `eslint.config.mjs` |

---

## 3. Architecture & Data Flow

### 3.1 Content Flow & Fallback Cascade
The application architecture employs a triple-tier fallback strategy implemented in `lib/content.ts`:

```
┌────────────────────────────────────────────────────────┐
│                      Request                           │
└──────────────────────────┬─────────────────────────────┘
                           ▼
          Is Redis configured (env vars present)?
                 ├── YES ──► Query Upstash Redis (`portfolio:${section}`)
                 │             │
                 │             ├── Cached / Key exists ──► Return Redis data
                 │             └── Key null / Error    ──► Fall back to content/*.json
                 │
                 └── NO (Local Dev) ──► Query `.localdata/${section}.json`
                                          │
                                          ├── File exists ──► Return local JSON
                                          └── Not found   ──► Fall back to content/*.json
```

### 3.2 Built-in Headless CMS Mechanics
- **Admin Authentication:**
  - Route: `/admin` and `/api/admin/login`.
  - Credentials: Validated against `process.env.ADMIN_PASSWORD`.
  - Security: Timing-safe equality comparison (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
  - Session Management: Cryptographic HMAC signature cookie (`portfolio_session`) with configured expiry.
  - Rate Limiting: Login attempt rate limiting to mitigate brute-force vectors.
- **Section Editing & Reordering:**
  - Dynamic drag-to-reorder powered by Framer Motion's `Reorder.Group` and `Reorder.Item`.
  - On save, `POST /api/content/[section]` calls `setContent(section, data)` and triggers `revalidatePath("/")` to bust CDN cache on demand.
- **Media Uploads:**
  - Route: `/api/admin/upload`
  - Validates session, streams file directly to Vercel Blob storage, returns permanent URL.
- **Contact Inbox:**
  - Contact submissions sent via `POST /api/contact` (validated with honeypot and per-IP rate limiter).
  - Submissions stored in Redis list / local storage.
  - Admin inbox inspects, reads, and marks messages.

### 3.3 Available Content Sections (21 Total)
1. `hero` (Profile info, status, bio, tags, social links, availability)
2. `career` (Formal employment & career history)
3. `experience` (Leadership, community, ambassadorship, competitions)
4. `education` (Degrees, institutions, GPA, periods, details)
5. `skills` (Grouped technical competencies)
6. `publications` (Conferences and journal publications with DOIs/URLs)
7. `references` (Academic & professional faculty references)
8. `affiliations` (Organizational memberships, e.g. IEEE, ESAB)
9. `beyond` (Personal milestones, leadership, drumming, speaking, media)
10. `site` (SEO titles, meta descriptions, OpenGraph/Twitter cards)
11. `projects` (Curated software projects, case studies, links)
12. `certifications` (Verified credentials, Cisco, Coursera/UMich)
13. `books` (Bookshelf / currently reading)
14. `video` (Optional video intro embed)
15. `testimonials` (Quotes & recommendations)
16. `now` (Current activities, studying, building)
17. `research` (Research interests statement & focus areas)
18. `coding` (LeetCode, Codeforces, HackerRank profiles)
19. `achievements` (Honors, scholarships, awards)
20. `blog` (Long-form technical articles, Markdown rendered)
21. `sessions` (Workshops, guest talks, speaking engagements)

---

## 4. Routing Structure & Endpoints

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | Page (RSC, ISR) | Main portfolio page; fetches all sections in parallel |
| `/blog` | Page (RSC) | Article index listing published posts |
| `/blog/[slug]` | Page (Dynamic RSC) | Single article reader with markdown rendering and typography |
| `/projects/[slug]` | Page (Dynamic RSC) | Project case study reader |
| `/admin` | Client Component | Secure CMS management dashboard |
| `/admin/beyond` | Client Component | Media and beyond-academics photo management |
| `/api/content/[section]` | API Route | `GET`: public read; `POST`: admin write |
| `/api/contact` | API Route | `POST`: public contact submit; `GET`: admin messages |
| `/api/admin/login` | API Route | Authenticate admin password, issue signed cookie |
| `/api/admin/upload` | API Route | Asset upload to blob storage |
| `/api/visitor` | API Route | Anonymous page view counter |
| `/api/youtube-views` | API Route | Cached view count fetching for YouTube channel |
| `/sitemap.ts` | Dynamic Route | XML sitemap generator |
| `/robots.txt` | Static Route | Search engine crawlers config |
| `/opengraph-image` | Dynamic Image | Dynamic OpenGraph preview generation |

---

## 5. Security & Performance Guardrails

- **Content Security Policy (CSP):** Configured in `next.config.ts`, strictly defines permitted hosts for scripts, fonts, frames (YouTube embed only), and media.
- **Security Headers:** HSTS (`max-age=63072000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
- **Admin Isolation:** Middleware enforces `X-Robots-Tag: noindex, nofollow, noarchive` and `Cache-Control: no-store` on all `/admin` routes.
- **Path Traversal & URL Sanitization:** `middleware.ts` rejects any request with directory traversal patterns (`..`, `//`, sensitive extensions). `safeHref` sanitizer protects external links against `javascript:` pseudoprotocols.
- **Reduced Motion:** Fully integrated CSS `@media (prefers-reduced-motion: reduce)` disabling non-essential transitions and animations.

---

## 6. Transformation Plan & Quality Floor

The incumbent design relied on a "liquid glass" aesthetic (multiple layered gradients, heavy glowing shadows, glassmorphism containers, saturated indigo/violet badges). 

The target design—inspired by `azimulkabir.com`—replaces this with:
1. **Quiet, confident editorial typography:** Newsreader serif paired with Inter sans-serif and monospace technical accents.
2. **Generous, intentional whitespace:** Calibrated content widths (`container-wide: max-w-5xl`, `container-page: max-w-3xl`) ensuring optimal paragraph measure (65–75 characters).
3. **Restrained, natural palette:** Warm paper-tint light mode (`#fafaf9`), rich deep dark mode (`#09090b`), subtle hairline dividers (`#e4e4e7` / `#27272a`), and a sophisticated nature-inspired accent.
4. **Seamless preservation of all CMS data:** The presentation layer will be modernized without altering the underlying data models or breaking existing CMS forms.
