const express = require('express')
const bodyParser = require('body-parser')
const mainRouter = express()


mainRouter.use(bodyParser.json())
mainRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// load .env data
const dotenv = require('dotenv')
dotenv.config()

// cors
const cors = require('cors')

mainRouter.get('/hello', (req, res) => {
	res.send({
		status: 200,
		message: 'Hello, this is Backend for DBIL system'
	})
})

// default error unknown route fallback
mainRouter.all('/*',(req, res) => {
    res.status(422).send({
        code: 422,
        path: req.originalUrl,
        method: req.method,
        message: "Invalid Request"
    }) 
})

// Default Error Fallback
mainRouter.use(( error , req, res, next) => {
	return res.status(422).send({ status: {
        code: 422,
        message: error.message,
        succeeded: false
    }});
});

module.exports = mainRouter