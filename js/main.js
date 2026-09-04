/* ============================================================
   Orange Mortgage — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Google Ads + first-party attribution ---- */
  const ADS_ID = "AW-18417657219";
  const LEAD_DESTINATION = "AW-18417657219/LiA7CPWd4eocEIPLnM5E";
  const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
  const ATTR_PREFIX = "orange_attr_";
  const PENDING_KEY = "orange_pending_lead";

  const safeGet = (key) => { try { return localStorage.getItem(key) || ""; } catch (_) { return ""; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const sessionGet = (key) => { try { return sessionStorage.getItem(key) || ""; } catch (_) { return ""; } };
  const sessionSet = (key, value) => { try { sessionStorage.setItem(key, value); } catch (_) {} };
  const sessionRemove = (key) => { try { sessionStorage.removeItem(key); } catch (_) {} };
  const leadId = () => "orange_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ADS_ID);
  if (!document.querySelector("script[data-orange-google-ads]")) {
    const ads = document.createElement("script");
    ads.async = true;
    ads.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ADS_ID);
    ads.setAttribute("data-orange-google-ads", "");
    document.head.appendChild(ads);
  }

  if (window.URLSearchParams) {
    const qs = new URLSearchParams(window.location.search);
    ATTR_KEYS.forEach((key) => {
      const value = qs.get(key);
      if (value) safeSet(ATTR_PREFIX + key, value);
    });
  }
  if (!safeGet(ATTR_PREFIX + "landing_page")) safeSet(ATTR_PREFIX + "landing_page", window.location.href);

  function syncAttribution(form) {
    if (!form) return;
    const values = {};
    ATTR_KEYS.forEach((key) => { values[key] = safeGet(ATTR_PREFIX + key); });
    values.landing_page = safeGet(ATTR_PREFIX + "landing_page") || window.location.href;
    values.submission_page = window.location.href;
    Object.keys(values).forEach((key) => {
      let input = form.querySelector('input[name="' + key + '"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        form.appendChild(input);
      }
      input.value = values[key] || "";
    });
  }

  function fireLeadConversion(id, formName) {
    if (!id) return;
    window.dataLayer.push({
      event: "orange_lead_submit",
      lead_event_id: id,
      form_name: formName || "ask-orange",
      page_location: window.location.href
    });
    window.gtag("event", "conversion", {
      send_to: LEAD_DESTINATION,
      value: 1.0,
      currency: "USD",
      transaction_id: id
    });
  }

  function consumeConfirmedLead() {
    if (!/^\/thank-you(?:\.html)?\/?$/.test(window.location.pathname)) return;
    const raw = sessionGet(PENDING_KEY);
    if (!raw) return;
    let item;
    try { item = JSON.parse(raw); } catch (_) { sessionRemove(PENDING_KEY); return; }
    if (!item || !item.id || !item.ts || Date.now() - item.ts > 30 * 60 * 1000) {
      sessionRemove(PENDING_KEY);
      return;
    }
    sessionRemove(PENDING_KEY);
    fireLeadConversion(item.id, item.form_name);
  }

  /* ---- Sticky nav shadow on scroll ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    if (!links || !toggle) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

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

  if (inputs.price && inputs.down && inputs.rate && inputs.term) {
    Object.values(inputs).forEach((el) =>
      el.addEventListener("input", calc)
    );
    calc();
    document.addEventListener("om:lang", calc);
  }

  /* ---- Founder experience year consistency ---- */
  const founderExperience = document.querySelector('[data-i18n="ab.fo.c2"]');
  const syncFounderExperienceYear = () => {
    if (founderExperience) {
      founderExperience.textContent = founderExperience.textContent.replace("2001", "2004");
    }
  };
  syncFounderExperienceYear();
  document.addEventListener("om:lang", () => window.setTimeout(syncFounderExperienceYear, 0));

  /* ---- Lead form ----
     Netlify accepts the submission first, then redirects to /thank-you.
     We only mark a pending lead here; the conversion fires on the confirmed
     thank-you page, so button clicks and failed submissions never count. ---- */
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    syncAttribution(leadForm);
    leadForm.addEventListener("submit", () => {
      syncAttribution(leadForm);
      sessionSet(PENDING_KEY, JSON.stringify({
        id: leadId(),
        ts: Date.now(),
        form_name: leadForm.getAttribute("name") || "ask-orange"
      }));
    });
  }
  consumeConfirmedLead();

  /* ---- Ask Orange floating assistant ---- */
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

    panel.querySelectorAll(".js-ask-close").forEach((a) =>
      a.addEventListener("click", closePanel)
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", (e) => {
      if (!panel.hidden && !ask.contains(e.target)) closePanel();
    });
  }

  /* ---- Strategy Studio iframe auto-resize ---- */
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

    const revealAll = () =>
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    window.addEventListener("beforeprint", revealAll);
    window.setTimeout(revealAll, 2500);
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
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
    setMuted(true);
    const isMuted = () =>
      msSound ? msSound.classList.contains("is-muted") : msAvatar.muted;
    const toggleSound = () => setMuted(!isMuted());
    if (msSound) msSound.addEventListener("click", (e) => { e.stopPropagation(); toggleSound(); });
    msAvatar.addEventListener("click", toggleSound);
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
