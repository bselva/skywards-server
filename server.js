var express = require('express');
var bodyParser = require('body-parser');
var tungus = require('tungus');
var mongoose = require('mongoose');
var request = require('request');
var Cards = require('./models/cards');

mongoose.connect('tingodb://'+__dirname+'/skywards');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3333;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Skywards Prime API' }); 
});

var cardsRoute = router.route('/cards');

cardsRoute.post(function(req, res) {
  var card = new Cards();

  card.title = req.body.title;
  card.points = req.body.points;
  card.image = req.body.image;

  cards.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'card added!', data: cards });
  });
});

cardsRoute.get(function(req, res) {

  Cards.find(function(err, cards) {
    if (err)
      res.send(err);

    res.json(cards);
  });
});

var cardRoute = router.route('/cards/:cards_id');

cardRoute.get(function(req, res) {
  Cards.findById(req.params.card_id, function(err, card) {
    if (err)
      res.send(err);

    res.json(card);
  });
});

cardRoute.delete(function(req, res) {
  Cards.findByIdAndRemove(req.params.card_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Card removed' });
  });
});

var momentsRoute = router.route('/moments');

momentsRoute.get(function(req, res) {
  var token = process.env.IONIC_TOKEN;

  var options = {
    "url": "https://api.ionic.io/push/notifications",
    "headers": {
      "Authorization": "Bearer " + token
    },
    "json": true,
    "body": {
      "user_ids": ["6b5edfb7-b1b0-4d36-9774-25aaf74dab0e"],
      "profile": "skywardsprime",
      "notification": {
        "title": "Enjoy a Moment on us",
        "message": "You''re near a Starbucks. Click to enjoy a coffee, courtesy of Skywards Prime"
      }
    }
  };

  request.post(options, function(err, response, body) {
    console.log(body);
    res.json({ message: 'Moment notification was enqueued' });
  });
});

app.use('/api', router);

app.listen(port);
console.log('Running on ' + port);
