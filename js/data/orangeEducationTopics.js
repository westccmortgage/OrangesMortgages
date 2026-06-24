/* ============================================================
   Ask Orange Academy — structured education knowledge base
   ------------------------------------------------------------
   This is the single source of truth for the educational engine.
   It is intentionally brand-neutral and data-only so the SAME
   engine + content can be reused across multiple mortgage sites
   (OrangesMortgages.com, CaliforniaMTG.com, West Coast Capital,
   SunCoast Capital, KWest Mortgages, BeforeJumboLoan.com) by
   swapping the `brand` block below.

   PHASE 1 (now): a curated, guided learning experience. No AI, no
   API, no backend, no database — just this file + academy.js.
   PHASE 2 (later): feed these same topics to a real AI assistant
   or talking avatar as its grounded knowledge base. Each topic is
   already shaped as a Q + grounded answer + guardrails, so it can
   be embedded / retrieved without rewriting content.

   COMPLIANCE: education only. No approvals, no rate quotes, no
   payment guarantees, no tax or legal advice. Safe, hedged
   language only ("may affect qualification", "a licensed mortgage
   professional can review this").
   ============================================================ */
(function (root) {
  "use strict";

  /* ---- Brand block: the ONLY part a new site needs to change ---- */
  var brand = {
    name: "Orange",
    company: "Orange Mortgage",
    email: "orange@orangesmortgages.com",
    phone: "(310) 686-5053",
    regions: "California & Florida",
    contactUrl: "index.html#contact",   // the existing ask-orange Netlify form
    applyUrl: "https://2817729.my1003app.com/2775380/register"
  };

  /* ---- One disclaimer, shown under every answer ---- */
  var disclaimer =
    brand.name + " provides general mortgage education. Final loan options depend on " +
    "full application, credit, income, assets, property, program guidelines, and lender " +
    "approval. This is not a rate quote, an approval, or a commitment to lend, and it is " +
    "not tax or legal advice.";

  /* ---- "Choose your situation" → which path to open first ---- */
  var situations = [
    { id: "sit-first",   emoji: "🔑", label: "I'm buying my first home",          path: "first-time" },
    { id: "sit-self",    emoji: "📁", label: "I'm self-employed",                  path: "self-employed" },
    { id: "sit-w2biz",   emoji: "🧾", label: "I have W-2 and business income",     path: "w2-business" },
    { id: "sit-credit",  emoji: "📉", label: "I'm worried about credit",           path: "credit" },
    { id: "sit-debt",    emoji: "💳", label: "I have high debt",                   path: "credit" },
    { id: "sit-invest",  emoji: "🏘️", label: "I want to buy an investment property", path: "investment" },
    { id: "sit-jumbo",   emoji: "💎", label: "I'm looking at jumbo loans",         path: "jumbo" },
    { id: "sit-refi",    emoji: "🔄", label: "I want to refinance",                path: "refinance" },
    { id: "sit-unsure",  emoji: "🍊", label: "I'm not sure where to start",        path: "first-time" }
  ];

  /* ---- Learning paths (the Duolingo-style course tracks) ---- */
  var paths = [
    { id: "first-time",    emoji: "🔑", title: "First-Time Home Buyer",     blurb: "Start here — what approval really takes, from budget to keys." },
    { id: "credit",        emoji: "📊", title: "Credit & Debt Strategy",    blurb: "How lenders read your credit and debt — and what helps vs. hurts." },
    { id: "self-employed", emoji: "📁", title: "Self-Employed Borrower",    blurb: "How business income qualifies and why write-offs matter." },
    { id: "w2-business",   emoji: "🧾", title: "W-2 + Business Income",      blurb: "Combining a paycheck with self-employment, side gigs, and variable pay." },
    { id: "jumbo",         emoji: "💎", title: "Jumbo & High-Balance Loans", blurb: "Conforming vs. high-balance vs. jumbo, county lines, and reserves." },
    { id: "refinance",     emoji: "🔄", title: "Refinance Strategy",        blurb: "When a refinance makes sense, cash-out, buydowns, and break-even." },
    { id: "investment",    emoji: "🏘️", title: "Investment Property Loans",  blurb: "Rental income, DSCR, down payment, and reserves for investors." },
    { id: "documents",     emoji: "🗂️", title: "Documents & Preparation",   blurb: "What to gather, what to avoid, and how to keep your file clean." }
  ];

  /* helper to keep each topic terse to author */
  function t(o) { return o; }

  /* ---- The 40 starter topics ---- */
  var topics = [

    /* ============ 1. FIRST-TIME HOME BUYER ============ */
    t({
      id: "ftb-afford", path: "first-time", category: "Approval Basics", borrowerType: "First-time buyer",
      question: "How much home can I afford?",
      shortAnswer: "Affordability is really about your comfortable monthly payment, not just a purchase price. Lenders look at your income, your existing monthly debts, your down payment, and the full payment (principal, interest, taxes, insurance, and any HOA or mortgage insurance). " + brand.name + " helps you find a payment that fits your life, then works backward to a price range.",
      whyItMatters: "A price you 'qualify' for on paper and a payment that feels comfortable are not always the same number. Knowing your comfortable payment first keeps you in control of the search.",
      commonMistake: "Shopping by purchase price alone and forgetting taxes, insurance, and HOA — which can change the real monthly payment by hundreds of dollars.",
      followUpQuestions: [
        { q: "What is my real monthly payment?", to: "ftb-payment" },
        { q: "How much down payment do I need?", to: "ftb-down" },
        { q: "How does debt-to-income ratio work?", to: "credit-dti" }
      ],
      relatedTopics: ["ftb-payment", "ftb-down", "credit-dti"],
      nextBestStep: "Want " + brand.name + " to help you find a comfortable payment and price range? Ask " + brand.name + ".",
      tags: ["afford", "affordability", "budget", "price", "how much home", "income", "payment", "first time"]
    }),
    t({
      id: "ftb-approval", path: "first-time", category: "Approval Basics", borrowerType: "First-time buyer",
      question: "What affects mortgage approval?",
      shortAnswer: "Approval generally comes down to four pillars: income (can you support the payment), credit (how you've handled debt), assets (down payment plus reserves), and the property itself (value and type). Lenders weigh all four together — strength in one area can offset a question in another.",
      whyItMatters: "Borrowers often focus on just credit or just income. Lenders look at the whole picture, so understanding all four pillars helps you prepare the right way.",
      commonMistake: "Assuming a high income alone guarantees approval, while ignoring debt load, down payment, or credit history.",
      followUpQuestions: [
        { q: "How does debt-to-income ratio work?", to: "credit-dti" },
        { q: "What is pre-approval?", to: "ftb-preapproval" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" }
      ],
      relatedTopics: ["credit-dti", "ftb-preapproval", "ftb-down"],
      nextBestStep: "A licensed mortgage professional can review all four pillars for your situation. Ask " + brand.name + ".",
      tags: ["approval", "qualify", "income", "credit", "assets", "property", "underwriting", "pillars"]
    }),
    t({
      id: "ftb-down", path: "first-time", category: "Down Payment", borrowerType: "First-time buyer",
      question: "How much down payment do I need?",
      shortAnswer: "It depends on the loan program. Some programs allow as little as 3%–5% down, government-backed options can be lower, and 20% down typically removes monthly mortgage insurance. More down usually means a lower payment, but keeping cash in reserve also matters. There is no single right answer — it's a trade-off " + brand.name + " can walk through with you.",
      whyItMatters: "The down payment affects your payment, your mortgage insurance, and how much cash you have left after closing. Balancing all three is the real goal.",
      commonMistake: "Draining every dollar into the down payment and leaving nothing for reserves, closing costs, or moving expenses.",
      followUpQuestions: [
        { q: "Why do reserves matter?", to: "jumbo-reserves" },
        { q: "Can gift funds be used?", to: "doc-gift-funds" },
        { q: "Should I pay off debt or save cash?", to: "credit-payoff-vs-save" }
      ],
      relatedTopics: ["doc-gift-funds", "jumbo-reserves", "credit-payoff-vs-save"],
      nextBestStep: "Want help finding the right down payment for your goals? Ask " + brand.name + ".",
      tags: ["down payment", "down", "3 percent", "20 percent", "pmi", "mortgage insurance", "cash to close"]
    }),
    t({
      id: "ftb-payment", path: "first-time", category: "Approval Basics", borrowerType: "First-time buyer",
      question: "What is my real monthly payment?",
      shortAnswer: "Your full monthly payment is more than principal and interest. It usually includes property taxes, homeowners insurance, and — depending on the loan — mortgage insurance and HOA dues. People often call this PITI (principal, interest, taxes, insurance). A payment estimate without taxes and insurance can look smaller than the real number.",
      whyItMatters: "Budgeting on principal-and-interest alone can leave you surprised at closing. The full payment is what actually leaves your account each month.",
      commonMistake: "Using an online estimate that shows only principal and interest, then being caught off guard by escrow for taxes and insurance.",
      followUpQuestions: [
        { q: "How much home can I afford?", to: "ftb-afford" },
        { q: "How much down payment do I need?", to: "ftb-down" },
        { q: "How does debt-to-income ratio work?", to: "credit-dti" }
      ],
      relatedTopics: ["ftb-afford", "ftb-down", "credit-dti"],
      nextBestStep: "Want a full-picture payment estimate for a real scenario? Ask " + brand.name + ".",
      tags: ["payment", "monthly payment", "piti", "taxes", "insurance", "escrow", "hoa", "real payment"]
    }),
    t({
      id: "ftb-preapproval", path: "first-time", category: "Approval Basics", borrowerType: "First-time buyer",
      question: "What is pre-approval?",
      shortAnswer: "Pre-approval is when a lender reviews your income, credit, and assets and issues a letter showing the loan amount you may be eligible for, subject to a full review and an accepted property. It's stronger than a quick 'pre-qualification' and signals to sellers that you're a serious, prepared buyer.",
      whyItMatters: "In competitive markets across " + brand.regions + ", many sellers won't seriously consider an offer without a pre-approval letter. It also helps you shop in the right price range.",
      commonMistake: "Treating pre-approval as a final guarantee. It's a strong start, but the final decision still depends on a full application and the specific property.",
      followUpQuestions: [
        { q: "What affects mortgage approval?", to: "ftb-approval" },
        { q: "What documents should I prepare?", to: "doc-prepare" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" }
      ],
      relatedTopics: ["ftb-approval", "doc-prepare", "credit-avoid-before-closing"],
      nextBestStep: "Ready to start a pre-approval review? Ask " + brand.name + ".",
      tags: ["pre-approval", "preapproval", "pre-qualification", "letter", "offer", "shopping"]
    }),

    /* ============ 2. CREDIT & DEBT STRATEGY ============ */
    t({
      id: "credit-mortgage-score", path: "credit", category: "Credit", borrowerType: "All borrowers",
      question: "Why is my mortgage credit score different from the app I use?",
      shortAnswer: "Mortgage lenders usually pull a specialized credit model from all three bureaus and often use the middle of the three scores. Consumer apps and credit cards typically show a different model built for general use. So the number you see on a free app can differ — sometimes noticeably — from the score a lender uses.",
      whyItMatters: "Planning around a consumer-app score can be misleading. Knowing that mortgage scoring is its own model helps set realistic expectations before you apply.",
      commonMistake: "Assuming the score from a free app is exactly what the lender will see, then being surprised by a different number.",
      followUpQuestions: [
        { q: "What affects my credit score?", to: "credit-factors" },
        { q: "Should I pay off debt or save cash?", to: "credit-payoff-vs-save" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" }
      ],
      relatedTopics: ["credit-factors", "credit-payoff-vs-save", "credit-avoid-before-closing"],
      nextBestStep: "A licensed mortgage professional can review your actual mortgage credit profile. Ask " + brand.name + ".",
      tags: ["credit score", "fico", "mortgage score", "bureaus", "middle score", "different score"]
    }),
    t({
      id: "credit-factors", path: "credit", category: "Credit", borrowerType: "All borrowers",
      question: "What affects my credit score?",
      shortAnswer: "The biggest drivers are usually payment history (paying on time) and how much of your available credit you're using (your utilization). Length of history, the mix of accounts, and recent new credit also play a role. Small, consistent habits matter more than any single quick fix.",
      whyItMatters: "Credit influences which programs and terms may be available. Understanding what moves it lets you focus your energy where it actually counts.",
      commonMistake: "Closing old credit cards right before applying — which can shorten history and raise utilization, sometimes lowering the score.",
      followUpQuestions: [
        { q: "Why is my mortgage credit score different?", to: "credit-mortgage-score" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" },
        { q: "Should I pay off debt or save cash?", to: "credit-payoff-vs-save" }
      ],
      relatedTopics: ["credit-mortgage-score", "credit-avoid-before-closing", "credit-payoff-vs-save"],
      nextBestStep: "Want guidance on credit before you apply? Ask " + brand.name + ".",
      tags: ["credit", "utilization", "payment history", "credit cards", "improve credit", "factors"]
    }),
    t({
      id: "credit-payoff-vs-save", path: "credit", category: "Debt", borrowerType: "All borrowers",
      question: "Should I pay off debt or save cash?",
      shortAnswer: "Sometimes paying off debt helps, sometimes saving cash helps more — it depends on the numbers. Paying off a loan can lower your monthly debt, but spending too much cash may shrink your down payment or reserves. " + brand.name + " looks at both sides: monthly debt and cash available for closing.",
      whyItMatters: "Mortgage approval isn't only about income. It's also about how much debt you carry and how much money remains after closing.",
      commonMistake: "Many buyers pay off the wrong debt and accidentally weaken their cash position right before they need it.",
      followUpQuestions: [
        { q: "How does debt-to-income ratio work?", to: "credit-dti" },
        { q: "Why do reserves matter?", to: "jumbo-reserves" },
        { q: "How much down payment do I need?", to: "ftb-down" }
      ],
      relatedTopics: ["credit-dti", "jumbo-reserves", "ftb-down"],
      nextBestStep: "Want " + brand.name + " to weigh paying off debt vs. keeping cash for your scenario? Ask " + brand.name + ".",
      tags: ["pay off debt", "save cash", "reserves", "down payment", "car loan", "credit cards", "strategy"]
    }),
    t({
      id: "credit-dti", path: "credit", category: "Debt", borrowerType: "All borrowers",
      question: "How does debt-to-income ratio work?",
      shortAnswer: "Debt-to-income (DTI) compares your monthly debts — like the new house payment, car loans, student loans, and minimum credit card payments — to your gross monthly income. Lenders use it to gauge how comfortably you could carry the new payment. Lower DTI generally gives you more flexibility; programs vary on how high they allow.",
      whyItMatters: "DTI is one of the clearest levers in approval. Reducing a monthly obligation or increasing qualifying income can change what's possible.",
      commonMistake: "Forgetting that the new mortgage payment counts in DTI too — not just existing debts.",
      followUpQuestions: [
        { q: "Should I pay off debt or save cash?", to: "credit-payoff-vs-save" },
        { q: "What affects mortgage approval?", to: "ftb-approval" },
        { q: "Can business-paid debts be excluded?", to: "se-business-debts" }
      ],
      relatedTopics: ["credit-payoff-vs-save", "ftb-approval", "se-business-debts"],
      nextBestStep: "Curious where your DTI lands? A licensed mortgage professional can review it. Ask " + brand.name + ".",
      tags: ["dti", "debt to income", "ratio", "monthly debt", "income", "qualify"]
    }),
    t({
      id: "credit-avoid-before-closing", path: "credit", category: "Credit", borrowerType: "All borrowers",
      question: "What should I avoid before closing?",
      shortAnswer: "Until your loan funds, try not to open new credit, finance a car, make large unexplained deposits, move money between accounts without a paper trail, or change jobs without telling your loan team. Lenders often re-check credit and assets close to closing, so big changes can create new questions.",
      whyItMatters: "A loan that looked solid at application can hit a snag if your credit, income, or assets shift right before closing.",
      commonMistake: "Buying furniture or a new car on credit before closing — which can raise DTI and put the approval at risk.",
      followUpQuestions: [
        { q: "Why do large deposits matter?", to: "doc-large-deposits" },
        { q: "What happens if I recently changed jobs?", to: "w2b-job-change" },
        { q: "What documents should I prepare?", to: "doc-prepare" }
      ],
      relatedTopics: ["doc-large-deposits", "w2b-job-change", "doc-before-closing"],
      nextBestStep: "Not sure if a planned purchase is safe? Ask " + brand.name + " before you do it.",
      tags: ["before closing", "avoid", "new credit", "car", "job change", "deposits", "do not"]
    }),

    /* ============ 3. SELF-EMPLOYED BORROWER ============ */
    t({
      id: "se-income-qualify", path: "self-employed", category: "Self-Employed", borrowerType: "Self-employed",
      question: "How does self-employed income qualify?",
      shortAnswer: "Lenders typically look at the income you report after business expenses — often averaged over a period of time — rather than your total sales. They want to see stable or growing net income that's likely to continue. There are also alternative programs (for example, bank-statement reviews) for borrowers whose tax returns don't tell the full story.",
      whyItMatters: "Self-employed borrowers can absolutely qualify — but the income lenders use may differ from what you 'feel' you earn, because it's based on net, documented income.",
      commonMistake: "Assuming gross revenue is the qualifying income, when lenders generally focus on net income after write-offs.",
      followUpQuestions: [
        { q: "Why do tax write-offs matter?", to: "se-writeoffs" },
        { q: "How do lenders review business income?", to: "se-business-review" },
        { q: "Can W-2 and self-employed income be combined?", to: "w2b-combine" }
      ],
      relatedTopics: ["se-writeoffs", "se-business-review", "w2b-combine"],
      nextBestStep: "A licensed mortgage professional can review which approach fits your income. Ask " + brand.name + ".",
      tags: ["self employed", "self-employed", "business income", "1099", "net income", "bank statement", "qualify"]
    }),
    t({
      id: "se-writeoffs", path: "self-employed", category: "Self-Employed", borrowerType: "Self-employed",
      question: "Why do tax write-offs matter for my mortgage?",
      shortAnswer: "Write-offs lower your taxable income — which can be great at tax time, but it also lowers the income a lender can use to qualify you. There's a real trade-off between saving on taxes and showing enough income for the loan you want. This is a planning conversation, not a quick fix.",
      whyItMatters: "The same deductions that reduce your tax bill can reduce your qualifying income, so timing and strategy matter if a purchase is on the horizon.",
      commonMistake: "Maximizing write-offs in the year before applying, then finding the qualifying income is lower than expected.",
      followUpQuestions: [
        { q: "How does self-employed income qualify?", to: "se-income-qualify" },
        { q: "How do lenders review business income?", to: "se-business-review" },
        { q: "What happens if I owe taxes?", to: "doc-owe-taxes" }
      ],
      relatedTopics: ["se-income-qualify", "se-business-review", "doc-owe-taxes"],
      nextBestStep: "Planning ahead helps. " + brand.name + " can explain the trade-off — and your tax advisor can confirm the tax side. Ask " + brand.name + ".",
      tags: ["write-offs", "deductions", "taxable income", "schedule c", "net income", "tax returns"]
    }),
    t({
      id: "se-business-review", path: "self-employed", category: "Self-Employed", borrowerType: "Self-employed",
      question: "How do lenders review business income?",
      shortAnswer: "Lenders generally review your business and personal tax returns, look for stability and trend (growing, flat, or declining), and may ask for a profit-and-loss statement or business bank statements. They want reasonable confidence the income will continue. Different business structures (sole proprietor, LLC, S-corp, partnership) are documented a little differently.",
      whyItMatters: "Understanding what underwriters look for helps you present clean, consistent documentation and avoid back-and-forth.",
      commonMistake: "Providing incomplete returns or skipping business statements, which slows the review and invites more questions.",
      followUpQuestions: [
        { q: "Can business-paid debts be excluded?", to: "se-business-debts" },
        { q: "Can I use business funds for down payment?", to: "se-business-funds" },
        { q: "Why do tax write-offs matter?", to: "se-writeoffs" }
      ],
      relatedTopics: ["se-business-debts", "se-business-funds", "se-writeoffs"],
      nextBestStep: "Want to know which documents fit your business type? Ask " + brand.name + ".",
      tags: ["business income", "tax returns", "p&l", "profit and loss", "llc", "s-corp", "underwriting"]
    }),
    t({
      id: "se-business-debts", path: "self-employed", category: "Self-Employed", borrowerType: "Self-employed",
      question: "Can business-paid debts be excluded from my ratios?",
      shortAnswer: "Sometimes. If a debt shows on your personal credit but is genuinely paid by your business, certain programs may let it be excluded from your DTI when you can document that the business has been paying it consistently — often with cancelled checks or bank statements. The exact proof and rules depend on the program.",
      whyItMatters: "Excluding a qualifying business debt can meaningfully lower your DTI and open up more options.",
      commonMistake: "Assuming any business expense automatically gets excluded, without the documentation lenders require.",
      followUpQuestions: [
        { q: "How does debt-to-income ratio work?", to: "credit-dti" },
        { q: "How do lenders review business income?", to: "se-business-review" },
        { q: "Can I use business funds for down payment?", to: "se-business-funds" }
      ],
      relatedTopics: ["credit-dti", "se-business-review", "se-business-funds"],
      nextBestStep: "A licensed mortgage professional can check whether a business debt may be excluded. Ask " + brand.name + ".",
      tags: ["business debt", "exclude debt", "dti", "cancelled checks", "documentation"]
    }),
    t({
      id: "se-business-funds", path: "self-employed", category: "Self-Employed", borrowerType: "Self-employed",
      question: "Can I use business funds for my down payment?",
      shortAnswer: "Often yes, but lenders usually want to confirm the funds are truly available to you and that withdrawing them won't harm the business. Depending on the program, that can mean sourcing the money, showing your ownership share, or a brief note from an accountant. Rules vary, so it's worth checking early.",
      whyItMatters: "Business accounts can be a valid source of down payment, but using them the wrong way can trigger extra conditions late in the process.",
      commonMistake: "Moving a large sum from a business account without a clear paper trail, then scrambling to document it.",
      followUpQuestions: [
        { q: "Why do large deposits matter?", to: "doc-large-deposits" },
        { q: "Why do reserves matter?", to: "jumbo-reserves" },
        { q: "How do lenders review business income?", to: "se-business-review" }
      ],
      relatedTopics: ["doc-large-deposits", "jumbo-reserves", "se-business-review"],
      nextBestStep: "Want to use business funds the clean way? Ask " + brand.name + " before you move money.",
      tags: ["business funds", "down payment", "sourcing", "business account", "accountant letter"]
    }),

    /* ============ 4. W-2 + BUSINESS INCOME ============ */
    t({
      id: "w2b-combine", path: "w2-business", category: "Income", borrowerType: "W-2 + business",
      question: "Can W-2 and self-employed income be combined?",
      shortAnswer: "Yes — many borrowers qualify using both a W-2 job and self-employment or a side business. Lenders document each income type its own way (pay stubs and W-2s for the job, tax returns for the business) and then look at the combined, stable picture. Consistency and a track record help.",
      whyItMatters: "Combining income streams can expand what you qualify for, as long as each one is documented properly.",
      commonMistake: "Mentioning side income but not having the tax history to support using it.",
      followUpQuestions: [
        { q: "What if my side business shows a loss?", to: "w2b-side-loss" },
        { q: "What if my own company pays me W-2?", to: "w2b-own-company-w2" },
        { q: "How does self-employed income qualify?", to: "se-income-qualify" }
      ],
      relatedTopics: ["w2b-side-loss", "w2b-own-company-w2", "se-income-qualify"],
      nextBestStep: "Have more than one income source? A licensed mortgage professional can map it out. Ask " + brand.name + ".",
      tags: ["w2", "w-2", "self-employed", "combine income", "side business", "two jobs"]
    }),
    t({
      id: "w2b-side-loss", path: "w2-business", category: "Income", borrowerType: "W-2 + business",
      question: "What if my side business shows a loss?",
      shortAnswer: "A business loss on your tax returns can reduce your qualifying income, because lenders may subtract that loss from your other income. The impact depends on the size of the loss and the program. In some cases the loss matters less than you'd expect; in others it's significant — it's worth reviewing before you apply.",
      whyItMatters: "A side business you think of as 'small' can still affect the income a lender can use, for better or worse.",
      commonMistake: "Assuming a side business is ignored if it isn't your main job — when a reported loss can still lower qualifying income.",
      followUpQuestions: [
        { q: "Can W-2 and self-employed income be combined?", to: "w2b-combine" },
        { q: "Why do tax write-offs matter?", to: "se-writeoffs" },
        { q: "How does debt-to-income ratio work?", to: "credit-dti" }
      ],
      relatedTopics: ["w2b-combine", "se-writeoffs", "credit-dti"],
      nextBestStep: "Not sure how a business loss affects you? Ask " + brand.name + ".",
      tags: ["business loss", "side business", "schedule c", "qualifying income", "w2"]
    }),
    t({
      id: "w2b-own-company-w2", path: "w2-business", category: "Income", borrowerType: "W-2 + business",
      question: "What if my own company pays me a W-2?",
      shortAnswer: "If you own a meaningful share of the company that issues your W-2, lenders often treat you closer to self-employed and may also review the business returns — not just your pay stubs. Ownership percentage matters: at certain thresholds, more documentation is typically required.",
      whyItMatters: "Paying yourself a W-2 from your own business doesn't always make you a 'simple' W-2 borrower in the lender's eyes, so it helps to plan documentation early.",
      commonMistake: "Expecting a quick, pay-stub-only review when significant business ownership usually means a fuller look at the company.",
      followUpQuestions: [
        { q: "How do lenders review business income?", to: "se-business-review" },
        { q: "Can W-2 and self-employed income be combined?", to: "w2b-combine" },
        { q: "What documents should I prepare?", to: "doc-prepare" }
      ],
      relatedTopics: ["se-business-review", "w2b-combine", "doc-prepare"],
      nextBestStep: "Own part of the business that pays you? A licensed mortgage professional can guide the docs. Ask " + brand.name + ".",
      tags: ["own company", "w2 from own business", "ownership", "s-corp", "self-employed", "documentation"]
    }),
    t({
      id: "w2b-variable", path: "w2-business", category: "Income", borrowerType: "W-2 + business",
      question: "Can bonus, overtime, or commission be used?",
      shortAnswer: "Often yes, when there's a history of receiving it and a reasonable expectation it will continue — frequently a couple of years of track record. Lenders typically average variable income over time rather than using your best month. Newer or one-time bonuses may carry less weight.",
      whyItMatters: "Variable pay can be a big part of your income. Knowing how it's averaged helps you set realistic expectations.",
      commonMistake: "Counting on a recent raise or first-year commission to fully count, when lenders usually want a longer history.",
      followUpQuestions: [
        { q: "What happens if I recently changed jobs?", to: "w2b-job-change" },
        { q: "How does debt-to-income ratio work?", to: "credit-dti" },
        { q: "What affects mortgage approval?", to: "ftb-approval" }
      ],
      relatedTopics: ["w2b-job-change", "credit-dti", "ftb-approval"],
      nextBestStep: "Want to know how your variable pay is viewed? Ask " + brand.name + ".",
      tags: ["bonus", "overtime", "commission", "variable income", "averaging", "raise"]
    }),
    t({
      id: "w2b-job-change", path: "w2-business", category: "Income", borrowerType: "W-2 + business",
      question: "What happens if I recently changed jobs?",
      shortAnswer: "A job change isn't necessarily a problem — especially a move within the same field or a step up. Lenders look at your overall employment history and whether your income is stable and likely to continue. A gap, a switch to a brand-new industry, or a move to commission-only can add questions, so it's worth flagging early.",
      whyItMatters: "Stability of income is a core part of approval, and how a job change reads depends on the details.",
      commonMistake: "Changing jobs or going from salaried to commission during the loan process without telling the loan team.",
      followUpQuestions: [
        { q: "Can bonus, overtime, or commission be used?", to: "w2b-variable" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" },
        { q: "What affects mortgage approval?", to: "ftb-approval" }
      ],
      relatedTopics: ["w2b-variable", "credit-avoid-before-closing", "ftb-approval"],
      nextBestStep: "Changed jobs recently or about to? Ask " + brand.name + " how it may be viewed.",
      tags: ["job change", "new job", "employment history", "gap", "commission", "stability"]
    }),

    /* ============ 5. JUMBO & HIGH-BALANCE ============ */
    t({
      id: "jumbo-tiers", path: "jumbo", category: "Jumbo", borrowerType: "Higher-priced homes",
      question: "What is the difference between conforming, high-balance, and jumbo?",
      shortAnswer: "Conforming loans fall at or under the standard loan limit set each year. High-balance (sometimes called super-conforming) loans are above the standard limit but still within a higher cap in designated higher-cost counties. Jumbo loans are above those limits entirely and follow each lender's own guidelines. The three tiers can price and qualify differently.",
      whyItMatters: "Which tier your loan lands in affects guidelines, down payment, and review path — so it pays to know the line before you assume 'jumbo.'",
      commonMistake: "Assuming a higher-priced home automatically means jumbo, when high-balance limits in some counties cover more than people expect.",
      followUpQuestions: [
        { q: "Why do county loan limits matter?", to: "jumbo-county-limits" },
        { q: "How much down payment do jumbo loans need?", to: "jumbo-down" },
        { q: "What is the best jumbo strategy?", to: "jumbo-strategy" }
      ],
      relatedTopics: ["jumbo-county-limits", "jumbo-down", "jumbo-strategy"],
      nextBestStep: "Want to see which tier your scenario falls in? Try the Mortgage Strategy studio or Ask " + brand.name + ".",
      tags: ["jumbo", "conforming", "high-balance", "super conforming", "loan limit", "tiers"]
    }),
    t({
      id: "jumbo-county-limits", path: "jumbo", category: "Jumbo", borrowerType: "Higher-priced homes",
      question: "Why do county loan limits matter?",
      shortAnswer: "Loan limits are set by county, and higher-cost counties have higher limits. The same loan amount can be conforming in one county and jumbo in another. Because the property's county sets the line, where you buy directly affects which guidelines apply to your loan.",
      whyItMatters: "Across " + brand.regions + ", county limits vary a lot. Knowing your county's line helps you structure the loan before assuming the stricter path.",
      commonMistake: "Using a statewide or national 'limit' instead of the specific county where the property sits.",
      followUpQuestions: [
        { q: "What is the difference between conforming, high-balance, and jumbo?", to: "jumbo-tiers" },
        { q: "How much down payment do jumbo loans need?", to: "jumbo-down" },
        { q: "Why do reserves matter?", to: "jumbo-reserves" }
      ],
      relatedTopics: ["jumbo-tiers", "jumbo-down", "jumbo-reserves"],
      nextBestStep: "Check your property's county line in the Mortgage Strategy studio, or Ask " + brand.name + ".",
      tags: ["county limit", "loan limit", "county line", "high cost", "conforming limit"]
    }),
    t({
      id: "jumbo-down", path: "jumbo", category: "Jumbo", borrowerType: "Higher-priced homes",
      question: "How much down payment do jumbo loans need?",
      shortAnswer: "Jumbo programs vary more than conforming ones. Some require a larger down payment than a typical conforming loan, while others are more flexible for strong borrowers. Credit, reserves, and the property all factor in. There's no single number — it depends on the program and your overall profile.",
      whyItMatters: "Down payment expectations on jumbo loans differ by lender, so planning early avoids surprises on a higher-priced purchase.",
      commonMistake: "Assuming jumbo always requires a very large down payment, or assuming conforming rules carry over unchanged.",
      followUpQuestions: [
        { q: "Why do reserves matter?", to: "jumbo-reserves" },
        { q: "What is the best jumbo strategy?", to: "jumbo-strategy" },
        { q: "Why do county loan limits matter?", to: "jumbo-county-limits" }
      ],
      relatedTopics: ["jumbo-reserves", "jumbo-strategy", "jumbo-county-limits"],
      nextBestStep: "A licensed mortgage professional can match a jumbo program to your profile. Ask " + brand.name + ".",
      tags: ["jumbo down payment", "down payment", "reserves", "high-priced", "program"]
    }),
    t({
      id: "jumbo-reserves", path: "jumbo", category: "Jumbo", borrowerType: "Higher-priced homes",
      question: "Why do reserves matter?",
      shortAnswer: "Reserves are the money you'd have left after closing — often measured in 'months of payments.' Lenders like to see a cushion, and jumbo and investment programs frequently ask for more reserves than basic conforming loans. Reserves can include certain retirement and investment accounts, not just cash.",
      whyItMatters: "Strong reserves can strengthen an application and sometimes offset other questions; thin reserves can limit options.",
      commonMistake: "Putting every dollar toward the down payment and leaving too little in reserve to meet program requirements.",
      followUpQuestions: [
        { q: "How much down payment do jumbo loans need?", to: "jumbo-down" },
        { q: "Should I pay off debt or save cash?", to: "credit-payoff-vs-save" },
        { q: "What reserves are needed for investment property?", to: "inv-reserves" }
      ],
      relatedTopics: ["jumbo-down", "credit-payoff-vs-save", "inv-reserves"],
      nextBestStep: "Want to know how reserves are counted for your scenario? Ask " + brand.name + ".",
      tags: ["reserves", "months of payments", "cushion", "retirement accounts", "cash after closing"]
    }),
    t({
      id: "jumbo-strategy", path: "jumbo", category: "Jumbo", borrowerType: "Higher-priced homes",
      question: "What is the best jumbo strategy?",
      shortAnswer: "There isn't one 'best' — the smart move is to compare paths. Sometimes structuring the loan to stay at a high-balance limit works well; other times a single jumbo loan is cleaner. Down payment, reserves, income type, and the county line all shape the answer. The goal is to check the options before assuming the most expensive path.",
      whyItMatters: "Jumbo decisions involve trade-offs, and a small structure change can shift your down payment, reserves, or review path.",
      commonMistake: "Jumping straight to a jumbo loan without checking whether a high-balance structure fits the county and the numbers.",
      followUpQuestions: [
        { q: "What is the difference between conforming, high-balance, and jumbo?", to: "jumbo-tiers" },
        { q: "Why do county loan limits matter?", to: "jumbo-county-limits" },
        { q: "Why do reserves matter?", to: "jumbo-reserves" }
      ],
      relatedTopics: ["jumbo-tiers", "jumbo-county-limits", "jumbo-reserves"],
      nextBestStep: "Run your scenario in the Mortgage Strategy studio, then Ask " + brand.name + " to talk through it.",
      tags: ["jumbo strategy", "structure", "high-balance", "compare", "down payment", "reserves"]
    }),

    /* ============ 6. REFINANCE STRATEGY ============ */
    t({
      id: "refi-when", path: "refinance", category: "Refinance", borrowerType: "Homeowner",
      question: "When does refinancing make sense?",
      shortAnswer: "Refinancing can make sense when it helps you meet a goal: lowering your payment, changing your loan term, switching from an adjustable to a fixed structure, removing mortgage insurance, or tapping equity for a purpose. The right answer depends on your numbers and how long you plan to keep the home.",
      whyItMatters: "A refinance has costs, so it only pays off if the benefit outweighs them over the time you'll stay. Goal first, math second.",
      commonMistake: "Refinancing only because rates moved, without checking whether the costs are recovered before you'd sell or refinance again.",
      followUpQuestions: [
        { q: "What is break-even?", to: "refi-breakeven" },
        { q: "What is cash-out refinance?", to: "refi-cashout" },
        { q: "Should I refinance now or wait?", to: "refi-now-or-wait" }
      ],
      relatedTopics: ["refi-breakeven", "refi-cashout", "refi-now-or-wait"],
      nextBestStep: "Want " + brand.name + " to see if a refinance fits your goal? Ask " + brand.name + ".",
      tags: ["refinance", "refi", "lower payment", "term", "remove pmi", "when to refinance"]
    }),
    t({
      id: "refi-cashout", path: "refinance", category: "Refinance", borrowerType: "Homeowner",
      question: "What is a cash-out refinance?",
      shortAnswer: "A cash-out refinance replaces your current mortgage with a larger one and gives you the difference in cash, using your home equity. People use it for things like home improvements or consolidating higher-interest debt. It increases your loan balance, so it's a tool to use with a clear purpose.",
      whyItMatters: "Cash-out can be powerful, but you're borrowing against your home — so the purpose and the long-term cost both matter.",
      commonMistake: "Using cash-out to clear short-term debt without changing the habits that created it, then ending up with both again.",
      followUpQuestions: [
        { q: "When does refinancing make sense?", to: "refi-when" },
        { q: "What is break-even?", to: "refi-breakeven" },
        { q: "Should I buy down the rate?", to: "refi-buydown" }
      ],
      relatedTopics: ["refi-when", "refi-breakeven", "refi-buydown"],
      nextBestStep: "Thinking about cash-out for a specific goal? A licensed mortgage professional can review it. Ask " + brand.name + ".",
      tags: ["cash-out", "cash out refinance", "equity", "debt consolidation", "home improvement"]
    }),
    t({
      id: "refi-buydown", path: "refinance", category: "Refinance", borrowerType: "Homeowner",
      question: "Should I buy down the rate?",
      shortAnswer: "Buying down the rate means paying more upfront (points) in exchange for a lower interest rate. It can be worth it if you'll keep the loan long enough to recover that cost through lower payments. If you might move or refinance sooner, paying less upfront may make more sense. It's a break-even question.",
      whyItMatters: "Points are real money today for savings spread over time — only worthwhile if you keep the loan past the break-even point.",
      commonMistake: "Paying for a big rate buydown, then selling or refinancing before the upfront cost is earned back.",
      followUpQuestions: [
        { q: "What is break-even?", to: "refi-breakeven" },
        { q: "When does refinancing make sense?", to: "refi-when" },
        { q: "Should I refinance now or wait?", to: "refi-now-or-wait" }
      ],
      relatedTopics: ["refi-breakeven", "refi-when", "refi-now-or-wait"],
      nextBestStep: "Want help running the buydown break-even? Ask " + brand.name + ".",
      tags: ["buydown", "buy down rate", "points", "discount points", "break-even", "upfront cost"]
    }),
    t({
      id: "refi-breakeven", path: "refinance", category: "Refinance", borrowerType: "Homeowner",
      question: "What is break-even on a refinance?",
      shortAnswer: "Break-even is the point where your monthly savings have added up to cover the cost of doing the refinance. For example, if a refinance costs you a certain amount and saves you a set amount each month, break-even is roughly how many months it takes to recover the cost. Past that point, the savings are yours.",
      whyItMatters: "Break-even turns 'is this worth it?' into a clear number you can compare against how long you'll keep the home.",
      commonMistake: "Focusing only on the new payment and ignoring how long it takes to recover the closing costs.",
      followUpQuestions: [
        { q: "Should I buy down the rate?", to: "refi-buydown" },
        { q: "When does refinancing make sense?", to: "refi-when" },
        { q: "Should I refinance now or wait?", to: "refi-now-or-wait" }
      ],
      relatedTopics: ["refi-buydown", "refi-when", "refi-now-or-wait"],
      nextBestStep: "Want your break-even estimated for a real scenario? Ask " + brand.name + ".",
      tags: ["break-even", "breakeven", "recover cost", "closing costs", "savings", "months"]
    }),
    t({
      id: "refi-now-or-wait", path: "refinance", category: "Refinance", borrowerType: "Homeowner",
      question: "Should I refinance now or wait?",
      shortAnswer: "It depends on your goal and the math, not on trying to time the market perfectly. If a refinance meets a clear need and the break-even fits your timeline, waiting may just delay the benefit. If the numbers are borderline, it can be reasonable to wait. " + brand.name + " can lay out the trade-off so you decide with clear eyes.",
      whyItMatters: "Nobody can promise where rates go. A goal-and-break-even view is more reliable than guessing the market.",
      commonMistake: "Waiting indefinitely for a 'perfect' moment and missing savings that already made sense.",
      followUpQuestions: [
        { q: "What is break-even?", to: "refi-breakeven" },
        { q: "When does refinancing make sense?", to: "refi-when" },
        { q: "What is cash-out refinance?", to: "refi-cashout" }
      ],
      relatedTopics: ["refi-breakeven", "refi-when", "refi-cashout"],
      nextBestStep: "Not sure on timing? A licensed mortgage professional can review the trade-off. Ask " + brand.name + ".",
      tags: ["refinance now", "wait", "timing", "rates", "break-even", "decision"]
    }),

    /* ============ 7. INVESTMENT PROPERTY LOANS ============ */
    t({
      id: "inv-rental-income", path: "investment", category: "Investment", borrowerType: "Investor",
      question: "Can rental income help me qualify?",
      shortAnswer: "Often yes. Lenders may count a portion of the rent — current or projected — toward your qualifying income, usually after applying a vacancy factor. How much counts depends on the program and the documentation (a lease, market rent estimate, or rental history). It can meaningfully change what you qualify for.",
      whyItMatters: "Rental income is a core lever for investors. Knowing how lenders count it helps you plan purchases realistically.",
      commonMistake: "Assuming 100% of the rent counts, when lenders typically discount it to account for vacancy and expenses.",
      followUpQuestions: [
        { q: "What is DSCR?", to: "inv-dscr" },
        { q: "How do lenders review investment property?", to: "inv-review" },
        { q: "How much down payment do investors need?", to: "inv-down" }
      ],
      relatedTopics: ["inv-dscr", "inv-review", "inv-down"],
      nextBestStep: "Want to know how rent could count for your deal? Ask " + brand.name + ".",
      tags: ["rental income", "rent", "vacancy", "lease", "qualify", "investor"]
    }),
    t({
      id: "inv-dscr", path: "investment", category: "Investment", borrowerType: "Investor",
      question: "What is DSCR?",
      shortAnswer: "DSCR stands for Debt Service Coverage Ratio. On a DSCR loan, the property is qualified mainly on whether its rent covers its mortgage payment — rather than on your personal income. It compares the property's income to its debt. Investors use it to scale a portfolio without relying solely on personal tax returns.",
      whyItMatters: "DSCR programs open doors for investors whose tax returns don't reflect their full ability to carry property debt.",
      commonMistake: "Assuming DSCR ignores everything personal — credit, reserves, and down payment still matter.",
      followUpQuestions: [
        { q: "Can rental income help me qualify?", to: "inv-rental-income" },
        { q: "How much down payment do investors need?", to: "inv-down" },
        { q: "What reserves are needed?", to: "inv-reserves" }
      ],
      relatedTopics: ["inv-rental-income", "inv-down", "inv-reserves"],
      nextBestStep: "Curious whether DSCR fits your property? A licensed mortgage professional can review it. Ask " + brand.name + ".",
      tags: ["dscr", "debt service coverage", "investment loan", "rent covers payment", "portfolio"]
    }),
    t({
      id: "inv-review", path: "investment", category: "Investment", borrowerType: "Investor",
      question: "How do lenders review an investment property?",
      shortAnswer: "Lenders look at the property's income (rent vs. payment), its condition and type, your credit and reserves, and the down payment. For DSCR loans the property's cash flow is central; for conventional investor loans your personal income and DTI matter more. Either way, the property itself is part of the decision.",
      whyItMatters: "Investment reviews weigh the deal and the borrower together, so a strong property can support a file — and a weak one can complicate it.",
      commonMistake: "Focusing only on purchase price and ignoring how rent, reserves, and property type affect the loan.",
      followUpQuestions: [
        { q: "What is DSCR?", to: "inv-dscr" },
        { q: "What reserves are needed?", to: "inv-reserves" },
        { q: "Can rental income help me qualify?", to: "inv-rental-income" }
      ],
      relatedTopics: ["inv-dscr", "inv-reserves", "inv-rental-income"],
      nextBestStep: "Want the property reviewed alongside your profile? Ask " + brand.name + ".",
      tags: ["investment review", "property type", "cash flow", "dti", "credit", "reserves"]
    }),
    t({
      id: "inv-down", path: "investment", category: "Investment", borrowerType: "Investor",
      question: "How much down payment do investors need?",
      shortAnswer: "Investment properties typically ask for more down payment than a primary home, and the exact amount varies by program, property type, and your profile. DSCR and conventional investor loans can differ here. More down can also improve the property's cash-flow math, which helps on DSCR.",
      whyItMatters: "Down payment on investment loans is usually higher, so planning it early keeps your purchase realistic.",
      commonMistake: "Budgeting an investment purchase like a primary residence and under-saving for the down payment and reserves.",
      followUpQuestions: [
        { q: "What reserves are needed?", to: "inv-reserves" },
        { q: "What is DSCR?", to: "inv-dscr" },
        { q: "How do lenders review investment property?", to: "inv-review" }
      ],
      relatedTopics: ["inv-reserves", "inv-dscr", "inv-review"],
      nextBestStep: "A licensed mortgage professional can outline the down payment for your target property. Ask " + brand.name + ".",
      tags: ["investor down payment", "down payment", "dscr", "property type", "investment"]
    }),
    t({
      id: "inv-reserves", path: "investment", category: "Investment", borrowerType: "Investor",
      question: "What reserves are needed for investment property?",
      shortAnswer: "Investor loans often require more reserves than a primary home — sometimes counted as several months of payments per property. The exact requirement depends on the program, how many financed properties you have, and the loan type. Certain retirement and investment accounts can often count toward reserves.",
      whyItMatters: "Reserves are a common sticking point for investors scaling up, so knowing the requirement protects your timeline.",
      commonMistake: "Using all available cash on down payment and closing, leaving too little to satisfy reserve requirements.",
      followUpQuestions: [
        { q: "How much down payment do investors need?", to: "inv-down" },
        { q: "Why do reserves matter?", to: "jumbo-reserves" },
        { q: "What is DSCR?", to: "inv-dscr" }
      ],
      relatedTopics: ["inv-down", "jumbo-reserves", "inv-dscr"],
      nextBestStep: "Want to know the reserve target for your deal? Ask " + brand.name + ".",
      tags: ["reserves", "investment reserves", "months of payments", "financed properties", "dscr"]
    }),

    /* ============ 8. DOCUMENTS & PREPARATION ============ */
    t({
      id: "doc-prepare", path: "documents", category: "Preparation", borrowerType: "All borrowers",
      question: "What documents should I prepare?",
      shortAnswer: "A typical starting set includes recent pay stubs, W-2s (and tax returns if you're self-employed), recent bank and asset statements, and a photo ID. Self-employed borrowers usually add business returns and possibly a profit-and-loss statement. Having clean, complete documents upfront makes the whole process smoother.",
      whyItMatters: "Most delays come from missing or incomplete documents, not from the borrower's actual profile.",
      commonMistake: "Sending partial statements (missing pages) or screenshots instead of full official documents.",
      followUpQuestions: [
        { q: "Why do large deposits matter?", to: "doc-large-deposits" },
        { q: "Can gift funds be used?", to: "doc-gift-funds" },
        { q: "What is pre-approval?", to: "ftb-preapproval" }
      ],
      relatedTopics: ["doc-large-deposits", "doc-gift-funds", "ftb-preapproval"],
      nextBestStep: "Want a document checklist for your situation? Ask " + brand.name + ".",
      tags: ["documents", "paperwork", "pay stubs", "w2", "tax returns", "bank statements", "checklist"]
    }),
    t({
      id: "doc-large-deposits", path: "documents", category: "Preparation", borrowerType: "All borrowers",
      question: "Why do large deposits matter?",
      shortAnswer: "Lenders verify where your down payment and reserves came from. A large deposit that doesn't match your normal income can prompt questions, because lenders need to confirm the money isn't undisclosed borrowed funds. A clear paper trail — like a copy of the check or transfer — usually resolves it quickly.",
      whyItMatters: "Sourcing funds is a standard part of approval. Knowing this in advance prevents last-minute scrambles.",
      commonMistake: "Depositing cash or moving money between accounts without keeping records, then struggling to document it later.",
      followUpQuestions: [
        { q: "Can gift funds be used?", to: "doc-gift-funds" },
        { q: "Can I use business funds for down payment?", to: "se-business-funds" },
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" }
      ],
      relatedTopics: ["doc-gift-funds", "se-business-funds", "credit-avoid-before-closing"],
      nextBestStep: "Have a big deposit coming? Ask " + brand.name + " how to document it cleanly.",
      tags: ["large deposits", "sourcing", "paper trail", "down payment", "bank statements", "cash"]
    }),
    t({
      id: "doc-gift-funds", path: "documents", category: "Preparation", borrowerType: "All borrowers",
      question: "Can gift funds be used?",
      shortAnswer: "Often yes — many programs allow a family member (and sometimes others) to gift funds toward your down payment or closing costs. Lenders typically require a gift letter stating the money isn't a loan, and they document the transfer. Some programs have rules about who can gift and how much, so it's worth checking early.",
      whyItMatters: "Gift funds can make a purchase possible, but they must be documented the right way to count.",
      commonMistake: "Receiving gift money informally (cash, no letter, no transfer record), which can make it hard to use.",
      followUpQuestions: [
        { q: "Why do large deposits matter?", to: "doc-large-deposits" },
        { q: "How much down payment do I need?", to: "ftb-down" },
        { q: "What documents should I prepare?", to: "doc-prepare" }
      ],
      relatedTopics: ["doc-large-deposits", "ftb-down", "doc-prepare"],
      nextBestStep: "Getting help with your down payment? Ask " + brand.name + " how to document a gift.",
      tags: ["gift funds", "gift letter", "down payment", "family", "closing costs", "sourcing"]
    }),
    t({
      id: "doc-owe-taxes", path: "documents", category: "Preparation", borrowerType: "All borrowers",
      question: "What happens if I owe taxes?",
      shortAnswer: "Owing taxes doesn't automatically stop a mortgage. Lenders generally want to see that you have a plan — for example, a documented payment arrangement that you've been following — and they may count that payment in your debts. An unaddressed tax lien is more serious and usually needs to be resolved. Details vary by program.",
      whyItMatters: "Many borrowers assume owing taxes is a dealbreaker. Often it's manageable when documented properly, but it needs to be addressed, not ignored.",
      commonMistake: "Hiding a tax balance or lien, which surfaces in underwriting and creates a bigger problem late in the process.",
      followUpQuestions: [
        { q: "Why do tax write-offs matter?", to: "se-writeoffs" },
        { q: "How does debt-to-income ratio work?", to: "credit-dti" },
        { q: "What documents should I prepare?", to: "doc-prepare" }
      ],
      relatedTopics: ["se-writeoffs", "credit-dti", "doc-prepare"],
      nextBestStep: "A licensed mortgage professional can review how a tax balance affects your options — and your tax advisor can guide the tax side. Ask " + brand.name + ".",
      tags: ["owe taxes", "tax lien", "payment plan", "irs", "back taxes", "underwriting"]
    }),
    t({
      id: "doc-before-closing", path: "documents", category: "Preparation", borrowerType: "All borrowers",
      question: "What should I NOT do before closing?",
      shortAnswer: "Before your loan funds, avoid opening new credit, making big purchases on credit, financing a car, changing jobs without telling your loan team, making large unexplained deposits, or moving money around without records. Lenders often re-verify near closing, so a quiet few weeks keeps your approval intact.",
      whyItMatters: "The final stretch is when surprises hurt most. Keeping things steady protects everything you've already done.",
      commonMistake: "Celebrating early by financing furniture, appliances, or a car — which can change your DTI right before funding.",
      followUpQuestions: [
        { q: "What should I avoid before closing?", to: "credit-avoid-before-closing" },
        { q: "Why do large deposits matter?", to: "doc-large-deposits" },
        { q: "What happens if I recently changed jobs?", to: "w2b-job-change" }
      ],
      relatedTopics: ["credit-avoid-before-closing", "doc-large-deposits", "w2b-job-change"],
      nextBestStep: "Unsure if something is safe before closing? Ask " + brand.name + " first.",
      tags: ["before closing", "do not", "new credit", "big purchase", "car", "job change", "funding"]
    })

  ];

  /* ---- Public API (also AI Phase-2 friendly) ---- */
  root.OrangeEducation = {
    brand: brand,
    disclaimer: disclaimer,
    situations: situations,
    paths: paths,
    topics: topics,
    /* convenience: id → topic */
    byId: function (id) {
      for (var i = 0; i < topics.length; i++) { if (topics[i].id === id) return topics[i]; }
      return null;
    },
    /* convenience: path id → topics in authored order */
    byPath: function (pathId) {
      var out = [];
      for (var i = 0; i < topics.length; i++) { if (topics[i].path === pathId) out.push(topics[i]); }
      return out;
    }
  };

})(typeof window !== "undefined" ? window : this);
