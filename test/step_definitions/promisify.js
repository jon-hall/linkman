import promisify from '../../src/promisify.js'

export default function() {
    this.Given(/^we promisify a function$/, () => {
        // Do nothing (..?)
    })

    this.When(/^that function takes "([^"]*)" arguments?$/, (arg_count) => {
        this.arg_count = arg_count
    })

    this.When(/^argument "([^"]*)" should be a callback$/, (cb_index) => {
        this.cb_index = cb_index
    })

    this.When(/^the function returns "([^"]*)"$/, (result) => {
        this.result = result
    })

    this.When(/^we call the promisified function$/, () => {
        // Here's where it all goes down - make a function with the right # of args, and make sure
        // the correct one is labelled 'cb', give it a body which errors or succeeds with the value
        // which has been setup
        const params = Array.apply(null, Array(this.arg_count))
                .map((_, i) => i === +this.cb_index ? 'cb' : 'p' + i),
            fn = Function.apply(null, params.concat(this.getFnBody()))

        this.fn_result = promisify(fn)()
    })

    this.Then(/^we should get back a Promise$/, () => {
        this.expect(this.fn_result).to.be.a('promise')
    })

    this.Then(/^the promise should be resolved with "([^"]*)"$/, (result, callback) => {
        this.fn_result
            .then(res => {
                this.expect(res).to.equal(result)
            }, err => {
                this.expect(err).to.be.undefined
            })
            .then(callback, callback)
    })
}
