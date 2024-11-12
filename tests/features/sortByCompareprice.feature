Feature: Sort products by Compareprice
  As a REST api user I want to be able to sort products by compareprice and have the information be correct in all categories

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 10 main categories

    # Use dynamic data (from a previous scenario) to run a scenario outline multiple times!
    # See the step definitions:
    # 1) Set an array of string values in your step definitions for
    #    the previous scenario! (In our case: this.categoryUrlParts)
    # 2) Use the syntax below to point to your array
    # 3) Use the same name in singular in curly brackets in a string in your step (see above)
    Examples:
      | {dynamic: 'categoryUrlParts'} |