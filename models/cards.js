var tungus = require('tungus');
var mongoose = require('mongoose');

var CardsSchema   = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  points: Number
});

module.exports = mongoose.model('Card', CardsSchema);