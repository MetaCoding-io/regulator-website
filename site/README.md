# site/

Four static pages, no build step — open them directly in a browser, or serve `site/` as
static files.

- `index.html` — the course sales page: Viable Agents, why cybernetics, who it's for, the
  full syllabus, and the reference build (`regulator`) it's built against.
- `product.html` — the product page: VSM-Pi's architecture, the mechanism hierarchy, the
  orchestrator, build status, and the control room.
- `personal-finance.html` — the worked example, written as a followable tutorial: a goal
  outside software (agents that manage a household's finances) designed as a control
  system first, then declared and run under `regulator`, with the control room over the
  result.
- `how-it-works.html` — the mechanism, drawn: how one unit runs through the S3 loop
  (orchestrator, execution store, session, worktree, regulatory state), the unit's own
  lifecycle as a state diagram, the software-development workload's six unit types as a
  flow diagram, what a work contract and a result report hold, the three stores that
  never infer each other, the recovery lattice, and what an instance's `.regulator/`
  directory contains.
- `glossary.css` / `glossary.js` — the shared tap-to-toggle (with hover on desktop)
  vocabulary tooltip component all four pages use, sourced from
  [`course/GLOSSARY.md`](https://github.com/MetaCoding-io/vsm-pi/blob/main/course/GLOSSARY.md).
- `img/control-room/` — screenshots of `packages/control-room` over three instances (the
  ledger after its scripted August close, the drift scenario run by the drifter, and the
  fixture-repo close on the how-it-works page); retake them when the page changes.
- `v1/` — the previous version of the site (one course+product page, no glossary
  tooltips), kept as a dead archive at `/v1/` with a banner pointing back here. Not
  updated going forward.

Hand-maintained alongside the repo's actual status; update the four live pages when
`README.md`, `AGENTS.md`, `course/README.md` or `docs/DEBT.md` change in a way a page
states as fact (checkpoint status, package promotions, lessons written, registry count).
