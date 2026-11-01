# Portfolio Craft & Editorial Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate every visual, architectural, and performance detail of the portfolio website to award-grade editorial minimalism, verify all tests and builds, and push to GitHub.

**Architecture:** Refactor UI components to strictly adhere to the Impeccable Craft Floor (eliminating banned uppercase kickers/eyebrows in favor of authoritative serif typography), implement responsive Next.js image optimizations, add interactive category filtering on projects, refine micro-interactions, and elevate the blog reading experience.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, TypeScript, Vitest.

**Spec:** Redesign Master Brief (Editorial Minimalism inspired by Azimul Kabir), Impeccable Craft Floor rules.

## Global Constraints

- Never fabricate or alter factual identity or data.
- Strict backward compatibility with CMS admin routes and Redis/KV storage.
- All tests, TypeScript checks, and builds must pass with 0 errors before committing.
- Push clean commits to `origin main`.

---

### Task 1: Impeccable Craft Floor Typography & Kickers Refactor

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Projects.tsx`
- Modify: `components/Publications.tsx`
- Modify: `components/Research.tsx`
- Modify: `components/CareerExperience.tsx`
- Modify: `components/Experience.tsx`
- Modify: `components/Education.tsx`
- Modify: `components/TechnicalSkills.tsx`
- Modify: `components/Certifications.tsx`
- Modify: `components/GitHubRepos.tsx`
- Modify: `components/CodingProfiles.tsx`
- Modify: `components/Achievements.tsx`
- Modify: `components/Beyond.tsx`
- Modify: `components/Bookshelf.tsx`
- Modify: `components/AcademicReferences.tsx`
- Modify: `components/Affiliations.tsx`
- Modify: `components/Sessions.tsx`
- Modify: `components/Testimonials.tsx`
- Modify: `components/FromBlog.tsx`
- Modify: `components/Contact.tsx`
- Modify: `components/VideoIntro.tsx`
- Modify: `components/Now.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Refactor Hero.tsx and remove eyebrow, placing role as serif sub-headline**
- [ ] **Step 2: Remove redundant eyebrow kickers across all section components**
- [ ] **Step 3: Run TypeScript compiler check `npx tsc --noEmit`**

---

### Task 2: Hero Visual Micro-interactions & Status Indicator Elevation

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add live pulsating beacon to status badge**
- [ ] **Step 2: Refine button hover states, social icons, and focus rings**
- [ ] **Step 3: Run unit tests `npm test`**

---

### Task 3: Performance & Image Optimization in Memory Slider & Lightbox

**Files:**
- Modify: `components/Beyond.tsx`

- [ ] **Step 1: Add responsive `sizes` attribute to all `<Image fill ... />` instances in Beyond.tsx**
- [ ] **Step 2: Add keyboard arrow listener (Escape, Left, Right) to lightbox dialog**
- [ ] **Step 3: Run TypeScript compiler check `npx tsc --noEmit`**

---

### Task 4: Interactive Project Category Filtering & Card Elevation

**Files:**
- Modify: `components/Projects.tsx`

- [ ] **Step 1: Add dynamic category filtering pill buttons with count badges**
- [ ] **Step 2: Animate card transitions smoothly with Framer Motion or CSS transitions**
- [ ] **Step 3: Verify project cards rendering and case study links**

---

### Task 5: Blog Reading Experience & Typography Polish

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Elevate blog post header and prose layout with reading time and date tags**
- [ ] **Step 2: Remove redundant kicker in blog index and improve article preview spacing**
- [ ] **Step 3: Verify all blog routes with `npx tsc --noEmit`**

---

### Task 6: Full Verification Suite, Git Commit & GitHub Push

**Files:**
- Entire repository

- [ ] **Step 1: Run unit tests `npm test`**
- [ ] **Step 2: Run TypeScript check `npx tsc --noEmit`**
- [ ] **Step 3: Run ESLint check `npm run lint`**
- [ ] **Step 4: Run production build `npm run build`**
- [ ] **Step 5: Commit changes to git and push to `origin main`**
