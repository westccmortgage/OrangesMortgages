/* ============================================================
   Orange Mortgage — lightweight i18n (EN / RU / ES)
   - Translatable text: data-i18n="key"
   - Placeholders:      data-i18n-ph="key"
   - aria-labels:       data-i18n-aria="key"
   - <meta content>:    data-i18n-content="key" (and <title data-i18n>)
   - Language persists in localStorage and can be set via ?lang=ru|es|en
   - Dynamic strings (e.g. calculator) use window.OMi18n.t(key, vars)
     and listen for the "om:lang" event to re-render.
   ============================================================ */
(function () {
  "use strict";

  var LANGS = ["en", "ru", "es"];

  var STR = {
    en: {
      "lang.label": "Language",

      "nav.loans": "Loan Options", "nav.why": "Why Orange", "nav.calc": "Calculator",
      "nav.how": "How It Works", "nav.areas": "Service Areas", "nav.about": "About",
      "nav.cta": "Get Pre-Approved",

      "hero.eyebrow": "🍊 Your Friendly Mortgage Guide for California & Florida",
      "hero.h1": `Hi, I'm <span class="accent">Orange.</span><br />Home financing made <span class="accent">simple.</span>`,
      "hero.lead": "Smart mortgage guidance for buyers, homeowners, and investors across California and Florida — without pressure, confusion, or jargon.",
      "hero.ask": "Ask Orange", "hero.estimate": "Estimate My Payment",
      "hero.trust1": "Licensed Mortgage<br />Guidance",
      "hero.trust2": "Serving California<br />&amp; Florida",
      "hero.trust3": "Purchase, Refinance<br />&amp; Investment Loans",
      "hero.disclaimer": "Orange provides general mortgage education. Final loan options depend on full application, credit, income, property, and lender approval.",

      "badge.1": "Licensed Mortgage Guidance", "badge.2": "California & Florida",
      "badge.3": "Purchase & Refinance", "badge.4": "Investment & Jumbo Loans",
      "badge.5": "Equal Housing Lender",

      "help.eyebrow": "What Orange Helps With",
      "help.h2": "Solutions for every kind of homeowner",
      "help.p": "Wherever you are in the journey, Orange helps you understand your options and your next step.",
      "help.1t": "First-Time Home Buyers", "help.1p": "Understand each step, from budgeting to keys in hand — at your pace.",
      "help.2t": "Jumbo Loans", "help.2p": "Navigate higher loan amounts for Orange County's higher-priced homes.",
      "help.3t": "Refinance Options", "help.3p": "See whether refinancing could fit your goals before you commit.",
      "help.4t": "Investment Property Loans", "help.4p": "Finance rentals and build a portfolio with strategy-first guidance.",
      "help.5t": "Self-Employed Borrowers", "help.5p": "Explore options designed for non-traditional and variable income.",
      "help.6t": "Payment Strategy", "help.6p": "Compare scenarios to find a monthly payment that feels comfortable.",
      "help.link": "Ask Orange →",

      "loans.eyebrow": "Loan Options",
      "loans.h2": "The right loan starts with the right strategy",
      "loans.p": "Orange walks you through the programs and helps you understand which fits your situation — no rate promises, just clear guidance.",
      "loans.moment": "🍊 Orange explains every program in plain English.",
      "loans.1t": "Conventional", "loans.1p": "Flexible financing for primary homes, with a range of down-payment options.",
      "loans.2t": "Jumbo", "loans.2p": "Financing above conforming limits for Orange County's higher-priced homes.",
      "loans.3t": "FHA", "loans.3p": "Government-backed loans with flexible qualifying for the right borrower.",
      "loans.4t": "VA", "loans.4p": "Benefits for eligible veterans, active-duty service members, and spouses.",
      "loans.5t": "DSCR", "loans.5p": "Qualify an investment property on its rental income, not personal income.",
      "loans.6t": "Refinance", "loans.6p": "Explore adjusting your rate or term, or tapping into your home equity.",

      "why.eyebrow": "Why Orange",
      "why.h2": "A mortgage guide who makes the process easier",
      "why.1t": "California & Florida focus", "why.1p": "Wherever you're buying, Orange helps you close with confidence — not just quote a rate.",
      "why.2t": "Clear explanation of your options", "why.2p": "Every program and number explained simply, so you can decide with confidence.",
      "why.3t": "Fast digital application", "why.3p": "A modern, paperless process you can start from your phone in minutes.",
      "why.4t": "Human help when you need it", "why.4p": "A real person to talk to whenever a question comes up — no call centers.",
      "why.5t": "No confusing mortgage jargon", "why.5p": "Plain-language answers that respect your time and your decision.",

      "calc.eyebrow": "Mortgage Calculator",
      "calc.h2": "See an estimated payment in seconds",
      "calc.moment": "🍊 Orange helps you estimate — then turns it into a plan.",
      "calc.p": "Adjust the numbers for an instant estimate of principal & interest. When you're ready, Orange builds a personalized strategy around your real goals.",
      "calc.cta": "Get My Personalized Strategy →",
      "calc.price": "Home Price", "calc.down": "Down Payment",
      "calc.rate": "Interest Rate (for estimate)", "calc.term": "Loan Term",
      "calc.result": "Estimated monthly payment",
      "calc.disclaimer": "Estimated payment is for educational purposes only and does not include taxes, insurance, HOA, mortgage insurance, or final lender pricing. The interest rate above is an adjustable example, not a rate quote.",
      "calc.loanAmount": "Loan amount {amt} · Principal & interest only",
      "calc.years": "{n} years", "calc.perMo": "/mo", "calc.downOut": "{amt} ({pct}%)",

      "proc.eyebrow": "How It Works",
      "proc.h2": "Four simple steps with Orange",
      "proc.moment": "🍊 Orange walks you through the whole process — start to keys.",
      "proc.1t": "Tell Orange your goal", "proc.1p": "Share what you're trying to do — buy, refinance, or invest.",
      "proc.2t": "Review your loan options", "proc.2p": "Orange walks you through the programs that fit your situation.",
      "proc.3t": "Get pre-approved", "proc.3p": "Apply digitally and understand what you may qualify for.",
      "proc.4t": "Close with confidence", "proc.4p": "Move forward with a clear plan and guidance at every step.",

      "areas.eyebrow": "Service Areas",
      "areas.h2": "Mortgage help across California and Florida",
      "areas.p": "From the California coast to the Florida Keys, Orange helps buyers, homeowners, and investors. Don't see your area? We almost certainly serve it too.",
      "areas.ca": "California", "areas.fl": "Florida",

      "ct.eyebrow": "🍊 Ask Orange",
      "ct.h2": "Ready to ask Orange?",
      "ct.p": "Tell us what you're trying to do, and we'll help you understand your next step — no pressure, no jargon.",
      "ct.perk1": "✓ General mortgage guidance, free",
      "ct.perk2": "✓ A real person, not a call center",
      "ct.perk3": "✓ Clear answers about your options",
      "ct.first": "First name", "ct.last": "Last name", "ct.email": "Email",
      "ct.phone": "Phone", "ct.looking": "I'm looking to", "ct.message": "Message",
      "ct.opt1": "Buy a home", "ct.opt2": "Refinance", "ct.opt3": "Buy investment property",
      "ct.opt4": "Explore jumbo loan", "ct.opt5": "Not sure yet",
      "ct.msgph": "Tell Orange a bit about what you're trying to do…",
      "ct.submit": "Ask Orange →",
      "ct.note": "By submitting this form, you agree to be contacted about your mortgage inquiry. This form is for general mortgage information only and does not constitute a loan approval or commitment to lend.",

      "ask.fabTitle": "Ask Orange", "ask.fabSub": "I'm here to help!",
      "ask.title": "Ask Orange", "ask.sub": "Your Orange County mortgage guide",
      "ask.text": "Orange will soon be able to guide you through your mortgage options right here. In the meantime, pick a starting point:",
      "ask.start": "Start My Strategy", "ask.estimate": "Estimate Payment", "ask.email": "Email Orange",
      "ask.disclaimer": "Orange provides general mortgage education only — not rates, approvals, or specific loan terms. Those depend on a full application and lender review.",
      "ask.close": "Close",

      "foot.brand": "Friendly mortgage guidance across California and Florida. Ask Orange anytime.",
      "foot.loans": "Loans", "foot.company": "Company", "foot.touch": "Get in touch",
      "foot.about": "About Orange", "foot.ask": "Ask Orange",
      "foot.serving": "Serving California & Florida", "foot.hours": "Mon–Sat · 8am–7pm PT",
      "foot.legal": `<strong>Orange Mortgage</strong> is a brand of West Coast Capital Mortgage, Inc. NMLS&nbsp;#2817729 · CA&nbsp;DRE&nbsp;#01385024 · Equal Housing Lender.`,
      "foot.disc": `© <span id="year">2026</span> West Coast Capital Mortgage, Inc. All rights reserved. Orange provides general mortgage education only. Figures and examples shown are illustrative, are not a rate quote or a commitment to lend, and all loans are subject to full application, credit, income, property, and lender approval.`,

      "home.title": "Orange Mortgage — Ask Orange, Your California & Florida Mortgage Guide",
      "home.desc": "Ask Orange. Smart, friendly mortgage guidance for buyers, homeowners, and investors across California and Florida — purchase, refinance, and investment loans, explained without pressure or jargon.",

      "nav.strategy": "Mortgage Strategy",
      "promo.eyebrow": "Property-Location Intelligence",
      "promo.h2": "See your strategy, not just an estimate",
      "promo.p": "Orange reads your scenario against the county line — conforming vs jumbo, an estimated payment, and the smartest review path. Check your limit before you assume jumbo.",
      "promo.cta": "Open Mortgage Strategy →",
      "promo.k1": "Loan amount", "promo.k2": "County line", "promo.k3": "Review path", "promo.kpath": "High-balance",
      "promo.badge": "Strategy Studio",
      "ms.title": "Mortgage Strategy — Check Your County Limit | Orange Mortgage",
      "ms.desc": "Run your property against the county conforming line — conforming vs jumbo, an estimated payment, and the smartest review path. Educational only. California & Florida.",
      "ms.eyebrow": "🍊 Mortgage Strategy",
      "ms.h1": `Check your limit <span class="accent">before you assume jumbo.</span>`,
      "ms.lead": "Tell Orange the property and your numbers. The studio runs them against your county's conforming line and shows conforming vs jumbo, an estimated payment, and the review path — for California and Florida.",
      "ms.p1": "Confirm the property county",
      "ms.p2": "See the conforming vs jumbo line",
      "ms.p3": "Preview an estimated payment",
      "ms.disclaimer": "Educational structure estimate only — not a rate quote, APR, loan estimate, approval, or commitment to lend. All numbers are owner-provided assumptions; verify current FHFA/HUD limits and pricing before relying on any figure.",
      "ms.toolLabel": "Strategy Studio",

      "nav.family": "Family",
      "nav.academy": "Academy",
      "fam.title": "The Orange Family — Mortgages with a Family Touch | Orange Mortgage",
      "fam.desc": "Meet the Orange family. Warm, trustworthy mortgage guidance for families across California and Florida — your first home, your next home, and building for the kids.",
      "fam.eyebrow": "🍊 The Orange Family",
      "fam.h1": `A family helping <span class="accent">your family</span> feel at home.`,
      "fam.lead": "From your first home to your forever home, the Orange family treats every client like one of their own — calm, clear, caring guidance across California and Florida.",
      "fam.tag": "Family first.",
      "fam.helpEyebrow": "How the Orange family helps",
      "fam.helpH2": "Every family, every chapter",
      "fam.c1t": "First-time families", "fam.c1p": "Buying your first home together, explained step by step — no pressure, no jargon.",
      "fam.c2t": "Growing families", "fam.c2p": "More room for more love. Move up with a plan that fits your real budget.",
      "fam.c3t": "Building for the kids", "fam.c3p": "Investment and multi-generational options to build something that lasts.",
      "fam.c4t": "Always a real person", "fam.c4p": "When you call, you get family — never a call center.",
      "fam.valuesH2": "Buying a home is a family moment.",
      "fam.valuesP": "Orange is here to make it joyful, not stressful — with honest guidance you can trust, in English, Español, or Русский.",
      "fam.ctaH2": "Let's find your family's home",
      "fam.ctaP": "Tell Orange what your family is dreaming about, and we'll help you understand the next step — across California and Florida.",

      /* ---- About page ---- */
      "ab.subEyebrow": "🍊 The (mostly true) story",
      "ab.h1": `Meet <span class="accent">Orange</span>`,
      "ab.lead": "Part citrus, part mortgage guide, fully committed to helping people across California and Florida buy, refinance, and invest with confidence. He's the friendly face of <strong>West Coast Capital Mortgage, Inc.</strong> — here to make home financing simple, smart, and a little more fun.",
      "ab.origin.eyebrow": "Origin Story",
      "ab.origin.h2": "How a citrus became a closer",
      "ab.origin.p": "Every great mascot has a humble beginning. Orange's just happens to involve a grove, a tiny navy suit, and an unhealthy obsession with interest rates.",
      "ab.tl1y": "Day One", "ab.tl1h": "Born in an Orange County grove 🌳", "ab.tl1p": "Orange popped off the branch with a leaf on his head, big curious eyes, and a feeling that he was destined for something bigger than a fruit bowl.",
      "ab.tl2y": "The Glow-Up", "ab.tl2h": "Found the navy suit 👔", "ab.tl2p": "One day he tried on a sharp navy suit and orange tie. It fit perfectly. The little house pin on the lapel? That was the moment he knew: mortgages.",
      "ab.tl3y": "The Calling", "ab.tl3h": "Fell head over peel for home loans 🏡", "ab.tl3p": "While neighbors were busy being juice, Orange was reading rate sheets, comparing loan programs, and helping families understand what they could afford.",
      "ab.tl4y": "Today", "ab.tl4h": "Orange County's friendliest guide ⭐", "ab.tl4p": "Now he helps buyers, homeowners, and investors understand their options — backed by the licensed team at West Coast Capital Mortgage, Inc.",
      "ab.ff.eyebrow": "Know Your Orange", "ab.ff.h2": "A few (peelable) fun facts",
      "ab.ff1t": "100% locally grown", "ab.ff1p": "Orange County focused. He knows the neighborhoods, the market, and where to find the best tacos after a closing.",
      "ab.ff2t": "Vitamin C-losing speed", "ab.ff2p": "A fast, modern, paperless process that keeps things moving — no squeezing required.",
      "ab.ff3t": "Always picks up", "ab.ff3p": "No call centers, no runaround. When you reach out to Orange, you get a real person — every step of the way.",
      "ab.ff4t": "Jumbo-loan whisperer", "ab.ff4p": "From cozy condos to coastal estates, Orange has a soft spot for Orange County's higher-priced homes.",
      "ab.ff5t": "By-the-book citrus", "ab.ff5p": "Charming, yes — but fully licensed and compliant. Every loan is handled the right way.",
      "ab.ff6t": "In your corner", "ab.ff6p": "Orange treats every client like a neighbor, because in Orange County, you probably are one.",
      "ab.mis.eyebrow": "Our Mission", "ab.mis.h2": "Financing made clear, honest, and built around your goals",
      "ab.mis.p": "West Coast Capital Mortgage, Inc. is a modern mortgage company focused on helping people buy homes, refinance, and build equity with confidence. We pair efficient technology with experienced, licensed guidance.",
      "ab.v1t": "Clear guidance", "ab.v1p": "Straight answers and transparent options.",
      "ab.v2t": "Smart solutions", "ab.v2p": "A full range of programs for every borrower.",
      "ab.v3t": "Technology + people", "ab.v3p": "Modern tools backed by real advisors.",
      "ab.v4t": "Borrower-first", "ab.v4p": "No hype, no pressure — just a smooth process.",
      "ab.fo.eyebrow": "Founder & Mortgage Professional", "ab.fo.h2": "Meet Anatoliy Kanevsky",
      "ab.fo.role": "Founder · West Coast Capital Mortgage, Inc.",
      "ab.fo.c1": "California Real Estate Broker", "ab.fo.c2": "Mortgage professional since 2001",
      "ab.fo.c3": "Luxury real estate & development experience",
      "ab.fo.c4": "Purchase, refinance, jumbo, Non-QM, DSCR & self-employed borrower strategy",
      "ab.fo.p1": "Anatoliy Kanevsky is the founder of West Coast Capital Mortgage, Inc. and a California real estate and mortgage professional with decades of experience helping borrowers, investors, and real estate clients navigate complex financing decisions.",
      "ab.fo.p2": "His background combines mortgage lending, real estate brokerage, luxury residential development, and real-world deal analysis. That perspective allows West Coast Capital Mortgage to approach every client scenario with both lending discipline and practical real estate experience.",
      "ab.fo.p3": "Whether a client is buying a primary residence, refinancing, purchasing a luxury property, financing an investment property, or exploring self-employed, Non-QM, jumbo, FHA, VA, or DSCR options, Anatoliy's focus is simple: clear guidance, smart structure, and a mortgage strategy that fits the client's actual situation.",
      "ab.lic.eyebrow": "Licensing & Company", "ab.lic.h2": "The licensed company behind Orange",
      "ab.lic.p": "Orange is the fun, friendly brand. The trust, licensing, and lending come from a real, regulated mortgage company.",
      "ab.co.p": `<strong>Orange Mortgage</strong> (OrangesMortgages.com) is the consumer brand of <strong>West Coast Capital Mortgage, Inc.</strong> All loans are originated by West Coast Capital Mortgage, Inc. in accordance with state and federal lending law.`,
      "ab.co.ehl": "Equal Housing Lender",
      "ab.co.entity": "Legal entity", "ab.co.nmls": "NMLS ID", "ab.co.dre": "California DRE",
      "ab.co.serving": "Serving", "ab.co.servingV": "Orange County & California",
      "ab.co.servingS": "Irvine, Newport Beach, Laguna Beach, Huntington Beach, Anaheim, Costa Mesa, Fullerton & more",
      "ab.co.emailL": "Email", "ab.co.phoneL": "Phone", "ab.co.siteL": "Corporate site",
      "ab.co.nmlsS": "Verify on NMLS Consumer Access", "ab.co.dreS": "Licensed by the California Department of Real Estate",
      "ab.disc": `West Coast Capital Mortgage, Inc. — NMLS #2817729, California DRE #01385024. Equal Housing Lender. Orange is a brand mascot and does not change the terms of any loan. This page is for general education and informational purposes only and is not a commitment to lend or an offer to extend credit. All loans are subject to full application, credit approval, income verification, and property appraisal. Rates, programs, and terms are subject to change without notice. Verify license status anytime via <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">NMLS Consumer Access</a>.`,
      "ab.cta.h2": "Ready to ask Orange?",
      "ab.cta.p": "Whether you're buying, refinancing, or investing — Orange and the West Coast Capital Mortgage team are here to help you understand your next step.",
      "about.title": "About Orange — West Coast Capital Mortgage, Inc. | Orange Mortgage",
      "about.desc": "Meet Orange, the friendly brand of West Coast Capital Mortgage, Inc. — a modern mortgage company led by founder Anatoliy Kanevsky. Clear, honest guidance for buyers, homeowners, and investors across California and Florida.",

      /* ---- Thank-you page ---- */
      "ty.eyebrow": "🍊 Request received",
      "ty.h1": "Thanks — Orange received your request.",
      "ty.p": "We'll follow up shortly. In the meantime, feel free to explore your options or estimate a payment.",
      "ty.home": "Back to home", "ty.estimate": "Estimate My Payment",
      "ty.title": "Thank You — Orange Mortgage",
      "ty.desc": "Thanks — Orange received your request. We'll follow up shortly."
    },

    ru: {
      "lang.label": "Язык",

      "nav.loans": "Кредиты", "nav.why": "Почему Orange", "nav.calc": "Калькулятор",
      "nav.how": "Как это работает", "nav.areas": "Города", "nav.about": "О нас",
      "nav.cta": "Предв. одобрение",

      "hero.eyebrow": "🍊 Ваш дружелюбный ипотечный гид по Калифорнии и Флориде",
      "hero.h1": `Привет, я <span class="accent">Orange.</span><br />Ипотека — это <span class="accent">просто.</span>`,
      "hero.lead": "Умное сопровождение по ипотеке для покупателей, домовладельцев и инвесторов в Калифорнии и Флориде — без давления, путаницы и сложных терминов.",
      "hero.ask": "Спросить Orange", "hero.estimate": "Рассчитать платёж",
      "hero.trust1": "Лицензированное<br />сопровождение",
      "hero.trust2": "Калифорния<br />и Флорида",
      "hero.trust3": "Покупка, рефинанс<br />&amp; инвест-кредиты",
      "hero.disclaimer": "Orange предоставляет общую ипотечную информацию. Итоговые условия зависят от полной заявки, кредитной истории, дохода, объекта и одобрения кредитора.",

      "badge.1": "Лицензированное сопровождение", "badge.2": "Калифорния и Флорида",
      "badge.3": "Покупка и рефинансирование", "badge.4": "Инвест- и джамбо-кредиты",
      "badge.5": "Равные жилищные возможности",

      "help.eyebrow": "С чем помогает Orange",
      "help.h2": "Решения для любого домовладельца",
      "help.p": "На каком бы этапе вы ни были, Orange поможет разобраться в вариантах и в вашем следующем шаге.",
      "help.1t": "Покупка первого жилья", "help.1p": "Разберём каждый шаг — от бюджета до ключей в руках, в вашем темпе.",
      "help.2t": "Джамбо-кредиты", "help.2p": "Поможем с крупными суммами для дорогого жилья округа Ориндж.",
      "help.3t": "Рефинансирование", "help.3p": "Посмотрим, подходит ли вам рефинансирование, прежде чем решаться.",
      "help.4t": "Кредиты на инвест-недвижимость", "help.4p": "Финансирование аренды и построение портфеля со стратегией.",
      "help.5t": "Самозанятые заёмщики", "help.5p": "Варианты для нестандартного и переменного дохода.",
      "help.6t": "Стратегия платежа", "help.6p": "Сравним сценарии, чтобы найти комфортный ежемесячный платёж.",
      "help.link": "Спросить Orange →",

      "loans.eyebrow": "Виды кредитов",
      "loans.h2": "Правильный кредит начинается с правильной стратегии",
      "loans.p": "Orange проведёт вас по программам и поможет понять, какая подходит именно вам — без обещаний по ставкам, просто понятное сопровождение.",
      "loans.moment": "🍊 Orange объясняет каждую программу простыми словами.",
      "loans.1t": "Conventional", "loans.1p": "Гибкое финансирование основного жилья с разными вариантами первого взноса.",
      "loans.2t": "Jumbo", "loans.2p": "Финансирование сверх стандартных лимитов для дорогого жилья округа Ориндж.",
      "loans.3t": "FHA", "loans.3p": "Кредиты с господдержкой и гибкими требованиями для подходящего заёмщика.",
      "loans.4t": "VA", "loans.4p": "Льготы для ветеранов, действующих военных и их супругов.",
      "loans.5t": "DSCR", "loans.5p": "Квалификация инвест-объекта по арендному доходу, а не личному.",
      "loans.6t": "Рефинансирование", "loans.6p": "Изменить ставку или срок либо использовать капитал в жилье.",

      "why.eyebrow": "Почему Orange",
      "why.h2": "Ипотечный гид, который упрощает процесс",
      "why.1t": "Калифорния и Флорида", "why.1p": "Где бы вы ни покупали, Orange помогает закрыть сделку уверенно — а не просто назвать ставку.",
      "why.2t": "Понятное объяснение вариантов", "why.2p": "Каждая программа и цифра объяснены просто, чтобы вы решали уверенно.",
      "why.3t": "Быстрая онлайн-заявка", "why.3p": "Современный безбумажный процесс, который можно начать с телефона за минуты.",
      "why.4t": "Живая помощь, когда нужно", "why.4p": "Реальный человек, с которым можно поговорить по любому вопросу — без колл-центров.",
      "why.5t": "Без сложных терминов", "why.5p": "Ответы простым языком, уважающие ваше время и ваше решение.",

      "calc.eyebrow": "Ипотечный калькулятор",
      "calc.h2": "Оцените примерный платёж за секунды",
      "calc.moment": "🍊 Orange поможет с расчётом — и превратит его в план.",
      "calc.p": "Подвигайте значения для мгновенной оценки основного долга и процентов. Когда будете готовы, Orange составит персональную стратегию под ваши цели.",
      "calc.cta": "Получить персональную стратегию →",
      "calc.price": "Цена жилья", "calc.down": "Первоначальный взнос",
      "calc.rate": "Процентная ставка (для оценки)", "calc.term": "Срок кредита",
      "calc.result": "Примерный ежемесячный платёж",
      "calc.disclaimer": "Расчёт носит ознакомительный характер и не включает налоги, страхование, сборы ТСЖ, ипотечное страхование и итоговое ценообразование кредитора. Ставка выше — изменяемый пример, а не предложение по ставке.",
      "calc.loanAmount": "Сумма кредита {amt} · только основной долг и проценты",
      "calc.years": "{n} лет", "calc.perMo": "/мес", "calc.downOut": "{amt} ({pct}%)",

      "proc.eyebrow": "Как это работает",
      "proc.h2": "Четыре простых шага с Orange",
      "proc.moment": "🍊 Orange проведёт вас через весь процесс — от старта до ключей.",
      "proc.1t": "Расскажите Orange о цели", "proc.1p": "Поделитесь, что хотите сделать — купить, рефинансировать или инвестировать.",
      "proc.2t": "Изучите варианты кредита", "proc.2p": "Orange проведёт вас по программам, подходящим вашей ситуации.",
      "proc.3t": "Получите предв. одобрение", "proc.3p": "Подайте заявку онлайн и поймите, на что можете рассчитывать.",
      "proc.4t": "Закройте сделку уверенно", "proc.4p": "Двигайтесь вперёд с понятным планом и поддержкой на каждом шаге.",

      "areas.eyebrow": "Города обслуживания",
      "areas.h2": "Помощь с ипотекой в Калифорнии и Флориде",
      "areas.p": "От побережья Калифорнии до Флорида-Кис Orange помогает покупателям, домовладельцам и инвесторам. Не нашли свой регион? Почти наверняка мы работаем и там.",
      "areas.ca": "Калифорния", "areas.fl": "Флорида",

      "ct.eyebrow": "🍊 Спросить Orange",
      "ct.h2": "Готовы спросить Orange?",
      "ct.p": "Расскажите, что хотите сделать, и мы поможем понять ваш следующий шаг — без давления и сложных терминов.",
      "ct.perk1": "✓ Общее ипотечное сопровождение, бесплатно",
      "ct.perk2": "✓ Живой человек, а не колл-центр",
      "ct.perk3": "✓ Понятные ответы о ваших вариантах",
      "ct.first": "Имя", "ct.last": "Фамилия", "ct.email": "Эл. почта",
      "ct.phone": "Телефон", "ct.looking": "Я хочу", "ct.message": "Сообщение",
      "ct.opt1": "Купить жильё", "ct.opt2": "Рефинансировать", "ct.opt3": "Купить инвест-недвижимость",
      "ct.opt4": "Узнать про джамбо-кредит", "ct.opt5": "Пока не уверен(а)",
      "ct.msgph": "Расскажите Orange немного о том, что хотите сделать…",
      "ct.submit": "Спросить Orange →",
      "ct.note": "Отправляя форму, вы соглашаетесь, что с вами свяжутся по вашему ипотечному запросу. Эта форма носит общий информационный характер и не является одобрением кредита или обязательством его предоставить.",

      "ask.fabTitle": "Спросить Orange", "ask.fabSub": "Я помогу!",
      "ask.title": "Спросить Orange", "ask.sub": "Ваш ипотечный гид по округу Ориндж",
      "ask.text": "Скоро Orange сможет провести вас по ипотечным вариантам прямо здесь. А пока выберите, с чего начать:",
      "ask.start": "Начать стратегию", "ask.estimate": "Рассчитать платёж", "ask.email": "Написать Orange",
      "ask.disclaimer": "Orange предоставляет только общую ипотечную информацию — не ставки, одобрения или конкретные условия. Они зависят от полной заявки и проверки кредитором.",
      "ask.close": "Закрыть",

      "foot.brand": "Дружелюбное сопровождение по ипотеке в Калифорнии и Флориде. Спросите Orange в любое время.",
      "foot.loans": "Кредиты", "foot.company": "Компания", "foot.touch": "Связаться",
      "foot.about": "Об Orange", "foot.ask": "Спросить Orange",
      "foot.serving": "Обслуживаем Калифорнию и Флориду", "foot.hours": "Пн–Сб · 8:00–19:00 PT",
      "foot.legal": `<strong>Orange Mortgage</strong> — бренд West Coast Capital Mortgage, Inc. NMLS&nbsp;#2817729 · CA&nbsp;DRE&nbsp;#01385024 · Равные жилищные возможности.`,
      "foot.disc": `© <span id="year">2026</span> West Coast Capital Mortgage, Inc. Все права защищены. Orange предоставляет только общую ипотечную информацию. Приведённые цифры и примеры иллюстративны, не являются предложением по ставке или обязательством кредитовать; все кредиты подлежат полной заявке, проверке кредита, дохода, объекта и одобрению кредитора.`,

      "home.title": "Orange Mortgage — Спросите Orange, ваш ипотечный гид по Калифорнии и Флориде",
      "home.desc": "Спросите Orange. Умное, дружелюбное сопровождение по ипотеке для покупателей, домовладельцев и инвесторов в Калифорнии и Флориде — покупка, рефинансирование и инвест-кредиты, без давления и сложных терминов.",

      "nav.strategy": "Ипотечная стратегия",
      "promo.eyebrow": "Интеллект по локации объекта",
      "promo.h2": "Стратегия, а не просто оценка",
      "promo.p": "Orange сверяет ваш сценарий с лимитом округа — conforming vs jumbo, примерный платёж и оптимальный путь рассмотрения. Проверьте лимит, прежде чем считать кредит джамбо.",
      "promo.cta": "Открыть ипотечную стратегию →",
      "promo.k1": "Сумма кредита", "promo.k2": "Лимит округа", "promo.k3": "Путь рассмотрения", "promo.kpath": "High-balance",
      "promo.badge": "Strategy Studio",
      "ms.title": "Ипотечная стратегия — проверьте лимит округа | Orange Mortgage",
      "ms.desc": "Сверьте объект с conforming-лимитом округа — conforming vs jumbo, примерный платёж и оптимальный путь. Только для образования. Калифорния и Флорида.",
      "ms.eyebrow": "🍊 Ипотечная стратегия",
      "ms.h1": `Проверьте лимит, <span class="accent">прежде чем считать джамбо.</span>`,
      "ms.lead": "Расскажите Orange об объекте и ваших цифрах. Студия сверит их с conforming-лимитом вашего округа и покажет conforming vs jumbo, примерный платёж и путь рассмотрения — для Калифорнии и Флориды.",
      "ms.p1": "Подтвердите округ объекта",
      "ms.p2": "Увидьте линию conforming/jumbo",
      "ms.p3": "Получите примерный платёж",
      "ms.disclaimer": "Только образовательная оценка структуры — не котировка, APR, loan estimate, одобрение или обязательство кредитовать. Все цифры — допущения, предоставленные владельцем; проверяйте актуальные лимиты FHFA/HUD и цены перед использованием.",
      "ms.toolLabel": "Strategy Studio",

      "nav.family": "Семья",
      "nav.academy": "Академия",
      "fam.title": "Семья Orange — ипотека по-семейному | Orange Mortgage",
      "fam.desc": "Знакомьтесь с семьёй Orange. Тёплое, надёжное сопровождение по ипотеке для семей в Калифорнии и Флориде — первый дом, следующий дом и будущее для детей.",
      "fam.eyebrow": "🍊 Семья Orange",
      "fam.h1": `Семья, которая помогает <span class="accent">вашей семье</span> почувствовать себя дома.`,
      "fam.lead": "От первого дома до дома мечты семья Orange относится к каждому клиенту как к своему — спокойное, понятное и заботливое сопровождение в Калифорнии и Флориде.",
      "fam.tag": "Семья — это главное.",
      "fam.helpEyebrow": "Как помогает семья Orange",
      "fam.helpH2": "Каждой семье, на каждом этапе",
      "fam.c1t": "Семьи-новички", "fam.c1p": "Покупка первого дома вместе — объясняем шаг за шагом, без давления и сложных терминов.",
      "fam.c2t": "Растущие семьи", "fam.c2p": "Больше места для большего тепла. Переезжайте в дом побольше с планом под ваш бюджет.",
      "fam.c3t": "Будущее для детей", "fam.c3p": "Инвестиции и варианты для нескольких поколений — чтобы построить то, что останется надолго.",
      "fam.c4t": "Всегда живой человек", "fam.c4p": "Когда вы звоните, вы попадаете к семье — а не в колл-центр.",
      "fam.valuesH2": "Покупка дома — это семейный момент.",
      "fam.valuesP": "Orange делает его радостным, а не стрессовым — с честным сопровождением, которому можно доверять, на English, Español или Русском.",
      "fam.ctaH2": "Найдём дом для вашей семьи",
      "fam.ctaP": "Расскажите Orange, о чём мечтает ваша семья, и мы поможем понять следующий шаг — в Калифорнии и Флориде.",

      "ab.subEyebrow": "🍊 (Почти правдивая) история",
      "ab.h1": `Знакомьтесь — <span class="accent">Orange</span>`,
      "ab.lead": "Наполовину апельсин, наполовину ипотечный гид, полностью преданный тому, чтобы помочь людям в Калифорнии и Флориде покупать, рефинансировать и инвестировать уверенно. Он — дружелюбное лицо <strong>West Coast Capital Mortgage, Inc.</strong> — чтобы сделать ипотеку простой, умной и немного веселее.",
      "ab.origin.eyebrow": "История появления",
      "ab.origin.h2": "Как апельсин стал ипотечным экспертом",
      "ab.origin.p": "У каждого хорошего маскота скромное начало. У Orange оно связано с рощей, маленьким тёмно-синим костюмом и нездоровой любовью к процентным ставкам.",
      "ab.tl1y": "День первый", "ab.tl1h": "Родился в роще округа Ориндж 🌳", "ab.tl1p": "Orange сорвался с ветки с листиком на голове, большими любопытными глазами и ощущением, что предназначен для чего-то большего, чем ваза с фруктами.",
      "ab.tl2y": "Преображение", "ab.tl2h": "Нашёл тёмно-синий костюм 👔", "ab.tl2p": "Однажды он примерил строгий синий костюм и оранжевый галстук. Сидело идеально. А маленький значок-домик на лацкане? В тот момент он понял: ипотека.",
      "ab.tl3y": "Призвание", "ab.tl3h": "Влюбился в жилищные кредиты 🏡", "ab.tl3p": "Пока соседи занимались тем, что становились соком, Orange изучал листы ставок, сравнивал программы и помогал семьям понять, что они могут себе позволить.",
      "ab.tl4y": "Сегодня", "ab.tl4h": "Самый дружелюбный гид округа Ориндж ⭐", "ab.tl4p": "Теперь он помогает покупателям, домовладельцам и инвесторам разобраться в вариантах — при поддержке лицензированной команды West Coast Capital Mortgage, Inc.",
      "ab.ff.eyebrow": "Узнайте Orange поближе", "ab.ff.h2": "Несколько (сочных) фактов",
      "ab.ff1t": "100% местный", "ab.ff1p": "Сосредоточен на округе Ориндж. Знает районы, рынок и где найти лучшие тако после сделки.",
      "ab.ff2t": "Витаминная скорость", "ab.ff2p": "Быстрый, современный, безбумажный процесс, который не тормозит — без лишних усилий.",
      "ab.ff3t": "Всегда на связи", "ab.ff3p": "Без колл-центров и беготни. Связываясь с Orange, вы общаетесь с живым человеком — на каждом шаге.",
      "ab.ff4t": "Эксперт по джамбо", "ab.ff4p": "От уютных кондо до прибрежных особняков — у Orange слабость к дорогому жилью округа Ориндж.",
      "ab.ff5t": "Всё по правилам", "ab.ff5p": "Обаятельный — да, но полностью лицензированный и соблюдающий нормы. Каждый кредит оформляется правильно.",
      "ab.ff6t": "На вашей стороне", "ab.ff6p": "Orange относится к каждому клиенту как к соседу — ведь в округе Ориндж вы, скорее всего, и есть сосед.",
      "ab.mis.eyebrow": "Наша миссия", "ab.mis.h2": "Финансирование — понятное, честное и под ваши цели",
      "ab.mis.p": "West Coast Capital Mortgage, Inc. — современная ипотечная компания, помогающая людям покупать жильё, рефинансировать и наращивать капитал уверенно. Мы сочетаем эффективные технологии с опытным лицензированным сопровождением.",
      "ab.v1t": "Понятное сопровождение", "ab.v1p": "Прямые ответы и прозрачные варианты.",
      "ab.v2t": "Умные решения", "ab.v2p": "Полный спектр программ для любого заёмщика.",
      "ab.v3t": "Технологии + люди", "ab.v3p": "Современные инструменты и реальные консультанты.",
      "ab.v4t": "Интересы заёмщика", "ab.v4p": "Без хайпа и давления — просто гладкий процесс.",
      "ab.fo.eyebrow": "Основатель и ипотечный специалист", "ab.fo.h2": "Знакомьтесь — Анатолий Каневский",
      "ab.fo.role": "Основатель · West Coast Capital Mortgage, Inc.",
      "ab.fo.c1": "Лицензированный брокер недвижимости Калифорнии", "ab.fo.c2": "Ипотечный специалист с 2001 года",
      "ab.fo.c3": "Опыт в элитной недвижимости и девелопменте",
      "ab.fo.c4": "Покупка, рефинанс, джамбо, Non-QM, DSCR и стратегии для самозанятых",
      "ab.fo.p1": "Анатолий Каневский — основатель West Coast Capital Mortgage, Inc. и калифорнийский специалист по недвижимости и ипотеке с десятилетиями опыта, помогающий заёмщикам, инвесторам и клиентам в сложных финансовых решениях.",
      "ab.fo.p2": "Его опыт сочетает ипотечное кредитование, брокераж недвижимости, элитный жилой девелопмент и реальный анализ сделок. Такой взгляд позволяет West Coast Capital Mortgage подходить к каждому случаю с дисциплиной кредитора и практическим опытом в недвижимости.",
      "ab.fo.p3": "Покупает ли клиент основное жильё, рефинансирует, приобретает элитную или инвестиционную недвижимость, либо рассматривает варианты для самозанятых, Non-QM, джамбо, FHA, VA или DSCR — цель Анатолия проста: понятное сопровождение, грамотная структура и ипотечная стратегия под реальную ситуацию клиента.",
      "ab.lic.eyebrow": "Лицензии и компания", "ab.lic.h2": "Лицензированная компания за Orange",
      "ab.lic.p": "Orange — весёлый и дружелюбный бренд. Доверие, лицензии и кредитование обеспечивает реальная регулируемая ипотечная компания.",
      "ab.co.p": `<strong>Orange Mortgage</strong> (OrangesMortgages.com) — потребительский бренд <strong>West Coast Capital Mortgage, Inc.</strong> Все кредиты оформляются West Coast Capital Mortgage, Inc. в соответствии с законами штата и федерального уровня.`,
      "ab.co.ehl": "Равные жилищные возможности",
      "ab.co.entity": "Юр. лицо", "ab.co.nmls": "NMLS ID", "ab.co.dre": "California DRE",
      "ab.co.serving": "Обслуживание", "ab.co.servingV": "Округ Ориндж и Калифорния",
      "ab.co.servingS": "Ирвайн, Ньюпорт-Бич, Лагуна-Бич, Хантингтон-Бич, Анахайм, Коста-Меса, Фуллертон и другие",
      "ab.co.emailL": "Эл. почта", "ab.co.phoneL": "Телефон", "ab.co.siteL": "Сайт компании",
      "ab.co.nmlsS": "Проверьте в NMLS Consumer Access", "ab.co.dreS": "Лицензия Департамента недвижимости Калифорнии",
      "ab.disc": `West Coast Capital Mortgage, Inc. — NMLS #2817729, California DRE #01385024. Равные жилищные возможности. Orange — бренд-маскот и не меняет условий какого-либо кредита. Эта страница носит общий информационный характер и не является обязательством кредитовать или предложением кредита. Все кредиты подлежат полной заявке, одобрению кредита, проверке дохода и оценке объекта. Ставки, программы и условия могут меняться без уведомления. Проверить статус лицензии можно в любое время через <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">NMLS Consumer Access</a>.`,
      "ab.cta.h2": "Готовы спросить Orange?",
      "ab.cta.p": "Покупаете, рефинансируете или инвестируете — Orange и команда West Coast Capital Mortgage помогут понять ваш следующий шаг.",
      "about.title": "Об Orange — West Coast Capital Mortgage, Inc. | Orange Mortgage",
      "about.desc": "Знакомьтесь с Orange — дружелюбным брендом West Coast Capital Mortgage, Inc., современной ипотечной компании под руководством основателя Анатолия Каневского. Понятное и честное сопровождение по всей Калифорнии и Флориде.",

      "ty.eyebrow": "🍊 Заявка получена",
      "ty.h1": "Спасибо — Orange получил вашу заявку.",
      "ty.p": "Мы скоро свяжемся с вами. А пока можете изучить варианты или рассчитать платёж.",
      "ty.home": "На главную", "ty.estimate": "Рассчитать платёж",
      "ty.title": "Спасибо — Orange Mortgage",
      "ty.desc": "Спасибо — Orange получил вашу заявку. Мы скоро свяжемся."
    },

    es: {
      "lang.label": "Idioma",

      "nav.loans": "Préstamos", "nav.why": "Por qué Orange", "nav.calc": "Calculadora",
      "nav.how": "Cómo funciona", "nav.areas": "Zonas", "nav.about": "Nosotros",
      "nav.cta": "Pre-aprobación",

      "hero.eyebrow": "🍊 Tu guía hipotecario amigable para California y Florida",
      "hero.h1": `Hola, soy <span class="accent">Orange.</span><br />Financiar tu casa, <span class="accent">así de simple.</span>`,
      "hero.lead": "Orientación hipotecaria inteligente para compradores, propietarios e inversionistas en California y Florida — sin presión, confusión ni tecnicismos.",
      "hero.ask": "Pregúntale a Orange", "hero.estimate": "Estimar mi pago",
      "hero.trust1": "Orientación hipotecaria<br />con licencia",
      "hero.trust2": "Servicio en California<br />y Florida",
      "hero.trust3": "Compra, refinanciación<br />&amp; préstamos de inversión",
      "hero.disclaimer": "Orange ofrece educación hipotecaria general. Las opciones finales dependen de la solicitud completa, el crédito, los ingresos, la propiedad y la aprobación del prestamista.",

      "badge.1": "Orientación hipotecaria con licencia", "badge.2": "California y Florida",
      "badge.3": "Compra y refinanciación", "badge.4": "Préstamos de inversión y jumbo",
      "badge.5": "Prestamista de Igualdad de Vivienda",

      "help.eyebrow": "En qué te ayuda Orange",
      "help.h2": "Soluciones para cada tipo de propietario",
      "help.p": "Estés donde estés en el proceso, Orange te ayuda a entender tus opciones y tu siguiente paso.",
      "help.1t": "Compradores por primera vez", "help.1p": "Entiende cada paso, del presupuesto a las llaves — a tu ritmo.",
      "help.2t": "Préstamos Jumbo", "help.2p": "Maneja montos más altos para las viviendas más caras del Condado de Orange.",
      "help.3t": "Opciones de refinanciación", "help.3p": "Comprueba si refinanciar encaja con tus metas antes de decidir.",
      "help.4t": "Préstamos de inversión", "help.4p": "Financia alquileres y construye un portafolio con estrategia primero.",
      "help.5t": "Trabajadores por cuenta propia", "help.5p": "Opciones diseñadas para ingresos no tradicionales y variables.",
      "help.6t": "Estrategia de pago", "help.6p": "Compara escenarios para encontrar un pago mensual cómodo.",
      "help.link": "Pregúntale a Orange →",

      "loans.eyebrow": "Tipos de préstamo",
      "loans.h2": "El préstamo correcto empieza con la estrategia correcta",
      "loans.p": "Orange te guía por los programas y te ayuda a entender cuál encaja contigo — sin promesas de tasa, solo orientación clara.",
      "loans.moment": "🍊 Orange explica cada programa en palabras sencillas.",
      "loans.1t": "Conventional", "loans.1p": "Financiamiento flexible para vivienda principal, con varias opciones de pago inicial.",
      "loans.2t": "Jumbo", "loans.2p": "Financiamiento por encima de los límites para las viviendas más caras del Condado de Orange.",
      "loans.3t": "FHA", "loans.3p": "Préstamos respaldados por el gobierno con requisitos flexibles para el prestatario adecuado.",
      "loans.4t": "VA", "loans.4p": "Beneficios para veteranos elegibles, militares en activo y cónyuges.",
      "loans.5t": "DSCR", "loans.5p": "Califica una propiedad de inversión por su ingreso de alquiler, no el personal.",
      "loans.6t": "Refinanciación", "loans.6p": "Explora ajustar tu tasa o plazo, o usar el capital de tu vivienda.",

      "why.eyebrow": "Por qué Orange",
      "why.h2": "Un guía hipotecario que hace el proceso más fácil",
      "why.1t": "California y Florida", "why.1p": "Dondequiera que compres, Orange te ayuda a cerrar con confianza — no solo a cotizar una tasa.",
      "why.2t": "Explicación clara de tus opciones", "why.2p": "Cada programa y número explicado de forma simple, para que decidas con confianza.",
      "why.3t": "Solicitud digital rápida", "why.3p": "Un proceso moderno y sin papel que puedes iniciar desde tu teléfono en minutos.",
      "why.4t": "Ayuda humana cuando la necesitas", "why.4p": "Una persona real con quien hablar ante cualquier duda — sin centros de llamadas.",
      "why.5t": "Sin tecnicismos confusos", "why.5p": "Respuestas en lenguaje claro que respetan tu tiempo y tu decisión.",

      "calc.eyebrow": "Calculadora hipotecaria",
      "calc.h2": "Ve un pago estimado en segundos",
      "calc.moment": "🍊 Orange te ayuda a estimar — y lo convierte en un plan.",
      "calc.p": "Ajusta los números para una estimación instantánea de capital e intereses. Cuando estés listo, Orange crea una estrategia personalizada según tus metas reales.",
      "calc.cta": "Obtener mi estrategia personalizada →",
      "calc.price": "Precio de la vivienda", "calc.down": "Pago inicial",
      "calc.rate": "Tasa de interés (para estimar)", "calc.term": "Plazo del préstamo",
      "calc.result": "Pago mensual estimado",
      "calc.disclaimer": "El pago estimado es solo con fines educativos y no incluye impuestos, seguros, cuotas de HOA, seguro hipotecario ni el precio final del prestamista. La tasa de interés anterior es un ejemplo ajustable, no una cotización.",
      "calc.loanAmount": "Monto del préstamo {amt} · solo capital e intereses",
      "calc.years": "{n} años", "calc.perMo": "/mes", "calc.downOut": "{amt} ({pct}%)",

      "proc.eyebrow": "Cómo funciona",
      "proc.h2": "Cuatro pasos simples con Orange",
      "proc.moment": "🍊 Orange te acompaña por todo el proceso — del inicio a las llaves.",
      "proc.1t": "Cuéntale tu meta a Orange", "proc.1p": "Comparte lo que quieres hacer — comprar, refinanciar o invertir.",
      "proc.2t": "Revisa tus opciones de préstamo", "proc.2p": "Orange te guía por los programas que encajan con tu situación.",
      "proc.3t": "Obtén la pre-aprobación", "proc.3p": "Solicita en línea y entiende para qué podrías calificar.",
      "proc.4t": "Cierra con confianza", "proc.4p": "Avanza con un plan claro y orientación en cada paso.",

      "areas.eyebrow": "Zonas de servicio",
      "areas.h2": "Ayuda hipotecaria en California y Florida",
      "areas.p": "De la costa de California a los Cayos de Florida, Orange ayuda a compradores, propietarios e inversionistas. ¿No ves tu zona? Casi con seguridad también la atendemos.",
      "areas.ca": "California", "areas.fl": "Florida",

      "ct.eyebrow": "🍊 Pregúntale a Orange",
      "ct.h2": "¿List@ para preguntarle a Orange?",
      "ct.p": "Cuéntanos qué quieres hacer y te ayudamos a entender tu siguiente paso — sin presión ni tecnicismos.",
      "ct.perk1": "✓ Orientación hipotecaria general, gratis",
      "ct.perk2": "✓ Una persona real, no un centro de llamadas",
      "ct.perk3": "✓ Respuestas claras sobre tus opciones",
      "ct.first": "Nombre", "ct.last": "Apellido", "ct.email": "Correo",
      "ct.phone": "Teléfono", "ct.looking": "Quiero", "ct.message": "Mensaje",
      "ct.opt1": "Comprar una vivienda", "ct.opt2": "Refinanciar", "ct.opt3": "Comprar propiedad de inversión",
      "ct.opt4": "Explorar préstamo jumbo", "ct.opt5": "Aún no estoy seguro/a",
      "ct.msgph": "Cuéntale a Orange un poco sobre lo que quieres hacer…",
      "ct.submit": "Pregúntale a Orange →",
      "ct.note": "Al enviar este formulario, aceptas ser contactado sobre tu consulta hipotecaria. Este formulario es solo para información hipotecaria general y no constituye una aprobación de préstamo ni un compromiso de prestar.",

      "ask.fabTitle": "Pregúntale a Orange", "ask.fabSub": "¡Estoy aquí para ayudar!",
      "ask.title": "Pregúntale a Orange", "ask.sub": "Tu guía hipotecario del Condado de Orange",
      "ask.text": "Pronto Orange podrá guiarte por tus opciones hipotecarias aquí mismo. Mientras tanto, elige un punto de partida:",
      "ask.start": "Iniciar mi estrategia", "ask.estimate": "Estimar pago", "ask.email": "Escribir a Orange",
      "ask.disclaimer": "Orange ofrece solo educación hipotecaria general — no tasas, aprobaciones ni términos específicos. Eso depende de una solicitud completa y la revisión del prestamista.",
      "ask.close": "Cerrar",

      "foot.brand": "Orientación hipotecaria amigable en California y Florida. Pregúntale a Orange cuando quieras.",
      "foot.loans": "Préstamos", "foot.company": "Empresa", "foot.touch": "Contacto",
      "foot.about": "Sobre Orange", "foot.ask": "Pregúntale a Orange",
      "foot.serving": "Atendiendo California y Florida", "foot.hours": "Lun–Sáb · 8am–7pm PT",
      "foot.legal": `<strong>Orange Mortgage</strong> es una marca de West Coast Capital Mortgage, Inc. NMLS&nbsp;#2817729 · CA&nbsp;DRE&nbsp;#01385024 · Prestamista de Igualdad de Vivienda.`,
      "foot.disc": `© <span id="year">2026</span> West Coast Capital Mortgage, Inc. Todos los derechos reservados. Orange ofrece solo educación hipotecaria general. Las cifras y ejemplos mostrados son ilustrativos, no son una cotización ni un compromiso de prestar, y todos los préstamos están sujetos a solicitud completa, crédito, ingresos, propiedad y aprobación del prestamista.`,

      "home.title": "Orange Mortgage — Pregúntale a Orange, tu guía hipotecario en California y Florida",
      "home.desc": "Pregúntale a Orange. Orientación hipotecaria inteligente y amigable para compradores, propietarios e inversionistas en California y Florida — compra, refinanciación e inversión, explicado sin presión ni tecnicismos.",

      "nav.strategy": "Estrategia hipotecaria",
      "promo.eyebrow": "Inteligencia por ubicación",
      "promo.h2": "Tu estrategia, no solo una estimación",
      "promo.p": "Orange compara tu escenario con el límite del condado — conforming vs jumbo, un pago estimado y la mejor vía de revisión. Verifica tu límite antes de asumir que es jumbo.",
      "promo.cta": "Abrir estrategia hipotecaria →",
      "promo.k1": "Monto del préstamo", "promo.k2": "Límite del condado", "promo.k3": "Vía de revisión", "promo.kpath": "High-balance",
      "promo.badge": "Strategy Studio",
      "ms.title": "Estrategia hipotecaria — verifica el límite de tu condado | Orange Mortgage",
      "ms.desc": "Compara tu propiedad con el límite conforming del condado — conforming vs jumbo, un pago estimado y la mejor vía. Solo educativo. California y Florida.",
      "ms.eyebrow": "🍊 Estrategia hipotecaria",
      "ms.h1": `Verifica tu límite <span class="accent">antes de asumir jumbo.</span>`,
      "ms.lead": "Cuéntale a Orange la propiedad y tus números. El estudio los compara con el límite conforming de tu condado y muestra conforming vs jumbo, un pago estimado y la vía de revisión — para California y Florida.",
      "ms.p1": "Confirma el condado de la propiedad",
      "ms.p2": "Ve la línea conforming/jumbo",
      "ms.p3": "Previsualiza un pago estimado",
      "ms.disclaimer": "Estimación estructural solo educativa — no es cotización, APR, loan estimate, aprobación ni compromiso de prestar. Todas las cifras son supuestos provistos por el propietario; verifica los límites FHFA/HUD y precios actuales antes de usar.",
      "ms.toolLabel": "Strategy Studio",

      "nav.family": "Familia",
      "nav.academy": "Academia",
      "fam.title": "La Familia Orange — hipotecas con calidez de familia | Orange Mortgage",
      "fam.desc": "Conoce a la familia Orange. Orientación hipotecaria cálida y confiable para familias en California y Florida — tu primera casa, tu próxima casa y el futuro de los niños.",
      "fam.eyebrow": "🍊 La Familia Orange",
      "fam.h1": `Una familia que ayuda a <span class="accent">tu familia</span> a sentirse en casa.`,
      "fam.lead": "De tu primera casa a la casa de tus sueños, la familia Orange trata a cada cliente como a los suyos — orientación tranquila, clara y cercana en California y Florida.",
      "fam.tag": "La familia primero.",
      "fam.helpEyebrow": "Cómo ayuda la familia Orange",
      "fam.helpH2": "Cada familia, en cada etapa",
      "fam.c1t": "Familias primerizas", "fam.c1p": "Comprar su primera casa juntos, explicado paso a paso — sin presión ni tecnicismos.",
      "fam.c2t": "Familias que crecen", "fam.c2p": "Más espacio para más amor. Cámbiate a algo más grande con un plan a tu medida.",
      "fam.c3t": "Construir para los hijos", "fam.c3p": "Opciones de inversión y multigeneracionales para construir algo que perdure.",
      "fam.c4t": "Siempre una persona real", "fam.c4p": "Cuando llamas, te atiende la familia — nunca un centro de llamadas.",
      "fam.valuesH2": "Comprar una casa es un momento familiar.",
      "fam.valuesP": "Orange lo hace alegre, no estresante — con orientación honesta en la que puedes confiar, en English, Español o Русский.",
      "fam.ctaH2": "Encontremos el hogar de tu familia",
      "fam.ctaP": "Cuéntale a Orange con qué sueña tu familia y te ayudamos a entender el siguiente paso — en California y Florida.",

      "ab.subEyebrow": "🍊 La historia (casi real)",
      "ab.h1": `Conoce a <span class="accent">Orange</span>`,
      "ab.lead": "Mitad cítrico, mitad guía hipotecario, totalmente dedicado a ayudar a las personas en California y Florida a comprar, refinanciar e invertir con confianza. Es la cara amigable de <strong>West Coast Capital Mortgage, Inc.</strong> — aquí para hacer la hipoteca simple, inteligente y un poco más divertida.",
      "ab.origin.eyebrow": "Historia de origen",
      "ab.origin.h2": "Cómo un cítrico se volvió experto",
      "ab.origin.p": "Toda gran mascota tiene un comienzo humilde. El de Orange involucra un huerto, un pequeño traje azul marino y una obsesión poco saludable por las tasas de interés.",
      "ab.tl1y": "Día uno", "ab.tl1h": "Nació en un huerto del Condado de Orange 🌳", "ab.tl1p": "Orange se desprendió de la rama con una hoja en la cabeza, ojos grandes y curiosos, y la sensación de estar destinado a algo más que un frutero.",
      "ab.tl2y": "La transformación", "ab.tl2h": "Encontró el traje azul marino 👔", "ab.tl2p": "Un día se probó un elegante traje azul y corbata naranja. Le quedó perfecto. ¿Y el pequeño pin de casa en la solapa? Ahí lo supo: hipotecas.",
      "ab.tl3y": "La vocación", "ab.tl3h": "Se enamoró de los préstamos de vivienda 🏡", "ab.tl3p": "Mientras los vecinos se dedicaban a ser jugo, Orange leía hojas de tasas, comparaba programas y ayudaba a las familias a entender qué podían pagar.",
      "ab.tl4y": "Hoy", "ab.tl4h": "El guía más amigable del Condado de Orange ⭐", "ab.tl4p": "Ahora ayuda a compradores, propietarios e inversionistas a entender sus opciones — con el respaldo del equipo con licencia de West Coast Capital Mortgage, Inc.",
      "ab.ff.eyebrow": "Conoce a Orange", "ab.ff.h2": "Algunos datos (jugosos)",
      "ab.ff1t": "100% local", "ab.ff1p": "Enfocado en el Condado de Orange. Conoce los vecindarios, el mercado y dónde encontrar los mejores tacos tras un cierre.",
      "ab.ff2t": "Velocidad vitamínica", "ab.ff2p": "Un proceso rápido, moderno y sin papel que mantiene todo en marcha — sin esfuerzo extra.",
      "ab.ff3t": "Siempre contesta", "ab.ff3p": "Sin centros de llamadas ni vueltas. Cuando contactas a Orange, hablas con una persona real — en cada paso.",
      "ab.ff4t": "Experto en jumbo", "ab.ff4p": "De cómodos condos a mansiones costeras, Orange tiene debilidad por las viviendas más caras del Condado de Orange.",
      "ab.ff5t": "Cítrico al pie de la letra", "ab.ff5p": "Encantador, sí — pero con licencia completa y en cumplimiento. Cada préstamo se maneja como corresponde.",
      "ab.ff6t": "De tu lado", "ab.ff6p": "Orange trata a cada cliente como a un vecino, porque en el Condado de Orange probablemente lo eres.",
      "ab.mis.eyebrow": "Nuestra misión", "ab.mis.h2": "Financiamiento claro, honesto y pensado en tus metas",
      "ab.mis.p": "West Coast Capital Mortgage, Inc. es una empresa hipotecaria moderna enfocada en ayudar a las personas a comprar viviendas, refinanciar y crear patrimonio con confianza. Combinamos tecnología eficiente con orientación experta y con licencia.",
      "ab.v1t": "Orientación clara", "ab.v1p": "Respuestas directas y opciones transparentes.",
      "ab.v2t": "Soluciones inteligentes", "ab.v2p": "Una gama completa de programas para cada prestatario.",
      "ab.v3t": "Tecnología + personas", "ab.v3p": "Herramientas modernas respaldadas por asesores reales.",
      "ab.v4t": "El prestatario primero", "ab.v4p": "Sin exageraciones ni presión — solo un proceso fluido.",
      "ab.fo.eyebrow": "Fundador y profesional hipotecario", "ab.fo.h2": "Conoce a Anatoliy Kanevsky",
      "ab.fo.role": "Fundador · West Coast Capital Mortgage, Inc.",
      "ab.fo.c1": "Corredor de bienes raíces de California", "ab.fo.c2": "Profesional hipotecario desde 2001",
      "ab.fo.c3": "Experiencia en bienes raíces de lujo y desarrollo",
      "ab.fo.c4": "Compra, refinanciación, jumbo, Non-QM, DSCR y estrategia para trabajadores por cuenta propia",
      "ab.fo.p1": "Anatoliy Kanevsky es el fundador de West Coast Capital Mortgage, Inc. y un profesional de bienes raíces e hipotecas de California con décadas de experiencia ayudando a prestatarios, inversionistas y clientes a navegar decisiones de financiamiento complejas.",
      "ab.fo.p2": "Su trayectoria combina préstamos hipotecarios, corretaje de bienes raíces, desarrollo residencial de lujo y análisis real de operaciones. Esa perspectiva permite a West Coast Capital Mortgage abordar cada caso con disciplina de prestamista y experiencia práctica en bienes raíces.",
      "ab.fo.p3": "Ya sea que un cliente compre una vivienda principal, refinancie, adquiera una propiedad de lujo, financie una propiedad de inversión o explore opciones para trabajadores por cuenta propia, Non-QM, jumbo, FHA, VA o DSCR, el enfoque de Anatoliy es simple: orientación clara, una estructura inteligente y una estrategia hipotecaria que se ajuste a la situación real del cliente.",
      "ab.lic.eyebrow": "Licencias y empresa", "ab.lic.h2": "La empresa con licencia detrás de Orange",
      "ab.lic.p": "Orange es la marca divertida y amigable. La confianza, las licencias y el financiamiento provienen de una empresa hipotecaria real y regulada.",
      "ab.co.p": `<strong>Orange Mortgage</strong> (OrangesMortgages.com) es la marca de consumo de <strong>West Coast Capital Mortgage, Inc.</strong> Todos los préstamos son originados por West Coast Capital Mortgage, Inc. conforme a la ley estatal y federal.`,
      "ab.co.ehl": "Prestamista de Igualdad de Vivienda",
      "ab.co.entity": "Entidad legal", "ab.co.nmls": "NMLS ID", "ab.co.dre": "California DRE",
      "ab.co.serving": "Atendemos", "ab.co.servingV": "Condado de Orange y California",
      "ab.co.servingS": "Irvine, Newport Beach, Laguna Beach, Huntington Beach, Anaheim, Costa Mesa, Fullerton y más",
      "ab.co.emailL": "Correo", "ab.co.phoneL": "Teléfono", "ab.co.siteL": "Sitio corporativo",
      "ab.co.nmlsS": "Verifica en NMLS Consumer Access", "ab.co.dreS": "Con licencia del Departamento de Bienes Raíces de California",
      "ab.disc": `West Coast Capital Mortgage, Inc. — NMLS #2817729, California DRE #01385024. Prestamista de Igualdad de Vivienda. Orange es una mascota de marca y no cambia los términos de ningún préstamo. Esta página es solo con fines educativos e informativos generales y no es un compromiso de prestar ni una oferta de crédito. Todos los préstamos están sujetos a solicitud completa, aprobación de crédito, verificación de ingresos y tasación de la propiedad. Las tasas, programas y términos pueden cambiar sin previo aviso. Verifica el estado de la licencia en cualquier momento en <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">NMLS Consumer Access</a>.`,
      "ab.cta.h2": "¿List@ para preguntarle a Orange?",
      "ab.cta.p": "Ya sea que compres, refinancies o inviertas — Orange y el equipo de West Coast Capital Mortgage están aquí para ayudarte a entender tu siguiente paso.",
      "about.title": "Sobre Orange — West Coast Capital Mortgage, Inc. | Orange Mortgage",
      "about.desc": "Conoce a Orange, la marca amigable de West Coast Capital Mortgage, Inc. — una empresa hipotecaria moderna liderada por el fundador Anatoliy Kanevsky. Orientación clara y honesta en California y Florida.",

      "ty.eyebrow": "🍊 Solicitud recibida",
      "ty.h1": "Gracias — Orange recibió tu solicitud.",
      "ty.p": "Te contactaremos en breve. Mientras tanto, explora tus opciones o estima un pago.",
      "ty.home": "Volver al inicio", "ty.estimate": "Estimar mi pago",
      "ty.title": "Gracias — Orange Mortgage",
      "ty.desc": "Gracias — Orange recibió tu solicitud. Te contactaremos en breve."
    }
  };

  function pick(lang, key) {
    var d = STR[lang] || STR.en;
    var v = d[key];
    if (v == null) v = STR.en[key];
    return v;
  }

  function fmt(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] != null ? vars[k] : m;
    });
  }

  var current = "en";

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "en";
    current = lang;
    var d = STR[lang] || STR.en;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = pick(lang, el.getAttribute("data-i18n"));
      if (v == null) return;
      if (/[<&]/.test(v)) el.innerHTML = v; else el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = pick(lang, el.getAttribute("data-i18n-ph"));
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = pick(lang, el.getAttribute("data-i18n-aria"));
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var v = pick(lang, el.getAttribute("data-i18n-content"));
      if (v != null) el.setAttribute("content", v);
    });

    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    // refresh the footer year (it lives inside a translated string)
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    document.querySelectorAll(".lang__menu [data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var cur = document.querySelector("[data-lang-current]");
    if (cur) cur.textContent = lang.toUpperCase();

    try { localStorage.setItem("om_lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("om:lang", { detail: { lang: lang } }));
  }

  function initial() {
    var u = new URLSearchParams(location.search).get("lang");
    if (u && LANGS.indexOf(u) !== -1) return u;
    try {
      var s = localStorage.getItem("om_lang");
      if (s && LANGS.indexOf(s) !== -1) return s;
    } catch (e) {}
    var n = (navigator.language || "").slice(0, 2).toLowerCase();
    if (LANGS.indexOf(n) !== -1) return n;
    return "en";
  }

  window.OMi18n = {
    apply: apply,
    t: function (key, vars) { return fmt(pick(current, key) || "", vars); },
    lang: function () { return current; }
  };

  function start() {
    apply(initial());
    document.querySelectorAll(".lang__menu [data-lang]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        apply(b.getAttribute("data-lang"));
        var menu = b.closest(".lang__menu");
        if (menu) menu.hidden = true;
        var fab = document.getElementById("langBtn");
        if (fab) fab.setAttribute("aria-expanded", "false");
      });
    });
    // language dropdown toggle
    var btn = document.getElementById("langBtn");
    var menu = document.getElementById("langMenu");
    if (btn && menu) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var open = menu.hidden;
        menu.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", function (e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
          menu.hidden = true;
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
