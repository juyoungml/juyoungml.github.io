export const portfolioData = {
  // Personal Information
  personal: {
    name: "Juyoung Suk",
    title: "M.S. Student in Artificial Intelligence",
    email: "juyoung@kaist.ac.kr",
    github: "https://github.com/juyoungml",
    linkedin: "https://www.linkedin.com/in/juyoung-suk-b5175a192/",
    googleScholar: "https://scholar.google.com/citations?user=mENsLCkAAAAJ",
    profileImage: "/profile.jpeg",
    bio: "I am a graduate student at KAIST LK Lab, advised by Minjoon Seo. I am focusing on training foundation models at scale, and optimizing them for real-world applications."
  },


  // Work Experience
  experience: [
    {
      id: 1,
      role: "Member of Technical Staff",
      company: "Trillion Labs",
      period: "Nov. 2024 - Present",
      description: "Pretraining & Post-training foundation models",
      highlights: [
        "Trained Tri-7B, Tri-21B, and Tri-70B models",
      ]
    },
    {
      id: 2,
      role: "Machine Learning Engineer",
      company: "ThetaOne",
      period: "Feb. 2023 - July. 2023",
      description: "Developed RAG pipeline for Metabuddy.",
      highlights: [
        "End-to-end ML pipeline for Metabuddy application"
      ]
    },
    {
      id: 3,
      role: "Machine Learning Engineer Intern",
      company: "NAVER Corp.",
      period: "Aug. 2022 - Feb. 2023",
      description: "Hate speech detection for AI Clean Bot 2.0.",
      highlights: [
        "40+ million user production model"
      ]
    },
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Prometheus-Eval",
      description: "Led development of a 900+ stars open-source repository for evaluating language models using specialized LMs",
      technologies: ["Python", "PyTorch", "HuggingFace", "OpenAI API"],
      github: "https://github.com/prometheus-eval/prometheus-eval",
      demo: "#",
      featured: true
    },
  ],

  // Publications
  publications: [
    {
      id: 1,
      title: "Prometheus 2: An open source language model specialized in evaluating other language models",
      authors: "S Kim, J Suk, S Longpre, BY Lin, J Shin, S Welleck, G Neubig, M Lee, ...",
      venue: "EMNLP",
      year: 2024,
      abstract: "Proprietary LMs such as GPT-4 are often employed to assess the quality of responses from various LMs. However, concerns including transparency, controllability, and affordability strongly motivate the development of open-source LMs specialized in evaluations. On the other hand, existing open evaluator LMs exhibit critical shortcomings: 1) they issue scores that significantly diverge from those assigned by humans, and 2) they lack the flexibility to perform both direct assessment and pairwise ran",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:u-x6o8ySG0sC",
        arxiv: "https://arxiv.org/abs/2405.01535",
        code: "https://github.com/prometheus-eval/prometheus-eval"
      }
    },
    {
      id: 2,
      title: "CLIcK: A Benchmark Dataset of Cultural and Linguistic Intelligence in Korean",
      authors: "E Kim, J Suk, P Oh, H Yoo, J Thorne, A Oh",
      venue: "LREC-COLING",
      year: 2024,
      abstract: "Despite the rapid development of large language models (LLMs) for the Korean language, there remains an obvious lack of benchmark datasets that test the requisite Korean cultural and linguistic knowledge. Because many existing Korean benchmark datasets are derived from the English counterparts through translation, they often overlook the different cultural contexts. For the few benchmark datasets that are sourced from Korean data capturing cultural knowledge, only narrow tasks such as bias and h",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:u5HHmVD_uO8C",
        arxiv: "https://arxiv.org/abs/2403.06412",
        code: "https://github.com/rladmstn1714/CLIcK"
      }
    },
    {
      id: 3,
      title: "The BiGGen Bench: A Principled Benchmark for Fine-grained Evaluation of Language Models with Language Models",
      authors: "S Kim, J Suk, JY Cho, S Longpre, C Kim, D Yoon, G Son, Y Cho, ...",
      venue: "NAACL Best Paper Award",
      year: 2024,
      abstract: "As language models (LMs) become capable of handling a wide range of tasks, their evaluation is becoming as challenging as their development. Most generation benchmarks currently assess LMs using abstract evaluation criteria like helpfulness and harmlessness, which often lack the flexibility and granularity of human assessment. Additionally, these benchmarks tend to focus disproportionately on specific capabilities such as instruction following, leading to coverage bias. To overcome these limitat",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:d1gkVwhDpl0C",
        arxiv: "https://arxiv.org/abs/2406.05761",
        code: "https://github.com/prometheus-eval/prometheus-eval/tree/main/BiGGen-Bench"
      }
    },
    {
      id: 4,
      title: "Evaluating Language Models as Synthetic Data Generators",
      authors: "S Kim, J Suk, X Yue, V Viswanathan, S Lee, Y Wang, K Gashteovski, ...",
      venue: "ACL",
      year: 2025,
      abstract: "Given the increasing use of synthetic data in language model (LM) post-training, an LM's ability to generate high-quality data has become nearly as crucial as its ability to solve problems directly. While prior works have focused on developing effective data generation methods, they lack systematic comparison of different LMs as data generators in a unified setting. To address this gap, we propose AgoraBench, a benchmark that provides standardized settings and metrics to evaluate LMs' data gener",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:2osOgNQ5qMEC",
        arxiv: "https://arxiv.org/abs/2412.03679",
        code: "https://github.com/neulab/data-agora"
      }
    },
    {
      id: 5,
      title: "LLM-AS-AN-INTERVIEWER: Beyond Static Testing Through Dynamic LLM Evaluation",
      authors: "E Kim, J Suk, S Kim, N Muennighoff, D Kim, A Oh",
      venue: "ACL",
      year: 2025,
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
      venue: "Preprint",
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
      venue: "Technical Whitepaper",
      year: 2025,
      abstract: "We introduce Trillion-7B, the most token-efficient Korean-centric multilingual LLM available. Our novel Cross-lingual Document Attention (XLDA) mechanism enables highly efficient and effective knowledge transfer from English to target languages like Korean and Japanese. Combined with optimized data mixtures, language-specific filtering, and tailored tokenizer construction, Trillion-7B achieves competitive performance while dedicating only 10\% of its 2T training tokens to multilingual data and r",
      links: {
        paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mENsLCkAAAAJ&citation_for_view=mENsLCkAAAAJ:qjMakFHDy7sC",
        arxiv: "https://arxiv.org/abs/2504.15431"
      }
    }
  ],


  // News
  news: [
    {
      id: 0,
      date: "2025-08",
      content: "We released Tri-7B, Tri-21B, and Tri-70B models! Come check out our models on HuggingFace!",
      link: "https://huggingface.co/collections/trillionlabs/tri-series-687fa9ff7eb23e8ba847ef93"
    },
    {
      id: 1,
      date: "2025-06",
      content: "Glad to share that The BiGGen Bench has won the best paper award in NAACL 2025!",
      link: "https://arxiv.org/abs/2406.05761"
    },
    {
      id: 2,
      date: "2025-03",
      content: "We released Trillion-7B Technical Whitepaper detailing our compute-efficient multilingual frontier model.",
      link: "https://arxiv.org/abs/2504.15431" 
    },
    {
      id: 3,
      date: "2024-11",
      content: "Started position as Member of Technical Staff at Trillion Labs, working on next-generation multilingual language models."
    },
  ],

  // Skills
  skills: {
    languages: ["Python", "TypeScript", "C++", "Java", "SQL"],
    frameworks: ["PyTorch", "TensorFlow", "JAX", "React", "Next.js"],
    tools: ["Docker", "Kubernetes", "AWS", "Git", "Linux"],
    ml: ["Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning", "MLOps"]
  }
}