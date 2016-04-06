var express = require('express');
var tungus = require('tungus');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
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

app.use('/api', router);

app.listen(port);
console.log('Running on ' + port);