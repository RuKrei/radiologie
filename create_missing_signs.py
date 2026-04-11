import os

# Configuration
base_dir = 'study-buddy/signs'

# Additional signs based on Syllabus check
missing_signs = {
    "Neuro": [
        {"name": "Lentiform Nucleus Obscuration", "slug": "blurred-lentiform-nucleus", "desc": "Verlust der Abgrenzbarkeit des Nucleus lentiformis (Putamen + Globus pallidus) gegenüber der Capsula interna/externa. Frühzeichen eines ischämischen Schlaganfalls im Stromgebiet der A. cerebri media (MCA)."},
        {"name": "Flow Void Sign", "slug": "flow-void-sign-aqueduct", "desc": "Signalverlust (schwarz) im Aquaeductus mesencephali in T2-gewichteten MRT-Bildern durch turbulente Liquorrömung. Ein *verstärkter* Flow Void ist typisch für den Normaldruckhydrozephalus (NPH)."},
        {"name": "Hourglass Sign", "slug": "hourglass-sign-spine", "desc": "Sanduhrförmige Einschnürung eines Tumors (meist Neurinom/Schwannom) beim Durchtritt durch das Neuroforamen. Ein Teil liegt intraspinal, der andere extraspinal."},
        {"name": "Dural Tail Sign", "slug": "dural-tail-sign", "desc": "Verdickung und Kontrastmittelaufnahme der Dura mater angrenzend an eine Raumforderung. Klassisches Zeichen für ein Meningeom (aber nicht pathognomonisch)."}
    ],
    "Lunge": [
        {"name": "Eggshell Calcification", "slug": "eggshell-calcification-lymph-nodes", "desc": "Schalenförmige Verkalkung der Peripherie von hilären/mediastinalen Lymphknoten. Typisch für Silikose (häufig) oder Sarkoidose (selten)."},
        {"name": "Spinnaker Sail Sign", "slug": "spinnaker-sail-sign-mediastinum", "desc": "Das Thymusgewebe wird durch Luft im Mediastinum (Pneumomediastinum) von der Herzsilhouette abgehoben und sieht aus wie ein geblähtes Spinnaker-Segel. (Pädiatrie/Neugeborene)."},
        {"name": "Thymic Sail Sign", "slug": "thymic-sail-sign", "desc": "Normale dreieckige Konfiguration des Thymus beim Neugeborenen im Röntgen-Thorax, bedingt durch die Kompression gegen die Rippen. Kein pathologischer Befund."}
    ],
    "Gastrointestinal": [
        {"name": "Coffee Bean Sign", "slug": "coffee-bean-sign-sigmoid", "desc": "Große, luftgefüllte Darmschlinge, die aus dem Becken aufsteigt und wie eine Kaffeebohne aussieht. Klassisch für Sigmavolvulus."},
        {"name": "Corkscrew Sign", "slug": "corkscrew-sign-midgut-volvulus", "desc": "Korkenzieherartiger Verlauf des Duodenums/Jejunums in der Magen-Darm-Passage. Zeichen für Midgut-Volvulus (Malrotation)."}
    ],
    "Muskuloskelettal": [
        {"name": "Crescent Sign", "slug": "crescent-sign-bone", "desc": "Subchondrale, sichelförmige Aufhellung im Röntgen (besser im MRT) als Zeichen einer subchondralen Fraktur bei avaskulärer Nekrose (AVN, z.B. Hüftkopf)."},
        {"name": "Double Line Sign", "slug": "double-line-sign-bone", "desc": "T2-MRT Zeichen bei AVN: Innere helle Linie (Granulationsgewebe) und äußere dunkle Linie (Sklerose). Pathognomonisch für Knocheninfarkt/AVN."},
        {"name": "Terry Thomas Sign", "slug": "terry-thomas-sign", "desc": "Erweiterung des Abstands zwischen Os scaphoideum und Os lunatum (> 3-4mm) im p.a. Handröntgen. Zeichen für skapholunäre Dissoziation (Bandruptur)."}
    ]
}

def create_sign_file(category, sign):
    filename = f"{sign['name'].replace(' ', '_')}.md"
    filepath = os.path.join(base_dir, category, filename)
    
    # Ensure directory exists (just in case)
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
    for category, signs in missing_signs.items():
        for sign in signs:
            create_sign_file(category, sign)

if __name__ == "__main__":
    main()
