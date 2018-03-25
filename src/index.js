const Movie = require('./movie')

class IMDb {
  constructor(endpoint = 'https://www.imdb.com') {
    this.endpoint = endpoint
  }

  async getMovie(id) {
    return (new Movie(id)).get(this.endpoint)
  }
}

module.exports = IMDb
