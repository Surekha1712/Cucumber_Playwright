# # Feature: OrangeHRM Login and Forgot Password

# #   Background:
# #     Given I am on the OrangeHRM login page

# #   @valid
# #   Scenario: Login with valid credentials
# #     When I login with username "Admin" and password "admin123"
# #     Then I should be redirected to the dashboard

# #   @invalid
# #   Scenario: Login with invalid credentials
# #     When I login with username "Admin" and password "123"
# #     Then I should see an error message "Invalid credentials"

# #   @empty
# #   Scenario: Login without any credentials
# #     When I click the login button without entering details
# #     Then I should see the required field error message

# #   @forgot
# #   Scenario: Forgot Password flow
# #     When I click on the Forgot your password link
# #     And I enter username "Admin1" on forgot page
# #     And I click the Reset Password button
# #     Then I should see the password reset confirmation

#  Feature: OrangeHRM Login and Forgot Password

#   Background:
#     Given I am on the OrangeHRM login page

#   @valid
#   Scenario: Login with valid credentials
#     When I login with username "Admin" and password "admin123"
#     Then I should be redirected to the dashboard

#   @invalid
#   Scenario: Login with invalid credentials
#     When I login with username "Admin" and password "123"
#     Then I should see an error message "Invalid credentials"

#   @empty
#   Scenario: Login without any credentials
#     When I click the login button without entering details
#     Then I should see the required field error message

#   @forgot
#   Scenario: Forgot Password flow
#     When I click on the Forgot your password link
#     And I enter username "Admin1" on forgot page
#     And I click the Reset Password button
#     Then I should see the password reset confirmation

#   @outline
#   Scenario Outline: Login with multiple credential sets
#     When I login with username "<username>" and password "<password>"
#     Then I should see "<expected_result>"

#   Examples:
#     | username | password   | expected_result               |
#     | Admin    | admin123   | redirected to the dashboard   |
#     | Admin    | 123        | error message "Invalid credentials" |
#     | " "      |       " "  | required field error message  |

Feature: OrangeHRM Login and Forgot Password

  Background:
    Given I am on the OrangeHRM login page

  @login
  Scenario Outline: Verify login functionality with multiple credential sets
    When I login with username "<username>" and password "<password>"
    Then I should see "<expected_result>"

  Examples:
    | username | password   | expected_result                     |
    | Admin    | admin123   | redirected to the dashboard         |
    | Admin    | 123        | Invalid credentials |
    |          |            | required field error message        |

  @forgot
  Scenario: Forgot Password flow
    When I click on the Forgot your password link
    And I enter username "Admin1" on forgot page
    And I click the Reset Password button
    Then I should see the password reset confirmation
