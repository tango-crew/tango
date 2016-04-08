module.exports = function () {
  this.Given(/^I am not authenticated$/, function (callback) {
    browser.get('');
    callback();
  });

  this.When(/^I go to register$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    element(by.css('#sign-up')).click();
    callback();
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
