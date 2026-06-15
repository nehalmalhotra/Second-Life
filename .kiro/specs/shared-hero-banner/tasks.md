# Implementation Plan: Shared Hero Banner

## Overview

Replace the existing hero section on the Buyer App homepage with a shared, full-width promotional banner image served from the monorepo root via a build-time symlink. The implementation covers build tooling (symlink script, Next.js config), a new `HeroBanner` component using `next/image` and `next/link`, homepage integration, `.gitignore` updates, and test setup.

## Tasks

- [x] 1. Set up build tooling and shared asset infrastructure
  - [x] 1.1 Create the symlink build script
    - Create `buyer-app/scripts/link-shared-assets.js` that creates a symlink from `buyer-app/public/shared-assets` → `../../assets`
    - The script should check if the symlink already exists before creating it
    - The script should log a warning if the target directory (`../../assets`) doesn't exist and exit gracefully
    - The script should work cross-platform (Windows junction / Unix symlink)
    - _Requirements: 6.1, 6.2, 6.4_

  - [x] 1.2 Update package.json with predev and prebuild hooks
    - Add `"predev": "node scripts/link-shared-assets.js"` to scripts
    - Add `"prebuild": "node scripts/link-shared-assets.js"` to scripts
    - _Requirements: 6.4_

  - [x] 1.3 Update Next.js configuration
    - Add `outputFileTracingRoot: path.join(__dirname, '..')` to `buyer-app/next.config.ts`
    - Add `images: { formats: ['image/avif', 'image/webp'] }` for optimized image delivery
    - _Requirements: 6.4, 2.4_

  - [x] 1.4 Update .gitignore to exclude symlinked directory
    - Add `public/shared-assets` to `buyer-app/.gitignore`
    - _Requirements: 6.2_

- [x] 2. Implement HeroBanner component
  - [x] 2.1 Create the HeroBanner component
    - Create `buyer-app/src/components/HeroBanner.tsx`
    - Define `HeroBannerProps` interface with optional `src`, `href`, `alt`, `aspectWidth`, `aspectHeight` props
    - Use `next/link` wrapping a container `div` with `next/image` inside using `fill` mode and `sizes="100vw"`
    - Set container to `width: 100%` with `aspect-ratio` CSS property for layout shift prevention
    - Implement `onError` handler with `useState` to toggle fallback background color (`var(--color-amazon-page-bg)`)
    - Apply `cursor: pointer` on the link wrapper
    - Default values: `src="/shared-assets/second-life-hero.png"`, `href="/marketplace"`, `alt="Browse the Second Life pre-owned marketplace"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.2, 4.3, 4.4, 6.3_

  - [ ]* 2.2 Write unit tests for HeroBanner component
    - Install Vitest and React Testing Library (`vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`)
    - Create test file at `buyer-app/src/components/__tests__/HeroBanner.test.tsx`
    - Test: renders an anchor element wrapping an image (Req 4.3)
    - Test: anchor href points to `/marketplace` (Req 4.1)
    - Test: image has correct alt text (Req 4.3)
    - Test: image src contains `second-life-hero` (Req 2.1)
    - Test: container has `aspect-ratio` style for CLS prevention (Req 2.5)
    - Test: on image error, fallback background renders and container maintains dimensions (Req 6.3)
    - _Requirements: 2.1, 2.5, 4.1, 4.2, 4.3, 6.3_

- [x] 3. Checkpoint - Verify component and tooling
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Integrate HeroBanner into the homepage
  - [x] 4.1 Replace old hero section with HeroBanner on homepage
    - Modify `buyer-app/src/app/page.tsx`
    - Remove the entire "Hero / Promo Band" section (the dark gradient container with the promo card, product collage grid, and overlay badges)
    - Import and render `<HeroBanner />` in the same position
    - Keep the page wrapper `div` with `paddingTop: '98px'` to offset the fixed AmazonChrome header
    - Preserve the Card Grid Section and all `SectionCard` / `ProductGrid` sub-components unchanged
    - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.2, 5.3_

  - [ ]* 4.2 Write integration tests for the homepage
    - Create test file at `buyer-app/src/app/__tests__/page.test.tsx`
    - Test: homepage does NOT contain old hero elements (text card, product grid, badges) (Req 1.1, 1.2)
    - Test: homepage renders HeroBanner component (Req 1.1)
    - Test: homepage renders all 4 recommendation cards in correct order (Req 1.3, 5.2)
    - Test: card grid has correct spacing (Req 5.3)
    - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.2, 5.3_

- [x] 5. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The design explicitly states PBT is not applicable — all tests are example-based (unit/integration)
- The symlink script must handle Windows (junction) and Unix (symlink) platforms
- The `outputFileTracingRoot` config ensures production builds include the shared asset from outside `buyer-app/`
- Vitest is the recommended test runner for Next.js projects in this ecosystem

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3", "1.4"] },
    { "id": 1, "tasks": ["1.2", "2.1"] },
    { "id": 2, "tasks": ["2.2", "4.1"] },
    { "id": 3, "tasks": ["4.2"] }
  ]
}
```
