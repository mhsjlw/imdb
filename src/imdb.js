var movies = require('./movies');
var actors = require('./actors');
var inTheaters = require('./in_theaters');
var showtimes = require('./showtimes');

module.exports = function(id, cb) {
  if(id.match(/tt\d+/i)) {
    // it's a movie
    movies(id, function(err, data) {
      cb(err, data);
    });
  } else if(id.match(/nm\d+/i)) {
    // it's an actor
    actors(id, function(err, data) {
      cb(err, data);
    });
  } else if(id.match(/in_theaters/gi)) {
    inTheaters(function(err, data) {
      cb(err, data);
    })
  } else if(id.match(/\d{5}/i)) {
    showtimes(id, function(err, data) {
      cb(err, data);
    })
  } else {
    // it's not a valid ID
    cb(new Error('The ID provided isn\'t valid!'), null);
  }
}