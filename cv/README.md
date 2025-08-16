# CV Management with Typst

This directory contains the CV management system using Typst for better maintainability and web integration.

## Quick Start

### Prerequisites
Install Typst:
```bash
# Using Cargo (Rust)
cargo install --git https://github.com/typst/typst --locked typst-cli

# Or download from: https://github.com/typst/typst
```

### Local Development
```bash
# Build CV and copy to website
./build.sh

# Extract data for website sync
python3 extract-data.py

# Or use npm scripts from project root
npm run cv:build
npm run cv:extract
npm run cv:sync  # Both extract and build
```

## File Structure

- `cv.typ` - Main CV source file in Typst format
- `build.sh` - Build script for local development
- `extract-data.py` - Data extraction for website sync
- `overleaf/` - Original LaTeX CV from Overleaf (reference)

## Workflow

1. **Edit CV**: Update content in `cv.typ`
2. **Build locally**: Run `./build.sh` to generate PDF
3. **Extract data**: Run `python3 extract-data.py` for website sync
4. **Commit changes**: Git will trigger automatic CV build via GitHub Actions

## Typst vs LaTeX Benefits

- ✅ Faster compilation (near-instant)
- ✅ Modern, readable syntax
- ✅ Better error messages
- ✅ Easier data extraction for web
- ✅ Version control friendly
- ✅ Built-in web compilation support

## Automatic Deployment

GitHub Actions automatically:
- Builds CV PDF when `cv/` files change
- Commits updated PDF to `public/juyoung-suk-cv.pdf`
- Deploys to GitHub Pages with website

## Data Sync

The CV and website stay in sync through:
- Structured data extraction from `cv.typ`
- Automatic PDF generation
- Download link in website hero section
- Consistent contact information and content