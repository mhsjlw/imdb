const imdb = require('../index');

imdb('tt3659388', function(err, data) {
  if(err)
    console.log(err.stack);

  if(data)
    console.log(data);
});