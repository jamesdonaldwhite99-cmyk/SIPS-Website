# Asset Optimisation — repeatable playbook

This is what we did on the Quick Built Systems repo to cut Fast Data Transfer,
written so you can paste it into the other three sites (Homes, Patio Kits,
Fencing). They were all built from the same template, so the steps line up.

**Do not touch** the lead forms, the autoresponder, or the `sales@` email flow.
None of the steps below go near them.

## Results on this repo

| Metric | Before | After |
|---|---|---|
| `/public` total | 459 MB | 124 MB |
| Images (JPEG, in place) | 194 MB | 119 MB (−74 MB) |
| PNGs (pngquant) | 63 MB | 16 MB (−47 MB) |
| Videos (ffmpeg re-encode) | 39 MB | 14 MB (−25 MB) |
| Orphaned video/images removed | — | 7 files, ~208 MB |
| `/photos` + `/pdfs` caching | `max-age=0` (re-fetched every visit) | `immutable`, 1 year |
| Homepage payload (full scroll) | ~76 MB | ~26 MB |

**Floor note:** the homepage still carries two autoplay videos (`qbs_hero.mp4`
~5 MB and `about-animation.mp4` ~4.4 MB). That ~9–10 MB is the hard floor for the
current design — to go lower you must shorten those clips or replace the
animation with a static image (a design decision, not an optimisation one).

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

## Steps 5 & 6 — PNG + video crush (need `pngquant` and `ffmpeg`)

These need two extra tools. This machine has no Homebrew and no admin password,
so we used **standalone binaries** (no install, no sudo):

```bash
# arm64 (Apple Silicon) ffmpeg:
curl -L -o ffmpeg.zip https://www.osxexperts.net/ffmpeg81arm.zip && unzip ffmpeg.zip
# pngquant (Mac):
curl -L -o pq.tar.bz2 https://pngquant.org/pngquant.tar.bz2 && tar xjf pq.tar.bz2
# let macOS run the downloaded binaries:
chmod +x ffmpeg pngquant/pngquant && xattr -dr com.apple.quarantine ffmpeg pngquant/pngquant
```
(If Homebrew *is* available on a machine, `brew install ffmpeg pngquant` is simpler.)

### 5. PNGs — pngquant (keeps `.png` name + transparency, no reference changes)
```bash
find public/photos -iname '*.png' -type f -size +300k -print0 \
  | while IFS= read -r -d '' f; do
      pngquant --quality=65-88 --skip-if-larger --force --strip --ext .png "$f"
    done
```

### 6. Videos — ffmpeg re-encode (drops audio, keeps filename)
Background videos (under an overlay) can go harder; visible/animation content
should stay sharper. Only the file is replaced if the result is smaller:
```bash
# background hero, hard: scale 1280, crf 30
ffmpeg -i public/photos/qbs_hero.mp4 -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an -movflags +faststart out.mp4 \
  && mv out.mp4 public/photos/qbs_hero.mp4
# visible animation, keep sharper: scale 1440, crf 30
ffmpeg -i public/photos/about-animation.mp4 -vf "scale='min(1440,iw)':-2" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an -movflags +faststart out.mp4 \
  && mv out.mp4 public/photos/about-animation.mp4
```
(`-an` drops audio, which a muted autoplay video doesn't need. Bump `-crf` to
32–34 for smaller/lower quality, drop to 26–28 for higher quality.)

Re-run `npm run build`, spot-check the homepage/product/gallery, commit, sync.

---

## Bot blocking (bandwidth + scraper protection)

Two layers, applied identically on all four sites. Blocks AI scrapers and
aggressive SEO crawlers; leaves Googlebot, Bingbot, facebookexternalhit and real
browsers fully working. Neither layer touches `/api` (lead forms, autoresponder,
`sales@` flow).

Blocked list: `GPTBot, ClaudeBot, CCBot, Bytespider, AhrefsBot, SemrushBot,
MJ12bot, DotBot, PetalBot, DataForSeoBot`.

**1. `app/robots.ts`** — a first rule disallows the blocked bots; the existing
`*` rule (allow `/` plus each site's own disallows) and the sitemap/host stay
intact. This is the polite layer (well-behaved bots obey it).

**2. `middleware.ts`** (repo root) — the enforced layer, since the worst crawlers
ignore robots.txt. Returns `403` when the request's User-Agent matches the list:
```ts
const BLOCKED = /(GPTBot|ClaudeBot|CCBot|Bytespider|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|DataForSeoBot)/i;
export function middleware(req) {
  if (BLOCKED.test(req.headers.get("user-agent") || "")) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!api/|_next/|favicon.ico).*)"] };
```
The `matcher` excludes `/api` so form posts are never screened. The regex can't
match Googlebot / Bingbot / facebookexternalhit (none contain those tokens).

Portable: `middleware.ts` is identical on all four sites; `robots.ts` differs only
by each site's domain and its existing disallow list.

---

## Automatic compression on upload (GitHub Action)

`.github/workflows/compress-media.yml` compresses new media on every push to
`main` (including Decap CMS uploads) via `scripts/compress-media.sh`, then commits
the smaller files back. Requires the repo's **Settings → Actions → General →
Workflow permissions → "Read and write permissions"**.

The commit-back step is hardened so it can't fail or spam empty commits:
- `git config core.fileMode false` — ignores permission-bit-only changes, so a run
  where nothing actually shrank is a true no-op (no "N files changed, 0 insertions,
  0 deletions" commit).
- Skips the commit entirely when `git diff --cached --quiet` reports no real change.
- `git pull --rebase origin <branch>` before pushing, so if `main` moved since
  checkout (another CMS save) the push isn't rejected as non-fast-forward. If the
  rebase can't apply cleanly, it aborts and skips the push (the next upload retries)
  rather than failing the run.
