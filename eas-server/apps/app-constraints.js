let validate = require('validate.js')

let constraints = {
    name: {
        presence: true,
        length: { minimum: 3, maximum: 300 }
    },
    description: {
        length: { minimum: 3, maximum: 300 }
    }
}

exports.validate = (app) => {
    return validate(app, constraints, {format: "flat"})
}