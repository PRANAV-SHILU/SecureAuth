<div align="right">Last Modified: 1-Sep-2026</div>

# Resolved Issues & Bug Fixes — LookSphere

This document records the major bugs, UI glitches, and functional issues that have been successfully resolved across the platform.

---

## Table of Contents

- [1. Visual & Rendering Glitches](#1-visual--rendering-glitches)
  - [1.1 GPU Rasterization Glitch Mitigation](#11-gpu-rasterization-glitch-mitigation)
  - [1.2 Chrome Mobile Blur Bug Fix](#12-chrome-mobile-blur-bug-fix)
  - [1.3 Mobile Hover Effect Removal](#13-mobile-hover-effect-removal)
- [2. Feed Layout & Video Experience](#2-feed-layout--video-experience)
  - [2.1 Cumulative Layout Shift (CLS) in Feed](#21-cumulative-layout-shift-cls-in-feed)
  - [2.2 Single-Active Coordinated Video Autoplay](#22-single-active-coordinated-video-autoplay)
  - [2.3 Video Poster Flash & Letterbox Glitches](#23-video-poster-flash--letterbox-glitches)

---

## 1. Visual & Rendering Glitches

### 1.1 GPU Rasterization Glitch Mitigation
**Files:** `frontend/src/main.css`, Home page components

On mid-tier mobile GPUs (such as the Mali-G52) running Chrome with GPU Rasterization enabled, rendering complex transparent layers, vector borders, and linear gradients at deep scroll offsets triggers screen-wide horizontal rendering seam glitches.

**Fixes:**
1. **Targeted Touchscreen Media Query:** Adjusted the mobile media query in `main.css` to target both small viewports and all touchscreen devices: `@media (max-width: 768px), (pointer: coarse)`.
2. **Solid Card & Page Backgrounds:** Overrode the transparent backgrounds of `.glass`, `.liquid-glass`, and `body` to use 100% solid, non-transparent background variables on mobile/touchscreen devices.
3. **Card/Item Border Removal:** Set `border: none !important;` on `.glass` and `.liquid-glass` elements on mobile/touch screens to disable sub-pixel vector border drawing.
4. **Disabled Card Glows:** Disabled the `<CardGlow />` hover gradient overlay entirely on mobile screens (`display: none !important`).
5. **Badge Blur Removal:** Removed absolute-positioned `backdrop-blur-md` and borders from the "Very Soon" badge inside `ActivityFeed.jsx` on mobile.

**Impact:** Eliminates all screen-wide horizontal tearing and grid glitches in mobile Chrome.

---

### 1.2 Chrome Mobile Blur Bug Fix
**File:** `frontend/src/shared-components/SharedHomeComponents.jsx`

A persistent Chrome mobile rendering bug caused thin horizontal glitch lines across Home page sections. The root cause was a `blur-md` CSS filter on the `<CardGlow />` component when combined with a `linear-gradient` background.

**Fix:** The `blur-md` class was removed from `CardGlow`, leaving only the gradient opacity transition. 

---

### 1.3 Mobile Hover Effect Removal
**File:** `frontend/src/utils/styles.js`

On mobile devices, CSS `:hover` states behave unpredictably — they "stick" after a tap and trigger during scroll. 

**Fix:** The shared `CARD_HOVER` utility class was updated to restrict all hover transforms and shadows to the `md:` breakpoint (768px+), ensuring mobile users never experience cards "jumping up" (`-translate-y-1`) when accidentally scrolled over.

---

## 2. Feed Layout & Video Experience

### 2.1 Cumulative Layout Shift (CLS) in Feed
**Files:** `frontend/src/pages/Feed.jsx`, `frontend/src/skeletons/FeedSkeleton.jsx`

When loading or scrolling the Feed, posts caused severe layout shifts and content jumping because media containers had indeterminate heights before media assets finished loading. In addition, the skeleton placeholders did not match actual rendered card dimensions.

**Fixes:**
1. **Fixed-Height Media Containers:** Locked the media viewports in both `FeedCard` and `FeedSkeleton` to a consistent `520px` height with `object-contain`.
2. **Matching Skeleton Geometry:** Aligned skeleton header, media viewport, and footer heights 1:1 with real post cards.

**Impact:** Achieves zero Cumulative Layout Shift (CLS = 0) during initial loads, route revalidations, and infinite scroll appending.

---

### 2.2 Single-Active Coordinated Video Autoplay
**File:** `frontend/src/pages/Feed.jsx`

Multiple video posts intersecting the viewport would previously attempt to play simultaneously, causing overlapping audio streams and hardware decoder bottlenecks on low-end mobile devices.

**Fixes:**
1. **Parent Video Coordinator:** Implemented an `activeVideoId` state in the parent Feed component combined with `onVideoIntersect` and `onVideoLeave` callbacks.
2. **Single-Player Lock:** Only the single centered/most recent intersecting post is granted active playback status; previous videos automatically pause and release the DOM decoder.

**Impact:** Prevents audio collisions, conserves mobile GPU/battery resources, and provides a smooth TikTok/Instagram-style scrolling feed.

---

### 2.3 Video Poster Flash & Letterbox Glitches
**File:** `frontend/src/pages/Feed.jsx`

Switching from a thumbnail to an active playing video caused brief visual flashes (empty white/gray rectangles) while video metadata loaded. Letterbox margins around portrait or non-standard aspect ratio videos also clashed with light/dark theme backgrounds.

**Fixes:**
1. **Native Video Poster Integration:** Bound `poster={getVideoPosterUrl(post.mediaUrl, 600)}` with `preload="metadata"` directly onto active `<video>` tags.
2. **Theme-Aware Letterbox Surface:** Applied `var(--bg-tertiary)` to the container with `object-contain` scaling for smooth blending.

**Impact:** Completely eliminates transition flashes and provides seamless thumbnail-to-stream handoffs.

---

**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Roadmap](./roadmap.md) | [Performance](./performance_optimization.md) | [Resolved Issues](./resolved_issues.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---
