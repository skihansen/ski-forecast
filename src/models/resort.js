const mongoose = require('mongoose')
const Forecast = require('./forecast')

const resortSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	city: {
		type: String,
		trim: true
	},
	state: {
		type: String,
		trim: true
	},
	peak_elevation: {
		type: Number
	},
	base_elevation: {
		type: Number
	},
	vertical_drop: {
		type: Number
	},
	acres: {
		type: Number
	},
	trails: {
		type: Number
	},
	lifts: {
		type: Number
	},
	annual_snowfall: {
		type: Number
	},
	precipForecast3Day: {
		type: Number
	},
	precipForecast5Day: {
		type: Number
	},
	precipForecast7Day: {
		type: Number
	},
	lat: {
		type: Number,
		required: true,
		trim: true
	},
	lng: {
		type: Number,
		required: true,
		trim: true
	}
},
{
	timestamps: true,
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true }
})

resortSchema.virtual('forecasts', {
	ref: 'Forecast',
	localField: '_id',
	foreignField: 'resort_id'
})

resortSchema.pre('find', function (next) {
    this.populate('forecasts');
    next();
});

const Resort = mongoose.model('Resort',resortSchema)

module.exports = Resort