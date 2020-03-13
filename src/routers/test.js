const express = require('express')
const Test = require('../models/test')

const router = express.Router()

router.get('/tests', async (req, res) => {
	try {
		const tests = await Test.find()
		res.render('tests/index', {
			title: "Tests",
			tests
		})
		// res.send(tests)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.get('/tests/:id', async (req, res) => {
	try {
		const test = await Test.findById(req.params.id)
		res.render('tests/show', {
			title: "Test",
			test
		})
	} catch(e) {
		res.status(400).send(e)
	}
})

router.get('/tests/:id/edit', async (req, res) => {
	try {
		const test = await Test.findById(req.params.id)
		res.render('tests/edit', {
			title: "Test",
			test
		})
	} catch(e) {
		res.status(400).send(e)
	}
})

router.post('/tests', async (req, res) => {
	try {
		const test = new Test(req.body)
		await test.save()
		res.send(test)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.patch('/tests/:id', async (req, res) => {
	res.send('made it to patch')
	try {
		const test = await Test.findByIdAndUpdate(req.params.id, req.body)
		res.send(test)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.delete('/tests/:id', async (req, res) => {
	try {
		// const test = await Test.findByIdAndDelete(req.params.id)
		res.send('deleted')
	} catch(e) {
		res.status(400).send(e)
	}
})

module.exports = router