require('dotenv').config();

const checkLocations = require('./checkLocations');

checkLocations().catch(console.error);
