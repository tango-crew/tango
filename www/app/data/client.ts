import {Injectable} from "angular2/angular2";
@Injectable()
export class Clients {
  constructor() {
    this.looks  = [{
    id: 0,
    name: 'Penelope Cruz',
    description: 'This hair was cut with tesouras japanese and it was cut by Johan Bach',
    picture: 'http://media1.popsugar-assets.com/files/2012/12/51/4/192/1922398/40c6e6924a9240cd_penelopecruz.xxxlarge_2/i/Penelope-Cruz.jpg',
    typeoflook: 'simple'

  }, {
    id: 1,
    name: 'Kristen Stewart',
    description: 'This hair was cut with tesouras japanese and it was cut by Johan Bach',
    picture: 'http://www.trbimg.com/img-55248585/turbine/la-ar-kristen-stewart-fashion-news-20150407',
    typeoflook: 'hairdresser'
  }, {
    id: 2,
    name: 'Gisele Bundchen',
    description: 'This hair was cut with tesouras japanese and it was cut by Johan Bach',
    picture: 'http://images.askmen.com/photos/gisele-bundchen/gisele-bundchen-94785.jpg',
    typeoflook: 'hairdresser'
  }];
  }

  all(){
    return this.looks
  }

  remove(look){
     this.looks.splice(this.looks.indexOf(look), 1);
  }
}
