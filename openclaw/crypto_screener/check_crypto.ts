import { fetchBinanceCandidates } from './src/services/binanceService.ts';
import { analyzeCoins } from './src/services/geminiService.ts';

async function run() {
  try {
    console.log('Fetching candidates...');
    const candidates = await fetchBinanceCandidates();
    console.log(`Found ${candidates.length} candidates.`);
    
    if (candidates.length === 0) {
      console.log(JSON.stringify([]));
      return;
    }
    console.log('Analyzing candidates...');


    // Default weightings from the user's dashboard or reasonable defaults
    const weightings = {
      chartTrend: 30,
      volatility: 20,
      news: 30,
      float: 20
    };

    const analysis = await analyzeCoins(candidates, weightings);
    
    // Output valid JSON for the agent to parse
    console.log(JSON.stringify(analysis, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
