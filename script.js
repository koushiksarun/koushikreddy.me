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
    title: "AI engineer building LLM, RAG, and computer vision systems.",
    lead: "A compact profile of the resume focus: LLM-powered apps, retrieval systems, computer vision, and scalable AI software.",
    body: [
      "AI Engineer with experience developing LLM-powered applications, Retrieval-Augmented Generation systems, and computer vision solutions.",
      "Graduated with an M.S. in Information Science from the University of North Texas with a 4.0 GPA."
    ],
    cards: [
      { label: "CORE SIGNAL", title: "LLM Applications", text: "Gemini API, LangChain, prompt engineering, conversational memory, and AI automation." },
      { label: "RETRIEVAL", title: "RAG Systems", text: "Embeddings, vector databases, semantic search, and retrieval-based knowledge workflows." },
      { label: "VISION", title: "Computer Vision", text: "Deep learning, object detection, tracking, and multimodal traffic event understanding." }
    ],
    tags: ["4.0 GPA", "LLMs", "RAG", "Computer Vision", "Python"]
  },
  education: {
    kicker: "Education",
    title: "University of North Texas, M.S. Information Science.",
    lead: "The academic track supports AI systems, retrieval, analytics, databases, and cloud computing.",
    body: [
      "Master of Science in Information Science at the University of North Texas, Denton, TX.",
      "Graduated May 2026 with a 4.0 GPA."
    ],
    cards: [
      { label: "PROGRAM", title: "M.S. Information Science", text: "Graduate study focused on data, AI, analytics, and information systems." },
      { label: "GRADUATION", title: "May 2026", text: "Completed the master's program with strong academic performance." },
      { label: "PERFORMANCE", title: "4.0 GPA", text: "Coursework centered on AI, analytics, retrieval, data systems, and cloud computing." }
    ],
    tags: ["UNT", "M.S. Information Science", "May 2026", "4.0 GPA"]
  },
  coursework: {
    kicker: "Coursework",
    title: "Graduate work focused on AI, retrieval, data, and cloud systems.",
    lead: "The coursework map connects model-building with retrieval, databases, analytics, and cloud foundations.",
    body: [
      "Coursework includes Machine Learning, Data Analytics, Information Retrieval, Database Systems, and Cloud Computing.",
      "The focus has been balancing analytical depth with practical AI engineering and deployable systems."
    ],
    cards: [
      { label: "INTELLIGENCE", title: "Machine Learning", text: "Modeling, training, evaluation, and prediction-oriented workflows." },
      { label: "RETRIEVAL", title: "Information Retrieval", text: "Retrieval thinking that supports semantic search and RAG systems." },
      { label: "SYSTEMS", title: "Databases + Cloud", text: "Database systems and cloud computing foundations for deployable AI software." }
    ],
    tags: ["Machine Learning", "Data Analytics", "Information Retrieval", "Cloud Computing"]
  },
  skills: {
    kicker: "Skills",
    title: "Built across AI systems, data, backend, and cloud tooling.",
    lead: "The stack is shaped around building AI features end to end: data, model logic, retrieval, backend APIs, and deployment wiring.",
    body: [
      "Languages include Python, C++, SQL, JavaScript, Java, and TypeScript.",
      "AI stack includes PyTorch, TensorFlow, Scikit-Learn, Generative AI, LLMs, RAG, Deep Learning, Computer Vision, NLP, LangChain, LangGraph, AI Agents, Prompt Engineering, Embeddings, Vector Databases, Semantic Search, and Fine-Tuning.",
      "Systems stack includes PySpark, ETL pipelines, Pandas, NumPy, BigQuery, AWS, Azure AI, Docker, Git, GitHub, CI/CD, FastAPI, React.js, REST APIs, MySQL, PostgreSQL, and Supabase."
    ],
    cards: [
      { label: "AI / ML", title: "PyTorch + TensorFlow", text: "Deep learning, generative AI, NLP, computer vision, and model optimization." },
      { label: "AI SYSTEMS", title: "LangChain + RAG", text: "Agents, semantic search, embeddings, vector databases, and prompt engineering." },
      { label: "BACKEND", title: "FastAPI + Cloud", text: "REST APIs, data pipelines, Docker, CI/CD, AWS, Azure AI, and database-backed apps." }
    ],
    tags: ["Python", "PyTorch", "FastAPI", "LangChain", "RAG", "Docker"]
  },
  experience: {
    kicker: "Experience",
    title: "Internship work across LLMs, RAG, automation, and generative AI.",
    lead: "The work experience is anchored in building practical AI workflows, retrieval systems, automation tools, and optimized model-facing features.",
    body: [
      "Hirello AI, AI Intern, Apr 2026 to May 2026: developed Gemini API applications, RAG systems, semantic search pipelines, prompt optimization, and conversational memory.",
      "Sithafal Technologies, Generative AI Intern, Dec 2023 to May 2024: built generative AI solutions, automation tools, data preprocessing workflows, feature engineering, testing, and optimization."
    ],
    cards: [
      { label: "HIRELLO AI", title: "LLM + RAG Workflows", text: "Developed Gemini API applications, retrieval pipelines, semantic search, and memory systems." },
      { label: "SITHAFAL", title: "Generative AI", text: "Built AI solutions and automation workflows for business use cases." },
      { label: "ROLE PATTERN", title: "AI Systems Builder", text: "Comfortable moving between models, retrieval, backend services, and user-facing behavior." }
    ],
    tags: ["Hirello AI", "Sithafal Technologies", "Gemini API", "RAG"]
  },
  projects: {
    kicker: "Projects",
    title: "Selected work in chatbots, research automation, and computer vision.",
    lead: "The project shelf mirrors the resume: AI chatbot, LLM research assistant, and multimodal traffic event understanding.",
    body: [
      "SLIME - AI Chatbot Platform: built a production-ready AI chatbot using Gemini API, LangChain, FastAPI, and React for context-aware responses.",
      "LLM-Powered Research Assistant: developed RAG pipelines using LangChain, FAISS, PyTorch, vector databases, and embedding-based retrieval.",
      "Multi-Modal Traffic Event Understanding System: built a deep learning system combining visual and structured traffic data for object detection, tracking, and event classification."
    ],
    cards: [
      { label: "CHATBOT", title: "SLIME - AI Chatbot Platform", text: "Gemini API, LangChain, FastAPI, React, semantic search, embeddings, and RAG." },
      { label: "RESEARCH AI", title: "LLM-Powered Research Assistant", text: "RAG pipelines with vector databases and automated summarization." },
      { label: "COMPUTER VISION", title: "Multi-Modal Traffic Event Understanding System", text: "PyTorch, OpenCV, TensorFlow, object detection, tracking, and event classification." }
    ],
    tags: ["SLIME", "Research Assistant", "Computer Vision", "FastAPI", "PyTorch"]
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
      "Email: koushikchess12@gmail.com. Phone: +1 (940) 287-4359. GitHub: koushiksarun. LinkedIn: koushik-sarun-reddy-741b86309."
    ],
    cards: [
      { label: "EMAIL", title: "koushikchess12@gmail.com", text: "Fastest channel for internship, project, and AI/ML engineering opportunities." },
      { label: "PHONE", title: "+1 (940) 287-4359", text: "Available for recruiting conversations and role-fit discussions." },
      { label: "PROFILES", title: "GitHub + LinkedIn", text: "GitHub: koushiksarun. LinkedIn: koushik-sarun-reddy-741b86309." }
    ],
    tags: ["Dallas, TX", "GitHub", "LinkedIn", "Resume Ready"]
  }
};

const panelContexts = {
  summary: [
    {
      eyebrow: "WHY THIS MATTERS",
      title: "LLM, RAG, and computer vision systems",
      text: "The through-line is building useful AI systems: LLM-powered apps, retrieval pipelines, semantic search, and computer vision workflows.",
      cards: [
        { label: "PROFILE", title: "AI Engineer", text: "LLM, RAG, and computer vision work paired with practical backend delivery." },
        { label: "SIGNAL", title: "4.0 Graduate Track", text: "M.S. Information Science at UNT, graduated May 2026." },
        { label: "DIRECTION", title: "AI Systems", text: "Focused on intelligent software that automates concrete workflows." }
      ],
    },
    {
      eyebrow: "OPERATING MODE",
      title: "Models plus retrieval plus APIs",
      text: "I like connecting model behavior, embeddings, vector search, APIs, and the user-facing layer so the final result feels usable.",
      cards: [
        { label: "TOOLS", title: "Python + FastAPI", text: "Core stack for AI services, automation, and backend workflows." },
        { label: "AI", title: "Gemini + LangChain", text: "Prompt/API workflows, agents, semantic search, and RAG." },
        { label: "PRODUCT", title: "React", text: "Frontend surfaces for making AI tools accessible." }
      ],
    },
  ],
  education: [
    {
      eyebrow: "ACADEMIC BASE",
      title: "University of North Texas",
      text: "M.S. Information Science with a 4.0 GPA, graduated May 2026, centered on AI, analytics, information retrieval, databases, and cloud systems.",
      cards: [
        { label: "DEGREE", title: "M.S. Information Science", text: "Graduate program connecting data, information systems, and applied technical delivery." },
        { label: "PERFORMANCE", title: "4.0 GPA", text: "Strong academic consistency while building AI projects and internship experience." },
        { label: "GRADUATION", title: "May 2026", text: "Completed the master's program at UNT." }
      ],
    },
    {
      eyebrow: "LEARNING THESIS",
      title: "From retrieval to AI products",
      text: "The degree supports the portfolio: data analytics, information retrieval, database thinking, cloud computing, and practical AI execution.",
      cards: [
        { label: "DATA", title: "Analytics Foundation", text: "Work across data analysis and evidence-driven decisions." },
        { label: "RETRIEVAL", title: "Information Retrieval", text: "Search, ranking, and retrieval thinking for RAG systems." },
        { label: "DELIVERY", title: "Cloud Computing", text: "Coursework is paired with deployable AI workflow projects." }
      ],
    },
  ],
  coursework: [
    {
      eyebrow: "CORE MODULES",
      title: "Machine learning, retrieval, and cloud systems",
      text: "Coursework covers Machine Learning, Data Analytics, Information Retrieval, Database Systems, and Cloud Computing.",
      cards: [
        { label: "ML", title: "Machine Learning", text: "Modeling, training, evaluation, and prediction-oriented workflows." },
        { label: "IR", title: "Information Retrieval", text: "Search and retrieval foundations for semantic AI workflows." },
        { label: "ANALYTICS", title: "Data Analytics", text: "Analyzing datasets with practical decision-oriented methods." }
      ],
    },
    {
      eyebrow: "DELIVERY STACK",
      title: "The parts around the model",
      text: "The practical edge is knowing how data, database, cloud, and API layers support the AI feature.",
      cards: [
        { label: "DB", title: "Database Systems", text: "Data organization, retrieval, and backend product structure." },
        { label: "API", title: "FastAPI Services", text: "Backend interfaces for AI inference and application workflows." },
        { label: "CLOUD", title: "Cloud Computing", text: "Deployment and operational thinking for software delivery." }
      ],
    },
  ],
  skills: [
    {
      eyebrow: "TECHNICAL STACK",
      title: "AI systems plus backend delivery",
      text: "Core stack includes Python, C++, SQL, JavaScript, Java, TypeScript, PyTorch, TensorFlow, Scikit-Learn, FastAPI, React.js, and cloud tooling.",
      cards: [
        { label: "AI / ML", title: "PyTorch + TensorFlow", text: "Deep learning, generative AI, NLP, computer vision, and model optimization." },
        { label: "FRONTEND", title: "React.js", text: "Interfaces and frontend flows for practical AI-enabled products." },
        { label: "BACKEND", title: "FastAPI + Supabase", text: "REST APIs, database-backed features, and AI service infrastructure." }
      ],
    },
    {
      eyebrow: "INTEGRATION LAYER",
      title: "LLM workflows and automation",
      text: "Hands-on exposure includes Gemini-powered features, LangChain, LangGraph, agents, embeddings, vector databases, semantic search, Docker, GitHub, and CI/CD workflows.",
      cards: [
        { label: "LLM", title: "Gemini API", text: "Prompt/API workflows and intelligent feature integration." },
        { label: "RAG", title: "Embeddings + Vector DBs", text: "Retrieval pipelines for knowledge extraction and answer relevance." },
        { label: "AUTOMATION", title: "Docker + CI/CD", text: "Delivery workflows for repeatable AI software deployment." }
      ],
    },
  ],
  experience: [
    {
      eyebrow: "CURRENT ROLE",
      title: "Hirello AI - AI Intern",
      text: "Developed Gemini API applications, RAG systems, semantic search pipelines, prompt optimization, and conversational memory.",
      cards: [
        { label: "LLM", title: "Gemini Workflows", text: "Built LLM-powered automation workflows with Python." },
        { label: "RAG", title: "Semantic Search", text: "Created embeddings and vector database pipelines for retrieval." },
        { label: "QUALITY", title: "Prompt Optimization", text: "Improved response relevance with prompt and memory systems." }
      ],
    },
    {
      eyebrow: "FOUNDATION ROLE",
      title: "Sithafal Technologies - Generative AI Intern",
      text: "Developed generative AI solutions, automation tools, data preprocessing, feature engineering, testing, debugging, and optimization.",
      cards: [
        { label: "AUTOMATION", title: "Intelligent Workflows", text: "Created tooling to reduce repetitive manual tasks." },
        { label: "DATA", title: "Preprocessing", text: "Worked on preprocessing, feature engineering, and model-ready data." },
        { label: "CRAFT", title: "Testing + Optimization", text: "Strengthened debugging and optimization for ML applications." }
      ],
    },
  ],
  projects: [
    {
      eyebrow: "CHATBOT PLATFORM",
      title: "SLIME - AI Chatbot Platform",
      text: "Built a production-ready AI chatbot with context-aware responses.",
      cards: [
        { label: "STACK", title: "Python + FastAPI", text: "Backend services supporting real-time AI inference." },
        { label: "AI", title: "Gemini + LangChain", text: "Context-aware responses with semantic search and RAG." },
        { label: "FRONTEND", title: "React", text: "Frontend integration for chatbot workflows." }
      ],
    },
    {
      eyebrow: "RESEARCH AI",
      title: "LLM-Powered Research Assistant",
      text: "Developed AI-powered research workflows using LLMs and retrieval-based search techniques.",
      cards: [
        { label: "STACK", title: "LangChain + FAISS", text: "RAG pipelines with vector databases and embedding retrieval." },
        { label: "MODEL", title: "PyTorch", text: "Foundation model workflows for knowledge extraction." },
        { label: "OUTPUT", title: "Summarization", text: "Automated synthesis to reduce manual research review." }
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
      text: "GitHub: koushiksarun. LinkedIn: koushik-sarun-reddy-741b86309.",
      cards: [
        { label: "GITHUB", title: "koushiksarun", text: "Project code, experiments, and implementation artifacts." },
        { label: "LINKEDIN", title: "koushik-sarun-reddy-741b86309", text: "Professional profile, education, and experience overview." },
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
    title: "AI engineer building LLM, RAG, and computer vision systems.",
    lead: "Summary",
    body: [
      "AI Engineer with experience developing LLM-powered applications, Retrieval-Augmented Generation systems, and computer vision solutions.",
      "I build scalable AI software with Python, PyTorch, TensorFlow, FastAPI, and modern retrieval workflows to automate real-world tasks."
    ],
    cards: [
      { label: "FOCUS", title: "LLM Applications", text: "Gemini API, LangChain, prompt engineering, conversational memory, and AI automation." },
      { label: "RETRIEVAL", title: "RAG Systems", text: "Embeddings, vector databases, semantic search, and retrieval-based knowledge workflows." },
      { label: "VISION", title: "Computer Vision", text: "Deep learning, object detection, tracking, and multimodal traffic event understanding." }
    ],
    tags: ["LLMs", "RAG", "Computer Vision", "Python"]
  },
  education: {
    kicker: "Education",
    title: "University of North Texas",
    lead: "Education",
    body: [
      "Master of Science in Information Science, University of North Texas, Denton, TX.",
      "Graduated May 2026 with a 4.0 GPA."
    ],
    cards: [
      { label: "DEGREE", title: "M.S. Information Science", text: "Graduate program at the University of North Texas." },
      { label: "GRADUATION", title: "May 2026", text: "Completed the master's program with strong academic performance." },
      { label: "GPA", title: "4.0", text: "Coursework centered on AI, analytics, retrieval, data systems, and cloud computing." }
    ],
    tags: ["UNT", "M.S. Information Science", "May 2026", "4.0 GPA"]
  },
  coursework: {
    kicker: "Coursework",
    title: "Coursework",
    lead: "Coursework",
    body: [
      "Machine Learning, Data Analytics, Information Retrieval, Database Systems, and Cloud Computing."
    ],
    cards: [
      { label: "AI", title: "Machine Learning", text: "Modeling, training, evaluation, and prediction-oriented workflows." },
      { label: "SEARCH", title: "Information Retrieval", text: "Retrieval thinking that supports semantic search and RAG systems." },
      { label: "SYSTEMS", title: "Databases + Cloud", text: "Database systems and cloud computing foundations for deployable AI software." }
    ],
    tags: ["Machine Learning", "Data Analytics", "Information Retrieval", "Cloud Computing"]
  },
  skills: {
    kicker: "Skills",
    title: "Technical Skills",
    lead: "Skills",
    body: [
      "Languages: Python, C++, SQL, JavaScript, Java, and TypeScript.",
      "AI stack: PyTorch, TensorFlow, Scikit-Learn, Generative AI, LLMs, RAG, Deep Learning, Computer Vision, NLP, LangChain, LangGraph, AI Agents, Prompt Engineering, Embeddings, Vector Databases, Semantic Search, and Fine-Tuning.",
      "Systems stack: PySpark, ETL pipelines, Pandas, NumPy, BigQuery, AWS, Azure AI, Docker, Git, GitHub, CI/CD, FastAPI, React.js, REST APIs, MySQL, PostgreSQL, and Supabase."
    ],
    cards: [
      { label: "AI / ML", title: "PyTorch + TensorFlow", text: "Deep learning, generative AI, NLP, computer vision, and model optimization." },
      { label: "AI SYSTEMS", title: "LangChain + RAG", text: "Agents, semantic search, embeddings, vector databases, and prompt engineering." },
      { label: "BACKEND", title: "FastAPI + Cloud", text: "REST APIs, data pipelines, Docker, CI/CD, AWS, Azure AI, and database-backed apps." }
    ],
    tags: ["Python", "PyTorch", "FastAPI", "LangChain", "RAG", "Docker"]
  },
  experience: {
    kicker: "Experience",
    title: "Professional Experience",
    lead: "Experience",
    body: [
      "Hirello AI, AI Intern, Apr 2026 to May 2026.",
      "Sithafal Technologies, Generative AI Intern, Dec 2023 to May 2024."
    ],
    cards: [
      { label: "HIRELLO AI", title: "LLM + RAG Workflows", text: "Developed Gemini API applications, RAG systems, semantic search pipelines, prompt optimization, and conversational memory." },
      { label: "SITHAFAL", title: "Generative AI Intern", text: "Built generative AI solutions, automation tools, data preprocessing workflows, feature engineering, testing, and optimization." }
    ],
    tags: ["Hirello AI", "Sithafal Technologies", "Gemini API", "RAG"]
  },
  projects: {
    kicker: "Projects",
    title: "Selected Projects",
    lead: "Resume projects spanning AI chatbots, research automation, and multimodal computer vision.",
    body: [
      "SLIME is an AI chatbot platform built with Python, Gemini API, LangChain, React, and FastAPI for context-aware responses.",
      "The LLM-Powered Research Assistant uses LangChain, FAISS, PyTorch, vector databases, and embedding-based retrieval to automate knowledge extraction and summarization.",
      "The Multi-Modal Traffic Event Understanding System combines visual and structured traffic data for object detection, tracking, and event classification."
    ],
    cards: [
      { label: "CHATBOT", title: "SLIME - AI Chatbot Platform", text: "Production-ready chatbot using Gemini API, LangChain, FastAPI, React, semantic search, embeddings, and RAG.", link: "https://github.com/koushiksarun", linkText: "Open GitHub" },
      { label: "RESEARCH AI", title: "LLM-Powered Research Assistant", text: "RAG pipelines with LangChain, FAISS, PyTorch, vector databases, and automated summarization.", link: "https://github.com/koushiksarun", linkText: "Open GitHub" },
      { label: "COMPUTER VISION", title: "Multi-Modal Traffic Event Understanding System", text: "PyTorch, OpenCV, and TensorFlow system for object detection, tracking, and traffic event classification.", image: "assets/traffic-violation.svg", link: "https://github.com/koushiksarun", linkText: "Open GitHub" }
    ],
    tags: ["SLIME", "Research Assistant", "Computer Vision", "FastAPI", "PyTorch"]
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
  },
  demoLab: {
    kicker: "Demo Lab",
    title: "Interactive project simulations from the AI chatbot stack.",
    lead: "A recruiter-friendly preview of the systems behind the chatbot zip: streaming chat, RAG retrieval, memory, tools, and human-reviewed feedback.",
    body: [
      "The AI chatbot is a production-grade full-stack application with a Next.js 15 frontend, FastAPI backend, LangChain orchestration, LlamaIndex RAG, PostgreSQL, Redis, and ChromaDB or Pinecone vector storage.",
      "These mini demos show the important product behaviors without requiring a backend server."
    ],
    layout: "demoLab",
    demos: [
      {
        label: "CHAT STREAM",
        title: "SLIME Chatbot",
        prompt: "How do you answer with memory and citations?",
        output: "I load conversation context, retrieve relevant document chunks, stream the response, and attach source citations.",
        meta: ["Next.js", "SSE", "FastAPI", "Gemini/OpenAI"]
      },
      {
        label: "RAG PIPELINE",
        title: "Document Retrieval",
        prompt: "Upload -> chunk -> embed -> retrieve",
        output: "PDF/DOCX/TXT files become 512-token chunks, embeddings are stored in ChromaDB or Pinecone, and top matches are injected into the answer.",
        meta: ["LlamaIndex", "Embeddings", "Vector DB", "Citations"]
      },
      {
        label: "AGENT MODE",
        title: "Tools + Guardrails",
        prompt: "Use tools only when useful.",
        output: "The ReAct agent can call calculator, weather, or web search tools while FastAPI middleware handles auth, rate limits, and prompt-injection checks.",
        meta: ["LangChain", "JWT", "Redis", "Security"]
      }
    ],
    tags: ["Demo Lab", "Streaming Chat", "RAG", "Agents"]
  },
  skillMap: {
    kicker: "Skill Constellation",
    title: "A connected map of the stack I use to build AI systems.",
    lead: "Skills are grouped by how they work together in real applications: model layer, retrieval layer, backend layer, product layer, data layer, and delivery layer.",
    body: [
      "This constellation turns the resume skill list into a system map, making it easier to see how Python, FastAPI, LangChain, RAG, React, databases, Docker, and cloud tooling connect.",
      "Hover or scan each cluster to see the tools I use in that part of the AI product lifecycle."
    ],
    layout: "skillMap",
    clusters: [
      { label: "MODEL", title: "AI / ML", skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Computer Vision", "Fine-Tuning"] },
      { label: "RETRIEVAL", title: "RAG Systems", skills: ["LangChain", "LlamaIndex", "Embeddings", "Semantic Search", "ChromaDB", "Pinecone"] },
      { label: "BACKEND", title: "APIs + Security", skills: ["FastAPI", "REST APIs", "JWT", "Rate Limiting", "Prompt Injection Checks", "Redis"] },
      { label: "PRODUCT", title: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind", "SSE Streaming", "Zustand"] },
      { label: "DATA", title: "Storage", skills: ["PostgreSQL", "SQLAlchemy", "Alembic", "Pandas", "NumPy", "BigQuery"] },
      { label: "DELIVERY", title: "Cloud + CI", skills: ["Docker", "GitHub Actions", "AWS", "Azure AI", "Nginx", "CI/CD"] }
    ],
    tags: ["Skill Map", "AI Systems", "RAG", "Cloud"]
  },
  assistant: {
    kicker: "AI Assistant",
    title: "A guided portfolio assistant for quick recruiter questions.",
    lead: "This scripted assistant gives fast answers about my strengths, chatbot architecture, projects, and role fit. It is designed so it can later be connected to the real RAG backend.",
    body: [
      "Ask one of the prepared questions to get a concise answer based on the resume and chatbot project.",
      "The assistant intentionally stays grounded in portfolio facts instead of free-form guessing."
    ],
    layout: "assistant",
    prompts: [
      {
        question: "What is Koushik strongest at?",
        answer: "Koushik is strongest at building applied AI systems: LLM applications, RAG pipelines, FastAPI backends, vector search, and computer vision workflows."
      },
      {
        question: "What is inside the chatbot project?",
        answer: "The chatbot includes a Next.js 15 frontend, FastAPI backend, LangChain orchestration, LlamaIndex RAG, PostgreSQL, Redis, vector storage, JWT auth, agents, memory, and RLHF feedback review."
      },
      {
        question: "Which roles fit this portfolio?",
        answer: "Best-fit roles include AI Engineer, Machine Learning Engineer, Generative AI Engineer, RAG Engineer, AI Backend Engineer, and applied AI internship roles."
      },
      {
        question: "Why is this portfolio different?",
        answer: "It does not only list skills. It turns the resume into an interactive 3D library with project simulations, a skill system map, and an assistant-style recruiter path."
      }
    ],
    tags: ["Portfolio Assistant", "Recruiter Guide", "RAG Ready"]
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

const renderDemoLab = (panel) => `
  <div class="demo-lab">
    ${panel.demos.map((demo) => `
      <article class="demo-card">
        <span>${demo.label}</span>
        <strong>${demo.title}</strong>
        <div class="demo-terminal">
          <p class="demo-prompt">${demo.prompt}</p>
          <p>${demo.output}</p>
        </div>
        <div class="demo-meta">
          ${demo.meta.map((item) => `<em>${item}</em>`).join("")}
        </div>
      </article>
    `).join("")}
  </div>
`;

const renderSkillMap = (panel) => `
  <div class="skill-map">
    ${panel.clusters.map((cluster) => `
      <article class="skill-node">
        <span>${cluster.label}</span>
        <strong>${cluster.title}</strong>
        <div>
          ${cluster.skills.map((skill) => `<em>${skill}</em>`).join("")}
        </div>
      </article>
    `).join("")}
  </div>
`;

const renderAssistant = (panel) => `
  <div class="assistant-console">
    <div class="assistant-screen" id="assistant-screen">
      <span>PORTFOLIO ASSISTANT</span>
      <strong>Ask me about Koushik's AI work.</strong>
      <p>${panel.prompts[0].answer}</p>
    </div>
    <div class="assistant-questions">
      ${panel.prompts.map((prompt, index) => `
        <button type="button" data-assistant-answer="${index}">${prompt.question}</button>
      `).join("")}
    </div>
  </div>
`;

const renderCustomPanel = (panel) => {
  if (panel.layout === "demoLab") {
    return renderDemoLab(panel);
  }

  if (panel.layout === "skillMap") {
    return renderSkillMap(panel);
  }

  if (panel.layout === "assistant") {
    return renderAssistant(panel);
  }

  return "";
};

const bindPanelInteractions = (panel) => {
  if (panel.layout !== "assistant") {
    return;
  }

  const screen = document.getElementById("assistant-screen");
  const buttons = panelBody.querySelectorAll("[data-assistant-answer]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = panel.prompts[Number(button.dataset.assistantAnswer)];
      if (!prompt || !screen) {
        return;
      }

      screen.innerHTML = `
        <span>PORTFOLIO ASSISTANT</span>
        <strong>${prompt.question}</strong>
        <p>${prompt.answer}</p>
      `;
    });
  });
};

const renderPanel = (key) => {
  const panel = sectionPanels[key];
  if (!panel || !bookViewer || !panelKicker || !panelTitle || !panelBody || !panelTags) {
    return;
  }

  panelKicker.textContent = panel.kicker;
  panelTitle.textContent = panel.title;
  const lead = panel.lead ? `<p class="panel-lead">${panel.lead}</p>` : "";
  const body = panel.body.map((text) => `<p>${text}</p>`).join("");
  const cards = panel.cards ? panel.cards.map(renderCard).join("") : "";
  const custom = renderCustomPanel(panel);
  panelBody.innerHTML = `
    ${lead}
    <div class="panel-copy">${body}</div>
    ${custom || `<div class="record-grid">${cards}</div>`}
  `;
  bindPanelInteractions(panel);
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
