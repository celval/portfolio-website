# Tech Stack Research: Portfolio Website

> Research date: April 2026
> Project: Célia Valette — Freelance Designer Portfolio

## Design Requirements (from Figma)

- **Image-heavy site** — Hero images, 5 project case studies each with ~5-6 thumbnails, about section, contact section
- **Hover carousel** — Project cards have a row of images that slide/animate when the user hovers
- **Responsive images** — Serve optimally-sized images for mobile vs desktop (not just CSS scaling — actual different sizes and formats)
- **Mostly static** — Content changes infrequently (portfolio updates)
- **Simple to maintain** — Solo freelancer maintaining it

---

## 1. Framework Comparison

### Astro — Recommended

**Why it fits:** Purpose-built for content-driven, mostly-static sites like portfolios. Ships zero JavaScript by default; only hydrates interactive "islands" you explicitly mark.

**Image handling:**
- `<Image />` component with `layout` property (constrained, fixed, full-width) auto-generates `srcset` and `sizes`
- `<Picture />` component generates `<picture>` elements with multiple `<source>` tags for format negotiation (AVIF → WebP → JPEG)
- Build-time Sharp processing generates multiple widths — no runtime cost
- As of Astro 5.10+, responsive images with automatic `srcset`/`sizes` generation are fully stable (no longer experimental)

**Performance:**
- ~90% smaller JS bundles than Next.js (~8KB vs ~85KB gzipped for a typical homepage)
- Lighthouse: Performance 100, Best Practices 100, SEO 100 on benchmarked portfolio sites
- First Contentful Paint ~0.5s vs Next.js at 1–1.5s
- Build times roughly 3x faster than Next.js (13s vs 73s in one real-world portfolio comparison)
- On mobile (slow 4G), maintains 95+ performance score vs Next.js dropping to ~75

**Key advantage:** Supports React, Svelte, Vue, or Solid components within Astro pages. Use React for the interactive hover carousel while the rest stays static HTML.

**Acquired by Cloudflare in January 2026** — significant corporate backing, first-class Cloudflare deployment.

**Gaps:**
- No built-in blur placeholder / LQIP support (must use `astro-lqip` community component or manual implementation)
- Smaller ecosystem than Next.js (fewer tutorials, Stack Overflow answers)
- For the hover carousel, you bring in a React/Svelte island with a JS animation library

**Complexity for solo dev:** Low–Medium. Excellent docs, straightforward mental model.

---

### Next.js (App Router) — Runner-up

**Why it fits:** `next/image` is the most full-featured image component of any framework.

**Image handling:**
- Automatic responsive `srcset`, lazy loading, blur placeholders (LQIP), format conversion (WebP/AVIF), and size detection — all built in
- Blur placeholders work out of the box for local images (auto-generates tiny base64 previews at build time)
- On Vercel: on-demand optimization at the edge with aggressive caching
- Supports `placeholder="blur"` with auto-generated `blurDataURL` for local images
- Custom loaders for Cloudinary, imgix, etc.

**Gaps:**
- Overpowered for a static portfolio — ships significantly more JavaScript even for static pages (~85KB gzipped minimum)
- Slower builds with many images (73s vs 13s in real-world portfolio comparison)
- Image optimization on Vercel Hobby plan limited to 5,000 transformations/month
- App Router learning curve is steep (Server Components, client components, layouts)
- Frequent major releases create maintenance burden

**Complexity for solo dev:** Medium–High. The App Router has a significant learning curve.

---

### Eleventy (11ty) — Best Pure SSG Alternative

**Why it fits:** Zero-JS static site generator with one of the best image processing pipelines available.

**Image handling:**
- `@11ty/eleventy-img` plugin processes images at build time — generating multiple sizes, converting to AVIF/WebP, outputting responsive `<picture>` elements with proper `srcset`
- One of the most mature and well-tested image pipelines in the SSG world

**Performance:** Pure static HTML/CSS/JS output with zero client-side JavaScript by default. Near-perfect Lighthouse scores.

**Gaps:**
- Template-language approach (Nunjucks, Liquid, etc.) — less component-oriented than React/Vue
- No built-in component model for interactive elements — must wire up vanilla JS or a framework for the hover carousel
- Less "batteries-included" than Next.js — you assemble your own CSS pipeline

**Complexity for solo dev:** Low for basic sites. Steeper for adding interactivity.

---

### Nuxt.js (Vue) — Best Full-Framework Alternative

**Why it fits:** Great image optimization with a gentler learning curve than Next.js.

**Image handling:**
- `<NuxtImg>` and `<NuxtPicture>` components handle lazy loading, responsive sizes, format negotiation
- Integration with image CDNs (Cloudinary, imgix, Vercel/Netlify) or local `ipx` provider for self-hosted optimization
- Automatically adds `loading="lazy"`, proper `sizes`, can serve AVIF/WebP

**Performance:** Supports full static generation via `nuxt generate`. Very good for static sites, though it ships the Vue runtime.

**Gaps:** Vue ecosystem is smaller than React's. You'd need to learn Vue if you don't already know it.

**Complexity for solo dev:** Low–Medium. Vue's learning curve is gentle, and Nuxt has excellent DX.

---

### SvelteKit

**Image handling:**
- `@sveltejs/enhanced-img` provides build-time optimization
- Automatically generates `<picture>` with multiple formats (AVIF, WebP)
- Auto-sets width/height to prevent layout shift

**Gaps:**
- Only works with local/build-time images — external images need alternative approaches
- Smaller ecosystem (Framer Motion is React-only; would use GSAP or Motion One for animations)
- No built-in LQIP/blur placeholders

**Complexity for solo dev:** Low–Medium. Svelte is arguably the easiest framework to learn.

---

### Frameworks to Avoid for This Project

| Framework | Why Not |
|-----------|---------|
| **Gatsby** | Declining ecosystem, unnecessary GraphQL complexity, stagnating plugin ecosystem. Still maintained but community momentum has shifted. |
| **Remix / React Router v7** | No built-in image optimization at all. Designed for dynamic apps with forms and server logic — overkill and underpowered for a static portfolio. |
| **Plain Vite + React** | No image optimization — must manually assemble multiple plugins. Essentially building your own mini-framework. |
| **Qwik / QwikCity** | Immature image tooling, very small ecosystem. Innovative resumability model but too early-adopter for a production portfolio. |
| **SolidStart** | No dedicated image optimization component. Small ecosystem. Great raw performance but missing key portfolio-site features. |
| **Hugo** | Blazing fast builds but Go template language has a steep learning curve. Image processing syntax is verbose. |

---

## 2. Image Optimization Strategy

### Format Strategy (2026 Best Practice)

Serve in priority order: **AVIF → WebP → JPEG/PNG fallback**

| Format | Size Savings vs JPEG | Browser Support |
|--------|---------------------|-----------------|
| AVIF | ~50% smaller | 93%+ globally |
| WebP | 25–35% smaller | 97%+ |
| JPEG | Baseline (fallback) | Universal |

### Build-Time vs CDN Optimization

| Approach | Cost | Best For | Used By |
|----------|------|----------|---------|
| **Build-time (Sharp)** | Free | Static content, infrequent changes | Astro, 11ty, Gatsby, SvelteKit |
| **Vercel Image Optimization** | Free (5K transforms/mo) | Next.js on Vercel | Next.js |
| **Cloudinary** | Free (25 credits/mo) | Dynamic images, heavy transforms | Any framework |
| **Cloudflare Images** | $5/mo + $1/100K deliveries | High-traffic sites | Any framework |
| **Netlify Image CDN** | Included in free tier | Netlify-hosted sites | Any framework |
| **imgix** | $100/mo minimum | Enterprise, real-time processing | Any framework |

**Recommendation for this project:** Build-time optimization with Sharp (free, no external dependency). This is what Astro, Eleventy, and SvelteKit all use. For a portfolio with ~50–100 images that change infrequently, build-time processing is the most cost-effective and simplest approach.

### Responsive Image Approach

```html
<!-- What the framework should generate automatically -->
<picture>
  <source type="image/avif" srcset="image-400.avif 400w, image-800.avif 800w, image-1200.avif 1200w" sizes="(max-width: 768px) 100vw, 50vw" />
  <source type="image/webp" srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w" sizes="(max-width: 768px) 100vw, 50vw" />
  <img src="image-800.jpg" alt="..." loading="lazy" width="800" height="600" />
</picture>
```

Both Astro `<Picture />` and 11ty `eleventy-img` generate this automatically.

### Lazy Loading Strategy

- **Native `loading="lazy"`** — sufficient for most cases, zero JS overhead, all modern browsers
- **Critical exception:** Never lazy-load the hero/LCP image — use `loading="eager"` or `fetchpriority="high"`
- **Intersection Observer** — only needed for triggering animations when images enter viewport

### Blur Placeholders (LQIP)

| Technique | Size | JS Required | Quality |
|-----------|------|-------------|---------|
| Base64 tiny JPEG (20×20px) | 100–500 bytes | No | Good |
| BlurHash | ~20–30 bytes | Yes (~2.5KB decoder) | Good |
| CSS gradient approximation | ~50–200 bytes | No | Moderate |
| Dominant color solid | ~10 bytes | No | Basic |

- **Next.js** handles this automatically with `placeholder="blur"`
- **Astro** requires `astro-lqip` community component or manual implementation

---

## 3. Hover Carousel — Animation Options

The design shows a row of project thumbnails that should slide/animate when the user hovers over the project card.

### Option 1: Motion (formerly Framer Motion) — Recommended

- **Bundle:** 2.6KB (mini) to 18KB (full), tree-shakeable
- **Performance:** 2.5x faster than GSAP at animating from unknown values, uses GPU-accelerated animations
- **Hover support:** First-class `whileHover` prop for declarative hover animations
- **React integration:** Best-in-class, declarative, component-based API
- **Carousel:** Official `<Carousel />` component released in 2025
- **License:** MIT, open source
- **Best for:** Astro (React island) or Next.js

### Option 2: Embla Carousel

- **Bundle:** ~6KB gzipped
- **Architecture:** Framework-agnostic, dependency-free, hooks-based
- **Hover support:** Can wire up `onMouseEnter`/`onMouseLeave` to trigger programmatic scrolling via API
- **Best for:** If you want a full-featured carousel with dots, navigation, loop, lazy loading built in

### Option 3: CSS-Only

- **Bundle:** 0KB JS
- **Approach:** `transform: translateX()` on `:hover` with `transition`
- **Performance:** Best possible (composited CSS animations on GPU)
- **Limitation:** Less control over easing, no spring physics, harder to achieve smooth continuous scroll
- **Best for:** Starting point — upgrade to Motion if more polish is needed

### Option 4: GSAP — Avoid

- **License:** Proprietary, owned by Webflow. Usage restrictions in competing tools. Can be terminated at Webflow's discretion.
- **Performance:** Excellent but Motion benchmarks faster for common patterns
- **React integration:** Imperative (requires refs, `useGSAP` hook). More verbose than Motion.
- **Recommendation:** Avoid for new React projects due to licensing concerns.

---

## 4. Hosting & Deployment

| Platform | Free Tier | Image Optimization | Best Paired With |
|----------|-----------|-------------------|-----------------|
| **Cloudflare Pages** | Unlimited bandwidth, 500 build min | Requires separate plan ($5/mo+) | Astro (post-acquisition) |
| **Vercel** | 100GB bandwidth, 6K build min, 5K image transforms | Built-in with next/image | Next.js |
| **Netlify** | 100GB bandwidth, 300 build min | Included (Image CDN) | Astro, 11ty, any static |

**For a low-traffic portfolio:**
- **Cloudflare Pages** — unlimited bandwidth on free tier, natural Astro pairing post-acquisition. Image optimization is build-time (free via Sharp), so no CDN cost needed.
- **Netlify** — easiest path, free image CDN included, simple deployment
- **Vercel** — best for Next.js, but cost and complexity harder to justify for static portfolio

---

## 5. Recommended Stack

### Primary Recommendation: Astro + Motion + Cloudflare Pages

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | **Astro 5/6** | Purpose-built for content sites, ships minimal JS, best performance scores, Cloudflare backing |
| **Image optimization** | **Build-time via Astro `<Picture />`** + Sharp | Free, automatic AVIF/WebP/JPEG with responsive `srcset`. No CDN cost. |
| **Blur placeholders** | **`astro-lqip`** or manual base64 | Fills Astro's only image gap |
| **Hover carousel** | **React island with Motion** `whileHover` | Only loads JS for the interactive carousel cards. Best DX and performance. |
| **Styling** | **Tailwind CSS** or vanilla CSS | Both work well with Astro. Tailwind for speed of development. |
| **Hosting** | **Cloudflare Pages** | Unlimited bandwidth free tier, natural Astro pairing post-acquisition |
| **Content** | **Markdown/MDX or Astro Content Collections** | Type-safe content management for project case studies |

**Why this stack:**
- Near-perfect Lighthouse scores out of the box
- Images are optimized at build time — zero cost, no external service dependency
- The hover carousel is an isolated React component that only loads JS when needed (~18KB)
- Unlimited free bandwidth on Cloudflare Pages
- Simple mental model: write HTML-like `.astro` files, drop in React components only where needed
- Content Collections give type-safe project data without a CMS

### Runner-up: Next.js + Vercel

Choose this if:
- You're already comfortable with React/Next.js
- You want the most polished image component (`next/image` with automatic blur placeholders)
- You're willing to accept higher JS overhead (~85KB vs ~8KB) and potential Vercel costs
- The 5K free image transforms/month should suffice for a low-traffic portfolio

### Lightweight Alternative: Eleventy + Vanilla JS

Choose this if:
- You prefer minimal tooling and a close-to-the-metal approach
- You don't need a component framework
- You're comfortable writing HTML templates (Nunjucks/Liquid)
- Excellent `@11ty/eleventy-img` plugin for image processing

---

## 6. Next Steps

1. **Choose a framework** — Astro recommended based on this research
2. **Set up the project** — `npm create astro@latest`
3. **Configure image pipeline** — Enable Astro responsive images, set up `<Picture />` component
4. **Build the hover carousel** — Create a React island with Motion
5. **Export images from Figma** — Export at 2x resolution, let the build pipeline generate all sizes
6. **Deploy** — Connect to Cloudflare Pages or Netlify via Git
