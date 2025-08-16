export const portfolioData = {
  // Personal Information
  personal: {
    name: "Juyoung Suk",
    title: "M.S. Student in Computer Science",
    email: "juyoung@university.edu",
    github: "https://github.com/juyoungml",
    linkedin: "#",
    googleScholar: "#",
    profileImage: "/profile-placeholder.jpg", // Add your profile image to public folder
    bio: "I am a graduate student researching machine learning and artificial intelligence. My work focuses on developing novel approaches to deep learning architectures and their applications in computer vision and natural language processing."
  },

  // About Section
  about: {
    paragraphs: [
      "I am currently pursuing my Master's degree in Computer Science, where I work on advancing the state-of-the-art in machine learning. My research interests span neural architecture search, interpretable AI, and efficient deep learning.",
      "Prior to graduate school, I completed my B.S. in Computer Science with a focus on artificial intelligence and data science. I have industry experience working on large-scale ML systems and have contributed to several open-source projects."
    ]
  },

  // Work Experience
  experience: [
    {
      id: 1,
      role: "Research Assistant",
      company: "AI Lab, University Name",
      period: "2023 - Present",
      description: "Working on neural architecture search and efficient deep learning models. Leading a project on interpretable AI for medical imaging.",
      highlights: [
        "Developed novel NAS algorithm reducing search time by 60%",
        "Published 2 papers in top-tier conferences",
        "Mentored 3 undergraduate students"
      ]
    },
    {
      id: 2,
      role: "Machine Learning Engineer Intern",
      company: "Tech Company",
      period: "Summer 2022",
      description: "Developed and deployed ML models for recommendation systems serving millions of users.",
      highlights: [
        "Improved recommendation accuracy by 15%",
        "Implemented A/B testing framework",
        "Optimized model inference latency by 40%"
      ]
    },
    {
      id: 3,
      role: "Software Engineer Intern",
      company: "Startup Name",
      period: "Summer 2021",
      description: "Built full-stack applications and integrated ML models into production systems.",
      highlights: [
        "Developed RESTful APIs using Python and FastAPI",
        "Implemented real-time data processing pipeline",
        "Contributed to open-source ML libraries"
      ]
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "AutoML Framework",
      description: "Open-source framework for automated machine learning with focus on neural architecture search",
      technologies: ["Python", "PyTorch", "Ray", "Docker"],
      github: "https://github.com/username/automl-framework",
      demo: "#",
      featured: true
    },
    {
      id: 2,
      title: "Vision Transformer Library",
      description: "Efficient implementation of various vision transformer architectures with pre-trained models",
      technologies: ["Python", "PyTorch", "CUDA", "HuggingFace"],
      github: "https://github.com/username/vit-library",
      paper: "#",
      featured: true
    },
    {
      id: 3,
      title: "Federated Learning Platform",
      description: "Privacy-preserving distributed learning platform for healthcare applications",
      technologies: ["Python", "TensorFlow", "gRPC", "Kubernetes"],
      github: "https://github.com/username/fed-learning",
      featured: false
    },
    {
      id: 4,
      title: "AI Code Assistant",
      description: "VS Code extension for AI-powered code completion and refactoring suggestions",
      technologies: ["TypeScript", "Node.js", "OpenAI API", "VS Code API"],
      github: "https://github.com/username/ai-code-assistant",
      demo: "#",
      featured: false
    }
  ],

  // Publications
  publications: [
    {
      id: 1,
      title: "Prometheus 2: An open source language model specialized in evaluating other language models",
      authors: "S Kim, J Suk, S Longpre, BY Lin, J Shin, S Welleck, G Neubig, M Lee, ...",
      venue: "arXiv preprint arXiv:2405.01535",
      year: 2024,
      abstract: "Proprietary LMs such as GPT-4 are often employed to assess the quality of responses from various LMs. However, concerns including transparency, controllability, and affordability strongly motivate the development of open-source LMs specialized in evaluations. On the other hand, existing open evaluator LMs exhibit critical shortcomings: 1) they issue scores that significantly diverge from those assigned by humans, and 2) they lack the flexibility to perform both direct assessment and pairwise ran",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:u-x6o8ySG0sC",
        arxiv: "https://arxiv.org/abs/2405.01535"
      }
    },
    {
      id: 2,
      title: "CLIcK: A Benchmark Dataset of Cultural and Linguistic Intelligence in Korean",
      authors: "E Kim, J Suk, P Oh, H Yoo, J Thorne, A Oh",
      venue: "arXiv preprint arXiv:2403.06412",
      year: 2024,
      abstract: "Despite the rapid development of large language models (LLMs) for the Korean language, there remains an obvious lack of benchmark datasets that test the requisite Korean cultural and linguistic knowledge. Because many existing Korean benchmark datasets are derived from the English counterparts through translation, they often overlook the different cultural contexts. For the few benchmark datasets that are sourced from Korean data capturing cultural knowledge, only narrow tasks such as bias and h",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:u5HHmVD_uO8C",
        arxiv: "https://arxiv.org/abs/2403.06412"
      }
    },
    {
      id: 3,
      title: "The BiGGen Bench: A Principled Benchmark for Fine-grained Evaluation of Language Models with Language Models",
      authors: "S Kim, J Suk, JY Cho, S Longpre, C Kim, D Yoon, G Son, Y Cho, ...",
      venue: "arXiv preprint arXiv:2406.05761",
      year: 2024,
      abstract: "As language models (LMs) become capable of handling a wide range of tasks, their evaluation is becoming as challenging as their development. Most generation benchmarks currently assess LMs using abstract evaluation criteria like helpfulness and harmlessness, which often lack the flexibility and granularity of human assessment. Additionally, these benchmarks tend to focus disproportionately on specific capabilities such as instruction following, leading to coverage bias. To overcome these limitat",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:d1gkVwhDpl0C",
        arxiv: "https://arxiv.org/abs/2406.05761"
      }
    },
    {
      id: 4,
      title: "Evaluating Language Models as Synthetic Data Generators",
      authors: "S Kim, J Suk, X Yue, V Viswanathan, S Lee, Y Wang, K Gashteovski, ...",
      venue: "arXiv preprint arXiv:2412.03679",
      year: 2024,
      abstract: "Given the increasing use of synthetic data in language model (LM) post-training, an LM's ability to generate high-quality data has become nearly as crucial as its ability to solve problems directly. While prior works have focused on developing effective data generation methods, they lack systematic comparison of different LMs as data generators in a unified setting. To address this gap, we propose AgoraBench, a benchmark that provides standardized settings and metrics to evaluate LMs' data gener",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:2osOgNQ5qMEC",
        arxiv: "https://arxiv.org/abs/2412.03679"
      }
    },
    {
      id: 5,
      title: "LLM-AS-AN-INTERVIEWER: Beyond Static Testing Through Dynamic LLM Evaluation",
      authors: "E Kim, J Suk, S Kim, N Muennighoff, D Kim, A Oh",
      venue: "arXiv preprint arXiv:2412.10424",
      year: 2024,
      abstract: "We introduce LLM-as-an-Interviewer, a novel paradigm for evaluating large language models (LLMs). This approach leverages multi-turn interactions where the LLM interviewer actively provides feedback on responses and poses follow-up questions to the evaluated LLM. At the start of the interview, the LLM interviewer dynamically modifies datasets to generate initial questions, mitigating data contamination. We apply the LLM-as-an-Interviewer framework to evaluate six models on the MATH and DepthQA t",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:UeHWp8X0CEIC",
        arxiv: "https://arxiv.org/abs/2412.10424"
      }
    },
    {
      id: 6,
      title: "MM-Eval: A Multilingual Meta-Evaluation Benchmark for LLM-as-a-Judge and Reward Models",
      authors: "G Son, D Yoon, J Suk, J Aula-Blasco, M Aslan, VT Kim, SB Islam, ...",
      venue: "arXiv preprint arXiv:2410.17578",
      year: 2024,
      abstract: "As Large Language Models (LLMs) are now capable of producing fluent and coherent content in languages other than English, it is not imperative to precisely evaluate these non-English outputs. However, when assessing the outputs from mutlilingual LLMs, prior works often employed LLM based evaluators that excel at assessing English outputs, without a thorough examination of whether these evaluators could effectively assess non-English text as well. Moreover, existing benchmarks to test evaluator L",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:9yKSN-GCB0IC",
        arxiv: "https://arxiv.org/abs/2410.17578"
      }
    },
    {
      id: 7,
      title: "Trillion 7B Technical Report",
      authors: "S Han, J Suk, S An, H Kim, K Kim, W Yang, S Choi, J Shin",
      venue: "arXiv preprint arXiv:2504.15431",
      year: 2025,
      abstract: "We introduce Trillion-7B, the most token-efficient Korean-centric multilingual LLM available. Our novel Cross-lingual Document Attention (XLDA) mechanism enables highly efficient and effective knowledge transfer from English to target languages like Korean and Japanese. Combined with optimized data mixtures, language-specific filtering, and tailored tokenizer construction, Trillion-7B achieves competitive performance while dedicating only 10\% of its 2T training tokens to multilingual data and r",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:qjMakFHDy7sC",
        arxiv: "https://arxiv.org/abs/2504.15431"
      }
    }
  ],

  // Research Areas
  research: [
    {
      id: 1,
      title: "Efficient Deep Learning",
      description: "Developing methods to reduce the computational and memory requirements of deep neural networks while maintaining accuracy.",
      icon: "⚡"
    },
    {
      id: 2,
      title: "Interpretable AI",
      description: "Creating techniques to understand and explain the decision-making processes of complex machine learning models.",
      icon: "🔍"
    },
    {
      id: 3,
      title: "Vision-Language Models",
      description: "Exploring the intersection of computer vision and natural language processing for multimodal understanding.",
      icon: "👁️"
    },
    {
      id: 4,
      title: "Federated Learning",
      description: "Investigating privacy-preserving machine learning techniques for distributed and decentralized training scenarios.",
      icon: "🔐"
    }
  ],

  // News
  news: [
    {
      id: 1,
      date: "2025-01",
      content: "Our paper \"Trillion 7B Technical Report\" has been released on arXiv.",
      link: "https://arxiv.org/abs/2504.15431"
    },
    {
      id: 2,
      date: "2024-12",
      content: "Two papers accepted: \"LLM-AS-AN-INTERVIEWER\" and \"Evaluating Language Models as Synthetic Data Generators\"."
    },
    {
      id: 3,
      date: "2024-10",
      content: "\"MM-Eval\" paper released - a multilingual meta-evaluation benchmark for LLM-as-a-Judge.",
      link: "https://arxiv.org/abs/2410.17578"
    },
    {
      id: 4,
      date: "2024-06",
      content: "\"BiGGen Bench\" published - principled benchmark for fine-grained LLM evaluation.",
      link: "https://arxiv.org/abs/2406.05761"
    },
    {
      id: 5,
      date: "2024-05",
      content: "\"Prometheus 2\" released - open source language model for evaluating other LLMs.",
      link: "https://arxiv.org/abs/2405.01535"
    }
  ],

  // Skills
  skills: {
    languages: ["Python", "TypeScript", "C++", "Java", "SQL"],
    frameworks: ["PyTorch", "TensorFlow", "JAX", "React", "Next.js"],
    tools: ["Docker", "Kubernetes", "AWS", "Git", "Linux"],
    ml: ["Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning", "MLOps"]
  }
}