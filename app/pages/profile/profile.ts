import {Page, Storage, LocalStorage} from 'ionic-framework/ionic';
import {Camera} from 'ionic-native';
import {User} from '../../models/user';

@Page({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  user: User;

  constructor() {
    this.initialize();
  }

  initialize() {
    new Storage(LocalStorage)
      .get('user')
      .then((user) => this.user = Object.assign(new User(), JSON.parse(user)));
  }

  choosePhoto() {
    Camera.getPicture().then(
      imageData => this.user.image_url = imageData,
      err => alert(err)
    );
  }
}
