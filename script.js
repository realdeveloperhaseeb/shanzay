(function () {
  "use strict";

  /* -------------------------------------------------------------
     Contact details are assembled at runtime (split into parts)
     so they are NOT sitting in the HTML as plain text for bots /
     scrapers to harvest. They only resolve in a real browser.
  ------------------------------------------------------------- */
  var WA_PARTS = ["92", "327", "830", "4468"];          // +92 327 8304468
  var MAIL_USER = ["shanzay", "virk", "140"];
  var MAIL_DOMAIN = ["gmail", "com"];

  function waNumber() { return WA_PARTS.join(""); }
  function waLink(msg) {
    return "https://wa.me/" + waNumber() +
      "?text=" + encodeURIComponent(msg || "Hi Shanza! I'd like to hire you for an ad video.");
  }
  function emailAddr() {
    return MAIL_USER.join("") + "@" + MAIL_DOMAIN.join(".");
  }

  // Wire up every WhatsApp + Email trigger
  function wireContacts() {
    document.querySelectorAll(".js-whatsapp").forEach(function (el) {
      el.href = waLink();
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
    document.querySelectorAll(".js-email").forEach(function (el) {
      el.href = "mailto:" + emailAddr() +
        "?subject=" + encodeURIComponent("Project Inquiry");
    });
  }

  /* ---------- Mobile nav ---------- */
  function wireNav() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- About tabs ---------- */
  function wireTabs() {
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        document.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.toggle("is-active", p.id === target);
        });
      });
    });
  }

  /* ---------- Reviews carousel ---------- */
  function wireCarousel() {
    var track = document.getElementById("track");
    var dotsWrap = document.getElementById("dots");
    if (!track) return;
    var slides = track.children;
    var count = slides.length;
    var index = 0;
    var timer;

    // dots
    for (var i = 0; i < count; i++) {
      var d = document.createElement("button");
      d.setAttribute("aria-label", "Go to review " + (i + 1));
      (function (n) { d.addEventListener("click", function () { go(n); restart(); }); })(i);
      dotsWrap.appendChild(d);
    }
    var dots = dotsWrap.children;

    function go(n) {
      index = (n + count) % count;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      for (var k = 0; k < dots.length; k++) dots[k].classList.toggle("active", k === index);
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 5000); }

    document.getElementById("next").addEventListener("click", function () { next(); restart(); });
    document.getElementById("prev").addEventListener("click", function () { prev(); restart(); });

    // swipe support
    var startX = 0;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restart(); }
    });

    go(0);
    restart();
  }

  /* ---------- FAQ accordion ---------- */
  function wireAccordion() {
    document.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.parentElement;
        var body = head.nextElementSibling;
        var open = item.classList.toggle("open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
        body.style.maxHeight = open ? body.scrollHeight + "px" : null;
        // close siblings for a clean single-open accordion
        item.parentElement.querySelectorAll(".acc-item").forEach(function (other) {
          if (other !== item && other.classList.contains("open")) {
            other.classList.remove("open");
            other.querySelector(".acc-head").setAttribute("aria-expanded", "false");
            other.querySelector(".acc-body").style.maxHeight = null;
          }
        });
      });
    });
  }

  /* ---------- Light content protection ---------- */
  function wireProtection() {
    // Discourage casual saving/copying of the hero photo & content.
    document.addEventListener("contextmenu", function (e) {
      if (e.target.closest(".hero-photo, .review, img")) e.preventDefault();
    });
    document.addEventListener("dragstart", function (e) {
      if (e.target.tagName === "IMG") e.preventDefault();
    });
  }

  /* ---------- Misc ---------- */
  function misc() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireContacts();
    wireNav();
    wireTabs();
    wireCarousel();
    wireAccordion();
    wireProtection();
    misc();
  });
})();
