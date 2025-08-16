// Juyoung Suk's CV in Typst
// Modern, clean, and easy to maintain

// Document setup
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

#set par(justify: true, leading: 0.6em)

// Colors
#let primary-color = rgb("#000000")
#let accent-color = rgb("#c2410c")
#let text-color = rgb("#2b2b2b")

// Helper functions
#let section-header(title) = {
  line(length: 100%, stroke: 0.5pt + primary-color)
  v(0.3cm)
  text(size: 12pt, weight: "bold")[#title]
  v(0.2cm)
}

#let two-col-entry(left, right, content) = {
  grid(
    columns: (1fr, 4.5cm),
    column-gutter: 1em,
    align: (left, right),
    [#content],
    [#text(size: 9pt, style: "italic")[#right]]
  )
}

#let one-col-entry(content) = {
  content
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
    #link("mailto:juyoung@kaist.ac.kr")[juyoung\@kaist.ac.kr] |
    010 8077 9092 |
    #link("https://scottsuk0306.github.io/")[scottsuk0306.github.io] |
    #link("https://www.linkedin.com/in/juyoung-suk-b5175a192/")[linkedin.com/in/juyoung-suk] |
    #link("https://github.com/scottsuk0306")[github.com/scottsuk0306]
  ]
]

#v(0.5cm)

// Education
#section-header("Education")

#two-col-entry(
  "Mar. 2024 - Present",
  [*Korea Advanced Institute of Science and Technology, KAIST*]
)[
  #highlight-list((
    "M.S. in Artificial Intelligence",
    "Advised by Minjoon Seo"
  ))
]

#v(0.2cm)

#two-col-entry(
  "Mar. 2019 - Feb. 2024",
  [*Korea Advanced Institute of Science and Technology, KAIST*]
)[
  #highlight-list((
    "B.S. in Computer Science",
  ))
]

// Work Experience
#section-header("Work Experience")

#two-col-entry(
  "Nov. 2024 - Present",
  [*Member of Technical Staff*, Trillion Labs -- Seoul, South Korea]
)[
  #highlight-list((
    [Core developer of Trillion-7B (#link("https://huggingface.co/trillionlabs/Trillion-7B-preview")[HuggingFace], #link("https://www.nvidia.com/en-us/on-demand/session/gtc25-S73857/")[NVIDIA GTC]), a 7.76B parameter compute-efficient multilingual frontier model],
    "Working on pre-training and post-training stages for LLM"
  ))
]

#v(0.2cm)

#two-col-entry(
  "Feb. 2023 - July. 2023",
  [*Machine Learning Engineer*, #link("https://thetaone.co")[ThetaOne] -- Seoul, South Korea]
)[
  #highlight-list((
    [Engineered end-to-end ML pipeline for #link("https://thetaone.co/metabuddy")[Metabuddy], implementing RAG architecture with LangChain and custom language models (Grammar error detection, Reranker) for enhanced user interactions],
  ))
]

#v(0.2cm)

#two-col-entry(
  "Aug. 2022 - Feb. 2023",
  [*Machine Learning Engineer Intern*, NAVER Corp. -- Seoul, South Korea]
)[
  #highlight-list((
    "Enhanced hate speech detection model for AI Clean Bot 2.0 (40+ million users) using Active Learning",
  ))
]

// Publications
#section-header("Publications")

#let publication(number, title, authors) = {
  one-col-entry[
    *[#number] #title*
    #v(0.1cm)
    #text(size: 9pt)[#authors]
    #v(0.2cm)
  ]
}

#publication("1", "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models", [Seungone Kim*, *Juyoung Suk**, Shayne Longpre, Bill Yuchen Lin, Jamin Shin, Sean Welleck, Graham Neubig, Moontae Lee, Kyungjae Lee, Minjoon Seo])

#publication("2", "CLIcK: A Benchmark Dataset of Cultural and Linguistic Intelligence in Korean", [Eunsu Kim, *Juyoung Suk*, Philhoon Oh, Haneul Yoo, James Thorne, Alice Oh])

#publication("3", "The BiGGen Bench: A Principled Benchmark for Fine-grained Evaluation of Language Models with Language Models", [Seungone Kim, *Juyoung Suk*, JiYong Cho, Shayne Longpre, [23 Authors], Sean Welleck, Graham Neubig, Moontae Lee, Kyungjae Lee, Minjoon Seo])

#publication("4", "Evaluating Language Models as Synthetic Data Generators", [Seungone Kim, *Juyoung Suk*, Xiang Yue, Vijay Viswanathan, Seongyun Lee, Yizhong Wang, Kiril Gashteovski, Carolin Lawrence, Sean Welleck, Graham Neubig])

#publication("5", "MM-Eval: A Multilingual Meta-Evaluation Benchmark for LLM-as-a-Judge and Reward Models", [Guijin Son, Dongkeun Yoon, *Juyoung Suk*, Javier Aula-Blasco, Mano Aslan, Vu Trong Kim, Shayekh Bin Islam, Jaume Prats-Cristià, Lucía Tormo-Bañuelos, Seungone Kim])

// Projects
#section-header("Projects")

#two-col-entry(
  "May, 2024 - Present",
  [*#link("https://github.com/prometheus-eval/prometheus-eval")[Prometheus-Eval]*, Core Developer]
)[
  #highlight-list((
    "Led development of a 900+ stars open-source repository for evaluating language models using specialized LMs.",
    [Architected and implemented core functionalities, including evaluation pipelines, model training scripts, and the `prometheus-eval` Python package.]
  ))
]

// Teaching Experience
#section-header("Teaching Experience")

#two-col-entry(
  "Jan. 2022 - June. 2024",
  [*Teaching Assistant*, Introduction to Programming with Python, KAIST MOOC Platform -- Online]
)[]

#v(0.2cm)

#two-col-entry(
  "Aug. 2021 - June. 2022",
  [*Teaching Assistant*, Introduction to Programming (CS101), KAIST -- Daejeon, South Korea]
)[]

// Languages
#section-header("Languages")

#one-col-entry[
  *English:* Professional proficiency
  #v(0.2cm)
  *Korean:* Native proficiency
]

// Footer with last updated
#place(
  top + right,
  dx: -1cm,
  dy: 1cm,
  text(size: 8pt, fill: gray, style: "italic")[Last updated in January 2025]
)