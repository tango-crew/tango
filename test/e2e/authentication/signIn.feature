Feature: Sign In
  As a user
  I want to Sign In on Tango
  So that I can find awesome professionals

  Scenario Outline: User Signs In

    Given I am not authenticated
    When I fill 'email' with '<email>'
    And I I fill 'password' with '<password>'
    And I press 'Sign In'
    Then the login form is validated '<valid>'

    Examples:
      | email           | password             | valid |
      |                 |                      | false |
      |                 | thisisavalidpassword | false |
      | roalcantara.be  | thisisavalidpassword | false |
      | ro@alcantara.be |                      | false |
      | ro@alcantara.be | thisisavalidpassword |  true |
