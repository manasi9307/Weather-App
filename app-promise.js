//const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;
var encoded = encodeURIComponent(argv.address);
//console.log(argv);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`;
axios.get(geocodeURL).then((response) =>{
  if(response.data.status === "ZERO_RESULTS"){
  throw new Error("Unable to find the address");
}
var lat=response.data.results[0].geometry.location.lat;
var lng=response.data.results[0].geometry.location.lng;
var weatherUrl = `https://api.darksky.net/forecast/7003c601619714193b39adf75517426d/${lat},${lng}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);
}).then((response) =>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}`);
}).catch((e)=>{
  if(e.code === "ENOTFOUND"){
  console.log("Unable to connect to API server");
} else{
  console.log(e.message);
}
})
