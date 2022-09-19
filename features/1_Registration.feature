Feature: New user registration
  # Change username for every iteration

  Scenario Outline: As a user, I should be able to register as a new customer
    Given I launch the application
    When I am on the sign in page
    When I enter <email> address to be registerd
    Then I enter <firstname> , <lastname> , <password> and other mandatory fields then submit
    Then I validate the <firstname> and <lastname> is displayed in the account section
    Then I logout the application
    Then I close the browser

    Examples:
      | email                   | firstname | lastname | password |
      | wdiotesting123@test.com | David     | Sachin   | Testing  |
