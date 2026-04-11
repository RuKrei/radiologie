import os

signs_dir = '/data/.openclaw/workspace/study-buddy/02_Wissen/09_Zeichen_Signs/Lunge'
media_dir = '/data/.openclaw/workspace/study-buddy/media'

# Zuordnung der Zeichen zu potenziellen Fleischner-Figuren-Beschreibungen (soweit passend)
figures_map = {
    "Air_Bronchogram.md": ("Air Bronchogram", "Fig. 3"),
    "Crazy_Paving.md": ("Crazy Paving Pattern", "Fig. 23"),
    "Halo_Sign.md": ("Halo Sign", "Fig. 41"),
    "Honeycombing.md": ("Honeycombing", "Fig. 44 & 45"),
    "Reverse_Halo_Sign.md": ("Reversed Halo Sign", "Fig. 70"),
    "Signet_Ring_Sign.md": ("Signet Ring Sign", "Fig. 72"),
    "Silhouette_Sign.md": ("Silhouette Sign", "Fig. 73"),
    "Tree-in-Bud_Sign.md": ("Tree-in-Bud Pattern", "Fig. 78"),
    "Headcheese_Sign.md": ("Headcheese Sign / Mosaic Attenuation", "Fig. 53"),
    "Eggshell_Calcification.md": ("Eggshell Calcification", "Glossary"),
    "Gloved_Finger_Sign.md": ("Finger-in-Glove Sign", "Glossary"),
    "Comet_Tail_Sign.md": ("Comet Tail Sign", "Glossary"),
    "Bulging_Fissure_Sign.md": ("Bulging Fissure Sign", "Glossary"),
    "Deep_Sulcus_Sign.md": ("Deep Sulcus Sign", "Glossary"),
    "Continuous_Diaphragm_Sign.md": ("Continuous Diaphragm Sign", "Glossary"),
    "Fallen_Lung_Sign.md": ("Fallen Lung Sign", "Glossary"),
    "Hampton_Hump.md": ("Hampton Hump", "Glossary"),
    "Westermark_Sign.md": ("Westermark Sign", "Glossary"),
    "Fleischner_Sign.md": ("Fleischner Sign", "Glossary"),
    "Scimitar_Sign.md": ("Scimitar Sign", "Glossary"),
    "Golden_S_Sign.md": ("Golden S Sign", "Glossary"),
    "Luftsichel_Sign.md": ("Luftsichel Sign", "Glossary"),
    "Split_Pleura_Sign.md": ("Split Pleura Sign", "Glossary"),
    "Cervicothoracic_Sign.md": ("Cervicothoracic Sign", "Glossary"),
    "Flat_Waist_Sign.md": ("Flat Waist Sign", "Glossary"),
    "Doughnut_Sign.md": ("Doughnut Sign", "Glossary"),
    "Spinnaker_Sail_Sign.md": ("Spinnaker Sail Sign", "Glossary"),
    "Thymic_Sail_Sign.md": ("Thymic Sail Sign", "Glossary")
}

def process_file(filepath, filename):
    with open(filepath, 'r') as f:
        content = f.read()

    # Skip if already has image placeholder
    if "![Fleischner Bild:" in content or "![Bild" in content:
        return

    sign_name, fig_ref = figures_map.get(filename, (filename.replace('.md', ''), "Fleischner Glossary"))
    img_filename = filename.replace('.md', '').lower() + "_fleischner.png"
    
    # We insert the placeholder right under ## Radiologisches Erscheinungsbild
    placeholder = f"\n> 🖼️ **Fleischner Referenzbild ({fig_ref}):**\n> ![{sign_name}](../../../media/{img_filename})\n> *(Bitte entsprechendes Bild aus dem Fleischner-PDF hierher ziehen und als `{img_filename}` im Ordner `media/` speichern)*\n"
    
    if "## Radiologisches Erscheinungsbild" in content:
        content = content.replace("## Radiologisches Erscheinungsbild", f"## Radiologisches Erscheinungsbild\n{placeholder}")
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Added image placeholder to {filename}")

def main():
    if not os.path.exists(media_dir):
        os.makedirs(media_dir, exist_ok=True)
        
    for file in os.listdir(signs_dir):
        if file.endswith('.md'):
            process_file(os.path.join(signs_dir, file), file)

if __name__ == "__main__":
    main()
