/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { IMDb, Movie } from '../src'

describe('Movie', async () => {
  // IMDb loading times
  jest.setTimeout(10000)

  let movie: Movie

  beforeAll(async () => {
    movie = await (new IMDb()).getMovie('tt3659388')
  })

  it('has a title', () => {
    expect(movie.getTitle()).toBe('The Martian (2015)')
  })

  it('may have an original title', () => {
    expect(movie.getOriginalTitle()).toBeUndefined()
  })

  it('has a year', () => {
    expect(movie.getYear()).toBe('2015')
  })

  it('has a content rating', () => {
    expect(movie.getContentRating()).toBe('PG')
  })

  it('has runtime', () => {
    expect(movie.getRuntime()).toBe('2h 24min')
  })

  it('has description', () => {
    expect(movie.getDescription()).toBeDefined()
  })

  it('has rating', () => {
    expect(movie.getRating()).toBe(8)
  })

  it('has ratingCount', () => {
    expect(movie.getRatingCount()).toBeDefined()
  })

  it('has poster', () => {
    expect(movie.getPoster()).toBeDefined()
  })

  it('has director', () => {
    expect(movie.getDirector()).toBe('Ridley Scott')
  })

  it('has metascore', () => {
    expect(movie.getMetascore()).toBe(80)
  })

  it('has writer', () => {
    expect(movie.getWriter()).toBe('Drew Goddard')
  })

  it('has cast', () => {
    expect(movie.getCast()).toBeDefined()
  })
})
