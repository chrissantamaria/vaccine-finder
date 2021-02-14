require('dotenv-flow').config();
require('console-stamp')(console, {
  label: false,
});
const cron = require('node-cron');

const checkLocations = require('./checkLocations');

console.log('Server started, will check every minute');

// every minute
cron.schedule('*/1 * * * *', () => {
  console.log('Checking...');
  checkLocations().catch(console.error);
});
