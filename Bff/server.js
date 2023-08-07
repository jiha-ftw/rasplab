const express = require('express');
const cors = require('cors');
const { getWeatherData } = require('./weather-data');

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'https://weather.ftwconsulting.se/']
}));

app.get("/api/weather", (req, res) => res.json(getWeatherData()));

app.listen(process.env.PORT || 4000, () => { console.log('server started....port: 4000') });