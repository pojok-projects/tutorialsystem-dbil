const express = require('express')
const content = express()

const metadata = require('./metadata')

content.use('/metadata', metadata)

module.exports = content