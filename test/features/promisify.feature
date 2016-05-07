Feature: Promisify

  Scenario: Promisifies a function which takes a callback
    Given we promisify a function
    When that function takes "1" argument
    And argument "0" should be a callback
    And the function returns "5"
    And we call the promisified function
    Then we should get back a Promise
    And the promise should be resolved with "5"
