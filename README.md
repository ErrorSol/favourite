# Birthday Surprise 🎂

A mobile-first, step-by-step interactive birthday experience built with Next.js, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

| What | File |
|------|------|
| Password, messages, quotes | `src/data/content.ts` |
| Memory images | Replace files in `public/memories/` or update `MEMORIES` in content.ts |
| Background music | Add `public/music/soft-instrumental.mp3` |

**Password:** `favourite`

## Deploy to Vercel

```bash
npm run build
```

Push to GitHub and import the repo in [Vercel](https://vercel.com).

## Flow (10 steps)

1. Password → 2. Identity → 3. Gift → 4. Intro → 5. Memory slides → 6. Fun quiz → 7. Chat + timeline → 8. Secret button → 9. Final message → 10. Ending + replay

No page scrolling — one full-screen step at a time.
