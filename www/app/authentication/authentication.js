import {Page, Events} from 'ionic/ionic';
import {FacebookIntegrationService} from './../facebookIntegrationService.js'

@Page({
  templateUrl: 'app/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(events: Events) {
    this.fbService = new FacebookIntegrationService();
    this.events = events;
  }

  login() {
    let self = this;
    this.fbService.login({scope: 'email,publish_actions'}).then(() => {
      self.fbService.api({
        path: '/me',
        params: {fields: 'id,name,email'}
      }).then(
        (user) => self.events.publish('user:authenticated', user),
        (error) => alert('Facebook error: ' + error.error_description)
      );
    });
  }
}
