import { GoogleGenAI, Type } from '@google/genai';
import { CoinCandidate } from './binanceService';

export interface CoinAnalysis {
  symbol: string;
  newsSentiment: 'To the moon' | 'Positive' | 'Neutral' | 'Negative' | 'Unknown';
  newsSummary: string;
  floatStatus: 'Low' | 'Medium' | 'High' | 'Unknown';
  buyRecommendation: number;
}

export interface Weightings {
  chartTrend: number;
  volatility: number;
  news: number;
  float: number;
}

export async function analyzeCoins(coins: CoinCandidate[], weightings: Weightings): Promise<CoinAnalysis[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is missing');

  const ai = new GoogleGenAI({ apiKey });
  
  const coinsData = coins.map(c => {
    // Get last 9 candles (45 minutes of 5m candles) to better assess short-term trend/consolidation
    const recentChart = c.chartData ? c.chartData.slice(-9) : [];
    return {
      symbol: c.baseAsset,
      price: c.price,
      change24h: c.change24h,
      volumeRatio: c.volumeRatio,
      recentChart: recentChart.map(candle => ({
        time: candle.time,
        open: candle.open,
        close: candle.close
      }))
    };
  });

  const prompt = `Analyze the following cryptocurrency data:
${JSON.stringify(coinsData, null, 2)}

For each coin, use Google Search to find the latest news and information about its circulating supply (float).
Determine:
1. News Sentiment: Is the recent news generally 'To the moon' (extremely positive/hype), 'Positive', 'Neutral', or 'Negative'?
2. News Summary: A very brief 1-sentence summary of the latest news or reason for the pump.
3. Float Status: Is the circulating supply considered Low, Medium, or High relative to its total supply or market cap?
4. Buy Recommendation: Provide a buy recommendation score from 0 to 100 based on these STRICT WEIGHTINGS:
   - WEIGHT (${weightings.chartTrend}%): Chart Trend & Consolidation. Analyze the 'recentChart' data (last 45 mins). 
     - A clear, sustained uptrend should boost the score.
     - If the price is stagnating, consolidating, or showing a negative pattern (lower highs/lows) in these 45 minutes, HEAVILY PENALIZE the score (even if the 24h change is high). 
     - Trading during a consolidation phase without a breakout is considered high risk/slower return.
   - WEIGHT (${weightings.volatility}%): Volatility & Volume. High 'volumeRatio' and strong 'change24h' should boost the score.
   - WEIGHT (${weightings.news}%): News Sentiment. Positive or 'To the moon' news boosts the score.
   - WEIGHT (${weightings.float}%): Float Status. Low float boosts the score.

Return the result STRICTLY as a JSON array of objects with this exact structure, and NO markdown formatting or backticks:
[
  {
    "symbol": "BTC",
    "newsSentiment": "To the moon",
    "newsSummary": "Bitcoin reaches new all time high.",
    "floatStatus": "Low",
    "buyRecommendation": 95
  }
]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // User explicitly asked for Pro model for this programming task/logic refinement
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2
      }
    });

    let jsonStr = response.text || '[]';
    // Remove markdown code blocks and any leading/trailing non-JSON text
    jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Find the actual JSON array starting with [ and ending with ]
    const startIdx = jsonStr.indexOf('[');
    const endIdx = jsonStr.lastIndexOf(']');
    if (startIdx !== -1 && endIdx !== -1) {
      jsonStr = jsonStr.substring(startIdx, endIdx + 1);
    }
    
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Failed to parse Gemini response', e);
    return [];
  }
}
