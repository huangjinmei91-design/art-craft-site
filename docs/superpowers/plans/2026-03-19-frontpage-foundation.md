# Frontpage Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ART&CRAFT homepage foundation as a runnable Next.js frontpage with reusable layout components, local structured content, and a polished hero carousel.

**Architecture:** Create a small Next.js App Router application with homepage data isolated in `src/data/home.ts`, reusable layout primitives under `src/components/layout`, and homepage-specific presentation under `src/components/home`. Styling uses CSS Modules plus global design tokens so later templates can reuse the same visual baseline without coupling themselves to homepage-only markup.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library

---

## File Structure

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `public/images/`
- Create: `src/data/home.ts`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Header.module.css`
- Create: `src/components/layout/PageContainer.tsx`
- Create: `src/components/layout/SectionHeader.tsx`
- Create: `src/components/layout/SectionHeader.module.css`
- Create: `src/components/home/HeroCarousel.tsx`
- Create: `src/components/home/HeroCarousel.module.css`
- Create: `src/components/home/ConceptCard.tsx`
- Create: `src/components/home/CardGrid.module.css`
- Create: `src/components/home/ObjectCard.tsx`
- Create: `src/components/home/TimelineCard.tsx`
- Create: `src/components/home/Frontpage.module.css`
- Create: `src/test/setup.ts`
- Create: `src/components/home/HeroCarousel.test.tsx`
- Create: `src/components/layout/Header.test.tsx`
- Create: `src/data/home.test.ts`
- Create: `vitest.config.ts`
- Create: `.gitignore`

### Task 1: Bootstrap the project foundation

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `.gitignore`

- [ ] Step 1: Initialize the Next.js and TypeScript project metadata
- [ ] Step 2: Add scripts for `dev`, `build`, `test`, and `lint`
- [ ] Step 3: Install runtime and test dependencies
- [ ] Step 4: Verify the project boots with `npm run build`

### Task 2: Add a test harness before homepage code

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/data/home.test.ts`

- [ ] Step 1: Write a failing test asserting the homepage data shape
- [ ] Step 2: Run the targeted test and confirm failure
- [ ] Step 3: Add the minimal data module to satisfy the test
- [ ] Step 4: Re-run the targeted test and confirm success

### Task 3: Build the header with TDD

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Header.module.css`
- Create: `src/components/layout/Header.test.tsx`

- [ ] Step 1: Write a failing test for the navigation items and locale toggle
- [ ] Step 2: Run the targeted header test and confirm failure
- [ ] Step 3: Implement the minimal header component and styles
- [ ] Step 4: Re-run the header test and confirm success

### Task 4: Build the hero carousel with TDD

**Files:**
- Create: `src/components/home/HeroCarousel.tsx`
- Create: `src/components/home/HeroCarousel.module.css`
- Create: `src/components/home/HeroCarousel.test.tsx`

- [ ] Step 1: Write failing tests for auto-advance, dot switching, and manual controls
- [ ] Step 2: Run the targeted hero tests and confirm failure
- [ ] Step 3: Implement the minimal carousel behavior and styling
- [ ] Step 4: Re-run the hero tests and confirm success

### Task 5: Assemble the homepage sections

**Files:**
- Create: `src/components/home/ConceptCard.tsx`
- Create: `src/components/home/ObjectCard.tsx`
- Create: `src/components/home/TimelineCard.tsx`
- Create: `src/components/home/CardGrid.module.css`
- Create: `src/components/home/Frontpage.module.css`
- Create: `src/components/layout/PageContainer.tsx`
- Create: `src/components/layout/SectionHeader.tsx`
- Create: `src/components/layout/SectionHeader.module.css`
- Create: `app/page.tsx`

- [ ] Step 1: Create small presentational components for the three section card types
- [ ] Step 2: Create reusable section header and container primitives
- [ ] Step 3: Compose the frontpage from header, hero, and section grids
- [ ] Step 4: Run the existing test suite and confirm no regressions

### Task 6: Polish the visual foundation and verify

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Modify: all CSS Modules created above

- [ ] Step 1: Add global tokens for color, spacing, and typography
- [ ] Step 2: Tune desktop and mobile layout behavior to match the agreed frontpage
- [ ] Step 3: Run `npm run test`
- [ ] Step 4: Run `npm run build`
- [ ] Step 5: Run the local dev server for visual inspection
