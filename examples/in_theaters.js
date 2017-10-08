const imdb = require('../index');

imdb('in_theaters', function(err, data) {
  if(err)
    console.log(err.stack);

  if(data)
    console.log(JSON.stringify(data, null, 2));
});