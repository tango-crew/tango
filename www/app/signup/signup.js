'use strict';

import {Page, Events} from 'ionic/ionic';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {UsersService} from './../services/users'
import {User} from './../models/user'

@Page({
  templateUrl: 'app/signup/signup.html'
})
export class SignUpPage {
  constructor(events:Events, users:UsersService) {
    this.events = events;
    this.users = users;
    this.user = new User();
  }

  signUp() {
    alert('sign up: ' + JSON.stringify(this.user));
    //this.users
    //  .create(
    //    {"user": user}
    //  )
    //  .subscribe(
    //    (response) => this.notifyWith(response.user),
    //    (error) => alert(`erro ao criar o usuário: ${JSON.stringify(error)}`)
    //  );
  }

  notifyWith(user) {
    this.events.publish('user:authenticated', user);
  }
}
