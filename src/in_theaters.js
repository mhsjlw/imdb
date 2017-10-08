var request = require('request')
var cheerio = require('cheerio')

module.exports = function (cb) {
  request('http://www.imdb.com/movies-in-theaters/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '')
      $ = cheerio.load(body)

      var header = $('div#main > div.article.listo.nm > h1.header > a').text()

      var movies = [];

      $('div#main > div.article.listo.nm > div.list.detail.sub-list > div.list_item').each(function (i, elm) {
      	var poster = $(this).find('img.poster.shadowed').attr('src') || 'N/A'

      	var titleElement = $(this).find('.overview-top > h4 > a').text()
      	var title = titleElement.replace(/\(\d{4}\)/gi,'').trim() || 'N/A'
      	var year = titleElement.match(/\(\d{4}\)/gi,'')[0].replace(/(\(|\))/gi,'') || 'N/A'
      	var contentRating = $(this).find('.overview-top > p.cert-runtime-genre > img').attr('title') || 'Not Rated'
      	var runtime = $(this).find('.overview-top > p.cert-runtime-genre > time').text() || 'N/A'
      	
      	var genres = []
      	$(this).find('.overview-top > p.cert-runtime-genre > span[itemprop="genre"]').each(function (i, elm) {
      		var genre = $(this).text() || 'N/A'
      		genres.push(genre)
      	})

      	var metascore = $(this).find('.overview-top > div.rating_txt > div.metascore > strong').text() || 'N/A'
      	var description = $(this).find('.overview-top > div.outline[itemprop="description"]').text().trim() || 'N/A'
      	var director = $(this).find('.overview-top > div.txt-block > span[itemprop="director"] > span > a').text() || 'N/A'
      	var ratingElement = $(this).find('.overview-top span.rating-rating span.value')[0];
      	var rating = ratingElement ? $(ratingElement).text() : 'N/A'

      	var imdbId = $(this).find('.overview-top > h4 > a').attr('href').match(/tt\d+/i)[0] || 'N/A'


      	movies.push({
      		title: title,
      		year: year,
      		metascore: metascore,
      		rating: rating,
      		runtime: runtime,
      		genre: genres,
      		contentRating: contentRating,
      		poster: poster,
      		description: description,
      		director: director,
      		imdbId: imdbId
      	})
      })


      cb(null, {
      	movies: movies
      })

  	} else {
      cb(new Error('IMDB Failed to respond, or responded with error code'), null)
    }
  })
}