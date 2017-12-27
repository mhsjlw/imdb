// import * as request from 'request-promise-native';
// import * as cheerio from 'cheerio';
//
// export interface DistanceBy {
//   [index: string]: Array<Theater>
// }
//
// export interface Theater {
//   theater: string,
//   movies: Array<Movie>
// }
//
// export interface Movie {
//   image: string,
//   title: string,
//   runtime: string,
//   rating: string,
//   showtimes: Array<string>
// }
//
// export default async (zip: string): Promise<DistanceBy> => {
//   const response = await request('http://www.imdb.com/showtimes/US/' + zip + '/');
//
//   const body = response.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '');
//   const $ = cheerio.load(body);
//
//   var showtimes: Array<string> = [];
//   var currentDistance: string;
//   var distanceObj: string;
//   var theaterObj: Theater;
//
//   $('#cinemas-at-list').children().each(function (this: any, i, elm) {
//     if($(this).is('h4')) {
//
//     	if(distanceObj != undefined) {
//     		distanceObj[currentDistance].push(theaterObj)
//     		showtimes.push(distanceObj)
//     	}
//
//     	currentDistance = $(this).text().substring(0, $(this).text().indexOf('miles') + 5)
//     	distanceObj = {}
//     	distanceObj[currentDistance] = []
//
//     } else {
//     	$(this).children().each(function (this: any, i, elm) {
//     		if($(this).hasClass('fav_box')) {
//
//     			if(theaterObj != undefined) {
//     				distanceObj[currentDistance].push(theaterObj)
//     			}
//
//     			theaterName = $(this).find('h3').first().text().trim()
//     			theaterObj = { theater: theaterName, movies: []}
//
//     		} else if($(this).hasClass('list_item')) {
//     			// get showtimes
//     			var movie = {
//     				image:   $(this).find('img').attr('src'),
//     				title:   $(this).find('.info').find('h4').text().trim().replace(/\s\(\d+\)/i, ''),
//     				runtime: $(this).find('.info').find('time').text().trim(),
//     				rating:  $(this).find('.info').find('[itemprop="contentRating"] > img').attr('title'),
//     				showtimes: []
//     			}
//
//     			var ampm
//     			var addAmPm = function(arr, time) {
//     				if(time.indexOf('am') > 0 || time.indexOf('pm') > 0) {
// 						ampm = time.match(/(am|pm)/gi)[0]
// 						arr.push(time)
// 					} else {
// 						arr.push(time + ' ' + ampm)
// 					}
// 					return arr
//     			}
//
//     			if($($($(this).find('.info .showtimes')).children()[0]).is('div')) {
//     				$(this).find('.info .showtimes').children().each(function(this: any, i, elm) {
//       				if($(this).is('a')) {
//       					var time = $(this).text().trim()
//       					movie.showtimes = addAmPm(movie.showtimes, time)
//       				}
//       			})
//     			} else {
//     				var showtimes = $(this).find('.info .showtimes').text().replace(/\s/g, '').split('|')
//     				movie.showtimes = showtimes.reduce(addAmPm, [])
//     			}
//
//     			theaterObj.movies.push(movie)
//     		}
//     	})
//     }
//   })
//
//   distanceObj[currentDistance].push(theaterObj)
//   showtimes.push(distanceObj)
//
//   return showtimes;
// }
