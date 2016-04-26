import {BasePage} from './base.page';

export class SignUpPage extends BasePage {

  private form;
  private nameInput;
  private emailInput;
  private passwordInput;
  private passwordConfirmationInput;
  private submitButton;

  constructor() {
    super();
    this.form = element(by.id('sign-up-form'));
    this.nameInput = this.form.element(by.css('#user-name input'));
    this.emailInput = this.form.element(by.css('#user-email input'));
    this.passwordInput = this.form.element(by.css('#user-password input'));
    this.passwordConfirmationInput = this.form.element(by.css('#user-password-confirmation input'));
    this.submitButton = this.form.element(by.css('button'));
  }

  setName(value: string) {
    return this.nameInput.clear().sendKeys(value);
  }

  setEmail(value: string) {
    return this.emailInput.clear().sendKeys(value);
  }

  setPassword(value: string) {
    return this.passwordInput.clear().sendKeys(value);
  }

  setPasswordConfirmation(value: string) {
    return this.passwordConfirmationInput.clear().sendKeys(value);
  }

  submit() {
    return this.submitButton.click();
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
