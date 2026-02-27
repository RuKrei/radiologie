import ccxt from 'ccxt';

async function checkPrices() {
  const exchange = new ccxt.binance();

  // Expecting a JSON string as the first argument, e.g., '[{"symbol": "DENT/USDT", "start": 0.000178, "previous": 0.000198}, ...]'
  const picksArg = process.argv[2];
  if (!picksArg) {
    console.error("Usage: node check_prices.mjs <json_array_of_picks>");
    process.exit(1);
  }

  let picks;
  try {
    picks = JSON.parse(picksArg);
  } catch (e) {
    console.error("Failed to parse picks argument:", e);
    process.exit(1);
  }

  const symbolsToFetch = picks.map(p => p.symbol);
  const fetchedPrices = await exchange.fetchTickers(symbolsToFetch);

  const results = [];
  for (const pick of picks) {
    const symbol = pick.symbol;
    const startPrice = pick.start;
    const previousPrice = pick.previous;
    const currentPrice = fetchedPrices[symbol] ? fetchedPrices[symbol].last : 'N/A';

    let profitLossPercent = 'N/A';
    if (currentPrice !== 'N/A' && typeof startPrice === 'number') {
      profitLossPercent = ((currentPrice - startPrice) / startPrice) * 100;
    }

    results.push({
      symbol: symbol,
      startPrice: startPrice,
      previousPrice: previousPrice,
      currentPrice: currentPrice,
      profitLossPercent: profitLossPercent,
      freshness: new Date().toISOString() // Data freshness can be indicated by current timestamp
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

checkPrices();