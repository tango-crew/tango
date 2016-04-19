let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import {SignUpPage} from './signUp.page';
import {SignInPage} from '../authentication/signIn.page';

export = () => {

  let index = new SignInPage();
  let page = new SignUpPage();

  this.setDefaultTimeout(60 * 1000);

  this.Given(/^I am not authenticated$/, function (next) {
    index.openApp();
    next();
  });

  this.When(/^I go to register$/, function (next) {
    index.signUp();
    next();
  });

  this.When(/^I fill 'name' with '([^"]*)'$/, function (value, next) {
    page.setName(value);
    next();
  });

  this.When(/^I fill 'email' with '([^"]*)'$/, function (value, next) {
    page.setEmail(value);
    next();
  });

  this.When(/^I fill 'password' with '([^"]*)'$/, function (value, next) {
    page.setPassword(value);
    next();
  });

  this.When(/^I fill 'passwordConfirmation' with '([^"]*)'$/, function (value, next) {
    page.setPasswordConfirmation(value);
    next();
  });

  this.When(/^I press 'Sign up'$/, function (next) {
    page.submit();
    next();
  });

  this.Then(/^the register form is validated '(.*)'$/, function (valid, callback) {
    valid = valid === 'true';
    expect(page.formIsValid()).to.become(valid).and.notify(callback);
  });
};
