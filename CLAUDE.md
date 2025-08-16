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

### Code Quality & Standards
- **Linting**: Use `npm run lint` to check for code issues
- **Formatting**: Use `npm run format` to auto-format code with Prettier
- **Type Checking**: Use `npm run typecheck` to verify TypeScript types
- **Pre-commit**: Always run `npm run lint:fix && npm run format` before committing

### Recent Improvements (Latest Session)
- **Enhanced Publications**: Added smart author name truncation with "..." for long author lists while ensuring "Juyoung Suk" is always bolded and visible
- **Streamlined Experience**: Made work experience section more concise with shorter descriptions and single highlight points
- **Removed Clutter**: Eliminated "Other Projects" section and placeholder "Current Research" section
- **Better Profile Image**: Changed to use bottom portion of image instead of top crop (`object-bottom`)
- **Simplified Buttons**: Reduced hero section button sizes and removed "View Publications" button
- **Enhanced Footer**: Added social links and better styling with background
- **SEO & Analytics**: Added comprehensive meta tags, Open Graph, Twitter cards, and favicon
- **Blog Addition**: Created `/blog` page with placeholder posts to showcase research insights
- **Code Quality**: Added ESLint, Prettier, and formatting scripts
- **GitHub ID Update**: Changed from scottsuk0306 to juyoungml across all links
- **Clean Dependencies**: Removed requirements.txt since using uv

## GitHub Actions Debugging & Verification

### Workflow Overview
This project uses GitHub Actions for automated deployment to GitHub Pages:

1. **Main Deployment**: `.github/workflows/deploy.yml` - Deploys website on pushes to main
2. **CV Building**: `.github/workflows/build-cv.yml` - Builds CV on changes to cv/ directory
3. **Publications Update**: `.github/workflows/update-publications.yml` - Updates publications data

### Essential Debugging Commands

#### Check Workflow Status
```bash
# List all workflow runs
gh run list

# Check specific workflow status
gh run list --workflow=deploy.yml
gh run list --workflow=build-cv.yml

# View detailed run information
gh run view <run-id>

# Download logs for debugging
gh run download <run-id>
```

#### Check Repository Status
```bash
# Verify current branch and commit
git status
git log --oneline -5

# Check if main branch is ahead/behind remote
git fetch origin
git status

# Verify GitHub Pages settings
gh api repos/:owner/:repo/pages
```

#### Check Build Status Locally
```bash
# Test production build locally (must pass before deployment)
npm run build                    # Should succeed without errors
npm run export                   # Should generate /out directory  
ls -la out/                     # Verify static files exist

# Test CV build locally
cd cv && ./build.sh             # Should generate PDF without errors
ls -la public/juyoung-cv.pdf   # Verify PDF exists
```

### Common Deployment Issues & Solutions

#### 1. Build Failures
**Symptoms**: GitHub Actions shows red X, deployment doesn't update
**Debugging**:
```bash
# Check for TypeScript errors
npm run build 2>&1 | grep error

# Check for missing dependencies
npm install
npm audit

# Verify Next.js configuration
cat next.config.js
```

#### 2. Static Export Issues
**Symptoms**: Site loads but pages show 404 or missing assets
**Debugging**:
```bash
# Verify static export configuration
grep -n "output.*export" next.config.js
grep -n "trailingSlash.*true" next.config.js
grep -n "unoptimized.*true" next.config.js

# Test export locally
npm run export
python3 -m http.server 8000 --directory out/
# Visit http://localhost:8000 to verify
```

#### 3. CV Build Issues
**Symptoms**: CV PDF missing or outdated, workflow fails
**Debugging**:
```bash
# Check Typst installation and CV syntax
typst --version
cd cv && typst compile cv.typ

# Verify build script permissions
ls -la cv/build.sh
chmod +x cv/build.sh

# Test build manually
cd cv && ./build.sh
```

#### 4. GitHub Pages Configuration
**Symptoms**: Site not deploying or showing wrong content
**Debugging**:
```bash
# Check Pages source configuration
gh api repos/:owner/:repo/pages

# Verify branch protection rules
gh api repos/:owner/:repo/branches/main/protection

# Check if .nojekyll file exists in output
ls -la out/.nojekyll
```

### Verification Checklist

Before considering deployment successful, verify:

#### ✅ Local Testing
- [ ] `npm run build` succeeds without errors
- [ ] `npm run export` generates complete `/out` directory
- [ ] CV builds successfully: `cd cv && ./build.sh`
- [ ] All tests pass: `npm test` (if tests exist)

#### ✅ GitHub Actions Status
- [ ] Latest workflow run shows green checkmarks
- [ ] No failed jobs in the workflow
- [ ] Deployment time matches recent push time
- [ ] Both deploy.yml and build-cv.yml succeed

#### ✅ Live Site Verification
```bash
# Test live site endpoints
curl -I https://juyoungml.github.io/
curl -I https://juyoungml.github.io/juyoung-cv.pdf

# Verify SSL certificate
curl -vI https://juyoungml.github.io/ 2>&1 | grep -i certificate
```

#### ✅ Visual Testing with Playwright MCP
```bash
# Navigate to live site
mcp__playwright__browser_navigate({ url: "https://juyoungml.github.io" })

# Test CV download functionality
mcp__playwright__browser_click("Download CV button")
# Verify download initiates correctly

# Take verification screenshot
mcp__playwright__browser_take_screenshot({ 
  fullPage: true, 
  filename: "deployment-verification.png" 
})
```

### Emergency Rollback Procedure

If deployment fails and site is broken:

```bash
# 1. Identify last working commit
git log --oneline -10

# 2. Revert to last working state
git revert <problematic-commit-hash>
git push origin main

# 3. Monitor deployment recovery
gh run list --workflow=deploy.yml

# 4. Verify site recovery
curl -I https://juyoungml.github.io/
```

### Monitoring & Alerts

#### Setup GitHub CLI for monitoring:
```bash
# Watch workflow runs in real-time
gh run watch

# Set up notifications (requires GitHub CLI auth)
gh api user/subscriptions/repos/:owner/:repo
```

#### Key metrics to monitor:
- **Build time**: Should be < 5 minutes typically
- **Deploy frequency**: Matches git push frequency  
- **Error rate**: Should be near 0% for main branch
- **Site availability**: Monitor https://juyoungml.github.io/ uptime

### Advanced Debugging

#### Access workflow logs programmatically:
```bash
# Get latest run ID
RUN_ID=$(gh run list --workflow=deploy.yml --limit=1 --json id -q '.[0].id')

# Download and examine logs
gh run download $RUN_ID
unzip -l artifacts/*.zip
```

#### Debug build environment:
```bash
# Check Node.js version in workflow
grep -n "node-version" .github/workflows/deploy.yml

# Verify dependencies match workflow
npm list --depth=0
```

This comprehensive debugging guide ensures all GitHub Actions workflows are properly functioning and the site deploys reliably.