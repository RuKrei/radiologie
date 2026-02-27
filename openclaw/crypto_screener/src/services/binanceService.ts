export interface CoinCandidate {
  symbol: string;
  baseAsset: string;
  price: number;
  change24h: number;
  volume24h: number;
  avgVolume30d: number;
  volumeRatio: number;
  chartData: { time: string; open: number; high: number; low: number; close: number }[];
}

export async function fetchBinanceCandidates(): Promise<CoinCandidate[]> {
  try {
    // 0. Fetch exchange info to get valid SPOT symbols
    const exchangeInfoRes = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    const exchangeInfo = await exchangeInfoRes.json();
    
    const spotSymbols = new Set(
      exchangeInfo.symbols
        .filter((s: any) => s.status === 'TRADING' && s.isSpotTradingAllowed === true)
        .map((s: any) => s.symbol)
    );

    // 1. Fetch 24h tickers
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    const tickers = await response.json();

    // 2. Filter
    let candidates = tickers.filter((t: any) => {
      const symbol = t.symbol;
      
      // Must be a valid SPOT pair
      if (!spotSymbols.has(symbol)) return false;
      
      if (!symbol.endsWith('USDT')) return false;
      if (symbol.includes('UPUSDT') || symbol.includes('DOWNUSDT') || symbol.includes('BULLUSDT') || symbol.includes('BEARUSDT')) return false;
      
      const price = parseFloat(t.lastPrice);
      const change = parseFloat(t.priceChangePercent);
      const volume = parseFloat(t.quoteVolume); // USDT volume

      // Price < 20, Change > 5%, Volume > 1M USDT
      return price < 20 && change > 5 && volume > 1000000;
    });

    // Sort by change descending
    candidates.sort((a: any, b: any) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));

    // Take top 10 to analyze volume (for testing speed)
    candidates = candidates.slice(0, 10);

    const results: CoinCandidate[] = [];

    // 3. Fetch 30d volume for each
    // We can do this in parallel batches of 10
    const batchSize = 10;
    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const promises = batch.map(async (t: any) => {
        try {
          const klinesRes = await fetch(`https://api.binance.com/api/v3/klines?symbol=${t.symbol}&interval=1d&limit=30`);
          const klines = await klinesRes.json();
          
          if (!Array.isArray(klines)) {
            console.error(`Invalid klines response for ${t.symbol}:`, klines);
            return null;
          }
          
          let totalQuoteVolume = 0;
          let days = 0;
          // Exclude the last kline if it's the current incomplete day
          for (let j = 0; j < klines.length - 1; j++) {
            totalQuoteVolume += parseFloat(klines[j][7]);
            days++;
          }
          
          const avgVolume30d = days > 0 ? totalQuoteVolume / days : 0;
          const currentVolume = parseFloat(t.quoteVolume);
          
          if (avgVolume30d > 0 && currentVolume > 2 * avgVolume30d) {
            // Fetch 5m klines for the last 90 minutes (18 candles)
            const chartRes = await fetch(`https://api.binance.com/api/v3/klines?symbol=${t.symbol}&interval=5m&limit=18`);
            const chartKlines = await chartRes.json();
            
            let chartData = [];
            if (Array.isArray(chartKlines)) {
              chartData = chartKlines.map((k: any) => ({
                time: new Date(k[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                open: parseFloat(k[1]),
                high: parseFloat(k[2]),
                low: parseFloat(k[3]),
                close: parseFloat(k[4])
              }));
            }

            // Filter out coins with no positive trend over the 90 minutes
            if (chartData.length > 0) {
              const firstCandle = chartData[0];
              const lastCandle = chartData[chartData.length - 1];
              if (lastCandle.close <= firstCandle.open) {
                return null;
              }
            }

            return {
              symbol: t.symbol,
              baseAsset: t.symbol.replace('USDT', ''),
              price: parseFloat(t.lastPrice),
              change24h: parseFloat(t.priceChangePercent),
              volume24h: currentVolume,
              avgVolume30d: avgVolume30d,
              volumeRatio: currentVolume / avgVolume30d,
              chartData
            };
          }
        } catch (e) {
          console.error(`Error fetching klines for ${t.symbol}`, e);
        }
        return null;
      });

      const batchResults = await Promise.all(promises);
      for (const res of batchResults) {
        if (res) results.push(res);
      }
    }

    // Sort by volume ratio or change
    results.sort((a, b) => b.change24h - a.change24h);

    return results.slice(0, 20);
  } catch (error) {
    console.error('Failed to fetch Binance candidates:', error);
    throw error;
  }
}
