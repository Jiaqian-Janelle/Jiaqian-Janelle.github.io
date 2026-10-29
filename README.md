# Personal Site

A clean academic-style personal site built with **Jekyll**, ready for **GitHub Pages**.
Single-page homepage (About · Paper Reading · Publications · Writing · Experience ·
Education), plus a blog and a daily **paper-reading log**.

---

## 1. Make it yours

Most personalisation lives in plain config and data files — no HTML needed.

| What | File to edit |
|------|--------------|
| Name, tagline, bio, affiliation, photo | `_config.yml` |
| Social / contact links | `_data/social.yml` |
| Publications | `_data/publications.yml` |
| Education | `_data/education.yml` |
| Experience / internships | `_data/experience.yml` |
| Profile photo | put a square image in `assets/images/` and set `avatar:` in `_config.yml` |

> If you don't add a photo, your initial is shown in a circle as a placeholder.

---

## 2. Add a blog post

Create `_posts/YYYY-MM-DD-title.md`:

```markdown
---
title: "My Post Title"
date: 2026-06-25
---

Write in Markdown here.
```

---

## 3. Log a paper you read (the daily section)

Create one file per paper in `_papers/`, named `YYYY-MM-DD-short-name.md`:

```markdown
---
title: "Paper Title"
date: 2026-06-25
authors: "Author et al."
venue: "ICML 2025"
link: "https://arxiv.org/abs/xxxx.xxxxx"
rating: 4                       # 1–5 stars (optional)
tags: [llm, evaluation]         # any tags you like (optional)
gist: "One sentence on why it mattered."   # shown in the list (optional)
---

## Notes

Your reading notes in Markdown.
```

Newest entries automatically appear first on the homepage and on `/papers/`.
Only `title` and `date` are required; everything else is optional.

---

## 4. Run it locally (optional)

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

---

## 5. Deploy to GitHub Pages

1. Create a repo. For a site at `https://USERNAME.github.io`, name it
   `USERNAME.github.io` and leave `baseurl` empty in `_config.yml`.
   For a project page (`USERNAME.github.io/REPO`), set `baseurl: "/REPO"`.
2. Push these files to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `/ (root)`, save.
4. Wait a minute; your site builds automatically. It rebuilds on every push.

That's the whole loop: write Markdown → commit → push.

---

## Market Lab (`/lab/`)

The **Market Lab** page (`lab/index.html`, a dark market-list app: Market · Research · Paper accounts · Ops) and the homepage "Market Lab" section read one file: `_data/lab.json`.
The trading platform's daily export (`scripts/export_site.py` in `/home/jzbmn/market`) overwrites it after the US close,
commits and pushes; GitHub Pages rebuilds the site.

- `"demo": true` shows a yellow "demonstration data" banner. The shipped file is demo data.
- Any top-level block that is missing (`risk`, `closure`, `live`, `latency`, `health`) is shown as "pending".
- Only derived results go in this file (returns, risk statistics, verdicts, timing). Never put exchange quotes or prices here.

Schema (version 1), see the shipped `_data/lab.json` for a full example:

| Key | Content |
|---|---|
| `schema_version`, `demo`, `as_of` (ISO time), `stage` (`A`–`E`) | header |
| `stages[]` | `{id, label, status: done / in_progress / pending}` |
| `health[]` | `{feed, status: ok / warn / down, last_msg_s, gaps_today}` |
| `risk` | `{verdict: go / no-go / pending, period, n_days, rule, qlike[] {estimator, core, crypto, dm_p_core, dm_p_crypto}, vol_target, vol[] {estimator, core, crypto}}` — QLIKE relative to `sample_60d` = 1 |
| `closure` | `{verdict, period, rule, windows {weeknight, weekend}, regression[] {window, target, coef, t, n}, strategies[] {name, cum_return, sharpe, hit_rate, n}}` |
| `live` | `{start, dates[], series[] {name, group: ours / baseline / benchmark, values[] equity in $}, scorecard[] {method, segment, days, ret, vol, sharpe, mdd, excess_spy, evidence: sufficient / insufficient}}` — large-cap core curves only in `series` |
| `latency[]` | `{component, venue, p50_ms, p99_ms}` |
| `timing_events` | `{deadline_miss, infeasible_timing, stale_quote_rejections}` |
| `market.segments` | `{core[], satellite[], crypto[], crypto_linked[]}`, each row `{symbol, name, sector, price, chg_1d, chg_1w, chg_1m, vol_20d, vol_fcst, volume_usd, rel_vol, signal {kind: risk / closure, value, label}}` |
| `tickers[]` | bottom-bar tickers `{symbol, price, chg_1d}` |

**Public vs local.** The same page runs in two places. On the personal site it shows the daily snapshot in `_data/lab.json`; there, leave out
`price`, `volume_usd` and `tickers[].price` (the page hides those columns automatically), because exchange prices may not be redistributed publicly.
On the local platform (`http://127.0.0.1:8800/lab/`) the page finds `api/lab.json` on the same server, switches to **Live** and refreshes every 2 s with full fields.
