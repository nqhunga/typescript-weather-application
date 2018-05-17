const express = require('express');
const path = require('path');
const app = express();
const request = require('request-promise');
const port = process.env.PORT || 3000;
const WEATHER_SEARCH_URL = 'http://api.apixu.com/v1/search.json?';
const WEATHER_FORECAST_URL = 'http://api.apixu.com/v1/forecast.json?';
require('dotenv').load();
const GOOGLE_ID_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.get('/forecast/:cityName', (req, res) => {
  request(`${WEATHER_FORECAST_URL}key=${process.env.SECRET_KEY}&q=${req.params.cityName}&days=7`)
    .then(result => {
      const data = JSON.parse(result);
      res.send(data);
    });

});
app.get('/check/:cityName', (req, res) => {
  request(`${WEATHER_SEARCH_URL}key=${process.env.SECRET_KEY}&q=${req.params.cityName}&lang=en`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
});
app.get('/current/:lat/:lng', (req, res) => {
  request(`${WEATHER_FORECAST_URL}key=${process.env.SECRET_KEY}&q=${req.params.lat},${req.params.lng}`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
});
app.get('/googleid/:lat/:lng', (req, res) => {
  request(`${GOOGLE_ID_URL}location=${req.params.lat},${req.params.lng}&radius=1500&key=${process.env.GOOGLE_KEY}`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
});

app.listen(port, () => console.log('Example app listening on port', port, '! '));