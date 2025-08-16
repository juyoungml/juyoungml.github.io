#!/bin/bash

# Build script for Typst CV
# This script compiles the Typst CV to PDF and optionally extracts data for the website

set -e

echo "🔧 Building CV..."

# Install Typst if not already installed (for local development)
if ! command -v typst &> /dev/null; then
    echo "❌ Typst not found. Installing..."
    if command -v cargo &> /dev/null; then
        cargo install --git https://github.com/typst/typst --locked typst-cli
    else
        echo "❌ Please install Rust/Cargo or download Typst from https://github.com/typst/typst"
        exit 1
    fi
fi

# Compile CV to PDF
echo "📄 Compiling CV to PDF..."
typst compile cv.typ cv.pdf

# Move to public directory for website access
echo "📂 Moving CV to public directory..."
mkdir -p ../public
cp cv.pdf ../public/juyoung-suk-cv.pdf

echo "✅ CV built successfully!"
echo "📁 PDF available at: public/juyoung-suk-cv.pdf"