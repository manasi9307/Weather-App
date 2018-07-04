const request = require('request');


var geocodeAddress = (address, callback) =>{
  var encoded = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`,
    json: true
  }, (error, response, body) =>{
    if(error){
      callback('Unable to connect to the Google Server.');
    } else if(body.status === "ZERO_RESULTS"){
      callback('Unable to find the address.');
    } else if(body.status === "OK"){
      callback(undefined, {
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });
  }
  });
};

module.exports.geocodeAddress = geocodeAddress;

//7003c601619714193b39adf75517426d
