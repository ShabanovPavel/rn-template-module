const express = require('express');
const bodyParser = require('body-parser');
const core = require('./core');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/getStory', async (req, res) => {
	// if (!req.body) return res.sendStatus(400);
	const id = req.query.idStory;
	try {
		res.json(core.getInfoStory(id));
	} catch (e) {
		res.json({status: 'Error'});
	}
});

app.get('/getStoryList', async (req, res) => {
	try {
		res.json(core.getInfoListStory());
	} catch (e) {
		res.json({status: 'Error'});
	}
});

app.listen(3000, async (req, res) => {
	console.log('Example app listening on port 3000!');
});
