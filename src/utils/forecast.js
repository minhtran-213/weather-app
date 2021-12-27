const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a87b72103ff3f91d0cffa86c36a7ba50&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to forecast service', undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      const { temperature, precip } = response.body.current;
      callback(
        undefined,
        `It's currently ${temperature} degrees out. There is a ${precip}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
