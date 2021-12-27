const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWluaHRyYW4yMTMiLCJhIjoiY2t4bGljMnM4M3F3bjJ3cGYzZGUwZGVncSJ9.MPCg4gncqf9QjKN55Pku6w`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service.', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
