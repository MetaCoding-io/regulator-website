# vsm-pi-website

The public landing pages for VSM-Pi and its course, Viable Agents. The
[VSM-Pi](https://github.com/MetaCoding-io/vsm-pi) repository itself is private; this repo
exists so the pitch, the control model, and the course syllabus can be public and served
from GitHub Pages without exposing the source.

## What's here

Two static pages under [`site/`](site/), no build step — see [`site/README.md`](site/README.md)
for what each one covers.

## Publishing

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes
`site/` to GitHub Pages on every push to `main` that touches `site/**`, via
`actions/upload-pages-artifact` + `actions/deploy-pages`. It also runs on
`workflow_dispatch` for a manual republish.

One-time repo setting (not something a workflow can do): under **Settings → Pages**, set
**Source** to **GitHub Actions**.

## Keeping this in sync

These pages are hand-maintained snapshots, copied over from `site/` in the (private)
`vsm-pi` repo when it changes in a way that affects what these pages state as fact
(checkpoint status, package promotions, lessons written, registry count). There is no
automation syncing the two repos today.
