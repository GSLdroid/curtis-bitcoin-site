# Curtis Bitcoin Corporation

Static website for Canadian Bitcoin education: **Get Off Zero** for individuals, plus a first version of **Bitcoin for businesses**.

Live site: `https://curtisbitcoin.ca` (GitHub Pages). Preview while DNS settles: `https://GSLdroid.github.io/curtis-bitcoin-site/`

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

Public name on the pages: **Curtis Bitcoin Corporation**. Contact email and X handle still use the existing Giant Steps accounts until you replace them. Shakepay referral is unchanged.

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

## Custom domain: curtisbitcoin.ca

GitHub Pages on this repo is set to **curtisbitcoin.ca**. `giantstepslearning.com` stays on the old user site.

### GoDaddy DNS (website records only)

Do **not** delete MX or Microsoft 365 TXT records — those are email.

1. GoDaddy → **My Products** → **curtisbitcoin.ca** → **DNS**.
2. Turn **off** Domain Forwarding / parking if it is on.
3. **A records** for `@` — delete the two parking IPs (`13.248.243.5` and `76.223.105.230`) and add:

| Type | Name | Value | TTL |
|------|------|--------|-----|
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |

4. **WWW** — edit the existing CNAME (currently points at `curtisbitcoin.ca`):

| Type | Name | Value | TTL |
|------|------|--------|-----|
| CNAME | `www` | `GSLdroid.github.io` | 600 |

Optional IPv6 (AAAA) for `@`:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

Keep:

- MX → `curtisbitcoin-ca.mail.protection.outlook.com`
- TXT Microsoft 365 (`NETORG21059212.onmicrosoft.com`)
- SPF TXT (update later if Outlook mail needs `include:spf.protection.outlook.com`)

DNS can take a few minutes to a few hours. Then GitHub issues HTTPS. Enforce HTTPS in **Settings → Pages** after the certificate shows as ready.

## Editing content

- Colours and type: `css/styles.css` (`:root` and `[data-theme="dark"]`)
- Nav / footer: copied on each HTML page (small site; search-and-replace is fine)
- Shakepay referral: `https://shakepay.me/r/VNRET3X` (already disclosed in copy)

## Disclaimer

Educational information only — not financial, legal, or tax advice.
