---
date: 2026-02-26
tags:
- daytrading
- footprint
- imbalance
- rotation
---
# 03 - Footprint Chart: Der Blick ins Innere der Kerze

Der Footprint Chart (oder "Numbers Bars") zeigt das ausgeführte Volumen auf Bid und Ask.

## Imbalancen (Aggressivität)
Eine **Imbalance** entsteht, wenn diagonales Kaufvolumen (Ask) das Verkaufsvolumen (Bid) um einen Faktor (z.B. 300%) übersteigt.
*   **Aussage:** "Hier wollen Käufer UNBEDINGT rein."
*   **Stacked Imbalance:** 3+ Imbalancen übereinander. **Extrem starkes Support-Level.** Wenn der Preis zurückkommt, wird hier oft verteidigt.

## Auktionen: Finished vs. Unfinished
*   **Unfinished Auction:** Am Hoch/Tief einer Kerze steht auf beiden Seiten Volumen (keine Null).
    *   *Bedeutung:* Der Markt hat sich umgedreht, obwohl noch Interesse bestand.
    *   *Wahrscheinlichkeit:* Sehr hoch, dass dieses Level später nochmal "abgeholt" wird. Es ist ein schlechter Ort für einen Stop-Loss!
*   **Finished Auction:** Eine "0" am Extrempunkt. Sauberes Ende.

## Rotations-Handel (Rhythm of the Market)
In einer Balance (Range) achten wir auf den Wechsel von Aggressivität.
*   **Delta Rotation:**
    *   Preis am Tief der Range.
    *   Kerzen sind noch rot (Preis fällt), aber das **Delta wird grün** (Käufer absorbieren passiv).
    *   Nächste Kerze: Preis steigt, Delta ist stark grün -> Einstieg Long.

## Absorption im Footprint erkennen
Du siehst riesiges Volumen auf einem Preislevel (z.B. 2000 Kontrakte im ES), aber der Preis bewegt sich keinen Tick weiter.
*   **Szenario:** Am Hoch des Tages kaufen Trader wie verrückt (blauen Zahlen im Footprint).
*   **Realität:** Ein großer Verkäufer (Limit Order) füllt sie alle. Er "baut eine Position auf".
*   **Folge:** Wenn die Käufer erschöpft sind, fällt der Preis ("Longs in der Falle").
