var express = require('express'),
app = express(),
games = require('./games.js'),
bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/games', games.findGame);
app.put('/games/1', games.updateGame);

app.listen(process.env.PORT || 3001, function() {
  console.log('Server has started on PORT 3001');
});
