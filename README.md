# valuewithvelocity.com

The Mind — VWV's editorial / thought-leadership surface.

**Stack:** Vite · React 19 · TypeScript · Tailwind v4 · GSAP · GSAP ScrollTrigger

## Run locally

```bash
cd site
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

The `vercel.json` in this directory configures the project. From `/site`:

```bash
npx vercel              # preview deploy
npx vercel --prod       # production deploy to valuewithvelocity.com
```

Then attach the `valuewithvelocity.com` apex + `www` domain in the Vercel project settings.

## Architecture

```
site/
├── public/              # Brand assets (favicon, og, lockup, velocity-field)
├── src/
│   ├── components/      # Nav, Footer, VMark
│   ├── sections/        # Hero, Thesis, Principles, Marquee, Dispatches, Cta
│   ├── hooks/           # useTheme (light/dark)
│   ├── lib/             # gsap.ts (ScrollTrigger registration)
│   ├── index.css        # Tailwind v4 + @theme tokens (Bone / Carbon / Cobalt)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── vercel.json
```

## Brand tokens

Tokens live in `src/index.css` under `@theme`:

- **Bone** — warm off-white canvas (`--color-canvas` = #F5F4EF)
- **Carbon** — near-black ink / dark canvas (#0A0A0B)
- **Cobalt** — signature accent, rare punctuation (#2563EB)
- **Velocity orange** — retained as `velocity-*` for "hot" moments (#FF5722)

Typography is loaded from Google Fonts in `index.html`:
- **Geist** — display
- **Inter** — body
- **Geist Mono** — eyebrows + metrics

## Motion philosophy

- GSAP timelines drive intros and scroll-scrubbed reveals.
- Animations honor `prefers-reduced-motion`.
- `expo.out` is the default ease — it matches VWV's `--ease-out` token.
