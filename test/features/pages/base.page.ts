export class BasePage {

  private pages: Object;

  constructor() {
    this.pages = {
      'signIn': 'authentication',
      'signUp': 'signUp'
    };
  }

  visit() {
    browser.get('');
  }

  openApp(){
    return browser.get('');
  }

  goToSignUp(){
    return browser.get(`${this.pages['signUp']}`);
  }

  goToSignIn(){
    return browser.get(`${this.pages['signIn']}`);
  }

  currentTitle():webdriver.promise.Promise<string> {
    return element(by.css('ion-navbar ion-title')).getText();
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  wait():Promise<any> {
    return new Promise<any>((resolve) => {
      this.verifySpinner(resolve);
    });
  }

  private verifySpinner(resolve):webdriver.promise.Promise<any> {
    return element(by.css('ion-spinner')).isPresent()
      .then(
        (present) => {
          if (present) {
            setTimeout(() => this.verifySpinner(resolve), 100);
          } else {
            resolve();
          }
        }
      );
  }
}
