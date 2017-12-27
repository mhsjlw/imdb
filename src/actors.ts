import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

export interface Actor {
  name: string,
  moviesList: Array<string>,
  tvList: Array<string>
};

export default async (id: number): Promise<Actor> => {
  const body = await request('http://www.imdb.com/name/' + id + '/');

  const $ = cheerio.load(body.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,''));
  const name = body.match(/<span class="itemprop" itemprop="name">([a-z0-9_ ]+)<\/span>/i)[1];

  let moviesList: Array<string> = [];
  let tvList: Array<string> = [];
  // $ = cheerio.load(body);

  $("div.filmo-row").each((i, element) => {
    if (element.attribs.id.split("-", 2)[0] == "actor" || element.attribs.id.split("-",2)[0] == "actress") {

      let movie = element.children[0].next.next.next.children[0].children[0].data!;
      let nextWord = element.children[0].next.next.next.children[0].children[0].parent.parent.next.data!;

      if (!(nextWord.length > 1)) {
        moviesList.push(movie);
      } else {
        tvList.push(movie);
      }
    }
  });

  return {
    name,
    moviesList,
    tvList
  }
}
