---
date: 2026-02-26
tags:
- daytrading
- edge
- strategy
---
# Finding an Edge (Der statistische Vorteil)

# Konzept
Ein **Edge** (Vorteil) ist nichts anderes als eine statistische Wahrscheinlichkeit, dass ein bestimmtes Ereignis öfter eintritt als ein anderes. Es ist der "Hausvorteil" des Casinos, übertragen auf den Trader.
*   **Kein Heiliger Gral:** Ein Edge bedeutet nicht, dass jeder Trade gewinnt. Es bedeutet, dass nach einer Serie von 100 Trades der Erwartungswert (Expectancy) positiv ist.
*   **Zusammensetzung:** Ein Edge entsteht durch:
    1.  **Marktstruktur:** Verständnis von Auktionen (Volume Profile).
    2.  **Kontext:** Wer dominiert? (Orderflow).
    3.  **Setup:** Das spezifische Trigger-Signal (z.B. Delta Divergenz).

# Anwendung
Um einen Edge zu definieren, muss man weg vom "Raten" hin zum "Wissen".
1.  **Backtesting:** Historische Daten analysieren. Wie oft hat das Setup in der Vergangenheit funktioniert?
2.  **Forward Testing (Papertrading):** Funktioniert es im aktuellen Markt live?
3.  **Journaling:** Dokumentation jedes Trades, um zu beweisen, dass der Edge existiert und nicht nur Glück war.

# Signale für einen validen Edge
*   **Wiederholbarkeit:** Das Setup taucht regelmäßig auf und ist klar definierbar (keine subjektive "Bauchgefühl"-Entscheidung).
*   **Definiertes Risiko:** Man weiß *vor* dem Einstieg genau, wo das Setup invalide ist (Stop Loss).
*   **Positiver Erwartungswert:** (Trefferquote x Durchschnittsgewinn) - (Verlustquote x Durchschnittsverlust) > 0.
