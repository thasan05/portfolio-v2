# Tanvir Hasan — Portfolio

[![CI](https://github.com/thasan05/tanvir-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/thasan05/tanvir-portfolio/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/live-tanvirh.vercel.app-6366f1)](https://tanvirh.vercel.app)

Personal portfolio for Tanvir Hasan — CSE undergraduate (AIUB) focused on networking & distributed systems. A fully self-editable site: every section is managed from a built-in CMS, no code changes or redeploys needed to update content.

**Live:** https://tanvirh.vercel.app · **Admin CMS:** `/admin`

## Highlights

- **Headless CMS built in** — edit Profile, Career, Activities, Education, Skills, Publications, Certifications, Projects, Bookshelf, Testimonials, a toggleable Video intro, and Site metadata from `/admin`, with drag-to-reorder lists.
- **Contact form** — spam-filtered (honeypot + per-IP rate limit), stored in Redis, readable from the admin inbox.
- **Performance** — ISR with on-save cache invalidation (`revalidatePath`), so visitors get a CDN-cached page while edits still appear instantly.
- **SEO** — JSON-LD `Person` schema, dynamic OG image, `sitemap.ts`, `robots.txt`.
- **Accessibility** — keyboard-navigable image lightbox, `prefers-reduced-motion` support, semantic landmarks.
- **Security** — HMAC session tokens with expiry, timing-safe password check, login rate limiting, hardened CSP + security headers, `javascript:` URL sanitisation.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Storage | Upstash Redis (`@upstash/redis`) |
| Hosting | Vercel |
| Tests | Vitest |

## Architecture

- **Content** lives in `content/*.json` (seed defaults). At runtime `lib/content.ts` reads each section from Redis, falling back to the JSON defaults; the admin writes edits back to Redis (or a gitignored `.localdata/` folder in local dev).
- **`app/page.tsx`** is a server component that fetches every section in parallel and passes data as props; each section component renders `null` when empty, so unused sections simply disappear.
- **`app/api/content/[section]`** — GET (public) / POST (auth) for section data. **`app/api/contact`** — public submit + admin read. Auth in `lib/auth.ts`, single Redis client in `lib/redis.ts`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local`:

```bash
ADMIN_PASSWORD=your-strong-password
# Optional — without these, content persists to ./.localdata in dev:
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
npm test        # vitest
```

## License

Personal project — content © Tanvir Hasan. Code available for reference.
"# portfolio-v2" 
