import React, { useState, useEffect } from 'react';
import { fetchBinanceCandidates, CoinCandidate } from '../services/binanceService';
import { analyzeCoins, CoinAnalysis } from '../services/geminiService';
import { RefreshCw, TrendingUp, Activity, Newspaper, AlertCircle, DollarSign, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CandlestickChart } from './CandlestickChart';

export default function Dashboard() {
  const [status, setStatus] = useState<'idle' | 'fetching_binance' | 'analyzing_news' | 'complete' | 'error'>('idle');
  const [candidates, setCandidates] = useState<CoinCandidate[]>([]);
  const [analysis, setAnalysis] = useState<Record<string, CoinAnalysis>>({});
  const [error, setError] = useState<string | null>(null);
  const [weightings, setWeightings] = useState({
    chartTrend: 35,
    volatility: 35,
    news: 20,
    float: 10
  });

  const handleWeightChange = (key: keyof typeof weightings, newValue: number) => {
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    
    const otherKeys = Object.keys(weightings).filter(k => k !== key) as (keyof typeof weightings)[];
    
    let sumOthers = 0;
    otherKeys.forEach(k => {
      sumOthers += weightings[k];
    });
    
    let newWeightings = { ...weightings, [key]: newValue };
    const remaining = 100 - newValue;

    if (sumOthers === 0) {
      const split = Math.floor(remaining / otherKeys.length);
      otherKeys.forEach(k => newWeightings[k] = split);
      newWeightings[otherKeys[0]] += remaining - (split * otherKeys.length);
    } else {
      let currentSum = 0;
      otherKeys.forEach((k, i) => {
        if (i === otherKeys.length - 1) {
          newWeightings[k] = remaining - currentSum;
        } else {
          const val = Math.round((weightings[k] / sumOthers) * remaining);
          newWeightings[k] = val;
          currentSum += val;
        }
      });
    }
    
    setWeightings(newWeightings);
  };

  const startScreening = async () => {
    try {
      setStatus('fetching_binance');
      setError(null);
      setCandidates([]);
      setAnalysis({});

      const binanceResults = await fetchBinanceCandidates();
      setCandidates(binanceResults);

      if (binanceResults.length === 0) {
        setStatus('complete');
        return;
      }

      setStatus('analyzing_news');
      
      // Analyze in batches of 5 to avoid overloading Gemini or getting timeouts
      const batchSize = 5;
      
      for (let i = 0; i < binanceResults.length; i += batchSize) {
        const batch = binanceResults.slice(i, i + batchSize);
        const batchAnalysis = await analyzeCoins(batch, weightings);
        
        setAnalysis(prev => {
          const next = { ...prev };
          batchAnalysis.forEach(a => {
            // Match the baseAsset (e.g., "BTC") back to the symbol (e.g., "BTCUSDT")
            const candidate = binanceResults.find(c => c.baseAsset === a.symbol || c.symbol === a.symbol || c.symbol.startsWith(a.symbol));
            if (candidate) {
              next[candidate.symbol] = a;
            }
          });
          return next;
        });
      }

      setStatus('complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during screening.');
      setStatus('error');
    }
  };

  useEffect(() => {
    startScreening();
  }, []);

  const formatCurrency = (val: number) => {
    if (val < 0.01) return '$' + val.toFixed(4);
    return '$' + val.toFixed(2);
  };

  const formatVolume = (val: number) => {
    if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
    if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
    if (val >= 1e3) return (val / 1e3).toFixed(2) + 'K';
    return val.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-emerald-400" />
              Crypto Screener
            </h1>
            <p className="text-zinc-400 mt-1">
              Top 20 Spot Coins: &lt; $20, Low Float, &gt; 2x Avg Vol, &gt; 5% Gain, Positive News
            </p>
          </div>
          
          <button
            onClick={startScreening}
            disabled={status === 'fetching_binance' || status === 'analyzing_news'}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700"
          >
            <RefreshCw className={cn("w-4 h-4", (status === 'fetching_binance' || status === 'analyzing_news') && "animate-spin")} />
            {status === 'fetching_binance' ? 'Scanning Binance...' : 
             status === 'analyzing_news' ? 'Analyzing News...' : 'Refresh Screener'}
          </button>
        </div>

        {/* Status / Error */}
        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-8">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Screening Failed</h3>
              <p className="text-sm opacity-80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Weightings UI */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Analysis Weightings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(weightings).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-emerald-400 font-mono">{value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleWeightChange(key as keyof typeof weightings, parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Loading States */}
        {(status === 'fetching_binance' || status === 'analyzing_news') && candidates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <RefreshCw className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
            <p className="text-lg font-medium text-zinc-300">
              {status === 'fetching_binance' ? 'Scanning Binance Spot Markets...' : 'Analyzing Float & News Sentiment...'}
            </p>
            <p className="text-sm mt-2 max-w-md text-center">
              Filtering for coins under $20, with more than 5% daily gain, and volume at least 2x the 30-day average.
            </p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {[...candidates].sort((a, b) => {
              const scoreA = analysis[a.symbol]?.buyRecommendation || 0;
              const scoreB = analysis[b.symbol]?.buyRecommendation || 0;
              return scoreB - scoreA;
            }).map((coin, index) => {
              const coinAnalysis = analysis[coin.symbol];
              const isAnalyzing = status === 'analyzing_news' && !coinAnalysis;
              
              return (
                <motion.a
                  href={`https://coinmarketcap.com/currencies/${coin.baseAsset.toLowerCase()}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={coin.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col block cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {coin.baseAsset}
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                          USDT
                        </span>
                      </h3>
                      <div className="text-2xl font-mono mt-1 tracking-tight">
                        {formatCurrency(coin.price)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {coinAnalysis && coinAnalysis.buyRecommendation !== undefined && (
                        <div className={cn(
                          "flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg border",
                          coinAnalysis.buyRecommendation >= 80 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                          coinAnalysis.buyRecommendation >= 50 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                          "bg-red-500/20 text-red-400 border-red-500/30"
                        )}>
                          {coinAnalysis.buyRecommendation}% Buy
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-lg">
                        <TrendingUp className="w-4 h-4" />
                        +{coin.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                      <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                        <BarChart2 className="w-3 h-3" /> Vol Ratio
                      </div>
                      <div className="font-mono text-sm text-zinc-200">
                        {coin.volumeRatio.toFixed(1)}x
                      </div>
                    </div>
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                      <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> 24h Vol
                      </div>
                      <div className="font-mono text-sm text-zinc-200">
                        ${formatVolume(coin.volume24h)}
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  {coin.chartData && coin.chartData.length > 0 && (
                    <CandlestickChart data={coin.chartData} />
                  )}

                  {/* AI Analysis Section */}
                  <div className="mt-auto pt-4 border-t border-zinc-800">
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyzing news & float...
                      </div>
                    ) : coinAnalysis ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1",
                              coinAnalysis.newsSentiment === 'To the moon' ? "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30" :
                              coinAnalysis.newsSentiment === 'Positive' ? "bg-emerald-500/10 text-emerald-400" :
                              coinAnalysis.newsSentiment === 'Negative' ? "bg-red-500/10 text-red-400" :
                              "bg-zinc-800 text-zinc-300"
                            )}>
                              {coinAnalysis.newsSentiment === 'To the moon' && "🚀 "}
                              {coinAnalysis.newsSentiment} News
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs font-medium px-2 py-1 rounded-md",
                              coinAnalysis.floatStatus === 'Low' ? "bg-blue-500/10 text-blue-400" :
                              coinAnalysis.floatStatus === 'High' ? "bg-orange-500/10 text-orange-400" :
                              "bg-zinc-800 text-zinc-300"
                            )}>
                              {coinAnalysis.floatStatus} Float
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed flex items-start gap-2">
                          <Newspaper className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                          {coinAnalysis.newsSummary}
                        </p>
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-600">
                        Analysis unavailable
                      </div>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {status === 'complete' && candidates.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No coins currently match all screening criteria.
          </div>
        )}
      </div>
    </div>
  );
}
