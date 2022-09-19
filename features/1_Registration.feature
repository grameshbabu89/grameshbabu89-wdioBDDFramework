Feature: New user registration
  # Change username for every iteration
  Scenario Outline: As a user, I should be able to register as a new customer

    Given I am on the login page
    When I enter <email> address to be registerd
    When I enter <firstname> , <lastname> , <password> and other mandatory fields then submit
    Then I validate the <firstname> and <lastname> is displayed in the account section
    Then I logout the application

    Examples:
      | email                 | firstname | lastname | password |
      | wdiotesting2@test.com | David     | Sachin   | Testing  |
