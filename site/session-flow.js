/*
 * Hover/tap descriptions for the "Where the gates sit in a session" flow
 * diagram on how-it-works.html. Same tap-to-toggle + hover-if-supported
 * pattern as glossary.js, kept separate because the content and markup
 * (a kind badge, a bullet list, no "full glossary" link) differ enough
 * that sharing one popover renderer would just add branching to both.
 *
 * Markup: <button type="button" class="ev gate" data-ev="tool_call">…</button>
 */
(function () {
  // event id -> { label, kind: "gate" | "hook", when: one line for context,
  //               bullets: distinct things that happen there, one per line }
  var EVENTS = {
    tools_registered: {
      label: "tools registered", kind: "hook",
      when: "At session boot, before any unit code runs.",
      bullets: [
        "Registers <code>read_conventions</code>, <code>run_tests</code>, <code>run_checks</code>",
        "Registers <code>report_result</code>",
        "Registers <code>notify_owner</code> (journaled)",
        "Registers <code>propose_policy_change</code> (records only — changes nothing)"
      ]
    },
    project_trust: {
      label: "project_trust", kind: "gate",
      when: "Before the session trusts anything the project ships.",
      bullets: [
        "Always answers <em>no</em>: the project never loads its own extensions or skills",
        "SDK sessions never fire this event — the dispatcher's loader enforces the same rule there instead"
      ]
    },
    session_start: {
      label: "session_start", kind: "hook",
      when: "Once, when the session opens.",
      bullets: [
        "Finds the unit from the lease on this worktree",
        "Loads the contract from the store and appends it as a typed trace entry",
        "Opens the budget ledger",
        "Reconciles pending effects against the world",
        "Discovers the protected paths",
        "Loads the canaries"
      ]
    },
    before_agent_start: {
      label: "before_agent_start", kind: "hook",
      when: "Before the model's first turn.",
      bullets: [
        "Adds the profile's advice and the contract as system-prompt sections",
        "Advice only — the gates further down this line are what actually bind"
      ]
    },
    tool_call: {
      label: "tool_call", kind: "gate",
      when: "Every tool call, in load order, before it runs.",
      bullets: [
        "Vendor path check (lexical)",
        "Profile grant check",
        "A live lease is required for any non-read-only effect",
        "A crossed budget refuses the effect",
        "<code>report_result</code> preflight: the cited runs happened in this session, at HEAD, and passed",
        "Protected-path preflight with a filesystem walk — the path a tool executes is the one that was checked",
        "A bash call is snapshotted first"
      ]
    },
    tool_result: {
      label: "tool_result", kind: "gate",
      when: "Right after a tool runs.",
      bullets: [
        "Stamps <code>run_tests</code> / <code>run_checks</code> output with the revision it ran at",
        "After bash, restores any protected file that changed, and says so",
        "Redacts canaries"
      ]
    },
    tool_execution_end: {
      label: "tool_execution_end", kind: "hook",
      when: "After a tool call finishes.",
      bullets: [
        "Counts edits per file for the thrash detector",
        "Records evidence pointers for compaction",
        "Normalizes tool errors into observations for the router"
      ]
    },
    message_turn_end: {
      label: "message_end · turn_end", kind: "gate",
      when: "After each model message, and each turn.",
      bullets: [
        "Meters tokens and turns against the ceiling, and halts at a crossing",
        "Records a canary the model wrote",
        "Heartbeats the lease"
      ]
    },
    session_before_compact: {
      label: "session_before_compact", kind: "hook",
      when: "Only when the context nears the limit.",
      bullets: [
        "Opens every summary with the contract allocation, evidence pointers and touched files — deterministically",
        "The model's own summary follows, if any"
      ]
    },
    agent_end: {
      label: "agent_end", kind: "hook",
      when: "Once, when the session's turn ends.",
      bullets: [
        "Warns if no report was made",
        "Records a provider error as an observation"
      ]
    }
  };

  function popoverHTML(id) {
    var e = EVENTS[id];
    if (!e) return "";
    var kindLabel = e.kind === "gate" ? "gate — can refuse or halt" : "hook — records only";
    return (
      '<div class="gl-term">' + e.label + "</div>" +
      '<div class="ev-pop-kind ' + e.kind + '">' + kindLabel + "</div>" +
      '<div class="ev-pop-when">' + e.when + "</div>" +
      "<ul>" + e.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>"
    );
  }

  var pop = null;
  var openBtn = null;

  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "gl-pop";
    pop.setAttribute("role", "tooltip");
    pop.id = "ev-pop-live";
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
    var id = btn.getAttribute("data-ev");
    if (!EVENTS[id]) return;
    var p = ensurePop();
    if (openBtn === btn) { closePop(); return; }
    p.innerHTML = popoverHTML(id);
    p.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-describedby", p.id);
    openBtn = btn;

    var r = btn.getBoundingClientRect();
    var pw = Math.min(300, window.innerWidth - 24);
    p.style.width = pw + "px";
    var left = r.left + window.scrollX + r.width / 2 - pw / 2;
    left = Math.max(12 + window.scrollX, Math.min(left, window.scrollX + window.innerWidth - pw - 12));
    p.style.left = left + "px";

    var spaceBelow = window.innerHeight - r.bottom;
    var ph = p.offsetHeight || 140;
    if (spaceBelow < ph + 16 && r.top > ph + 16) {
      p.style.top = (r.top + window.scrollY - ph - 8) + "px";
    } else {
      p.style.top = (r.bottom + window.scrollY + 8) + "px";
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".ev");
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

  if (window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mouseover", function (e) {
      var btn = e.target.closest && e.target.closest(".ev");
      if (btn && openBtn !== btn) openPop(btn);
    });
  }
})();
