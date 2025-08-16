#!/usr/bin/env python3
"""
Extract data from CV and update website data files.
This script parses the Typst CV file and extracts structured data
that can be used to keep the website in sync with the CV.
"""

import re
import json
from pathlib import Path
import yaml

def parse_typst_cv(cv_path):
    """Parse the Typst CV file and extract structured data."""
    with open(cv_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    data = {}
    
    # Extract personal info from header
    name_match = re.search(r'#text\(size: 25pt.*?\)\[(.*?)\]', content)
    if name_match:
        data['name'] = name_match.group(1)
    
    # Extract contact info
    contact_match = re.search(r'Seoul, South Korea \|(.*?)\]', content, re.DOTALL)
    if contact_match:
        contact_text = contact_match.group(1)
        
        # Extract email
        email_match = re.search(r'mailto:(.*?)\)', contact_text)
        if email_match:
            data['email'] = email_match.group(1).replace('\\@', '@')
        
        # Extract website
        website_match = re.search(r'https://(.*?)\.github\.io/', contact_text)
        if website_match:
            data['website'] = f"https://{website_match.group(1)}.github.io/"
    
    # Extract work experience
    work_section = re.search(r'// Work Experience.*?(?=// Publications)', content, re.DOTALL)
    if work_section:
        work_entries = []
        # This is a simplified parser - you can make it more sophisticated
        # For now, just extract the basic structure
        data['work_experience'] = "Extracted from CV - implement detailed parsing as needed"
    
    # Extract publications
    pub_section = re.search(r'// Publications.*?(?=// Projects)', content, re.DOTALL)
    if pub_section:
        # Extract publication titles and authors
        publications = []
        pub_matches = re.finditer(r'#publication\("(\d+)", "(.*?)", \[(.*?)\]\)', content)
        for match in pub_matches:
            publications.append({
                'number': match.group(1),
                'title': match.group(2),
                'authors': match.group(3)
            })
        data['publications'] = publications
    
    return data

def update_website_data(cv_data, output_path):
    """Update the website data files with CV information."""
    
    # Create a simplified portfolio update
    portfolio_update = {
        'personal': {
            'name': cv_data.get('name', 'Juyoung Suk'),
            'email': cv_data.get('email', 'juyoung@kaist.ac.kr'),
            'cv_updated': True,
            'cv_path': '/juyoung-suk-cv.pdf'
        },
        'publications_count': len(cv_data.get('publications', [])),
        'last_cv_sync': 'auto-generated from cv.typ'
    }
    
    with open(output_path, 'w') as f:
        json.dump(portfolio_update, f, indent=2)
    
    print(f"✅ Updated website data at {output_path}")

def main():
    cv_path = Path(__file__).parent / 'cv.typ'
    output_path = Path(__file__).parent.parent / 'data' / 'cv-sync.json'
    
    if not cv_path.exists():
        print(f"❌ CV file not found: {cv_path}")
        return
    
    print("🔍 Parsing CV...")
    cv_data = parse_typst_cv(cv_path)
    
    print("📝 Updating website data...")
    update_website_data(cv_data, output_path)
    
    print("✅ CV data extraction complete!")
    print(f"📊 Extracted data: {json.dumps(cv_data, indent=2)}")

if __name__ == "__main__":
    main()