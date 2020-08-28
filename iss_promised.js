


// we used request-promise-native cuz normal request doesnt support promisses

const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.pify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = function(body){
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
  // const latitudeNum = JSON.parse(body).data.latitude;
  // const longitudeNum = JSON.parse(body).data.longitude;   const latLng = {latitude: latitudeNum, longitude: longitudeNum}
  // return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
