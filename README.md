# Data With Drea — Portfolio

Live site: https://datawithdrea.github.io

## Update projects (no local setup)
1. Edit `projects.json` (objects inside `"projects"` array).
2. Commit to `main`.
3. GitHub Actions auto-deploys, site updates in 1–2 minutes.

### Fields
- `title`, `summary`
- `image` e.g. `img/matchmaker-hero.png` (upload images to `/img`)
- `repo_url` (optional), `live_url` (Hugging Face or BI link)
- `description_html` (mini case study – HTML allowed)
- `impact` (target or measured)
- `year` (number)

## Add a new project (easiest)
Use `project-builder.html` on the live site → copy JSON → paste into `projects.json`.

## Deploy
- Workflow: `.github/workflows/pages.yml`
- Pages: Settings → Pages → Source = GitHub Actions
