const path = require('path')
const express = require('express')
const GeoJSON = require('geojson')
const Resort = require('../models/resort')
const Forecast = require('../models/forecast')
const forecastController = require('../controllers/forecastController')
const resortController = require('../controllers/resortController')
// const auth = require('../middleware/auth')

const router = new express.Router()
const publicDirectory = path.join(__dirname, '../../public')

// router.get('/resorts/populate', async (req, res) => {
// 	resortController.loadResortsFromCsv('skiareas.csv')
// })

router.get('/resorts', async (req, res) => {
	try {
		const resorts = await Resort.find().populate('forecasts').lean()
		res.send(resorts)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.get('/resorts/updateforecasts', async (req, res) => {
	try {
		const resorts = await Resort.find().limit(1)
		for(const resort of resorts) {
			console.log(resort._id)
			forecastController.getForecastForResort(resort, async (error, daily_forecast) => {
				if(error) {
					res.status(400).send(error)
				}
				forecastController.updateResortForecasts(resort, daily_forecast, async(error, blah) => {
					if(error) {

						res.status(400).send(error)
					}
					res.send(blah)
				})
				// await forecastController.calculateResortSnowForecast(resort)
				// res.send('Resort Forecasts updated')
			})
		}
	} catch(e) {
		console.log(e)
		res.status(400).send(e)
	}
})

router.get('/', async (req, res) => {
	try {
		var resorts = await Resort.find().sort('-precipForecast7Day').lean()
		const resortsGeoJSON = GeoJSON.parse(resorts, {Point: ['lat', 'lng']});

		const jsonData = {
	            'type': 'geojson',
	            'data': resortsGeoJSON
	        }
		res.render('map', { 
		  encodedJson : encodeURIComponent(JSON.stringify(jsonData)),
		  resorts
		});
	} catch(e) {
		res.status(400).send(e)
	}	
})

router.get('/resorts/:id', async (req, res) => {
	try {
		const resort = await Resort.findOne({_id: req.params.id}).populate('forecasts').lean()
		res.send({resort, 
					forecast: resort.forecasts,
					snow_accumulation: resort.snow_accumulation
				})
	} catch(e) {
		res.status(400).send(e)
	}
})

router.post('/resorts', async (req, res) => {
	try {
		const resort = new Resort(req.body)
		await resort.save()
	} catch(e) {
		res.status(400).send(e)
	}
	
})

router.patch('/resorts/:id', async (req, res) => {
	try {
		const resort = await Resort.findByIdAndUpdate(req.params.id, req.body)
		res.send(resort)
		// await resort.save()
	} catch(e) {
		res.status(400).send(e)
	}
	
})

module.exports = router