# CLAUDE.md — Cedarwind Solutions Site

This file provides AI assistants with context about the Cedarwind Solutions website
repository so they can contribute effectively without needing to re-discover project
structure on every session.

---

## Project Overview

**Cedarwind Solutions** is a property management company operating in the Greater
Boston, MA area. This repository contains their single-page marketing website served
at `www.cedarwind.org` via GitHub Pages.

The site showcases services, a property portfolio, client testimonials, and a contact
form. It is intentionally built with no framework or build tooling — just HTML, inline
CSS, and vanilla JavaScript.

---

## Repository Layout

```
Cedarwind-site/
├── CNAME                   # GitHub Pages custom domain (www.cedarwind.org)
├── CLAUDE.md               # This file
├── index.html              # Entire website — ~760 lines of HTML/CSS/JS
├── logo.png                # Brand logo (1536×1024 PNG, ~1.8 MB)
└── portfolio-58-mary.jpg   # Portfolio hero image (1024×683 JPG, ~469 KB)
```

Everything is in `index.html`. There are no subdirectories, no compiled output, and
no separate asset pipeline.

---

## Technology Stack

| Layer          | Technology                      | How included    |
|----------------|---------------------------------|-----------------|
| CSS framework  | Tailwind CSS v3                 | CDN script tag  |
| Fonts          | Google Fonts (Inter + DM Serif) | CDN link tags   |
| JavaScript     | Vanilla ES6+                    | Inline `<script>`|
| Hosting        | GitHub Pages                    | Root of repo    |
| Custom domain  | CNAME file                      | `www.cedarwind.org` |

No npm, no yarn, no bundlers, no transpilers, no TypeScript, no test framework.

---

## Page Sections (in document order)

1. **Navigation** — Fixed header; transparent on load, white + blur on scroll (`#site-nav.scrolled`). Hamburger menu on mobile.
2. **Hero** — Animated gradient background (`.hero-bg`), floating blobs (`.blob`), headline + two CTAs.
3. **Stats Bar** — Four key metrics: 50+ Properties, 98% Satisfaction, 30% OPEX Reduction, 5+ Years.
4. **Approach** — Three pillars: Data-Driven, Tenant-First, Sustainable.
5. **Portfolio** — Featured property (58 Mary St, Arlington MA) with overlay image card.
6. **Services** — Four cards: Leasing & Marketing, Maintenance & Inspections, Financial Reporting, Risk & Compliance.
7. **Testimonials** — Three client quotes with attribution.
8. **CTA Banner** — Full-width call-to-action with gradient background.
9. **Contact** — Two-column layout: contact form left, business info right.
10. **Footer** — Logo, nav links, contact details, copyright.

---

## CSS Conventions

### CSS Custom Properties (theme tokens)

Defined at `:root` in the `<style>` block:

```css
--navy:       #1e3a8a   /* primary brand navy */
--navy-dark:  #0f2460   /* darker navy for depth */
--cedar:      #065f46   /* green accent (brand name) */
--amber:      #f59e0b   /* gold/amber highlight */
```

Always use these variables for brand colors instead of hardcoded hex values.

### Custom Utility Classes

These classes are defined in the `<style>` block and extend Tailwind:

| Class                | Purpose                                          |
|----------------------|--------------------------------------------------|
| `.hero-bg`           | Animated gradient background for hero section    |
| `.blob`              | Floating blurred circle decoration              |
| `.font-display`      | DM Serif Display (serif headings)               |
| `.text-amber-gradient` | Amber gradient text effect                    |
| `.text-navy-gradient`  | Navy-to-blue gradient text effect             |
| `.section-badge`     | Small uppercase label above section headings    |
| `.card-lift`         | Hover lift animation for cards                  |
| `.icon-box`          | Square icon container (58×58px, 16px radius)    |
| `.icon-navy/cedar/amber/blue` | Icon box color variants               |
| `.btn-gold`          | Primary CTA button (amber gradient, pill shape) |
| `.btn-ghost-white`   | Secondary ghost button for dark backgrounds     |
| `.form-field`        | Styled form input/textarea                      |
| `.footer-link`       | Gray link that turns white on hover             |
| `.reveal`            | Element hidden until scroll-triggered visible   |
| `.reveal.visible`    | Reveal complete state (opacity 1, no translate) |
| `.portfolio-overlay` | Dark gradient overlay on portfolio image        |
| `.quote-mark`        | Large decorative quotation mark                 |

### Responsive Breakpoints

Tailwind's mobile-first breakpoints apply:
- `sm:` — 640px+
- `md:` — 768px+
- `lg:` — 1024px+
- `xl:` — 1280px+

Layout shifts from single-column (mobile) to multi-column (desktop) at `md:` or `lg:`.

### Section Separator Comments

Sections in HTML are separated by prominent comment banners:

```html
<!-- ========== SECTION_NAME ========== -->
```

Always add a matching comment when inserting a new section.

---

## JavaScript Conventions

All JavaScript is in a single `<script>` tag at the bottom of `<body>`.

### Scroll-aware navigation

```js
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
```

The `scrolled` class switches the nav from transparent to white/blurred.

### Mobile menu toggle

```js
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden', !open);
  iconClose.classList.toggle('hidden', open);
});
```

### Scroll-reveal animation

Uses `IntersectionObserver` to add `.visible` to `.reveal` elements when they enter
the viewport:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

Add `.reveal` to any element you want to animate in on scroll. The CSS transition
handles the opacity/transform.

### Contact form

The form currently has `id="contactForm"` and submits via a `submit` event listener.
Check the bottom of `index.html` for the handler — update it if the form backend
changes (currently likely a no-op or third-party service endpoint).

---

## Development Workflow

### Prerequisites

None. No package manager or build step is required.

### Local development

1. Clone the repository.
2. Open `index.html` in a browser, **or** serve it with any static HTTP server:
   ```bash
   python3 -m http.server 8080
   # then open http://localhost:8080
   ```
3. Edit `index.html` and refresh.

### Deployment

Push to the `master` branch. GitHub Pages automatically serves the root of the
repository at `www.cedarwind.org`.

There is no build step, CI pipeline, or staging environment. Changes go live as
soon as GitHub Pages picks up the push (typically within seconds to a few minutes).

### Branch conventions

- `master` — production; what GitHub Pages serves.
- `main` — mirrors master (legacy alias).
- Feature branches follow the pattern `claude/<description>-<id>` for AI-assisted
  work.

---

## Making Changes

### Adding a new section

1. Copy the structure of an existing section as a starting point.
2. Add the section comment banner: `<!-- ========== NEW_SECTION ========== -->`.
3. Use existing CSS custom properties for colors.
4. Add `.reveal` to cards/headings you want to animate in on scroll.
5. Add a navigation anchor link if the section should be reachable from the nav.

### Changing brand colors

Update the CSS variables in `:root` inside the `<style>` block. Do **not** scatter
hardcoded color hex values throughout the HTML — use the variables or Tailwind
color classes instead.

### Adding images

Place image files in the repository root alongside `index.html`. Reference them with
relative paths: `src="my-image.jpg"`. Prefer JPG for photos and PNG for logos/icons
with transparency. Optimize images before committing — the existing `logo.png` at
~1.8 MB is already on the large side.

### Updating copy / content

All text content is in `index.html`. Search for the relevant text string and edit in
place. No CMS or data layer is involved.

---

## Key Constraints and Gotchas

- **Single file.** All HTML, CSS, and JS live in `index.html`. Keep it that way unless
  there is a compelling reason to split — splitting would require a local server or
  bundler that does not currently exist.
- **Tailwind via CDN.** The CDN build includes all Tailwind utilities. Do not add a
  `tailwind.config.js` or PostCSS pipeline unless you also introduce a proper build
  process. Purging is not available with the CDN approach.
- **No JavaScript framework.** Avoid introducing React, Vue, or similar. Keep
  interactivity in plain JavaScript.
- **No npm.** Do not add a `package.json` unless a new dependency truly cannot be
  loaded from CDN and warrants a build step.
- **Images in repo root.** GitHub Pages serves files from the repository root; there
  is no `/public` or `/dist` directory.
- **No `.gitignore`.** The repo has no `.gitignore`. Be careful not to commit editor
  temp files, OS metadata (`.DS_Store`), or secrets.

---

## Asset Reference

| File                     | Dimensions   | Size    | Usage                        |
|--------------------------|--------------|---------|------------------------------|
| `logo.png`               | 1536×1024 px | ~1.8 MB | Nav + footer logo            |
| `portfolio-58-mary.jpg`  | 1024×683 px  | ~469 KB | Portfolio section hero image |

---

## Contact Form Notes

The contact section (`id="contact"`) collects: Name, Email, Phone, Property Type,
and Message. Verify any backend integration (form action, API endpoint, or third-party
service like Formspree/Netlify Forms) before making the form live, as none is
configured in the current markup.
