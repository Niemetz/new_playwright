Feature: As a user I expect to be able to create contacts

  @dev
  Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home page"
    And I click the "Create button"
    When I am directed to the "create contact page"
    And the "Create Contact header" should contain the text "Create Contact"
    Then I fill in the "Name field" with "Terry Barks"
    And I select the "Male" option from the "Gender pull-down list"
    And I fill in the "Phone field" with "939-555-0113"
    And I fill in the "Street field" with "742 Puma Terrace"
    And I fill in the "City field" with "Springfield"
    And I click the "Save button"
    And I am directed to the "home page"

    And I fill in the "Search Contacts field" with "Terry Barks"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "Name field" should contain the text "Terry Barks"
    And the "gender label" should contain the text "Gender:"
    And the "Gender field" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "Address field" should contain the text "742 Puma Terrace, Springfield"
    And the "Edit button" should be displayed
    And the "Delete button" should be displayed