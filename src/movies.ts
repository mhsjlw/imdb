import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

export interface Movie {
  title: string,
  originalTitle: string,
  year: string,
  contentRating: string,
  runtime: string,
  description: string,
  rating: string,
  poster: string,
  genre: Array<string>,
  director: string,
  metascore: string,
  writer: string,
  language: string,
  actors: Array<string>
}

export default async (id: number): Promise<Movie> => {
  const response = await request('http://akas.imdb.com/title/' + id + '/');
  const body = response.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '')
  const $ = cheerio.load(body);;

  var title = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1').text().replace(/\(\d+\)/g, '').trim()
  var originalTitle = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div.originalTitle').text().replace(/\(\d+\)/g, '').trim()
  originalTitle = originalTitle.replace(/\(original title\)/g, '').trim();
  var year = $('#titleYear > a').text()
  var contentRating = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > meta').attr('content')
  var runtime = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > time').text().trim()
  var description = $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div.summary_text').text().trim()
  var rating = $('#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span').text()
  var poster = $('#title-overview-widget > div.vital > div.slate_wrapper > div.poster > a > img').attr('src')
  var director = $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(2) > span > a > span').text()
  var metascore = $('#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(1) > a > div > span').text()
  var writer = $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(3) > span:nth-child(2) > a > span').text()
  var languageArray = $('#titleDetails > div:nth-child(5) > a')
  var language = ''
  var actors: Array<string> = [];
  $('div#main_bottom > div#titleCast > table.cast_list  tr > td.itemprop > a > span').each(function (this: any) {
    actors.push($(this).text());
  });

  if (languageArray.length === 1) {
    language = $(languageArray[0]).text()
  } else {
    for (var i = 0; i < languageArray.length; i++) {
      if (i < languageArray.length - 1) {
        language += $(languageArray[i]).text() + ', '
      } else {
        language += $(languageArray[i]).text()
      }
    }
  }

  if ($('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div').text().split('|')[2] != null) {
    var genre = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div').text().split('|')[2].split(',')
  } else {
    var genre = new Array<string>(); // I need fix this! If you need this feature for unreleased movies, please create an issue and I'll make it my priority
  }

  if (description === '') {
    description = $('#title-overview-widget > div.minPosterWithPlotSummaryHeight > div.plot_summary_wrapper > div.plot_summary.minPlotHeightWithPoster > div.summary_text').text().trim()
  }

  if (poster === null) {
    poster = $('#title-overview-widget > div.minPosterWithPlotSummaryHeight > div.poster > a > img').attr('src')
  }

  if (director === '') {
    director = $('#title-overview-widget > div.minPosterWithPlotSummaryHeight > div.plot_summary_wrapper > div.plot_summary.minPlotHeightWithPoster > div:nth-child(2) > span > a > span').text()
  }

  if (writer === '') {
    writer = $('#title-overview-widget > div.minPosterWithPlotSummaryHeight > div.plot_summary_wrapper > div.plot_summary.minPlotHeightWithPoster > div:nth-child(3) > span:nth-child(2) > a > span').text()
  }

  return {
    title,
    originalTitle,
    year,
    contentRating,
    runtime,
    description,
    rating,
    poster,
    genre,
    director,
    metascore,
    writer,
    language,
    actors
  }
}
