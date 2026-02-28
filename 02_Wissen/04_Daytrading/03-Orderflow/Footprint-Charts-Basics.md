# Footprint Charts Basics: Der Blick in die Kerze

## Was ist ein Footprint Chart?
Während ein normaler Kerzenchart (Candlestick) uns nur Eröffnungs-, Hoch-, Tief- und Schlusskurs (OHLC) zeigt, erlaubt uns der **Footprint Chart** einen Blick *in* die Kerze hinein. Er zeigt das tatsächlich gehandelte Volumen auf jedem einzelnen Preisniveau innerhalb der Kerze, aufgeschlüsselt nach Käufern (Ask) und Verkäufern (Bid).

Dies ist das ultimative Werkzeug für **Orderflow-Trader** (WCE-Methodik), um Aggression und Absorption in Echtzeit zu erkennen.

## Aufbau und Lesart
Ein Footprint-Chart stellt meist zwei Zahlen pro Preislevel dar, getrennt durch ein "x" oder eine vertikale Linie:
*   **Linke Seite (Bid):** Aggressive Marktverkäufer (Market Sell Orders).
*   **Rechte Seite (Ask):** Aggressive Marktkäufer (Market Buy Orders).

**Beispiel:** `50 x 200`
*   50 Kontrakte wurden *bestens verkauft* (in das Bid der Limit-Käufer).
*   200 Kontrakte wurden *bestens gekauft* (in das Ask der Limit-Verkäufer).
*   Hier dominieren die aggressiven Käufer (200 > 50).

## Wichtige Konzepte im Footprint

### 1. Imbalance (Ungleichgewicht)
Eine **diagonale** Beziehung (da sich der Preis bewegt) zwischen Bid und Ask zeigt Aggression. Eine Imbalance liegt vor, wenn eine Seite deutlich stärker ist als die andere (meist Faktor 3 oder 4, z.B. 300% mehr Volumen).

*   **Buying Imbalance (Ask Imbalance):** Aggressive Käufer > Aggressive Verkäufer (diagonal). Wird oft grün markiert.
*   **Selling Imbalance (Bid Imbalance):** Aggressive Verkäufer > Aggressive Käufer (diagonal). Wird oft rot markiert.

*Bedeutung:* Imbalances zeigen Momentum und die Absicht, den Preis zu bewegen.

### 2. Stacked Imbalances
Wenn mehrere Imbalances (meist 3 oder mehr) direkt übereinander in einer Kerze auftreten, spricht man von "Stacked Imbalances".
*   Dies ist ein starkes Zeichen für **nachhaltige Aggression**.
*   Diese Zonen dienen oft als **Support/Resistance**, wenn der Preis später dorthin zurückkehrt.

### 3. Unfinished Business (Unfinished Auction)
Normalerweise endet eine Kerze an einem Hoch oder Tief mit "0" Volumen auf der gegenüberliegenden Seite (niemand wollte mehr handeln).
*   Wenn am Hoch einer Kerze auf der Kaufseite (Ask) noch Volumen steht (und nicht 0), ist die Auktion "unvollendet".
*   Der Markt tendiert dazu, dieses Niveau später noch einmal zu besuchen ("to tick it off"), um die Auktion zu beenden.

### 4. Absorption
Das vielleicht wichtigste Signal im Footprint.
*   **Szenario:** Der Preis steigt an ein Widerstandslevel.
*   **Beobachtung:** Wir sehen massive Buying Imbalances (aggressives Kaufen), aber der Preis *bewegt sich nicht weiter nach oben*.
*   **Interpretation:** Ein großer Limit-Verkäufer ("Iceberg Order") absorbiert alle Kaufaufträge. Die Käufer rennen gegen eine Wand.
*   **Trade:** Wenn die Käufer erschöpft sind, fällt der Preis oft schnell (Reversal).

### 5. Delta
Die Differenz zwischen Ask-Volumen und Bid-Volumen einer Kerze.
*   **Positives Delta:** Mehr aggressive Käufer.
*   **Negatives Delta:** Mehr aggressive Verkäufer.
Wichtig ist der Kontext: Eine Kerze mit positivem Delta, die aber *nicht* steigt (oder sogar rot schließt), deutet auf Absorption durch Limit-Verkäufer hin.

## Fazit
Der Footprint Chart nimmt das Raten aus dem Trading. Wir sehen nicht nur, dass der Preis gestiegen ist, sondern *wie* er gestiegen ist (mit Aggression oder mangels Verkäufern). Er ist unser Mikroskop für den genauen Einstieg (Timing).
