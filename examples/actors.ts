import { actors } from '../';

actors('nm0933988')
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  })
