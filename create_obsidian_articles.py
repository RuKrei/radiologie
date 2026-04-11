import os
from datetime import datetime

# Configuration
template_path = 'study-buddy/templates/template_krankheitsbild.md'
output_base = 'study-buddy/02_Wissen'

# Mappings: (Date, Folder, Filename)
files_to_create = [
    # Week 1 - GI 1
    ('2026-03-03', '03_Abdomen', 'Ösophagus_Anatomie_Pathologie.md'),
    ('2026-03-04', '03_Abdomen', 'Magen_Duodenum.md'),
    ('2026-03-05', '03_Abdomen', 'Dünndarm.md'),
    
    # Week 2 - GI 2
    ('2026-03-10', '03_Abdomen', 'Colon_Rektum.md'),
    ('2026-03-11', '03_Abdomen', 'Beckenboden_Hernien.md'),
    ('2026-03-12', '03_Abdomen', 'Akutes_Abdomen_PostOP.md'),
    
    # Week 3 - Transition
    ('2026-03-17', '03_Abdomen', 'GI_Integration_Review.md'),
    ('2026-03-18', '02_Thorax', 'Lungenanatomie_Zeichen.md'),
    ('2026-03-19', '02_Thorax', 'Lungeninfektionen.md'),
    
    # Week 4 - Thorax
    ('2026-03-24', '02_Thorax', 'Interstitielle_Lungenerkrankungen.md'),
    ('2026-03-25', '02_Thorax', 'COPD_Atemwege.md'),
    ('2026-03-26', '02_Thorax', 'Lungentumoren.md')
]

def read_template(path):
    with open(path, 'r') as f:
        return f.read()

def create_file(date, folder, filename, template_content):
    # Prepare content
    content = template_content.replace('{{date}}', date)
    
    # Check if file exists to avoid overwriting
    full_path = os.path.join(output_base, folder, filename)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    if os.path.exists(full_path):
        print(f"Skipping {filename} (already exists)")
        return

    with open(full_path, 'w') as f:
        f.write(content)
    print(f"Created {filename}")

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
