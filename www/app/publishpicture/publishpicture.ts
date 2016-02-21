import {Page, NavController, ViewController} from 'ionic/ionic';
import {TimelineHairDresser} from '../timelinehairdresser/timelinehairdresser';

@Page({
  templateUrl:'app/publishpicture/publishpicture.html',
})
export class PublishPicture {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  publishPicture(){
      this.nav.push(TimelineHairDresser);
  }

}
