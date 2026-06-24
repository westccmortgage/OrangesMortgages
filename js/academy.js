/* ============================================================
   Ask Orange Academy — guided education engine (Phase 1)
   ------------------------------------------------------------
   Renders the learning experience from window.OrangeEducation
   (js/data/orangeEducationTopics.js). No AI / API / backend.
   Phase 2: the same topic data can ground a real AI assistant;
   this UI stays as the curated, safe fallback.
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.OrangeEducation;
  if (!DATA) return; // data file missing → fail safe (page still renders chrome)

  var BRAND = DATA.brand;
  var SEEN_KEY = "ao_seen_topics";

  /* ---------- tiny helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function seen() {
    try { return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function markSeen(id) {
    var s = seen();
    if (s.indexOf(id) === -1) { s.push(id); }
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function pathPct(pathId) {
    var topics = DATA.byPath(pathId);
    if (!topics.length) return 0;
    var s = seen(), done = 0;
    topics.forEach(function (t) { if (s.indexOf(t.id) !== -1) done++; });
    return Math.round((done / topics.length) * 100);
  }
  function pathDone(pathId) {
    var topics = DATA.byPath(pathId), s = seen(), done = 0;
    topics.forEach(function (t) { if (s.indexOf(t.id) !== -1) done++; });
    return done;
  }

  /* ---------- element refs (filled on init) ---------- */
  var els = {};
  var state = { path: null, topic: null };

  /* ============================================================
     RENDER: "Choose your situation" chips (hero)
     ============================================================ */
  function renderSituations() {
    var wrap = els.situations;
    if (!wrap) return;
    wrap.innerHTML = "";
    DATA.situations.forEach(function (s) {
      var b = el("button", "ao-sit", '<span class="ao-sit__emoji" aria-hidden="true">' + s.emoji + "</span>" +
        '<span class="ao-sit__label">' + esc(s.label) + "</span>");
      b.type = "button";
      b.setAttribute("data-ao-situation", s.path);
      wrap.appendChild(b);
    });
  }

  /* ============================================================
     RENDER: left sidebar — learning paths + topic navigation
     ============================================================ */
  function renderPaths() {
    var wrap = els.paths;
    if (!wrap) return;
    wrap.innerHTML = "";
    DATA.paths.forEach(function (p) {
      var topics = DATA.byPath(p.id);
      var item = el("div", "ao-path" + (state.path === p.id ? " is-active" : ""));
      item.setAttribute("data-path", p.id);

      var head = el("button", "ao-path__head",
        '<span class="ao-path__emoji" aria-hidden="true">' + p.emoji + "</span>" +
        '<span class="ao-path__meta">' +
          '<span class="ao-path__title">' + esc(p.title) + "</span>" +
          '<span class="ao-path__count">' + pathDone(p.id) + " / " + topics.length + " · " +
            esc(p.blurb) + "</span>" +
        "</span>" +
        '<span class="ao-path__pct" aria-hidden="true">' + pathPct(p.id) + "%</span>");
      head.type = "button";
      head.setAttribute("data-ao-path", p.id);
      head.setAttribute("aria-expanded", state.path === p.id ? "true" : "false");
      item.appendChild(head);

      var bar = el("span", "ao-path__bar");
      bar.appendChild(el("i", null, "")).style.width = pathPct(p.id) + "%";
      item.appendChild(bar);

      // topic sub-list (only meaningful when expanded; CSS handles show/hide)
      var list = el("ul", "ao-path__topics");
      var s = seen();
      topics.forEach(function (t, i) {
        var li = el("li", null,
          '<button type="button" class="ao-toplink' +
            (state.topic === t.id ? " is-current" : "") +
            (s.indexOf(t.id) !== -1 ? " is-seen" : "") + '" data-ao-topic="' + t.id + '">' +
            '<span class="ao-toplink__n" aria-hidden="true">' + (i + 1) + "</span>" +
            '<span class="ao-toplink__q">' + esc(t.question) + "</span>" +
          "</button>");
        list.appendChild(li);
      });
      item.appendChild(list);
      wrap.appendChild(item);
    });
    updateOverallProgress();
  }

  function updateOverallProgress() {
    var total = DATA.topics.length;
    var done = seen().filter(function (id) { return !!DATA.byId(id); }).length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    if (els.progFill) els.progFill.style.width = pct + "%";
    if (els.progText) els.progText.textContent = done + " of " + total + " topics explored";
  }

  /* ============================================================
     RENDER: main answer card
     ============================================================ */
  function followupsHtml(topic) {
    if (!topic.followUpQuestions || !topic.followUpQuestions.length) return "";
    var chips = topic.followUpQuestions.map(function (f) {
      var to = f.to && DATA.byId(f.to) ? f.to : "";
      return '<button type="button" class="ao-next__chip" ' +
        (to ? 'data-ao-topic="' + to + '"' : 'data-ao-search="' + esc(f.q) + '"') + ">" +
        '<span aria-hidden="true">💬</span> ' + esc(f.q) + "</button>";
    }).join("");
    return '<div class="ao-next">' +
      '<p class="ao-next__title">🍊 Ask ' + esc(BRAND.name) + " next</p>" +
      '<div class="ao-next__chips">' + chips + "</div></div>";
  }

  function renderCard(topic) {
    if (!els.stage) return;
    var p = DATA.paths.filter(function (x) { return x.id === topic.path; })[0] || {};
    var stepIdx = DATA.byPath(topic.path).map(function (t) { return t.id; }).indexOf(topic.id);

    var html =
      '<article class="ao-card" id="ao-answer">' +
        '<header class="ao-card__head">' +
          '<span class="ao-card__path">' + (p.emoji || "🍊") + " " + esc(p.title || "Ask Orange") +
            ' · Topic ' + (stepIdx + 1) + " of " + DATA.byPath(topic.path).length + "</span>" +
          '<div class="ao-card__tools">' +
            '<button type="button" class="ao-tool" data-ao-share aria-label="Copy a link to this topic">' +
              '<span aria-hidden="true">🔗</span> Save / share</button>' +
          "</div>" +
        "</header>" +

        '<div class="ao-card__qrow">' +
          '<span class="ao-card__avatar" aria-hidden="true">🍊</span>' +
          '<h2 class="ao-card__q">' + esc(topic.question) + "</h2>" +
        "</div>" +

        '<p class="ao-card__answer">' + esc(topic.shortAnswer) + "</p>" +

        '<div class="ao-block ao-block--why">' +
          '<p class="ao-block__label">Why this matters</p>' +
          "<p>" + esc(topic.whyItMatters) + "</p>" +
        "</div>" +

        '<div class="ao-block ao-block--mistake">' +
          '<p class="ao-block__label">⚠️ Common mistake</p>' +
          "<p>" + esc(topic.commonMistake) + "</p>" +
        "</div>" +

        followupsHtml(topic) +

        '<div class="ao-card__cta">' +
          "<p>" + esc(topic.nextBestStep || ("Want " + BRAND.name + " to review your situation?")) + "</p>" +
          '<div class="ao-card__cta-actions">' +
            '<a class="btn btn--primary" href="' + esc(BRAND.contactUrl) + '">Ask ' + esc(BRAND.name) + "</a>" +
            '<a class="ao-card__email" href="mailto:' + esc(BRAND.email) + '">' + esc(BRAND.email) + "</a>" +
          "</div>" +
        "</div>" +

        '<p class="ao-card__disc">' + esc(DATA.disclaimer) + "</p>" +

        '<nav class="ao-card__nav" aria-label="Topic navigation">' +
          (stepIdx > 0
            ? '<button type="button" class="btn btn--ghost btn--sm" data-ao-step="prev">← Previous</button>'
            : "<span></span>") +
          (stepIdx < DATA.byPath(topic.path).length - 1
            ? '<button type="button" class="btn btn--ghost btn--sm" data-ao-step="next">Next topic →</button>'
            : '<a class="btn btn--ghost btn--sm" href="' + esc(BRAND.contactUrl) + '">Finish — Ask ' + esc(BRAND.name) + " →</a>") +
        "</nav>" +
      "</article>";

    els.stage.innerHTML = html;
  }

  function renderPathIntro(pathId) {
    var p = DATA.paths.filter(function (x) { return x.id === pathId; })[0];
    if (!p || !els.stage) return;
    var topics = DATA.byPath(pathId);
    var list = topics.map(function (t, i) {
      return '<button type="button" class="ao-introtopic" data-ao-topic="' + t.id + '">' +
        '<span class="ao-introtopic__n">' + (i + 1) + "</span>" +
        '<span class="ao-introtopic__q">' + esc(t.question) + "</span>" +
        '<span class="ao-introtopic__go" aria-hidden="true">→</span></button>';
    }).join("");
    els.stage.innerHTML =
      '<div class="ao-intro">' +
        '<span class="ao-intro__emoji" aria-hidden="true">' + p.emoji + "</span>" +
        "<h2>" + esc(p.title) + "</h2>" +
        '<p class="ao-intro__blurb">' + esc(p.blurb) + "</p>" +
        '<div class="ao-introlist">' + list + "</div>" +
      "</div>";
  }

  /* ============================================================
     RENDER: search results
     ============================================================ */
  function searchTopics(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/);
    return DATA.topics.map(function (t) {
      var hay = (t.question + " " + t.shortAnswer + " " + (t.tags || []).join(" ") + " " +
        (t.category || "") + " " + (t.borrowerType || "")).toLowerCase();
      var score = 0;
      terms.forEach(function (term) {
        if (t.question.toLowerCase().indexOf(term) !== -1) score += 3;
        else if ((t.tags || []).join(" ").toLowerCase().indexOf(term) !== -1) score += 2;
        else if (hay.indexOf(term) !== -1) score += 1;
      });
      return { t: t, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (r) { return r.t; });
  }

  function renderSearchResults(q) {
    var results = searchTopics(q);
    if (!els.stage) return;
    if (!results.length) {
      els.stage.innerHTML =
        '<div class="ao-intro">' +
          '<span class="ao-intro__emoji" aria-hidden="true">🔍</span>' +
          "<h2>No topic matched “" + esc(q) + "” yet</h2>" +
          '<p class="ao-intro__blurb">Try a simpler word like “credit”, “down payment”, “jumbo”, “DTI”, or “self-employed” — or ask ' +
            esc(BRAND.name) + " directly.</p>" +
          '<div class="ao-card__cta-actions" style="justify-content:center">' +
            '<a class="btn btn--primary" href="' + esc(BRAND.contactUrl) + '">Ask ' + esc(BRAND.name) + "</a>" +
          "</div>" +
        "</div>";
      return;
    }
    var list = results.map(function (t) {
      var p = DATA.paths.filter(function (x) { return x.id === t.path; })[0] || {};
      return '<button type="button" class="ao-result" data-ao-topic="' + t.id + '">' +
        '<span class="ao-result__q">' + esc(t.question) + "</span>" +
        '<span class="ao-result__path">' + (p.emoji || "🍊") + " " + esc(p.title || "") + "</span>" +
        "</button>";
    }).join("");
    els.stage.innerHTML =
      '<div class="ao-search-head"><h2>' + results.length + ' topic' + (results.length > 1 ? "s" : "") +
        ' for “' + esc(q) + '”</h2></div>' +
      '<div class="ao-results">' + list + "</div>";
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function setHash(topicId) {
    var h = topicId ? "#t=" + topicId : (state.path ? "#p=" + state.path : "");
    if (("#" + (location.hash || "").replace(/^#/, "")) !== h) {
      try { history.replaceState(null, "", location.pathname + location.search + h); }
      catch (e) { location.hash = h.replace(/^#/, ""); }
    }
  }

  function openPath(pathId, opts) {
    if (!DATA.paths.some(function (p) { return p.id === pathId; })) return;
    state.path = pathId;
    state.topic = null;
    renderPaths();
    renderPathIntro(pathId);
    setHash(null);
    if (!opts || !opts.silent) scrollToStage();
  }

  function openTopic(id, opts) {
    var topic = DATA.byId(id);
    if (!topic) return;
    state.path = topic.path;
    state.topic = id;
    markSeen(id);
    renderPaths();
    renderCard(topic);
    setHash(id);
    if (!opts || !opts.silent) scrollToStage();
  }

  function stepTopic(dir) {
    if (!state.topic) return;
    var topic = DATA.byId(state.topic);
    var arr = DATA.byPath(topic.path);
    var i = arr.map(function (t) { return t.id; }).indexOf(state.topic);
    var j = dir === "prev" ? i - 1 : i + 1;
    if (j >= 0 && j < arr.length) openTopic(arr[j].id);
  }

  function scrollToStage() {
    if (!els.stageWrap) return;
    var top = els.stageWrap.getBoundingClientRect().top + window.pageYOffset - 90;
    try { window.scrollTo({ top: top, behavior: "smooth" }); }
    catch (e) { window.scrollTo(0, top); }
  }

  function doShare() {
    var url = location.href;
    function toast() {
      var btn = $("[data-ao-share]");
      if (btn) {
        var old = btn.innerHTML;
        btn.innerHTML = '<span aria-hidden="true">✅</span> Link copied';
        setTimeout(function () { btn.innerHTML = old; }, 1800);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(toast, function () { window.prompt("Copy this link:", url); });
    } else {
      window.prompt("Copy this link:", url);
    }
  }

  /* ============================================================
     ROUTING from URL hash
     ============================================================ */
  function routeFromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    var m;
    if ((m = h.match(/^t=(.+)$/)) && DATA.byId(m[1])) { openTopic(m[1], { silent: true }); return true; }
    if ((m = h.match(/^p=(.+)$/)) && DATA.paths.some(function (p) { return p.id === m[1]; })) {
      openPath(m[1], { silent: true }); return true;
    }
    return false;
  }

  /* ============================================================
     EVENTS (delegation)
     ============================================================ */
  function bind() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-ao-topic]");
      if (t) { e.preventDefault(); openTopic(t.getAttribute("data-ao-topic")); return; }

      var p = e.target.closest("[data-ao-path]");
      if (p) { e.preventDefault(); openPath(p.getAttribute("data-ao-path")); return; }

      var s = e.target.closest("[data-ao-situation]");
      if (s) {
        e.preventDefault();
        var firstTopics = DATA.byPath(s.getAttribute("data-ao-situation"));
        if (firstTopics.length) openTopic(firstTopics[0].id);
        else openPath(s.getAttribute("data-ao-situation"));
        return;
      }

      var sr = e.target.closest("[data-ao-search]");
      if (sr) {
        e.preventDefault();
        if (els.search) { els.search.value = sr.getAttribute("data-ao-search"); }
        renderSearchResults(sr.getAttribute("data-ao-search"));
        scrollToStage();
        return;
      }

      if (e.target.closest("[data-ao-share]")) { e.preventDefault(); doShare(); return; }

      var step = e.target.closest("[data-ao-step]");
      if (step) { e.preventDefault(); stepTopic(step.getAttribute("data-ao-step")); return; }

      if (e.target.closest("[data-ao-start]")) {
        e.preventDefault();
        openPath(DATA.paths[0].id);
        return;
      }
      if (e.target.closest("[data-ao-ask]")) {
        e.preventDefault();
        if (els.search) { els.search.focus(); els.search.scrollIntoView({ behavior: "smooth", block: "center" }); }
        return;
      }
    });

    if (els.search) {
      var timer = null;
      els.search.addEventListener("input", function () {
        var q = els.search.value;
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (q.trim()) renderSearchResults(q);
          else if (state.topic) openTopic(state.topic, { silent: true });
          else if (state.path) renderPathIntro(state.path);
        }, 180);
      });
      els.search.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          var res = searchTopics(els.search.value);
          if (res.length) { openTopic(res[0].id); }
          else renderSearchResults(els.search.value);
        }
      });
    }

    window.addEventListener("hashchange", function () { routeFromHash(); });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    els.situations = $("#aoSituations");
    els.paths = $("#aoPaths");
    els.stage = $("#aoStage");
    els.stageWrap = $("#aoStageWrap");
    els.search = $("#aoSearch");
    els.progFill = $("#aoProgFill");
    els.progText = $("#aoProgText");

    renderSituations();
    state.path = DATA.paths[0].id;
    renderPaths();
    bind();

    if (!routeFromHash()) {
      renderPathIntro(state.path);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
