// Juyoung Suk's CV. Content-focused; styles live in lib.typ.

#import "lib.typ": *

#show: setup

// Publications, reverse-chronological. Update this array; numbering is
// derived automatically.
#let publications = (
  (
    title: "On the Limits and Opportunities of AI Reviewers: Reviewing the Reviews of Nature-Family Papers with 45 Expert Scientists",
    authors: [Seungone Kim, Dongkeun Yoon, Kiril Gashteovski, *Juyoung Suk*, Jinheon Baek, Pranjal Aggarwal, Ian Wu, et al.],
    venue: "arXiv preprint, May 2026",
  ),
  (
    title: "Predicting LLM Reasoning Performance with Small Proxy Model",
    authors: [Woosung Koh, *Juyoung Suk*, Sungjun Han, Se-Young Yun, Jamin Shin],
    venue: "ICLR 2026",
  ),
  (
    title: "Trillion 7B Technical Report",
    authors: [Sungjun Han, *Juyoung Suk*, Suyeong An, Hyungguk Kim, Kyuseok Kim, Wonsuk Yang, Seungtaek Choi, Jay Shin],
    venue: "Technical Report, April 2025",
  ),
  (
    title: "Evaluating Language Models as Synthetic Data Generators",
    authors: [Seungone Kim, *Juyoung Suk*, Xiang Yue, Vijay Viswanathan, Seongyun Lee, Yizhong Wang, Kiril Gashteovski, Carolin Lawrence, Sean Welleck, Graham Neubig],
    venue: "ACL 2025",
  ),
  (
    title: "LLM-as-an-Interviewer: Beyond Static Testing Through Dynamic LLM Evaluation",
    authors: [Eunsu Kim, *Juyoung Suk*, Seungone Kim, Niklas Muennighoff, Dongkeun Kim, Alice Oh],
    venue: "Findings of ACL 2025",
  ),
  (
    title: "MM-Eval: A Multilingual Meta-Evaluation Benchmark for LLM-as-a-Judge and Reward Models",
    authors: [Guijin Son, Dongkeun Yoon, *Juyoung Suk*, Javier Aula-Blasco, Mano Aslan, Vu Trong Kim, Shayekh Bin Islam, Jaume Prats-Cristià, Lucía Tormo-Bañuelos, Seungone Kim],
    venue: "arXiv preprint, October 2024",
  ),
  (
    title: "The BiGGen Bench: A Principled Benchmark for Fine-grained Evaluation of Language Models with Language Models",
    authors: [Seungone Kim, *Juyoung Suk*, Ji Yong Cho, Shayne Longpre, Chaeeun Kim, Dongkeun Yoon, Guijin Son, Yejin Cho, Sheikh Shafayat, et al.],
    venue: "NAACL 2025 (Best Paper Award)",
  ),
  (
    title: "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models",
    authors: [Seungone Kim\*, *Juyoung Suk*\*, Shayne Longpre, Bill Yuchen Lin, Jamin Shin, Sean Welleck, Graham Neubig, Moontae Lee, Kyungjae Lee, Minjoon Seo],
    venue: "EMNLP 2024",
  ),
  (
    title: "CLIcK: A Benchmark Dataset of Cultural and Linguistic Intelligence in Korean",
    authors: [Eunsu Kim, *Juyoung Suk*, Philhoon Oh, Haneul Yoo, James Thorne, Alice Oh],
    venue: "LREC-COLING 2024",
  ),
)

// Header
#cv-header(
  "Juyoung Suk",
  "Member of Technical Staff at Trillion Labs · Seoul, South Korea",
  (
    link("mailto:juyoung.suk@trillionlabs.co")[juyoung.suk\@trillionlabs.co],
    link("https://juyoung.site/")[juyoung.site],
    link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar],
    link("https://github.com/juyoungml")[GitHub],
    link("https://www.linkedin.com/in/juyoung-suk-b5175a192/")[LinkedIn],
  ),
)

#v(0.35cm)

// Education
#section-header("Education")

#row(
  [
    *Korea Advanced Institute of Science and Technology (KAIST)* #linebreak()
    M.S. in Artificial Intelligence · Advisor: Minjoon Seo #linebreak()
    #text(size: 9pt, style: "italic", fill: gray-color)[Thesis: Building Reliable Open-Source Language Model Evaluators through Weight Merging and Continual Training]
  ],
  [Mar. 2024 - Feb. 2026],
)

#v(0.1cm)

#row(
  [
    *Korea Advanced Institute of Science and Technology (KAIST)* #linebreak()
    B.S. in Computer Science
  ],
  [Mar. 2019 - Feb. 2024],
)

// Work Experience
#section-header("Work Experience")

#row(
  [*Member of Technical Staff*, Trillion Labs --- Seoul, South Korea],
  [Nov. 2024 - Present],
)
#bullets((
  [Core developer on Trillion's foundation model lineup — the *Gravity* (MoE) and *Tri* (0.5B–70B, including Tri-21B-Think) series. Models on #link("https://huggingface.co/trillionlabs")[HuggingFace].],
  "Work across pre-training and post-training: data, infrastructure, long-context training, and evaluation.",
))

#v(0.15cm)

#row(
  [*Machine Learning Engineer*, #link("https://thetaone.co")[ThetaOne] --- Seoul, South Korea],
  [Feb. 2023 - Jul. 2023],
)
#bullets((
  [Engineered end-to-end ML pipeline for #link("https://thetaone.co/metabuddy")[Metabuddy], implementing RAG with LangChain and custom models (grammar error detection, reranker) for enhanced user interactions.],
))

#v(0.15cm)

#row(
  [*Machine Learning Engineer Intern*, NAVER Corp. --- Seoul, South Korea],
  [Aug. 2022 - Feb. 2023],
)
#bullets((
  "Enhanced hate-speech detection for AI Clean Bot 2.0 (40M+ users) using active learning.",
))

// Honors & Awards
#section-header("Honors & Awards")

#row(
  [*Minister's Award*, Ministry of Science and ICT (과학기술정보통신부 장관상), Republic of Korea],
  [Aug. 2025],
)
#v(0.1cm)
#row(
  [*Best Paper Award*, NAACL 2025 --- for _The BiGGen Bench_],
  [2025],
)

#pagebreak()

// Selected Talks
#section-header("Selected Talks")

#row(
  [*Prometheus 2 Reward Model*, Meta (RAM Talk series, hosted by Ilia Kulikov)],
  [May 2024],
)
#v(0.1cm)
#row(
  [*LLMs as Evaluators*, Microsoft Research India (SNLP reading group, hosted by Sanchit Ahuja and Varun Gumma)],
  [Jun. 2024],
)

// Open-Source
#section-header("Open-Source")

#row(
  [*#link("https://github.com/prometheus-eval/prometheus-eval")[Prometheus-Eval]*, Core Developer],
  [May 2024 - May 2025],
)
#bullets((
  "Led development of the prometheus-eval open-source toolkit for evaluating language models with specialized LMs (1.1k+ GitHub stars).",
  [Architected and shipped evaluation pipelines, training scripts, and the `prometheus-eval` Python package.],
))

// Teaching
#section-header("Teaching")

#row(
  [*Teaching Assistant*, Introduction to Programming with Python, KAIST MOOC Platform --- Online],
  [Jan. 2022 - Jun. 2024],
)
#v(0.1cm)
#row(
  [*Teaching Assistant*, Introduction to Programming (CS101), KAIST --- Daejeon, South Korea],
  [Aug. 2021 - Jun. 2022],
)

// Publications
#section-header("Publications")

#text(size: 9pt, style: "italic", fill: muted)[
  Reverse chronological. \* denotes equal contribution. Full list on
  #link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar].
]
#v(0.25cm)

#publication-list(publications)

#footer("Last updated: May 2026 · Korean (native) · English (professional)")
