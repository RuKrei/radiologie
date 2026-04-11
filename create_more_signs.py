import os

# Configuration
base_dir = 'study-buddy/signs'

# New signs to create
new_signs = {
    "Neuro": [
        {"name": "Dense MCA Sign", "slug": "dense-mca-sign", "desc": "Hyperdense A. cerebri media im Nativ-CT, Hinweis auf Thrombus/Embolus."},
        {"name": "Insular Ribbon Sign", "slug": "insular-ribbon-sign", "desc": "Verlust der Differenzierbarkeit zwischen Inselrinde und Kapsula externa/extrema (Frühzeichen Schlaganfall)."},
        {"name": "Mt. Fuji Sign", "slug": "mount-fuji-sign-brain", "desc": "Spannungspneumozephalus mit Kompression der Frontallappen (sieht aus wie ein Vulkan)."},
        {"name": "Empty Delta Sign", "slug": "empty-delta-sign", "desc": "Dreieckige Aussparung im Sinus sagittalis superior im Kontrast-CT bei Sinusthrombose."},
        {"name": "Cord Sign", "slug": "cord-sign", "desc": "Hyperdenser Sinus/Vene im Nativ-CT bei Thrombose (Pendant zum Dense MCA Sign)."},
        {"name": "Eye of the Tiger Sign", "slug": "eye-of-the-tiger-sign", "desc": "Hypointensität im Pallidum mit zentraler Hyperintensität (T2), typisch für PKAN (Pantothenatkinase-assoziierte Neurodegeneration)."},
        {"name": "Hummingbird Sign", "slug": "hummingbird-sign", "desc": "Atrophie des Mittelhirns bei PSP (Progressive Supranukleäre Blickparese), sieht im Sagittalschnitt aus wie ein Kolibri."},
        {"name": "Hot Cross Bun Sign", "slug": "hot-cross-bun-sign", "desc": "Kreuzförmige Hyperintensität im Pons (T2) bei MSA-C (Multisystematrophie)."},
        {"name": "Dawson Fingers", "slug": "dawson-fingers", "desc": "Ovoide, periventrikuläre Läsionen senkrecht zum Ventrikel (T2/FLAIR), typisch für MS."}
    ],
    "Gastrointestinal": [
        {"name": "Double Bubble Sign", "slug": "double-bubble-sign", "desc": "Zwei Luftblasen im Oberbauch (Magen + proximales Duodenum) bei Duodenalatresie oder Volvulus."},
        {"name": "Football Sign", "slug": "football-sign-pneumoperitoneum", "desc": "Großes Pneumoperitoneum bei Kindern, das Falciforme Ligament sieht aus wie die Naht eines American Footballs."},
        {"name": "Rigler Sign", "slug": "rigler-sign", "desc": "Sichtbarkeit der Darmwand beidseits (innen Luft, außen Luft) bei Pneumoperitoneum."},
        {"name": "Whirlpool Sign", "slug": "whirlpool-sign-mesentery", "desc": "Strudelartige Konfiguration der Mesenterialgefäße bei Volvulus (Dünndarm oder Coecum)."},
        {"name": "Bird Beak Sign", "slug": "bird-beak-sign-oesophagus", "desc": "Spitz zulaufende Stenose am distalen Ösophagus bei Achalasie (im Breischluck)."},
        {"name": "Apple Core Sign", "slug": "apple-core-sign-colon", "desc": "Kurzstreckige, zirkuläre Stenose im Kolon (sieht aus wie abgenagter Apfel), typisch für Kolonkarzinom."},
        {"name": "Lead Pipe Sign", "slug": "lead-pipe-sign-colon", "desc": "Verlust der Haustrierung bei chronischer Colitis ulcerosa (sieht aus wie ein glattes Rohr)."},
        {"name": "String Sign", "slug": "string-sign-crohn-disease", "desc": "Fadenförmige Einengung des terminalen Ileums bei Morbus Crohn (Kantor's string sign) oder bei Pylorusstenose."}
    ],
    "Muskuloskelettal": [
        {"name": "Bamboo Spine", "slug": "bamboo-spine", "desc": "Verknöcherung der Wirbelsäulenbänder bei Morbus Bechterew (Spondylitis ankylosans)."},
        {"name": "Scottie Dog Sign", "slug": "scottie-dog-sign", "desc": "Erscheinungsbild der lumbalen Wirbel im Schrägbild. 'Halsband' = Spondylolyse."},
        {"name": "Fat Pad Sign", "slug": "sail-sign-elbow", "desc": "Aufhellung durch verlagertes Fettgewebe am distalen Humerus (Ellbogen) als indirektes Frakturzeichen (z.B. Radiusköpfchen)."},
        {"name": "Double PCL Sign", "slug": "double-pcl-sign", "desc": "Korbhenkelriss des Meniskus im MRT, das verlagertes Fragment liegt vor dem hinteren Kreuzband (PCL)."},
        {"name": "Fallen Fragment Sign", "slug": "fallen-fragment-sign", "desc": "Knochenfragment, das in einer zystischen Läsion nach unten gesunken ist (pathognomonisch für juvenile Knochenzyste)."},
        {"name": "Blade of Grass Sign", "slug": "blade-of-grass-sign", "desc": "Flammenförmige Osteolyse im Femurschaft (Diaphyse) bei Morbus Paget (Lytic phase)."},
        {"name": "Rugger Jersey Spine", "slug": "rugger-jersey-spine", "desc": "Sklerosierung der Deck- und Grundplatten bei renaler Osteodystrophie (Hyperparathyreoidismus)."}
    ]
}

def create_sign_file(category, sign):
    filename = f"{sign['name'].replace(' ', '_')}.md"
    filepath = os.path.join(base_dir, category, filename)
    
    content = f"""# {sign['name']}

## Definition
{sign['desc']}

## Radiologisches Erscheinungsbild
- Typisches Zeichen in der Bildgebung ({category}).
- Siehe Definition für Details.

## Ätiologie / Assoziierte Erkrankungen
- Siehe Definition.

## Weiterführende Links
- [Radiopaedia: {sign['name']}](https://radiopaedia.org/articles/{sign['slug']})

---
Tags: #Radiologie #{category} #Zeichen #Sign
"""
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created {category}/{filename}")

def main():
    for category, signs in new_signs.items():
        # Ensure dir exists (already created via mkdir, but good practice)
        cat_dir = os.path.join(base_dir, category)
        os.makedirs(cat_dir, exist_ok=True)
        
        for sign in signs:
            create_sign_file(category, sign)

if __name__ == "__main__":
    main()
