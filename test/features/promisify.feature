Feature: Promisify

    Scenario: Deals with resolving when 'callback' is called without an error
        Given we promisify a function
        When that function takes "1" argument
        And argument "0" should be a callback
        And the function returns "5" to the callback
        And we call the promisified function
        Then we should get back a Promise
        And the promise should be resolved with "5"

    Scenario: Deals with rejecting when 'callback' is called with an error
        Given we promisify a function
        When that function takes "2" arguments
        And argument "1" should be a callback
        And the function returns the error "'bad'" to the callback
        And we call the promisified function with "1" argument
        Then we should get back a Promise
        And the promise should be rejected with "'bad'"

    Scenario: Promisifies when 'callback' is not the last argument of the function
        Given we promisify a function
        When that function takes "2" arguments
        And argument "0" should be a callback
        And the function returns "5" to the callback
        And we call the promisified function
        Then we should get back a Promise
        And the promise should be resolved with "5"

    Scenario: Defaults to treating last argument as callback
        Given we promisify a function
        When that function takes "2" arguments
        And the function returns "5" to the callback
        And we call the promisified function with "1" argument
        Then we should get back a Promise
        And the promise should be resolved with "5"
