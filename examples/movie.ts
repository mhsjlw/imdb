import { movies } from '../';

movies('tt3659388')
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  })
