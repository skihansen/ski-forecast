const path = require('path')
const csv = require('csvtojson')
const Resort = require('../models/resort')
const publicDirectory = path.join(__dirname, '../../public')

const loadResortsFromCsv = async (csvFilename) => {
	const csvFilePath=path.join(publicDirectory, csvFilename)
	console.log(csvFilePath)
	try {
			const jsonArray = await csv({
				colParser:{
			        "f1":"omit",
			        "f2":"omit",
			        "name":"string",
			        "city":"string",
			        "state":"string",
			        "peak_elevation":"number",
			        "base_elevation":"number",
			        "vertical_drop":"number",
			        "acres":"number",
			        "trails":"number",
			        "lifts":"number",
			        "annual_snowfall":"number",
			        "ticket_price":"omit",
			        "date_accessed":"omit",
			        "geocode":"omit",
			        "lat":"number",
			        "lng":"number"
			    },
			    checkType:true
			}).fromFile(csvFilePath);
			for (const jsonElement of jsonArray) {
			    const resort = new Resort(jsonElement)
				await resort.save() 
			}
		} catch(e) {
			console.log(e)
		}
}

module.exports = {
	loadResortsFromCsv
}