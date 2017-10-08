var request = require('request');
var cheerio = require('cheerio');

module.exports = function(id, cb) {
request('http://www.imdb.com/name/' + id + '/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,''));
    var name = body.match(/<span class="itemprop" itemprop="name">([a-z0-9_ ]+)<\/span>/i)[1];
    
    var moviesList = [];
    var tvList = [];
    $ = cheerio.load(body);

    $("div.filmo-row").each(function(i, element) {
      if (element.attribs.id.split("-",2)[0] == "actor" || element.attribs.id.split("-",2)[0] == "actress") {
        var movie = element.children[0].next.next.next.children[0].children[0].data;
        var nextWord = element.children[0].next.next.next.children[0].children[0].parent.parent.next.data;
        if (!(nextWord.length > 1)) {
          moviesList.push(movie);
        } else {
          tvList.push(movie);
        }
      }
    });

    cb(null, {
      name: name || "N/A",
      moviesList: moviesList || "N/A",
      tvList: tvList || "N/A"
    });
  } else {
    cb(new Error('IMDB Failed to respond, or responded with error code'), null);
  }
  });
}