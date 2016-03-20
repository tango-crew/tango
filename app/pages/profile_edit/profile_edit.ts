import {Page, Events, NavParams} from 'ionic-angular';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AmazonS3Service} from '../../services/amazon_s3';
import {UsersService} from '../../services/users';
import {User} from '../../models/user'
import {Camera} from "ionic-native/dist/index";
import {S3SignedUrlPipe} from '../../pipes/s3-signed-url.pipe';

@Page({
  templateUrl: 'build/pages/profile_edit/profile_edit.html',
  pipes: [S3SignedUrlPipe]
})
export class ProfileEditPage {
  image_url:string;
  user:User;

  constructor(private events:Events, private amazonS3Service:AmazonS3Service, private usersService:UsersService, navParams:NavParams) {
    this.user = navParams.get('user');
  }

  private update() {
    return new Promise((resolve, reject) => {
      this.usersService.update(this.user.id, {"user": this.user})
        .subscribe(
          user => {
            resolve(user);
            this.notifyWith(user);
          },
          (err) => {
            reject(err);
            console.error(`error to update user: ${JSON.stringify(err)}`);
          }
        );
    });
  }

  private uploadImageAndSave() {
    this.amazonS3Service.upload(this.image_url)
      .then(
        (res:{ETag: string, Location: string, key: string}) => {
          this.user.remote_profile_image_url = res.Location;

          this.update()
            .then(
              user => this.amazonS3Service.delete(res.key),
              err => console.error('error to update user:', err)
            );
        },
        err => console.error('error to upload image', err)
      );
  }

  private notifyWith(user:User) {
    this.events.publish('user:authenticated', user);
  }

  choosePhoto() {
    Camera.getPicture()
      .then(
        imageData => this.image_url = imageData,
        err => alert(err)
      );
  }

  save() {
    if (this.image_url) {
      this.uploadImageAndSave();
    } else {
      this.update();
    }
  }
}
