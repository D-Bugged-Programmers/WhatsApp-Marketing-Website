# PingReach marketing website

React + Vite (JavaScript/JSX) + Tailwind CSS v4 + React Router + Motion + Lucide.

    npm install
    npm run dev       # http://localhost:5173
    npm run build && npm run preview

Edit brand name, CTA destinations and placeholder contact/legal details in `src/config/site.js`.
Set `VITE_SITE_URL` (see `.env.example`) and update `public/sitemap.xml` / `public/robots.txt` once the real domain is known.
The contact form (`src/lib/contactService.js`) is a demo; connect a real backend there.
