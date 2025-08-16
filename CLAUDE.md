# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal portfolio website deployed to GitHub Pages (juyoungml.github.io). It's built with Next.js 14 using the Pages Router, TypeScript, and TailwindCSS with a warm, comfortable color scheme.

## Essential Commands

### Development
```bash
npm run dev        # Start development server at localhost:3000
npm run build      # Build for production (creates static export in /out)
npm run export     # Generate static files for deployment
npm run deploy     # Build and export in one command
```

### Deployment
The site automatically deploys to GitHub Pages when pushing to the main branch via GitHub Actions. The workflow is defined in `.github/workflows/deploy.yml`.

## Visual Testing with Playwright MCP

**IMPORTANT**: When making any visual changes to the website, ALWAYS use Playwright MCP to check how the website looks:

1. **After making changes**: Take a screenshot using `mcp__playwright__browser_take_screenshot` with `fullPage: true`
2. **Before committing**: Always verify the visual appearance matches expectations
3. **For responsive testing**: Consider testing at different viewport sizes
4. **Screenshot naming**: Use descriptive names like `feature-name-preview.png` or `final-design-check.png`

Example workflow:
```typescript
// Navigate to localhost:3000
await mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Take full page screenshot
await mcp__playwright__browser_take_screenshot({ 
  fullPage: true, 
  filename: "design-verification.png" 
})
```

## Architecture

### Technology Stack
- **Framework**: Next.js 14.2.28 with Pages Router (not App Router)
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS with PostCSS and warm color palette
- **Deployment**: Static export to GitHub Pages

### Design System
- **Color Scheme**: Warm tones with cream/beige background (#fefcf8) and orange accents (#c2410c)
- **Typography**: Comfortable, readable fonts with proper hierarchy
- **Components**: Card-based layouts with subtle shadows and hover effects
- **Responsive**: Mobile-first approach with smooth transitions

### Project Structure
- **Pages**: Located in `/pages/` using Next.js Pages Router conventions
  - `_app.tsx`: Global app wrapper
  - `index.tsx`: Homepage with section-based layout
  - Error pages: 404.tsx, 500.tsx, _error.tsx

- **Components**: Modular components in `/components/`
  - `Navigation.tsx`: Navigation with smooth scrolling and progress indicator
  - `HeroSection.tsx`: Hero section with gradient avatar and CTA buttons
  - `ProjectsSection.tsx`: Project cards with visual previews and technology tags
  - `PublicationsSection.tsx`: Publication cards with icons and organized layout
  - `BackToTop.tsx`: Floating back-to-top button
  - Other sections: NewsSection, ExperienceSection, ResearchSection, ContactSection

- **Styling**: 
  - `styles/globals.css`: Global styles with CSS variables for colors
  - Utility classes for consistent spacing, typography, and interactions
  - Card hover effects and smooth transitions

- **Configuration**:
  - `next.config.js`: Configured for static export with unoptimized images
  - `tsconfig.json`: Path alias `@/*` maps to project root
  - `tailwind.config.js`: Custom color palette and font configurations

### Key Implementation Details
1. **Static Export**: The site uses `output: 'export'` in next.config.js for GitHub Pages compatibility
2. **No Image Optimization**: Images are unoptimized due to static hosting limitations
3. **Warm Design**: Comfortable color palette designed to be easy on the eyes
4. **Interactive Elements**: Smooth scrolling navigation, hover effects, and transitions
5. **Responsive Design**: Mobile-first approach with proper touch targets
6. **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation

## CV Management with Typst

The CV is maintained in Typst format for better maintainability and web integration:

### CV Workflow
```bash
# Local development
cd cv
chmod +x build.sh
./build.sh                    # Builds CV and copies to public/

# Extract data for website sync
python3 extract-data.py       # Extracts structured data from CV
```

### CV Files Structure
- `cv/cv.typ`: Main CV source in Typst format
- `cv/build.sh`: Build script for local development
- `cv/extract-data.py`: Data extraction for website sync
- `public/juyoung-suk-cv.pdf`: Generated PDF for download

### Typst Installation
```bash
# Using Cargo (Rust)
cargo install --git https://github.com/typst/typst --locked typst-cli

# Or download from: https://github.com/typst/typst
```

### GitHub Actions
- `.github/workflows/build-cv.yml`: Automatically builds CV on changes
- CV PDF is automatically updated and committed when `cv/` files change

### Keeping CV and Website in Sync
1. Update CV content in `cv/cv.typ`
2. Run `cd cv && python3 extract-data.py` to extract data
3. Update website components if needed to reflect CV changes
4. GitHub Actions will automatically build and deploy both CV and website

### Development Notes
- When adding new pages, ensure they work with static export
- Test the build locally with `npm run build && npm run export` before pushing
- Always use Playwright MCP to verify visual changes before committing
- The `/out` directory contains the static build output
- GitHub Actions handle deployment automatically on push to main branch
- Maintain the warm, comfortable design aesthetic when making changes
- CV changes trigger automatic PDF generation and website updates