#!/usr/bin/env python3
"""
Simple CV metadata extractor.
Since we're not syncing CV and website data anymore,
this just extracts basic metadata for reference.
"""

import re
import json
from pathlib import Path
from datetime import datetime

def extract_basic_info(cv_path):
    """Extract basic CV metadata."""
    with open(cv_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract name
    name_match = re.search(r'#text\(size: 25pt.*?\)\[(.*?)\]', content)
    name = name_match.group(1) if name_match else "Juyoung Suk"
    
    # Extract email
    email_match = re.search(r'mailto:(.*?)\)', content)
    email = email_match.group(1).replace('\\@', '@') if email_match else "juyoung@kaist.ac.kr"
    
    # Count publications
    pub_count = len(re.findall(r'#publication\(', content))
    
    return {
        'name': name,
        'email': email,
        'publication_count': pub_count,
        'last_updated': datetime.now().isoformat(),
        'cv_file': 'juyoung-cv.pdf'
    }

def main():
    cv_path = Path(__file__).parent / 'cv.typ'
    output_path = Path(__file__).parent / 'cv-metadata.json'
    
    if not cv_path.exists():
        print(f"❌ CV file not found: {cv_path}")
        return
    
    print("🔍 Extracting CV metadata...")
    metadata = extract_basic_info(cv_path)
    
    with open(output_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"✅ CV metadata extracted to {output_path}")
    print(f"📊 Found {metadata['publication_count']} publications")

if __name__ == "__main__":
    main()