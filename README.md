# Vishnuraj KJ — Portfolio Website

Personal portfolio website for **Vishnuraj KJ**, Senior UI/UX Designer based in Kochi, India. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

## Overview

A multi-page portfolio showcasing 5+ years of UI/UX design work across SaaS, enterprise, health tech, e-commerce, and AI-powered products. Features a dark-themed design with custom animations, a custom cursor, page loader, and smooth scroll interactions.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, projects grid, skills, experience, education, contact |
| `about.html` | About — bio, services, skills, experience, values, contact CTA |
| `project-detail.html` | Dynamic project detail page, driven by URL query param (`?id=`) |

## Project Structure

```
vishnu/
├── index.html              # Homepage
├── styles.css              # Global styles
├── script.js               # Homepage interactions & animations
├── about.html              # About page
├── about.css               # About page styles
├── about.js                # About page scripts
├── project-detail.html     # Project detail template
├── project-detail.css      # (if separate)
├── project-detail.js       # Loads project data by URL ?id=
├── projects/
│   ├── data.js             # Single source of truth for all project data
│   ├── cover-images/       # Card thumbnail images (used on homepage grid)
│   └── *.jpg / *.png       # Full-size project images (used on detail page)
└── ui design/
    ├── logo-vj.png         # Site logo / favicon
    ├── Banner.png          # Hero photo
    ├── Banner-bg.jpg       # About page photo
    ├── vishnuraj-hero.jpg  # Hero image variant
    └── Vishnuraj_KJ_CV_2026.pdf  # Downloadable resume
```

## Featured Projects

- **Hotel Booking** — End-to-end UX case study (Hospitality · Travel)
- **Ovia** — Health and wellness product design (Health · Wellness)
- **Pemmin Task** — Task management SaaS (Productivity · SaaS)
- **SKS Website** — Corporate website redesign (Corporate · Branding)
- **Web 1920 — I & II** — Full-scale web UI design series

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, animations, responsive grid/flexbox
- **Vanilla JavaScript** — no dependencies
- **Google Fonts** — Space Mono
- **No build step** — open `index.html` directly in a browser

## Running Locally

No installation needed. Just open `index.html` in any modern browser:

```bash
# Option 1 — open directly
start index.html

# Option 2 — use a local server (recommended to avoid CORS on local assets)
npx serve .
# or
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Adding a New Project

All project data lives in `projects/data.js` — it is the **single source of truth** for both the homepage grid and the detail page. No HTML changes needed anywhere.

**Step 1** — Drop your images into `projects/cover-images/` (card thumbnail) and `projects/` (full-size detail images).

**Step 2** — Add a new entry to the `PROJECTS` array in `projects/data.js`:

```js
{
  id: 'your-project-id',       // used in URL: project-detail.html?id=your-project-id
  title: 'Project Title',
  subtitle: 'Project Type',
  chip: 'Category · Domain',
  image: 'projects/cover-images/your-thumb.jpg',  // card cover image
  images: [                                        // full-size images for detail page
    'projects/your-full-image-1.jpg',
    'projects/your-full-image-2.jpg'
  ],
  color: 'wcp-blue',           // wcp-blue | wcp-green | wcp-purple | wcp-orange | wcp-teal | wcp-pink
  tags: ['Tag1', 'Tag2'],
  desc: 'Short description shown on the project card.',
  overview: 'Longer overview shown on the detail page.',
  role: 'Your Role',
  duration: 'X Weeks',
  platform: 'Web / Mobile / etc.',
  process: [
    { phase: 'Phase Name', detail: 'What happened in this phase.' }
  ],
  behanceUrl: 'https://behance.net/yourprofile'
}
```

**Step 3** — Save the file. The homepage card and the detail page are both live automatically.

## Contact

- **Email:** vishnurajkj001@gmail.com
- **LinkedIn:** [linkedin.com/in/vishnuraj-k-j-28051b1a0](https://www.linkedin.com/in/vishnuraj-k-j-28051b1a0)
- **Behance:** [behance.net/vishnurajkj](https://behance.net/vishnurajkj)

---

&copy; Vishnuraj KJ 2026 — All rights reserved
