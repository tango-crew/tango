import {Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  templateUrl: 'app/profile/profile.html'
})
export class ProfilePage {
  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.user = params.get('user');
  }
}
