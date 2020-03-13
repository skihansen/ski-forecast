const path = require('path')
const express = require('express')
const Forecast = require('../models/forecast')
const Resort = require('../models/resort')
const darkSkyForecast = require('../utils/darkSkyForecast')

const updateResortForecasts = async(resort, daily_forecast) => {
	try {
		//console.log('updating resort forecasts for ' + resort.name)
		await Forecast.deleteMany({ resort_id: resort._id })
		for (key in daily_forecast.data) {
			console.log('before forecast save')
			const { time, summary, icon, precipProbability, precipType, precipAccumulation, temperatureHigh, temperatureLow } = daily_forecast.data[key]
			const date = new Date(time * 1000)
			const forecast = new Forecast({
				resort_id: resort._id,
				date,
				summary,
				icon,
				precipProbability,
				precipType,
				precipAccumulation,
				temperatureHigh,
				temperatureLow
			})
			await forecast.save()
			console.log('after forecast save')
		}
		//console.log('Updated forecasts for ' + resort.name)
		return resort
	} catch(e) {
		return e
	}
}

const getForecastForResort = async (resort, callback) => {
	darkSkyForecast(resort.lat, resort.lng, async (error, { daily_forecast }) => { 
		if(error){
			callback(error)
		}
		callback(undefined, resort, daily_forecast)
	})
}

const calculateResortSnowForecast = async (resort) => {
	try {
		const forecasts = await Forecast.find( { resort_id: resort._id } ).sort('date')
		console.log('calculating snow forecasts for ' + resort.name)
		var forecastDay = 0
		var precipForecast0_2Day = 0
		var precipForecast3_4Day = 0
		var precipForecast5_6Day = 0
		for(const forecast of forecasts) {
			if(forecast.precipType==="snow"){
				if (forecastDay <= 2) {
					precipForecast0_2Day+=forecast.precipAccumulation
				} else if (forecastDay <= 4){
					precipForecast3_4Day+=forecast.precipAccumulation
				} else {
					precipForecast5_6Day+=forecast.precipAccumulation
				}
			}
			forecastDay = forecastDay + 1
		}
		resort.precipForecast3Day = precipForecast0_2Day.toFixed(1)
		resort.precipForecast5Day = (precipForecast0_2Day + precipForecast3_4Day).toFixed(1)
		resort.precipForecast7Day = (precipForecast0_2Day + precipForecast3_4Day + precipForecast5_6Day).toFixed(1)
		await resort.save()
		console.log('snow forecast calculated')
		//return resort //callback(undefined, 'Snow forecast updated for ' + resort.name + '.')
	} catch(e) {
		return e //callback(e)
	}
	
}

module.exports = {
				getForecastForResort,
				updateResortForecasts,
				calculateResortSnowForecast
				  }