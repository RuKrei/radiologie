import ccxt from 'ccxt';
import CoinGecko from 'coingecko-api';

async function scanMarket() {
  const exchange = new ccxt.binance();
  const CoinGeckoClient = new CoinGecko();
  
  try {
    console.log("Fetching Binance tickers...");
    const tickers = await exchange.fetchTickers();
    
    // 2. Fetch CoinGecko Trending
    console.log("Fetching CoinGecko trending...");
    let trendingCoins = [];
    try {
        const trend = await CoinGeckoClient.ping(); // Just checking if import works, actual call is below
        // The library might not expose trending directly or structure differs. Let's use simple fetch if lib fails or try-catch.
        // Actually, let's skip the complex lib usage and just fetch via CCXT for now to be safe, 
        // OR better: use fetch for CoinGecko API directly.
        // But since I installed the lib, let's try to use it correctly.
        // Standard usage: const data = await CoinGeckoClient.ping();
    } catch(e) {}

    // Manual fetch for trending
    try {
        // Use node-fetch style fetch (global in Node 18+)
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();
        if (data && data.coins) {
             trendingCoins = data.coins.map(c => c.item.symbol.toUpperCase());
             // console.log("Trending on CG:", trendingCoins);
        }
    } catch (e) {
        // console.log("CG Fetch error:", e.message);
    }


    // 3. CCXT Momentum Scan
    const candidates = Object.values(tickers).filter(t => 
      t.symbol.indexOf('/USDT') !== -1 && 
      t.quoteVolume > 1000000
    ).sort((a, b) => b.percentage - a.percentage).slice(0, 40);

    const results = [];
    
    for (const t of candidates) {
      try {
        const symbolBase = t.symbol.split('/')[0];
        
        // Is it trending on CG?
        const isTrending = trendingCoins.includes(symbolBase);
        
        const ohlcv = await exchange.fetchOHLCV(t.symbol, '15m', undefined, 20);
        if (!ohlcv || ohlcv.length < 20) continue;

        const last = ohlcv[ohlcv.length - 1];
        const prev2 = ohlcv[ohlcv.length - 3];

        const vols = ohlcv.map(c => c[5]);
        const avgVol = vols.slice(0, -1).reduce((a, b) => a + b, 0) / (vols.length - 1);
        const volRatio = last[5] / avgVol;

        const close = last[4];
        const momentum = (close - prev2[4]) / prev2[4] * 100;

        // Base score
        let score = (volRatio * momentum);
        if (isTrending) score *= 2.0; // Double score for CG trending!

        // Must have some momentum/vol
        if (volRatio > 1.2 && momentum > 0.5) {
          results.push({
            symbol: t.symbol,
            price: close,
            volRatio: volRatio.toFixed(2),
            momentum: momentum.toFixed(2),
            trendingOnCG: isTrending,
            score: score,
            reason: `Vol ${volRatio.toFixed(1)}x, +${momentum.toFixed(1)}% (30m)${isTrending ? ' 🔥 CG Trending' : ''}`
          });
        }
        
        await new Promise(r => setTimeout(r, 100));

      } catch (e) {}
    }

    // Sort by Score
    const top3 = results.sort((a, b) => b.score - a.score).slice(0, 3);
      
    if (top3.length > 0) {
      const message = "🚀 **Crypto Opportunities Detected**\n\n" + 
        top3.map(c => 
          `*${c.symbol}* - Price: $${c.price}\n` +
          `📈 Mom: +${c.momentum}%\n` +
          `📊 Vol: ${c.volRatio}x\n` +
          `ℹ️ ${c.reason}`
        ).join("\n\n");
        
      console.log(message);
      
      // Send to Telegram via OpenClaw internal API (using exec curl if needed, but better to use process stdout if running as agent tool, 
      // OR use a local helper. Since this runs as a standalone script via cron, it needs a way to send msg.
      // Easiest: The script outputs JSON/Text, and the wrapper sends it. 
      // OR: We use the 'openclaw' CLI tool if available? No.
      // We will use a simple curl to the OpenClaw gateway if accessible, OR just rely on the agent to run it.
      // WAIT. Cronjobs in OpenClaw usually run system commands. 
      // I will add a direct Telegram bot call if I have the token, BUT I don't have the bot token directly exposed in env usually (it's in the engine).
      // BETTER APPROACH: Use the `openclaw` CLI to send a message?
      // "openclaw message send --to 7545582236 --message '...'" 
      
      const { exec } = await import('child_process');
      // Use --target instead of --to for OpenClaw CLI
      const cmd = `openclaw message send --channel telegram --target 7545582236 --message "${message.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
      
      exec(cmd, (error, stdout, stderr) => {
          if (error) console.error(`Error sending msg: ${error.message}`);
          else console.log(`Notification sent: ${stdout}`);
      });
    } else {
        console.log("No high-confinement setups found.");
    }

  } catch (err) {
    console.error("Scan failed:", err);
  }
}

scanMarket();
