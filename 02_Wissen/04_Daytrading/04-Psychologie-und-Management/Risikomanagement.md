# Risikomanagement im Daytrading

## Überleben ist alles
Im Daytrading geht es nicht primär darum, Geld zu verdienen, sondern darum, **kein Geld zu verlieren**. Dein Kapital ist dein Werkzeug. Ohne Werkzeug kannst du nicht arbeiten. WCE-Trader sind in erster Linie Risikomanager.

## 1. Risk of Ruin (Ruin-Wahrscheinlichkeit)
Das mathematische Gesetz, das besagt: Wenn du zu viel pro Trade riskierst, ist dein Bankrott (Totalverlust) mathematisch garantiert, egal wie gut deine Strategie ist.

*   **Regel:** Riskiere niemals mehr als **1-2%** deines gesamten Handelskapitals pro Trade.
*   *Beispiel:* Bei einem 10.000€ Konto darfst du maximal 100€ - 200€ verlieren, wenn dein Stop-Loss getroffen wird.

## 2. R:R (Risk to Reward Ratio / CRV)
Das Chance-Risiko-Verhältnis (CRV) bestimmt, wie oft du richtig liegen musst, um profitabel zu sein.

*   **R:R 1:1:** Du riskierst 100€, um 100€ zu gewinnen. Du musst >50% Trefferquote haben (nach Gebühren).
*   **R:R 1:2:** Du riskierst 100€, um 200€ zu gewinnen. Du brauchst nur 33% Trefferquote, um Breakeven zu sein.
*   **R:R 1:3:** Du riskierst 100€, um 300€ zu gewinnen. Schon 25% Trefferquote reichen für Breakeven.

**WCE-Ansatz:** Wir suchen asymmetrische Chancen. Wir gehen Trades nur ein, wenn wir eine realistische Chance auf mindestens 1:2 oder besser sehen, basierend auf der Marktstruktur (z.B. Ziel ist das nächste High Volume Node oder Liquiditätspool).

## 3. Position Sizing (Positionsgröße berechnen)
Viele Anfänger handeln eine feste Anzahl an Kontrakten/Lots (z.B. "Ich handle immer 1 Lot"). Das ist falsch, da die Volatilität und der Stop-Abstand variieren.

**Formel:**
`Positionsgröße = (Kontogröße * Risiko%) / (Einstieg - StopLoss)`

*   Wenn dein Stop weit weg sein muss (wegen hoher Volatilität), muss deine Position **kleiner** sein.
*   Wenn dein Stop eng sein kann (präziser Orderflow-Entry), kann deine Position **größer** sein.
*   *Das Risiko in Euro bleibt immer gleich!*

## 4. Daily Loss Limit (Tagesverlustgrenze)
Setze dir ein hartes Limit für den Tag. Wenn du diesen Betrag verloren hast, **hörst du auf**. Sofort.
*   Zweck: Verhindert "Revenge Trading" (Rache-Trading), bei dem man versucht, Verluste wütend und irrational zurückzuholen.
*   Empfehlung: Dein Daily Loss Limit sollte nicht größer sein als dein durchschnittlicher Gewinntag.

## 5. Trade Management & Stop Loss
*   **Stop Loss:** Muss immer *technisch* begründet sein (z.B. unter dem letzten Swing Low oder unter einer Volumen-Kante), nicht monetär ("Ich will max 50€ verlieren"). Wenn der technische Stop zu teuer ist, darfst du den Trade nicht machen oder musst die Position verkleinern.
*   **Breakeven:** Ziehe den Stop auf Einstieg (Breakeven), sobald der Markt Struktur in deine Richtung zeigt (nicht zu früh, um nicht durch "Mark rauschen" ausgestoppt zu werden).
*   **Teilgewinne (Scaling out):** Realisiere Gewinne an logischen Zielen (z.B. VWAP, VAH). Das reduziert Stress und sichert den Gewinn ("Pay the trader").

## 6. Der "Trader's Equation" Check
Bevor du klickst, prüfe immer:
1.  Wo ist mein technischer Stop? (Invalidierung der Idee)
2.  Wo ist mein realistisches Ziel?
3.  Ist das Verhältnis > 1:2?
4.  Bin ich im Einklang mit dem höheren Timeframe/Kontext?

Wenn "Nein": **Kein Trade.**

## Fazit
Gutes Trading ist langweilig. Es ist die disziplinierte Ausführung eines Risikomanagement-Plans. Die Gewinne kommen dann von selbst als Nebenprodukt guter Entscheidungen.
