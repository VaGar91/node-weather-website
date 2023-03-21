const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=36dfeb2f3a762a2f526c32629c021df4&query=${latitude},${longitude}`;

    request({url, json: true}, (error, response) => {
        if(error){
            callback(`Unable to connect network`, undefined);
        } else if(response.body.error){
            callback('No matching results', undefined);
        } else {
            callback(undefined,`${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} and it feels like ${response.body.current.feelslike}.`);
        }
    });
}

module.exports = forecast;