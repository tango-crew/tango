import {ElementFinder} from 'protractor';
import {BasePage} from '../base.page.e2e';

export class AuthenticatePage extends BasePage {
  emailField:ElementFinder = element(by.css('#user-email input'));
  passwordField:ElementFinder = element(by.css('#user-password input'));
  signInButton:ElementFinder = element(by.css('#sign-in-form button'));
  signUpButton:ElementFinder = element(by.css('#sign-in-form button'));

  constructor() {
    super();
  }

  signIn(email, password) {
    this.setEmail(email);
    this.setPassword(password);
    this.signInButton.click();
  }

  signOut() {
    element(by.css('.bar-button-menutoggle')).click();
    element(by.css('#sign-out')).click();
  }

  private setEmail(email:string):void {
    this.emailField.sendKeys(email);
  }

  private setPassword(password:string):void {
    this.passwordField.sendKeys(password);
  }
}
