import {Page, Events} from 'ionic/ionic';
import {FacebookService} from './../services/facebook'

@Page({
  templateUrl: 'app/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(events: Events, facebookService: FacebookService) {
    this.facebookService = facebookService;
    this.events = events;
  }

  login() {
    let self = this;
    this.facebookService.login({scope: 'email,publish_actions'}).then(() => {
      self.facebookService.api({
        path: '/me',
        params: {fields: 'id,name,email'}
      }).then(
        (user) => self.events.publish('user:authenticated', user),
        (error) => alert('Facebook error: ' + error.error_description)
      );
    });
  }
}
