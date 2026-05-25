// Shared styles and helpers for the CV.
// Imported by cv.typ; keep formatting concerns in here so cv.typ
// stays focused on content.

#let accent = rgb("#5a3e2b")
#let body-color = rgb("#1a1a1a")
#let gray-color = rgb("#6b6b6b")
#let muted = rgb("#8a8a8a")

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
  set page(paper: "us-letter", margin: (x: 2cm, y: 1.8cm))
  set text(font: body-fonts, size: 10pt, lang: "en", fill: body-color)
  set par(justify: true, leading: 0.52em)
  show link: it => underline(stroke: 0.4pt + accent, offset: 1.5pt)[#text(fill: accent)[#it]]
  doc
}

#let section-header(title) = {
  v(0.35cm)
  text(
    size: 10pt,
    weight: "bold",
    tracking: 1.6pt,
    font: sans-fonts,
    fill: accent,
  )[#upper(title)]
  v(2pt)
  line(length: 100%, stroke: 0.6pt + accent)
  v(0.15cm)
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
    text(size: 10pt, style: "italic", fill: gray-color)[#date],
  )
  v(0.1cm)
}

// Bulleted block.
#let bullets(items) = {
  for item in items {
    [• #item]
    linebreak()
  }
}

// Render one publication. Tight spacing — entries stack densely.
#let publication(num, title, authors, venue) = {
  [
    *[#num] #title*
    #v(0.04cm)
    #text(size: 9pt)[#authors]
    #v(0.01cm)
    #text(size: 9pt, style: "italic", fill: gray-color)[#venue]
    #v(0.1cm)
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
