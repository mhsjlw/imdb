import { moviesInTheaters } from '../';

moviesInTheaters()
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  })
