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
