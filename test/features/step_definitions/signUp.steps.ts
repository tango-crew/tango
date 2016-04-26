import {SignUpPage} from '../pages/signUp.page';
import {SignInPage} from '../pages/signIn.page';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  type Callback = cucumber.CallbackStepDefinition;
  let index = new SignInPage();
  let page = new SignUpPage();

  this.When(/^I go to register$/, (callback:Callback) => {
    index.signUp();
    callback();
  });

  this.When(/^I set 'name' with '([^"]*)'$/, (name:string, callback:Callback) => {
    page.setName(name);
    callback();
  });

  this.When(/^I set 'email' with '([^"]*)'$/, (email:string, callback:Callback) => {
    page.setEmail(email);
    callback();
  });

  this.When(/^I set 'password' with '([^"]*)'$/, (password:string, callback:Callback) => {
    page.setPassword(password);
    callback();
  });

  this.When(/^I set 'passwordConfirmation' with '([^"]*)'$/, (value:string, callback:Callback) => {
    page.setPasswordConfirmation(value);
    callback();
  });

  this.When(/^I press 'Sign up'$/, (callback:Callback) => {
    page.submit();
    callback();
  });

  this.Then(/^the register form is validated '(.*)'$/, (valid:string, callback:Callback) => {
    let isValid = (valid === 'true');
    expect(page.formIsValid()).to.become(isValid).and.notify(callback);
  });
};
