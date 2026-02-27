---
date: 2026-02-26
tags:
- daytrading
- footprint
- imbalance
---
# Footprint Chart Deep Dive: Der Röntgenblick

Der Footprint Chart zeigt das "Wie" der Bewegung. Er bricht eine Kerze in Bid- und Ask-Volumen pro Preislevel auf.

## Imbalancen (Ungleichgewichte)
Eine Imbalance entsteht, wenn aggressive Käufer (Ask) signifikant stärker sind als aggressive Verkäufer (Bid) auf dem *diagonalen* Vergleich (da der Markt diagonal matcht: Bid-Preis vs. Ask-Preis einen Tick höher).
*   **Standard-Einstellung:** 300% oder 400% Ratio.
*   **Aussage:** Hier wurde aggressiv in den Markt gegangen.

### Stacked Imbalances (Gestapelte Ungleichgewichte)
Drei oder mehr Imbalancen direkt übereinander.
*   **Bedeutung:** Massive, koordinierte Aggressivität. Das ist oft der Startschuss für eine impulsive Bewegung.
*   **Support/Resistance:** Wenn der Preis später zu einer "Stacked Imbalance" zurückkehrt, wird diese Zone oft verteidigt (Retest).

## Auktionen: Finished vs. Unfinished
Jede Kerze erzählt eine Auktions-Geschichte.
*   **Finished Auction:** Am Hoch der Kerze steht auf der Ask-Seite eine "0" (oder sehr kleine Zahl), am Tief auf der Bid-Seite eine "0".
    *   *Bedeutung:* Die Auktion ist sauber beendet. Niemand wollte mehr kaufen/verkaufen. Reversal möglich.
*   **Unfinished Auction (Business to be done):** Am Hoch/Tief steht Volumen (keine Null).
    *   *Bedeutung:* Der Markt hat sich einfach umgedreht, obwohl noch Interesse bestand. Die Wahrscheinlichkeit ist hoch (>80%), dass dieses Level später nochmal besucht ("abgeholt") wird.

## Rotations-Handel im Footprint
In einer Range achten wir auf **Delta-Rotation**.
*   Der Preis steigt, aber das Delta in der Kerze wird negativ? -> Passive Verkäufer absorbieren.
*   Der Preis fällt, aber das Delta bleibt positiv? -> Passive Käufer absorbieren ("Buy Iceberg").

## Setup: Der "Absorption-Breakout"
1.  Wir sehen eine Konsolidierung an einem Widerstand.
2.  Im Footprint sehen wir **Stacked Imbalances** nach oben.
3.  Gleichzeitig sehen wir **positives Delta**, aber der Preis bewegt sich kaum (Absorption durch Limit-Seller).
4.  **Der Trigger:** Plötzlich verschwindet die Absorption oder wird überrannt. Der Preis springt (Liquidity Vacuum).
5.  **Einstieg:** Sofort beim Bruch oder beim ersten Retest der Imbalance.
