export class BasePage {
  visit() {
    browser.get('');
  }

  currentTitle():webdriver.promise.Promise<string> {
    return element(by.css('ion-navbar ion-title')).getText();
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
