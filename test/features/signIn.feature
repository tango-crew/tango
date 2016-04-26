Feature: Sign In
  As a user
  I want to Sign In on Tango
  So that I can find awesome professionals

  Scenario Outline: User Signs In

    Given I am not authenticated
    When I fill 'email' with '<email>'
    And I fill 'password' with '<password>'
    And I press 'Sign In'
    Then the login form is validated '<valid>'
    And I should see 'Meu Perfil'

    Examples:
      | email                       | password             | valid |
      | rogerio.alcantara@gmail.com | thisisavalidpassword |  true |
