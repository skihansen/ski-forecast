const path = require('path')
const express = require('express')
const Forecast = require('../models/forecast')
const Resort = require('../models/resort')
const darkSkyForecast = require('../utils/darkSkyForecast')
const forecastController = require('../controllers/forecastController')

const router = new express.Router()

router.get('/resort/forecast', async (req, res) => {
	try {
		const resorts = await Resort.find()
		for(resort of resorts) {
			await forecastController.calculateResortSnowForecast(resort)
		}
		res.send('Resort snow forecasts updated!')
	} catch (e) {
		res.status(400).send(e)
	}
})
router.get('/forecasts', async (req, res) => {
	try {
		const forecasts = await Forecast.find()
		res.send(forecasts)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.post('/forecasts', async (req, res) => {
	try {
		const resort = await Resort.findById('5e67f76f3b421d504699df89')
		darkSkyForecast(resort.lat,resort.lng, async (error, { daily_forecast }) => {
			if(error) {
				res.status(400).send(error)
			}
			forecastController.newUpdateResortForecasts(resort, daily_forecast, async (error, success) => {
				if(error) {
					res.status(400).send(error)
				}
				res.send(success)
			})
		})
	} catch(e) {
		res.status(400).send(e)
	}
})

module.exports = router
	// res.send('No forecasts gotten - comment this line out')
// 	try{
// 		// const resort = await Resort.findById(req.params.resort_id)
// 		const resorts = await Resort.find()
// 		for (const resort of resorts) {
// 			const location = resort.name 
// 			darkSkyForecast(resort.lat, resort.lng, async (error, { daily_summary, temperature, chance_precip, daily_forecast }) => {
// 				if(error){
// 					return res.send({ error })
// 				}
// 				// Delete old forecasts
// 				await Forecast.deleteMany({ resort_id: resort._id })
// 				for (key in daily_forecast.data) {
// 					const { time, summary, icon, precipProbability, precipType, precipAccumulation, temperatureHigh, temperatureLow } = daily_forecast.data[key]
// 					const date = new Date(time * 1000);
// 					const forecast = new Forecast({
// 						resort_id: resort._id,
// 						date,
// 						summary,
// 						icon,
// 						precipProbability,
// 						precipType,
// 						precipAccumulation,
// 						temperatureHigh,
// 						temperatureLow
// 					})
// 					await forecast.save()
// 				}
// 				const newForecasts = Forecast.find( { resort_id: resort._id }).sort(data)
// 				// res.send({
// 				// 	daily_summary, temperature, chance_precip, daily_forecast, location
// 				// })
// 			}) // end darkSkyForecast function
// 		} // end for (const resort of resorts)
// 		res.send('Forcasts successfully populated')
// 	} catch(e){
// 		res.status(404).send(e)
// 	}
// })