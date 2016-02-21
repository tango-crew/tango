'use strict';

import {Page, Events} from 'ionic/ionic';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {UsersService} from './../services/users'
import {User} from './../models/user'

@Page({
  templateUrl: 'app/signup/signup.html'
})
export class SignUpPage {
  user: User;
  passwords_are_equal: boolean;

  constructor(private events:Events, private users:UsersService) {
    this.user = new User();
    this.passwords_are_equal = true;
  }

  signUp() {
    this.users
      .create(
        {"user": this.user}
      )
      .subscribe(
        (response) => this.notifyWith(response.user),
        (error) => alert(`erro ao criar o usuário: ${JSON.stringify(error)}`)
      );
  }

  notifyWith(user) {
    this.events.publish('user:authenticated', user);
  }
}
