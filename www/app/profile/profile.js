import {Page, NavController, NavParams, Events} from 'ionic/ionic';

@Page({
  templateUrl: 'app/profile/profile.html'
})
export class ProfilePage {
  constructor(nav: NavController, params: NavParams, events: Events) {
    this.nav = nav;
    this.events = events;
    this.user = params.get('user');
  }
}
