/*
 * Shared vocabulary tooltips for the regulator site.
 * Tap-to-toggle by default (works on touch and desktop alike), with a
 * hover preview added only on pointers that actually support hover, so
 * mobile never depends on a hover state that can't exist there.
 *
 * Markup: <button type="button" class="gl" data-term="obligation">obligation</button>
 * Full glossary: https://github.com/MetaCoding-io/regulator/blob/main/docs/GLOSSARY.md
 */
(function () {
  var GLOSSARY = "https://github.com/MetaCoding-io/regulator/blob/main/docs/GLOSSARY.md";
  var REGISTRY_DOC = "https://metacoding-io.github.io/regulator/reference/regulators";

  // term id -> { label: shown in the popover title (defaults to the button's own text),
  //              def: one plain sentence, href: link for "Full glossary entry ->" }
  var TERMS = {
    vsm: { label: "Viable System Model (VSM)", href: GLOSSARY + "#L8",
      def: "Stafford Beer's theory of the functions any system needs to stay viable: five operational functions (S1–S5) plus an independent audit function (S3*)." },
    regulator: { label: "regulator (the word)", href: GLOSSARY + "#L16",
      def: "In cybernetics, anything that keeps a system inside acceptable bounds — a gate, a check, a policy. The product's CLI is also literally named regulator; same word, two senses, on purpose." },
    algedonic: { label: "algedonic signal", href: GLOSSARY + "#L20",
      def: "An alert that skips the normal chain of command — Beer's term, literally “pain/pleasure.” Reserved for when a person must be interrupted now, not routed and queued." },
    s1: { label: "S1 — Operations", href: GLOSSARY + "#L26",
      def: "The units that actually touch the world: writing code, running tests, moving money. Specialized by a bounded capability profile, never by persona." },
    s2: { label: "S2 — Coordination", href: GLOSSARY + "#L27",
      def: "Keeps operations from tripping over each other — leases, worktrees, catching oscillation — so S3 only has to decide what to do about a real conflict." },
    s3: { label: "S3 — Control", href: GLOSSARY + "#L28",
      def: "The orchestrator: dispatches work, sets budgets, decides what happens after a failure. Faces inside the system, and now." },
    s3star: { label: "S3∗ — Audit", href: GLOSSARY + "#L29",
      def: "Verifies a unit's work independently — re-running the checks itself — instead of trusting what the unit reports about itself." },
    s4: { label: "S4 — Intelligence", href: GLOSSARY + "#L30",
      def: "Watches the environment and the future — a dependency advisory, a bill coming due — and can raise a flag. It never gets to make the call." },
    s5: { label: "S5 — Identity & Policy", href: GLOSSARY + "#L31",
      def: "What the system is: its invariants and its policy, committed to files and reviewed like code — never trapped in one session's context window." },
    orchestrator: { label: "orchestrator", href: GLOSSARY + "#L28",
      def: "The S3 control loop — contract → dispatch → verify → route → close. It never edits code itself; it dispatches a session, then checks the session's work." },
    workload: { label: "workload (definition)", href: GLOSSARY,
      def: "A declared set of unit types for one kind of job — software development, a household ledger. The loop stays identical; only the workload changes." },
    unit: { label: "unit", href: GLOSSARY + "#L60",
      def: "The smallest piece of dispatched work: one contract, one session, one verdict." },
    profile: { label: "capability profile", href: GLOSSARY + "#L59",
      def: "A named, bounded grant of tools and writable paths a unit runs under — e.g. “can write src/ and test/, no shell.” Not a persona." },
    contract: { label: "work contract", href: GLOSSARY + "#L62",
      def: "What a unit is actually authorized to decide: fixed (not up for grabs), delegated (choose within bounds), and unresolved (nobody's decided yet)." },
    report: { label: "result report", href: GLOSSARY + "#L63",
      def: "A unit's one closing statement back to the orchestrator: what it did, what it decided, and the evidence behind it." },
    evidence: { label: "evidence", href: GLOSSARY + "#L73",
      def: "A check result tied to the exact commit it ran against — never just “the tests passed,” always “the tests passed, at this revision.”" },
    closeout: { label: "closeout gate", href: GLOSSARY + "#L58",
      def: "The check that re-runs a unit's own tests itself, against the exact commit, before trusting anything the unit's report claims." },
    verdict: { label: "technical verdict", href: GLOSSARY + "#L74",
      def: "Pass, fail, or inconclusive — decided mechanically from evidence, never from what the unit says about its own work." },
    lease: { label: "lease", href: GLOSSARY + "#L71",
      def: "A time-limited claim on a worktree, so two units can't work on the same thing at once — and it expires if whoever holds it goes quiet." },
    oscillation: { label: "oscillation / thrash", href: GLOSSARY + "#L70",
      def: "Fix A breaks B, fix B breaks A. The thrash detector (S2) catches the pattern; what to do about it is S3's call, not S2's." },
    obligation: { label: "obligation", href: GLOSSARY + "#L45",
      def: "A signal that has to stay visible — to a person or to S3 — until someone actually resolves it. Not a notification that can just be missed." },
    consent: { label: "consent", href: GLOSSARY + "#L77",
      def: "Explicit yes to something irreversible. Silence, a timeout, or a cancel are never read as consent." },
    registryterm: { label: "registry", href: GLOSSARY + "#L48",
      def: "One record per regulator (the mechanism): what it catches, its evidence, its known blind spots, and when it's next reviewed." },
    ablation: { label: "ablation", href: GLOSSARY + "#L49",
      def: "Running the system with one regulator switched off, to prove it's still earning its keep — or to retire it if it isn't." },
    controlroom: { label: "control room", href: REGISTRY_DOC,
      def: "A read-only page over everything already recorded — the registry, the execution store, the audit log. It can show you what happened; it can't change anything." },
    readmodel: { label: "read model", href: REGISTRY_DOC,
      def: "A view built by reading the same files a person could read — never a second database — so what you see is provably what's on disk." },
    reintegration: { label: "reintegration", href: GLOSSARY + "#L72",
      def: "Bringing an isolated unit's work back into the main line — the moment two units' assumptions about the same file can collide." },
    effectjournal: { label: "effect journal", href: GLOSSARY + "#L47",
      def: "A record written before a side effect happens, so a crash mid-action gets detected and reconciled instead of silently repeated." },
    attempt: { label: "attempt", href: GLOSSARY + "#L68",
      def: "One immutable, claimed run of a unit against a specific revision. It doesn't by itself finish or cancel the work — routing decides what happens next." },
    interactionkind: { label: "interaction kind", href: GLOSSARY + "#L76",
      def: "The type of a question asked of a person — open, choice, recap, consent — which decides whether an answer is required and whether work pauses for it." }
  };

  function popoverHTML(id) {
    var t = TERMS[id];
    if (!t) return "";
    var href = t.href || GLOSSARY;
    return (
      '<div class="gl-term">' + t.label + "</div>" +
      '<div class="gl-def">' + t.def + "</div>" +
      '<a class="gl-more" href="' + href + '" target="_blank" rel="noopener">Full glossary entry ↗</a>'
    );
  }

  var pop = null;
  var openBtn = null;

  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "gl-pop";
    pop.setAttribute("role", "tooltip");
    pop.id = "gl-pop-live";
    pop.hidden = true;
    document.body.appendChild(pop);
    return pop;
  }

  function closePop() {
    if (!pop) return;
    pop.hidden = true;
    if (openBtn) {
      openBtn.setAttribute("aria-expanded", "false");
      openBtn.removeAttribute("aria-describedby");
    }
    openBtn = null;
  }

  function openPop(btn) {
    var id = btn.getAttribute("data-term");
    if (!TERMS[id]) return;
    var p = ensurePop();
    if (openBtn === btn) { closePop(); return; }
    p.innerHTML = popoverHTML(id);
    p.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-describedby", p.id);
    openBtn = btn;

    // position: below the term, clamped to the viewport, flips above if
    // there isn't room below.
    var r = btn.getBoundingClientRect();
    var pw = Math.min(300, window.innerWidth - 24);
    p.style.width = pw + "px";
    var left = r.left + window.scrollX;
    left = Math.max(12 + window.scrollX, Math.min(left, window.scrollX + window.innerWidth - pw - 12));
    p.style.left = left + "px";

    var spaceBelow = window.innerHeight - r.bottom;
    var ph = p.offsetHeight || 90;
    if (spaceBelow < ph + 16 && r.top > ph + 16) {
      p.style.top = (r.top + window.scrollY - ph - 8) + "px";
    } else {
      p.style.top = (r.bottom + window.scrollY + 8) + "px";
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".gl");
    if (btn) {
      e.preventDefault();
      openPop(btn);
      return;
    }
    if (pop && !pop.hidden && !(e.target.closest && e.target.closest(".gl-pop"))) {
      closePop();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePop();
  });

  window.addEventListener("resize", closePop);
  window.addEventListener("scroll", closePop, { passive: true });

  // Hover preview only where the pointer actually supports hover (desktop).
  // Touch devices never get a hover state, so they rely entirely on tap.
  if (window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mouseover", function (e) {
      var btn = e.target.closest && e.target.closest(".gl");
      if (btn && openBtn !== btn) openPop(btn);
    });
  }
})();
