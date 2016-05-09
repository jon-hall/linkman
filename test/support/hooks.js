export default function() {
    /*eslint-disable no-unused-vars*/
    this.Before((scenario) => {
        this.result = this.body = null

        this.getFnBody = () => {
            if(this.result) {
                // Return 'success' body if we have a result
                return 'cb(null, ' + JSON.stringify(this.result) + ')'
            } else if(this.error) {
                return 'cb(' + JSON.stringify(this.error) + ')'
            }

            return ''
        }
    })

    this.After((scenario) => {
        // TODO: Setup context (this)
    })
    /*eslint-enable no-unused-vars*/
}
