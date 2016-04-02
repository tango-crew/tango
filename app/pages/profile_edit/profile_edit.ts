import {Platform, Page, Events, NavParams, NavController, ActionSheet} from 'ionic-angular';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AmazonS3Service} from '../../services/amazon_s3';
import {UsersService} from '../../services/users';
import {User} from '../../models/user'
import {Camera} from "ionic-native";
import {S3SignedUrlPipe} from '../../pipes/s3-signed-url.pipe';

@Page({
  templateUrl: 'build/pages/profile_edit/profile_edit.html',
  pipes: [S3SignedUrlPipe]
})
export class ProfileEditPage {
  image_url:string;
  user:User;

  constructor(private events:Events,
              private amazonS3Service:AmazonS3Service,
              private usersService:UsersService,
              private navController:NavController,
              private platform:Platform,
              navParams:NavParams) {
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
    this.events.publish('spinner', true);
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

  private choosePhotoBy(sourceType) {
    Camera.getPicture({
        quality: 100,
        sourceType: sourceType
    })
      .then(
        imageURI => {
          plugins.crop.promise(imageURI, {quality: 100})
            .then(
              newPath => {
                this.image_url = newPath;
                if (sourceType === 1) Camera.cleanup();
              },
              err =>  {
                this.image_url = imageURI;
                console.error(err);
                if (sourceType === 1) Camera.cleanup();
              }
            );
        },
        err => console.error(err)
      );
  }

  openMenu() {
    this.navController.present(ActionSheet.create({
      title: 'Escolha a Foto',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => this.choosePhotoBy(1)
        },
        {
          text: 'Album',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => this.choosePhotoBy(2)
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => console.log('Cancel clicked')
        }
      ]
    }));
  }

  save() {
    if (this.image_url) {
      this.uploadImageAndSave();
    } else {
      this.update();
    }
  }
}
