import {Page, Storage, LocalStorage} from 'ionic/ionic';
import {User} from './../models/user'

@Page({
  templateUrl: 'app/profile/profile.html'
})
export class ProfilePage {
  constructor() {
    new Storage(LocalStorage)
      .get('user')
      .then((user) => this.user = Object.assign(new User(), JSON.parse(user)));
  }
}
