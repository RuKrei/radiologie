import os
import re
import urllib.request
import urllib.parse
import time

wissen_dir = '/data/.openclaw/workspace/study-buddy/02_Wissen'

def get_youtube_video(query):
    # Add "Radiology" to get professional medical videos
    search_query = ("Radiology " + query).replace(" ", "+").replace("_", "+")
    safe_query = urllib.parse.quote(search_query, safe='+')
    url = f"https://www.youtube.com/results?search_query={safe_query}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req, timeout=5).read().decode("utf-8")
        vids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        if vids:
            # Return the first unique video ID (YouTube usually repeats it a few times in the payload)
            for vid in vids:
                return f"https://www.youtube.com/watch?v={vid}"
    except Exception as e:
        print(f"YouTube search error for {query}: {e}")
    return None

def build_concepts_dict(base_dir):
    concepts = {}
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                name_without_ext = file[:-3]
                # Create a readable concept name, e.g. "Akute_Cholezystitis" -> "Akute Cholezystitis"
                # Also handle things like "Niere_1_Zystische_Läsionen" -> maybe just "Zystische Läsionen"
                display_name = name_without_ext.replace('_', ' ')
                
                # Clean up leading numbers or "1" if present
                clean_name = re.sub(r'^[A-Za-z]+ \d+ ', '', display_name)
                
                # Add to concepts if it's long enough to be meaningful
                if len(clean_name) > 3:
                    # We store the exact markdown filename as value
                    # and the regex pattern for the concept as key
                    concepts[clean_name] = name_without_ext
                    
                    # Also add the exact filename without underscores as a fallback
                    if clean_name != display_name:
                        concepts[display_name] = name_without_ext
    
    # Sort concepts by length descending, so we match longer terms first
    # e.g. "Akute Cholezystitis" before "Cholezystitis"
    sorted_concepts = sorted(concepts.items(), key=lambda x: len(x[0]), reverse=True)
    return sorted_concepts

def insert_crosslinks(text, concepts):
    # Protect existing markdown links and URLs by temporarily replacing them
    protected = {}
    
    def protect_match(match):
        uid = f"@@PROT{len(protected)}@@"
        protected[uid] = match.group(0)
        return uid

    # Protect existing [[links]], [text](url), and raw URLs
    text = re.sub(r'\[\[.*?\]\]', protect_match, text)
    text = re.sub(r'\[.*?\]\(.*?\)', protect_match, text)
    text = re.sub(r'https?://[^\s]+', protect_match, text)
    
    # Replace concepts
    for concept, filename in concepts:
        # Use regex to find whole words, case-insensitive
        pattern = r'(?i)\b(' + re.escape(concept) + r')\b'
        
        # We replace it with an Obsidian link: [[Filename|MatchedText]]
        # But we only do it once per concept per file to avoid link spam
        if re.search(pattern, text):
            text = re.sub(pattern, rf'[[{filename}|\1]]', text, count=3)
            
    # Restore protected strings
    for uid, original in protected.items():
        text = text.replace(uid, original)
        
    return text

def main():
    print("Building concept dictionary...")
    concepts = build_concepts_dict(wissen_dir)
    print(f"Found {len(concepts)} concepts for cross-linking.")
    
    for root, dirs, files in os.walk(wissen_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                name_without_ext = file[:-3]
                
                with open(filepath, 'r') as f:
                    content = f.read()
                
                original_content = content
                
                # 1. Apply Cross-linking
                content = insert_crosslinks(content, concepts)
                
                # 2. Add YouTube Video if not present
                if "## Video-Empfehlung" not in content and "## YouTube" not in content:
                    print(f"Fetching video for {name_without_ext}...")
                    clean_query = re.sub(r'^[A-Za-z]+_\d+_', '', name_without_ext).replace('_', ' ')
                    video_url = get_youtube_video(clean_query)
                    
                    if video_url:
                        # Append before the # Quellen section if it exists
                        video_md = f"\n## Video-Empfehlung\n- [Kurzes Erklärvideo auf YouTube ansehen]({video_url})\n\n"
                        if "# Quellen" in content:
                            content = content.replace("# Quellen", video_md + "# Quellen")
                        else:
                            content += video_md
                    
                    # Sleep briefly to avoid YouTube rate limits
                    time.sleep(0.5)
                
                if content != original_content:
                    with open(filepath, 'w') as f:
                        f.write(content)
                    print(f"Updated {file}")

if __name__ == "__main__":
    main()
