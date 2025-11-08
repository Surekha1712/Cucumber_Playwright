Feature: Time at Work Widget in OrangeHRM

  Background:
    Given I am logged into the OrangeHRM dashboard

  @Regression
  Scenario: Select date, time, and enter note in Time at Work
    When I open the Time at Work widget
    And I select the date "2026-08-233"
    And I enter the time "10:00 "
    And I add a note "This is report time in orangehrm you should be on time and complete your work"
    Then I should see the note saved successfully
    And I click on the In button
