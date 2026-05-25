// Juyoung Suk's CV in Typst

#set document(
  title: "Juyoung Suk CV",
  author: "Juyoung Suk",
  date: auto,
)

#set page(
  paper: "us-letter",
  margin: (x: 2cm, y: 1.8cm),
)

#set text(
  font: (
    "Charter",
    "Apple SD Gothic Neo",
    "Noto Sans CJK KR",
    "Nanum Gothic",
  ),
  size: 10pt,
  lang: "en",
)

#set par(justify: true, leading: 0.52em)

// Subtle warm-dark accent for rules / smallcaps headings.
#let accent = rgb("#5a3e2b")
#let gray-color = rgb("#6b6b6b")
#let muted = rgb("#8a8a8a")

#show link: it => underline(stroke: 0.4pt + accent, offset: 1.5pt)[#text(fill: accent)[#it]]

#let section-header(title) = {
  v(0.35cm)
  text(size: 11pt, weight: "bold", tracking: 1.2pt)[#upper(title)]
  v(2pt)
  line(length: 100%, stroke: 0.6pt + accent)
  v(0.15cm)
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

#let entry(content) = {
  content
  v(0.1cm)
}

#let bullets(items) = {
  for item in items {
    [• #item]
    linebreak()
  }
}

// Header
#align(center)[
  #text(size: 24pt, weight: "bold", tracking: 0.5pt)[Juyoung Suk]
  #v(0.15cm)

  #text(size: 9.5pt, fill: gray-color, style: "italic")[Member of Technical Staff at Trillion Labs · Seoul, South Korea]
  #v(0.35cm)

  #text(size: 9.5pt)[
    #link("mailto:juyoung.suk@trillionlabs.co")[juyoung.suk\@trillionlabs.co] |
    #link("https://juyoung.site/")[juyoung.site] |
    #link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar] |
    #link("https://github.com/juyoungml")[GitHub] |
    #link("https://www.linkedin.com/in/juyoung-suk-b5175a192/")[LinkedIn]
  ]
]

#v(0.35cm)

// Education
#section-header("Education")

#two-col(
  [*Korea Advanced Institute of Science and Technology (KAIST)*],
  [Mar. 2024 - Feb. 2026]
)
#entry[
  #bullets((
    "M.S. in Artificial Intelligence",
    "Advisor: Minjoon Seo",
    [Thesis: _Building Reliable Open-Source Language Model Evaluators through Weight Merging and Continual Training_]
  ))
]

#v(0.15cm)

#two-col(
  [*Korea Advanced Institute of Science and Technology (KAIST)*],
  [Mar. 2019 - Feb. 2024]
)
#entry[
  #bullets((
    "B.S. in Computer Science",
  ))
]

// Work Experience
#section-header("Work Experience")

#two-col(
  [*Member of Technical Staff*, Trillion Labs --- Seoul, South Korea],
  [Nov. 2024 - Present]
)
#entry[
  #bullets((
    [Core developer of Trillion-7B (#link("https://huggingface.co/trillionlabs/Trillion-7B-preview")[HuggingFace]), a 7.76B-parameter compute-efficient multilingual frontier model.],
    "Work across pre-training and post-training: data, infrastructure, long-context training, and evaluation."
  ))
]

#v(0.15cm)

#two-col(
  [*Machine Learning Engineer*, #link("https://thetaone.co")[ThetaOne] --- Seoul, South Korea],
  [Feb. 2023 - Jul. 2023]
)
#entry[
  #bullets((
    [Engineered end-to-end ML pipeline for #link("https://thetaone.co/metabuddy")[Metabuddy], implementing RAG with LangChain and custom models (grammar error detection, reranker) for enhanced user interactions.],
  ))
]

#v(0.15cm)

#two-col(
  [*Machine Learning Engineer Intern*, NAVER Corp. --- Seoul, South Korea],
  [Aug. 2022 - Feb. 2023]
)
#entry[
  #bullets((
    "Enhanced hate-speech detection for AI Clean Bot 2.0 (40M+ users) using active learning.",
  ))
]

// Honors & Awards
#section-header("Honors & Awards")

#two-col(
  [*Minister's Award*, Ministry of Science and ICT (과학기술정보통신부 장관상), Republic of Korea],
  [Fall 2025]
)

#v(0.1cm)

#two-col(
  [*Best Paper Award*, NAACL 2025 --- for _The BiGGen Bench_],
  [2025]
)

// Publications
#section-header("Publications")

#text(size: 9pt, style: "italic", fill: muted)[
  Reverse chronological. \* denotes equal contribution. Full list on
  #link("https://scholar.google.com/citations?user=mENsLCkAAAAJ")[Google Scholar].
]
#v(0.25cm)

#let publication(number, title, authors, venue) = {
  entry[
    *[#number] #title*
    #v(0.08cm)
    #text(size: 9pt)[#authors]
    #v(0.03cm)
    #text(size: 9pt, style: "italic", fill: gray-color)[#venue]
    #v(0.18cm)
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

// Projects
#section-header("Open-Source")

#two-col(
  [*#link("https://github.com/prometheus-eval/prometheus-eval")[Prometheus-Eval]*, Core Developer],
  [May 2024 - May 2025]
)
#entry[
  #bullets((
    "Led development of the prometheus-eval open-source toolkit for evaluating language models with specialized LMs (1.1k+ GitHub stars).",
    [Architected and shipped evaluation pipelines, training scripts, and the `prometheus-eval` Python package.]
  ))
]

// Teaching Experience
#section-header("Teaching")

#two-col(
  [*Teaching Assistant*, Introduction to Programming with Python, KAIST MOOC Platform --- Online],
  [Jan. 2022 - Jun. 2024]
)

#v(0.15cm)

#two-col(
  [*Teaching Assistant*, Introduction to Programming (CS101), KAIST --- Daejeon, South Korea],
  [Aug. 2021 - Jun. 2022]
)

// Languages
#section-header("Languages")

#entry[
  *Korean:* Native proficiency
  #v(0.15cm)
  *English:* Professional proficiency
]

#v(0.5cm)
#align(right)[
  #text(size: 8pt, fill: muted, style: "italic")[Last updated: May 2026]
]
