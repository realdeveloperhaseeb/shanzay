# Shanza Akhtar — Landing Page

Personal landing page for **Shanza Akhtar**, CGI & UGC Ad Video Creator for brands.

Built with plain **HTML, CSS & JavaScript** — no build step. Fully responsive and fast-loading.

## Features
- Hero with profile photo, CGI/UGC badges and WhatsApp CTA
- Services cards, About tabs, reviews carousel (swipe + autoplay), FAQ accordion
- Floating WhatsApp button
- Contact details assembled at runtime to deter scrapers
- Outfit font, original inline SVG icons

## Structure
```
index.html    # markup & content
styles.css    # yellow / black / green theme + responsive
script.js     # nav, tabs, carousel, accordion, contact wiring
shanzay.jpeg  # hero image
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 8000
```

## Deploy
Static site — deploys on **Vercel** as-is (no framework, no build command). Output directory: project root.
