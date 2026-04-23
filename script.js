const loader = document.getElementById("loader");
const soundToggle = document.getElementById("sound-toggle");
const bookViewer = document.getElementById("book-viewer");
const bookClose = document.getElementById("book-close");
const panelKicker = document.getElementById("panel-kicker");
const panelTitle = document.getElementById("panel-title");
const panelBody = document.getElementById("panel-body");
const panelTags = document.getElementById("panel-tags");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const libraryPanels = {
  summary: {
    kicker: "Summary",
    title: "AI/ML Engineer with a builder's mindset.",
    lead: "A compact profile of how I build: applied ML, useful automation, clean backend workflows, and product-minded AI systems.",
    body: [
      "Skilled AI/ML engineer with experience in machine learning, data analysis, LLM integrations, forecasting, and backend automation.",
      "Currently pursuing an M.S. in Information Science at the University of North Texas with a 4.0 GPA while building practical AI systems."
    ],
    cards: [
      { label: "CORE SIGNAL", title: "Applied AI", text: "Machine learning, LLM integrations, forecasting, and automation built around real workflows." },
      { label: "OPERATING STYLE", title: "Builder Mode", text: "I like shipping practical systems, measuring outcomes, and tightening the user path." },
      { label: "CURRENT ARC", title: "Graduate + Product Work", text: "M.S. coursework and hands-on projects are aimed at AI systems that feel usable, not theoretical." }
    ],
    tags: ["4.0 GPA", "Machine Learning", "LLM Integration", "Python"]
  },
  education: {
    kicker: "Education",
    title: "University of North Texas, M.S. Information Science.",
    lead: "The academic track gives structure to the engineering work: data systems, applied AI, analytics, and software delivery.",
    body: [
      "Pursuing a Master of Science in Information Science at the University of North Texas with a 4.0 GPA.",
      "Academic work is centered on applied AI, data systems, analytics, and practical software delivery."
    ],
    cards: [
      { label: "PROGRAM", title: "M.S. Information Science", text: "Graduate study focused on data, AI, analytics, and information systems." },
      { label: "PERFORMANCE", title: "4.0 GPA", text: "Strong academic performance while building portfolio projects and applied systems." },
      { label: "LOCATION", title: "Dallas, TX", text: "Studying and building in a strong market for AI, data, and software opportunities." }
    ],
    tags: ["UNT", "M.S. Information Science", "4.0 GPA", "Dallas, TX"]
  },
  coursework: {
    kicker: "Coursework",
    title: "Graduate work focused on data, AI, and delivery.",
    lead: "The coursework map connects core ML ideas with the systems needed to deploy and explain them.",
    body: [
      "Coursework includes Machine Learning, Natural Language Processing, Big Data Analytics, Data Visualization, Database Systems, Predictive Analytics, Statistics, and Cloud and DevOps.",
      "The focus has been balancing analytical depth with practical engineering and product-minded execution."
    ],
    cards: [
      { label: "INTELLIGENCE", title: "ML + NLP", text: "Modeling, language pipelines, predictive analytics, and evaluation." },
      { label: "DATA CORE", title: "Big Data + Databases", text: "Data storage, querying, scalable analytics, and systems thinking." },
      { label: "DELIVERY", title: "Cloud + DevOps", text: "The deployment layer that turns experiments into usable software." }
    ],
    tags: ["NLP", "Big Data", "Visualization", "Cloud & DevOps"]
  },
  skills: {
    kicker: "Skills",
    title: "Built across ML, data, backend, and product tooling.",
    lead: "The stack is shaped around building AI features end to end: data, model logic, backend, frontend, and deployment wiring.",
    body: [
      "Core stack includes Python, SQL, JavaScript, React, Next.js, machine learning workflows, data analysis, and backend automation.",
      "Hands-on exposure includes LLM integrations, Gemini-powered features, Prisma, NextAuth, Supabase utilities, GitHub webhooks, and deployment workflows."
    ],
    cards: [
      { label: "AI / DATA", title: "Python + SQL", text: "Data analysis, ML workflows, backend automation, and query-driven product logic." },
      { label: "PRODUCT", title: "React + Next.js", text: "Interfaces, full-stack flows, auth, and app structure for AI-enabled tools." },
      { label: "INTEGRATION", title: "LLMs + Prisma", text: "Gemini workflows, database-backed features, Supabase utilities, and webhook automation." }
    ],
    tags: ["Python", "SQL", "React", "Next.js", "Prisma", "LLMs"]
  },
  experience: {
    kicker: "Experience",
    title: "Internship work across AI, automation, and software delivery.",
    lead: "The work experience is anchored in shipping practical AI and automation features, with enough frontend/backend overlap to understand the whole product path.",
    body: [
      "Hirello AI, AI Developer Intern, Apr 2026 to Present: integrated Gemini API workflows, built Python backend features, contributed with React and database integration, and supported secure data handling.",
      "Sithafal Technologies, Software Intern, Dec 2023 to May 2024: developed automation scripts, collaborated with Agile teams, and strengthened debugging and software engineering fundamentals."
    ],
    cards: [
      { label: "HIRELLO AI", title: "Gemini API Workflows", text: "Integrated LLM features, Python backend logic, React contributions, database integration, and secure data handling." },
      { label: "SITHAFAL", title: "Automation + Debugging", text: "Built scripts, worked in Agile loops, and strengthened delivery habits across software tasks." },
      { label: "ROLE PATTERN", title: "AI + Product Glue", text: "Comfortable moving between model-facing logic, backend plumbing, and user-facing behavior." }
    ],
    tags: ["Hirello AI", "Gemini API", "React", "Automation"]
  },
  projects: {
    kicker: "Projects",
    title: "Selected work in startup platforms and computer vision.",
    lead: "The project shelf now mirrors the resume: one full-stack AI startup platform and one computer vision traffic system.",
    body: [
      "Cocreate - Startup Platform: built a full-stack startup platform with real-time updates and AI integration using TypeScript, React, Prisma, Supabase, and Vercel.",
      "Traffic Violation Detection System: developed a Python and OpenCV computer vision system for vehicle detection, tracking, and traffic rule violation identification from video or CCTV footage."
    ],
    cards: [
      { label: "STARTUP PLATFORM", title: "Cocreate", text: "Full-stack startup platform with AI integration, real-time updates, Prisma ORM, Supabase, and Vercel deployment." },
      { label: "COMPUTER VISION", title: "Traffic Violation Detection System", text: "Python and OpenCV system for vehicle detection, tracking, and violation identification from video footage." }
    ],
    tags: ["Cocreate", "Traffic Detection", "React", "Prisma", "OpenCV"]
  },
  certifications: {
    kicker: "Certifications",
    title: "Credential proof for data, ML, and Azure AI.",
    lead: "The resume lists certificates across analytics, machine learning, and AI fundamentals.",
    body: [
      "Google Data Analytics Professional Certificate - Coursera.",
      "IBM Machine Learning Professional Certificate - Coursera.",
      "Microsoft Certified: Azure AI Fundamentals (AI-900)."
    ],
    cards: [
      { label: "GOOGLE", title: "Data Analytics Professional Certificate", text: "Coursera credential supporting analytics, data handling, and reporting foundations." },
      { label: "IBM", title: "Machine Learning Professional Certificate", text: "Coursera credential supporting machine learning workflows and model-building fundamentals." },
      { label: "MICROSOFT", title: "Azure AI Fundamentals (AI-900)", text: "Microsoft certification focused on Azure AI concepts and applied AI fundamentals." }
    ],
    tags: ["Google Data Analytics", "IBM Machine Learning", "Azure AI-900"]
  },
  contact: {
    kicker: "Contact",
    title: "Open to AI, data, and software opportunities.",
    lead: "Best fit: internships and roles involving applied machine learning, AI features, automation, data systems, or full-stack product engineering.",
    body: [
      "Available for internships and AI/ML engineering opportunities involving machine learning, intelligent products, automation, and analytics.",
      "Email: koushikchess12@gmail.com. Phone: +1 (940) 287-4359. GitHub: koushiksarun. LinkedIn: koushik-reddy."
    ],
    cards: [
      { label: "EMAIL", title: "koushikchess12@gmail.com", text: "Fastest channel for internship, project, and AI/ML engineering opportunities." },
      { label: "PHONE", title: "+1 (940) 287-4359", text: "Available for recruiting conversations and role-fit discussions." },
      { label: "PROFILES", title: "GitHub + LinkedIn", text: "GitHub: koushiksarun. LinkedIn: koushik-reddy." }
    ],
    tags: ["Dallas, TX", "GitHub", "LinkedIn", "Resume Ready"]
  }
};

const panelContexts = {
  summary: [
    {
      eyebrow: "WHY THIS MATTERS",
      title: "Applied AI, not just coursework",
      text: "The through-line is building useful systems: ML models, LLM workflows, data analysis, forecasting, and backend automation.",
      cards: [
        { label: "PROFILE", title: "AI/ML Engineer", text: "Machine learning and data work paired with practical backend and product delivery." },
        { label: "SIGNAL", title: "4.0 Graduate Track", text: "M.S. Information Science at UNT with strong academic performance and applied project work." },
        { label: "DIRECTION", title: "Builder Mindset", text: "Focused on intelligent products that solve concrete workflow problems." }
      ],
    },
    {
      eyebrow: "OPERATING MODE",
      title: "Model logic plus product sense",
      text: "I like connecting data, model behavior, APIs, and the user-facing layer so the final result feels usable.",
      cards: [
        { label: "TOOLS", title: "Python + SQL", text: "Core stack for analysis, automation, and ML workflows." },
        { label: "AI", title: "LLM Integration", text: "Gemini-powered features and prompt/API workflow integration." },
        { label: "PRODUCT", title: "React + Next.js", text: "Full-stack surfaces for making AI tools accessible." }
      ],
    },
  ],
  education: [
    {
      eyebrow: "ACADEMIC BASE",
      title: "University of North Texas",
      text: "M.S. Information Science with a 4.0 GPA, centered on applied AI, analytics, and data systems.",
      cards: [
        { label: "DEGREE", title: "M.S. Information Science", text: "Graduate program connecting data, information systems, and applied technical delivery." },
        { label: "PERFORMANCE", title: "4.0 GPA", text: "Strong academic consistency while building projects and internship experience." },
        { label: "LOCATION", title: "Dallas, TX", text: "Positioned in a strong market for AI, data, and software roles." }
      ],
    },
    {
      eyebrow: "LEARNING THESIS",
      title: "From data systems to AI products",
      text: "The degree supports the portfolio: data modeling, analytics, database thinking, visualization, and practical software execution.",
      cards: [
        { label: "DATA", title: "Analytics Foundation", text: "Work across statistics, visualization, and predictive analytics." },
        { label: "SYSTEMS", title: "Database Thinking", text: "Understanding storage, queries, and product data flows." },
        { label: "DELIVERY", title: "Practical Engineering", text: "Coursework is paired with full-stack and AI workflow projects." }
      ],
    },
  ],
  coursework: [
    {
      eyebrow: "CORE MODULES",
      title: "Machine learning and language systems",
      text: "Coursework covers Machine Learning, Natural Language Processing, Big Data Analytics, Data Visualization, Database Systems, Predictive Analytics, Statistics, and Cloud and DevOps.",
      cards: [
        { label: "ML", title: "Machine Learning", text: "Modeling, training, evaluation, and prediction-oriented workflows." },
        { label: "NLP", title: "Language Pipelines", text: "Text processing, features, and evaluation for language-focused AI tasks." },
        { label: "ANALYTICS", title: "Big Data + Stats", text: "Analyzing larger datasets with statistical reasoning and visualization." }
      ],
    },
    {
      eyebrow: "DELIVERY STACK",
      title: "The parts around the model",
      text: "The practical edge is knowing how the data, database, cloud, and DevOps layers support the AI feature.",
      cards: [
        { label: "DB", title: "Database Systems", text: "Data organization, retrieval, and backend product structure." },
        { label: "VIZ", title: "Data Visualization", text: "Turning analysis into readable evidence and decisions." },
        { label: "OPS", title: "Cloud + DevOps", text: "Deployment and operational thinking for software delivery." }
      ],
    },
  ],
  skills: [
    {
      eyebrow: "TECHNICAL STACK",
      title: "AI/data plus full-stack delivery",
      text: "Core stack includes Python, SQL, JavaScript, React, Next.js, machine learning workflows, data analysis, and backend automation.",
      cards: [
        { label: "AI / DATA", title: "Python + SQL", text: "ML workflows, data analysis, automation scripts, and query-driven logic." },
        { label: "FRONTEND", title: "React + Next.js", text: "Interfaces and full-stack flows for practical AI-enabled products." },
        { label: "BACKEND", title: "Prisma + Supabase", text: "Database-backed features, utilities, and app infrastructure." }
      ],
    },
    {
      eyebrow: "INTEGRATION LAYER",
      title: "LLM workflows and automation",
      text: "Hands-on exposure includes Gemini-powered features, Prisma, NextAuth, Supabase utilities, GitHub webhooks, and deployment workflows.",
      cards: [
        { label: "LLM", title: "Gemini API", text: "Prompt/API workflows and intelligent feature integration." },
        { label: "AUTH", title: "NextAuth", text: "Authentication patterns inside full-stack apps." },
        { label: "AUTOMATION", title: "GitHub Webhooks", text: "Event-driven product and startup review workflows." }
      ],
    },
  ],
  experience: [
    {
      eyebrow: "CURRENT ROLE",
      title: "Hirello AI - AI Developer Intern",
      text: "Integrated Gemini API workflows, built Python backend features, contributed with React and database integration, and supported secure data handling.",
      cards: [
        { label: "LLM", title: "Gemini Workflows", text: "Connected API behavior to product logic and user-facing flows." },
        { label: "BACKEND", title: "Python Features", text: "Built backend pieces for automation and AI-enabled functionality." },
        { label: "PRODUCT", title: "React + Database", text: "Contributed across interface work and persistence/integration layers." }
      ],
    },
    {
      eyebrow: "FOUNDATION ROLE",
      title: "Sithafal Technologies - Software Intern",
      text: "Developed automation scripts, collaborated with Agile teams, and strengthened debugging and software engineering fundamentals.",
      cards: [
        { label: "AUTOMATION", title: "Scripts", text: "Created tooling to reduce repetitive work and support delivery." },
        { label: "TEAM", title: "Agile Collaboration", text: "Worked inside team rhythms and iterative software development." },
        { label: "CRAFT", title: "Debugging", text: "Built fundamentals around reading, testing, and fixing software behavior." }
      ],
    },
  ],
  projects: [
    {
      eyebrow: "STARTUP PLATFORM",
      title: "Cocreate",
      text: "Built a full-stack startup platform with real-time updates and AI integration.",
      cards: [
        { label: "STACK", title: "TypeScript + React", text: "Frontend and app logic for a startup-focused product experience." },
        { label: "DATA", title: "Prisma + Supabase", text: "Scalable backend using Prisma ORM and Supabase database workflows." },
        { label: "DEPLOYMENT", title: "Vercel", text: "Application deployed with domain integration." }
      ],
    },
    {
      eyebrow: "COMPUTER VISION",
      title: "Traffic Violation Detection System",
      text: "Developed a computer vision system to detect traffic rule violations from video and CCTV footage.",
      cards: [
        { label: "STACK", title: "Python + OpenCV", text: "Computer vision pipeline for traffic footage analysis." },
        { label: "LOGIC", title: "Vehicle Tracking", text: "Implemented vehicle detection, tracking, and violation identification logic." },
        { label: "USE CASE", title: "Smart City Monitoring", text: "Designed for real-time traffic monitoring and city safety applications." }
      ],
    },
  ],
  certifications: [
    {
      eyebrow: "CERTIFICATION LEDGER",
      title: "Data, ML, and Azure AI credentials",
      text: "The resume-backed certification shelf highlights credentials across data analytics, machine learning, and AI fundamentals.",
      cards: [
        { label: "GOOGLE", title: "Data Analytics Professional Certificate", text: "Coursera credential for analytics and data foundations." },
        { label: "IBM", title: "Machine Learning Professional Certificate", text: "Coursera credential for machine learning practice." },
        { label: "MICROSOFT", title: "Azure AI Fundamentals", text: "AI-900 certification for Azure AI concepts." }
      ],
    },
    {
      eyebrow: "RESUME SOURCE",
      title: "Full details in the latest PDF",
      text: "The Resume button opens the integrated PDF with the complete certification list and profile details.",
      cards: [
        { label: "SOURCE", title: "Latest Resume", text: "The site uses the updated resume PDF." },
        { label: "FOCUS", title: "AI / Data / Cloud", text: "Credentials support the same role direction as the projects." },
        { label: "PROOF", title: "Credential Cards", text: "Each certificate is shown as a direct evidence card." }
      ],
    },
  ],
  contact: [
    {
      eyebrow: "OPEN CHANNELS",
      title: "AI, data, and software opportunities",
      text: "Available for internships and AI/ML engineering opportunities involving machine learning, intelligent products, automation, and analytics.",
      cards: [
        { label: "EMAIL", title: "koushikchess12@gmail.com", text: "Best direct channel for roles, interviews, and project conversations." },
        { label: "PHONE", title: "+1 (940) 287-4359", text: "Available for recruiting and role-fit discussions." },
        { label: "LOCATION", title: "Dallas, TX", text: "Open to opportunities around AI, data, and software engineering." }
      ],
    },
    {
      eyebrow: "PROFILES",
      title: "Public technical presence",
      text: "GitHub: koushiksarun. LinkedIn: koushik-reddy.",
      cards: [
        { label: "GITHUB", title: "koushiksarun", text: "Project code, experiments, and implementation artifacts." },
        { label: "LINKEDIN", title: "koushik-reddy", text: "Professional profile, education, and experience overview." },
        { label: "RESUME", title: "Resume Ready", text: "The portfolio is structured around resume sections and role evidence." }
      ],
    },
  ],
};

document.body.classList.add("is-loading");

const hideLoader = () => {
  if (!loader) {
    document.body.classList.remove("is-loading");
    return;
  }

  loader.classList.add("is-hidden");
  document.body.classList.remove("is-loading");
};

window.addEventListener("load", () => {
  window.setTimeout(hideLoader, prefersReducedMotion ? 120 : 1200);
});

let audioContext;
let masterGain;
let noiseSource;
let lowpassFilter;
let ambienceEnabled = false;

const createBrownNoise = (context) => {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;

  for (let i = 0; i < bufferSize; i += 1) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + (0.02 * white)) / 1.02;
    data[i] = lastOut * 3.5;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
};

const setSoundButton = (enabled) => {
  if (!soundToggle) {
    return;
  }

  soundToggle.textContent = enabled ? "Sound On" : "Sound";
  soundToggle.classList.toggle("is-active", enabled);
  soundToggle.setAttribute("aria-pressed", String(enabled));
};

const enableAmbience = async () => {
  if (!soundToggle) {
    return;
  }

  if (!audioContext) {
    audioContext = new window.AudioContext();
    masterGain = audioContext.createGain();
    lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = "lowpass";
    lowpassFilter.frequency.value = 520;
    masterGain.gain.value = 0.018;
    noiseSource = createBrownNoise(audioContext);
    noiseSource.connect(lowpassFilter);
    lowpassFilter.connect(masterGain);
    masterGain.connect(audioContext.destination);
    noiseSource.start();
  }

  await audioContext.resume();
  ambienceEnabled = true;
  setSoundButton(true);
};

const disableAmbience = async () => {
  if (!audioContext) {
    ambienceEnabled = false;
    setSoundButton(false);
    return;
  }

  await audioContext.suspend();
  ambienceEnabled = false;
  setSoundButton(false);
};

if (soundToggle) {
  setSoundButton(false);
  soundToggle.addEventListener("click", async () => {
    if (ambienceEnabled) {
      await disableAmbience();
    } else {
      await enableAmbience();
    }
  });
}

const sectionPanels = {
  summary: {
    kicker: "Summary",
    title: "AI/ML engineer focused on practical intelligent systems.",
    lead: "Summary",
    body: [
      "AI/ML engineer with experience in machine learning, data analysis, LLM integrations, forecasting, and backend automation.",
      "I build practical AI systems that connect data, model logic, APIs, and usable product flows."
    ],
    cards: [
      { label: "FOCUS", title: "Applied AI", text: "Machine learning, LLM features, forecasting, and automation for real workflows." },
      { label: "STYLE", title: "Builder Mindset", text: "Useful systems, measurable outcomes, and clear user paths." },
      { label: "DIRECTION", title: "AI Product Work", text: "Intelligent products that feel usable, not theoretical." }
    ],
    tags: ["Machine Learning", "LLM Integration", "Python", "Automation"]
  },
  education: {
    kicker: "Education",
    title: "University of North Texas",
    lead: "Education",
    body: [
      "Master of Science in Information Science, University of North Texas.",
      "Current GPA: 4.0."
    ],
    cards: [
      { label: "DEGREE", title: "M.S. Information Science", text: "Graduate program at the University of North Texas." },
      { label: "GPA", title: "4.0", text: "Current graduate GPA." },
      { label: "SCHOOL", title: "University of North Texas", text: "Information Science graduate study." }
    ],
    tags: ["UNT", "M.S. Information Science", "4.0 GPA"]
  },
  coursework: {
    kicker: "Coursework",
    title: "Coursework",
    lead: "Coursework",
    body: [
      "Machine Learning, Natural Language Processing, Big Data Analytics, Data Visualization, Database Systems, Predictive Analytics, Statistics, Cloud and DevOps."
    ],
    cards: [
      { label: "AI", title: "Machine Learning + NLP", text: "Modeling, language pipelines, prediction, and evaluation." },
      { label: "DATA", title: "Big Data + Databases", text: "Scalable analytics, database systems, and data handling." },
      { label: "DELIVERY", title: "Cloud + DevOps", text: "Cloud and deployment fundamentals." }
    ],
    tags: ["Machine Learning", "NLP", "Big Data", "Cloud & DevOps"]
  },
  skills: {
    kicker: "Skills",
    title: "Technical Skills",
    lead: "Skills",
    body: [
      "Python, SQL, JavaScript, React, Next.js, machine learning workflows, data analysis, backend automation, Gemini API, Prisma, NextAuth, Supabase utilities, GitHub webhooks, and deployment workflows."
    ],
    cards: [
      { label: "AI / DATA", title: "Python + SQL", text: "ML workflows, data analysis, backend automation, and query logic." },
      { label: "FRONTEND", title: "React + Next.js", text: "Interfaces and full-stack app structure." },
      { label: "INTEGRATION", title: "LLMs + Databases", text: "Gemini API, Prisma, Supabase utilities, NextAuth, and GitHub webhooks." }
    ],
    tags: ["Python", "SQL", "React", "Next.js", "Prisma", "LLMs"]
  },
  experience: {
    kicker: "Experience",
    title: "Professional Experience",
    lead: "Experience",
    body: [
      "Hirello AI, AI Developer Intern, Apr 2026 to Present.",
      "Sithafal Technologies, Software Intern, Dec 2023 to May 2024."
    ],
    cards: [
      { label: "HIRELLO AI", title: "AI Developer Intern", text: "Integrated Gemini API workflows, built Python backend features, contributed React and database integration work, and supported secure data handling." },
      { label: "SITHAFAL", title: "Software Intern", text: "Developed automation scripts, collaborated with Agile teams, and strengthened debugging and software engineering fundamentals." }
    ],
    tags: ["Hirello AI", "Sithafal Technologies", "Gemini API", "Automation"]
  },
  projects: {
    kicker: "Projects",
    title: "Selected Projects",
    lead: "Two resume projects: a full-stack startup platform and a computer vision traffic system.",
    body: [
      "Cocreate - Startup Platform uses TypeScript, React, Prisma, Supabase, and Vercel to deliver a full-stack startup platform with real-time updates and AI integration.",
      "Traffic Violation Detection System uses Python, OpenCV, and computer vision to detect traffic rule violations from video or CCTV footage with vehicle detection and tracking logic."
    ],
    cards: [
      { label: "STARTUP PLATFORM", title: "Cocreate", text: "Full-stack platform with real-time updates, AI integration, Prisma ORM, Supabase database workflows, and Vercel deployment.", image: "assets/cocreate.svg", link: "https://github.com/koushiksarun/Cocreate", linkText: "Open Cocreate" },
      { label: "COMPUTER VISION", title: "Traffic Violation Detection System", text: "Python and OpenCV system for vehicle detection, tracking, and traffic rule violation identification from video footage.", image: "assets/traffic-violation.svg", link: "https://github.com/koushiksarun/traffic-violation-detection-", linkText: "Open Project" }
    ],
    tags: ["Cocreate", "Traffic Violation Detection", "TypeScript", "React", "OpenCV"]
  },
  certifications: {
    kicker: "Certifications",
    title: "Certifications",
    lead: "Credential proof from the latest resume.",
    body: [
      "Google Data Analytics Professional Certificate - Coursera.",
      "IBM Machine Learning Professional Certificate - Coursera.",
      "Microsoft Certified: Azure AI Fundamentals (AI-900)."
    ],
    cards: [
      { label: "GOOGLE", title: "Data Analytics Professional Certificate", text: "Coursera credential supporting analytics and data foundations." },
      { label: "IBM", title: "Machine Learning Professional Certificate", text: "Coursera credential supporting machine learning workflows." },
      { label: "MICROSOFT", title: "Azure AI Fundamentals (AI-900)", text: "Microsoft certification for Azure AI concepts and applied AI fundamentals." }
    ],
    tags: ["Google", "IBM", "Microsoft AI-900", "Coursera"]
  }
};

const renderCard = (card) => `
  <article class="record-card">
    ${card.image ? `<img class="project-preview" src="${card.image}" alt="${card.title} preview">` : ""}
    <span>${card.label}</span>
    <strong>${card.title}</strong>
    <p>${card.text}</p>
    ${card.link ? `<a href="${card.link}" target="_blank" rel="noreferrer">${card.linkText || "Open"}</a>` : ""}
  </article>
`;

const renderPanel = (key) => {
  const panel = sectionPanels[key];
  if (!panel || !bookViewer || !panelKicker || !panelTitle || !panelBody || !panelTags) {
    return;
  }

  panelKicker.textContent = panel.kicker;
  panelTitle.textContent = panel.title;
  const lead = panel.lead ? `<p class="panel-lead">${panel.lead}</p>` : "";
  const body = panel.body.map((text) => `<p>${text}</p>`).join("");
  const cards = panel.cards.map(renderCard).join("");
  panelBody.innerHTML = `
    ${lead}
    <div class="panel-copy">${body}</div>
    <div class="record-grid">${cards}</div>
  `;
  panelTags.innerHTML = "";
  bookViewer.hidden = false;
  bookViewer.classList.remove("is-opening");
  void bookViewer.offsetWidth;
  bookViewer.classList.add("is-opening");
};

if (bookClose && bookViewer) {
  bookClose.addEventListener("click", () => {
    bookViewer.classList.remove("is-opening");
    bookViewer.hidden = true;
  });
}

window.addEventListener("library-panel-select", (event) => {
  const key = event.detail?.panel;
  if (key) {
    renderPanel(key);
  }
});

if (prefersReducedMotion) {
  hideLoader();
}
