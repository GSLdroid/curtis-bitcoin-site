# Giant Steps Learning

Static website for Canadian Bitcoin education: **Get Off Zero** for individuals, plus a first version of **Bitcoin for businesses**.

Live site (after GitHub Pages is on): `https://GSLdroid.github.io/curtis-bitcoin-site/`

Existing production site at [giantstepslearning.com](https://giantstepslearning.com) is **not** replaced by this repo until you point DNS here on purpose.

## Stack

- Plain HTML, CSS, and a little JavaScript
- GitHub Pages (free, HTTPS, no server to patch)
- CoinGecko API for the optional CAD/USD price ticker

No build step. Edit files, commit, push.

## Local preview

```bash
cd curtis-bitcoin-site
python3 -m http.server 8080
```

Open <http://127.0.0.1:8080/>

## Brand

Working public name on the pages: **Giant Steps Learning**. Easy to change later (header, footer, `<title>`, and this README). SuperGrok used “Curtis Bitcoin” as a placeholder; this starter keeps the live brand, email, X account, and Shakepay referral you already use.

## Repo layout

```
index.html          Home
css/styles.css      Design system (light + dark)
js/site.js          Theme, mobile nav, price ticker
pages/              Learn, businesses, resources, about, contact, privacy, terms
images/             Favicon, Shakepay QR, Bitcoin mark
assets/             Extra files later (PDFs, etc.)
404.html            GitHub Pages not-found page
```

## Enable GitHub Pages

1. Repo **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Save. Wait a minute. Visit `https://GSLdroid.github.io/curtis-bitcoin-site/`.

Or with GitHub CLI:

```bash
gh api -X POST repos/GSLdroid/curtis-bitcoin-site/pages \
  -H "Accept: application/vnd.github+json" \
  -f "build_type=legacy" \
  --raw-field source='{"branch":"main","path":"/"}'
```

If that API call says Pages already exists, use **Settings → Pages** in the browser.

## Custom domain (GoDaddy)

You can either:

- **A.** Keep `giantstepslearning.com` on the current `GSLdroid.github.io` user site (today’s live site), and use a **new** domain for this project, or
- **B.** Repoint `giantstepslearning.com` at **this** repo when you are ready to replace the live site.

Do not attach the same domain to two GitHub Pages sites at once.

### 1. Add a `CNAME` file in this repo (project root)

```
giantstepslearning.com
```

(or your new domain). Commit and push.

### 2. GitHub → Settings → Pages → Custom domain

Enter the domain, save, and wait for DNS check. Turn on **Enforce HTTPS** after the certificate is ready (can take up to an hour).

### 3. GoDaddy DNS records

**Apex domain** (`giantstepslearning.com`) — A records to GitHub Pages:

| Type | Name | Value | TTL |
|------|------|--------|-----|
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |

**WWW** — CNAME:

| Type | Name | Value | TTL |
|------|------|--------|-----|
| CNAME | `www` | `GSLdroid.github.io` | 600 |

Optional IPv6 (AAAA) for the apex:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

Remove old A / CNAME / forwarding records that still point at the previous host so they do not fight these.

If you keep the old site live, **do not** change GoDaddy until you intend to cut over.

## Editing content

- Colours and type: `css/styles.css` (`:root` and `[data-theme="dark"]`)
- Nav / footer: copied on each HTML page (small site; search-and-replace is fine)
- Shakepay referral: `https://shakepay.me/r/VNRET3X` (already disclosed in copy)

## Disclaimer

Educational information only — not financial, legal, or tax advice.
