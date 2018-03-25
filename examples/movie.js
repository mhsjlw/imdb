const IMDb = require('../')

async function example() {
  let i = new IMDb()
  let movie = await i.getMovie('tt3501632') // Thor: Ragnarok
  return movie
}

example()
  .then((movie) => console.log(movie.getTitle()))
  .catch((e) => console.error(e))
