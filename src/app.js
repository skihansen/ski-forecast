const path = require('path')
const express = require('express')
var schedule = require('node-schedule');
const Resort = require('./models/resort')
const resortController = require('./controllers/resortController')
const forecastController = require('./controllers/forecastController')
const app = express()
const hbs = require('hbs')
require('./db/mongoose.js')

const port = process.env.PORT

const testRouter = require('./routers/test')
const resortRouter = require('./routers/resort')
const forecastRouter = require('./routers/forecast')

app.use(express.json())
app.use(testRouter)
app.use(resortRouter)
app.use(forecastRouter)

// Define paths for express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

// var date = new Date();
// var j = schedule.scheduleJob({ seconds: date.getSeconds() }, async () => {
// 	const resorts = await Resort.find()
// 	for(resort of resorts) {
// 		console.log('Fetching daily forecast for ' , resort.name, ' at ', date);
// 		 forecastController.getForecastForResort(resort, async (error, resort, daily_forecast) => {
// 			if(error) {
// 				console.log(error)
// 			} else {
// 				console.log('Updating daily forecast for ' , resort.name);
// 				await forecastController.updateResortForecasts(resort, daily_forecast)
// 				await forecastController.calculateResortSnowForecast(resort)
// 			}
// 		})
// 	}		
// })

	// for(resort of resorts) {
	// 	console.log('Fetching daily forecast for ' , resort.name, ' at ', date);
	// 	forecastController.getForecastForResort(resort, async (error, daily_forecast) => {
	// 		if(error) {
	// 			console.log(error)
	// 		} else {
	// 			forecastController.updateResortForecasts(resort, daily_forecast, async (error, callback) => {
	// 				if(error) {
	// 					console.log(error)
	// 				} else {
	// 					console.log(callback)
	// 					forecastController.calculateResortSnowForecast(resort, async (error, callback) => {
	// 						if(error) {
	// 							console.log(error)
	// 						} else {
	// 							console.log(callback)
	// 						}
	// 					})
	// 				}
	// 			})
	// 		}
			
	// 	})
	// }

// app.get('/map', (req, res) => {
// 	res.render('map', {
// 		title: 'Static Map',
// 		name: 'Steve'
// 	})
// })

app.listen(port, () => {
	console.log('Server is up on port ', port)
})