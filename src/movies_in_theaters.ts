import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

export interface TheatreMovie {
  title: string,
  year: string,
  metascore?: number,
  rating?: string,
  runtime: string,
  genres: Array<string>,
  contentRating?: string,
  poster: string,
  description: string,
  director: string,
  id: string
};

export default async (): Promise<TheatreMovie[]> => {
  const response = await request('http://www.imdb.com/movies-in-theaters/');

  const body = response.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '');
  const $ = cheerio.load(body);

  let header = $('div#main > div.article.listo.nm > h1.header > a').text();

  let movies: Array<TheatreMovie> = [];

  $('div#main > div.article.listo.nm > div.list.detail.sub-list > div.list_item').each(function (this: any, i) {
    var poster = $(this).find('img.poster.shadowed').attr('src')

    var titleElement = $(this).find('.overview-top > h4 > a').text()
    var title = titleElement.replace(/\(\d{4}\)/gi, '').trim()
    var year = titleElement.match(/\(\d{4}\)/gi)![0].replace(/(\(|\))/gi,'')
    var contentRating = $(this).find('.overview-top > p.cert-runtime-genre > img').attr('title') || 'Not Rated'
    var runtime = $(this).find('.overview-top > p.cert-runtime-genre > time').text()

    var genres: Array<string> = [];

    $(this).find('.overview-top > p.cert-runtime-genre > span[itemprop="genre"]').each(function (this: any, i) {
      var genre = $(this).text();
      genres.push(genre);
    });

    var metascore = parseInt($(this).find('.overview-top > div.rating_txt > div.metascore > strong').text().trim());
    var description = $(this).find('.overview-top > div.outline[itemprop="description"]').text().trim();
    var director = $(this).find('.overview-top > div.txt-block > span[itemprop="director"] > span > a').text();
    var ratingElement = $(this).find('.overview-top span.rating-rating span.value')[0];
    var rating = ratingElement ? $(ratingElement).text() : '';

    var id = $(this).find('.overview-top > h4 > a').attr('href').match(/tt\d+/i)![0];


    movies.push({
      title,
      year,
      metascore,
      rating,
      runtime,
      genres,
      contentRating,
      poster,
      description,
      director,
      id
    })
  })


  return movies;
}
