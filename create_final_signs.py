import os

# Configuration
base_dir = 'study-buddy/signs'

final_signs = {
    "Neuro": [
        {"name": "Ice Cream Cone Sign", "slug": "ice-cream-cone-sign-temporal-bone", "desc": "Normale axiale CT-Anatomie der Gehörknöchelchen. Malleus-Kopf (Eis) und Incus-Körper (Waffel). Verlust dieses Zeichens deutet auf eine Luxation hin."}
    ],
    "Gastrointestinal": [
        {"name": "Thumbprinting Sign", "slug": "thumbprinting-bowel", "desc": "Daumenabdruck-artige Einziehungen der Darmwand im Röntgen/CT durch ausgeprägtes submukosales Ödem (Ischämie, CED, infektiöse Kolitis)."},
        {"name": "Target Sign", "slug": "target-sign-bowel", "desc": "Schießscheiben-Muster im Querschnitt des Darms im Ultraschall oder CT. Typisch für eine Invagination (Intussuszeption) oder starke Darmwandverdickung."},
        {"name": "Accordion Sign", "slug": "accordion-sign-bowel", "desc": "Verdickte Colonzotten, zwischen denen Kontrastmittel gefangen ist, was an ein Akkordeon erinnert. Klassisch für schwere Clostridium difficile Kolitis."}
    ],
    "Muskuloskelettal": [
        {"name": "Winking Owl Sign", "slug": "winking-owl-sign", "desc": "Fehlender Wirbelbogenwurzel (Pedikel) im a.p. Röntgen der Wirbelsäule, typisch für eine lytische Knochenmetastase."},
        {"name": "Ivory Vertebra Sign", "slug": "ivory-vertebra-sign", "desc": "Einzelner, extrem sklerotischer (weißer) Wirbelkörper. DD: Morbus Paget, Osteoplastische Metastase (Prostata/Mamma), Lymphom."},
        {"name": "Bone in Bone Sign", "slug": "bone-in-bone-sign", "desc": "Erscheinungsbild eines Knochens innerhalb eines Knochens. Typisch für Osteopetrose, kann aber auch nach Thorium-Gabe oder in Erholungsphasen nach Wachstumsstopp auftreten."}
    ],
    "Urogenital": [
        {"name": "Drooping Lily Sign", "slug": "drooping-lily-sign", "desc": "Kaudale und laterale Verdrängung des unteren Nierenkelchsystems durch ein gestautes, nicht kontrastierendes oberes Kelchsystem bei Nierendoppelanlage."},
        {"name": "Cobra Head Sign", "slug": "cobra-head-sign-ureter", "desc": "Kolbenförmige Erweiterung des distalen Ureters in der Harnblase, umgeben von einem strahlentransparenten Halo im Ausscheidungsurogramm. Klassisch für eine einfache Ureterozele."}
    ]
}

def create_sign_file(category, sign):
    filename = f"{sign['name'].replace(' ', '_')}.md"
    filepath = os.path.join(base_dir, category, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

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
    for category, signs in final_signs.items():
        for sign in signs:
            create_sign_file(category, sign)

if __name__ == "__main__":
    main()
