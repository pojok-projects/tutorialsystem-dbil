const express = require('express')
const v1 = express()

const content = require('./content')

v1.use('/content', content)

module.exports = v1