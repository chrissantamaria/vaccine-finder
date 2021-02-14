import fetch from 'node-fetch';

import getTravelTime from './getTravelTime.js';
import sendText from './sendText.js';

const LOCATIONS_ENDPOINT =
  'https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json';

// Contains store numbers of locations that (as of the last fetch)
// had availabilities. Used to not send duplicate alerts for a single opening.
const activeLocations = new Set();

const checkLocations = async () => {
  const { locations } = await fetch(LOCATIONS_ENDPOINT).then((res) =>
    res.json()
  );

  for (const location of locations) {
    const { storeNumber, openTimeslots } = location;

    if (openTimeslots === 0) {
      activeLocations.delete(storeNumber);
      continue;
    }

    if (!activeLocations.has(storeNumber)) {
      activeLocations.add(storeNumber);
      await handleLocation(location);
    }
  }
};

const handleLocation = async (location) => {
  console.log('Availability found!', location);
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
  console.log({ distance, duration });

  const message = [
    `🚨 ${openTimeslots} opening${
      openTimeslots > 1 ? 's' : ''
    } at ${name} in ${city}, ${state}`,
    `${duration} (${distance}) away`,
    url,
  ].join('\n\n');

  await sendText(message);
};

export default checkLocations;
