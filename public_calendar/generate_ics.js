import * as ics from 'ics';
import { writeFileSync } from 'fs';

const events = [
  {
    start: [2026, 2, 27, 14, 0],
    duration: { hours: 0, minutes: 30 },
    title: 'Test Termin',
    description: 'Erstellt von Idrael via OpenClaw',
    location: 'Online',
    status: 'CONFIRMED',
    busyStatus: 'BUSY'
  },
  {
    start: [2026, 2, 28, 10, 0],
    duration: { hours: 1, minutes: 0 },
    title: 'WCE Kurs Review',
    description: 'Trading Kurs Inhalte in Obsidian prüfen',
    location: 'Obsidian Workspace',
    status: 'CONFIRMED',
    busyStatus: 'BUSY'
  },
  {
    start: [2026, 3, 1, 18, 0],
    duration: { hours: 0, minutes: 45 },
    title: 'Wochen-Analyse Crypto',
    description: 'Marktstruktur für die kommende Woche bewerten',
    location: 'Trading Desk',
    status: 'CONFIRMED',
    busyStatus: 'BUSY'
  }
];

ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }
  writeFileSync(`${process.cwd()}/calendar.ics`, value);
  console.log('ICS file with multiple events created successfully');
});
