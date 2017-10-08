imdb ![npm](https://img.shields.io/npm/v/imdb.svg) ![downloads](https://img.shields.io/npm/dt/imdb.svg)
====

An IMDB API for getting information on your favourite movies!

## Installing
Install via [npm](https://npmjs.com)

    $ npm install --save imdb

## Running
To run the example:

    $ npm install
    $ node examples/movie.js
    
## Usage

Provide the IMDB ID and go! Also see the `examples/` folder for inspiration!

```javascript
const imdb = require('imdb');

imdb('tt3659388', (err, data) => {
  if (err)
    console.log(err.stack);

  if (data)
    console.log(data);
});
```

This will return an object similar to this:

```javascript
{ title: 'The Martian',
  originalTitle: 'N/A',  year: '2015',  contentRating: 'PG',
  runtime: '2h 24min',  description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
  rating: '8.0',
  poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
  genre: [ 'Adventure', ' Drama', ' Sci-Fi' ],
  director: 'Ridley Scott',
  metascore: '80',
  writer: 'Drew Goddard',
  language: 'English, Mandarin',
  actors:
   [ 'Matt Damon',
     ...
     'Shu Chen' ] }
```
