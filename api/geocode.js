// geocode.js takes an 'address' parameter and callback funtion
// It encodes the address, and make a request to Google to provide the formatted address, longitude, and latitude

const request = require('request');

const geocodeAddress = (address, callback) => {  
  const encodedAddress = encodeURIComponent(address); //encodes the address provided in argv
  // Make an http request to a google api, and the callback function to display the data  
  request({
    url: `https://maps.google.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(body); // gets a concatenated version.
    // console.log(JSON.stringify(body, undefined, 2)); // Gets the entire object. '2' is the number of spaces per indentation
    if (error) {
      callback('Unable to connect to servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status !== 'OK') {
      callback(body.status);
    } else {
      callback(undefined, {  // returns 'undefined' for the 1st param because there's no errorMessage.
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng        
      });      
    }
  });
};


module.exports = {geocodeAddress};

