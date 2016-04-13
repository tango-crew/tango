module.exports = function () {
  this.Given(/^I am not authenticated$/, function () {
    browser.get('');
  });

  this.When(/^I go to register$/, function (callback) {
    element(by.css('#sign-up')).click();

    setTimeout(function () {
      var nameField = element(by.css('#user-name input'));
      var emailField = element(by.css('#user-email input'));
      var passwordField = element(by.css('#user-password input'));
      var passwordConfirmationField = element(by.css('#user-password-confirmation input'));
      var signInButton = element(by.css('#sign-up-form button'));

      nameField.sendKeys('Diego gatinho');
      emailField.sendKeys('test.diego@gmail.com');
      passwordField.sendKeys('123');
      passwordConfirmationField.sendKeys('123');

      signInButton.click();

      callback();
    }, 1000);
  });

  this.When(/^I fill the form with some valid data$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.When(/^I press "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.Then(/^I should see "([^"]*)"$/, function (arg1, email, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
};
