import os
from datetime import datetime

# Configuration
template_path = 'study-buddy/templates/template_krankheitsbild.md'
output_base = 'study-buddy/02_Wissen'

files_to_create = [
    # Kopf-Hals (Create folder 08_Kopf_Hals)
    ('2026-05-13', '08_Kopf_Hals', 'Felsenbein_Mittelohr.md'),
    ('2026-05-14', '08_Kopf_Hals', 'Innenohr_Kleinhirnbrueckenwinkel.md'),
    ('2026-05-19', '08_Kopf_Hals', 'NNH_Gesichtsschaedel.md'),
    ('2026-05-20', '08_Kopf_Hals', 'Schaedelbasis_Hirnnerven.md'),
    ('2026-05-21', '08_Kopf_Hals', 'Orbita_Sehbahn.md'),
    ('2026-05-26', '08_Kopf_Hals', 'Pharynx_Larynx.md'),
    ('2026-05-27', '08_Kopf_Hals', 'Mundhoehle_Kiefer.md'),
    ('2026-05-28', '08_Kopf_Hals', 'Speicheldruesen.md'),
    ('2026-06-02', '08_Kopf_Hals', 'Halsweichteile_Lymphknoten.md'),
    ('2026-06-03', '08_Kopf_Hals', 'Schilddruese_Nebenschilddruese.md'),
    ('2026-06-04', '08_Kopf_Hals', 'Trauma_Gesichtsschaedel.md'),
    ('2026-06-09', '08_Kopf_Hals', 'Integration_Kopf_Hals.md'),

    # Neuroradiologie (Folder 06_Neuro)
    ('2026-08-11', '06_Neuro', 'Anatomie_Entwicklungsstoerungen.md'),
    ('2026-08-12', '06_Neuro', 'Schlaganfall_Ischaemie.md'),
    ('2026-08-13', '06_Neuro', 'Schlaganfall_Blutung.md'),
    ('2026-08-18', '06_Neuro', 'Hirntumoren_Intraaxial.md'),
    ('2026-08-19', '06_Neuro', 'Hirntumoren_Extraaxial.md'),
    ('2026-08-20', '06_Neuro', 'Entzuendungen_ZNS.md'),
    ('2026-08-25', '06_Neuro', 'Demyelinisierung.md'),
    ('2026-08-26', '06_Neuro', 'Degenerativ_Demenz.md'),
    ('2026-08-27', '06_Neuro', 'Schaedel_Hirn_Trauma.md'),
    ('2026-09-01', '06_Neuro', 'Wirbelsaeule_Degenerativ.md'),
    ('2026-09-02', '06_Neuro', 'Wirbelsaeule_Tumoren_Entzuendung.md'),
    ('2026-09-03', '06_Neuro', 'Wirbelsaeule_Trauma_Vaskulaer.md'),
    ('2026-09-08', '06_Neuro', 'Liquorsystem_Hydrozephalus.md'),
    ('2026-09-09', '06_Neuro', 'Hypophyse_Sella.md'),
    ('2026-09-10', '06_Neuro', 'Epilepsie_Bildgebung.md'),
    ('2026-09-15', '06_Neuro', 'Paediatrische_Neuro.md'),
    ('2026-09-16', '06_Neuro', 'Interv_Neuro_Aneurysmen_Thrombektomie.md'),
    ('2026-09-17', '06_Neuro', 'Interv_Neuro_Stents_AVMs.md'),
    ('2026-09-22', '06_Neuro', 'Gefaessanatomie_Varianten.md'),
    ('2026-09-23', '06_Neuro', 'Deep_Dive_Hirnnervenverlauf.md'),
    ('2026-09-24', '06_Neuro', 'Deep_Dive_Neuro_MRT_Sequenzen.md'),
    ('2026-09-29', '06_Neuro', 'Fallbasiertes_Lernen_Stroke.md'),
    ('2026-09-30', '06_Neuro', 'Fallbasiertes_Lernen_Tumor.md'),
    ('2026-10-01', '06_Neuro', 'Synthese_Neuroradiologie.md')
]

def read_template(path):
    with open(path, 'r') as f:
        return f.read()

def create_file(date, folder, filename, template_content):
    content = template_content.replace('{{date}}', date)
    full_path = os.path.join(output_base, folder, filename)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    if os.path.exists(full_path):
        print(f"Skipping {filename} (already exists)")
        return

    with open(full_path, 'w') as f:
        f.write(content)
    print(f"Created {folder}/{filename}")

def main():
    try:
        template = read_template(template_path)
    except FileNotFoundError:
        print("Template not found!")
        return

    for date, folder, filename in files_to_create:
        create_file(date, folder, filename, template)

if __name__ == "__main__":
    main()
