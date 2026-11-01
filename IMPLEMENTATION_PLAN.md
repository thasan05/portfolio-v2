# Editorial Redesign: Implementation Plan
## Transforming Tanvir Hasan's Personal Portfolio

---

## 1. Overview & Strategy

This implementation plan coordinates the step-by-step transformation of the portfolio into an editorial minimalist publication inspired by `azimulkabir.com`. Every phase preserves factual integrity, existing routes, CMS functionality, and full testability.

---

## 2. Structural & Layout Mapping

The current 3-column cluttered layout (`col-span-2` / `col-span-1` with 15+ competing glass cards) will be transformed into an editorial, vertically paced single-column layout centered around `.container-wide` (max-w-5xl) and `.container-page` (max-w-3xl):

```
┌────────────────────────────────────────────────────────┐
│  Top Navigation (Brand Logo TH., Nav Links, Theme)     │
├────────────────────────────────────────────────────────┤
│  Hero Section (Eyebrow, Name, Editorial Lead, Contacts)│
├────────────────────────────────────────────────────────┤
│  Now Section (Current focus: Networking & Systems)     │
├────────────────────────────────────────────────────────┤
│  Featured Projects (Curated editorial presentation)    │
├────────────────────────────────────────────────────────┤
│  Publications & Research (Peer-reviewed DOI citations) │
├────────────────────────────────────────────────────────┤
│  Experience & Leadership (Chronological editorial rows)│
├────────────────────────────────────────────────────────┤
│  Education & Academic Credentials (Clean cards/ledger) │
├────────────────────────────────────────────────────────┤
│  Technical Skills & Tools (Typographic category groups)│
├────────────────────────────────────────────────────────┤
│  Beyond Academics (Photography, Speech, Milestones)    │
├────────────────────────────────────────────────────────┤
│  Certifications, Bookshelf & References                │
├────────────────────────────────────────────────────────┤
│  From the Blog (Recent writing entries)                │
├────────────────────────────────────────────────────────┤
│  Get in Touch (Refined contact form & verified socials)│
├────────────────────────────────────────────────────────┤
│  Footer (Copyright, location, direct profiles, RSS)    │
└────────────────────────────────────────────────────────┘
```

---

## 3. Phase Breakdown & Execution Steps

### Phase A: Design Tokens & Typography Foundation
1. Configure `Newsreader` (editorial serif) and `Inter` (neutral sans) via `next/font/google` in `app/layout.tsx`.
2. Define editorial design tokens in `app/globals.css`:
   - Warm paper base `--bg: #fafaf9` / dark `#09090b`.
   - Subtle lines `--line: #e4e4e7` / `#27272a`.
   - Forest emerald accents `--accent: #166534` / `#86efac`.
   - Layout utilities `.container-wide`, `.container-page`, `.eyebrow`, `.btn`, `.btn-primary`, `.tag`, `.card`.
3. Eliminate dated glassmorphism gradients, saturated glowing borders, and floating blobs.

### Phase B: Navigation & Header
1. Transform `Navbar.tsx` to match the minimal editorial header:
   - Left: Typographic wordmark `Tanvir<span class="text-accent">.</span>` or `Tanvir Hasan`.
   - Right: Clean pill links (`About`, `Projects`, `Writing`, `Contact`), and theme toggle.
   - Accessible keyboard focus states, mobile responsive drawer/menu.

### Phase C: Hero & Now Section
1. **Hero Component (`Hero.tsx`):**
   - Eyebrow: `Computer Science Undergraduate · AIUB`
   - Heading H1: `Tanvir Hasan` in commanding Newsreader Serif.
   - Lead narrative: 3rd-year CSE student at AIUB building towards graduate research in networking and distributed systems.
   - Small circular verified portrait (`/profile.jpg`) with subtle hairline border.
   - Action buttons: `See Projects`, `Get in touch`, `GitHub`.
2. **Now Component (`Now.tsx`):**
   - Editorial card/ledger showing verified current activities (Studying, Building, Researching).

### Phase D: Projects & Research Presentation
1. **Projects Component (`Projects.tsx`):**
   - Curate verified projects:
     - *Campus Network Design & Simulation* (Cisco Packet Tracer, VLAN, OSPF, STP)
     - *AQI & Air Pollution Data Analysis* (Python, Pandas, Research presented at 8th IEOM)
     - *Personal Portfolio & CMS* (Next.js, TypeScript, Upstash Redis)
   - Status indicators (`Completed`, `Published`, `Live`).
   - Clean tags, live links, and GitHub repository links.
2. **Publications Component (`Publications.tsx`):**
   - Academic citation styling with verified DOI and paper link (`https://doi.org/10.46254/BA08.20250452`).
   - Clear distinction between published proceedings and ongoing work.

### Phase E: Experience, Education, and Skills
1. **Experience Component (`Experience.tsx` & `CareerExperience.tsx`):**
   - Unified chronological editorial ledger with hairline dividers (`divide-y divide-line`).
   - Verified roles: Microsoft Student Ambassador, Founder MSA-AIUB, Presentation Finalist, IEOM Presenter, Campus Ambassador.
2. **Education Component (`Education.tsx`):**
   - AIUB B.Sc. in CSE, MCSK HSC (GPA 5.00), MCSK SSC (GPA 5.00).
3. **Technical Skills (`TechnicalSkills.tsx`):**
   - Clean typographic groupings without misleading percentage bars or arbitrary level meters.

### Phase F: Beyond, Certifications, Bookshelf, and References
1. **Beyond Component (`Beyond.tsx`):**
   - Preserves photo assets and stories (Cadet life at MCSK, UIU Presentation Champs, Drumming, YouTube CS teaching, LCB).
2. **Certifications & Bookshelf:**
   - Cisco Networking Academy, Coursera/UMich Python.
   - Book card for *Recharge your down battery*.
3. **Academic References:**
   - Verified AIUB faculty contacts: Mejbah Ahammad (Lecturer, CS), Iftekhar Mahmud (Lecturer, English).

### Phase G: Blog & Writing Experience
1. **Blog Index (`app/blog/page.tsx`):**
   - Editorial list with published date, reading time calculation, and tags.
2. **Blog Reader (`app/blog/[slug]/page.tsx`):**
   - High-readability editorial layout (`.container-page`), serif titles, refined markdown styling.

### Phase H: Contact, Footer, and CMS Verification
1. **Contact Section (`Contact.tsx`):**
   - Minimalist form preserving spam honeypot and rate limiting.
   - Direct verified contact links (email, LinkedIn, GitHub, ResearchGate).
2. **Footer (`Footer.tsx`):**
   - Clean copyright line, location (Dhaka, Bangladesh), and social links.
3. **Admin Panel Verification:**
   - Verify `/admin` loads properly, authenticates, and reads/writes to local data without breaking.

---

## 4. Verification & Testing Checklist

- [ ] Vitest unit tests pass (`npm test`).
- [ ] TypeScript compiler checks pass (`npx tsc --noEmit`).
- [ ] ESLint passes without errors (`npm run lint`).
- [ ] Production build succeeds (`npm run build`).
- [ ] Local development server runs stably on `http://localhost:3000`.
- [ ] Responsive testing verified across desktop, laptop, tablet, and mobile viewports.
