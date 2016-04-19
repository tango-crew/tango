Feature: Sign Up
  As a user
  I want to Sign Up on Tango
  In order to find awesome professionals

  Scenario Outline: The user is using the registration form
    Given I am not authenticated
    When I fill 'name' with '<name>'
    And I I fill 'email' with '<email>'
    And I I fill 'password' with '<password>'
    And I I fill 'passwordConfirmation' with '<passwordConfirmation>'
    And I press 'Sign up'
    Then the login form is validated '<valid>'
    #And the user is redirect to the thank you page '<valid>'

    Examples:
      | email         | name           | password | passwordConfirmation | valid |
      |               |                |          |                      | false |
      |               | Sam Vloeberghs |          |                      | false |
      | samkwerri.be  | Sam Vloeberghs |          |                      | false |
      | sam@kwerri.be |                |          |                      | false |
      | sam@kwerri.be | Sam Vloeberghs |          |                      | false |
      | sam@kwerri.be | Sam Vloeberghs | 1234567  |                      | false |
      | sam@kwerri.be | Sam Vloeberghs |          | 1234567              | false |
      | sam@kwerri.be | Sam Vloeberghs | 1234567  | 7654321              | false |
      | sam@kwerri.be | Sam Vloeberghs | 1234567  | 1234567              | true  |
