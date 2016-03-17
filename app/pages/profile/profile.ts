import {Page, Storage, LocalStorage, NavController} from 'ionic-framework/ionic';
import {Camera} from 'ionic-native';
import {User} from '../../models/user';
import {ProfileEditPage} from '../profile_edit/profile_edit';
import {AmazonS3Service} from '../../services/amazon_s3';

@Page({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  user:User;
  image_url:string;

  constructor(private navController:NavController, private amazonS3Service:AmazonS3Service) {
    new Storage(LocalStorage)
      .get('user')
      .then(user => {
        this.user = Object.assign(new User(), JSON.parse(user));
        this.image_url = amazonS3Service.getSignedImageUrl(this.user.profile_image_id);
      });
  }

  edit() {
    this.navController.push(ProfileEditPage, {user: this.user});
  }
}
