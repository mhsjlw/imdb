IMDb
====

An IMDb interface in JavaScript

```javascript
const IMDb = require('../')

async function example() {
  let i = new IMDb()
  let movie = await i.getMovie('tt3501632')
  return movie
}

example()
  .then((movie) => console.log(movie.getTitle())) // Thor: Ragnarok (2017)
  .catch((e) => console.error(e))
```
