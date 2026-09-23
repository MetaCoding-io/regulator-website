# site/

Three static pages, no build step — open them directly in a browser, or serve `site/` as
static files.

- `index.html` — the landing page: VSM-Pi (the product) and Viable Agents (the course):
  the control model, the orchestrator/workload split, the control room, the syllabus with
  lessons 01–15 marked written, and the build's status.
- `personal-finance.html` — the worked example: a goal outside software (agents that manage a
  household's finances) designed as a control system first, then declared and run under
  `regulator`, with the control room over the result.
- `img/control-room/` — screenshots of `packages/control-room` over two instances (the ledger
  after its scripted August close, the drift scenario run by the drifter); retake them when
  the page changes.
- `how-it-works.html` — the mechanism, drawn: how one unit runs through the S3 loop
  (orchestrator, execution store, session, worktree, regulatory state), what a work
  contract and a result report hold, the three stores that never infer each other, the
  recovery lattice, and what an instance's `.regulator/` directory contains.

Both are hand-maintained alongside the repo's actual status; update them when
`README.md`, `AGENTS.md`, `course/README.md` or `docs/DEBT.md` change in a way a page
states as fact (checkpoint status, package promotions, lessons written, registry count).
