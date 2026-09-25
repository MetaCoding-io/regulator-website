/*
 * The "Six functions, one loop" diagram on product.html: three tabs relabel the
 * same boxes and arrows for a workload. General is the diagram as drawn; the
 * other two fill each box in from the shipped software-development and
 * personal-finance workloads. Text only — nothing moves, so the picture stays
 * comparable across tabs.
 */
(function () {
  var TABS = {
    general: {
      s5: "S5 — IDENTITY", s5sub: "policy · invariants",
      s4: "S4 — INTELLIGENCE", s4sub: "environment · future",
      s3: "S3 — CONTROL", s3sub: "contract · dispatch · budget",
      s3s: "S3* AUDIT", s3ssub: "independent",
      s2: "S2 — COORDINATION", s2sub: "leases · anti-oscillation",
      s1a: "S1", s1asub: "capability profile",
      s1b: "S1", s1bsub: "capability profile",
      s1c: "S1", s1csub: "capability profile",
      dom1: "what the units change — the source of truth about the work",
      dom2: "one isolated workspace per unit; the loop reintegrates what verified",
      env1: "what nobody in the system controls", env2: "watched by S4 · never written",
      scans: "scans", audit: "audit", verifies: "verifies at a revision",
      cap: "Grey = attenuated instruction down the spine; teal = amplified evidence back up. Units act on the <b>domain</b> — each in its own workspace, reintegrated by the loop — and S3&#42; (alarm colour) verifies the domain at a revision, going around the units rather than through what they report. S4 scans the <b>environment</b> on its own channel; nothing in the system writes there. Pick a tab to see the same boxes filled in for a workload."
    },
    software: {
      s5: "S5 — IDENTITY", s5sub: "INV-001…004 · the refused words",
      s4: "S4 — INTELLIGENCE", s4sub: "research unit: advisories, platforms",
      s3: "S3 — CONTROL", s3sub: "a contract per change · attempts",
      s3s: "S3* AUDIT", s3ssub: "host-run checks at HEAD",
      s2: "S2 — COORDINATION", s2sub: "worktrees · leases · merge",
      s1a: "plan", s1asub: "research · read-only",
      s1b: "implement", s1bsub: "implement · src/ test/",
      s1c: "verify", s1csub: "research · read-only",
      dom1: "source and tests in git — one worktree and branch per unit",
      dom2: "regulator/identity/ protected; merged back only on evidence",
      env1: "security advisories · dependency", env2: "releases · platform changes · users",
      scans: "a research unit reads", audit: "audit", verifies: "tests · inherited · identity",
      cap: "The software-development workload. <b>plan</b> reads the repository and writes contracts; <b>implement</b> changes source and tests in its own worktree under the <code>implement</code> profile; <b>verify</b> reads the result under a read-only profile. S3&#42; runs the project's tests, the suite the unit inherited, and the identity and glossary checks against the unit's committed revision — never against its report. A <b>research</b> unit is S4: read-only, it reports what changed in the environment as intelligence that holds the units it names. Identity is four files under <code>regulator/identity/</code> that no unit may write."
    },
    finance: {
      s5: "S5 — IDENTITY", s5sub: "statement is the bank's · consent",
      s4: "S4 — INTELLIGENCE", s4sub: "a statement arrives · a bill is due",
      s3: "S3 — CONTROL", s3sub: "five contracts of a monthly close",
      s3s: "S3* AUDIT", s3ssub: "balances to the bank",
      s2: "S2 — COORDINATION", s2sub: "one period, one unit at a time",
      s1a: "ingest", s1asub: "bookkeeper · ledger/",
      s1b: "categorize", s1bsub: "bookkeeper · ledger/",
      s1c: "reconcile", s1csub: "auditor · read-only",
      dom1: "ledger/ and reports/ in git: categorized rows, the close",
      dom2: "statements/ and payments/executed/: protected, never written",
      env1: "the bank's statements · bills due", env2: "the tax calendar · interest rates",
      scans: "a person drops a statement in", audit: "audit", verifies: "the ledger's own test suite",
      cap: "The personal-finance workload: a household ledger closed once a month. <b>ingest</b> and <b>categorize</b> write rows under the <code>bookkeeper</code> profile, which has no shell; <b>reconcile</b> reads under <code>auditor</code>. S3&#42; runs the ledger's own tests — every row balances to the bank's statement, every category is in the taxonomy — and refuses a close that touched <code>statements/</code>. The one action that can hurt, a payment, waits on a person's yes through <code>ask_human</code>; silence is never consent. S4 is a person dropping the new statement in, until a watcher does it."
    }
  };
  var root = document.getElementById("vsm-diagram");
  var bar = document.querySelector(".dtabs");
  if (!root || !bar) return;
  function show(name) {
    var data = TABS[name] || TABS.general;
    root.querySelectorAll("[data-key]").forEach(function (el) {
      var key = el.getAttribute("data-key");
      if (!(key in data)) return;
      if (key === "cap") el.innerHTML = data[key]; else el.textContent = data[key];
    });
    bar.querySelectorAll(".dtab").forEach(function (b) {
      var on = b.getAttribute("data-tab") === name;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }
  bar.addEventListener("click", function (e) {
    var b = e.target.closest(".dtab");
    if (b) show(b.getAttribute("data-tab"));
  });
  show("general");
})();
