/*
 * Floating "on this page" TOC: highlights whichever section is currently
 * in view. Pure progressive enhancement — the TOC is a plain list of
 * anchor links without this; this only adds the is-active highlight.
 *
 * Markup: <aside class="page-toc"><div class="page-toc-title">On this
 *   page</div><nav><a href="#id">Label</a> ...</nav></aside>
 */
(function () {
  function init() {
    var toc = document.querySelector(".page-toc");
    if (!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    if (!links.length || !window.IntersectionObserver) return;

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
