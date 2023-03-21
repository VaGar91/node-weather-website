const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmljYWI5MSIsImEiOiJjbGVuZ2ZsbGwwaGQ5M3JtbjdrZmJuYThjIn0.NMcdJmXGDD_1Acij5mv4YQ&limit=1`;

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(!response.body.features.length){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        }
    });
}  

module.exports = geoCode;


// // Geocoding
// const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Colima.json?access_token=pk.eyJ1IjoidmljYWI5MSIsImEiOiJjbGVuZ2ZsbGwwaGQ5M3JtbjdrZmJuYThjIn0.NMcdJmXGDD_1Acij5mv4YQ&limit=1'

// request({url: geoUrl, json: true }, (error, response) => {
//     // const data = response.body;

//     if(error){
//         console.log(`Unable to connect network`);
//     } else if(!response.body.features.length){
//         console.log('No matching results');
//     }else{
//         console.log(`Longitude: ${response.body.features[0].center[0]} and latitude ${response.body.features[0].center[1]}`);
//     }
// });