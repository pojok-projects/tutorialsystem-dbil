const express = require('express')
const v1 = express()

const content = require('./content')
const user = require('./user')

v1.use('/content', content)
v1.use('/user', user)

module.exports = v1