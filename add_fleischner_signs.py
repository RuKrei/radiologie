import os

output_dir = 'study-buddy/signs/Lunge'

new_fleischner_signs = [
    {
        "name": "Headcheese Sign",
        "slug": "headcheese-sign-lungs",
        "desc": "Gleichzeitiges Auftreten von drei verschiedenen Dichtewerten auf einem Inspirations-CT: Normales Parenchym, Ground-Glass (Milchglas) und Mosaik-Oligämie/Air-Trapping (sehr dunkel).",
        "ddx": "- Chronische Hypersensitivitätspneumonitis (HP)\n- Selten: atypische Infektionen (Mykoplasmen), Sarkoidose mit Atemwegsbeteiligung"
    },
    {
        "name": "Reverse Halo Sign",
        "slug": "reversed-halo-sign-atoll-sign",
        "desc": "Zentrale Milchglasverdichtung umgeben von einem dichten Ring oder Halbmond aus Konsolidierung (Atoll-Zeichen).",
        "ddx": "- Organisierende Pneumonie (OP) - klassisch\n- Pulmonale Mukormykose (bei Immunsupprimierten)\n- Lungeninfarkt\n- Tuberkulose / Sarkoidose"
    },
    {
        "name": "Galaxy Sign",
        "slug": "sarcoid-galaxy-sign",
        "desc": "Zentrale konfluierende noduläre Verdichtung umgeben von zahlreichen, kleineren Satelliten-Knötchen (Makronodulus bestehend aus Mikronoduli).",
        "ddx": "- Sarkoidose (klassisch)\n- Tuberkulose\n- Progressive massive Fibrose (PMF bei Silikose)"
    },
    {
        "name": "Fallen Lung Sign",
        "slug": "fallen-lung-sign",
        "desc": "Der kollabierte Lungenflügel sinkt schwerkraftbedingt nach *außen* und *unten* (Richtung Zwerchfell/Thoraxwand), anstatt sich zum Hilus hin zurückzuziehen. Dies passiert bei einem kompletten Abriss des Hauptbronchus.",
        "ddx": "- Traumatischer Bronchusabriss (Tracheobronchiale Ruptur)"
    },
    {
        "name": "Flat Waist Sign",
        "slug": "flat-waist-sign",
        "desc": "Abflachung der Kontur des Aortenbogens und der Pulmonalarterie auf der linken Seite im p.a. Thoraxröntgen. Tritt auf durch Rotation des Herzens.",
        "ddx": "- Schwere linksseitige Unterlappenatelektase"
    },
    {
        "name": "Bulging Fissure Sign",
        "slug": "bulging-fissure-sign",
        "desc": "Vorwölbung der Lobärfissur (meist kleine Fissur rechts) durch massive exsudative entzündliche Schwellung eines Lappens.",
        "ddx": "- Klebsiella pneumoniae (Friedländer-Pneumonie)\n- Haemophilus influenzae\n- Andere hochakute lobäre Konsolidierungen"
    },
    {
        "name": "Comet Tail Sign",
        "slug": "comet-tail-sign-thorax",
        "desc": "Eine subpleurale weichteildichte Raumforderung (Rundatelekase), von der Bronchovaskulärbündel wie ein Kometenschweif bogenförmig in Richtung Hilus ziehen.",
        "ddx": "- Rundatelektase (Blesovsky-Syndrom) - assoziiert mit Asbestose oder alten Pleuraergüssen/Pleuritis."
    },
    {
        "name": "Doughnut Sign",
        "slug": "doughnut-sign-chest",
        "desc": "Sichtbarkeit der Trachea oder des Hauptbronchus als ringförmige Aufhellung, umgeben von vergrößerten mediastinalen/hilären Lymphknoten in der lateralen Röntgenaufnahme.",
        "ddx": "- Lymphadenopathie (Lymphom, Sarkoidose, Bronchialkarzinom, TBC)"
    }
]

def create_sign_file(sign):
    filename = f"{sign['name'].replace(' ', '_')}.md"
    filepath = os.path.join(output_dir, filename)
    
    content = f"""# {sign['name']}

## Definition
{sign['desc']}

## Radiologisches Erscheinungsbild
- Typisches Zeichen in der Thorax-Bildgebung (Röntgen oder HRCT).
- Dient der Eingrenzung spezifischer, oft pathognomonischer Differenzialdiagnosen (Fleischner Glossary Criteria).

## Ätiologie / Differenzialdiagnosen
{sign.get('ddx', '- Siehe Definition')}

## Weiterführende Links
- [Radiopaedia: {sign['name']}](https://radiopaedia.org/articles/{sign['slug']})

---
Tags: #Radiologie #Lunge #Zeichen #Sign #Fleischner
"""
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created {filename}")

def main():
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for sign in new_fleischner_signs:
        create_sign_file(sign)

if __name__ == "__main__":
    main()
