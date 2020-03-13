const request = require('request')
const darkSkyForecast = (lat, lng, callback) => {
	const url = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + '/' + lat + ',' + lng
	request({ url, json: true }, (error, { body }) => {
		if(error){
			callback('Unable to connect to weather service.')
		} else if (body.error) {
			callback(body.error)
		} else {
			callback(undefined, {
				daily_forecast: body.daily
			})
		}
	})
}
module.exports = darkSkyForecast