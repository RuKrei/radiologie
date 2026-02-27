import fs from 'fs';
import PDFDocument from 'pdfkit';
import axios from 'axios';

// --- CONFIG ---
const SYMBOL = 'BTCUSDT';
const INTERVAL = '1h';
const LIMIT = 24; // Last 24 hours
const OUTPUT_FILE = 'bitcoin_report.pdf';

async function fetchData() {
    try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=${LIMIT}`;
        const response = await axios.get(url);
        // Binance format: [Open time, Open, High, Low, Close, Volume, ...]
        return response.data.map(d => ({
            t: d[0],
            o: parseFloat(d[1]),
            h: parseFloat(d[2]),
            l: parseFloat(d[3]),
            c: parseFloat(d[4])
        }));
    } catch (error) {
        console.error("Failed to fetch data:", error.message);
        return []; // Return empty array on failure
    }
}

function drawCandlestickChart(doc, data, x, y, width, height) {
    if (!data || data.length === 0) {
        doc.fontSize(12).text("No data available for chart.", x, y);
        return;
    }

    // Draw Border
    doc.rect(x, y, width, height).stroke();

    // Calculate Scale
    const prices = data.flatMap(d => [d.h, d.l]);
    const minPrice = Math.min(...prices) * 0.995; // 0.5% buffer
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice;

    // Dimensions
    const candleWidth = (width / data.length) * 0.6;
    const spacing = (width / data.length) * 0.4;

    data.forEach((d, i) => {
        const cx = x + (i * (candleWidth + spacing)) + (spacing / 2);
        
        // Y-Coordinates (inverted, 0 is top)
        const yHigh = y + height - ((d.h - minPrice) / priceRange * height);
        const yLow = y + height - ((d.l - minPrice) / priceRange * height);
        const yOpen = y + height - ((d.o - minPrice) / priceRange * height);
        const yClose = y + height - ((d.c - minPrice) / priceRange * height);

        const isBullish = d.c >= d.o;
        const color = isBullish ? '#2ecc71' : '#e74c3c'; // Green / Red

        doc.save();
        doc.strokeColor(color).lineWidth(1);
        doc.fillColor(color);

        // Wick
        doc.moveTo(cx + candleWidth/2, yHigh)
           .lineTo(cx + candleWidth/2, yLow)
           .stroke();

        // Body (ensure at least 1px height)
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1);
        
        doc.rect(cx, bodyTop, candleWidth, bodyHeight).fill();
        doc.restore();
    });

    // Labels (Min/Max Price on Y-Axis)
    doc.fontSize(8).fillColor('black');
    doc.text(maxPrice.toFixed(2), x + width + 5, y);
    doc.text(minPrice.toFixed(2), x + width + 5, y + height - 10);
    
    // Label (Last Price)
    const last = data[data.length - 1];
    doc.fontSize(10).fillColor('blue').text(`Last: ${last.c.toFixed(2)}`, x + width + 5, y + height/2);
}

async function createPDF() {
    console.log("Fetching live data...");
    const data = await fetchData();
    console.log(`Fetched ${data.length} candles.`);

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(OUTPUT_FILE);
    doc.pipe(writeStream);

    // --- LOGO ---
    let hasLogo = false;
    try {
        const logoRes = await axios({
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/200px-Bitcoin.svg.png',
            method: 'GET',
            responseType: 'arraybuffer'
        });
        fs.writeFileSync('btc_logo.png', logoRes.data);
        hasLogo = true;
    } catch (e) {
        console.log("Logo fetch failed.");
    }

    if (hasLogo) {
        try { doc.image('btc_logo.png', 50, 45, { width: 50 }); } catch(e){}
    } else {
        doc.save().circle(75, 70, 25).fillColor('#F7931A').fill().fillColor('white').fontSize(30).text('B', 65, 52).restore();
    }

    // --- HEADER ---
    doc.fillColor('#333').fontSize(24).text('Bitcoin Market Report', 110, 57);
    doc.fontSize(10).fillColor('#666').text(`Generated: ${new Date().toLocaleString()}`, { align: 'right' });
    doc.moveDown(2);

    // --- CHART ---
    doc.fontSize(14).fillColor('black').text(`BTC/USDT (${LIMIT} Hours)`, { underline: true });
    doc.moveDown(0.5);
    
    drawCandlestickChart(doc, data, 50, 150, 450, 200); // x, y, w, h
    
    // --- TABLE ---
    const tableTop = 400;
    doc.fontSize(14).text('Market Snapshot', 50, tableTop - 25, { underline: true });
    
    const headers = ['Metric', 'Value'];
    const rows = [
        ['Current Price', data.length ? `$${data[data.length-1].c.toFixed(2)}` : 'N/A'],
        ['24h High', data.length ? `$${Math.max(...data.map(d=>d.h)).toFixed(2)}` : 'N/A'],
        ['24h Low', data.length ? `$${Math.min(...data.map(d=>d.l)).toFixed(2)}` : 'N/A'],
        ['Volume (24h)', 'See exchange']
    ];

    const colWidth = 200;
    const rowHeight = 25;

    // Draw Table
    rows.unshift(headers); // Add headers
    rows.forEach((row, r) => {
        row.forEach((cell, c) => {
            const x = 50 + (c * colWidth);
            const y = tableTop + (r * rowHeight);
            
            // Header styling
            if (r === 0) {
                doc.font('Helvetica-Bold');
                doc.rect(x, y, colWidth, rowHeight).fillAndStroke('#eee', '#ccc');
                doc.fillColor('black').text(cell, x + 10, y + 8);
            } else {
                doc.font('Helvetica');
                doc.rect(x, y, colWidth, rowHeight).stroke('#ccc'); // Outline only
                doc.fillColor('black').text(cell, x + 10, y + 8);
            }
        });
    });

    // --- JOKE ---
    doc.moveDown(8);
    doc.fontSize(12).font('Helvetica-Oblique').fillColor('#555');
    doc.text('Joke of the Moment:', 50, tableTop + (rows.length * rowHeight) + 30);
    doc.font('Helvetica').fillColor('black');
    doc.text('"Why did the Bitcoin investor break up with his girlfriend?"');
    doc.text('"Because she kept asking for a \'stable\' relationship."');

    doc.end();

    // Wait for finish
    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
    console.log(`PDF created: ${OUTPUT_FILE}`);
}

createPDF();
