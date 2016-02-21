import {Page, NavController, ViewController} from 'ionic/ionic';
import {ProfileHairDresser} from '../profilehairdresser/profilehairdresser';

@Page({
  templateUrl:'app/look/look.html',
})
export class Look {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  showProfile(){
      this.nav.push(ProfileHairDresser);
  }

}
