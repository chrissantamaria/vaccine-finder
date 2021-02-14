import 'dotenv-flow/config.js';
import consoleStamp from 'console-stamp';
import { scheduleJob } from 'node-schedule';

import checkLocations from './helpers/checkLocations.js';

consoleStamp(console, { label: false });

const INTERVAL_SECONDS = 20;

console.log(`Server started, will check every ${INTERVAL_SECONDS} seconds`);

scheduleJob(`*/${INTERVAL_SECONDS} * * * * *`, () => {
  console.log('Checking...');
  checkLocations().catch(console.error);
});
