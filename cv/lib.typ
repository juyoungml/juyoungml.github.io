// Shared styles and helpers for the CV.
// Imported by cv.typ; keep formatting concerns in here so cv.typ
// stays focused on content.

#let body-color = rgb("#1a1a1a")
#let gray-color = rgb("#555555")
#let muted = rgb("#8a8a8a")
// 남색 — deep navy reserved for links and section rules.
#let accent = rgb("#1f3a68")
#let rule-color = accent

#let body-fonts = (
  "Charter",
  "Apple SD Gothic Neo",
  "Noto Sans CJK KR",
  "Nanum Gothic",
)

#let sans-fonts = (
  "Inter",
  "SF Pro Text",
  "Helvetica Neue",
  "Noto Sans",
  "DejaVu Sans",
  "sans-serif",
)

// Apply page-wide setup. Call once at the top of cv.typ.
#let setup(doc) = {
  set document(title: "Juyoung Suk CV", author: "Juyoung Suk", date: auto)
  set page(paper: "us-letter", margin: (x: 1.5cm, y: 1cm))
  set text(font: body-fonts, size: 9.5pt, lang: "en", fill: body-color)
  set par(justify: true, leading: 0.48em)
  show link: it => underline(stroke: 0.4pt + accent, offset: 1.5pt)[#text(fill: accent)[#it]]
  doc
}

// Section title — serif, bold, sentence case. Traditional academic CV look.
#let section-header(title) = {
  v(0.25cm)
  text(size: 11pt, weight: "bold", fill: body-color)[#title]
  v(2pt)
  line(length: 100%, stroke: 0.4pt + rule-color)
  v(0.1cm)
}

// Section helper. Wraps the title and the first chunk of body content in a
// non-breakable block so the header never lands alone at the foot of a page.
// Subsequent content (passed via `rest`) can flow naturally onto the next
// page.
#let section(title, head, rest: none) = {
  block(breakable: false)[
    #section-header(title)
    #head
  ]
  if rest != none { rest }
}

// Header (name + tagline + link row).
#let cv-header(name, tagline, links) = {
  align(center)[
    #text(size: 24pt, weight: "bold", tracking: 0.5pt)[#name]
    #v(0.15cm)
    #text(size: 9.5pt, fill: gray-color, style: "italic")[#tagline]
    #v(0.35cm)
    #text(size: 9.5pt)[
      #links.enumerate().map(((i, l)) => if i == 0 { l } else { [ | #l] }).join()
    ]
  ]
}

// Two-column row: long body on the left, italic date label on the right.
#let row(body, date) = {
  grid(
    columns: (1fr, 4.5cm),
    column-gutter: 1em,
    align: (left, right),
    body,
    text(size: 9.5pt, style: "italic", fill: gray-color)[#date],
  )
  v(0.04cm)
}

// Bulleted block.
#let bullets(items) = {
  for item in items {
    [• #item]
    linebreak()
  }
}

// Render one publication. Tight spacing — entries stack densely.
// Wrapped in a non-breakable block so title/authors/venue never split
// across a page boundary.
#let publication(num, title, authors, venue) = {
  block(breakable: false)[
    *[#num] #title*
    #v(0.02cm)
    #text(size: 8.5pt)[#authors]
    #v(0.01cm)
    #text(size: 8.5pt, style: "italic", fill: gray-color)[#venue]
    #v(0.07cm)
  ]
}

// Render a list of publications from a data array.
// Each item must have: title (str), authors (content), venue (str).
// Numbering follows the array order (reverse-chronological convention).
#let publication-list(items) = {
  for (i, p) in items.enumerate() {
    publication(str(i + 1), p.title, p.authors, p.venue)
  }
}

#let footer(text-content) = {
  v(0.5cm)
  align(right)[
    #text(size: 8pt, fill: muted, style: "italic")[#text-content]
  ]
}
