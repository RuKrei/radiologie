---
date: 2026-02-26
tags:
- daytrading
- orderflow
- delta
---
# Delta & Cumulative Delta

# Konzept
**Delta** beschreibt die Differenz zwischen dem Kauf-Volumen (Markt-Käufe am Ask) und dem Verkaufs-Volumen (Markt-Verkäufe am Bid) für eine bestimmte Periode (z.B. eine Kerze).
*   **Formel:** Delta = Ask Volumen - Bid Volumen
*   **Positives Delta:** Mehr aggressive Käufer.
*   **Negatives Delta:** Mehr aggressive Verkäufer.

**Cumulative Delta (CVD):** Das aufsummierte Delta über den Tag (oder einen anderen Zeitraum). Es zeigt die übergeordnete Aggressivität und Stimmung.

# Anwendung
Delta hilft, die "Geschichte hinter dem Preis" zu verstehen. Es zeigt, ob die Preisbewegung durch tatsächliche Transaktionen gestützt wird.

1.  **Trendbestätigung:**
    *   Preis steigt + CVD steigt (Höhere Hochs) = Gesunder Aufwärtstrend.
    *   Preis fällt + CVD fällt (Tiefere Tiefs) = Gesunder Abwärtstrend.
2.  **Divergenzen (Das wichtigste Signal!):**
    *   Wenn Preis und CVD **nicht** übereinstimmen, liegt eine Anomalie vor.
    *   Limit-Orders (die im Delta nicht direkt als Aggressivität sichtbar sind) absorbieren die Market-Orders.

# Signale
*   **Bullische Divergenz (Absorption am Tief):**
    *   Preis macht ein neues Tief (Lower Low).
    *   CVD macht **kein** neues Tief (Higher Low) oder fällt nur schwach.
    *   **Interpretation:** Verkäufer drücken, aber es finden sich nicht mehr genug neue Verkäufer oder passive Käufer absorbieren alles. Ein Reversal steht bevor.
*   **Bearische Divergenz (Absorption am Hoch):**
    *   Preis macht ein neues Hoch (Higher High).
    *   CVD macht **kein** neues Hoch (Lower High).
    *   **Interpretation:** Käufer kaufen aggressiv, aber passive Verkäufer (Limit Sell Wall) absorbieren die Nachfrage. Der Preis kommt nicht höher.
*   **Delta Surge:** Plötzlicher, massiver Anstieg/Abfall im Delta ohne signifikante Preisbewegung -> Vorsicht, oft Absorption oder Stop-Run.
