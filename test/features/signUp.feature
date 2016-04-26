Feature: Sign Up
  As a user
  I want to Sign Up on Tango
  In order to find awesome professionals

  Scenario Outline: The user is using the registration form
    Given I am not authenticated
    When I go to register
    And I set 'name' with '<name>'
    And I set 'email' with '<email>'
    And I set 'password' with '<password>'
    And I set 'passwordConfirmation' with '<passwordConfirmation>'
    And I press 'Sign up'
    Then the login form is validated '<valid>'
    #And the user is redirect to the thank you page '<valid>'

    Examples:
      | email                       | name                 | password | passwordConfirmation | valid |
      | rogerio.alcantara@gmail.com | Rogério R. Alcântara | 1234567  | 1234567              | true  |
