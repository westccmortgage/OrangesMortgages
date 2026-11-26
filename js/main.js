/* Google Ads: count only accepted Netlify leads. */
(function () {
  "use strict";
  const keys = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const memory = {};
  const get = key => { try { return localStorage.getItem("orange_attr_" + key) || memory[key] || ""; } catch (_) { return memory[key] || ""; } };
  const set = (key, value) => { memory[key] = value; try { localStorage.setItem("orange_attr_" + key, value); } catch (_) {} };
  const query = new URLSearchParams(location.search);
  keys.forEach(key => { if (query.get(key)) set(key, query.get(key)); });
  if (!get("landing_page")) set("landing_page", location.href);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "AW-18417657219");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18417657219";
  document.head.appendChild(script);
  const form = document.getElementById("leadForm");
  if (!form) return;
  const sync = () => {
    const values = {};
    keys.forEach(key => { values[key] = get(key); });
    values.landing_page = get("landing_page");
    values.submission_page = location.href;
    Object.entries(values).forEach(([name, value]) => {
      let input = form.elements.namedItem(name);
      if (!input) { input = document.createElement("input"); input.type = "hidden"; input.name = name; form.appendChild(input); }
      input.value = value;
    });
  };
  sync();
  let sending = false;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (sending) return;
    sending = true;
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    sync();
    const id = "orange_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    form.elements.namedItem("lead_event_id").value = id;
    const previousError = form.querySelector('[data-lead-error]');
    if (previousError) previousError.remove();
    try {
      const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
      if (!response.ok) throw new Error("Submission failed");
      window.dataLayer.push({ event: "orange_lead_submit", lead_event_id: id, form_name: form.name, page_location: location.href });
      let redirected = false;
      const done = () => { if (!redirected) { redirected = true; location.assign(form.getAttribute("action") || "/thank-you"); } };
      window.gtag("event", "conversion", { send_to: "AW-18417657219/LiA7CPWd4eocEIPLnM5E", value: 1, currency: "USD", transaction_id: id, event_callback: done, event_timeout: 1500 });
      setTimeout(done, 1800);
    } catch (_) {
      sending = false;
      if (button) button.disabled = false;
      const error = document.createElement("p");
      error.setAttribute("data-lead-error", "");
      error.setAttribute("role", "alert");
      error.className = "form__error";
      error.setAttribute("data-i18n", "ct.err");
      error.textContent = (window.OMi18n && window.OMi18n.t("ct.err")) || "Your request could not be sent. Please try again or email orange@orangesmortgages.com.";
      form.appendChild(error);
    }
  });
})();

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

  /* ---- Floating "Ask Orange" visibility ----
     Hidden while the mobile menu is open, a form/contact block is on screen
     or a form field has focus, so it never covers fields or content. ---- */
  const root = document.documentElement;
  const fabState = { menu: false, field: false, zones: new Set() };
  const refreshFab = () => {
    const widget = document.getElementById("askOrange");
    if (!widget) return;
    const away = fabState.menu || fabState.field || fabState.zones.size > 0;
    widget.classList.toggle("is-away", away);
    if (away) {
      const panel = document.getElementById("askOrangePanel");
      const fabBtn = document.getElementById("askOrangeFab");
      if (panel && !panel.hidden) { panel.hidden = true; if (fabBtn) fabBtn.setAttribute("aria-expanded", "false"); }
    }
  };
  const isField = (el) => !!(el && el.matches && el.matches("input:not([type=hidden]), select, textarea"));
  document.addEventListener("focusin", (e) => { if (isField(e.target)) { fabState.field = true; refreshFab(); } });
  document.addEventListener("focusout", () => {
    window.setTimeout(() => { fabState.field = isField(document.activeElement); refreshFab(); }, 0);
  });
  if ("IntersectionObserver" in window) {
    const zoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fabState.zones.add(entry.target); else fabState.zones.delete(entry.target);
      });
      refreshFab();
    }, { threshold: 0.05 });
    document.querySelectorAll("#contact, .cta, form").forEach((el) => zoneObserver.observe(el));
  }

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    root.classList.toggle("menu-open", open);
    fabState.menu = open;
    refreshFab();
  };
  const closeMenu = () => setMenu(false);
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (links.classList.contains("is-open") && !links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1200 && links.classList.contains("is-open")) closeMenu(); });

  /* ---- Wide tables: "Swipe to see more" hint only when the table overflows ---- */
  document.querySelectorAll(".table-wrap").forEach((wrap) => {
    const hint = document.createElement("p");
    hint.className = "swipe-hint";
    hint.hidden = true;
    hint.setAttribute("data-i18n", "ui.swipe");
    hint.textContent = (window.OMi18n && window.OMi18n.t("ui.swipe")) || "Swipe to see more →";
    wrap.insertAdjacentElement("afterend", hint);
    const check = () => { hint.hidden = !(wrap.scrollWidth > wrap.clientWidth + 1); };
    check();
    window.addEventListener("resize", check);
    wrap.addEventListener("scroll", () => { if (wrap.scrollLeft > 4) hint.hidden = true; }, { passive: true });
    if ("ResizeObserver" in window) new ResizeObserver(check).observe(wrap);
    document.addEventListener("om:lang", () => window.setTimeout(check, 0));
  });

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

    const T = (k, v) => (window.OMi18n ? window.OMi18n.t(k, v) : null);
    $("priceOut").textContent = fmt(price);
    $("downOut").textContent = `${fmt(downAmt)} (${downPct}%)`;
    $("rateOut").textContent = rate.toFixed(3).replace(/0+$/, "").replace(/\.$/, "") + "%";
    $("termOut").textContent = T("calc.years", { n: years }) || years + " years";
    $("payment").innerHTML = fmt(payment) + "<small>" + (T("calc.perMo") || "/mo") + "</small>";
    $("loanAmount").textContent =
      T("calc.loanAmount", { amt: fmt(principal) }) ||
      `Loan amount ${fmt(principal)} · Principal & interest only`;
  }

  // Only wire the calculator on pages that actually contain it.
  if (inputs.price && inputs.down && inputs.rate && inputs.term) {
    Object.values(inputs).forEach((el) =>
      el.addEventListener("input", calc)
    );
    calc();
    // re-render localized calculator strings when the language changes
    document.addEventListener("om:lang", calc);
  }

  /* ---- Founder experience year consistency ----
     Keep the public biography fixed at the verified 2004 start year without
     allowing the legacy translation dictionary to overwrite it. */
  const founderExperience = document.querySelector(".founder__creds li:nth-child(3)");
  const founderExperienceText = {
    en: "Mortgage professional since 2004",
    ru: "Ипотечный специалист с 2004 года",
    es: "Profesional hipotecario desde 2004",
  };
  const syncFounderExperienceYear = (lang) => {
    if (!founderExperience) return;
    const activeLang = lang || document.documentElement.lang || "en";
    founderExperience.textContent = founderExperienceText[activeLang] || founderExperienceText.en;
  };
  syncFounderExperienceYear();
  document.addEventListener("om:lang", (event) =>
    window.setTimeout(() => syncFounderExperienceYear(event.detail && event.detail.lang), 0)
  );

  /* ---- Lead form ----
     Handled natively by Netlify Forms — no JS needed. The form POSTs to
     Netlify, which stores the submission, emails the notification, and
     redirects to /thank-you. Native browser validation covers required
     fields. ---- */

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

  /* ---- Strategy Studio iframe auto-resize ----
     The /studio/ module posts {cmStudioHeight} to this page; match the
     iframe height so there's no inner scrollbar. ---- */
  const studioFrame = document.getElementById("studioFrame");
  if (studioFrame) {
    window.addEventListener("message", (e) => {
      const h = e && e.data && e.data.cmStudioHeight;
      if (typeof h === "number" && h > 0) studioFrame.style.height = h + "px";
    });
  }

  /* ---- "Ask Orange" CTAs: scroll to form and focus the first field ---- */
  document.querySelectorAll(".js-ask-orange").forEach((a) => {
    a.addEventListener("click", () => {
      const first = document.querySelector('#leadForm input[name="first"]');
      if (first) window.setTimeout(() => first.focus({ preventScroll: true }), 650);
    });
  });

  /* ---- Scroll reveal ----
     Progressively enhanced with Motion (motion.dev): when the library loads
     from the CDN, sections/cards spring up with a per-group stagger. If Motion
     is unavailable (offline, blocked CDN, slow network) we fall back to a
     dependency-free IntersectionObserver + CSS transition, so content is never
     left hidden. prefers-reduced-motion shows everything instantly. */
  const MOTION_CDN = "https://cdn.jsdelivr.net/npm/motion@12.42.0/+esm";
  const revealTargets = document.querySelectorAll(
    ".section__head, .card, .step, .features li, .why__media, .calc__panel, .areas__cities li, .cta__form"
  );

  if (revealTargets.length) {
    const showNow = (el) => el.classList.add("is-visible");
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      revealTargets.forEach(showNow);
    } else {
      revealTargets.forEach((el) => el.classList.add("reveal"));

      let handled = false;

      // Dependency-free fallback: reveal via CSS transition on scroll.
      const cssFallback = () => {
        if (handled) return;
        handled = true;
        if ("IntersectionObserver" in window) {
          const io = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  showNow(entry.target);
                  io.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.12 }
          );
          revealTargets.forEach((el) => io.observe(el));
        } else {
          revealTargets.forEach(showNow);
        }
      };

      // Preferred path: spring + stagger via Motion.
      import(MOTION_CDN)
        .then(({ animate, inView, stagger }) => {
          if (handled) return; // safety timeout already revealed everything
          handled = true;

          // Group reveal targets by parent so cards/list items in the same
          // row stagger in together as the group scrolls into view.
          const groups = new Map();
          revealTargets.forEach((el) => {
            const parent = el.parentElement;
            if (!groups.has(parent)) groups.set(parent, []);
            groups.get(parent).push(el);
          });

          groups.forEach((els) => {
            inView(
              els[0],
              () => {
                animate(
                  els,
                  { opacity: [0, 1], y: [26, 0] },
                  { type: "spring", duration: 0.7, bounce: 0.28, delay: stagger(0.08) }
                );
                els.forEach(showNow); // keep the CSS final state in sync
              },
              { amount: 0.12 }
            );
          });
        })
        .catch(cssFallback);

      // Never leave content hidden if Motion stalls; also cover print capture.
      window.setTimeout(cssFallback, 2500);
      window.addEventListener("beforeprint", () =>
        revealTargets.forEach(showNow)
      );
    }
  }

  /* ---- Mortgage Strategy hero avatar: tap for sound ---- */
  const msAvatar = document.getElementById("msAvatar");
  const msSound = document.getElementById("msAvatarSound");
  if (msAvatar) {
    const setMuted = (m) => {
      msAvatar.muted = m;
      if (msSound) {
        msSound.classList.toggle("is-muted", m);
        msSound.setAttribute("aria-label", m ? "Turn on Orange's sound" : "Mute Orange");
      }
      if (!m) { try { msAvatar.play(); } catch (e) {} }
    };
    setMuted(true); // start muted so autoplay is allowed; class is the state source
    const isMuted = () =>
      msSound ? msSound.classList.contains("is-muted") : msAvatar.muted;
    const toggle = () => setMuted(!isMuted());
    if (msSound) msSound.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });
    msAvatar.addEventListener("click", toggle);
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
