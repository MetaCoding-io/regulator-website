/*
 * Floating "on this page" TOC: highlights whichever section is currently
 * in view, and adds a collapse toggle. Pure progressive enhancement —
 * the TOC is a plain list of anchor links without this; this only adds
 * the is-active highlight and the collapse/expand behavior.
 *
 * The TOC is a fixed card shown on every visit by default (it has to be,
 * to be findable at all — a browser sidebar or a narrower window can eat
 * the margin a width-only check would have relied on). At narrower
 * widths it can end up sitting over the right edge of a full-width
 * diagram, so the collapse toggle lets a reader tuck it out of the way
 * for that page without losing "shown by default" on the next one —
 * the collapsed state is per-page, not global, in localStorage.
 *
 * Markup: <aside class="page-toc"><div class="page-toc-title">On this
 *   page</div><nav><a href="#id">Label</a> ...</nav></aside>
 */
(function () {
  function init() {
    var toc = document.querySelector(".page-toc");
    if (!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    if (!links.length) return;

    var title = toc.querySelector(".page-toc-title");
    if (title) {
      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "page-toc-toggle";

      var storageKey = "page-toc-collapsed:" + location.pathname;
      function applyCollapsed(collapsed) {
        toc.classList.toggle("is-collapsed", collapsed);
        toggle.textContent = collapsed ? "+" : "–";
        toggle.setAttribute("aria-label", collapsed ? "Show this page's contents" : "Hide this page's contents");
      }
      var stored = false;
      try { stored = localStorage.getItem(storageKey) === "1"; } catch (e) {}
      applyCollapsed(stored);
      toggle.addEventListener("click", function () {
        var collapsed = !toc.classList.contains("is-collapsed");
        applyCollapsed(collapsed);
        try { localStorage.setItem(storageKey, collapsed ? "1" : "0"); } catch (e) {}
      });
      title.appendChild(toggle);
    }

    if (!window.IntersectionObserver) return;
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
