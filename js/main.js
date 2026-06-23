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

  Object.values(inputs).forEach((el) =>
    el && el.addEventListener("input", calc)
  );
  calc();

  /* ---- Lead form (demo only) ---- */
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      document.getElementById("formSuccess").hidden = false;
      form.reset();
    });
  }

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    ".section__head, .card, .step, .quote, .features li, .why__media, .calc__panel, .areas__map, .cta__form"
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
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
