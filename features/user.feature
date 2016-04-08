Feature: Users
As a user
I want to create an account on Tango
In order to find awesome professionals

Scenario: Creating a new account
    Given I am not authenticated
    When I go to register
    And I fill the form with some valid data
    And I press "Sign up"
    Then I should see "logged in as <email>"
