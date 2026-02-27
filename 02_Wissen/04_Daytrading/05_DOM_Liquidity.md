---
date: 2026-02-26
tags:
- daytrading
- dom
- liquidity
- spoofing
---
# 05 - DOM & Liquidität: Das Spiel der Market Maker

Das **DOM (Depth of Market)** zeigt die Limit-Orders. Das ist die **Absicht**. Der Footprint zeigt die **Ausführung**.

## Liquidität ist der Treibstoff
Der Preis bewegt sich *immer* zur Liquidität. Warum? Weil große Institutionen dort ihre Orders füllen können.
*   **Resting Liquidity:** Die sichtbaren Limit-Orders im Buch.
*   **Liquidity Vacuum:** Bereiche mit wenig Orders. Hier slippt der Preis schnell durch.

## Iceberg Orders (Versteckte Größe)
Große Player zeigen nie ihre volle Hand (1000 Kontrakte). Sie zeigen 10.
*   **Mechanik:** Wenn die 10 gefüllt sind, lädt ein Algorithmus sofort 10 nach ("Reload").
*   **Erkennung:**
    *   Im DOM: Die Zahl (Size) ändert sich nicht, obwohl gehandelt wird.
    *   Im Footprint: Das Volumen auf diesem Preis explodiert (z.B. 2000 gehandelt), aber der Preis bewegt sich nicht.
*   **Strategie:**
    *   **Mit dem Eisberg:** Setze deinen Stop hinter den Eisberg. Er schützt dich.
    *   **Gegen den Eisberg:** Wenn der Eisberg endlich bricht (kein Reload mehr), entsteht eine starke Bewegung (der Damm bricht).

## Spoofing (Täuschung)
*   **Was ist das?** Eine riesige Order (z.B. 500 Lots) taucht 3 Ticks über dem Preis auf.
*   **Zweck:** Andere Trader erschrecken ("Oh, großer Widerstand!"), damit sie verkaufen und den Preis nach unten drücken.
*   **Der Trick:** Sobald der Preis näher kommt, wird die Order **gelöscht** (gestrichen).
*   **Regel:** Glaube keiner Limit-Order, bis sie ausgeführt wurde!

## The "Reload"
Ein echtes Zeichen von Stärke.
Ein Käufer kauft das Ask leer. Sofort stellen Verkäufer neue Offers rein. Der Käufer kauft *wieder* alles weg.
-> Dies zeigt echte, aggressive Nachfrage. **Go with the flow.**
