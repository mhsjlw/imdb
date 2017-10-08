const imdb = require('../index');

imdb('nm0933988', function(err, data) {
  if(err)
    console.log(err.stack);

  if(data)
    console.log(data);
});