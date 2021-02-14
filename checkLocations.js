const fetch = require('node-fetch');

const getTravelTime = require('./getTravelTime');
const sendText = require('./sendText');

const LOCATIONS_ENDPOINT =
  'https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json';

const checkLocations = async () => {
  const { locations } = await fetch(LOCATIONS_ENDPOINT).then((res) =>
    res.json()
  );

  // Mock test data
  // locations[100].openTimeslots = 7;
  // locations[6].openTimeslots = 1;

  const validLocations = locations.filter((location) => location.openTimeslots);

  for (const location of validLocations) {
    console.log(location);
    const {
      name,
      city,
      state,
      openTimeslots,
      latitude,
      longitude,
      url,
    } = location;

    const { distance, duration } = await getTravelTime(
      [latitude, longitude].join(',')
    );

    const message = [
      `🚨 ${openTimeslots} opening${
        openTimeslots > 1 ? 's' : ''
      } at ${name} in ${city}, ${state}`,
      `${duration} (${distance}) away`,
      url,
    ].join('\n\n');

    await sendText(message);
  }
};

module.exports = checkLocations;
