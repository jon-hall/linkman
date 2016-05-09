Feature: Promisify

    Scenario: Promisifies a function which takes a callback and resolves with the result
        Given we promisify a function
        When that function takes "1" argument
        And argument "0" should be a callback
        And the function returns "5" to the callback
        And we call the promisified function
        Then we should get back a Promise
        And the promise should be resolved with "5"

    Scenario: Promisifies a function which takes a callback and rejects with the error
        Given we promisify a function
        When that function takes "2" arguments
        And argument "1" should be a callback
        And the function returns the error "'bad'" to the callback
        And we call the promisified function with "1" argument
        Then we should get back a Promise
        And the promise should be rejected with "'bad'"
