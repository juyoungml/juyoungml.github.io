#!/usr/bin/env python3
"""
Fetch publications from Google Scholar and generate JSON data for the website.
Author: Juyoung Suk
"""

import json
import re
import sys
from datetime import datetime
from typing import Dict, List, Optional
import requests
from bs4 import BeautifulSoup
import time

SCHOLAR_ID = "mENsLCkAAAAJ"  # Your Google Scholar ID
BASE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"

def extract_arxiv_id(text: str) -> Optional[str]:
    """Extract arXiv ID from publication title or text."""
    # Common arXiv patterns
    patterns = [
        r'arxiv:(\d{4}\.\d{4,5})',  # New format: arxiv:2301.12345
        r'arxiv\.org/abs/(\d{4}\.\d{4,5})',  # URL format
        r'\b(\d{4}\.\d{4,5})\b',  # Just the number
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text.lower())
        if match:
            return match.group(1)
    return None

def fetch_scholar_publications() -> List[Dict]:
    """Fetch publications from Google Scholar profile."""
    publications = []
    
    try:
        # Add headers to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Fetch the main profile page
        response = requests.get(BASE_URL, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all publication entries
        pub_entries = soup.find_all('tr', class_='gsc_a_tr')
        
        for idx, entry in enumerate(pub_entries, 1):
            try:
                # Extract basic information
                title_elem = entry.find('a', class_='gsc_a_at')
                if not title_elem:
                    continue
                    
                title = title_elem.text.strip()
                pub_link = 'https://scholar.google.com' + title_elem.get('href', '')
                
                # Extract authors and venue
                gray_text = entry.find_all('div', class_='gs_gray')
                authors = gray_text[0].text.strip() if len(gray_text) > 0 else ""
                venue_year = gray_text[1].text.strip() if len(gray_text) > 1 else ""
                
                # Try to parse year
                year_match = re.search(r'\b(19|20)\d{2}\b', venue_year)
                year = int(year_match.group()) if year_match else datetime.now().year
                
                # Clean venue (remove year)
                venue = re.sub(r',?\s*(19|20)\d{2}', '', venue_year).strip()
                if not venue:
                    venue = "Preprint"
                
                # Extract citation count
                cite_elem = entry.find('a', class_='gsc_a_ac')
                citations = cite_elem.text.strip() if cite_elem else "0"
                
                # Try to fetch more details (abstract) - be careful with rate limiting
                time.sleep(1)  # Rate limiting
                
                abstract = ""
                arxiv_id = None
                
                try:
                    detail_response = requests.get(pub_link, headers=headers)
                    detail_soup = BeautifulSoup(detail_response.text, 'html.parser')
                    
                    # Try to find abstract
                    abstract_elem = detail_soup.find('div', class_='gsc_oci_value', id='gsc_oci_descr')
                    if abstract_elem:
                        abstract = abstract_elem.text.strip()[:500]  # Limit abstract length
                    
                    # Look for arXiv ID in the page
                    page_text = detail_soup.get_text()
                    arxiv_id = extract_arxiv_id(page_text)
                    
                    # Also check in the title
                    if not arxiv_id:
                        arxiv_id = extract_arxiv_id(title)
                except:
                    pass  # If fetching details fails, continue with basic info
                
                # Build publication object
                publication = {
                    "id": idx,
                    "title": title,
                    "authors": authors,
                    "venue": venue,
                    "year": year,
                    "abstract": abstract or f"Published in {venue}.",
                    "citations": citations,
                    "links": {
                        "paper": pub_link
                    }
                }
                
                # Add arXiv link if ID was found
                if arxiv_id:
                    publication["links"]["arxiv"] = f"https://arxiv.org/abs/{arxiv_id}"
                
                publications.append(publication)
                
                print(f"✓ Fetched: {title}")
                
                # Limit to prevent too many requests
                if idx >= 20:  # Fetch top 20 publications
                    break
                    
            except Exception as e:
                print(f"Error processing publication: {e}")
                continue
        
        print(f"\nSuccessfully fetched {len(publications)} publications")
        
    except Exception as e:
        print(f"Error fetching from Google Scholar: {e}")
        sys.exit(1)
    
    return publications

def update_portfolio_data(publications: List[Dict]):
    """Update the portfolio.ts file with fetched publications."""
    
    # Read the existing portfolio file
    portfolio_path = '../data/portfolio.ts'
    
    try:
        with open(portfolio_path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {portfolio_path} not found")
        sys.exit(1)
    
    # Convert publications to TypeScript format
    pub_ts_entries = []
    for pub in publications:
        links_str = ",\n        ".join([
            f'{key}: "{value}"' for key, value in pub["links"].items()
        ])
        
        # Escape quotes in text fields
        title = pub["title"].replace('"', '\\"')
        authors = pub["authors"].replace('"', '\\"')
        venue = pub["venue"].replace('"', '\\"')
        abstract = pub["abstract"].replace('"', '\\"').replace('\n', ' ')
        
        entry = f"""    {{
      id: {pub["id"]},
      title: "{title}",
      authors: "{authors}",
      venue: "{venue}",
      year: {pub["year"]},
      abstract: "{abstract}",
      links: {{
        {links_str}
      }}
    }}"""
        pub_ts_entries.append(entry)
    
    publications_str = ",\n".join(pub_ts_entries)
    
    # Replace the publications section
    pattern = r'publications:\s*\[[\s\S]*?\](?=,\s*\/\/|$)'
    replacement = f'publications: [\n{publications_str}\n  ]'
    
    new_content = re.sub(pattern, replacement, content)
    
    # Write back to file
    with open(portfolio_path, 'w') as f:
        f.write(new_content)
    
    print(f"✓ Updated {portfolio_path}")

def save_json_backup(publications: List[Dict]):
    """Save a JSON backup of the publications."""
    import os
    
    # Ensure data directory exists
    os.makedirs('../data', exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Save current version
    with open('../data/publications.json', 'w') as f:
        json.dump(publications, f, indent=2)
    
    # Save timestamped backup
    with open(f'../data/publications_backup_{timestamp}.json', 'w') as f:
        json.dump(publications, f, indent=2)
    
    print(f"✓ Saved JSON backup")

def main():
    """Main execution function."""
    print(f"Fetching publications from Google Scholar (ID: {SCHOLAR_ID})")
    print("-" * 50)
    
    # Fetch publications
    publications = fetch_scholar_publications()
    
    if not publications:
        print("No publications found!")
        sys.exit(1)
    
    # Save JSON backup
    save_json_backup(publications)
    
    # Update TypeScript data file
    update_portfolio_data(publications)
    
    print("-" * 50)
    print(f"✅ Successfully updated with {len(publications)} publications")

if __name__ == "__main__":
    main()