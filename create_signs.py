import os

# Configuration
output_dir = 'study-buddy/signs'

signs = [
    {
        "name": "Air Bronchogram",
        "slug": "air-bronchogram",
        "desc": "Lufthaltige Bronchien, die sich als strahlendurchlässige Strukturen innerhalb einer Lungenkonsolidierung abzeichnen.",
        "ddx": "- Pneumonie\n- Lungenödem (alveolär)\n- Atelektase (nicht obstruktiv)\n- Lungentumor (z.B. Lymphom, BAC)\n- Lungeninfarkt"
    },
    {
        "name": "Silhouette Sign",
        "slug": "silhouette-sign",
        "desc": "Verlust der Kontur zwischen zwei Strukturen gleicher Dichte, die einander anatomisch berühren (z.B. Herz und Lungeninfiltrat).",
        "ddx": "- Lokalisation von Pneumonien (z.B. RML löscht rechten Herzrand aus)\n- Atelektasen\n- Tumoren"
    },
    {
        "name": "Deep Sulcus Sign",
        "slug": "deep-sulcus-sign",
        "desc": "Vertiefung und Aufklarung des costophrenischen Winkels auf einer Liegendaufnahme.",
        "ddx": "- Pneumothorax (bei liegenden Patienten)"
    },
    {
        "name": "Golden S Sign",
        "slug": "golden-s-sign",
        "desc": "S-förmige Konfiguration der Fissur bei Oberlappenatelektase durch eine zentrale Raumforderung.",
        "ddx": "- Zentrales Bronchuskarzinom mit poststenotischer Atelektase (meist RUL)"
    },
    {
        "name": "Luftsichel Sign",
        "slug": "luftsichel-sign",
        "desc": "Sichelförmige Luftansammlung um den Aortenbogen.",
        "ddx": "- Linke Oberlappenatelektase (LUL) - Segment 6 schiebt sich zwischen Aorta und kollabierten Lappen"
    },
    {
        "name": "Halo Sign",
        "slug": "halo-sign-chest",
        "desc": "Milchglasartige Zone um einen pulmonalen Rundherd oder eine Konsolidierung.",
        "ddx": "- Invasive Aspergillose (hämorrhagisch, angioinvasiv)\n- Hämorrhagische Metastasen\n- Wegenersche Granulomatose\n- Adenokarzinom (Lepidic growth)"
    },
    {
        "name": "Tree-in-Bud Sign",
        "slug": "tree-in-bud-sign",
        "desc": "Verzweigte, knospende Strukturen im CT (meist Peripherie), die eine Füllung der distalen Bronchiolen anzeigen.",
        "ddx": "- Infektion (Mykobakterien/Tb, Bakterien, Viren)\n- Aspiration\n- Panbronchiolitis"
    },
    {
        "name": "Honeycombing",
        "slug": "honeycombing",
        "desc": "Wabenförmige zystische Veränderungen (subpleural, basal dominant) mit Wandverdickungen.",
        "ddx": "- UIP (Usual Interstitial Pneumonia) / IPF\n- Endstadium anderer Fibrosen (chronische HP, Asbestose, Sarkoidose)"
    },
    {
        "name": "Signet Ring Sign",
        "slug": "signet-ring-sign-bronchiectasis",
        "desc": "Vergrößerter Bronchus im Querschnitt neben einer kleineren Begleitarterie (Verhältnis > 1-1.5).",
        "ddx": "- Bronchiektasen (Zystische Fibrose, Post-infektiös, Traktionsbronchiektasen)"
    },
    {
        "name": "Crazy Paving",
        "slug": "crazy-paving",
        "desc": "Muster aus Milchglasverdichtungen mit überlagerten verdickten interlobulären Septen.",
        "ddx": "- Alveolarproteinose (PAP)\n- Pneumocystis jirovecii Pneumonie (PCP)\n- Lipoidpneumonie\n- ARDS\n- Lungenödem"
    },
    {
        "name": "Gloved Finger Sign",
        "slug": "finger-in-glove-sign",
        "desc": "Tubuläre, verzweigte Verdichtungen (Y- oder V-förmig), ausgehend vom Hilus.",
        "ddx": "- Allergische bronchopulmonale Aspergillose (ABPA)\n- Obstruktive Pneumonie\n- Bronchialatresie\n- Zystische Fibrose"
    },
    {
        "name": "Split Pleura Sign",
        "slug": "split-pleura-sign",
        "desc": "Verdickung und Separierung von viszeraler und parietaler Pleura (Pleurablätter), oft mit Kontrastmittelaufnahme.",
        "ddx": "- Pleuraempyem\n- Hämatothorax\n- (Abgrenzung zum Lungenabszess)"
    },
    {
        "name": "Scimitar Sign",
        "slug": "scimitar-sign",
        "desc": "Gebogene venöse Struktur, die entlang des rechten Herzrandes zum Zwerchfell zieht (sieht aus wie ein türkischer Säbel).",
        "ddx": "- Scimitar-Syndrom (Partielle lungenvenöse Fehlmündung)\n- Hypogenetisches Lungensyndrom"
    },
    {
        "name": "Continuous Diaphragm Sign",
        "slug": "continuous-diaphragm-sign",
        "desc": "Durchgehende Sichtbarkeit des Zwerchfells unter dem Herzen (verbindet linke und rechte Kuppel).",
        "ddx": "- Pneumomediastinum"
    },
    {
        "name": "Cervicothoracic Sign",
        "slug": "cervicothoracic-sign",
        "desc": "Hilft zur Lokalisierung mediastinaler Raumforderungen: Rand sichtbar über Clavicula = posterior; Rand verschwindet = anterior.",
        "ddx": "- Anterior: Schilddrüse (Struma)\n- Posterior: Neurogene Tumoren, apikale Lungentumoren"
    },
    {
        "name": "Hampton Hump",
        "slug": "hamptons-hump",
        "desc": "Keilförmige pleurale Verdichtung (Basis zur Pleura, Spitze zum Hilus).",
        "ddx": "- Lungeninfarkt bei Lungenembolie"
    },
    {
        "name": "Westermark Sign",
        "slug": "westermark-sign",
        "desc": "Fokale Oligämie (Hypertransparenz) distal eines embolischen Gefäßverschlusses.",
        "ddx": "- Lungenembolie (zentral)"
    },
    {
        "name": "Fleischner Sign",
        "slug": "fleischner-sign",
        "desc": "Aufgeweitete zentrale Pulmonalarterie.",
        "ddx": "- Massive Lungenembolie (akut)\n- Pulmonale Hypertonie (chronisch)"
    }
]

def create_sign_file(sign):
    filename = f"{sign['name'].replace(' ', '_')}.md"
    filepath = os.path.join(output_dir, filename)
    
    content = f"""# {sign['name']}

## Definition
{sign['desc']}

## Radiologisches Erscheinungsbild
**Röntgen / CT:**
- Siehe Definition.
- Wichtiges Erkennungsmerkmal in der Thoraxdiagnostik.

## Ätiologie / Differentialdiagnosen
{sign.get('ddx', '- Siehe Definition')}

## Weiterführende Links
- [Radiopaedia: {sign['name']}](https://radiopaedia.org/articles/{sign['slug']})

---
Tags: #Radiologie #Thorax #Lunge #Zeichen #Sign
"""
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created {filename}")

def main():
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for sign in signs:
        create_sign_file(sign)

if __name__ == "__main__":
    main()
