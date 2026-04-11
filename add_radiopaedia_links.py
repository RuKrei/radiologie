import os

GERMAN_TO_ENGLISH = {
    'lunge': 'lung', 'niere': 'kidney', 'leber': 'liver', 'galle': 'biliary',
    'gefaesse': 'vessels', 'herz': 'heart', 'wirbelsaeule': 'spine',
    'knochen': 'bone', 'milz': 'spleen', 'magen': 'stomach', 'darm': 'bowel',
    'entzuendung': 'inflammation', 'tumor': 'tumor', 'krebs': 'cancer',
    'blutung': 'hemorrhage', 'schaedel': 'skull', 'brust': 'breast',
    'mamma': 'breast', 'kind': 'pediatric', 'fraktur': 'fracture',
    'gelenk': 'joint', 'hirn': 'brain', 'kopf': 'head', 'hals': 'neck',
    'oesophagus': 'esophagus', 'duenndarm': 'small bowel', 'dickdarm': 'colon',
    'schilddruese': 'thyroid', 'speicheldruese': 'salivary gland'
}

def get_english_terms(filename):
    name = filename.replace('.md', '').replace('_', ' ').lower()
    words = name.split()
    eng_words = [GERMAN_TO_ENGLISH.get(w, w) for w in words]
    return "+".join(eng_words)

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if "radiopaedia.org" in content:
        return # already has links
        
    filename = os.path.basename(filepath)
    search_term = get_english_terms(filename)
    url = f"https://radiopaedia.org/search?q={search_term}"
    
    link_md = f"\n- [Radiopaedia Suche: {filename.replace('.md', '').replace('_', ' ')}]({url})\n"
    
    if "# Quellen" in content:
        content = content.replace("# Quellen", f"# Quellen\n{link_md}")
    else:
        content += f"\n# Quellen\n{link_md}"
        
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filename}")

def main():
    wissen_dir = 'study-buddy/02_Wissen'
    for root, dirs, files in os.walk(wissen_dir):
        for file in files:
            if file.endswith('.md'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
