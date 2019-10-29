const pmRouter = require('express').Router()
const v1 = require('./v1')

pmRouter.use('/v1', v1)

module.exports = pmRouter;