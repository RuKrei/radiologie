---
name: ccxt
description: Access cryptocurrency market data (price, OHLCV, tickers) from hundreds of exchanges via CCXT. Use this skill when the user asks for current prices, historical data (candles), or exchange info. Does not handle trading/order placement yet (read-only).
version: 1.0.0
---

# CCXT

Interact with cryptocurrency exchanges using the CCXT library. Currently supports public market data.

## Commands

### Price (Ticker)
Get the current ticker for a symbol on an exchange.
```bash
node scripts/index.mjs price <exchange> <symbol>
# Example: node scripts/index.mjs price binance BTC/USDT
```

### OHLCV (Candles)
Get historical candlestick data.
```bash
node scripts/index.mjs ohlcv <exchange> <symbol> [timeframe] [limit]
# Example: node scripts/index.mjs ohlcv kraken ETH/USD 1h 5
```
Default timeframe: `1h`. Default limit: `10`.
Returns: `[[timestamp, open, high, low, close, volume], ...]`

### List Exchanges
List all supported exchange IDs.
```bash
node scripts/index.mjs exchanges
```

## Notes
- Symbols must match the exchange format (usually BASE/QUOTE like BTC/USDT).
- Some exchanges require API keys even for public data (rare, but possible).
- This is a read-only implementation.
