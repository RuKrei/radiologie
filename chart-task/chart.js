const { createCanvas } = require('canvas');
const fs = require('fs');

const data = [
  { t: 1771938000000, o: 62969.04, h: 63100, l: 62510.28, c: 62900 },
  { t: 1771941600000, o: 62900.01, h: 63834.21, l: 62762.03, c: 63453.99 },
  { t: 1771945200000, o: 63454, h: 64031.76, l: 63300, c: 63973.97 },
  { t: 1771948800000, o: 63973.98, h: 64428.9, l: 63689.54, c: 64265.52 },
  { t: 1771952400000, o: 64265.53, h: 64281.95, l: 64236.54, c: 64249.21 }
];

const width = 800;
const height = 400;
const padding = 50;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#1e1e1e';
ctx.fillRect(0, 0, width, height);

// Draw Grid/Axes
ctx.strokeStyle = '#333';
ctx.lineWidth = 1;

// Find range
const allPrices = data.flatMap(d => [d.h, d.l]);
const minPrice = Math.min(...allPrices) * 0.999;
const maxPrice = Math.max(...allPrices) * 1.001;
const priceRange = maxPrice - minPrice;
const chartHeight = height - (padding * 2);

// Draw Candles
const candleWidth = (width - (padding * 2)) / data.length * 0.6;
const spacing = (width - (padding * 2)) / data.length * 0.4;

data.forEach((d, i) => {
    const x = padding + (i * (candleWidth + spacing));
    
    // Y coords (0 is top)
    const yHigh = padding + chartHeight - ((d.h - minPrice) / priceRange * chartHeight);
    const yLow = padding + chartHeight - ((d.l - minPrice) / priceRange * chartHeight);
    const yOpen = padding + chartHeight - ((d.o - minPrice) / priceRange * chartHeight);
    const yClose = padding + chartHeight - ((d.c - minPrice) / priceRange * chartHeight);

    const isGreen = d.c >= d.o;
    const color = isGreen ? '#00ff00' : '#ff0000';

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    // Wick
    ctx.beginPath();
    ctx.moveTo(x + candleWidth/2, yHigh);
    ctx.lineTo(x + candleWidth/2, yLow);
    ctx.stroke();

    // Body
    const bodyTop = Math.min(yOpen, yClose);
    const bodyH = Math.abs(yClose - yOpen) || 1;
    ctx.fillRect(x, bodyTop, candleWidth, bodyH);

    // Label
    if (i === data.length - 1) {
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(d.c.toFixed(2), x, yClose - 10);
    }
});

// Title
ctx.fillStyle = '#fff';
ctx.font = '20px Arial';
ctx.fillText('BTC/USDT (1h) - Last 5 Hours', padding, 30);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('chart.png', buffer);
console.log('Chart created: chart.png');
