import {Page, NavController} from 'ionic/ionic';
import {FacebookIntegrationService} from './../facebookIntegrationService.js'
import {ProfilePage} from './../profile/profile'

@Page({
  templateUrl: 'app/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.fbService = new FacebookIntegrationService();
  }

  fbLogin() {
    let self = this;
    this.fbService.login({scope: 'email,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          self.nav.setRoot(ProfilePage);
        } else {
          alert('Facebook login failed');
        }
      }
    );
  }
}
