# CV (Typst)

Source for `public/juyoung-cv.pdf`. Edited in [Typst](https://typst.app/) — fast compile, modern syntax, no LaTeX.

## Files

- `cv.typ` — content + layout. Edit this.
- `lib.typ` — styles and components (section headers, rows, publication renderer). Imported by `cv.typ`. Touch this only when you want a visual change.
- `juyoung-cv.pdf` — compiled output. Regenerated on every CI build.
- `_archive/overleaf/` — original LaTeX CV, kept for reference. Not built.

## Local build

```bash
# Install Typst (one-time)
brew install typst

# Compile and copy to public/
npm run cv:build

# Or hot-reload while editing
npm run cv:watch
```

## Fonts

The CV uses **Charter** for body text and a sans-serif (Inter / SF Pro / Helvetica Neue) for section headers. Korean glyphs fall back through **Apple SD Gothic Neo** → **Noto Sans CJK KR** → **Nanum Gothic**, so the Honors line `과학기술정보통신부 장관상` renders correctly on both macOS (Apple SD Gothic Neo) and CI (Noto Sans CJK KR, installed in `build-cv.yml`).

If you compile locally and Korean glyphs render as `□`, install Noto CJK:

```bash
brew install --cask font-noto-sans-cjk-kr
```

## CI

`.github/workflows/build-cv.yml` rebuilds the PDF on every push that touches `cv/cv.typ`, `cv/lib.typ`, or the workflow itself. Steps:

1. Install Charter + Noto CJK KR via apt
2. Install Typst via `typst-community/setup-typst@v4` (pinned to `0.14.2`)
3. Compile and copy to `public/`
4. Commit the PDF back to `main` if it changed

## Editing tips

- **Adding a publication**: append a dict to the `publications` array in `cv.typ`. Numbering and rendering happen automatically via `publication-list`.
- **Adding a talk / award / role**: scroll to the relevant section in `cv.typ` and add another `#row(...)` block.
- **Changing visual style**: edit `lib.typ` (accent color, fonts, section header treatment).
- **Versioning**: the footer pulls `"Last updated: ..."` from a literal in `cv.typ`. Bump it when you make non-trivial content changes.
