import {Page, Storage, LocalStorage, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {User} from '../../models/user';
import {ProfileEditPage} from '../profile_edit/profile_edit';
import {AmazonS3Service} from '../../services/amazon_s3';
import {S3SignedUrlPipe} from '../../pipes/s3-signed-url.pipe';

@Page({
  templateUrl: 'build/pages/profile/profile.html',
  pipes: [S3SignedUrlPipe]
})
export class ProfilePage {
  user:User;

  constructor(private navController:NavController) {
    new Storage(LocalStorage)
      .get('user')
      .then(user => {
        this.user = Object.assign(new User(), JSON.parse(user));
      });
  }

  edit() {
    this.navController.push(ProfileEditPage, {user: this.user});
  }
}
