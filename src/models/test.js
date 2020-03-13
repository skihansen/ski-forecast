const mongoose = require('mongoose')

const testSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
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
		},
		active: {
			type: Boolean,
			default: false
		},
	},
	{
		timestamps: true,
		// toObject: { getters: true, virtuals: true },
		// toJSON: { getters: true, virtuals: true }
	}
)

const Test = mongoose.model('Test', testSchema)

module.exports = Test