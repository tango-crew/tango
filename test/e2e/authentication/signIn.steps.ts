let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import {SignInPage} from './signIn.page';

export = () => {

  let page = new SignInPage();

  //this.setDefaultTimeout(60 * 1000);

  this.Given(/^I am not authenticated$/, function (next) {
    page.openApp();
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

  this.When(/^I press 'Sign In'$/, function (next) {
    page.submit();
    next();
  });

  this.Then(/^the register form is validated '(.*)'$/, function (valid, callback) {
    valid = valid === 'true';
    expect(page.formIsValid()).to.become(valid).and.notify(callback);
  });
};
