// Portfolio Data Store
const portfolioData = {
    profile: {
        name: "Rohit Maurya",
        roles: ["Machine Learning Engineer", "AI Developer", "NLP Engineer", "Generative AI Engineer"],
        email: "rohitmaurya441865@gmail.com",
        phone: "+91 8003441865",
        location: "Varanasi, Uttar Pradesh, India",
        summary: "Machine Learning & AI Engineer building intelligent systems that deliver real impact. I architect production-grade ML models, NLP pipelines, and multi-agent AI systems using Python, PyTorch, LangChain, and AWS.I transform complex AI challenges into scalable solutions that drive measurable results. Passionate about pushing the boundaries of machine learning and automation to solve real-world problems at enterprise scale.",
        aboutDescription: "I am an engineering graduate in Information Technology with practical experience in machine learning, NLP, generative AI, and data engineering. I have developed multiple AI solutions including pricing engines, spam classifiers, predictive ML pipelines, and autonomous multi-agent systems using tools like Python, LangChain, Gemini, Pinecone and AWS. I enjoy building scalable automation solutions using LLMs, vector databases, and modern AI frameworks. I am actively exploring Generative AI, AI agents, NLP and production-ready ML workflows to contribute to impactful real-world AI applications.",
        profileImage: "assets/profile.mp4",
        resumeUrl: "assets/resume.pdf",
        github: "HelloRohit26",
        linkedin: "https://www.linkedin.com/in/rohitmaurya26?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        twitter: "https://x.com/RohitMaury50539?s=08",
        instagram: "HelloRohit26"
    },
    stats: {
        projects: "7",
        years: "",
        clients: ""
    },
    skills: [
        // Programming
        { name: "Python", level: 90, category: "programming", icon: "fab fa-python", color: "#3776ab" },
        { name: "C++ (Basic)", level: 60, category: "programming", icon: "fas fa-code", color: "#00599c" },
        { name: "SQL", level: 80, category: "programming", icon: "fas fa-database", color: "#336791" },

        // AI / ML
        { name: "LangChain", level: 85, category: "ai", icon: "fas fa-link", color: "#00a67e" },
        { name: "PyTorch", level: 75, category: "ai", icon: "fas fa-fire", color: "#ee4c2c" },
        { name: "Scikit-learn", level: 80, category: "ai", icon: "fas fa-brain", color: "#f7931e" },
        { name: "Pandas", level: 85, category: "ai", icon: "fas fa-table", color: "#150458" },
        { name: "NumPy", level: 85, category: "ai", icon: "fas fa-calculator", color: "#013243" },

        // NLP
        { name: "Text Preprocessing", level: 80, category: "nlp", icon: "fas fa-text-height", color: "#6366f1" },
        { name: "Tokenization", level: 80, category: "nlp", icon: "fas fa-cut", color: "#8b5cf6" },
        { name: "TF-IDF", level: 75, category: "nlp", icon: "fas fa-chart-bar", color: "#a855f7" },
        { name: "Word Embeddings", level: 75, category: "nlp", icon: "fas fa-vector-square", color: "#d946ef" },
        { name: "Text Classification", level: 80, category: "nlp", icon: "fas fa-tags", color: "#ec4899" },

        // LLMs and Generative AI
        { name: "ChatGPT", level: 90, category: "llm", icon: "fas fa-robot", color: "#10a37f" },
        { name: "Gemini", level: 85, category: "llm", icon: "fas fa-gem", color: "#4285f4" },
        { name: "Claude", level: 85, category: "llm", icon: "fas fa-comment-dots", color: "#cc785c" },

        // Databases
        { name: "ChromaDB", level: 80, category: "database", icon: "fas fa-database", color: "#ff6b6b" },
        { name: "Pinecone", level: 75, category: "database", icon: "fas fa-tree", color: "#00d4aa" },
        { name: "MongoDB", level: 80, category: "database", icon: "fas fa-leaf", color: "#47a248" },
        { name: "PostgreSQL", level: 75, category: "database", icon: "fas fa-database", color: "#336791" },

        // Cloud & DevOps
        { name: "AWS", level: 75, category: "cloud", icon: "fab fa-aws", color: "#ff9900" },
        { name: "Docker", level: 70, category: "cloud", icon: "fab fa-docker", color: "#2496ed" },
        { name: "Git / GitHub", level: 85, category: "cloud", icon: "fab fa-github", color: "#181717" },

        // Backend & APIs
        { name: "REST APIs", level: 85, category: "backend", icon: "fas fa-plug", color: "#6366f1" },
        { name: "Flask", level: 80, category: "backend", icon: "fas fa-flask", color: "#000000" },
        { name: "Streamlit", level: 85, category: "backend", icon: "fas fa-desktop", color: "#ff4b4b" },

        // IoT
        { name: "ESP32", level: 70, category: "iot", icon: "fas fa-microchip", color: "#e7352c" },
        { name: "IoT Sensors", level: 70, category: "iot", icon: "fas fa-wifi", color: "#00bcd4" },

        // Data Visualization
        { name: "Power BI", level: 75, category: "visualization", icon: "fas fa-chart-pie", color: "#f2c811" },
        { name: "Matplotlib", level: 80, category: "visualization", icon: "fas fa-chart-line", color: "#11557c" },
        { name: "Seaborn", level: 80, category: "visualization", icon: "fas fa-chart-area", color: "#4c72b0" },

        // Soft Skills
        { name: "Team Leadership", level: 85, category: "soft", icon: "fas fa-users", color: "#6366f1" },
        { name: "Problem-solving", level: 90, category: "soft", icon: "fas fa-puzzle-piece", color: "#10b981" },
        { name: "Analytical Thinking", level: 85, category: "soft", icon: "fas fa-lightbulb", color: "#f59e0b" },
        { name: "Communication", level: 85, category: "soft", icon: "fas fa-comments", color: "#ec4899" }
    ],
    projects: [
        {
            id: 1,
            title: "UrbanYield - AI Real Estate Pricing",
            description: "End-to-End AI-Powered Dynamic Pricing & Occupancy Engine for Real Estate. Uses machine learning to predict optimal property prices and occupancy rates.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
            category: "ai",
            technologies: ["Python", "Machine Learning", "Data Analysis", "Streamlit"],
            github: "https://github.com/HelloRohit26/UrbanYield-AI-Powered-Real-Estate-Pricing-Engine",
            live: "#",
            icon: "fas fa-building",
            featured: true
        },
        {
            id: 2,
            title: "Smart Spam Classifier",
            description: "An intelligent email spam classification system using machine learning algorithms to detect and filter spam messages with high accuracy.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
            category: "ai",
            technologies: ["Python", "Scikit-learn", "NLP", "Machine Learning"],
            github: "https://github.com/HelloRohit26/SmartSpamClassifier",
            live: "#",
            icon: "fas fa-envelope-open-text",
            featured: true
        },
        {
            id: 3,
            title: "MultiAgent Data Analyst",
            description: "An AI-powered multi-agent system that automatically performs SQL querying, data visualization, and insight generation on any dataset.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            category: "ai",
            technologies: ["Python", "LangChain", "SQL", "Data Visualization", "AI Agents"],
            github: "https://github.com/HelloRohit26/MultiAgent-Data-Analyst",
            live: "#",
            icon: "fas fa-robot",
            featured: true
        },
        {
            id: 4,
            title: "Predictive Maintenance System",
            description: "Industrial equipment predictive maintenance solution using machine learning to predict equipment failures before they occur.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
            category: "ai",
            technologies: ["JavaScript", "Python", "Machine Learning", "IoT"],
            github: "https://github.com/HelloRohit26/Predictive-Maintenance-for-Industrial-Equipment-",
            live: "#",
            icon: "fas fa-cogs",
            featured: true
        },
        {
            id: 5,
            title: "MCP Neural Nexus",
            description: "A demonstration project showcasing how Model Context Protocol (MCP) works for AI model integration and communication.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            category: "web",
            technologies: ["HTML", "JavaScript", "MCP", "AI Integration"],
            github: "https://github.com/HelloRohit26/MCP-Neural-Nexus",
            live: "#",
            icon: "fas fa-brain",
            featured: true
        },
        {
            id: 6,
            title: "Hybrid RAG Chatbot",
            description: "A Retrieval-Augmented Generation chatbot powered by Google Gemini, combining document retrieval with generative AI for accurate responses.",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
            category: "ai",
            technologies: ["Python", "Gemini API", "RAG", "LangChain", "Vector DB"],
            github: "https://github.com/HelloRohit26/Hybrid_RAG_Chatbot_Gemini",
            live: "#",
            icon: "fas fa-comments",
            featured: true
        }
    ],

};

// Deep merge function to combine saved data with defaults
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

// Load data from localStorage or use default
// Saved data takes priority over defaults, with defaults as fallback for new fields
function loadPortfolioData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        try {
            const savedData = JSON.parse(saved);
            // Return saved data merged with defaults (saved takes priority)
            return deepMerge(portfolioData, savedData);
        } catch (e) {
            console.error('Error parsing saved data:', e);
            return portfolioData;
        }
    }
    return portfolioData;
}

// Save data to localStorage
function savePortfolioData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
}
