const express = require('express')
const dbil = express()
const v1 = require('./v1')

const { HelperController } = require('../../controller')

dbil.use('/v1', v1)

dbil.get('/health-check', (req, res) => {
    HelperController.response(req, res, 200, 'Route Passed')
})

module.exports = dbil