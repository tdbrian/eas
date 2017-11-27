let router = require('express').Router()
let db = require('../db')
let appValidator = require('./app-constraints')
let mongo = require('mongodb')

router.get('/:id', (req, res) => {
    try {
        let mongoId = mongo.ObjectID(req.params.id)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ errors: ['Application ID is invalid'] })
    }
    
    db.getAppsCollection().findOne({ _id: mongoId })
        .then(app => res.send(app))
        .catch(error => {
            console.error(error)
            res.status(500).send({ errors: ['Error searching for application'] })
        })
})

router.get('/searchByName/:applicationName', (req, res) => {
    db.getAppsCollection().findOne({ name: req.params.applicationName })
        .then(app => res.send(app))
        .catch(error => {
            console.error(error)
            res.status(500).send({ errors: ['Error searching for application'] })
        })
})

router.get('/', (req, res) => {
    db.getAppsCollection().find().toArray()
        .then(apps => res.send(apps))
        .catch(error => {
            console.error(error)
            res.status(500).send({ errors: ['Error getting apps.'] })
        })
})

router.post('/', (req, res) => {
    let app = req.body
    let validationErrors = appValidator.validate(app)
    if (validationErrors) return res.send(500, validationErrors)

    db.getAppsCollection().insertOne({
        name: app.name,
        description: app.description
    })
    .then(status => res.send(status))
    .catch(error => {
        console.error(error)
        res.status(500).send({ errors: ['Error creating app.'] })
    });
})

module.exports = router