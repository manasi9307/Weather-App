const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/7003c601619714193b39adf75517426d/${lat},${lng}`,
    json:true
  },(error, response, body)=>{
    if(error){
      callback('Unable to connect to Forecast.io');
    } else if(response.statusCode === 400){
      callback('Unable to fetch weather forecast');
    } else if(response.statusCode === 200){
    callback(undefined,{
      temperature:body.currently.temperature,
      apparentTemperature:body.currently.apparentTemperature
    });
  }
  });
};

module.exports.getWeather = getWeather;
