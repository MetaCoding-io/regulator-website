# regulator-website

The public landing pages for [regulator](https://github.com/MetaCoding-io/regulator) —
a coding-agent harness with an explicit cybernetic control plane — and its course,
[Viable Agents](https://github.com/MetaCoding-io/viable-agents-course). Served from
GitHub Pages; no build step.

## What's here

Four static pages under [`site/`](site/) — see [`site/README.md`](site/README.md) for
what each one covers: the course page, the product page, the worked example (a
household ledger under the same control plane), and how one unit of work runs.
[`site/v1/`](site/v1/) is a frozen archive of the previous version of the site, kept
live at `/v1/` with a banner back to the current pages; it still carries the project's
former name, VSM-Pi.

## Publishing

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes
`site/` to GitHub Pages on every push to `main` that touches `site/**`, via
`actions/upload-pages-artifact` + `actions/deploy-pages`. It also runs on
`workflow_dispatch` for a manual republish.

One-time repo setting (not something a workflow can do): under **Settings → Pages**, set
**Source** to **GitHub Actions**.

## Keeping this in sync

These pages are hand-maintained. Update them when the product repository changes in a
way a page states as fact — the package layout, the registry count, what ships — and
retake the control-room screenshots under `site/img/control-room/` when the control room
changes. The product's own documentation site is the reference; these pages are the
pitch.
