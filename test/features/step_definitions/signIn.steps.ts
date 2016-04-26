import {SignInPage} from '../pages/signIn.page';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  type Callback = cucumber.CallbackStepDefinition;
  let page = new SignInPage();

  this.Given(/^I am not authenticated$/, (callback:Callback) => {
    page.openApp();
    callback();
  });

  this.When(/^I fill 'email' with '([^"]*)'$/, (value:string, callback:Callback) => {
    page.setEmail(value);
    callback();
  });

  this.When(/^I fill 'password' with '([^"]*)'$/, (value:string, callback:Callback) => {
    page.setPassword(value);
    callback();
  });

  this.When(/^I press 'Sign In'$/, (callback:Callback) => {
    page.submit();
    callback();
  });

  this.Then(/^the register form is validated '(.*)'$/, (valid:string, callback:Callback) => {
    let isValid = (valid === 'true');
    expect(page.formIsValid()).to.become(isValid).and.notify(callback);
  });

  this.Then(/^the login form is validated '(.*)'$/, (valid:string, callback:Callback) => {
    let isValid = (valid === 'true');
    expect(page.formIsValid()).to.become(isValid).and.notify(callback);
  });

  this.Then(/^I should see 'Meu Perfil'$/, (valid:string, callback:Callback) => {
    expect(page.currentTitle()).to.eventually.become('Meu Perfil').and.notify(callback);
  });
};
