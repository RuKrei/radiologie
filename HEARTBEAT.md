# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

# Crypto Screener Logic
# The cron job "crypto-screener-check" fires every 30 minutes with a system event.
# When you see: "[AUTOMATED] Run crypto_screener check...", execute:
# 1. `npx tsx crypto_screener/check_crypto.ts`
# 2. Parse the JSON output.
# 3. Filter for `buyRecommendation > 90`.
# 4. If any matches found, send Telegram message with details (and maybe a screenshot using browser if you can render the chart).
# 5. If no matches > 90, do nothing (silent check).
#    UPDATE: User only wants notification if score > 90. Silent if below.
