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

}


module.exports = { fetchMyIP , fetchCoordsByIP }