import React from 'react';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: ChartData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  if (!data || data.length === 0) return null;

  const minLow = Math.min(...data.map(d => d.low));
  const maxHigh = Math.max(...data.map(d => d.high));
  const range = maxHigh - minLow || 1;
  const padding = range * 0.1;
  const yMin = minLow - padding;
  const yMax = maxHigh + padding;
  const yRange = yMax - yMin;

  return (
    <div className="h-24 w-full flex items-end justify-between gap-[2px] mt-2 mb-4 relative">
      <div className="absolute top-0 left-0 text-[10px] text-zinc-600 font-mono">90m (5m)</div>
      {data.map((d, i) => {
        const isUp = d.close >= d.open;
        const color = isUp ? 'bg-emerald-500' : 'bg-red-500';
        
        const highY = ((yMax - d.high) / yRange) * 100;
        const lowY = ((yMax - d.low) / yRange) * 100;
        const openY = ((yMax - d.open) / yRange) * 100;
        const closeY = ((yMax - d.close) / yRange) * 100;
        
        const topY = Math.min(openY, closeY);
        const bottomY = Math.max(openY, closeY);
        const bodyHeight = Math.max(bottomY - topY, 1); // at least 1px

        return (
          <div key={i} className="relative flex-1 h-full group">
            {/* Wick */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-[1px] ${color} opacity-50`}
              style={{ top: `${highY}%`, bottom: `${100 - lowY}%` }}
            />
            {/* Body */}
            <div 
              className={`absolute left-0 right-0 ${color}`}
              style={{ top: `${topY}%`, height: `${bodyHeight}%` }}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 bg-zinc-800 text-xs p-2 rounded shadow-xl whitespace-nowrap border border-zinc-700 font-mono">
              <div className="text-zinc-400 border-b border-zinc-700 pb-1 mb-1">{d.time}</div>
              <div className="text-emerald-400">H: {d.high}</div>
              <div className="text-zinc-300">O: {d.open}</div>
              <div className="text-zinc-300">C: {d.close}</div>
              <div className="text-red-400">L: {d.low}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
