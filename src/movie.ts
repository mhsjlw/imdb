import * as cheerio from 'cheerio'
import request from 'request-promise-native'

export default class Movie {
  id: string
  title?: string
  originalTitle?: string
  poster?: string
  contentRating?: string
  year?: string
  runtime?: string
  description?: string
  rating?: number
  ratingCount?: number
  director?: string
  metascore?: number
  writer?: string
  cast?: Array<string>

  constructor(id: string) {
    this.id = id
  }

  async get(endpoint: string): Promise<Movie> {
    let r = await request(`${endpoint}/title/${this.id}/`)
    const $ = cheerio.load(r)

    const plotSummaryWrapper = $('#title-overview-widget > div.plot_summary_wrapper')
    const vital = $('#title-overview-widget > div.vital')

    const titleBlock = vital.find('div.title_block')
    const titleBar = titleBlock.find('div > div.titleBar')
    const titleWrapper = titleBar.find('div.title_wrapper')
    const plotSummary = plotSummaryWrapper.find('div.plot_summary')

    this.title = titleWrapper.find('h1').text().trim()

    let maybeOriginalTitle = titleWrapper.find('div.originalTitle').text().trim();
    this.originalTitle = maybeOriginalTitle != '' ? maybeOriginalTitle.replace(/\(original title\)/g, '') : undefined;

    let poster = vital.find('div.slate_wrapper > div.poster > a > img').attr('src')
    if(poster != undefined) { this.poster = poster.trim() } else { this.poster = undefined }

    let contentRating = titleWrapper.find('div > meta').attr('content')
    if(contentRating != undefined) { this.contentRating = contentRating.trim() } else { this.contentRating = undefined }

    this.year = $('#titleYear > a').text().trim()
    this.runtime = titleWrapper.find('div > time').text().trim()
    this.description = plotSummary.find('div.summary_text').text().trim()
    this.rating = parseInt(titleBlock.find('div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span').text().trim())
    this.ratingCount = parseInt(titleBlock.find('div.ratings_wrapper > div.imdbRating > a > span').text().replace(/,/g,''))
    this.director = plotSummary.find('div:nth-child(2) > span > a > span').text().trim()
    this.metascore = parseInt(plotSummaryWrapper.find('div.titleReviewBar > div:nth-child(1) > a > div > span').text().trim())
    this.writer = plotSummary.find('div:nth-child(3) > span:nth-child(2) > a > span').text().trim()

    let cast: Array<string> = [ ];
    let castElements = $('div#main_bottom > div#titleCast > table.cast_list  tr > td.itemprop > a > span')
    castElements.each(function(this: any) { cast.push($(this).text().trim()) })
    this.cast = cast

    return this
  }

  getTitle() {
    return this.title
  }

  getOriginalTitle() {
    return this.originalTitle
  }

  getYear() {
    return this.year
  }

  getContentRating() {
    return this.contentRating
  }

  getRuntime() {
    return this.runtime
  }

  getDescription() {
    return this.description
  }

  getRating() {
    return this.rating
  }

  getRatingCount() {
    return this.ratingCount
  }

  getPoster() {
    return this.poster
  }

  getDirector() {
    return this.director
  }

  getMetascore() {
    return this.metascore
  }

  getWriter() {
    return this.writer
  }

  getCast() {
    return this.cast
  }
}