const mongoose = require('mongoose')
const validator = require('validator')

const forecastSchema = new mongoose.Schema({
		resort_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Resort'
		},
		date: {
			type: Date,
			required: true
		},
		icon: {
			type: String
		},
		summary: {
			type: String
		},
		precipProbability: {
			type: Number
		},
		precipType: {
			type: String
		},
		precipAccumulation: {
			type: Number
		},
		temperatureHigh: {
			type: Number
		},
		temperatureLow: {
			type: Number
		}
	},
	{
		timestamps: true
	}
)

const Forecast = mongoose.model('Forecast', forecastSchema)

module.exports = Forecast