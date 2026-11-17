# regulator-website

The public landing pages for [regulator](https://github.com/MetaCoding-io/regulator) —
an agent harness with an explicit cybernetic control plane — and its course,
[Viable Agents](https://regulator.metacoding.io/). Served from
GitHub Pages; no build step.

## What's here

Five static pages under [`site/`](site/) — see [`site/README.md`](site/README.md) for
what each one covers: the course page, the product page, the product for someone with
one process to hand over, the worked example (a
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
changes (`node scripts/screenshots.mjs --website ../regulator-website`, in the product
repository). The product's own documentation site is the reference; these pages are the
pitch.

Some of what a page states is checked. `node scripts/check-facts.mjs` reads the counts
the pages give for the product (the version, the registry's records, the session
extensions, the committed reports, the debt ledger's rows) and compares them with
`facts.json`, which the product's docs site publishes from its own build. The **Check**
workflow runs it on every pull request and on `main`. To check against a product
checkout before its docs site has deployed:

```sh
node scripts/check-facts.mjs --facts ../regulator/docs/public/facts.json
```

It reads only the sentences it has a rule for; everything else on a page is still kept
by hand.
