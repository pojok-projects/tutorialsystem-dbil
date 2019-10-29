const express = require('express')
const mainRouter = express()
const dbil = require('./dbil')
const bodyparser = require('body-parser')

mainRouter.use(bodyparser.json())
mainRouter.use('/dbil', dbil)

// default error unknown route fallback
mainRouter.all('/*',(req, res) => {
    res.status(422).json({
        code: 422,
        path: req.originalUrl,
        method: req.method,
        message: "Invalid Request"
    })
})

// Default Error Fallback
mainRouter.use(( error , req, res, next) => {
	res.status(422).json({
        code: 422,
        success: false,
        message: error.message
    });
});

module.exports = mainRouter