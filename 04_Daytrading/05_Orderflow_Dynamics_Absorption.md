---
date: 2026-02-26
tags:
- daytrading
- liquidity
- iceberg
- dom
---
# Orderflow Dynamics: Liquidität, Icebergs & Reloads

Das Orderbuch (DOM - Depth of Market) zeigt die *Absicht* (Limit Orders), während der Footprint die *Ausführung* (Market Orders) zeigt.

## Liquidität verstehen
Liquidität ist der Treibstoff. Der Preis bewegt sich immer dorthin, wo die Liquidität liegt, um Transaktionen zu ermöglichen.
*   **Resting Liquidity:** Die Limit-Orders im Buch.
*   **Liquidity Vacuum:** Bereiche mit wenig Limit-Orders. Hier "springt" der Preis (Slippage).

## Iceberg Orders (Versteckte Liquidität)
Große Institutionen zeigen nie ihre volle Hand. Sie nutzen Iceberg-Algorithmen.
*   **Funktionsweise:** Zeige 10 Kontrakte im Buch. Wenn sie ausgeführt werden, lade sofort 10 neue nach ("Reload"). Wiederhole das, bis 5000 Kontrakte gefüllt sind.
*   **Erkennung im DOM/Footprint:**
    *   Der Preis handelt auf einem Level (Bid oder Ask).
    *   Das Volumen auf diesem Level steigt und steigt (100, 500, 1000...).
    *   Die angezeigte Größe im DOM (Size) bleibt aber klein und konstant (z.B. immer 10-20).
    *   Der Preis bewegt sich nicht vom Fleck.

### Strategie gegen Icebergs
*   **Mit dem Iceberg:** Wenn du einen Buy-Iceberg identifizierst (Preis fällt nicht, obwohl massiv verkauft wird), gehe Long und setze deinen Stop knapp unter den Iceberg. Er ist dein Schutzschild.
*   **Iceberg-Bruch:** Wenn der Iceberg endlich "durchgehandelt" ist (kein Reload mehr), bricht der Damm. Gehe Short im Retest des Levels (der ehemalige Iceberg wird oft zum Widerstand).

## The "Reload" (Nachladen)
Ein Zeichen für echtes Interesse.
*   Ein Käufer nimmt alle Angebote auf einem Level weg (Market Buy).
*   Sofort stellen andere Verkäufer neue Angebote auf dasselbe Level (Limit Sell Reload).
*   Wenn die Käufer *wieder* kaufen und das Level erneut "clearen", zeigt das enorme Aggressivität. Das ist ein **Go-Signal**.

## Spoofing (Täuschung) - Vorsicht!
Große Orders im Buch, die *gelöscht* werden, sobald der Preis näher kommt.
*   Zweck: Andere Trader dazu bringen, vor der großen Order zu front-runnen (Preis in die gewünschte Richtung drücken).
*   **Erkennung:** Order verschwindet ohne Ausführung (Volume traded = 0).
*   **Regel:** Glaube keiner Limit-Order, bis sie ausgeführt wurde! Nur der Footprint (Executed Volume) lügt nicht.
