// const Weather = require('../models/weatherModel');
// import fetch from 'node-fetch';


// // Function to fetch weather data from OpenWeatherMap API and save to DB
// const fetchAndSaveWeather = async (location) => {
//   try {
//     const apiKey = process.env.OPENWEATHERMAP_API_KEY;
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.cod !== 200) {
//       throw new Error(data.message);
//     }

//     const newWeather = new Weather({
//       location: location,
//       temperature: data.main.temp,
//       description: data.weather[0].description,
//       date: new Date().toISOString().split('T')[0],
//     });

//     await newWeather.save();
//     return newWeather;

//   } catch (error) {
//     throw new Error(`Failed to fetch and save weather data: ${error.message}`);
//   }
// };

// exports.getWeather = async (req, res) => {
//   const { location } = req.params;
//   const { from, to } = req.query;

//   try {
//     let query = { location: location };
//     if (from && to) {
//       query.date = { $gte: from, $lte: to };
//     }

//     const weatherData = await Weather.find(query);

//     if (weatherData.length === 0) {
//       // If no data in DB, fetch from API and save
//       const newWeatherData = await fetchAndSaveWeather(location);
//       return res.status(200).json([newWeatherData]); // Return as an array
//     }

//     res.status(200).json(weatherData);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Weather = require('../models/weatherModel');
const fetch = require('node-fetch');


const fetchAndSaveWeather = async (location) => {
  console.log("error");
  
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl); // Use node-fetch
    const data = await response.json();
    console.log("error",data)

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const newWeather = new Weather({
      location: location,
      temperature: data.main.temp,
      description: data.weather[0].description,
      date: new Date().toISOString().split('T')[0],
    });

    await newWeather.save();
    return newWeather;

  } catch (error) {
    throw new Error(`Failed to fetch and save weather data: ${error.message}`);
  }
};

exports.getWeather = async (req, res) => {
  const { location } = req.params;
  console.log("location",location)
  const { from, to } = req.query;


  try {
    let query = { location: location };
    if (from && to) {
      query.date = { $gte: from, $lte: to };
    }

    const weatherData = await Weather.find(query);

    if (weatherData.length === 0) {
      // If no data in DB, fetch from API and save
      const newWeatherData = await fetchAndSaveWeather(location);
      return res.status(200).json([newWeatherData]); // Return as an array
    }

    res.status(200).json(weatherData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// // Top of file
// const Weather = require('../models/weatherModel');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const fetchAndSaveWeather = async (location) => {
//   try {
//     const apiKey = process.env.OPENWEATHERMAP_API_KEY;
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.cod !== 200) {
//       throw new Error(data.message);
//     }

//     const newWeather = new Weather({
//       location: location,
//       temperature: data.main.temp,
//       description: data.weather[0].description,
//       date: new Date().toISOString().split('T')[0],
//     });

//     await newWeather.save();
//     return newWeather;

//   } catch (error) {
//     throw new Error(`Failed to fetch and save weather data: ${error.message}`);
//   }
// };