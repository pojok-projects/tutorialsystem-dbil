const v1 = require('express').Router()

v1.get('/test', (_, res) => {
    res.send({
        status: 200,
        message: 'Hello, this is Backend for DBIL system'
    })
})

module.exports = v1;