import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';

@Page({
  templateUrl: 'app/profile/profile.html'
})
export class ProfilePage {
  constructor(nav: NavController) {
    let self = this;
    this.nav = nav;
    new Storage(LocalStorage)
      .get('user')
      .then((user) => self.user = JSON.parse(user));
  }
}
