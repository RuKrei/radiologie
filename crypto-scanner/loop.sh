#!/bin/bash
echo "Starting Crypto Scanner Loop..."
while true; do
  echo "[$(date)] Running scan..."
  /usr/local/bin/node /data/.openclaw/workspace/crypto-scanner/scan.mjs >> /data/.openclaw/workspace/crypto-scanner/scan.log 2>&1
  echo "[$(date)] Scan finished. Sleeping for 15m..."
  sleep 900
done
