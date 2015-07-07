var mongo = require('mongodb');
// Require mongodb module

var Server = mongo.Server;
// Fetch mongo server object

var Db = mongo.Db;
// Fetch mongo database object

var server = new Server('localhost', 27017, {auto_reconnect:true});
// Create an instance of a mongo server object that reads on localhost:27017, which
// autoreconnects if the server connection is lost.

var db = new Db('gamesdb', server);
// Create an instance of a mongo db object, call is notes, and open it using the server object.


// Open the notes db connection to the server with a callback that asks if there's an error
// If there's no error, console log a success message, then check to see if that particular db exists.
// If that db exists, then move on. else create a new database named notes and populate it with some data

// If there's an error, say that the connection is down, or couldn't connect.
db.open(function(err, db) {
  if(!err) {
    console.log('connection to the database is a go');
    db.collection('games', {strict:true}, function(err, collection) {
      if(err) {
        console.log('Couldnt find the db, lets create it and populate it with data');
        populateDb();
      }
    });
  }
});

exports.findGame = function(request, response) {
  db.collection('games', function(err, collection) {
    collection.find().toArray(function(err, items) {
      response.send(items[0]);
    });
  });
};

exports.updateGame = function(request, response) {
  var game = request.body;
  console.log(JSON.stringify(game));
  db.collection('games', function(err, collection) {
    collection.update({'id':1}, game, {safe:true}, function(err, result) {
      if(err) {
        console.log('theres been an error updating game: ' + err);
        response.send({'error':'theres been an error'});
      } else {
        console.log('' + result + 'documents updated');
        response.send(game);
      }
    });
  });
}

var populateDb = function() {
  var games = [
    {
        id:1,
        currentPlayer:'black',
        playingField:[
                        [{coord: [0, 0], color: ""}, {coord: [0, 1], color: ""}, {coord: [0, 2], color: ""}, {coord: [0, 3], color: ""}],
                        [{coord: [1, 0], color: ""}, {coord: [1, 1], color: "white"}, {coord: [1, 2], color: "black"}, {coord: [1, 3], color: ""}],
                        [{coord: [2, 0], color: ""}, {coord: [2, 1], color: "black"}, {coord: [2, 2], color: "white"}, {coord: [2, 3], color: ""}],
                        [{coord: [3, 0], color: ""}, {coord: [3, 1], color: ""}, {coord: [3, 2], color: ""}, {coord: [3, 3], color: ""}]
                      ]
    }];

    db.collection('games', function(err, collection) {
        collection.insert(games, {safe:true}, function(err, result) {
          if(err) {
            console.log(err)
          }
        });
    });

};
