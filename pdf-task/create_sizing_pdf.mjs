import fs from 'fs';
import PDFDocument from 'pdfkit';

const OUTPUT_FILE = 'position_sizing_guide.pdf';

function createGuide() {
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(OUTPUT_FILE);
    doc.pipe(writeStream);

    // --- TITLE PAGE ---
    doc.fontSize(26).font('Helvetica-Bold').text('Position Sizing', { align: 'center' });
    doc.fontSize(16).font('Helvetica').text('The Holy Grail of Risk Management', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(10).text('Generated for Rudi by Idrael', { align: 'center', color: 'gray' });
    doc.moveDown(4);

    // --- 1. THE GOLDEN RULE ---
    doc.fontSize(18).font('Helvetica-Bold').text('1. The Golden Rule', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(
        "Professional traders don't focus on profits first. They focus on RISK. " +
        "The most widely accepted rule in day trading is:"
    );
    doc.moveDown();
    
    doc.rect(50, doc.y, 500, 40).fillAndStroke('#f0f0f0', '#333');
    doc.fillColor('black').fontSize(14).font('Helvetica-Bold')
       .text("Never risk more than 1% of your capital on a single trade.", 50, doc.y - 30, { align: 'center', width: 500 });
    
    doc.moveDown(2);
    doc.fontSize(12).font('Helvetica').text(
        "Why? Because even with a 1% risk, you can survive a losing streak of 10 trades (down ~9.6%). " +
        "If you risk 10%, a bad week can wipe you out."
    );
    doc.moveDown(2);

    // --- 2. THE FORMULA ---
    doc.fontSize(18).font('Helvetica-Bold').text('2. The Formula', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text("Calculate your position size based on where your STOP LOSS is, not how much money you want to make.");
    doc.moveDown();

    const formulaY = doc.y;
    doc.rect(50, formulaY, 500, 70).stroke();
    
    doc.fontSize(16).text("Position Size = ", 70, formulaY + 25);
    doc.text("Account Risk ($)", 250, formulaY + 15);
    doc.moveTo(240, formulaY + 35).lineTo(400, formulaY + 35).stroke();
    doc.text("Stop Loss Distance ($)", 230, formulaY + 40);
    
    doc.moveDown(4);

    // --- 3. STEP-BY-STEP EXAMPLE ---
    doc.fontSize(18).font('Helvetica-Bold').text('3. Example Calculation', { underline: true });
    doc.moveDown();
    
    const steps = [
        { title: "Step 1: Account Risk", desc: "Account = $10,000. Risk = 1%. \nRisk Amount = $100." },
        { title: "Step 2: Trade Setup", desc: "You want to buy BTC at $60,000. \nYour technical Stop Loss is at $59,500." },
        { title: "Step 3: Stop Distance", desc: "Distance = Entry - Stop \n$60,000 - $59,500 = $500 per BTC." },
        { title: "Step 4: Position Size", desc: "Size = Risk / Distance \n$100 / $500 = 0.2 BTC" }
    ];

    steps.forEach(step => {
        doc.font('Helvetica-Bold').fontSize(12).text(step.title);
        doc.font('Helvetica').fontSize(12).text(step.desc);
        doc.moveDown(0.5);
    });
    
    doc.moveDown();
    doc.font('Helvetica-Oblique').text("Result: You buy 0.2 BTC ($12,000 value). If price hits stop, you lose exactly $100.");
    doc.moveDown(2);

    // --- 4. LEVERAGE MYTH ---
    doc.addPage();
    doc.fontSize(18).font('Helvetica-Bold').text('4. The Truth About Leverage', { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica').text(
        "Leverage does NOT change your position size calculation. It only reduces the margin (collateral) needed."
    );
    doc.moveDown();
    
    doc.fontSize(12).text("In the example above (0.2 BTC = $12,000 position):");
    doc.list([
        "1x Leverage: You need $12,000 cash.",
        "10x Leverage: You need $1,200 cash.",
        "50x Leverage: You need $240 cash."
    ]);
    doc.moveDown();
    doc.font('Helvetica-Bold').text("BUT THE RISK IS THE SAME ($100) IN ALL CASES IF STOP IS HIT!", { color: 'red' });
    doc.font('Helvetica').fillColor('black');
    
    doc.moveDown(2);
    
    // --- CHEAT SHEET ---
    doc.fontSize(18).font('Helvetica-Bold').text('Summary Cheat Sheet', { underline: true });
    doc.moveDown();
    
    const tableTop = doc.y;
    const col1 = 50;
    const col2 = 250;
    
    doc.fontSize(12);
    doc.text("Conservative Risk:", col1, tableTop); doc.text("0.5% - 1% per trade", col2, tableTop);
    doc.text("Aggressive Risk:", col1, tableTop + 20); doc.text("1% - 2% per trade", col2, tableTop + 20);
    doc.text("Gambling:", col1, tableTop + 40); doc.text("> 2% per trade", col2, tableTop + 40);
    
    doc.moveDown(4);
    doc.fontSize(10).font('Helvetica-Oblique').text(
        "\"Amateurs think about how much they can make. Professionals think about how much they can lose.\""
    );

    doc.end();

    writeStream.on('finish', () => {
        console.log("PDF created successfully.");
    });
}

createGuide();
