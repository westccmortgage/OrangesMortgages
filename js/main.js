/* ============================================================
   Orange Mortgage — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Sticky nav shadow on scroll ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Mortgage calculator ---- */
  const $ = (id) => document.getElementById(id);
  const fmt = (n) =>
    "$" + Math.round(n).toLocaleString("en-US");

  const inputs = {
    price: $("price"),
    down: $("down"),
    rate: $("rate"),
    term: $("term"),
  };

  function calc() {
    const price = +inputs.price.value;
    const downPct = +inputs.down.value;
    const rate = +inputs.rate.value;
    const years = +inputs.term.value;

    const downAmt = price * (downPct / 100);
    const principal = price - downAmt;
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;

    let payment;
    if (monthlyRate === 0) {
      payment = principal / n;
    } else {
      payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }

    $("priceOut").textContent = fmt(price);
    $("downOut").textContent = `${fmt(downAmt)} (${downPct}%)`;
    $("rateOut").textContent = rate.toFixed(3).replace(/0+$/, "").replace(/\.$/, "") + "%";
    $("termOut").textContent = years + " years";
    $("payment").innerHTML = fmt(payment) + "<small>/mo</small>";
    $("loanAmount").innerHTML =
      `Loan amount ${fmt(principal)} &middot; Principal &amp; interest only`;
  }

  // Only wire the calculator on pages that actually contain it.
  if (inputs.price && inputs.down && inputs.rate && inputs.term) {
    Object.values(inputs).forEach((el) =>
      el.addEventListener("input", calc)
    );
    calc();
  }

  /* ---- Lead form -> Resend via Netlify Function (AJAX, inline success state) ---- */
  const form = document.getElementById("leadForm");
  if (form) {
    const success = document.getElementById("formSuccess");
    const error = document.getElementById("formError");
    const submitBtn = document.getElementById("leadSubmit");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (success) success.hidden = true;
      if (error) error.hidden = true;
      const label = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      // POST to the serverless function, which emails the lead via Resend.
      const payload = Object.fromEntries(new FormData(form));
      fetch(form.getAttribute("action") || "/api/ask-orange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Bad response");
          if (success) success.hidden = false;
          form.reset();
        })
        .catch(() => {
          if (error) error.hidden = false;
        })
        .finally(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = label; }
        });
    });
  }

  /* ---- Ask Orange floating assistant ----
     Placeholder for the future interactive/talking Orange avatar widget.
     For now it opens a lightweight panel; later this can mount a live
     avatar session (HeyGen / Tavus / D-ID / Runway / custom). */
  const ask = document.getElementById("askOrange");
  if (ask) {
    const fab = document.getElementById("askOrangeFab");
    const panel = document.getElementById("askOrangePanel");
    const closeBtn = document.getElementById("askOrangeClose");

    const openPanel = () => {
      panel.hidden = false;
      fab.setAttribute("aria-expanded", "true");
    };
    const closePanel = () => {
      panel.hidden = true;
      fab.setAttribute("aria-expanded", "false");
    };
    const togglePanel = () => (panel.hidden ? openPanel() : closePanel());

    fab.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", closePanel);

    // Action buttons inside the panel close it, then their anchor scrolls.
    panel.querySelectorAll(".js-ask-close").forEach((a) =>
      a.addEventListener("click", closePanel)
    );

    // Close on Escape or when clicking outside the widget.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", (e) => {
      if (!panel.hidden && !ask.contains(e.target)) closePanel();
    });
  }

  /* ---- "Ask Orange" CTAs: scroll to form and focus the first field ---- */
  document.querySelectorAll(".js-ask-orange").forEach((a) => {
    a.addEventListener("click", () => {
      const first = document.querySelector('#leadForm input[name="first"]');
      if (first) window.setTimeout(() => first.focus({ preventScroll: true }), 650);
    });
  });

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    ".section__head, .card, .step, .features li, .why__media, .calc__panel, .areas__cities li, .cta__form"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));

    // Safety net: never leave content permanently hidden (print, stalled
    // callbacks, programmatic full-page capture). Reveal anything still hidden.
    const revealAll = () =>
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    window.addEventListener("beforeprint", revealAll);
    window.setTimeout(revealAll, 2500);
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
