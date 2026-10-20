# ngochuy13.github.io

Personal profile page of **Pham Ngoc Huy (Jacob)**, Frontend Lead · AI Engineering Lead.

**Live:** https://ngochuy13.github.io

A single page built with plain HTML, CSS and a little vanilla JS. There is no framework, no build step and nothing to install. GitHub Pages serves the files as they are.

## Structure

```
.
├── index.html          # All content: hero, stats, work, lab, experience, stack, contact
├── css/
│   ├── tokens.css      # Design tokens: colors, gradient, glass, radii, fonts, easing
│   ├── base.css        # Reset, aurora background, floating nav, footer
│   ├── components.css  # Glass surface, buttons, cards + spotlight, chips, reveal
│   └── sections.css    # Section layouts + responsive breakpoints (960px / 640px)
├── js/
│   └── main.js         # Scroll reveal, count-up stats, card spotlight, copy-email
└── assets/
    └── avatar.jpg      # Avatar, favicon and og:image
```

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# or
pnpm dlx serve .
```

Then open http://localhost:8000. You can also open `index.html` directly in a browser, since every path is relative.

## Editing content

All copy lives in `index.html`, one `<section>` per block:

| Section | Anchor | Notes |
|---|---|---|
| Hero | `#top` | Name, title badge, intro paragraph, buttons |
| Stats | — | `data-count`, `data-prefix` and `data-suffix` drive the count-up animation |
| Flagship work | `#work` | Bento grid. Add `span-2` to a card to make it two columns wide |
| Lab | `#lab` | Side projects. Private repos are described without links. `lab-feature` is the 2×2 card and `span-full` fills a whole row |
| Experience | `#experience` | `<ol class="timeline">`, one `<li>` per role |
| Stack | `#stack` | One card of chips per area |
| Contact | `#contact` | The `data-copy` button copies the email to the clipboard (and falls back to `mailto:`) |

To restyle the page, change `css/tokens.css` first. The accent gradient (`--amber` → `--coral` → `--violet`), the glass values and the fonts are all defined there.

### Animation hooks

- Give an element the `reveal` class to make it blur-fade in when it scrolls into view.
- Give a card the `spot` class to add the cursor-following highlight.
- Everything still renders without JS, and all motion is disabled when the visitor has `prefers-reduced-motion` turned on.

## Deploy

Pushing to `main` deploys the site. GitHub Pages builds from the repo root and the change goes live in about a minute.

```bash
git add -A && git commit -m "Update profile" && git push
```

Browsers cache the CSS and JS. When you change them, bump the `?v=` query on the `<link>` and `<script>` tags in `index.html` so returning visitors get the new files.

## Credits

The layout was inspired by [rux001.github.io](https://rux001.github.io/). Fonts are [Geist](https://vercel.com/font) and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), loaded from Google Fonts.
