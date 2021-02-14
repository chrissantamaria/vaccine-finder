import 'dotenv-flow/config.js';
import consoleStamp from 'console-stamp';
import cron from 'node-cron';

consoleStamp(console, { label: false });

import checkLocations from './checkLocations.js';

console.log('Server started, will check every minute');

// every minute
cron.schedule('*/1 * * * *', () => {
  console.log('Checking...');
  checkLocations().catch(console.error);
});
