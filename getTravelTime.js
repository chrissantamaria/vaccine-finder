import fetch from 'node-fetch';
import qs from 'querystring';

const MAPS_API_ENDPOINT =
  'https://maps.googleapis.com/maps/api/distancematrix/json';

const getTravelTime = async (location) => {
  const params = qs.encode({
    origins: process.env.START_LOCATION,
    destinations: location,
    key: process.env.GOOGLE_API_KEY,
    units: 'imperial',
  });
  const data = await fetch(`${MAPS_API_ENDPOINT}?${params}`).then((res) =>
    res.json()
  );

  const [element] = data.rows[0].elements;
  return {
    distance: element.distance.text,
    duration: element.duration.text,
  };
};

export default getTravelTime;
