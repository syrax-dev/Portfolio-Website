# SYRAX — Nayan Patel Portfolio

A minimal, editorial, black-and-purple developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, and React Router. All professional content (skills, experience, education, certifications, project links) is sourced from the attached resume.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Structure

```
src/
|-- components/   Navbar, Footer, PageTransition, TechStack, ArchCockpit, ProjectSection, Cta, Reveal
|-- pages/        Home, Work, Resume, Contact, NotFound
|-- data/         profile.js, skills.js, experience.js, education.js, projects.js
|-- App.jsx       Routing, page transitions, per-page SEO meta
`-- main.jsx
```

Content lives in `src/data/` -- edit those files to update copy, links, skills, or projects without touching components.

## Deploying

The build output in `dist/` is static and can be hosted anywhere (Vercel, Netlify, Render, Cloudflare Pages, GitHub Pages).

- A Netlify-style `_redirects` file is included in `public/` for SPA client-side routing. If you deploy to Vercel, add a rewrite rule (`vercel.json`) sending all paths to `/index.html` instead.
- `public/robots.txt` and `public/sitemap.xml` reference `https://syraxdev.vercel.app/`

## Contact form

`src/pages/Contact.jsx` validates client-side (required fields, email format) and shows loading/success/error states, but the actual submission (`submitContactForm`) is a stub with a `TODO`. Wire it up to Resend, Formspree, EmailJS, or your own API route before going live.

## Known gaps from the source resume

- No Instagram link was present in the resume, so it isn't included in the footer/contact links. Add it in `src/data/profile.js` if you want it.
- The RNP (Rashtriya Nivara Parishad) project on the Work page isn't in the resume -- it's included based on prior context about that work, with no fabricated link. Remove it from `src/data/projects.js` if it shouldn't be public, or add a real link if there is one.
