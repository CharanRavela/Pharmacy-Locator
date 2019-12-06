const request = require('request')

const requiredLocations = (latitude,longitude,callback) =>
{
   const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=1500&type=pharmacy&key=AIzaSyBGaJsTfbEMsv4q5tJRi-PBmofy8kdri-Y';
    request({ url,json: true},(error, {body }) =>{
        if(error)
        {
            callback('Unable to connect to the pharmacy locator services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined, {
                results: body.results,
            })
        }
    })
}


module.exports = requiredLocations

