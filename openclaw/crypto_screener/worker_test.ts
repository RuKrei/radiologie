import { fetchBinanceCandidates } from './src/services/binanceService.js';
import { analyzeCoins } from './src/services/geminiService.js';
import fs from 'fs';
import path from 'path';

// Minimal polyfill if needed, but Node 22 has fetch
// process.env.GEMINI_API_KEY is expected

const TELEGRAM_CHAT_ID = '7545582236';

async function sendTelegramMessage(text) {
  // Using OpenClaw's message tool via console log for the agent to pick up?
  // No, the agent (me) is running this script. I should use the message tool directly from the agent.
  // But this script runs independently.
  // The user asked me to "implement it locally" and "update every 30 minutes".
  // This implies I (the agent) am the scheduler, OR I set up a cron job.
  
  // If I set up a cron job, the script needs to send the message.
  // The script can't call the `message` tool directly.
  // However, I can use a simple Telegram Bot API call if I have a bot token.
  // But I don't have the user's bot token.
  // Wait, I am the bot. I am OpenClaw.
  // I can use the `openclaw` CLI to send messages if I'm on the same machine?
  // Or I can use the `message` tool *as the agent* when the script finishes.
  
  // Actually, the best way for a persistent 30-minute check is to use the `cron` tool provided by OpenClaw.
  // The `cron` tool allows me to schedule a task that wakes me up.
  // Then *I* run the check and send the message.
  // This is much better than a detached script because I have access to all tools (including `message` and `browser` for screenshots).
  
  // So the plan is:
  // 1. Create a `check_crypto.ts` script that I can run *on demand*.
  // 2. Schedule a cron job to wake me up every 30 minutes.
  // 3. When woken, I run `tsx check_crypto.ts`.
  // 4. Parse the output.
  // 5. If buy > 90, I send the message/screenshot.
  
  // This keeps me in control and uses the `message` tool correctly.
  
  // Let's adapt `check_crypto.ts` to output JSON results.
  
  console.log('Starting check...');
  try {
    const candidates = await fetchBinanceCandidates();
    console.log(`Found ${candidates.length} candidates.`);
    
    if (candidates.length === 0) {
      console.log('No candidates found.');
      return;
    }

    const weightings = {
      chartTrend: 30,
      volatility: 20,
      news: 30,
      float: 20
    };

    const analysis = await analyzeCoins(candidates, weightings);
    console.log(JSON.stringify(analysis, null, 2));
    
  } catch (error) {
    console.error('Error in check_crypto:', error);
  }
}

sendTelegramMessage('Init'); // Just to test imports
