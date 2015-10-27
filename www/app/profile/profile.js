import {Page, NavController} from 'ionic/ionic';
import {FacebookIntegrationService} from './../facebookIntegrationService.js'

@Page({
  templateUrl: 'app/profile/profile.html'
})
export class ProfilePage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.fbService = new FacebookIntegrationService();
    this.user = {name: ''};
    this.initialize();
  }

  initialize() {
    let self = this;

    self.fbService.api({
      path: '/me',
      params: {fields: 'id,name,email'}
    }).then(
      function (user) {
        self.user = user;
      },
      function (error) {
        alert('Facebook error: ' + error.error_description);
      }
    );
  }
}
