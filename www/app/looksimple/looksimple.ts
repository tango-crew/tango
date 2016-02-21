import {Page, NavController, ViewController} from 'ionic/ionic';
import {ProfileHairDresser} from '../profilehairdresser/profilehairdresser';

@Page({
  templateUrl:'app/looksimple/looksimple.html',
})
export class LookSimple {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  showProfile(){
      this.nav.push(ProfileHairDresser);
  }

}
