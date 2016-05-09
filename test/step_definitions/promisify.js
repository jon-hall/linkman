import promisify from '../../src/promisify.js'

export default function() {
    this.Given(/^we promisify a function$/, () => {
        // Do nothing (..?)
    })

    this.When(/^that function takes "([^"]*)" arguments?$/, (arg_count) => {
        this.arg_count = +arg_count
    })

    this.When(/^argument "([^"]*)" should be a callback$/, (cb_index) => {
        this.cb_index = +cb_index
    })

    this.When(/^the function returns "([^"]*)" to the callback$/, (result) => {
        this.result = result
    })

    this.When(/^the function returns the error "([^"]*)" to the callback$/, (error) => {
        this.error = error
    })

    this.When(/^we call the promisified function(?: with "([^"]*)" arguments?)?$/, (args_count) => {
        // Here's where it all goes down - make a function with the right # of args, and make sure
        // the correct one is labelled 'cb', give it a body which errors or succeeds with the value
        // which has been setup
        const params = Array.apply(null, Array(this.arg_count))
                .map((_, i) => i === this.cb_index ? 'cb' : 'p' + i),
            fn = Function.apply(null, params.concat(this.getFnBody()))

        this.fn_result = promisify(fn, this.cb_index).apply(null, Array(+(args_count || 0)))
    })

    this.Then(/^we should get back a Promise$/, () => {
        this.expect(this.fn_result).to.be.a('promise')
    })

    this.Then(/^the promise should be resolved with "([^"]*)"$/, (expected, callback) => {
        this.fn_result
            .then(res => {
                this.expect(res).to.equal(expected)
            }, err => {
                this.expect(err).to.be.undefined
            })
            .then(callback, callback)
    })

    this.Then(/^the promise should be rejected with "([^"]*)"$/, (expected, callback) => {
        this.fn_result
            .then(res => {
                this.expect(res).to.be.undefined
            }, err => {
                this.expect(err).to.equal(expected)
            })
            .then(callback, callback)
    })
}
