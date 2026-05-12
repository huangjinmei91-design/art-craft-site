# ART&CRAFT Frontpage Foundation Design

**Date:** 2026-03-19
**Scope:** Node 1 / Foundation

## Goal

Deliver a working `Frontpage` foundation for the ART&CRAFT website that establishes the visual system, navigation model, homepage composition, and reusable component boundaries for later templates.

## Product Direction

- Visual direction: `Editorial Museum`
- Homepage role: content-led frontpage, not a brand manifesto splash page
- Primary audience: general culture enthusiasts
- Tone: refined, calm, readable, museum-publication-like

## Confirmed Decisions

- The homepage should follow the provided `Frontpage` composition.
- `Sign in` and `Register` are removed.
- The right side of the header becomes `Search + Simplified/Traditional switch`.
- Hero should support auto-play and manual switching.
- Homepage sections use local JSON-backed data for now.

## In Scope

- Next.js app foundation with TypeScript and App Router
- CSS Modules-based styling baseline
- Global design tokens for color, spacing, layout, and typography
- Header with navigation, search affordance, and locale toggle
- Homepage hero carousel
- Three homepage content sections:
  - `探索理念`
  - `浏览物件`
  - `时代长廊`
- Local structured content source shaped for future CMS mapping

## Out of Scope

- CMS integration
- Authentication
- Additional page templates
- Deployment setup
- Admin features
- Full production content pipeline

## Information Architecture

### Header

- Left: project mark / logo
- Center: `浏览物件 / 探索理念 / 时代长廊`
- Right: search trigger and simplified/traditional switch

### Hero

- Large featured image area
- Large Chinese headline and supporting copy
- Pagination dots
- Auto-rotation with manual controls

### Section Order

1. `探索理念`
2. `浏览物件`
3. `时代长廊`

This order reinforces the homepage as a guided discovery surface: users first understand the conceptual lenses, then inspect representative artifacts, then enter a broader temporal narrative.

## Visual System

- Background: warm off-white, not stark white
- Text: charcoal / ink gray rather than pure black
- Dividers: soft light gray
- Accent palette: low-saturation ceramic green, old paper gold, tea brown
- Layout rhythm: wide breathing room and explicit sectional hierarchy
- Interactions: subtle, restrained, polished

## Component Boundaries

### App Layer

- `app/layout.tsx`: global shell and metadata
- `app/page.tsx`: homepage assembly
- `app/globals.css`: reset, tokens, and shared utility rules

### Data Layer

- `src/data/home.ts`: structured local homepage content

### Layout Components

- `src/components/layout/Header`
- `src/components/layout/SectionHeader`
- `src/components/layout/PageContainer`

### Home Components

- `src/components/home/HeroCarousel`
- `src/components/home/ConceptCard`
- `src/components/home/ObjectCard`
- `src/components/home/TimelineCard`

## Data Model

### heroSlides

- `title`
- `subtitle`
- `image`
- `alt`

### conceptCards

- `title`
- `description`
- `image`
- `href`

### objectCards

- `title`
- `accessionNumber`
- `image`
- `href`

### timelineItems

- `title`
- `subtitle`
- `periodLabel`
- `image`
- `href`

## Responsive Strategy

- Desktop-first for fidelity to the provided layout
- Tablet: tighten spacing and card widths
- Mobile: stack the hero and content cards vertically while preserving section order and navigation clarity

## Accessibility Expectations

- All interactive elements must have visible focus states
- Carousel controls must be keyboard accessible
- Images require meaningful `alt` text
- Locale switch must expose its current state

## Verification Targets

- Homepage renders successfully
- Carousel auto-plays and supports manual switching
- Header layout matches the agreed structure
- Homepage sections display local JSON content
- Layout remains usable on desktop and mobile widths
