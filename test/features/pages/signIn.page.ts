import {BasePage} from './base.page';

export class SignInPage extends BasePage {

  private form;
  private emailInput;
  private passwordInput;
  private signInButton;
  private signUpButton;
  private signOutButton;

  constructor() {
    super();
    this.form = element(by.id('sign-in-form'));
    this.emailInput = this.form.element(by.css('#user-email input'));
    this.passwordInput = this.form.element(by.css('#user-password input'));
    this.signInButton = this.form.element(by.css('#sign-in-form button'));
    this.signUpButton = element(by.css('#sign-up'));
    this.signOutButton = element(by.css('#sign-out'));
  }

  setEmail(value: string) {
    return this.emailInput.clear().sendKeys(value);
  }

  setPassword(value: string) {
    return this.passwordInput.clear().sendKeys(value);
  }

  submit() {
    return this.signInButton.click();
  }

  signUp() {
    return this.signUpButton.click();
  }

  signOut() {
    element(by.css('.bar-button-menutoggle')).click();
    element(by.css('#sign-out')).click();
  }

  getAllErrorMessages() {
    return element.all(by.css('.error-group'));
  }

  hasErrorMessages() {
    return this.getAllErrorMessages().count().then(value => {
      return value > 0;
    });
  }

  formIsValid(){
    return this.getAllErrorMessages().count().then(value => {
      return value === 0;
    });
  }
}
