 'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const APIkey = '044adacd647cf5d3e2d6113d473366ea';
const host = 'api.openweathermap.org';

const restService = express();

function callWeatherApi (city, date) {
    return new Promise((resolve, reject) => {
      // Create the path for the HTTP request to get the weather
      //let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
        //'&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
     
     let path= '/data/2.5/weather?q=London&APIkey=044adacd647cf5d3e2d6113d473366ea&units=metric';

      // Make the HTTP request to get the weather
     
          // Create response
          let output = `Current temp `;
          
         
          // Resolve the promise with the output text
          resolve(output);
       
       
     
    });
}

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.post('/weatherinfo', (req, res) => {
    // Get the city and date from the request
    let city = req.body.result.parameters['city']; // city is a required param
    // Get the date for the weather forecast (if present)
    let date = req.body.result.parameters['date'];
    // Call the weather API
    callWeatherApi(city, date).then((output) => {
        // Return the results of the weather API to Dialogflow
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    }).catch((error) => {
        // If there is an error let the user know
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    });


});


restService.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: ' + (process.env.PORT || 8000));
});

