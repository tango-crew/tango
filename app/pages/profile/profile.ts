import {Page, Storage, LocalStorage} from 'ionic-framework/ionic';
import {OnInit} from 'angular2/core';
import {User} from '../../models/user'

@Page({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage implements OnInit {
  user: User;

  ngOnInit() {
    new Storage(LocalStorage)
      .get('user')
      .then((user) => this.user = Object.assign(new User(), JSON.parse(user)));
  }
}
