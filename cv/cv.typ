// Juyoung Suk's CV in Typst

#set document(
  title: "Juyoung Suk CV",
  author: "Juyoung Suk",
  date: auto,
)

#set page(
  paper: "us-letter",
  margin: (x: 2cm, y: 2cm),
)

#set text(
  font: "Charter",
  size: 10pt,
  lang: "en",
)

#set par(justify: true, leading: 0.52em)

#let primary-color = rgb("#000000")
#let text-color = rgb("#2b2b2b")
#let gray-color = rgb("#666666")

#let section-header(title) = {
  v(0.3cm)
  text(size: 14pt, weight: "bold")[#title]
  v(1pt)
  line(length: 100%, stroke: 1pt + primary-color)
  v(0.2cm)
}

#let two-col(body, date) = {
  grid(
    columns: (1fr, 4.5cm),
    column-gutter: 1em,
    align: (left, right),
    body,
    [#text(size: 10pt, style: "italic", fill: gray-color)[#date]]
  )
  v(0.1cm)
}

#let one-col-entry(content) = {
  content
  v(0.1cm)
}

#let highlight-list(items) = {
  for item in items {
    [• #item]
    linebreak()
  }
}

// Header
#align(center)[
  #text(size: 25pt, weight: "bold")[Juyoung Suk]
  #v(0.5cm)

  #text(size: 10pt)[
    Seoul, South Korea |
    #link("mailto:juyoung.suk@trillionlabs.co")[juyoung.suk\@trillionlabs.co] |
    #link("https://juyoung.site/")[juyoung.site] |
    #link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar] |
    #link("https://github.com/juyoungml")[GitHub] |
    #link("https://www.linkedin.com/in/juyoung-suk-b5175a192/")[LinkedIn]
  ]
]

#v(0.5cm)

// Education
#section-header("Education")

#two-col(
  [*Korea Advanced Institute of Science and Technology (KAIST)*],
  [Mar. 2024 - Feb. 2026]
)
#one-col-entry[
  #highlight-list((
    "M.S. in Artificial Intelligence",
    "Advisor: Minjoon Seo",
    [Thesis: _Building Reliable Open-Source Language Model Evaluators through Weight Merging and Continual Training_]
  ))
]

#v(0.2cm)

#two-col(
  [*Korea Advanced Institute of Science and Technology (KAIST)*],
  [Mar. 2019 - Feb. 2024]
)
#one-col-entry[
  #highlight-list((
    "B.S. in Computer Science",
  ))
]

// Work Experience
#section-header("Work Experience")

#two-col(
  [*Member of Technical Staff*, Trillion Labs --- Seoul, South Korea],
  [Nov. 2024 - Present]
)
#one-col-entry[
  #highlight-list((
    [Core developer of Trillion-7B (#link("https://huggingface.co/trillionlabs/Trillion-7B-preview")[HuggingFace], #link("https://www.nvidia.com/en-us/on-demand/session/gtc25-S73857/")[NVIDIA GTC]), a 7.76B-parameter compute-efficient multilingual frontier model],
    "Working across pre-training and post-training: data, infrastructure, long-context training, and evaluation"
  ))
]

#v(0.2cm)

#two-col(
  [*Machine Learning Engineer*, #link("https://thetaone.co")[ThetaOne] --- Seoul, South Korea],
  [Feb. 2023 - Jul. 2023]
)
#one-col-entry[
  #highlight-list((
    [Engineered end-to-end ML pipeline for #link("https://thetaone.co/metabuddy")[Metabuddy], implementing RAG with LangChain and custom models (grammar error detection, reranker) for enhanced user interactions],
  ))
]

#v(0.2cm)

#two-col(
  [*Machine Learning Engineer Intern*, NAVER Corp. --- Seoul, South Korea],
  [Aug. 2022 - Feb. 2023]
)
#one-col-entry[
  #highlight-list((
    "Enhanced hate-speech detection for AI Clean Bot 2.0 (40M+ users) using active learning",
  ))
]

// Honors & Awards
#section-header("Honors & Awards")

#two-col(
  [*Best Paper Award*, NAACL 2025 --- for _The BiGGen Bench_],
  [2025]
)

// Publications
#section-header("Publications")

#text(size: 9pt, style: "italic", fill: gray-color)[
  Reverse chronological. \* denotes equal contribution. Full list on
  #link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar].
]
#v(0.3cm)

#let publication(number, title, authors, venue) = {
  one-col-entry[
    *[#number] #title*
    #v(0.1cm)
    #text(size: 9pt)[#authors]
    #v(0.05cm)
    #text(size: 9pt, style: "italic", fill: gray-color)[#venue]
    #v(0.2cm)
  ]
}

#publication(
  "1",
  "On the Limits and Opportunities of AI Reviewers: Reviewing the Reviews of Nature-Family Papers with 45 Expert Scientists",
  [Seungone Kim, Dongkeun Yoon, Kiril Gashteovski, *Juyoung Suk*, Jinheon Baek, Pranjal Aggarwal, Ian Wu, et al.],
  [arXiv preprint, May 2026]
)

#publication(
  "2",
  "Predicting LLM Reasoning Performance with Small Proxy Model",
  [Woosung Koh, *Juyoung Suk*, Sungjun Han, Se-Young Yun, Jamin Shin],
  [ICLR 2026]
)

#publication(
  "3",
  "Trillion 7B Technical Report",
  [Sungjun Han, *Juyoung Suk*, Suyeong An, Hyungguk Kim, Kyuseok Kim, Wonsuk Yang, Seungtaek Choi, Jay Shin],
  [Technical Report, April 2025]
)

#publication(
  "4",
  "Evaluating Language Models as Synthetic Data Generators",
  [Seungone Kim, *Juyoung Suk*, Xiang Yue, Vijay Viswanathan, Seongyun Lee, Yizhong Wang, Kiril Gashteovski, Carolin Lawrence, Sean Welleck, Graham Neubig],
  [ACL 2025]
)

#publication(
  "5",
  "LLM-as-an-Interviewer: Beyond Static Testing Through Dynamic LLM Evaluation",
  [Eunsu Kim, *Juyoung Suk*, Seungone Kim, Niklas Muennighoff, Dongkeun Kim, Alice Oh],
  [Findings of ACL 2025]
)

#publication(
  "6",
  "MM-Eval: A Multilingual Meta-Evaluation Benchmark for LLM-as-a-Judge and Reward Models",
  [Guijin Son, Dongkeun Yoon, *Juyoung Suk*, Javier Aula-Blasco, Mano Aslan, Vu Trong Kim, Shayekh Bin Islam, Jaume Prats-Cristià, Lucía Tormo-Bañuelos, Seungone Kim],
  [arXiv preprint, October 2024]
)

#publication(
  "7",
  "The BiGGen Bench: A Principled Benchmark for Fine-grained Evaluation of Language Models with Language Models",
  [Seungone Kim, *Juyoung Suk*, Ji Yong Cho, Shayne Longpre, Chaeeun Kim, Dongkeun Yoon, Guijin Son, Yejin Cho, Sheikh Shafayat, et al.],
  [NAACL 2025 (Best Paper Award)]
)

#publication(
  "8",
  "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models",
  [Seungone Kim\*, *Juyoung Suk*\*, Shayne Longpre, Bill Yuchen Lin, Jamin Shin, Sean Welleck, Graham Neubig, Moontae Lee, Kyungjae Lee, Minjoon Seo],
  [EMNLP 2024]
)

#publication(
  "9",
  "CLIcK: A Benchmark Dataset of Cultural and Linguistic Intelligence in Korean",
  [Eunsu Kim, *Juyoung Suk*, Philhoon Oh, Haneul Yoo, James Thorne, Alice Oh],
  [LREC-COLING 2024]
)

// Selected Talks
#section-header("Selected Talks")

#two-col(
  [*Trillion 7B*, #link("https://www.nvidia.com/en-us/on-demand/session/gtc25-S73857/")[NVIDIA GTC 2025] --- San Jose, CA (virtual)],
  [Mar. 2025]
)

// Projects
#section-header("Projects")

#two-col(
  [*#link("https://github.com/prometheus-eval/prometheus-eval")[Prometheus-Eval]*, Core Developer],
  [May 2024 - Present]
)
#one-col-entry[
  #highlight-list((
    "Led development of a 900+ star open-source repository for evaluating language models with specialized LMs.",
    [Architected and implemented evaluation pipelines, training scripts, and the `prometheus-eval` Python package.]
  ))
]

// Teaching Experience
#section-header("Teaching Experience")

#two-col(
  [*Teaching Assistant*, Introduction to Programming with Python, KAIST MOOC Platform --- Online],
  [Jan. 2022 - Jun. 2024]
)

#v(0.2cm)

#two-col(
  [*Teaching Assistant*, Introduction to Programming (CS101), KAIST --- Daejeon, South Korea],
  [Aug. 2021 - Jun. 2022]
)

// Languages
#section-header("Languages")

#one-col-entry[
  *Korean:* Native proficiency
  #v(0.2cm)
  *English:* Professional proficiency
]

#v(0.5cm)
#align(right)[
  #text(size: 8pt, fill: gray-color, style: "italic")[Last updated: May 2026]
]
