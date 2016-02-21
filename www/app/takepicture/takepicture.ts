import {Page, NavController, ViewController} from 'ionic/ionic';
import {PublishPicture} from '../publishpicture/publishpicture';

@Page({
  templateUrl:'app/takepicture/takepicture.html',
})
export class TakePicture {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  publishPicture(){    
      this.nav.push(PublishPicture);
  }

}
