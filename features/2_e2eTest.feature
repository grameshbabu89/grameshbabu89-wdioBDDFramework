Feature: e2e test scenarios on an e-commerce website
  # Check the username is already registered
  Scenario Outline: As a registered user, I should be able to place an order.

    Given I launch the application
    When I am on the sign in page
    When I login with <username> and <password>
    Then I validate the <firstname> and <lastname> is displayed in the account section
    When I search <searchItem> in the search box
    Then I add <item> to the cart
    Then I proceed to checkout
    Then I verify the <item> in the payment page
    Then I make payment
    Then I logout the application
    Then I close the browser

    Examples:
      | username          | password | firstname | lastname | searchItem | item          |
      | wdiotest@test.com | Testing  | David     | Sachin   | dress      | Printed Dress |

