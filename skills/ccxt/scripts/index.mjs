import ccxt from 'ccxt';

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Usage: node index.mjs <command> [args...]");
  process.exit(1);
}

async function main() {
  switch (command) {
    case 'price': {
      const exchangeId = args[1];
      const symbol = args[2];
      if (!exchangeId || !symbol) {
        console.error("Usage: price <exchange> <symbol> (e.g. binance BTC/USDT)");
        process.exit(1);
      }
      try {
        if (!ccxt[exchangeId]) {
            console.error(`Exchange ${exchangeId} not found.`);
            process.exit(1);
        }
        const exchange = new ccxt[exchangeId]();
        const ticker = await exchange.fetchTicker(symbol);
        console.log(JSON.stringify(ticker, null, 2));
      } catch (e) {
        console.error(`Error fetching price: ${e.message}`);
      }
      break;
    }
    case 'ohlcv': {
        const exchangeId = args[1];
        const symbol = args[2];
        const timeframe = args[3] || '1h';
        const limit = args[4] ? parseInt(args[4]) : 10;
        
        if (!exchangeId || !symbol) {
             console.error("Usage: ohlcv <exchange> <symbol> [timeframe] [limit]");
             process.exit(1);
        }

        try {
            if (!ccxt[exchangeId]) {
                console.error(`Exchange ${exchangeId} not found.`);
                process.exit(1);
            }
            const exchange = new ccxt[exchangeId]();
            // Just try to fetch
            if (!exchange.has['fetchOHLCV']) {
                console.error(`Exchange ${exchangeId} does not support fetchOHLCV`);
                process.exit(1);
            }
            const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
            console.log(JSON.stringify(ohlcv, null, 2));
        } catch (e) {
             console.error(`Error fetching OHLCV: ${e.message}`);
        }
        break;
    }
    case 'exchanges': {
        console.log(ccxt.exchanges.join('\n'));
        break;
    }
    default:
      console.log(`Unknown command: ${command}`);
  }
}

main();
