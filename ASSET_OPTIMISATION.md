# Asset Optimisation — repeatable playbook

This is what we did on the Quick Built Systems repo to cut Fast Data Transfer,
written so you can paste it into the other three sites (Homes, Patio Kits,
Fencing). They were all built from the same template, so the steps line up.

**Do not touch** the lead forms, the autoresponder, or the `sales@` email flow.
None of the steps below go near them.

## Results on this repo

| Metric | Before | After |
|---|---|---|
| `/public` total | 459 MB | 195 MB |
| Images (>200 KB set) | 194 MB | 119 MB (−74 MB) |
| Orphaned video/images removed | — | 7 files, ~208 MB |
| `/photos` + `/pdfs` caching | `max-age=0` (re-fetched every visit) | `immutable`, 1 year |
| Homepage payload (full scroll) | ~76 MB | ~54 MB* |

\* The remaining homepage weight is two autoplay videos (~28 MB) and two
photographic PNGs (~10 MB). Crushing those needs `ffmpeg` / `pngquant` — see
"Optional extra wins" at the bottom. Everything above that line needs no installs.

---

## The four steps (do these on each site)

### 1. Shrink oversized images (in place, same filenames)
Copy `scripts/optimise-images.sh` into the repo, then run it:

```bash
bash scripts/optimise-images.sh public/photos
```

What it does: resamples anything wider/taller than **2048 px** down to 2048, and
re-encodes JPEGs at **quality 80**. Filenames and formats stay the same, so **no
code or JSON references change** and the page renders identically. Uses macOS
`sips` (built in) — no installs. Originals stay recoverable in git history.

After it runs, spot-check the homepage, a product page, and the gallery in the
browser before committing.

### 2. Add long-lived caching for static media
In `next.config.mjs`, add a `headers()` block (alongside the existing
`images` / `redirects`):

```js
async headers() {
  return [
    {
      source: '/photos/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/pdfs/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ];
},
```

This stops browsers and the Vercel CDN re-downloading images/PDFs on repeat
views — the single biggest lever for repeat and multi-page traffic.

> **IMPORTANT caveat:** `immutable` means a cached visitor keeps a file for up to
> a year. Filenames under `/photos` and `/pdfs` are stable, so this is safe — but
> if you ever **change** an image, give it a **new filename** (e.g.
> `hero-v2.jpg`) and update the reference, or returning visitors will keep seeing
> the old one. Never overwrite a live image with the same name.

If a site keeps heavy static media in folders other than `/photos` and `/pdfs`,
add a matching block for those folders.

### 3. Keep bots out of the heavy PDFs
In `app/robots.ts`, add a `disallow` to the rules:

```ts
rules: {
  userAgent: "*",
  allow: "/",
  disallow: "/pdfs/",
},
```

Stops crawlers pulling the brochure PDFs (tens of MB) that don't need indexing.
Images under `/photos` stay crawlable for image SEO. Reversible any time.

### 4. Delete orphaned media
Find large video/image files in `/public` that nothing references, then remove
them. To confirm a file is unused before deleting (replace the filename):

```bash
grep -rIn --exclude-dir=node_modules --exclude-dir=.next -F "FILENAME.mov" app components content lib
```

`0` results = safe to delete with `git rm -f "public/photos/FILENAME.mov"`.
On this site the orphans were old hero videos and duplicate animation exports
(`.mov` re-exports, `QuickBuilt_Animation` and `villa-construction` dupes). Each
site will have its own leftovers — check for `.mov` files and `-xxxxxxxx`
hash-suffixed duplicates first; they're usually the biggest.

### Then: build and deploy
```bash
npm run build     # must pass clean
```
Commit, then **Sync** the repo in VS Code so Vercel redeploys.

---

## What is portable vs site-specific

- **Paste as-is:** the `scripts/optimise-images.sh` file, the `headers()` block,
  the `robots.ts` disallow.
- **Same method, different files:** which orphans to delete and which videos to
  re-encode — each site has its own asset set.

---

## Optional extra wins (need a one-time tool install)

These weren't done here because the tools aren't installed on the machine. They
target the last heavy items (photographic PNGs and autoplay videos).

Install once (Homebrew):
```bash
brew install pngquant ffmpeg
```

**PNGs** — crush photographic PNGs losslessly-ish, keeping the `.png` name (so no
references change) and preserving transparency:
```bash
find public/photos -iname '*.png' -size +500k -exec pngquant --force --quality=65-85 --skip-if-larger --ext .png {} +
```

**Videos** — re-encode oversized autoplay videos (e.g. `about-animation.mp4`,
~18 MB) to ~3-5 MB with no visible loss, keeping the same filename:
```bash
ffmpeg -i public/photos/about-animation.mp4 -vf "scale='min(1920,iw)':-2" \
  -c:v libx264 -crf 26 -preset slow -an -movflags +faststart out.mp4 \
  && mv out.mp4 public/photos/about-animation.mp4
```
(`-an` drops the audio track, which a muted background video doesn't need.)

Re-run `npm run build`, spot-check, commit, sync.
