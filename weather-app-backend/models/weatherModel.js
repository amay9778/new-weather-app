// const mongoose = require('mongoose');

// const weatherSchema = new mongoose.Schema({
//   location: String,
//   temperature: Number,
//   description: String,
//   date: String,
// });

// module.exports = mongoose.model('Weather', weatherSchema);


const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
  date: String,
});

module.exports = mongoose.model('Weather', weatherSchema);