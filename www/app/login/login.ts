import {Page, NavController, ViewController} from 'ionic/ionic';
import {ChooseProfile} from '../chooseprofile/chooseprofile';
import {TabsPage} from '../tabs/tabs';
import {TimelineHairDresser} from '../timelinehairdresser/timelinehairdresser';

@Page({
  templateUrl:'app/login/login.html'
})
export class Login {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  signIn(){
    this.nav.push(TimelineHairDresser);
  }

  signUp(){
    this.nav.push(TimelineHairDresser);
  }

}
