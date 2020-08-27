//iss.js
const request = require('request');

const fetchMyIP = function(callback) { 
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    const ip = JSON.parse(body).ip;
    if (response.statusCode === 200) {
       callback(null,ip);
    } else {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
     
  });
}

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const latitudeNum = JSON.parse(body).data.latitude;
    const longitudeNum = JSON.parse(body).data.longitude;
    const latLng = {latitude: latitudeNum, longitude: longitudeNum}
   
    callback(null, latLng);
  });
}


module.exports = { fetchMyIP , fetchCoordsByIP }