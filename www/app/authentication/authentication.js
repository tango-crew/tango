'use strict';

import {Page, Events} from 'ionic/ionic';
import {FacebookService} from './../services/facebook'
import {UsersService} from './../services/users'

@Page({
  templateUrl: 'app/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(events:Events, facebookService:FacebookService, users:UsersService) {
    this.facebookService = facebookService;
    this.events = events;
    this.users = users;
  }

  login() {
    this.facebookService
      .login({scope: 'email,publish_actions'})
      .then(() => this.getFacebookUser());
  }

  getFacebookUser() {
    this.facebookService
      .api({
        path: '/me',
        params: {fields: 'id,name,email'}
      })
      .then(
        (user) => this.verifyIfUserExistsOnApi(user),
        (error) => console.log('Facebook error: ', JSON.stringify(error))
      );
  }

  verifyIfUserExistsOnApi(user) {
    let userFromFacebook = (u) => u.integration_type === 1 && u.integration_id === user.id;

    this.users
      .all()
      .subscribe(
        (response) => {
          let userFromApi = response.users.find(userFromFacebook);

          if (!userFromApi) {
            this.signUpUser(user);
          } else {
            this.notifyWith(userFromApi);
          }
        }
      );
  }

  signUpUser(user) {
    this.users
      .create(
        {
          "user": {
            "name": user.name,
            "email": user.email,
            "integration_type": 1,
            "integration_id": user.id
          }
        }
      )
      .subscribe(
        (response) => this.notifyWith(response.user),
        (error) => console.log('erro ao criar o usuário', user, JSON.stringify(error))
      );
  }

  notifyWith(user) {
    this.events.publish('user:authenticated', user);
  }
}
