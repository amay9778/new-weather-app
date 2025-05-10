const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController.js');

router.get('/weather/:location', weatherController.getWeather);

module.exports = router;