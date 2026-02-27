---
date: 2026-02-26
tags:
- daytrading
- orderflow
- footprint
---
# Orderflow & Footprint

# Konzept
**Orderflow** (Auftragsfluss) bezeichnet den Prozess der Interaktion zwischen Marktteilnehmern, die durch das Platzieren, Ausführen und Ändern von Orders Liquidität bereitstellen oder nehmen. Es geht um die Dynamik und Absicht hinter den Transaktionen.

**Footprint Chart:** Eine detaillierte Darstellung des Orderflows innerhalb einer Kerze (Candle). Es zeigt nicht nur den OHLC (Open, High, Low, Close), sondern auch das **gehandelte Volumen** (Anzahl der Kontrakte/Aktien) auf **jedem einzelnen Preislevel**, aufgeteilt nach **Kauf- (Ask) und Verkaufsseite (Bid)**.

Wichtige Elemente im Footprint:
*   **Bid (links):** Volumen, das durch Marktverkäufe (Verkauf in die Kaufseite) ausgeführt wurde.
*   **Ask (rechts):** Volumen, das durch Marktkäufe (Kauf in die Verkaufsseite) ausgeführt wurde.
*   **Imbalance (Ungleichgewicht):** Wenn auf einer Seite (Bid oder Ask) signifikant mehr gehandelt wurde als auf der anderen (z.B. > 300%). Dies zeigt Aggressivität.
*   **Stacked Imbalance:** Mehrere Imbalancen übereinander (z.B. 3 Preislevel mit > 300% Ask). Starkes Momentum-Signal.
*   **POC (Point of Control) der Kerze:** Das Preislevel mit dem höchsten Volumen innerhalb dieser Kerze.
*   **Unfinished Auction:** Wenn am Hoch oder Tief einer Kerze noch Bid und Ask Volumen offen ist (kein 0x0), deutet dies oft auf eine Fortsetzung hin.

# Anwendung
Der Footprint Chart dient als **Mikroskop** für den Einstieg (Timing) und die Bestätigung.
1.  **Wer kontrolliert den Markt?**
    *   **Käufer (Ask):** Dominieren, wenn das Ask-Volumen steigt und der Preis steigt.
    *   **Verkäufer (Bid):** Dominieren, wenn das Bid-Volumen steigt und der Preis fällt.
2.  **Aggressivität vs. Passivität:**
    *   **Market Order (Aggressiv):** Treibt den Preis. Sichtbar im Footprint als hohes Volumen auf der jeweiligen Seite.
    *   **Limit Order (Passiv):** Stellt Liquidität bereit. Sichtbar, wenn trotz hohem Market-Volumen der Preis nicht weiterkommt (Absorption).

# Signale
*   **Einstieg:** Nach einer Bewegung (z.B. Rücksetzer zum VWAP oder Support) warten auf:
    *   **Imbalance:** Aggressive Käufer/Verkäufer treten auf.
    *   **POC Shift:** Der POC verschiebt sich in Trendrichtung.
    *   **Delta:** Positives Delta bei Long, Negatives bei Short.
*   **Exit:**
    *   **Absorption:** Der Preis steigt, aber das Delta stagniert oder divergiert (viele Käufer, Preis kommt nicht weiter -> Limit Verkäufer blockieren).
    *   **Erschöpfung:** Volumen nimmt drastisch ab (kein Interesse mehr).
*   **Trap (Falle):**
    *   Hohes Volumen am Hoch/Tief, aber die Kerze schließt entgegengesetzt (Docht). Die aggressiven Händler sitzen in der Falle.
